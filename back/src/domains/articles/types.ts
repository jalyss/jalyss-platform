export type FilterArticle = {
  lte: number; //min price
  gte: number; //max price
  bestRating: boolean;
  bestSaller: boolean;
  new: boolean;
  categories: string[];
  articleTypes: string[];
  publishingHouses: string[];
  authors: string[];
  skip:number
  title:string
};
