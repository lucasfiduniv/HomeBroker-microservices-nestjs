import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { InitTransactionDto, executeTransactionDto } from './dto/order.dto';

@Controller('wallets/:wallet_id/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  initTransaction(
    @Param('wallet_id') wallet_id,
    @Body() body: InitTransactionDto,
  ) {
    return this.ordersService.startTransaction({
      ...body,
      wallet_id,
    });
  }

  @Post('execute')
  executeTransaction(@Body() body: executeTransactionDto) {
    return this.ordersService.executeTransaction(body);
  }

  @Get()
  all;
}
