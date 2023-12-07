import React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";

export const ThemeToggle = () => {
  const { theme, systemTheme, setTheme } = useTheme();
  console.log({ theme });
  return (
    <>
      <IconButton
        size="3"
        variant="ghost"
        color="gray"
        onClick={() => {
          // Set 'system' theme if the next theme matches the system theme
          const resolvedTheme = theme === "system" ? systemTheme : theme;
          const newTheme = resolvedTheme === "dark" ? "light" : "dark";
          setTheme(newTheme);
        }}
        className="p-6"
      >
        <SunIcon
          width="16"
          height="16"
          style={{ display: "var(--theme-toggle-sun-icon-display)" }}
        />
        <MoonIcon
          width="16"
          height="16"
          style={{ display: "var(--theme-toggle-moon-icon-display)" }}
        />
      </IconButton>
    </>
  );
};
