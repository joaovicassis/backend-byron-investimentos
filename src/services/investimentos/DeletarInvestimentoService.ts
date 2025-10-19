import { PrismaClient } from '@prisma/client';
import { DeletarInvestimentoRequest } from '../../interfaces/investimentos/DeletarInvestimentoRequest';

const prisma = new PrismaClient();

export class DeletarInvestimentoService {
  async execute({ id }: DeletarInvestimentoRequest, userId: string): Promise<{ message: string }> {
    const investimento = await prisma.investimento.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!investimento) {
      throw new Error('Investimento não encontrado');
    }

    await prisma.investimento.delete({
      where: { id },
    });

    return { message: 'Investimento removido com sucesso' };
  }
}
