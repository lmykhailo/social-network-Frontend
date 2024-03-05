import { useState } from 'react'
import { useAppSelector } from './redux'
import { IUserData } from '../types/IUserData'
import { fetchData } from '../functions/fetchData'

const baseUrl = 'http://localhost:8080'

const useUserBackend = () => {
  const [error, setError] = useState(null)

  const createUser = async (data: IUserData) => {
    return await fetchData('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const updateUser = async (id: string, data: IUserData) => {
    return await fetchData(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const getUsers = async () => {
    return await fetchData('/api/users')
  }

  const getOneUser = async (id: number) => {
    return await fetchData(`/api/users/${id}`)
  }
  const getOneUserByUid = async (uid: string) => {
    return await fetchData(`/api/users/uid/${uid}`)
  }
  const getOneUserByUsername = async (username: string) => {
    return await fetchData(`/api/users/username/${username}`)
  }

  return {
    createUser,
    updateUser,
    getUsers,
    getOneUser,
    getOneUserByUid,
    getOneUserByUsername,
    error,
  }
}

export default useUserBackend
