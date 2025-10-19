import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import { BuscarTodosInvestimentosRequest } from '../../interfaces/investimentos/BuscarTodosInvestimentosRequest';
import { BuscarTodosInvestimentosResponse } from '../../interfaces/investimentos/InvestimentoResponse';
import { BrapiResponse, BrapiQuoteItem } from '../../interfaces/investimentos/BrapiTypes';

const prisma = new PrismaClient();

export class BuscarTodosInvestimentosService {
  async execute({ userId, page = 1, limit = 10 }: BuscarTodosInvestimentosRequest): Promise<BuscarTodosInvestimentosResponse> {
    const skip = (page - 1) * limit;
    const take = Math.min(limit, 50); // Máximo 50 itens por página

    const [investimentos, totalItems] = await Promise.all([
      prisma.investimento.findMany({
        where: { user_id: userId },
        skip,
        take,
        orderBy: { created_at: 'desc' },
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
      }),
      prisma.investimento.count({
        where: { user_id: userId },
      }),
    ]);

    // Enriquecer com dados da Brapi
    const investimentosComBrapi = await Promise.all(
      investimentos.map(async (investimento) => {
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
          console.warn(`Erro ao buscar preço para ${investimento.ticker}:`, error);
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
      })
    );

    const totalPages = Math.ceil(totalItems / take);

    return {
      investimentos: investimentosComBrapi,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: take,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
