import { defineStore } from 'pinia'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider
} from 'firebase/auth'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()!
  const user = useCurrentUser()
  const error = ref('')

  // TODO: login to firebase use OAuth provider (custom token)

  function loginWithGoogle() {
    signInWithRedirect(auth, new GoogleAuthProvider()).catch((e) => {
      error.value = e
    })
  }

  function loginWithFacebook() {
    signInWithRedirect(auth, new FacebookAuthProvider()).catch((e) => {
      error.value = e
    })
  }

  function loginWithTwitter() {
    signInWithRedirect(auth, new TwitterAuthProvider()).catch((e) => {
      error.value = e
    })
  }

  function loginWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
  }

  function signupWithEmailAndPassword(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    signOut(auth)
  }

  return {
    user,
    loginWithEmailAndPassword,
    signupWithEmailAndPassword,
    loginWithGoogle,
    loginWithFacebook,
    loginWithTwitter,
    logout
  }
})

export default useAuthStore
