import React from "react";
import Person from "./Person";

const Filter = ({handleFilterName}) => {
    
    return(
    <div>
       filter shown with <input
       
       type={'text'}
       onChange={handleFilterName}
        />
        
    
    </div>
    )
}

export default Filter