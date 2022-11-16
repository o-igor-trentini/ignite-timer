import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/themes/default'
import { GlobalStyle } from '../styles/global'
import { Router } from '../components/Router'
import { BrowserRouter } from 'react-router-dom'

export const App: FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
