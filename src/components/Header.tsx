import { Box } from "@radix-ui/themes";
import { ThemeToggle } from "./common/ThemeToggle";
import { ConnectButton } from "./buttons/ConnectButton";

export const Header = () => {
  return (
    <Box height="0" className="absolute right-4 top-8 flex items-center gap-4">
      <ConnectButton />
      <ThemeToggle />
    </Box>
  );
};
