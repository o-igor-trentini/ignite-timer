import styled from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

export const HistoryContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 3.5rem;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) =>
      theme.type === 'dark' ? theme.lightFontColor : theme.darkFontColor};
  }

  div {
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      margin-top: 60px;
      background: ${({ theme }) => theme.cardBackground};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.globalBackground};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme['green-500']};
    }
  }
`

export const HistoryList = styled.div`
  flex: 1;

  margin-top: 2rem;

  overflow: auto;

  table {
    width: 100%;
    min-width: 600px;

    border-collapse: collapse;

    th {
      padding: 1rem;

      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6rem;
      color: ${({ theme }) => theme.lightFontColor};

      background-color: ${({ theme }) => theme['gray-600']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    tr {
      color: ${({ theme }) =>
        theme.type === 'dark' ? theme.lightFontColor : theme.darkFontColor};
    }

    td {
      padding: 1rem;

      font-size: 0.875rem;
      line-height: 1.6rem;

      border-top: 4px solid ${({ theme }) => theme.cardBackground};
      background-color: ${({ theme }) => theme.displayBackground};

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const statusVariantColors = {
  interrupt: defaultTheme['red-500'],
  inProgress: defaultTheme['yellow-500'],
  finished: defaultTheme['green-500'],
}

interface StatusProps {
  variant: keyof typeof statusVariantColors
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';

    width: 0.5rem;
    height: 0.5rem;

    border-radius: 50%;
    background: ${({ variant }) => statusVariantColors[variant]};
  }
`
