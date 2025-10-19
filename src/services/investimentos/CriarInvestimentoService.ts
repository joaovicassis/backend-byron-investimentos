import { PrismaClient } from '@prisma/client';
import { InvestimentoRequest } from '../../interfaces/investimentos/InvestimentoRequest';
import { InvestimentoResponse } from '../../interfaces/investimentos/InvestimentoResponse';

const prisma = new PrismaClient();

export class CriarInvestimentoService {
  async execute({ name, investedValue, quantity, dateInvested, ticker }: InvestimentoRequest, userId: string): Promise<InvestimentoResponse> {
    const investimento = await prisma.investimento.create({
      data: {
        name,
        investedValue,
        quantity,
        dateInvested: new Date(dateInvested),
        ticker,
        user_id: userId,
      },
      select: {
        id: true,
        name: true,
        investedValue: true,
        quantity: true,
        dateInvested: true,
        ticker: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      id: investimento.id,
      name: investimento.name,
      investedValue: Number(investimento.investedValue),
      quantity: investimento.quantity,
      dateInvested: investimento.dateInvested.toISOString(),
      ticker: investimento.ticker,
      created_at: investimento.created_at.toISOString(),
      updated_at: investimento.updated_at.toISOString(),
    };
  }
}
