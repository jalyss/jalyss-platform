export class Blog {}
export type FilterBlog = {
  authorIds: string[];
  categoryIds: string[];
  confirm: number;
  take: number;
  skip: number;
  trend: number;
};

export const FilterBlogExample = {
  authorIds: ['id1', 'id2'],
  categoryIds: ['id1', 'id2'],
  confirm: 1,
  take: 10,
  skip: 10,
  trend: 0,
};

// Object.entries => [[key,value],[key,value],[key,value]]
// Object.keys=> [key,key,key]
