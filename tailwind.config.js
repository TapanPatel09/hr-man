/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)', /* teal-800 */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* teal-600 */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* orange-500 */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-600 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* yellow-600 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100 */
          foreground: 'var(--color-muted-foreground)' /* gray-600 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* gray-700 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* gray-700 */
        }
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)'
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '80': '20rem',
        '120': '30rem'
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(15, 76, 117, 0.08)',
        'DEFAULT': '0 2px 6px rgba(15, 76, 117, 0.12)',
        'md': '0 4px 12px rgba(15, 76, 117, 0.12)',
        'lg': '0 8px 24px rgba(15, 76, 117, 0.14)',
        'xl': '0 12px 32px rgba(15, 76, 117, 0.16)',
        '2xl': '0 20px 40px -8px rgba(15, 76, 117, 0.16)'
      },
      maxWidth: {
        'measure': '70ch'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ]
}