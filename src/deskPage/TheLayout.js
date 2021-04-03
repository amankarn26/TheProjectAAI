import React , { useState, useEffect}  from 'react'
import { Redirect} from 'react-router-dom';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  const [islogin, setislogin] = useState(true)

  useEffect(() => {
    checkLogin()
  },[])

  const checkLogin = () => {
    if(!localStorage.getItem("virusInput")) setislogin(false)
  }


  if(islogin) {
    return (
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
    )
  }
  else {
    return (
      <Redirect to="/login" />
    )
  }
  
}

export default TheLayout
