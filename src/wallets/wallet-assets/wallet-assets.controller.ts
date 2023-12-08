import { Controller } from '@nestjs/common';

@Controller('wallet-assets')
export class WalletAssetsController {

    @Get()
    all(@Param('wallet_id') wallet_id:string){
        console.log('wallet_id,wallet_id');
        return this.walletAssetsService.all({wallet_id})
    }
}
