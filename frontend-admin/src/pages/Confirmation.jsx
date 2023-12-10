import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import capitalizeFirstLetter from "../functions/capitalize";


const Confirmation =()=>{
    const navigate = useNavigate()
    const {selectedResources, setSelectedResources} = useContext(UserContext)
    return(
        <div class='confirmation-page'>
        <div className="confirm-div-parent">
            
                <div className="confirm-div">
                    <h4>{selectedResources.name} has returned the {selectedResources.type_name}</h4>
                </div>
        </div>
        <button onClick={()=>{setSelectedResources([]);navigate("/resources")}}>Go Back to Home</button>
        </div>
    )
}

export default Confirmation