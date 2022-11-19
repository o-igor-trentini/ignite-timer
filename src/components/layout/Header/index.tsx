import { FC } from 'react'
import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'

import IgniteLogo from '../../../assets/ignite-logo.svg'
import { NavLink } from 'react-router-dom'

export const Header: FC = () => {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <HeaderContainer>
      <img src={IgniteLogo} alt="" />

      <nav>
        <NavLink to={baseUrl} title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to={`${baseUrl}history`} title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
