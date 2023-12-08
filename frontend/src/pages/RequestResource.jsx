import React, {useContext, useEffect} from "react";
import { UserContext } from "../App";
import axios from "axios";

const RequestResource = () =>{
    const {username, setUsername, availableResources, setAvailableResources} = useContext(UserContext)
    
    useEffect(()=>{
        const fetchAllResources = async ()=>{
            let resourcesAV=[], occupiedResourcesName=[]
            try{
                const resourcesCount = await axios.get('http://localhost:8800/resources-count')
                const occupiedResourcesCount = await axios.get('http://localhost:8800/occupied-resources-count')
                
                for(let i=0;i< resourcesCount.data.length;i++){
                    for(let j=0;j<occupiedResourcesCount.data.length;j++){
                        if(resourcesCount.data[i].type_name == occupiedResourcesCount.data[j].type_name){
                            resourcesAV = [...resourcesAV, {type_name: resourcesCount.data[i].type_name, count: resourcesCount.data[i].count - occupiedResourcesCount.data[j].count}]
                        }
                    }
                }
                for(let i=0;i<occupiedResourcesCount.data.length;i++){
                    occupiedResourcesName.push(occupiedResourcesCount.data[i].type_name)
                }
                for(let i=0;i<resourcesCount.data.length;i++){
                    if(!occupiedResourcesName.includes(resourcesCount.data[i].type_name)){
                        resourcesAV = [...resourcesAV, {type_name: resourcesCount.data[i].type_name, count: resourcesCount.data[i].count}]
                    }
                }
                setAvailableResources(resourcesAV)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllResources()
    },[])
    console.log(availableResources)
    return(
        <>
            <div className="resources-available-div">
                {availableResources.map(resource=>{
                    return(
                        (resource.count > 0) && <div className="available-resource">
                            <h4>{resource.type_name}</h4>
                            <button>Add to Cart</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default RequestResource
