import { FC } from 'react'
import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'

import IgniteLogo from '../../../assets/ignite-logo.svg'
import { NavLink } from 'react-router-dom'

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <img src={IgniteLogo} alt="" />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
