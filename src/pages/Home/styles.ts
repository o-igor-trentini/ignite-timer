import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

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

export const CountDownContainer = styled.div`
  display: flex;
  gap: 1rem;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};

  span {
    background: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  width: 4rem;
  padding: 2rem 0;

  display: flex;
  justify-content: center;

  overflow: hidden;

  color: ${({ theme }) => theme['green-500']};
`

export const BaseCountDownButton = styled.button`
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;

  border: 0;
  border-radius: 8px;

  cursor: pointer;

  color: ${({ theme }) => theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-700']};
  }
`

export const StopCountDownButton = styled(BaseCountDownButton)`
  background: ${({ theme }) => theme['red-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['red-700']};
  }
`
