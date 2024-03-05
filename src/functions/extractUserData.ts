import { User, UserCredential } from 'firebase/auth'

export const extractUserData = (userCredential: UserCredential) => {
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
    photoURL: userCredential.user.photoURL,
    isAnonymous: userCredential.user.isAnonymous,
    emailVerified: userCredential.user.emailVerified,
    phoneNumber: userCredential.user.phoneNumber,
  }
}
export const extractUserRegistrationData = (userCredential: User) => {
  return {
    uid: userCredential.uid,
    email: userCredential.email,
    displayName: userCredential.displayName,
    photoURL: userCredential.photoURL,
  }
}
