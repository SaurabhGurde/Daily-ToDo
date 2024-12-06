import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate();
 
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/userpage")
    }
  },[])
  
  return (
    <div style={{ backgroundColor:"#ddddf0", height:"100vh", width:"100vw"}}>
        <div className='container' style={{paddingTop:"11%", paddingLeft:"22%"}}>
            <Link style={{textDecoration:"none"}} to="/usersignup"> <div style={{width:"400px", height:"100px", color:"white", backgroundColor:"#12154a", textAlign:'center',paddingTop:"35px", borderRadius:"10px", marginTop:"20px", textDecoration:"none"}}>Signup user</div></Link>
            <Link style={{textDecoration:"none"}} to="/userlogin">  <div style={{width:"400px", height:"100px", color:"white", backgroundColor:"#12154a", textAlign:'center',paddingTop:"35px", borderRadius:"10px", marginTop:"20px", textDecoration:"none"}}>Login user</div></Link>
        </div>
    </div>
  )
}

export default Main