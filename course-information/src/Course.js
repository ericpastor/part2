const Header = ({ course }) => <h2>{course}</h2>
 
 
const Part = ({ part }) => {
    return(
  <li>
    {part.name} {part.exercises}
  </li>
    )
}
const Content = ({ course }) => {
    return (
        <div>
         
          <ul>
            {course.map(part => (
              <Part key={part.id} part={part} />
            ))}
          </ul>
        </div>
      )
    }
const Total = ({ parts }) => {
   
const total = parts.reduce(function(previousValue, currentValue){
               return previousValue + currentValue.exercises
}, 0)
return(
    <h3>
        Total number of exercises: { total }
    </h3>
)
}
 
const Course = ({course}) =>{
    return(
        
        <div>
        
        <Header course={course.name}/>
        <Content course={course.parts}/>
        <Total parts={course.parts}/>

        </div>
 
     )
   }
   
export default Course


