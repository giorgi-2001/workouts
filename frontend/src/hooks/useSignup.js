import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const { dispatch } = useAuthContext()
 
    const signup = async (email, password ) => {

        setLoading(true)
        setError(null)

        const res = await fetch('/api/users/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const json = await res.json()

        if (!res.ok) {
            setLoading(false)
            setError(json.error)
        }

        if (res.ok) {
            setLoading(false)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload: json })
        }
    }

    return { error, loading, signup }
}