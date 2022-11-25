import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FC, useContext } from 'react'
import { CycleContext } from '../../context/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export const History: FC = () => {
  const { cycles } = useContext(CycleContext)

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
            {cycles.map((item) => (
              <tr key={item.id}>
                <td>{item.task}</td>
                <td>{item.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(item.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {!item.finishedDate && !item.interruptedDate && (
                    <Status variant="inProgress">Em andamento</Status>
                  )}

                  {item.interruptedDate && (
                    <Status variant="interrupt">Interrompido</Status>
                  )}

                  {item.finishedDate && (
                    <Status variant="finished">Concluído</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
