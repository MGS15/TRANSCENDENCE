import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, Res } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { GetCurrentUser, GetCurrentUserId, Public } from "src/common/decorators";
import { AtGuard } from "src/common/guards";

@Controller("profile")
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get("user/:id")
	async findOne(@Param("id") id: string) {
		return await this.profileService.findOne(id);
	} 

	@Get("friendship/:id")
	async handleGet(@GetCurrentUserId() id: number, @Param("id") friend: string, @Res() res: Response) {
		await this.profileService.getFriendship(id, +friend);
	}

	@Patch("updateStatus")
	async update(@GetCurrentUserId() id: number, @Body() updateProfileDto: UpdateProfileDto) {
		try {
			return await this.profileService.update(id, updateProfileDto);
		} catch {
			throw new HttpException("error updating status", 450);
		}
	}

	@Get("achieved")
	async getachieved(@GetCurrentUserId() id: number){

	}

	@Get("Stats")
	async getStats(@GetCurrentUserId() id: number){
	}

	@Get(":id/GLadder")
	async getGBoard(nickname:string){
		const res = await this.profileService.getGlobalBoard(nickname);
		return res
	}

	@Get(":id/FLadder")
	async getFBoard(@GetCurrentUserId() id: number){
		return await this.profileService.getFriendships(id)
	}
	@Get("MatcHistory")
	async getMatchHistory(@GetCurrentUserId() id: number){

	}
}
