import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ILoginData } from '../../types/ILoginData'
import { useAppDispatch } from '../../hooks/redux'
import { signInUsingEmail } from '../../store/reducers/auth/authActions'
import ZodInputField from '../ZodInputField/ZodInputField'
import SubmitFormsButton from '../../shared/SubmitFormsButton/SubmitFormsButton'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
  //.min(6, { message: 'Password must be at least 6 characters long' }),
})

type LoginFormInputs = z.infer<typeof loginSchema>

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: ILoginData) => {
    dispatch(signInUsingEmail(data))
  }
  return (
    <div className="flex w-full flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <ZodInputField
          name="email"
          placeholder="Email"
          type="text"
          register={register}
          error={errors.email?.message}
        />
        <ZodInputField
          name="password"
          placeholder="Password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <div className="flex justify-center">
          <SubmitFormsButton text="Login" />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
