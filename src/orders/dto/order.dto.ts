import { OrderStatus, OrdersType } from '@prisma/client';

export class InitTransactionDto {
  asset_id: string;
  wallet_id: string;
  shares: number;
  type: OrdersType;
  price: number;
}

export class executeTransactionDto {
  order_id: string;
  price: number;
  status: OrderStatus;
  related_invest_id: string;
  broker_transaction_id: string;
  negotiated_share: number;
}
