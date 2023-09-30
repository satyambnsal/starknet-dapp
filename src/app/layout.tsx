import { Theme } from '@radix-ui/themes'
import './globals.css'
import '@radix-ui/themes/styles.css'
import './theme-config.css'
import { Providers } from './providers'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Name Registry Frontend',
  description: 'Name Registry Frontend App',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <Providers>
          <Theme panelBackground="translucent" accentColor="lime" grayColor="sand">
            {children}
          </Theme>
        </Providers>
      </body>
    </html>
  )
}
