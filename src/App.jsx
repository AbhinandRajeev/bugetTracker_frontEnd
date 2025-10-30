import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Pnf from './pages/Pnf'

function App() {
  

  return (
    <>
      <Header/>
      <Routes>
        <Route path ='' element = {<LandingPage/>}/>
        <Route path ='/homepage' element = {<HomePage/>}/>
        <Route path ='*' element = {<Pnf/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
