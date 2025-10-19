export interface InvestimentoRequest {
  name: string;
  investedValue: number;
  quantity: number;
  dateInvested: string; // ISO date string
  ticker: string;
}
