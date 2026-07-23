import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import Container from "@/components/ui/container"
import { getCarBySlug } from "@/lib/data"
import CarDetailClient from "./client"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params
  const car = getCarBySlug(slug)
  if (!car) notFound()
  return <CarDetailClient car={car} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const car = getCarBySlug(slug)
  if (!car) return { title: "Car Not Found" }
  return {
    title: `${car.make} ${car.model} ${car.variant}`,
    description: car.strapline,
  }
}
