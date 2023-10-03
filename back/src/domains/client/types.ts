export type FilterClient = {
  lte: number; //min price
  gte: number; //max price
  // bestRating: boolean;
  // bestSaller: boolean;
  // new: boolean;
  fullNameEn: string;
  // categories: string[];
  // articleTypes: string[];
  // publishingHouses: string[];
  // authors: string[];
  skip: number;
  take: number;
};
