import 'styled-components'

type ThemeType = 'dark' | 'light'

export interface ThemeConfig {
  type: ThemeType

  globalBackground: string
  cardBackground: string
  displayBackground: string

  darkFontColor: string
  lightFontColor: string

  'gray-500': '#7C7C8A'
  'gray-600': '#323238'

  'green-300': '#00B37E'
  'green-500': '#00875F'
  'green-700': '#015F43'

  'red-500': '#AB222E'
  'red-700': '#7A1921'

  'yellow-500': '#FBA94C'
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {}
}
