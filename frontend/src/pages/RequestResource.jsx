import React, {useContext, useEffect} from "react";
import { UserContext } from "../App";
import axios from "axios";

const RequestResource = () =>{
    const {username, setUsername, availableResources, setAvailableResources} = useContext(UserContext)

    useEffect(()=>{
        const fetchAllResources = async ()=>{
            try{
                const res = await axios.get('http://localhost:8800/resources-count')
                const res2 = await axios.get('http://localhost:8800/occupied-resources-count')
                console.log(res.data)
                console.log(res2.data)
                setAvailableResources(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllResources()
    },[])
    return(
        <div></div>
    )
}

export default RequestResource
