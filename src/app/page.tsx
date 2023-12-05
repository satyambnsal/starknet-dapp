"use client";

import { Theme } from "@radix-ui/themes";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

/**
 * The accent is the most dominant color in your theme, it is used for primary buttons, links, and other interactive elements.
 * Grays are used for backgrounds, borders, text and other non-interactive elements. for more info, checkout docs folder
 *
 */
export default function Home() {
  return (
    <Theme
      accentColor="amber"
      grayColor="olive"
      panelBackground="solid"
      scaling="100%"
      radius="large"
    >
      <div>
        <Header />
        <Hero />
      </div>
    </Theme>
  );
}
