import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RoomsService } from './rooms/rooms.service';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';


@Module({
  exports: [ChatService],
  providers: [ChatService, RoomsService],
  controllers: [ChatController],
  imports: [RoomsModule, MessagesModule]
})
export class ChatModule {}
