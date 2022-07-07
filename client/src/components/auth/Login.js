import { useEffect, useState, CSSProperties} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
// import Spinner from '../utilities/Spinner'
import PacmanLoader from 'react-spinners/PacmanLoader'

const override = {
  display: "block",
  // margin: "0 auto",
  // borderColor: "red",
};
function Login() {
  let [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    })

    const { name, email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth)

    useEffect(() => {
      // console.log('log in effect')
      if(isError){
        toast.error(message)
      }

      if(isSuccess || user){
        setFormData({
          name: '',
          email: '',
          password: '',
          password2: ''
        })     
        toast.success('logged in successfully')
        navigate('/')
      }
      
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

   
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const onSubmit = (e) => {
      e.preventDefault()

        const userData = {
          name,
          email,
          password,
        }

        dispatch(login(userData))
      }
    

    if(isLoading){
      return <PacmanLoader color='#f9d706' loading={loading} cssOverride={override} size={100} />
    }

  return (
    <form className="authForm" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input type="text" value={name} name="name" placeholder="enter name" onChange={onChange}/>
        <input type="text" name="email" placeholder="enter email" value={email} onChange={onChange} required/>
        <input type="password" name="password" placeholder="enter password" value={password} onChange={onChange} required/>
        <button className="btn" type='submit'>Login</button>
    </form>
  )
}

export default Login