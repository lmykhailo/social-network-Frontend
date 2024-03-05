import { z } from 'zod'
import { IUserData } from '../../types/IUserData'
import { checkUsernameAvailability } from '../../functions/checkUsernameAvailability'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useFileUpload from '../../hooks/useFileUpload'
import useUserBackend from '../../hooks/useUserBackend'
import ZodInputField from '../ZodInputField/ZodInputField'
import { useAppDispatch } from '../../hooks/redux'
import { getOneUserByUid } from '../../store/reducers/userBackend/userBackendActions'
import SubmitFormsButton from '../../shared/SubmitFormsButton/SubmitFormsButton'

const editProfileSchema = z.object({
  displayName: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: 'Name must be at least 3 characters long',
    }),
  photoURL: z
    .string()
    .url()
    .optional()
    .refine((val) => !val || val.length >= 1, {
      message: 'No photo provided',
    }),
  username: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: 'Username must be at least 3 characters long',
    }),
})

type RegistrationFormInputs = z.infer<typeof editProfileSchema>

interface EditProfileFormProps {
  userInformation: IUserData
}

const EditProfileForm = ({ userInformation }: EditProfileFormProps) => {
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const { setStorageDestination, handleFileChange, photoURL } = useFileUpload()
  const { updateUser } = useUserBackend()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      displayName: userInformation.displayName,
      photoURL: userInformation.photoURL,
      username: userInformation.username,
    },
  })

  useEffect(() => {
    setStorageDestination('ProfileImages')
  }, [setStorageDestination])

  useEffect(() => {
    if (photoURL) {
      setValue('photoURL', photoURL, { shouldValidate: true })
    }
    const file = watch('photoURL')
    //console.log(file)
  }, [photoURL, setValue])

  useEffect(() => {
    reset(userInformation)
  }, [userInformation, reset])

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    setError('')
    console.log('Submitting Form Data:', data)
    try {
      if (data.username && data.username !== userInformation.username) {
        const isAvailable = await checkUsernameAvailability(data.username)
        if (!isAvailable) {
          setError('Username is not available')
          return
        }
      }

      const userData: IUserData = {
        email: userInformation.email,
        uid: userInformation.uid,
        displayName: data.displayName ?? userInformation.displayName,
        photoURL: data.photoURL ?? userInformation.photoURL,
        username: data.username ?? userInformation.username,
      }

      await updateUser(userData.uid, userData)
      setError('Profile updated successfully')
      dispatch(getOneUserByUid(userInformation.uid))
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const inputFields = [
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
        <>
          <p className="-mb-3 mt-5 dark:text-white">{field.placeholder}</p>
          <ZodInputField
            key={index}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            register={register}
            required={false}
            error={field.error}
          />{' '}
        </>
      ))}
      <p className="-mb-3 mt-5 dark:text-white">Update profile picture</p>
      <input
        type="file"
        onChange={(e) => handleFileChange(e)}
        placeholder="Profile Photo"
        className="mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
      />
      <p className="mt-1 text-red-600">{errors.photoURL?.message}</p>
      <p className="mt-1 text-red-600">{error}</p>
      <div className="flex justify-center">
        <SubmitFormsButton text="Update profile" />
      </div>
    </form>
  )
}

export default EditProfileForm
