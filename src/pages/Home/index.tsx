import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { FC, useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CycleContext } from '../../context/CyclesContext'
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

export const Home: FC = () => {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CycleContext)
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

  const handleCreateNewCycle = (data: NewCycleFormData): void => {
    createNewCycle(data)

    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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
