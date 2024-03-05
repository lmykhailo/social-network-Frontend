import { baseUrl } from './getAnotherUserUid'

export const fetchData = async (endpoint: string, options = {}) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options)
    console.log(`${baseUrl}${endpoint}`)
    if (!response.ok) throw new Error('Network response was not ok')
    return await response.json()
  } catch (error: any) {
    console.log(error)
    return null
  }
}
