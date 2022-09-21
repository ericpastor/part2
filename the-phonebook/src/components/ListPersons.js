import React from "react";
import Person from "./Person";

const ListPersons = ({ namesToShow, removePerson})=>{
  
  
    return(

        <div>
         <ul>     
          {namesToShow
          
          .map((person) => (
            <Person key={person.id} person={person} removePerson={removePerson}/>
          )
        )}
      </ul>
    </div>
  )
}

export default ListPersons