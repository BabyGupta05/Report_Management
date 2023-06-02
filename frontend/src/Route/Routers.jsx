import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Login from './../component/Login'
import Signup from '../component/Signup'
import PrivateRoute from './PrivateRoute'

const Router = () => {
  return (

        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<PrivateRoute><Signup/></PrivateRoute>}></Route>
           
        </Routes>

  )
}

export default Router