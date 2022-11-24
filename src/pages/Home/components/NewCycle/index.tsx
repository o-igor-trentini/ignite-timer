import { FC, useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import * as zod from 'zod'
import { CycleContext } from '../..'
import { useFormContext } from 'react-hook-form'

export const minCycleValue = 1 ?? import.meta.env.VITE_MIN_CYCLE_VALUE
export const maxCycleValue = import.meta.env.VITE_MAX_CYCLE_VALUE

export const newCycleFormValidationSchema = zod.object({
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

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const NewCycleForm: FC = () => {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

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
