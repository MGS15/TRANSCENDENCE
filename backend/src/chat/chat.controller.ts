import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { user_permission, roomtype } from "@prisma/client";
import { RoomDto, MessageDto } from "../Dto/rooms.dto";
import { IsNotEmpty, MinLength, MaxLength, ValidateIf, IsEnum, IsString, IsNumber, Min } from "class-validator";
import { RoomPermitions } from "src/common/decorators/RoomPermitions.decorator";
import { RoomType } from "src/common/decorators/RoomType.decorator";
import { IsFriend } from "src/common/decorators/Friend.decorator";
import { query } from "express";
import { GetCurrentUser, GetCurrentUserId } from "src/common/decorators";

@Controller("chat")
export class ChatController {
	constructor(private readonly service: ChatService) {}

	/**
	 *
	 */
	@Get("town")
	async getHumanRooms(@GetCurrentUserId() id:number) {
		return this.service.messages.get_rooms(id);
	}
	/**
	 *
	 *
	 */
	@Get("comunication")
	async humanFetchMessage(@GetCurrentUserId() id:number) {
		console.log("hi");
		return await this.service.messages.get_messages(id);
	}
	/**
	 *
	 */
	@Post("comunication")
	@RoomPermitions(user_permission.owner, user_permission.admin, user_permission.participation, user_permission.chat)
	async humanSentMessage(@Query("room") room: number, @Body() message: MessageDto, @GetCurrentUserId() id:number) {
		return await this.service.messages.send_message(id, room, message.text);
	}
	@Get("paginate")
	@RoomPermitions(user_permission.owner, user_permission.admin, user_permission.participation, user_permission.chat)
	async humansatisfy(@Query("room") room: number,@Query("offset") ofsset:number, @GetCurrentUserId() id:number)
	{
		console.log(room, ofsset)
		return await this.service.messages.satisfy(id,room, ofsset);
	}

	/**
	 *
	 * /\
	 * message service
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 * room service
	 * \/
	 *
	 */
	@Post("creation")
	async roomAddExistance(@Body() Room: RoomDto , @GetCurrentUserId() id:number) {
		return await this.service.rooms.create_room(id, Room);
	}
	/**
	 * @description
	 */
	@Delete("creation")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async roomDellExistance(@Query("room") room: number) {
		return await this.service.rooms.delete_room(room);
	}

	/**
	 * @description invite only chanels have there own way of joining
	 */
	@Post("humans")
	@RoomType(roomtype.protected, roomtype.public)
	async roomHumansJoin(@Query("room") room: number, @Body() Room: RoomDto, @GetCurrentUserId() id:number) {
		return await this.service.rooms.join_room(id, room, Room);
	}
	/**
	 * @description
	 */
	@Delete("humans")
	@RoomPermitions(user_permission.admin, user_permission.participation)
	@RoomType(roomtype.protected, roomtype.public, roomtype.private)
	async roomHumansLeave(@Query("room") room: number, @GetCurrentUserId() id:number) {
		return await this.service.rooms.leave_room(id, room);
	}

	/**
	 *
	 * @param room
	 * @param friend
	 * @returns
	 */
	@Patch("modify")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.protected, roomtype.public, roomtype.private)
	async roomHumansmodify(@Query("room") room: number, @Body() Room: RoomDto , @GetCurrentUserId() id:number) {
		console.log(room, "dtrodzeb");
		return await this.service.rooms.modify_room(id, room, Room);
	}
	@Post("humans/invite")
	@IsFriend()
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async roomHumanInvite(@Query("room") room: number, @Query("friend") friend: number , @GetCurrentUserId() id:number) {
		return await this.service.rooms.invite_room(id, friend, room);
	}

	/**
	 * @description
	 */
	@Post("block")
	@RoomPermitions(user_permission.chat)
	@RoomType(roomtype.chat)
	async HumanBlock(@Query("room") room: number, @Query("target") target: number, @GetCurrentUserId() id:number) {
		//block_user
		return await this.service.rooms.block_user(id, target, room);
	}
	/**
	 * @description
	 */
	@Patch("block")
	@RoomPermitions(user_permission.chat)
	@RoomType(roomtype.chat)
	async humanUnblock(@Query("room") room: number, @Query("target") target: number, @GetCurrentUserId() id:number) {
		// unblock_user
		return await this.service.rooms.unblock_user(id, target, room);
	}

	/**
	 *
	 */
	@Post("kick")
	@RoomPermitions(user_permission.admin, user_permission.owner)
	@RoomType(roomtype.protected, roomtype.public, roomtype.private)
	async roomHumanskick(@Query("room") room: number, @Query("target") user: number) {
		return await this.service.rooms.kick_room(user, room);
	}

	/**
	 *
	 */
	@Post("ban")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async humanBan(@Query("room") room: number, @Query("target") target: number) {
		//mute_user
		return await this.service.rooms.ban_user(target, room);
	}
	/**
	 * @description
	 */
	@Patch("ban")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async humanuBan(@Query("room") room: number, @Query("target") target: number) {
		//mute_user
		return await this.service.rooms.unban_user(target, room);
	}
	/**
	 * @description
	 */
	@Post("mute")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async humanMute(@Query("room") room: number, @Query("target") target: number) {
		//mute_user
		return await this.service.rooms.mute_user(target, room);
	}
	/**
	 * @description
	 */
	@Patch("mute")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async humanuMute(@Query("room") room: number, @Query("target") target: number) {
		//mute_user
		return await this.service.rooms.unmute_user(target, room);
	}
	/**
	 *
	 * @description
	 */
	@Post("diwana")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async giveHumanAuth(@Query("room") room: number, @Query("target") user: number) {
		return await this.service.rooms.give_room_admin(room, user);
	}
	/**
	 * @description
	 */
	@Patch("diwana")
	@RoomPermitions(user_permission.owner, user_permission.admin)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async takeHumanAuth(@Query("room") room: number, @Query("target") user: number) {
		return await this.service.rooms.revoke_room_admin(room, user);
	}
	@Patch("lwert")
	@RoomPermitions(user_permission.owner)
	@RoomType(roomtype.private, roomtype.protected, roomtype.public)
	async giveOwnership(@Query("room") room: number, @Query("target") user: number, @GetCurrentUserId() id:number) {
		return await this.service.rooms.giveOwnership(id, room, user);
	}
}
