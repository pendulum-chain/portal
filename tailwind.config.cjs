module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  plugins: [require('daisyui')],
  themes: ['light', 'dark'],
  daisyui: {
    themes: [
      {
        pendulum: {
          primary: "#907EA0",
          "primary-content": "#fff",
          secondary: "#F4F5F6",
          "secondary-content": "#58667E",
          accent: "#1DE7DF",
          neutral: "#EFF2F5",
          green: "hsla(137, 91%, 41%, 1)",
          "base-100": "#ffffff",
          "--rounded-btn": "9px",
          "--btn-text-case": "none"
        },
      },
      "dark",
      "cupcake",
    ],
  }
};
