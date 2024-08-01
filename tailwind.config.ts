import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      backgroundSize: {
        "50%": "50%",
        "70%": "70%",
        "75%": "75%",
        "40%": "40%",
        "30%": "30%",
        "25%": "25%",
        "20%": "20%",
        "10%": "10%",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontWeight: {
        bold: "600",
        medium: "500",
        regular: "400",
      },
      colors: {
        black: "#161817",
        white: "#ffffff",
        main: {
          8: "#008575",
          7: "#00B8A2",
          6: "#00ebce",
          5: "#1fffe4",
          4: "#52ffea",
          3: "#85fff0",
          2: "#b8fff6",
          1: "#ebfffd",
        },
        green: {
          2: "#c8f683",
          1: "#ddfab3",
        },
        red: {
          3: "#E9430C",
          2: "#f9ae94",
          1: "#fcd3c5",
        },
        yellow: {
          2: "#ffec99",
          1: "#fff6cc",
        },
        gray: {
          5: "#303634",
          4: "#57605d",
          3: "#899490",
          2: "#bfc5c3",
          1: "#ffffff",
        },
      },
      animation: {
        spin: "spin 5s linear infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
};
export default config;
