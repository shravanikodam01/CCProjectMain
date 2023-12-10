import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";


const NavBar = () => {
    const {username, setUsername, resources, setResources} = useContext(UserContext)
    const navigate = useNavigate()
    
    return(
    <div class="navbar">
      <a onClick={()=>navigate('/resources')}>Home</a>
      <a onClick={()=>navigate('/request-resource')}>Add Resource</a>
      <a onClick={()=>navigate('/request-resource')}>Add Resource Type</a>
      <a className='log-out' onClick={()=>{setUsername('');navigate('/login')}}>Logout</a>
    </div>
    )
}

export default NavBar