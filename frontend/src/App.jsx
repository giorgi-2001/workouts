import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom'

// pages
import Home from './pages/home';
import Login from './pages/login';
import MainLayout from './layouts/layout';
import NotFound from './pages/404';
import Signup from './pages/signup';

import { useAuthContext } from './hooks/useAuthContext';

const App = () => {

  const { user } = useAuthContext()

const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path="/" element={<MainLayout />} >
      <Route index element={ user ? <Home /> : <Navigate to="/login" /> }/>
      <Route path="/login" element={ !user ? <Login /> : <Navigate to="/"/> } />
      <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/" /> } />        
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)


  return ( 
    <div className="APP">
      <RouterProvider router={router} />
    </div>
   );
}
 
export default App;