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
        <div className="container">
          {isRegister ? (
            <>
              <div className="form-container">Register</div>
              <div className="form-group">
                <label className="label">Student ID</label>
                <input type="text" className="input" onChange={(e) => setStudentID(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">Student Name</label>
                <input type="text" className="input" onChange={(e) => setStudentName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">Username</label>
                <input type="text" className="input" onChange={(e) => setUserNameReg(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">Password</label>
                <input type="password" className="input" onChange={(e) => setUserPasswordReg(e.target.value)} />
              </div>
              <button className="button" onClick={register}>
                Register
              </button>
              <a className="link" onClick={() => setIsRegister(false)}>
                Login?
              </a>
            </>
          ) : (
            <>
              <div className="form-container">Login</div>
              <div className="form-group">
                <label className="label">Username</label>
                <input type="text" className="input" onChange={(e) => setUserNameLog(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">Password</label>
                <input type="password" className="input" onChange={(e) => setUserPasswordLog(e.target.value)} />
              </div>
              <button className="button" onClick={login}>
                Login
              </button>
              <a className="link" onClick={() => setIsRegister(true)}>
                Register?
              </a>
            </>
          )}
        </div>
      )
}

export default Login