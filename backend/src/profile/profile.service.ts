import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProfileService {
	constructor(private readonly prisma: PrismaService) {}
	
	create(createProfileDto: CreateProfileDto) {
		return "This action adds a new profile";
	}

	findAll() {
		return `This action returns all profile`;
	}

	async findOne(username: string) {
		const data = await this.prisma.user.findFirst({
			select: {
				id: true,
				avatar: true,
				status: true,
				nickname: true,
				user42: true,
				connection_state: true,
				experience_points: true,
			},
			where: {
				nickname: username,
			},
		});
		if (!data) throw new HttpException("failed to fetch user", HttpStatus.BAD_REQUEST);
		return data;
	}

	async update(id: number, updateProfileDto: UpdateProfileDto) {
		const update = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				status: updateProfileDto.status,
			},
			select: {
				id: true,
				avatar: true,
				status: true,
				nickname: true,
				user42: true,
				connection_state: true,
				experience_points: true,
			},
		});
		return update;
	}
	
	async getFriendship(id: number, friend: number) {
		const user = await this.prisma.friendship.findFirst({
			where: {
				OR: [
					{
						initiator: id,
						reciever: friend,
					},
					{ 
						initiator: friend,
						reciever: id,
					},
				],
			},
		});
		if (user) throw new HttpException("ok", 200);
		else throw new HttpException("not ok", 400);
	}

	async getGlobalBoard(username: string) {
		const data = await this.prisma.user.findMany({
			select: {
				nickname:true,
				experience_points:true
			},
			orderBy: {
				experience_points: "desc"
			},
		});
		return data
	}
	// async getFriendships(id: number)
	// {
	// 	console.log("In here\n");
	// 	const user = await this.prisma.user.findUnique({
	// 		where:{
	// 			id:id
	// 		},
	// 		include:{
	// 			friendship1:true
	// 		}
	// 	})
	// 	const data = [];
	// 	for (const friend of user.friendship1)
	// 	{
	// 		if (user.id === friend.initiator)
	// 		{
	// 			const otherUser = await this.getUser(friend.reciever);
	// 			data.push({
	// 				avatar:  otherUser.avatar,
	// 				nickname: otherUser.nickname,
	// 				status: otherUser.status
	// 			})
	// 		}
	// 	}
	// 	return data;
	// }
}
