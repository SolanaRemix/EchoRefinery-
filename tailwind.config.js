/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          google: '#4285F4',
          yelp: '#D32323',
          facebook: '#1877F2',
        },
        sentiment: {
          positive: '#16a34a',
          neutral: '#6b7280',
          negative: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}

