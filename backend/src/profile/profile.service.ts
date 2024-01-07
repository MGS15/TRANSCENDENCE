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
				nickname: true,
				experience_points: true,
				avatar: true,
			},
			orderBy: {
				experience_points: "desc",
			},
		});
		return data;
	}

	async getFriendships(id: number) {
		const friendship = (
			await this.prisma.friendship.findMany({
				where: {
					OR: [
						{
							initiator: id,
						},
						{
							reciever: id,
						},
					],
				},
				select: {
					initiator_id: {
						select: {
							id: true,
							avatar: true,
							nickname: true,
							status: true,
							experience_points: true,
						},
					},
					reciever_id: {
						select: {
							id: true,
							avatar: true,
							nickname: true,
							status: true,
							experience_points: true,
						},
					},
				},
			})
		).map((friend) => (friend.initiator_id.id === id ? friend.reciever_id : friend.initiator_id));
		const blocked = (
			await this.prisma.friendship.findMany({
				where: {
					status: {
						not: "DEFAULT",
					},
					OR: [
						{
							initiator: id,
						},
						{
							reciever: id,
						},
					],
				},
			})
		).map((blockrel) => (blockrel.initiator === id ? blockrel.reciever : blockrel.initiator));
		const friends = friendship.filter((us) => !blocked.includes(us.id));
		const user = await this.prisma.user.findFirst({
			select: {
				id: true,
				avatar: true,
				status:true,
				nickname: true,
				experience_points: true,
			},
			where: {
				id: id,
			},
		});
		friends.push(user);
		return friends.slice().sort((a, b) => b.experience_points - a.experience_points);
	}
	async getGamingData(id: number) {
		const data = await this.prisma.user.findMany({
			where: {
				id: id,
			},
			select: {
				player1: true,
				player2: true,
			},
		});
	}
}
