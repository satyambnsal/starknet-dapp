import { monteserrat } from "@/styles/fonts";
import { Heading, Text } from "@radix-ui/themes";
import { LoyaltyToken } from "../LoyaltyToken";
import { StarkVoiceInstance } from "../StarkVoice";

export const HomePageContent = () => {
  return (
    <main className="text-color-indigo flex min-h-screen flex-col items-center justify-between p-24">
      <StarkVoiceInstance />
    </main>
  );
};
