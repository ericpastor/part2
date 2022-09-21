const NotificationPos = ({ messagePos }) => {
    if (messagePos === null ) {
      return null
    }
  
    return (
      <div className= "notification">
      {messagePos}  
      </div>
    )
  }
  
  export default NotificationPos