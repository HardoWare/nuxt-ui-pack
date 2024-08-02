import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    `~/components/**/*.{vue,js,ts}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
