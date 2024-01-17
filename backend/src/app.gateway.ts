import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AtGuard } from './common/guards';
import { Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId } from './common/decorators';
import { PrismaService } from './prisma/prisma.service';
import { current_state, relationsip_status } from '@prisma/client';
import { Server , Socket} from "socket.io";
import { stat } from 'fs';
import { RoomGuard } from './common/guards/chat/RoomGuards.guard';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { use } from 'passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { Request } from 'express';

const conf: ConfigService = new ConfigService();

@WebSocketGateway()
@UseGuards(RoomGuard)
@UseGuards(AtGuard)
export class AppGateway {

  constructor(
		private readonly prisma: PrismaService,
		private statusnotify: EventEmitter2,
		private jwtServide : JwtService,
		
	) {
	}


	@WebSocketServer()
	server :Server;

 	async handleConnection(client ) {
		let user;
		 try
		 {
				user = (await this.jwtServide.verify(client.request.headers.cookie.match(/(?<=atToken=)(.*?)(?=;|$)/)[0] , {
					"secret" : conf.get('AT_SECRET')
				}))
				client.join(user["user42"])
				if ((await this.server.to(user["user42"]).fetchSockets()).length == 1)
				{
					const	state = await this.prisma.user.update({where:{user42:user["user42"],},data:{connection_state: current_state.ONLINE}});
					this.statusnotify.emit("PUSHSTATUS", state.user42 , [{ nickname:state.nickname , connection_state: state.connection_state}])
				}

				console.log(user["user42"] , "connected")
			}
			catch (e)
			{
				client.disconnect()
			}
	}
	
	
	async handleDisconnect(client) {
		const identifier = client.request.headers["user"]
		if (identifier === undefined)
			return ;
		if (!(await this.server.to(identifier).fetchSockets()).length)
		{
			const	state = await this.prisma.user.update({where:{user42:identifier,},data:{connection_state: current_state.OFFLINE}});
			this.statusnotify.emit("PUSHSTATUS", state.user42 , [{ nickname:state.nickname , connection_state: state.connection_state}])

		}
	}	
	@SubscribeMessage("HANDSHAKE")
	async sayHitoserver(@GetCurrentUser("user42") identifier:string, @GetCurrentUser("sub") id:number, @ConnectedSocket() client)
	{
		
		client.join(identifier)
		if ((await this.server.to(identifier).fetchSockets()).length == 1)
		{
			const	state = await this.prisma.user.update({where:{user42:identifier,},data:{connection_state: current_state.ONLINE}});
			this.statusnotify.emit("PUSHSTATUS", state.user42 , [{ nickname:state.nickname , connection_state: state.connection_state}])
		}
		
	}
	
	@SubscribeMessage("ONNSTATUS")
	async getPrimarystatus( @GetCurrentUser("user42") identifier:string, @ConnectedSocket() client)
	{
		console.log("yassir zamel")
		const status = await this.prisma.user.findUnique(
			{
				where:{
					user42:identifier,
				},
				select:{
					friendship1: {

						select:{
							reciever_id:true,
							status:true,
						}
					},
					friendship2: {
						select:{
							
							initiator_id:true,
							status:true
						}
					}

				}
			}
		)
		const allstatus = [];
		status.friendship1?.map((friend) => {
			friend.status === "DEFAULT"?
			allstatus.push({nickname: friend.reciever_id.nickname, connection_state: friend.reciever_id.connection_state}):
			allstatus.push({nickname: friend.reciever_id.nickname, connection_state: "BLOCKED"})
		
		})
		status.friendship2?.map((friend) =>{
			friend.status === "DEFAULT"?
			allstatus.push({nickname: friend.initiator_id.nickname, connection_state: friend.initiator_id.connection_state}):
			allstatus.push({nickname: friend.initiator_id.nickname, connection_state: "BLOCKED"})
		})
	
		client.emit("ON_STATUS",   allstatus)
		console.log("all send", allstatus)
	}
	@OnEvent('PUSHSTATUS')
	async notifyALL(user: string, status:[])
	{
		const friends = await this.getfriends(user);
		friends.forEach( async (friend) => 
		{
			if((await this.server.to(friend).fetchSockets()).length)
				this.server.to(friend).emit("ON_STATUS" , status);
		}
	);
	}


	@OnEvent("PUSH")
	async informuser(user42, invite, type)
	{
		if ((await this.server.to(user42).fetchSockets()).length)
			this.server.to(user42).emit(type, invite);
	}
	async getfriends(user:string)
	{

		const friends = await this.prisma.friendship.findMany({
			where	:	{
				OR :
				[
					{
						initiator_id:{user42:user},
						status:relationsip_status.DEFAULT,
					},
					{
						reciever_id:{user42:user},
						status:relationsip_status.DEFAULT,
					},
					
				]
			},
			select:
			{
				initiator_id:
				{
					select:
					{
						user42:true,
					}
				},
				reciever_id:
				{
					select:
					{
						user42:true,
					}
				}
				
			}
		});
		const list = friends.map((frien) =>
		{
			if (frien.initiator_id.user42 == user)
				return frien.reciever_id.user42;
			return frien.initiator_id.user42
		})
		return list;
	}

	@OnEvent("AUTOUNMUTE")
	async inform(roomid, userstate)
	{
		this.server.to(roomid.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: userstate})
	}
	
}



/**
 * 
 * 	user conects: 
 * 		->>>>> userstatus set as online
 * 	user join a game:
 * 				-> userstatus as in game
 * 	user leaves a game:
 * 		->>> user status as offligne;
 * 
 * 
 */