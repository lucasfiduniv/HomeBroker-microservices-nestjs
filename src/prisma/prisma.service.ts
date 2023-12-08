import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEmitter } from 'events';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly eventEmitter = new EventEmitter();

  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: any): void {
    this.eventEmitter.on('beforeExit', async () => {
      await app.close();
    });
  }
}
