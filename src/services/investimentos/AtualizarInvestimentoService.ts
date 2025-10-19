import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import { AtualizarInvestimentoRequest } from '../../interfaces/investimentos/AtualizarInvestimentoRequest';
import { InvestimentoResponse } from '../../interfaces/investimentos/InvestimentoResponse';
import { BrapiResponse, BrapiQuoteItem } from '../../interfaces/investimentos/BrapiTypes';

const prisma = new PrismaClient();

export class AtualizarInvestimentoService {
  async execute({ id, quantity }: AtualizarInvestimentoRequest, userId: string): Promise<InvestimentoResponse> {
    const investimentoExistente = await prisma.investimento.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!investimentoExistente) {
      throw new Error('Investimento não encontrado');
    }

    const investimento = await prisma.investimento.update({
      where: { id },
      data: { quantity },
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

    // Buscar preço atual na Brapi
    let currentPrice = 0;
    try {
      const brapiUrl = process.env.BRAPI_URL || 'https://brapi.dev/api';
      const brapiToken = process.env.BRAPI_TOKEN;
      
      const url = `${brapiUrl}/quote/${investimento.ticker}${brapiToken ? `?token=${brapiToken}` : ''}`;
      const response = await fetch(url);
      const data = await response.json() as BrapiResponse<BrapiQuoteItem>;
      
      if (data.results && data.results.length > 0 && data.results[0]) {
        currentPrice = data.results[0].regularMarketPrice || 0;
      }
    } catch (error) {
      console.warn('Erro ao buscar preço na Brapi:', error);
    }

    const currentValue = currentPrice * investimento.quantity;
    const profitLoss = currentValue - Number(investimento.investedValue);
    const profitLossPercentage = Number(investimento.investedValue) > 0 
      ? (profitLoss / Number(investimento.investedValue)) * 100 
      : 0;

    return {
      id: investimento.id,
      name: investimento.name,
      investedValue: Number(investimento.investedValue),
      quantity: investimento.quantity,
      dateInvested: investimento.dateInvested.toISOString(),
      ticker: investimento.ticker,
      currentPrice,
      currentValue,
      profitLoss,
      profitLossPercentage,
      created_at: investimento.created_at.toISOString(),
      updated_at: investimento.updated_at.toISOString(),
    };
  }
}
