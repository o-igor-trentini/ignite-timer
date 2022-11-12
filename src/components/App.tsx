import { FC } from 'react'
import { Button } from './ui/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/themes/default'
import { GlobalStyle } from '../styles/global'

export const App: FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="success">salve</Button>

      <GlobalStyle />
    </ThemeProvider>
  )
}
