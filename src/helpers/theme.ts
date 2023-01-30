import { useState } from "preact/hooks";
import { useTheme } from "react-daisyui";

type themeType = "light" | "black"; // pendulum / amplitud

const useThemeSwap = (themeName: themeType) => {
  const [_, setThemeType] = useState<string>("");
  const { setTheme } = useTheme();

  document
    .getElementsByTagName("html")[0]
    .setAttribute("data-theme", themeName);
  window.localStorage.setItem("sb-react-daisyui-preview-theme", themeName);
  setTheme(themeName);
  setThemeType(themeName);
  localStorage.setItem("theme", themeName);
};

export default useThemeSwap;
