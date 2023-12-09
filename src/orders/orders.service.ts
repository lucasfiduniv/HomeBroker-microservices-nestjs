import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  InitTransactionDto,
  executeTransactionDto,
} from '../orders/dto/order.dto';
import { OrderStatus, OrdersType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  all(filter: { wallet_id: string }) {
    return this.prismaService.orders.findMany({
      where: {
        wallet_id: filter.wallet_id,
      },
      include: {
        Transactions: true,
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  startTransaction(input: InitTransactionDto) {
    return this.prismaService.orders.create({
      data: {
        asset_id: input.asset_id,
        wallet_id: input.wallet_id,
        shares: input.shares,
        price: input.price,
        type: input.type,
        status: OrderStatus.PENDING,
        partial: input.shares,
      },
    });
  }

  async executeTransaction(input: executeTransactionDto) {
    return this.prismaService.$transaction(async (prisma) => {
      const order = await prisma.orders.findUniqueOrThrow({
        where: { id: input.order_id },
      });
      await prisma.orders.update({
        where: { id: input.order_id },
        data: {
          partial: order.partial - input.negotiated_share,
          status: input.status,
          Transactions: {
            create: {
              broker_transaction_id: input.broker_transaction_id,
              related_invest_id: input.related_invest_id,
              shares: input.negotiated_share,
              price: input.price,
            },
          },
        },
      });
      if (input.status === OrderStatus.CLOSED) {
        await prisma.asset.update({
          where: { id: order.asset_id },
          data: {
            price: input.price,
          },
        });
        const walletAsset = await prisma.walletAsset.findUnique({
          where: {
            wallet_id_asset_id: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
            },
          },
        });
        if (walletAsset) {
          await prisma.walletAsset.update({
            where: {
              wallet_id_asset_id: {
                asset_id: order.asset_id,
                wallet_id: order.wallet_id,
              },
            },
            data: {
              shares:
                order.type === OrdersType.BUY
                  ? walletAsset.shares + order.shares
                  : walletAsset.shares - order.shares,
            },
          });
        } else {
          await prisma.walletAsset.create({
            data: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
              shares: input.negotiated_share,
            },
          });
        }
      }
    });
  }
}
