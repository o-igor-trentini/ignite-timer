import { FC } from 'react'
import { HistoryContainer, HistoryList } from './styles'

export const History: FC = () => {
  return (
    <HistoryContainer>
      <h1>Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {Array(50)
              .fill(
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>Concluído</td>
                </tr>,
              )
              .map((item) => item)}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
