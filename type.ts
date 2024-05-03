import { Category, Post } from '@prisma/client'

export interface BlogData {
  posts: Post[];
  count: number;
}

// I had to make my own type for user, nestcomment and comment 
// cz the createdAt at on @prisma/client  is a Date type so to match with the
// comment.tsx I had to type it as a string here
export interface User {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface NestComment {
  id: string;
  desc: string;
  userEmail: string;
  commentId: string;
  createdAt: string;
  user: User;
}

export interface Comment {
  id: string;
  desc: string;
  userEmail: string;
  postSlug: string;
  createdAt: string;
  NestComments: NestComment[];
  user: User;
}

export interface UpdatedPost {
  id: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  views: number;
  catSlug: string;
  userEmail: string;
  createdAt: string;
}