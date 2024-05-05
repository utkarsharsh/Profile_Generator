import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from 'react-redux'
import './App.css'
import store from './store/store.js'
import Signup from './components/Signup'
import Post from './components/Post.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signin from './components/Signin.jsx'
 import User from './components/User.jsx'
function App() {
  return <>
   <Provider store={store}>
   <BrowserRouter>
    <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/post' element={<Post/>}/>
    <Route path='/sign' element={<Signin/>}/>
    <Route path='/profile/:id' element={<User/>}/>
      </Routes>
      </BrowserRouter>
  </Provider>





  </>
 

}

export default App
