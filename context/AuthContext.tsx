'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  provider: string
  createdAt?: unknown
  lastLogin?: unknown
  plan: 'free' | 'standard' | 'lite' | 'pro' | 'ultra'
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
})

// Tạo hoặc cập nhật user trong Firestore
async function syncUserToFirestore(user: User): Promise<UserProfile> {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    // User mới — tạo document
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: user.providerData[0]?.providerId ?? 'password',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      plan: 'free',
    }
    await setDoc(ref, profile)
    return profile
  } else {
    // User đã có — cập nhật lastLogin
    await setDoc(ref, { lastLogin: serverTimestamp() }, { merge: true })
    return snap.data() as UserProfile
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          const userProfile = await syncUserToFirestore(firebaseUser)
          setProfile(userProfile)
        } catch (err) {
          console.error('Firestore sync error:', err)
          // Vẫn set profile cơ bản từ auth nếu Firestore lỗi
          setProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: firebaseUser.providerData[0]?.providerId ?? 'password',
            plan: 'free',
          })
        }
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
