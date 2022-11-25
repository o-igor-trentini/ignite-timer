import { createContext, FC, ReactNode, useState } from 'react'
import { Cycle } from '../pages/Home'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId?: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContextProvider: FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  const setSecondsPassed = (seconds: number): void =>
    setAmountSecondsPassed(seconds)

  const markCurrentCycleAsFinished = (): void =>
    setCycles((state) =>
      state.map((item) =>
        item.id === activeCycleId
          ? ({ ...item, finishedDate: new Date() } as Cycle)
          : item,
      ),
    )

  const createNewCycle = (data: CreateCycleData): void => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = (): void => {
    setCycles((state) =>
      state.map((item) =>
        item.id === activeCycleId
          ? ({ ...item, interruptedDate: new Date() } as Cycle)
          : item,
      ),
    )

    setActiveCycleId(null)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
