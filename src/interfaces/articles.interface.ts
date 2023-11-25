export interface articlesInterface {
  _id: string;
  name: string;
  price: number;
  category: Array<string>;
  image: string;
  storeID: string;
  available: boolean;
  quantity: number;
  updatedAt: string;
  perPiece: boolean;
  position?: number;
  count: number;
  tags: Array<string>;
}
