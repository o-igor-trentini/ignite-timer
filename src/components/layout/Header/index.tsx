import { FC } from 'react'
import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'
import IgniteLogo from '../../../assets/ignite-logo.svg'
import { NavLink } from 'react-router-dom'
import './index.css'

interface HeaderProps {
  switchTheme: () => void
}

export const Header: FC<HeaderProps> = ({ switchTheme }) => {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <HeaderContainer>
      <img
        src={IgniteLogo}
        alt=""
        title="Clique aqui para trocar de tema :)"
        onClick={switchTheme}
        className="headerImg"
      />

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
