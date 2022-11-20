import { HandPalm, Play } from 'phosphor-react'
import { FC, useEffect, useState } from 'react'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycle'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export const Home: FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const task: string = watch('task') ?? ''
  const isSubmitDisabled = !task
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  const onSubmitNewCycle = (data: any) => {
    const values = data as Cycle

    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: values.task,
      minutesAmount: values.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((item) =>
        item.id === activeCycleId
          ? ({ ...item, interruptedDate: new Date() } as Cycle)
          : item,
      ),
    )

    setActiveCycleId(null)
  }

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
    else document.title = 'Ignite Timer'
  }, [activeCycle, minutes, seconds])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmitNewCycle)}>
        <NewCycleForm />

        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
