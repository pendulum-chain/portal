// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
    // eslint-disable-next-line no-undef
    plugins: [require('daisyui')],
    themes: ["pendulum", "amplitude"],
    daisyui: {
        themes: [
            // The colors defined for the following themes have to match the ones defined in the color configuration
            // here: https://daisyui.com/docs/colors
            // Undefined colors will be chosen by daisyUI automatically.
            {
                pendulum: {
                    primary: "#907EA0",
                    "primary-content": "#ffffff",
                    secondary: "#F4F5F6",
                    "secondary-content": "#58667E",
                    accent: "#1DE7DF",
                    neutral: "#EFF2F5",
                    "base-100": "#fbfcfe",
                    "base-200": "#ffffff",
                    "base-content": "#58667E",

                    "--rounded-btn": "9px",
                    "--btn-text-case": "none",
                },
                amplitude: {
                    primary: "#4EE59A",
                    "primary-content": "#ffffff",
                    secondary: "#F4F5F6",
                    "secondary-content": "#58667E",
                    accent: "#00F197",
                    "accent-content": "#ffffff",
                    neutral: "#191D24",
                    "neutral-focus": "#111318",
                    "neutral-content": "#A6ADBB",
                    "base-100": "#1c1c1c",
                    "base-200": "#202020",
                    "base-content": "#FFFFFF",

                    "--rounded-btn": "9px",
                    "--btn-text-case": "none",
                }
            },
        ],
    }
};
