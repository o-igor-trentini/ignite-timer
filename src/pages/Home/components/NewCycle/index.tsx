import { FC } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const NewCycleForm: FC = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: minCycleValue,
    },
  })

  return (
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
  )
}
