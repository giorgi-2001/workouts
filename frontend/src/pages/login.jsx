import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { error, loading, login } = useLogin()


    const handleSubmit = async e => {
        e.preventDefault()
        await login(email, password)
    }


    return ( 
        <form className="login-form workout-form" onSubmit={handleSubmit}>
            <h1 className="login-form__title">Log in</h1>
            <label>Email</label>
            <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            {error && <p className="error-message">{error}</p>}

            <button disabled={loading} className="button">LogIn</button>
        </form>
     );
}
 
export default Login;