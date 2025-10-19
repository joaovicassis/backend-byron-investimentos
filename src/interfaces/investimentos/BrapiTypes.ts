// Tipos da API Brapi
export interface BrapiStockItem {
  stock?: string;    // Ticker da ação (ex: PETR4)
  name?: string;    // Nome da empresa
  close?: number;    // Preço de fechamento
}

export interface BrapiQuoteItem {
  symbol?: string;              // Ticker
  shortName?: string;           // Nome curto
  regularMarketPrice?: number; // Preço atual
}

export interface BrapiResponse<T> {
  results?: T[];
  error?: string;
}
