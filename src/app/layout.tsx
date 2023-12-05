import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Providers } from "../contexts/providers";
import { fjallaOne, monteserrat } from "../styles/fonts";
import { Header } from "@/components/Header";
import { Theme } from "@radix-ui/themes";

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
        <Providers>
          <Theme
            accentColor="amber"
            grayColor="olive"
            panelBackground="solid"
            scaling="100%"
            radius="large"
          >
            <div className="h-screen w-full">
              <Header />
              {children}
            </div>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
