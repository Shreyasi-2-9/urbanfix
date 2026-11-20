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
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#176B4D', // Primary UrbanFix Forest Green
          800: '#13593F',
          900: '#0E4631',
          950: '#092B1E',
        },
        sidebar: {
          dark: '#10221C',
          active: '#18362B',
          hover: '#142C24',
          border: '#1E3D32',
        },
        surface: {
          canvas: '#F4F6F4',
          card: '#FFFFFF',
          subtle: '#F9FAFB',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 2px 6px -1px rgba(0, 0, 0, 0.05), 0 1px 4px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 12px 30px -4px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}

