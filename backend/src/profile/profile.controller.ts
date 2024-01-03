import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';

@Controller('profile')
@UseGuards(AtGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Get('')
  // async getCurrent(@GetCurrentUser() current_user) {
  //   console.log('---->', current_user)
  //   return await this.profileService.findOne(current_user.user42);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profileService.findOne(id);
  }

  @Get("friendship/:id")
	async handleGet(@GetCurrentUserId() id:number ,@Param("id") friend: string, @Res() res: Response) {
    console.log("chi laaba", friend, id)
		 await this.profileService.getFriendship(id, +friend);
	}

  @Patch('updateStatus')
  async update(@GetCurrentUserId() id:number, @Body() updateProfileDto: UpdateProfileDto) {
    
    try{
      return await this.profileService.update(id, updateProfileDto);
    }catch{
      throw new HttpException("error updating status", 450)
    }
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}