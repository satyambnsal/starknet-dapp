import './globals.css'
import '@radix-ui/themes/styles.css'
import './theme-config.css'
import { Providers } from './providers'
import { fjallaOne, monteserrat } from '../styles/fonts'

export const metadata = {
  title: 'WeWereHere Frontend',
  description: 'WeWereHere Frontend DApp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${monteserrat.variable}, ${fjallaOne.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
