import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { InitTransactionDto, executeTransactionDto,  } from './dto/order.dto'; // Certifique-se de importar o DTO corretamente

@Controller('wallets/:wallet_id/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  initTransaction(
    @Param('wallet_id') walletId: string,
    @Body() body: Omit<InitTransactionDto, 'wallet_id'>,
  ): Promise<any> {
    return this.ordersService.startTransaction({
      ...body,
      wallet_id: walletId,
    });
  }

  @Post('execute')
  executeTransaction(
    @Body() body: Omit<executeTransactionDto, 'wallet_id'>,
  ): Promise<any> {
    return this.ordersService.executeTransaction(body);
  }

  @Get()
  all(@Param('wallet_id') walletId: string) {
    return this.ordersService.all({ wallet_id: walletId });
  }
}
