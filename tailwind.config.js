/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'vmap-red': '#c41e3a',
                'vmap-orange': '#e85d04',
                'vmap-bg': '#fafafa',
                'vmap-text': '#1a1a1a',
                'vmap-text-secondary': '#4a4a4a',
            },
        },
    },
    plugins: [],
}
