import { useEffect, useState, CSSProperties} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import BounceLoader from 'react-spinners/BounceLoader'
import validator from 'validator'

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
        if(!validator.isEmail(email)){
          toast.error('Please enter a valid email address')
        } else if(password.length < 10){
          toast.error('Password must be at least 10 characters long')
        }else{
          dispatch(login(userData))
        }
      }

    if(isLoading){
      return <BounceLoader color='#f9d706' loading={loading} cssOverride={override} size={100} />
    }

  return (
    <form className="authForm" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input type="text" value={name} name="name" placeholder="enter name" onChange={onChange}/>
        <input type="text" name="email" placeholder="enter email" value={email} onChange={onChange} required/>
        <input type="password" name="password" placeholder="enter password" value={password} onChange={onChange} required/>
        <label>Password must be at least 10 characters</label>
        <button className="btn" type='submit'>Login</button>
    </form>
  )
}

export default Login