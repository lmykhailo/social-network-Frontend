import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { set } from 'lodash'
import { ChangeEvent, useState } from 'react'

const useFileUpload = () => {
  const [photoURL, setPhotoURL] = useState('')
  const [storageDestination, setStorageDestination] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    setIsUploading(true)
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `${storageDestination}/${file.name}`)
      const snapshot = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(snapshot.ref)
      setPhotoURL(url)
    } catch (error) {
      console.error('Error uploading file: ', error)
    } finally {
      setIsUploading(false)
    }
    e.target.value = ''
  }
  const resetPhotoURL = () => {
    setPhotoURL('')
  }
  return {
    photoURL,
    handleFileChange,
    isUploading,
    storageDestination,
    setStorageDestination,
    resetPhotoURL,
  }
}

export default useFileUpload
