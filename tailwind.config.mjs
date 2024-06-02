/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/images/fundo_home.png')",
        game: "url('/gameImages/background.png')",
        home2: "url('/images/fundo_home2.png')",
        footer: "url('/images/footer.png')",
        ship: "url('/images/ship_fundo.png')",
        shipCard: "url('/images/shipCard_fundo.png')",
        modal: "url('/images/modal_fundo.png')",
      },
      colors: {
        "purple": "#8761CF",
        "yellow-primary": "#FAF117",
      },
      fontFamily: {
        nexa: ['var(--font-nexa)'],
        sora: ['var(--font-sora)'],
      },
    },
  },
  plugins: [require("daisyui")],
};
