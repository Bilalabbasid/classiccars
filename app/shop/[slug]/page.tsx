import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/data"
import ShopDetailClient from "./client"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ShopDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <ShopDetailClient product={product} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Product Not Found" }
  return { title: product.name, description: product.shortDescription }
}
