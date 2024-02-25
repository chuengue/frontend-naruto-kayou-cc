export interface CollectionsParams {
  limit?: number;
  page?: number;
  searchQuery?: string;
}
export interface PublicCollectionsResults {
  id: string;
  userId: string;
  title: string;
  description: string;
  collectionType: number;
  isPublic: boolean;
  isPublicPhoneNumber: boolean;
  cardQuantity: number;
  createdAt: string;
  updatedAt: string;
  userData: {
    username: string;
    phoneNumber: string | null;
  };
}
export interface PublicCollectionsResponse {
  itemsPerPage: number;
  page: number;
  results: {
    collections: PublicCollectionsResults[];
  };
  success: boolean;
  totalPages: number;
  totalItems: number;
}
