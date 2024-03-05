import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useAppDispatch } from '../../hooks/redux'
import { handleResetPassword } from '../../store/reducers/auth/authActions'
import SubmitFormsButton from '../../shared/SubmitFormsButton/SubmitFormsButton'

const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type LoginFormInputs = z.infer<typeof resetPasswordSchema>

const ForgetPasswordForm = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await dispatch(handleResetPassword(data))
      setMessage('Check your email!')
    } catch (e) {
      setMessage(String(e))
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input
          {...register('email')}
          className="mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
          placeholder="Email"
        />
        <p className="mt-1 text-red-600">{errors.email?.message}</p>
        <SubmitFormsButton text="Reset password" />
      </form>
      {message ? <p className="text-white">{message}</p> : null}
    </>
  )
}

export default ForgetPasswordForm
