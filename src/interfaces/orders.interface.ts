import { articlesInterface } from './articles.interface';

export interface ordersInterface {
  _id: string;
  storeID: string;
  storeName: string;
  userID: string;
  picture: string;
  articles: Array<articlesInterface>;
  total: number;
  description: string;
  address: string;
  phoneNumber: string;
  timeOfArrival: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
