export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content?: string;
  text?: string;
  role?: string;
  carBought?: string;
  car?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  featured: boolean;
}
