import React, {useContext, useEffect} from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useState } from "react";
import capitalizeFirstLetter from "../functions/capitalize";
import { useNavigate } from "react-router-dom";


const RequestResource = () =>{
    const navigate = useNavigate()
    const {username, setUsername, availableResources, setAvailableResources, selectedResources, setSelectedResources, resources} = useContext(UserContext)
    
    useEffect(()=>{
        const fetchAllResources = async ()=>{
            try{
                const resourcesAvailable = await axios.get('http://localhost:8080/available-resocurces')
                console.log(resourcesAvailable)
                const availResourcesObject={}
                for(let i=0;i<resourcesAvailable.data.length;i++){
                    let key = resourcesAvailable.data[i].type_name
                    if(Object.keys(availResourcesObject).includes(key)){
                        availResourcesObject[key] = {...availResourcesObject[key],res_id:[...availResourcesObject[key].res_id, resourcesAvailable.data[i].res_id]}
                    }
                    else{
                        availResourcesObject[key] = {type_id: resourcesAvailable.data[i].type_id, res_id: [resourcesAvailable.data[i].res_id], value: 'Add to Cart'}
                    }
                }
                console.log(availResourcesObject)
                
                setAvailableResources(availResourcesObject)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllResources()
    },[])

    const checkout =()=>{
        console.log(selectedResources)
        axios.post("https://server-dot-ardent-quarter-403122.uc.r.appspot.com/add-resources",{id: username.id, 
                                                    resources: selectedResources
                                                }).then((response)=>{
                                                    console.log(response)
                                                    navigate("/confirmation")
                                                })
        
    }
    console.log(availableResources, resources.map(res=>res.type_name))
    return(
        <>
            <div className="resources-available-div">
                {Object.keys(availableResources).map(resource=>{
                    return(
                        (availableResources[resource].res_id.length > 0) && <div className="available-resource">
                            <h4>{capitalizeFirstLetter(resource)}</h4>
                            <button disabled={resources.map(res=>res.type_name).includes(resource)} onClick={()=>{
                                if(availableResources[resource].value=='Remove from Cart'){
                                    setAvailableResources({...availableResources, [resource]:{...availableResources[resource], value: 'Add to Cart'}})
                                    setSelectedResources(selectedResources.filter((filterResource)=>{
                                        return filterResource.type_name!=resource
                                    }))
                                }
                                else{
                                    setAvailableResources({...availableResources, [resource]:{...availableResources[resource], value: 'Remove from Cart'}})
                                    setSelectedResources([...selectedResources, {type_name: resource ,type_id: availableResources[resource].type_id, res_id: availableResources[resource].res_id[0]}])
                                }
                                }}>
                                    {capitalizeFirstLetter(availableResources[resource].value)}
                            </button>
                        </div>
                    )
                })}
            </div>
            <button onClick={()=>checkout()}>Checkout</button>
        </>
    )
}

export default RequestResource
