'use client'

import { Wallet } from '@/components/Wallet'
import { Theme } from '@radix-ui/themes'
import { HomePageContent } from '../components/containers/HomePage'
import { useTheme } from 'next-themes'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <Theme accentColor="indigo" grayColor="slate">
      <div>
        <Header />
        <HomePageContent />
      </div>
    </Theme>
  )
}
