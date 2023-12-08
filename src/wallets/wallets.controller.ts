import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() body: { id: string; symbol: string; price: number }) {
    return this.walletsService.create(body);
  }

  @Get()
  returnAll() {
    return this.walletsService.all();
  }
}
