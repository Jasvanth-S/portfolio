/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#00F0FF", // Neon Cyan
                secondary: "#112240", // Premium Navy Card Base (was Gunmetal)
                background: {
                    DEFAULT: "#0A192F", // Deep Space Navy (was #050505)
                    light: "#F8FAFC", // Light mode background
                },
                text: {
                    DEFAULT: "#CCD6F6", // Premium Soft White/Blue for Dark mode text
                    light: "#0F172A", // Light mode text
                },
            },
            fontFamily: {
                display: ['Sora', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
                // Elite Typography Categories
                elite: ['Outfit', 'sans-serif'], // Professional & Modern
                alien: ['Orbitron', 'sans-serif'], // Cyberpunk / Tech
                space: ['Syncopate', 'sans-serif'], // Wide Cinematic Sci-Fi
                mech: ['Michroma', 'sans-serif'], // Smooth Futuristic
                signature: ['"Great Vibes"', 'cursive'], // Elegant Cursive
                handwriting: ['Caveat', 'cursive'], // Casual Marker
            }
        },
    },
    plugins: [],
}
