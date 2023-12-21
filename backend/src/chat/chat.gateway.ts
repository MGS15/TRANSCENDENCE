import { UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AtGuard } from 'src/common/guards';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from "socket.io";
import { GetCurrentUserId } from 'src/common/decorators';
import { RoomPermitions } from 'src/common/decorators/RoomPermitions.decorator';
import { roomtype, user_permission } from '@prisma/client';
import { RoomType } from 'src/common/decorators/RoomType.decorator';
import { ActionDTO } from 'src/Dto/Action.dto';
import { ChatService } from './chat.service';
import { RoomDto } from 'src/Dto/rooms.dto';
import { RoomGuard } from 'src/common/guards/chat/RoomGuards.guard';
import { RoomStatus } from 'src/common/decorators/RoomStatus.deorator';
import { Roomstattypes } from 'src/types.ts/statustype';


@WebSocketGateway({ transports: ["websocket"] })
@UsePipes(new ValidationPipe())
@UseGuards(RoomGuard)
@UseGuards(AtGuard)
export class ChatGateway {
  constructor(
		private readonly prisma: PrismaService,
		private readonly service: ChatService,
	) {
	}

	@WebSocketServer()
	server: Server;
	id: string;


	async handleConnection(client, @GetCurrentUserId() id:number ) {
		console.log(client.id, id);
	}
	handleDisconnect(client) {
		console.log(`Client disconnected ${client.id}`);
	}	
	
