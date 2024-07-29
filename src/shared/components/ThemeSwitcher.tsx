import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  // States
  const [, setMounted] = useState<boolean>(false);
  // Access the current theme and the function to set the theme from the useTheme hook
  const { theme, setTheme } = useTheme();

  //** useEffect to set the mounted state to true after the component mounts */
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Switch
        defaultSelected
        size="sm"
        color="default"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
      </Switch>
    </>
  );
}
