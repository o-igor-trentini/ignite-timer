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

  color: ${({ theme }) => theme.lightFontColor};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${({ theme }) => theme['green-500']};

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
