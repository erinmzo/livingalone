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
      colors: {
        black: "#161817",
        green: {
          5: "#BFC5C3",
          4: "#899490",
          3: "#b8ffe5",
          2: "#00eb96",
          1: "#008555",
        },
        red: {
          3: "#FCD3C5",
          2: "#F9AE94",
          1: "#E9430C",
        },
        yellow: {
          2: "#fff6cc",
          1: "#ffec99",
        },
        gray: {
          5: "#bfc5c3",
          4: "#899490",
          3: "#57605d",
          2: "#303634",
          1: "#161817",
        },
      },
    },
  },
};
export default config;
