import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout"

const MainLayout = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout()


    const handleClick = () => {
        logout()
    }


    return ( 
    <>
        <header className="header">
            <nav className="header__nav">
                <Link to="/" className="header__title"><h1>Workouts Buddy</h1></Link>
                {!user && <div className="nav-link-container">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </div>}
                {user && <div className="nav-link-container">
                    <p>{user.email}</p>
                    <button 
                        className="button header__button"
                        onClick={handleClick}
                    >Logout</button>
                </div>}   
            </nav>
        </header>
        <main className="main">
            <Outlet />
        </main>
    </>
     );
}
 
export default MainLayout;