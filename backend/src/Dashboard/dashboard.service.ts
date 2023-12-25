import {Injectable, OnModuleInit } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export default class DashboardService {
	constructor( private readonly prisma : PrismaService
	) {}

	async getUser(id: number)
	{
		const user = await this.prisma.user.findUnique({
			where:{
				id:id
			}}
			);
		return  user;
	}

	async getFriendship(id: number)
	{
		console.log("In here\n");
		const user = await this.prisma.user.findUnique({
			where:{
				id:id
			},
			include:{
				friendship1:true
			}
		})
		const data = [];
		for (const friend of user.friendship1)
		{
			if (user.id === friend.initiator)
			{
				const otherUser = await this.getUser(friend.reciever);
				data.push({
					avatar:  otherUser.avatar,
					nickname: otherUser.nickname,
					status: otherUser.status
				})
			}
		}
		return data;
	}


	async getName(id: number)
	{
		const user = await this.getUser(id);
		return user;
	}


	async update (id : number, newStatus: string)
	{
		console.log(id)
		await this.prisma.user.update({
			where:{
				id:id
			},
			data:{
				status: newStatus,
			}
		})
	}
}