import { Controller, Get, Patch } from '@nestjs/common';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}
  @Get("")
  async Handler()
  {
    return await this.inviteService.getdatainvite();
  }

}
