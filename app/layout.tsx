import type { Metadata } from 'next'
import { Lora, Poppins } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Recall — History doesn't repeat. It coheres.",
  description:
    'One question every morning. The answer arrives tomorrow. At the end of each month, thirty apparently disconnected stories reveal they were never disconnected at all.',
  openGraph: {
    title: 'Recall',
    description: "History doesn't repeat. It coheres.",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@recallapp',
    title: 'Recall',
    description: "History doesn't repeat. It coheres.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lora.variable} ${poppins.variable}`}>
      <body
        className="min-h-screen overflow-x-hidden"
        style={{ background: '#070707', color: '#EDE8DF' }}
      >
        {children}
      </body>
    </html>
  )
}
