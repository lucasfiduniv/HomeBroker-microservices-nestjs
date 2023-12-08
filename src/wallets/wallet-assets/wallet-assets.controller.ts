import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletAssetsService } from './wallet-assets.service';

@Controller('wallets/:wallet_id/assets')
export class WalletAssetsController {
  constructor(private walletAssetsService: WalletAssetsService) {}

  @Get()
  async all(@Param('wallet_id') walletId: string) {
    return this.walletAssetsService.all({ wallet_id: walletId });
  }

  @Post()
  async create(
    @Param('wallet_id') walletId: string,
    @Body() body: { asset_id: string; shares: number },
  ) {
    return this.walletAssetsService.create({ wallet_id: walletId, ...body });
  }
}
