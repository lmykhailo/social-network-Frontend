export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/username-available/${username}`
    )
    if (!response.ok) {
      throw new Error('Failed to check username availability')
    }
    const data = await response.json()
    return data.isAvailable
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}
