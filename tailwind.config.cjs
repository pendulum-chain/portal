// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  themes: ["pendulum", "amplitude"],
  daisyui: {
    themes: [
      {
        pendulum: {
          background: "#F5F5F5",
          primary: "#907EA0",
          "primary-content": "#fff",
          secondary: "#F4F5F6",
          "secondary-content": "#58667E",
          accent: "#1DE7DF",
          neutral: "#EFF2F5",
          green: "hsla(137, 91%, 41%, 1)",
          "--rounded-btn": "9px",
          "--btn-text-case": "none",
        },
        amplitude: {
          primary: "#4EE59A",
          "primary-content": "#ffffff",
          secondary: "#F4F5F6",
          "secondary-content": "#58667E",
          accent: "#00F197",
          neutral: "#191D24",
          "accent-content": "#ffffff",
          "neutral-focus": "#111318",
          "neutral-content": "#A6ADBB",
          "base-100": "#202020",
          "base-200": "#1C1C1C",
          // "base-300": "#20252E",
          "base-content": "#FFFFFF",
          "--rounded-btn": "9px",
          "--btn-text-case": "none",
        }
      },
    ],
  }
};
