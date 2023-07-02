export class Training {}
export type FilterSession = {
    categoryId: string[];
    take: number;
    skip: number;
  };
  
  export const FilterSessionExample = {
    categoryId: ['id1', 'id2'],
    take: 10,
    skip: 10,
  };
  