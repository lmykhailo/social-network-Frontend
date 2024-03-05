import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '../../../services/firebase'
//Functions for shaping userData from Firebase for Redux
import {
  extractUserData,
  extractUserRegistrationData,
} from '../../../functions/extractUserData'

export const signInUsingEmail = createAsyncThunk(
  'auth/signInUsingEmail',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(userCredential)
      return extractUserData(userCredential)
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const signInUsingGoogle = createAsyncThunk(
  'auth/signInUsingGoogle',
  async (_, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      console.log(userCredential)
      return extractUserData(userCredential)
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const handleLogout = createAsyncThunk(
  'auth/signOut',
  async (_, thunkAPI) => {
    try {
      await signOut(auth)
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
export const handleResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
export const handleRegistration = createAsyncThunk(
  'auth/handleRegistration',
  async (
    {
      email,
      password,
      displayName,
      photoURL,
    }: {
      email: string
      password: string
      displayName: string
      photoURL: string
    },
    thunkAPI
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      })
      sendEmailVerification(user)
      const userCreated = extractUserRegistrationData(user)
      console.log('User created and profile updated', userCreated)
      return userCreated
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
