import { PrismaClient, Prisma, friendship_status } from "@prisma/client";
import * as DATA from "../csv/MGSData/users.json"

const fs = require('fs');
const prisma = new PrismaClient();

const users = [];
const friendshps = [];


const seedUsers = async () => {
	const users = DATA["users"]

	for (const user of users)
	{
		await prisma.user.create({
            data: {
                user42: user.user42,
                nickname: user.nickname
            }
        })
	}
}

const seedFriendships = async () => {
	const friendshps = DATA['friendships']
	
	for (const friendship of friendshps)
	{
		await prisma.friendship.create({
			data: {
				id: friendship['id'],
				initiator: friendship['initiator'],
				reciever: friendship['reciever'],
				status: friendship_status.acepted
			}
		});
	}
}

const seeder = async () => {
	await seedUsers();
	await seedFriendships();
}

const resetAll = async () => {
	await prisma.$queryRaw`ALTER SEQUENCE user_id_seq RESTART WITH 1;`
	await prisma.$queryRaw`ALTER SEQUENCE friendship_id_seq RESTART WITH 1;`
	await prisma.$queryRaw`ALTER SEQUENCE matchhistory_id_seq RESTART WITH 1;`
	await prisma.user.deleteMany({})
	await prisma.friendship.deleteMany({})
}

(async () => {
	console.log('Connecting to database...');
	await prisma.$connect();
	console.log('Reseting database...');
	await resetAll();
	console.log('Seeding users and friendships...');
    await seeder();
	console.log('Disconnecting from database...');
    await prisma.$disconnect();
})()