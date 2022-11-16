import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import { LayoutContainer } from './styles'

export const Default: FC = () => {
  return (
    <LayoutContainer>
      <Header />

      <Outlet />
    </LayoutContainer>
  )
}
