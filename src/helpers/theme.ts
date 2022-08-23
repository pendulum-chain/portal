import { useTheme } from "react-daisyui"

const { setTheme } = useTheme();

type themeType = 'pendulum' | 'amplitud';

const themeSwap = (themeName: themeType) => {
  document
    .getElementsByTagName('html')[0]
    .setAttribute('data-theme', themeName);
  window.localStorage.setItem('sb-react-daisyui-preview-theme', themeName);
  setTheme(themeName);
}

export default themeSwap;
