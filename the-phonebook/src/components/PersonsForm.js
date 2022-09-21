import React from "react";

const PersonsForm =({addPerson, handleNewNameAdd, handleNewNumberAdd, newName, newNumber})=>{
    
    
    
    return(
        <div>
            <form onSubmit={addPerson}>
        
        <div> name: <input 
            value={newName}
            onChange={handleNewNameAdd}/></div>
            
        <div> number: <input 
            value={newNumber}
            onChange={handleNewNumberAdd} /></div>
          
          <div>
            <button type="submit">add</button>
          </div>    
          
        </form>
       
        </div>
    )

}

export default PersonsForm