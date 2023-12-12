import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InviteService {
    constructor(private readonly prisma: PrismaService) {}

    async getdatainvite()
    {

        const userid = 2;
        const invites = await this.prisma.invites.findMany({
            where:
            {
                reciever:userid,
            },
            select:
            {
                id:true,
                type:true,
                created_at:true,
                status:true,
                issuer_id:
                {
                    select:
                    {
                        id:true,
                        nickname:true,
                        user42:true,
                        avatar:true
                    },
                },
                room_id: {
                    select: {
                        name: true
                    }
                },
            },
        })
        return (invites);
    }
}
