import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;

  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;
  font-size: 1.125rem;
`

const BaseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;

  background: transparent;

  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};

  font-weight: bold;
  font-size: 1.125rem;
  color: ${({ theme }) => theme['gray-100']};

  &:focus,
  &:hover {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: 2px solid ${({ theme }) => theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
