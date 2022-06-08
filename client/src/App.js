// Dependencies
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { register, reset } from './features/auth/authSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import NavBar from './components/NavBar'
import NavMenu from "./components/NavMenu"
import BrowseScreen from "./components/BrowseScreen"
import MyLibrary from './components/MyLibrary'

function App() {
 
  const [showNavMenu, setShowNavMenu] = useState(true)

  const toggleNavMenu = () => {
    setShowNavMenu(!showNavMenu)
  }
  useEffect(() => {
    if(showNavMenu === true){
      document.querySelector('.mainComponent').style.marginLeft = "280px"
      document.querySelector('.browse-container').style.marginLeft = "280px"
      // document.querySelector('.mainComponent').style.marginLeft = "280px"
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
