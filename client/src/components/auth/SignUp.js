import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'
import Spinner from '../utilities/Spinner'

function SignUp() {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
    })

    const { name, email, password, password2} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth)

    useEffect(() => {

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

      if (password !== password2) {
        toast.error('Passwords do not match')
      } else {
        const userData = {
          name,
          email,
          password,
        }

        dispatch(register(userData))
      }
    }

    if(isLoading){
      return <Spinner />
    }

  return (
    <form className="authForm" onSubmit={onSubmit}>
        <h2>Sign up</h2>
        <input type="text" value={name} name="name" placeholder="enter name" onChange={onChange}/>
        <input type="text" name="email" placeholder="enter email" value={email} onChange={onChange} required/>
        <input type="password" name="password" placeholder="enter password" value={password} onChange={onChange} required/>
        <input type="password" name="password2" placeholder="enter password again" value={password2} onChange={onChange} required/>
        <button className="btn" type='submit'>Sign Up</button>
    </form>
  )
}

export default SignUp