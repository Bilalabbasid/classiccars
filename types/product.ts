export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  kind: "merch" | "collectible";
  price: number;
  compareAt?: number;
  images: string[];
  shortDescription: string;
  description: string;
  variants?: { label: string; options: string[] }[];
  inStock: boolean;
  limited?: boolean;
  offerable?: boolean;
  rating?: number;
}

export type ProductKind = Product["kind"];
