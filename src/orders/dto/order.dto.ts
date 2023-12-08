import { OrderStatus, OrdersType } from "@prisma/client";

export class InitTransactionDto {
asset_id: string;
wallet_id: string;
shares: number;
type : OrdersType;
price: number;
}