import { StatusBlog } from "@prisma/client";

export class Blog {}
export type FilterBlog = {
  authorId: string[];
  categoryId: string[];
  confirm: StatusBlog[];
  take: number;
  skip: number;
  trend: number;
};

export const FilterBlogExample = {
  authorId: ['id1', 'id2'],
  categoryId: ['id1', 'id2'],
  confirm: ['confirmed'],
  take: 10,
  skip: 10,
  trend: 0,
};

// Object.entries => [[key,value],[key,value],[key,value]]
// Object.keys=> [key,key,key]
