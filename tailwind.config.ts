import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: '#C4B5FD',
  			'heading': '#8B5CF6',
  			'title': '#8B5CF6',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: '#8B5CF6'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: '#C4B5FD'
  			},
  			primary: {
  				DEFAULT: '#8B5CF6',
  				foreground: '#C4B5FD'
  			},
  			secondary: {
  				DEFAULT: '#C4B5FD',
  				foreground: '#8B5CF6'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: '#C4B5FD'
  			},
  			accent: {
  				DEFAULT: '#C4B5FD',
  				foreground: '#8B5CF6'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: '#8B5CF6',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
