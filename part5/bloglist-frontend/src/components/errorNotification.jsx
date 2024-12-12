
const ErrorNotification = ({ notification,showNotification }) => {

  const style = {
    color: 'red',
    backgroundColor: 'lightGrey',
    borderStyle: 'double',
    borderColor: 'red',
    borderRadius: '3px',
    padding: '5px'
  }
  return ( showNotification &&
        <div>
          <div style={style}>{notification}</div>
        </div>
  )
}

export default ErrorNotification
