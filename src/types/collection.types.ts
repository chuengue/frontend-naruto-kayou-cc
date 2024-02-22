export interface CollectionData {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  collectionType: 1 | 2;
  isPublic: boolean;
  isPublicPhoneNumber: boolean;
  createdAt: string;
  updatedAt: string;
  userData: {
    username: string;
    phoneNumber: string | null;
  };
}
