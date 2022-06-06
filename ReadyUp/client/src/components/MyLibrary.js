import GameCard from './GameCard'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'

function MyLibrary() {

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if(!user){
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="mainComponent browse-container">
            
    </div>
  )
}

export default MyLibrary