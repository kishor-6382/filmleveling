/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080B14',
        'surface-card': '#101827',
        'surface-elevated': '#162238',
        'surface-glass': 'rgba(16, 24, 39, 0.75)',
        'electric-blue': '#36AFFF',
        'hologram-cyan': '#00D4FF',
        'monarch-purple': '#785CFF',
        'xp-glow': '#00D4FF',
        'system-success': '#35D49A',
        'system-warning': '#FFB547',
        'system-danger': '#FF4D6D',
        'text-main': '#F5F7FF',
        'text-muted': '#8995AA',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        orbitron: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 212, 255, 0.35)',
        'cyan-glow-lg': '0 0 25px rgba(0, 212, 255, 0.55)',
        'purple-glow': '0 0 15px rgba(120, 92, 255, 0.35)',
        'danger-glow': '0 0 20px rgba(255, 77, 109, 0.45)',
        'success-glow': '0 0 15px rgba(53, 212, 154, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 212, 255, 0.6)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}

