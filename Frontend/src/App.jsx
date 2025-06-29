import React from 'react'
import Left from './componenets/Leftside/Left'
import Right from './componenets/Rightside/Right'
import Upload from './componenets/Upload'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
function App() {
  return (
  <div className='flex'>
  <Left/>
  <Right/>
  </div>     
  )
}

export default App
