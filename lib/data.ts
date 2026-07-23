import { cars } from "@/data/cars";
import { auctionLots } from "@/data/auctions";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { posts } from "@/data/news";
import type { Car } from "@/types/car";
import type { AuctionLot } from "@/types/auction";
import type { Product, ProductKind } from "@/types/product";
import type { Review, Post } from "@/types/review";

export function getCars(): Car[] {
  return cars;
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export function getRelatedCars(car: Car, limit = 4): Car[] {
  return cars
    .filter((c) => c.id !== car.id && (c.make === car.make || c.featured))
    .slice(0, limit);
}

export function getFeaturedCars(): Car[] {
  return cars.filter((c) => c.featured);
}

export function getSoldCars(): Car[] {
  return cars.filter((c) => c.status === "sold");
}

export function getAvailableCars(): Car[] {
  return cars.filter((c) => c.status === "available" || c.status === "under-offer");
}

export function getLots(): AuctionLot[] {
  return auctionLots;
}

export function getLotBySlug(slug: string): AuctionLot | undefined {
  return auctionLots.find((l) => l.slug === slug);
}

export function getLiveLots(): AuctionLot[] {
  return auctionLots.filter((l) => l.status === "live");
}

export function getUpcomingLots(): AuctionLot[] {
  return auctionLots.filter((l) => l.status === "upcoming");
}

export function getEndedLots(): AuctionLot[] {
  return auctionLots.filter((l) => l.status === "ended");
}

export function getProducts(kind?: ProductKind): Product[] {
  if (kind) return products.filter((p) => p.kind === kind);
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getMerchProducts(): Product[] {
  return products.filter((p) => p.kind === "merch");
}

export function getCollectibles(): Product[] {
  return products.filter((p) => p.kind === "collectible");
}

export function getReviews(): Review[] {
  return reviews;
}

export function getPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured);
}
