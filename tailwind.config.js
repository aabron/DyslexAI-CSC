/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      'reddit': ['Reddit Mono', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#60A5FA',
        accent: '#10B981',
        neutral: '#6B7280',
        background: '#FFFFFF',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}

