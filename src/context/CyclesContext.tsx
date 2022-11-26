import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer, CyclesState } from '../reducers/cycles/reducer'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    } as CyclesState,
    () => {
      const storedStateAsJson = localStorage.getItem(
        '@ignite-timer:cycles-state',
      )

      let storedCyclesState: CyclesState = { cycles: [], activeCycleId: null }

      if (storedStateAsJson) {
        storedCyclesState = JSON.parse(storedStateAsJson)

        const formatDate = (value?: Date | string): Date | undefined =>
          value ? new Date(value) : undefined

        for (const i in storedCyclesState.cycles) {
          storedCyclesState.cycles[+i].finishedDate = formatDate(
            storedCyclesState.cycles[+i].finishedDate,
          )
          storedCyclesState.cycles[+i].interruptedDate = formatDate(
            storedCyclesState.cycles[+i].interruptedDate,
          )
          storedCyclesState.cycles[+i].startDate = formatDate(
            storedCyclesState.cycles[+i].startDate,
          ) as Date
        }
      }

      return storedCyclesState
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((item) => item.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(
    activeCycle ? differenceInSeconds(new Date(), activeCycle.startDate) : 0,
  )

  const setSecondsPassed = (seconds: number): void =>
    setAmountSecondsPassed(seconds)

  const markCurrentCycleAsFinished = (): void =>
    dispatch(markCurrentCycleAsFinishedAction())

  const createNewCycle = (data: CreateCycleData): void => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = (): void =>
    dispatch(interruptCurrentCycleAction())

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state', stateJson)
  }, [cyclesState])

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
