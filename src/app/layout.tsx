import type { Metadata } from 'next'
import '@/styles/globals.scss'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
    title: 'Fitness Freak',
    description: 'Fitness Freak Website',
}

export default function RootLayout({
    children,
}: {children: React.ReactNode }) {

    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        </head>
        <body >
          <div className='SF Pro'>
            <Navbar/>
            {children}
          </div>
          {/* <Loader>
          <Suspense fallback={<Loading />}>
          <Header/>
          <WhatsAppButton/> */}
          {/* <Footer/>
          </Suspense>
          </Loader> */}
        </body>
      </html>
    )
  }