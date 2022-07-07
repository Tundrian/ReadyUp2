// Dependencies
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useWindowSize from './composables/useWindowSize';

// Pages
import NavBar from './components/navigation/NavBar'
import NavMenu from "./components/navigation/NavMenu"
import Library from './components/pages/Library';
import Splash from './components/pages/Splash'
import Browse from './components/pages/Browse'
function App() {
  
  // Variables
  const size = useWindowSize()
  const [showNavMenu, setShowNavMenu] = useState(() => size.width > 650 ? true : false)
  
  // Functions
  const toggleNavMenu = () => {
    setShowNavMenu((prevState) => !prevState)
  }

  // Hooks
  useEffect(() => {
    if(showNavMenu === true){
      document.querySelector('.mainComponent').style.marginLeft = "250px"
      document.querySelector('.browse-container').style.marginLeft = "250px"
    }else{
      document.querySelector('.mainComponent').style.marginLeft = "0"
      document.querySelector('.browse-container').style.marginLeft = "0"
    }
  }, [showNavMenu])
  
  return (
    <> 
      <BrowserRouter>
      <NavBar toggleNavMenu={toggleNavMenu}/>
      { showNavMenu && <NavMenu toggle={toggleNavMenu} />}
        <Routes>
          <Route path="/myLibrary" element={<Library />} />
          <Route path="/"   element={<Splash />} />
          <Route path="/browse"   element={<Browse />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