	@SubscribeMessage("ROOMSUBSCRIBE")
	@RoomPermitions(user_permission.owner, user_permission.admin,user_permission.participation ,user_permission.chat)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public, roomtype.chat)
	@RoomStatus(Roomstattypes.NOTBAN, Roomstattypes.NOTBLOCK)
	async subscribeRoom(@GetCurrentUserId() id:number, @ConnectedSocket() client, @MessageBody() room: {room:number }) {
		client.join(room.room.toString());
	}



	@SubscribeMessage("CREATE")
	async createroom(@GetCurrentUserId() id:number, @ConnectedSocket() client, @MessageBody() room: RoomDto) {
		console.log(room)
		try
		{
			const newroom = await this.service.rooms.create_room(id, room);
			client.emit("ACTION", {region: "ROOM", action:"NEW", data: newroom}) 
		}	
		catch (e)
		{
			client.emit("ChatError", e.message);
		}	
	}	
	@SubscribeMessage("JOIN")
	@RoomType(roomtype.public, roomtype.protected)
	async joinroom(@GetCurrentUserId() id:number, @ConnectedSocket() client, @MessageBody() room: RoomDto) {
		console.log(room)
		try
		{
			const newroom = await this.service.rooms.join_room(id, room.room, room);
			if (newroom)
			client.emit("ACTION", {region: "ROOM", action:"JOIN", data: newroom}) 
			else
			throw new Error("user probably in room")
		}	
		catch (e)
		{
			client.emit("NOTIFY", e.message);
		}	
	}	





	@SubscribeMessage("MOD")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async modify(@GetCurrentUserId() id:number, @ConnectedSocket() client, @MessageBody() room: RoomDto) {
		try
		{
			const newroom = await this.service.rooms.modify_room(id,room.room, room);
			this.server.to(room.room.toString()).emit("ACTION", {region: "ROOM", action:"MOD", data: newroom}) 
		}	
		catch (e)
		{
			client.emit("ChatError", e.message);
		}	
	}	


















	/********************** */
	@SubscribeMessage("CHAT")
	@RoomPermitions(user_permission.owner, user_permission.admin,user_permission.participation ,user_permission.chat)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public, roomtype.chat)
	@RoomStatus(Roomstattypes.NOTBAN, Roomstattypes.NOTBLOCK ,Roomstattypes.NOTMUTE)
	async onMessage( @GetCurrentUserId() id:number, @ConnectedSocket() client, @MessageBody() message: ActionDTO)
	{
		const res = await this.service.messages.send_message(id,message.room, message.What);
		if (!res)
			{
				client.emit("ChatError", "failed to send message");
				return ;
			}
		this.server.to(message.room.toString()).emit("ACTION", {region: "CHAT", action:"NEW", data: res});
	}











	@SubscribeMessage("BLOCK")
	@RoomPermitions(user_permission.chat)
	@RoomType(roomtype.chat)
	async block(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO) {

		let res;
		if (Message.What === "BLOCK")
			res = await this.service.rooms.block_user(id ,Message.target, Message.room);
		if (Message.What === "UNBLOCK")
			res = await this.service.rooms.unblock_user(id ,Message.target, Message.room);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: res})

		//inform the target
	}










	@SubscribeMessage("KICK")
	@RoomPermitions(user_permission.admin, user_permission.owner)
	@RoomType(roomtype.protected, roomtype.public, roomtype.private)
	async kick(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{
    console.log(Message , "ja men bra")

		const res =  await this.service.rooms.kick_room(Message.target, Message.room);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"KICK" , data: res})
		//inform the target

	}










	@SubscribeMessage("BAN")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async ban(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{

		let res;
		if (Message.What === "BAN")
			res =  await this.service.rooms.ban_user(Message.target, Message.room);
		if (Message.What === "UNBAN")
			res =  await this.service.rooms.unban_user(Message.target, Message.room);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: res})
		//inform the target
		//remover from the rooom

	}










	@SubscribeMessage("MUTE")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async mute(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{
		let res;
		if (Message.What === "MUTE")
			res =  await this.service.rooms.mute_user(Message.target, Message.room);
		if (Message.What === "UNMUTE")
			res =  await this.service.rooms.unmute_user(Message.target, Message.room);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: res})
		//inform the target
	}










	@SubscribeMessage("LWERT")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async lwart(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{
		const res =  await this.service.rooms.giveOwnership(id, Message.room, Message.target);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);

			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: res[0]})
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: res[1]})

		//inform the target 
	}







	@SubscribeMessage("INDIWANA")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async indiwana(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{
    console.log(Message , "ja men bra")

		const res = await this.service.rooms.give_room_admin(Message.room, Message.target);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: res})		//inform the target
	}







	@SubscribeMessage("OUTDIWANA")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async outdiwana(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{
    console.log(Message , "ja men bra")

		const res = await this.service.rooms.revoke_room_admin(Message.room, Message.target);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"update" , data: res})		//inform the target
	}

  	@SubscribeMessage("LEAVE")
	@RoomPermitions(user_permission.admin, user_permission.participation)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async leaveroom(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{

		const res = await this.service.rooms.leave_room(Message.target, Message.room);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"KICK" , data: res})
		/**
		 * removve every client from this room
		* client.leave(Message.room.toString())

		 */
		client.leave(Message.room.toString())
		//inform the target
	}

  	@SubscribeMessage("DELETE")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async deleteroom(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message: ActionDTO)
	{
    console.log(Message , "ja men bra")

		const res = await this.service.rooms.delete_room(Message.room);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		this.server.to(Message.room.toString()).emit("ACTION", {region: "ROOM", action:"DELETE" , data: res})
		
		/**
		 * removve every client from this room
		* 
		 */
		client.leave(Message.room.toString())

		//inform the target
	}



	@SubscribeMessage("INVITEROOM")
	@RoomType(roomtype.private)
	@RoomStatus(Roomstattypes.NOTBAN)
	async inviteroom(@GetCurrentUserId() id:number, @ConnectedSocket() client,  @MessageBody() Message:ActionDTO )
	{
		console.log(Message)
		const friend = await this.prisma.user.findUnique({
			where:{
				nickname: Message.What
			}
		});
		console.log(friend)
		if (!friend)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		const friendship = await this.prisma.friendship.findFirst({
			where: {
				OR: [
					{ initiator: id, reciever: friend.id },
					{ initiator: friend.id, reciever: id },
				],
			},
		});
		const res = await this.service.rooms.invite_room(id, friend.id, Message.room);
		if (!res)
		{
			client.emit("ChatError", `failed to ${Message.What}`);
			return ;
		}
		//inform the target
	}

}