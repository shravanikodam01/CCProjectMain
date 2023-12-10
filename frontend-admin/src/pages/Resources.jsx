import React, {useState, useContext, useEffect} from 'react'
import { UserContext } from '../App'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Resources = () =>{

    const navigate = useNavigate()
    const {username, setUsername, resources, setResources} = useContext(UserContext)

    useEffect(()=>{
        const fetchAllResources = async ()=>{
            try{
                const res = await axios.get('https://server-dot-ardent-quarter-403122.uc.r.appspot.com/view-occupied-resources')
                console.log(res.data)
                setResources(res.data)  
            }catch(err){
                console.log(err)
            }
        }
        fetchAllResources()
    },[])

    const returnResource = (res_id) =>{
        axios.post("https://server-dot-ardent-quarter-403122.uc.r.appspot.com/return-resource",{res_id:res_id
                                                }).then((response)=>{
                                                    console.log(response)
                                                    navigate("/confirmation")
                                                })
    }
    return (
        <>{(resources && resources.length > 0) ? 
        <div className='resources'>
            <div className='resource'>
            <div className='resource-field-title'>Student ID</div>
            <div className='resource-field-title'>Student Name</div>
            <div className='resource-field-title'>Type</div>
            <div className='resource-field-title'>Resource ID</div>
            <div className='resource-field-title'>Start Date</div>
            <div className='resource-field-title'>End Date</div>
            <div className='resource-field-title'>Submit</div>
            </div>
            {
                resources.map((resource,ind)=>{
                    return(
                    <div key={ind} className='resource'>
                        <div className='resource-field'>{resource.id}</div>
                        <div className='resource-field'>{resource.name}</div>
                        <div className='resource-field'>{resource.type_name}</div>
                        <div className='resource-field'>{resource.res_id}</div>
                        <div className='resource-field'>{new Date(resource.start_date).toDateString()}</div>
                        <div className='resource-field'>{new Date(resource.end_date).toDateString()}</div>
                        <div className='resource-field'><button onClick={()=>returnResource(resource.res_id)}>Submit</button></div>
                    </div>
                    )
                })
            }
        </div> : <div><h5>You dont have any allocated resources</h5></div>}</>
    )
}

export default Resources