import SignUp from "./SignUp"
import Login from './Login'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'

function AuthButtons() {
    const [signInClicked, setSignInClicked] = useState(false)
    const [logInClicked, setLogInClicked] = useState(false)
    const [logOutClicked, setLogOutClicked] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }

  return (
    <ul className="menu-buttons-container menu-section">
      {user ? (
        <>
          {!logOutClicked && <li><button className="btn" onClick={onLogout}>Logout</button></li>}
        </>
        ) : (
          <>
            {!logInClicked && <li><button className="btn btn-filled" onClick={() => {
              setLogInClicked(true)
              setSignInClicked(false)
            }}>Sign In</button></li>}
            {logInClicked && <Login />}
            {!signInClicked && <li><button className="btn btn-filled" onClick={() => {
              setSignInClicked(true)
              setLogInClicked(false) 
            }}>Register</button></li>}
            {signInClicked && <SignUp />}
          </>
        )}
        
    
</ul>
  )
}

export default AuthButtons