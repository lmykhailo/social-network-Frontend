import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useAppDispatch } from '../../hooks/redux'
import useFileUpload from '../../hooks/useFileUpload'
import { handleRegistration } from '../../store/reducers/auth/authActions'
import { IRegistrationData } from '../../types/IRegistrationData'
import ZodInputField from '../ZodInputField/ZodInputField'
import { IUserData } from '../../types/IUserData'
import useUserBackend from '../../hooks/useUserBackend'
import { checkUsernameAvailability } from '../../functions/checkUsernameAvailability'
import SubmitFormsButton from '../../shared/SubmitFormsButton/SubmitFormsButton'

const registrationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  displayName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  photoURL: z.string().url().min(1, { message: 'NO PHOTO' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 6 characters long' }),
})

type RegistrationFormInputs = z.infer<typeof registrationSchema>

const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const { setStorageDestination, handleFileChange, photoURL } = useFileUpload()

  const { createUser } = useUserBackend()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  })

  useEffect(() => {
    setStorageDestination('ProfileImages')
  }, [setStorageDestination])

  useEffect(() => {
    if (photoURL) {
      setValue('photoURL', photoURL, { shouldValidate: true })
    }
    const file = watch('photoURL')
    console.log(file)
  }, [photoURL, setValue])

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (
    data: IRegistrationData
  ) => {
    console.log('Submitting Form Data:', data)
    try {
      const isAvailable = await checkUsernameAvailability(data.username)
      if (!isAvailable) {
        setError('Username is not available')
        return
      }

      const registrationResult = await dispatch(
        handleRegistration(data)
      ).unwrap()

      const userData: IUserData = {
        ...data,
        uid: registrationResult.uid,
        username: data.username || 'nullusername',
      }

      await createUser(userData)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
  const inputFields = [
    {
      name: 'email',
      placeholder: 'Email',
      type: 'text',
      error: errors.email?.message,
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      error: errors.password?.message,
    },
    {
      name: 'displayName',
      placeholder: 'Display Name',
      type: 'text',
      error: errors.displayName?.message,
    },
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      error: errors.username?.message,
    },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {inputFields.map((field, index) => (
        <ZodInputField
          key={index}
          name={field.name}
          placeholder={field.placeholder}
          type={field.type}
          register={register}
          error={field.error}
        />
      ))}
      <input
        type="file"
        onChange={(e) => handleFileChange(e)}
        placeholder="Profile Photo"
        className="mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
      />
      <p className="mt-1 text-red-600">{errors.photoURL?.message}</p>
      <p className="mt-1 text-red-600">{error}</p>
      <div className="flex justify-center">
        <SubmitFormsButton text="Register" />
      </div>
    </form>
  )
}

export default RegistrationForm
