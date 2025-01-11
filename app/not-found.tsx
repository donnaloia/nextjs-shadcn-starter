import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 pl-16 ml-12">
      <Image
        src="/images/404.webp"
        alt="404 illustration"
        width={440}
        height={440}
        priority
        className="mb-8"
      />
      <h2 className="text-4xl font-bold text-[#412C72]">Four Oh Four</h2>
      <p className="text-xl text-muted-foreground mt-2">Could not find the requested resource</p>
      <Link 
        href="/"
        className="text-[#412C72] hover:text-[#412C72]/80 underline underline-offset-4"
      >
        Return Home
      </Link>
    </div>
  )
} 