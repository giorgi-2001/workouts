import { useState } from "react";
import { useSignup } from "../hooks/useSignup"


const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { error, loading, signup } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return ( 
        <form className="login-form workout-form" onSubmit={handleSubmit}>
            <h1 className="login-form__title">Sign up</h1>
            <label>Email</label>
            <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type="password" 
                value={password}
                onChange={ e => setPassword(e.target.value)}
            />

            {error && <p className="error-message">{error}</p>}

            <button disabled={loading} className="button">SignUp</button>
        </form>
     );
}
 
export default Signup;