import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {InitTransactionDto} from "../orders/dto/order.dto"
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {

    constructor(private prismaService:PrismaService){}

    startTransaction(input:InitTransactionDto){
        return this.prismaService.orders.create({
            data:{
                asset_id: input.asset_id,
                wallet_id: input.wallet_id,
                shares: input.shares,
                price:input.price,
                type:input.type,
                status:OrderStatus.PENDING,
                partial:input.shares
            }
        })
    }
}
