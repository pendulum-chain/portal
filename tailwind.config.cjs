// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  themes: ['light', 'dark'],
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
          background: "#202020",
          primary: "#00F197",
          "primary-content": "#fff",
          secondary: "#F4F5F6",
          "secondary-content": "#58667E",
          accent: "#00F197",
          neutral: "#EFF2F5",
          green: "hsla(137, 91%, 41%, 1)",
          "--rounded-btn": "9px",
          "--btn-text-case": "none",
        }
      },
      "dark",
      "cupcake",
    ],
  }
};
