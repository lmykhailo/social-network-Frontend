import { checkUsernameAvailability } from './checkUsernameAvailability'

export const generateUniqueUsername = async (baseUsername: string) => {
  let attempt = 0
  const maxAttempts = 5

  while (attempt < maxAttempts) {
    const uniqueSuffix = Math.floor(Math.random() * 100000)
    const newUsername = `${baseUsername}_${uniqueSuffix}`

    const isAvailable = await checkUsernameAvailability(newUsername)
    if (isAvailable) {
      return newUsername
    }

    attempt++
  }

  throw new Error('Unable to generate a unique username after several attempts')
}
