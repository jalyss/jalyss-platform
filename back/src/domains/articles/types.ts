export type FilterArticle = {
  lte: number; //min price
  gte: number; //max price
  bestRating: boolean;
  bestSaller: boolean;
  new: boolean;
  category: string;
  type: string;
};
