import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-display text-[clamp(4rem,10vw,8rem)] leading-none tracking-tighter text-chrome">404</h1>
        <p className="mt-4 font-display text-2xl tracking-tight">Page Not Found</p>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="mt-8 inline-block text-sm font-medium text-accent hover:underline">
          Return Home
        </Link>
      </div>
    </div>
  )
}
