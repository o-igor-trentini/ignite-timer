import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from './styles'

const minCycleValue = 1 ?? import.meta.env.VITE_MIN_CYCLE_VALUE
const maxCycleValue = import.meta.env.VITE_MAX_CYCLE_VALUE

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(
      minCycleValue,
      `O ciclo precisa ser de no mínimo ${minCycleValue} minutos`,
    )
    .max(
      maxCycleValue,
      `O ciclo precisa ser de no máximo ${maxCycleValue} minutos`,
    ),
})

type NewCycleForm = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
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
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const { register, handleSubmit, watch, reset } = useForm<NewCycleForm>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: minCycleValue,
    },
  })
  const task: string = watch('task') ?? ''
  const isSubmitDisabled = !task
  const activeCycle = cycles.find((item) => item.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

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
    if (!activeCycle) return undefined

    const interval = setInterval(() => {
      const diffInSeconds = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )

      if (diffInSeconds >= totalSeconds) {
        setCycles((state) =>
          state.map((item) =>
            item.id === activeCycleId
              ? ({ ...item, finishedDate: new Date() } as Cycle)
              : item,
          ),
        )

        setAmountSecondsPassed(totalSeconds)

        clearInterval(interval)

        return
      }

      setAmountSecondsPassed(diffInSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds])

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
    else document.title = 'Ignite Timer'
  }, [activeCycle, minutes, seconds])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmitNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            autoComplete="off"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="projeto 1" />
            <option value="projeto 2" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="0"
            min={minCycleValue}
            max={maxCycleValue}
            step={minCycleValue}
            disabled={!!activeCycle}
            autoComplete="off"
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>

          <Separator>:</Separator>

          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

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
