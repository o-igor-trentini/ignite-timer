import styled from 'styled-components'

export const CountDownContainer = styled.div`
  display: flex;
  gap: 1rem;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme.darkFontColor};

  span {
    background: ${({ theme }) => theme.displayBackground};
    padding: 2rem 1rem;
    border-radius: 8px;
    color: ${({ theme }) =>
      theme.type === 'dark' ? theme.lightFontColor : theme.darkFontColor};
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
