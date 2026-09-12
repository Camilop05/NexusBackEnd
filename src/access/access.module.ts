import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AccessController } from './access.controller';
import { AccessRepository } from './access.repository';
import { AccessService } from './access.service';

@Module({
  imports: [PrismaModule],
  controllers: [AccessController],
  providers: [AccessService, AccessRepository],
})
export class AccessModule {}
