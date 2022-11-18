import { Play } from 'phosphor-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

const minCycleValue = 5
const maxCycleValue = 240

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, `O ciclo precisa ser de no mínimo ${minCycleValue} minutos`)
    .max(240, `O ciclo precisa ser de no máximo ${maxCycleValue} minutos`),
})

type NewCycleForm = zod.infer<typeof newCycleFormValidationSchema>

export const Home: FC = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleForm>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: minCycleValue,
    },
  })
  const task: string = watch('task') ?? ''
  const isSubmitDisabled = !task

  const onSubmitNewCycle = (data: any) => {
    console.log('### form', data)
    reset()
  }

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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
