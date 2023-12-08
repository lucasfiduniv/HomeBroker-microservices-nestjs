import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: { id: string; symbol: string; price: number }) {
    // Verificar se o registro já existe
    const existingWallet = await this.prismaService.wallet.findUnique({
      where: { id: data.id },
    });

    if (existingWallet) {
      throw new BadRequestException('Usuário já existe');
    }

    // Se não existir, criar o novo registro
    return this.prismaService.wallet.create({ data });
  }

  all() {
    return this.prismaService.wallet.findMany();
  }
}
