import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {

  constructor (private readonly prisma: PrismaService) { }

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
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
          experience_points: true
        },
        where: {
          nickname: username
        }
      })
      if (!data)
			throw new HttpException("failed to fetch user", HttpStatus.BAD_REQUEST);
      return data;
    }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const update = await this.prisma.user.update({
      where:{
        id : id,
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
        experience_points: true
      },

    })
    return update;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
  async getFriendship(id: number, friend: number)
	{
		const user = await this.prisma.friendship.findFirst({
			where:{OR : [
        {
          initiator: id,
          reciever : friend
        },
        {
          initiator: friend,
          reciever : id
        }
      ]
			},
		})
		if (user)
      throw new HttpException("ok", 200)
    else
    throw new HttpException("not ok", 400)
	}
}
