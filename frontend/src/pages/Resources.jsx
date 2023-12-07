import React, {useState, useContext, useEffect} from 'react'
import { UserContext } from '../App'
import axios from 'axios'

const Resources = () =>{


    const {username, setUsername, resources, setResources} = useContext(UserContext)

    useEffect(()=>{
        const fetchAllResources = async ()=>{
            try{
                const res = await axios.post('http://localhost:8800/resources',{id:username.id})
                console.log(res.data)
                setResources(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllResources()
    },[])
    console.log(username)
    console.log(resources)
    return (
        <>{(resources && resources.length > 0) ? 
        <div className='resources'>
            <div className='resource'>
            <div className='resource-field-title'>Type</div>
            <div className='resource-field-title'>ID</div>
            <div className='resource-field-title'>Start Date</div>
            <div className='resource-field-title'>End Date</div>
            </div>
            {
                resources.map((resource,ind)=>{
                    return(
                    <div key={ind} className='resource'>
                        <div className='resource-field'>{resource.type_name}</div>
                        <div className='resource-field'>{resource.res_id}</div>
                        <div className='resource-field'>{new Date(resource.start_date).toDateString()}</div>
                        <div className='resource-field'>{new Date(resource.end_date).toDateString()}</div>
                    </div>
                    )
                })
            }
        </div> : <div></div>}</>
    )
}

export default Resources