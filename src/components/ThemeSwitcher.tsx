// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowsCounterClockwise } from "@phosphor-icons/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      {theme === "dark" ? <Button color="primary" variant="light" onPress={() => setTheme("light")}
        startContent={<ArrowsCounterClockwise size={20} color="white" />}>
          Light
      </Button> : <Button color="primary" variant="light" onPress={() => setTheme("dark")}
        startContent={<ArrowsCounterClockwise size={20} color="black" mirrored />}>
          Dark
      </Button>}
    </div>
  );
}