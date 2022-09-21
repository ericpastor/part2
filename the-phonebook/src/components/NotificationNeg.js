
const NotificationNeg = ({ messageNeg }) => {
    if (messageNeg === null ) {
      return null
    }
  
    return (
      <div className= "error">
      {messageNeg}  
      </div>
    )
  }

  
  export default NotificationNeg