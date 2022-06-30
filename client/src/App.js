// Dependencies
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import NavBar from './components/navigation/NavBar'
import NavMenu from "./components/navigation/NavMenu"
import BrowseScreen from "./components/pages/BrowseScreen"
import MyLibrary from './components/pages/MyLibrary'
import Splash from './components/pages/Splash'
import Browse from './components/pages/Browse'
function App() {
 
  // Variables
  const [showNavMenu, setShowNavMenu] = useState(true)

  // Functions
  const toggleNavMenu = () => {
    setShowNavMenu((prevState) => !prevState)
  }

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
          <Route path="/splash"   element={<Splash />} />
          <Route path="/browse"   element={<Browse />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
