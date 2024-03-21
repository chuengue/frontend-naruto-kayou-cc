export interface raritiesCards {
  id: string;
  name: string;
  isPromo: number;
  createdAt: string;
  updatedAt: string;
}
export interface raritiesResponse {
  success: boolean;
  results: raritiesCards[];
}
