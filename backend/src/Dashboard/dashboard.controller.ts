import { Controller, Get, Post, Body, Param, Res, Patch } from "@nestjs/common";
import DashboardService from "./dashboard.service";
import { IsInt } from "class-validator";
import { Response } from "express";

@Controller("dashboard")
export class DashboardController {
	constructor(private readonly service: DashboardService) {}

	@Get("friendship/:id")
	async handleGet(@Param("id") id: number, @Res() res: Response) {
		const friends = await this.service.getFriendship(id);
		if (!friends) return res.status(401).json("frindship not found");
		console.log(friends);
		res.status(200).json(friends);
	}
	@Get("getName/:id")
	async getName(@Param("id") id: number, @Res() res: Response) {
		try {
			const data = await this.service.getName(id);
			if (!data) return res.status(401).json("user not found");
			return res.status(200).json(data);
		} catch (err) {
			res.status(500).json("Error occured here");
		}
	}

	@Patch("statusPost/:id/:status")
	async handleStatusUpdate(@Param("status") status: string, @Param("id") id: number, @Res() res: Response) {
		try {
			await this.service.update(id, status);
			res.status(200).json({message: "user updated succefully", userStatus: status} );
		} catch (err) {
			console.log(err)
			res.status(401).json("Error occured while updating your shit");
		}
	}
	// @Get("achievements/:id")
	// async getAchievements(@Param("achieved") status: [], @Param("id") id: number, @Res() res: Response) {
	// 	try{
	// 		const data = await this.service.getAchievements(id)
	// 	}catch (err){
	// 		console.log(err)
	// 		res.status(401).json("Error occured while getting achievements");
	// 	}
	// }
}
