import styled from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

export const HistoryContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
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
      color: ${({ theme }) => theme['gray-100']};

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

    td {
      padding: 1rem;

      font-size: 0.875rem;
      line-height: 1.6rem;

      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      background-color: ${({ theme }) => theme['gray-700']};

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
