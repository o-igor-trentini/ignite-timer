import { FC, ReactNode } from 'react'
import { ButtonContainer, ButtonVariant } from './index.styles'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
}

export const Button: FC<ButtonProps> = ({ children, variant = 'primary' }) => {
  return <ButtonContainer variant={variant}>{children}</ButtonContainer>
}
