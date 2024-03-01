import { narutoCardInterface } from '@/types/card.types';

export interface CardsResponse
  extends Omit<narutoCardInterface, 'hasFavorite'> {}

export interface NarutoCardsResponse {
  itemsPerPage: number;
  page: number;
  results: CardsResponse[];
  success: boolean;
  totalPages: number;
  totalItems: number;
}
export interface CardsParams {
  limit?: number;
  page?: number;
  box?: string;
  rarity?: string;
  name?: string;
  code?: string;
}
