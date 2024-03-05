import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleModalWindow } from '../../store/reducers/theme/themeSlice'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import usePostsBackend from '../../hooks/usePostsBackend'
import useFileUpload from '../../hooks/useFileUpload'
import { useEffect, useRef, useState } from 'react'
import ZodInputField from '../ZodInputField/ZodInputField'
import SubmitFormsButton from '../../shared/SubmitFormsButton/SubmitFormsButton'
import CloseIcon from '../../assets/Icons/CloseIcon'
import CircledArrowsIcon from '../../assets/Icons/CircledArrowsIcon'

const postSchema = z.object({
  description: z
    .string()
    .min(6, { message: 'Post should containt a description' }),
  photoURL: z.string().url().min(1, { message: 'Post should contain a photo' }),
})

type postFormInputs = z.infer<typeof postSchema>

const ModalWindowCreatePost = () => {
  const { modalWindow } = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { createPost } = usePostsBackend()
  const [postCreationSuccess, setPostCreationSuccess] = useState(false)
  const { setStorageDestination, handleFileChange, photoURL, resetPhotoURL } =
    useFileUpload()
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<postFormInputs>({
    resolver: zodResolver(postSchema),
  })

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click()
  }

  const onSubmit: SubmitHandler<postFormInputs> = async (data: {
    description: string
  }) => {
    console.log('Submitting Form Data:', data)
    try {
      if (user) {
        await createPost({
          description: data.description,
          uid: user.uid,
          photo_url: photoURL,
        })
        setPostCreationSuccess(true)
      }
    } catch (error) {
      console.log('Error creating post' + error)
    }
  }
  useEffect(() => {
    setStorageDestination('PostImages')
  }, [setStorageDestination])

  useEffect(() => {
    if (photoURL) {
      setValue('photoURL', photoURL, { shouldValidate: true })
    }
    const file = watch('photoURL')
    //console.log(file)
  }, [photoURL, setValue])

  if (!modalWindow) return null

  return (
    <div
      onClick={() => {
        dispatch(toggleModalWindow())
        setPostCreationSuccess(false)
        resetPhotoURL()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <button className="absolute right-0 top-0 z-50 p-2 text-white hover:text-gray-300">
        <CloseIcon />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-5/6 w-full flex-col items-center justify-center rounded-md bg-white p-6 shadow-lg dark:bg-slate-600 sm:w-5/6 md:w-4/6 lg:w-1/3"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {photoURL.length > 0 ? (
            <>
              <div className="relative">
                <img
                  src={photoURL}
                  className="mt-5 flex h-[350px] w-full rounded-md border border-black object-cover dark:border-white"
                />
                <button
                  onClick={resetPhotoURL}
                  className="absolute right-0 top-0 m-4 rounded-md bg-black p-1 text-white"
                >
                  <CircledArrowsIcon />
                </button>
              </div>
              <ZodInputField
                placeholder="Add post description"
                type="text"
                register={register}
                error={errors.description?.message}
                name={'description'}
              />
              <SubmitFormsButton text="Create post" />
              {postCreationSuccess && (
                <div className="text-black dark:text-white">
                  Post created successfully!
                </div>
              )}
            </>
          ) : (
            <>
              <p className="flex items-center justify-center text-xl text-black dark:text-white">
                Drag photos here
              </p>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={(e) => handleFileChange(e)}
                placeholder="Profile Photo"
                className="mt-5 hidden w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
              />
              <button
                type="button"
                onClick={handleClick}
                className="mx-auto flex rounded-md bg-gray-400 px-5
             py-2 hover:bg-slate-500 hover:bg-opacity-30 dark:bg-slate-800 
            dark:text-white dark:hover:bg-indigo-800 dark:hover:bg-opacity-30 md:my-2"
              >
                Upload image
              </button>
              <p className="mt-1 text-red-600">{errors.photoURL?.message}</p>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default ModalWindowCreatePost
