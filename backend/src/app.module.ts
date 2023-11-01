import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamModule } from './stream/stream.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [StreamModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
