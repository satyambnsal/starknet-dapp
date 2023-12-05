import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Providers } from "../contexts/providers";
import { fjallaOne, monteserrat } from "../styles/fonts";
import { Header } from "@/components/Header";

export const metadata = {
  title: "StarkVoice",
  description:
    "Decentralized Voting Platform, designed to empower users by providing a secure and transparent way to participate in decision-making processes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  );
}
