import { Category, Post } from '@prisma/client'

export interface BlogData {
  posts: Post[];
  count: number;
}