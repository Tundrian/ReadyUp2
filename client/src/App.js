// Dependencies
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getGames, reset } from './features/library/librarySlice'
import {useSelector, useDispatch} from 'react-redux'
// Pages
import NavBar from './components/navigation/NavBar'
import NavMenu from "./components/navigation/NavMenu"
import BrowseScreen from "./components/pages/BrowseScreen"
import MyLibrary from './components/pages/MyLibrary'

function App() {
 
  // Variables
  const [showNavMenu, setShowNavMenu] = useState(true)
  const {games, isLoading, isError, isSuccess, message} = useSelector( (state) => state.library)
  const dispatch = useDispatch()

  // Functions
  const toggleNavMenu = () => {
    setShowNavMenu(!showNavMenu)
  }
  console.log(games)

  // Hooks
  useEffect(() => {
    if(showNavMenu === true){
      document.querySelector('.mainComponent').style.marginLeft = "280px"
      document.querySelector('.browse-container').style.marginLeft = "280px"
    }else{
      document.querySelector('.mainComponent').style.marginLeft = "0"
      document.querySelector('.browse-container').style.marginLeft = "0"
    }
  }, [showNavMenu])
  
  return (
    <> 
      <BrowserRouter>
      <NavBar toggleNavMenu={toggleNavMenu}/>
      { showNavMenu && <NavMenu />}
        <Routes>
          <Route path="/"         element={<BrowseScreen/>} />
          <Route path="/library"  element={<MyLibrary />}   />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
