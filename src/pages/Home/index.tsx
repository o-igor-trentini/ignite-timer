import { HandPalm, Play } from 'phosphor-react'
import { createContext, FC, useEffect, useState } from 'react'
import { CountDown } from './components/CountDown'
import {
  minCycleValue,
  NewCycleForm,
  NewCycleFormData,
  newCycleFormValidationSchema,
} from './components/NewCycle'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle?: Cycle
  activeCycleId?: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CycleContextType)

export const Home: FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: minCycleValue,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm
  const task: string = watch('task') ?? ''
  const isSubmitDisabled = !task
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  const markCurrentCycleAsFinished = () =>
    setCycles((state) =>
      state.map((item) =>
        item.id === activeCycleId
          ? ({ ...item, finishedDate: new Date() } as Cycle)
          : item,
      ),
    )

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

  const setSecondsPassed = (seconds: number) => setAmountSecondsPassed(seconds)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmitNewCycle)}>
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />
        </CycleContext.Provider>

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
