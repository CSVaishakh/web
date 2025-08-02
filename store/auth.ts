import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

    type AuthState = {
        token : string | null
        user : string | null
        setToken : (token : string) => void
        setUser : (user : string) => void
        clearToken : () => void
        logout : () => void
    }

export const useAuthStore = create<AuthState>() (
    devtools(
        persist(
            (set) => ({
                token : null,
                user : null,
                setToken : (token) => set({token}),
                setUser : (user) => set({user}),
                clearToken : () => set({token : null }),
                logout : () => set({token : null, user : null }),       
            }),
            { name : 'auth-storage' }
        )
    )
)