import { Module } from '@nestjs/common';
import { Service } from './prisma/.service';

@Module({
  providers: [Service]
})
export class PrismaModule {}
