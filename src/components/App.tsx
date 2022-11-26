import { FC, useLayoutEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ThemeConfig, ThemeType } from '../@types/styled'
import { Router } from '../components/Router'
import { CyclesContextProvider } from '../context/CyclesContext'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'
import { lightTheme } from '../styles/themes/light'

export const App: FC = () => {
  const [activeTheme, setIsDarkTheme] = useState<ThemeType>('dark')
  const theme: Record<ThemeType, ThemeConfig> = {
    dark: defaultTheme,
    light: lightTheme,
  }

  const switchTheme = () => {
    setIsDarkTheme((state) => {
      const newTheme: ThemeType = state === 'dark' ? 'light' : 'dark'

      localStorage.setItem('@ignite-timer:theme', newTheme)

      return newTheme
    })
  }

  useLayoutEffect(() => {
    const storedTheme: ThemeType | null = localStorage.getItem(
      '@ignite-timer:theme',
    ) as ThemeType | null

    if (storedTheme) setIsDarkTheme(storedTheme)
  }, [])

  return (
    <ThemeProvider theme={theme[activeTheme]}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router switchTheme={switchTheme} />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
