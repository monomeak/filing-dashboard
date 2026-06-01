import { Navbar } from '@/components/navbar'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      {children}
    </div>
  )
}

