import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import { LayoutContainer } from './styles'

interface DefaultProps {
  switchTheme: () => void
}

export const Default: FC<DefaultProps> = ({ switchTheme }) => {
  return (
    <LayoutContainer>
      <Header switchTheme={switchTheme} />

      <Outlet />
    </LayoutContainer>
  )
}
