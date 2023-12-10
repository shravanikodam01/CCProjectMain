import React, {useState, useContext} from 'react'
import Axios from 'axios'
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";



const Login = () => {

    const {username, setUsername,} = useContext(UserContext)



    const navigate = useNavigate()

    const [isRegister, setIsRegister] = useState(false)
 
    const [studentID, setStudentID] = useState("")
    const [studentName, setStudentName] = useState("")
    const [userNameReg, setUserNameReg] = useState("")
    const [userNameLog, setUserNameLog] = useState("")
    const [userPasswordLog, setUserPasswordLog] = useState("")
    const [userPasswordReg, setUserPasswordReg] = useState("")

    const register = () =>{
        Axios.post("https://server-dot-ardent-quarter-403122.uc.r.appspot.com/register",{id: studentID, 
                                                    name: studentName,
                                                    username:userNameReg, 
                                                    password: userPasswordReg
                                                }).then((response)=>{
                                                    console.log(response)
                                                    setIsRegister(false)
                                                })
    }


    const login = () => {
        if(userNameLog == 'admin' && userPasswordLog == 'admin'){
            setUsername('admin')
            navigate("/resources")
        }else{
            alert('wrong name or password')
        }
       
    }
    
    return (
        <>
        {isRegister ? 
        <><div>Register</div>
        <label>Student ID</label><input type='text' onChange={(e)=>{
            setStudentID(e.target.value)
        }}/>
        <label>Student Name</label><input type='text' onChange={(e)=>{
            setStudentName(e.target.value)
        }}/>
        <label>Username</label><input type='text' onChange={(e)=>{
            setUserNameReg(e.target.value)
        }}/>
        <label>Password</label><input type='password' onChange={(e)=>{
            setUserPasswordReg(e.target.value)
        }}/>
        <button onClick={register}>Register</button>
        <a onClick={(e)=>{setIsRegister(false)}}>Login?</a>
        </> :
        <><div>Login</div>
        <label>Username</label><input type='text' onChange={(e)=>{
            setUserNameLog(e.target.value)
        }}/>
        <label>Password</label><input type='password' onChange={(e)=>{
            setUserPasswordLog(e.target.value)
        }}/>
        <button onClick={login}>Login</button>
        <a onClick={(e)=>{setIsRegister(true)}}>Register?</a>
        </>
    }
        </>
    )
}

export default Login