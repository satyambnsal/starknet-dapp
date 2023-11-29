import { Box, Badge } from "@radix-ui/themes";
import { ThemeToggle } from "./common/ThemeToggle";
import { ConnectButton } from "./buttons/ConnectButton";
import { useNetwork } from "@starknet-react/core";

export const Header = () => {
  const { chain } = useNetwork();
  console.log(chain);
  return (
    <Box height="0" className="absolute right-4 top-8 flex items-center gap-4">
      {!!chain && !!chain.name && !!chain.network && (
        <Badge highContrast size="2">
          {chain.name} {chain.network}
        </Badge>
      )}
      <ConnectButton />
      <ThemeToggle />
    </Box>
  );
};
