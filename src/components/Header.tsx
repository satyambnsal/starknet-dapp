import { Box } from '@radix-ui/themes'
import { ThemeToggle } from './common/ThemeToggle'

export const Header = () => {
  return (
    <Box height="0" className="absolute right-4 top-4">
      <ThemeToggle />
    </Box>
  )
}
