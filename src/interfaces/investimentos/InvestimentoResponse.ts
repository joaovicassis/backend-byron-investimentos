export interface InvestimentoResponse {
  id: string;
  name: string;
  investedValue: number;
  quantity: number;
  dateInvested: string;
  ticker: string;
  currentPrice?: number;      // Da Brapi
  currentValue?: number;      // currentPrice × quantity
  profitLoss?: number;        // currentValue - investedValue
  profitLossPercentage?: number;
  created_at: string;
  updated_at: string;
}

export interface BuscarTodosInvestimentosResponse {
  investimentos: InvestimentoResponse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
