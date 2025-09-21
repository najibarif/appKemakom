/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0F4639',
          light: '#A6B933',
          50: '#F0F7F4',
          100: '#DCE9E1',
          200: '#B9D3C3',
          300: '#8FB89F',
          400: '#5E9A7A',
          500: '#3D7B5E',
          600: '#2F614A',
          700: '#0F4639',
          800: '#0A3A2E',
          900: '#062D23'
        },
        accent: {
          yellow: '#F5F5DC',
          cream: '#FFF8DC',
          gold: '#FFD700'
        },
        neutral: {
          light: '#F8F9FA',
          medium: '#E9ECEF',
          dark: '#6C757D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'primary': '0 10px 40px -10px rgba(15, 70, 57, 0.3)',
        'primary-lg': '0 20px 60px -10px rgba(15, 70, 57, 0.25)'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F4639 0%, #A6B933 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #0A3A2E 0%, #8FA028 100%)',
        'gradient-overlay': 'linear-gradient(135deg, rgba(15, 70, 57, 0.9) 0%, rgba(166, 185, 51, 0.9) 100%)',
        'gradient-soft': 'linear-gradient(135deg, rgba(15, 70, 57, 0.05) 0%, rgba(166, 185, 51, 0.05) 100%)'
      }
    },
  },
  plugins: [],
};