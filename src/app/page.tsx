import { Wallet } from '@/components/Wallet'
import { Theme } from '@radix-ui/themes'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Wallet />
    </main>
  )
}
