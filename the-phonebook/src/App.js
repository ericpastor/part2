import React, { useState, useEffect } from 'react'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'
import ListPersons from './components/ListPersons'
import personService from './services/persons'
import NotificationNeg from './components/NotificationNeg'
import NotificationPos from './components/NotificationPos'






const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterName, setFilterName]= useState('')
  const [messagePos, setMessagePos] = useState(null)
  const [messageNeg, setMessageNeg] = useState(null)
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  
  const addPerson = (event)=>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    } 
    const personFound = persons.find(person => person.name.toLocaleLowerCase()===newName.toLocaleLowerCase())
    
    if(personFound && personFound.number !== newNumber) {
    
    
    const aprove = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    
      if(aprove){
        
        const updatingPerson = {...personFound, number: newNumber}
        const id = personFound.id
        
          personService
            .update(updatingPerson.id, personObject)
            .then(returnedPerson =>{
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))  
              })
              .catch(error => {
                setMessageNeg(error.response.data)
                setTimeout(() => {
                setMessageNeg(null)
                }, 2000)  
                setMessageNeg(`${ updatingPerson.name} was allready deleted from server`)
                setTimeout(() => {
                setMessageNeg(null)
              }, 2000)           
              })
          
                setNewName('')
                setNewNumber('')
                setPersons(persons.filter(p => p.id !== id))
        }
         }else{

          personService
            .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setMessagePos(`Added ${returnedPerson.name}`)
              setTimeout(() => {
              setMessagePos(null)
              }, 2000)
                
            })
            
            .catch(error => {
              setMessageNeg(error.response.data)
              setTimeout(() => {
              setMessageNeg(null)
              }, 2000)         
            })
              setNewName('')
              setNewNumber('')
            } 
          }  

        
  const removePerson = id =>{  

    if (window.confirm("Do you really want to delete this person")) {

    personService
    .remove(id, removePerson)
    .then(deletedPerson => {
      persons.map(person => person.id !== id ? person : deletedPerson) 
      setPersons(persons.filter(p => p.id !== id))
      })
          
    .catch(error=> {        
      setMessageNeg(error.response.data)
      setTimeout(() => {
      setMessageNeg(null)
      }, 2000)
      setPersons(persons.filter(p => p.id !== id))
    }) 
  }
}


const handleNewNameAdd = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value) 
}

const handleNewNumberAdd = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleFilterName = (event) => {
  console.log(event.target.value)
  setFilterName(event.target.value)
}
 
const namesToShow = filterName
  ? persons.filter(person=>person.name.toLowerCase().includes(filterName))
  : persons 
  
  return (
    <div>
      <h2>Phonebook</h2>
       <NotificationNeg messageNeg={messageNeg}/>
       <NotificationPos messagePos={messagePos}/>
       
       <Filter handleFilterName={handleFilterName}/>
            
      <h2>add a new</h2>
       <PersonsForm 
        addPerson={addPerson}
        newName={newName}
        handleNewNameAdd={handleNewNameAdd}
        newNumber={newNumber}
        handleNewNumberAdd={handleNewNumberAdd}
         />  

      <h2>Numbers</h2>  
        <ListPersons namesToShow={namesToShow}
         removePerson={removePerson}/>                                           
    </div>
  )
}

export default App
