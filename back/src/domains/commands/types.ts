export type FilterCommand = {
  userId: string;
  lte: Date; //min date
  gte: Date; // max date
  paid: boolean;
  hasDelivry: boolean;
  delivred: boolean;
  confirm: boolean;
};
