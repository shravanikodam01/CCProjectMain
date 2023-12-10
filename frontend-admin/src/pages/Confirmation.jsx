import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import capitalizeFirstLetter from "../functions/capitalize";


const Confirmation =()=>{
    const navigate = useNavigate()
    const {selectedResources, setSelectedResources} = useContext(UserContext)
    return(
        <div class='confirmation-page'>
        <div>Following Resources have been assigned to you, please collect it from the library reception</div>
        <div className="confirm-div-parent">
            <div className="confirm-div-title"><h5>Resources Allocated</h5></div>
            {selectedResources.map(resource=>{
                return(
                <div className="confirm-div">
                    {resource.type_name}
                </div>)
            })}
        </div>
        <button onClick={()=>{setSelectedResources([]);navigate("/resources")}}>Go Back to Home</button>
        </div>
    )
}

export default Confirmation