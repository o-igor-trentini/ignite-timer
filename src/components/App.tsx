import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Router } from '../components/Router'
import { CyclesContextProvider } from '../context/CyclesContext'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'

export const App: FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
