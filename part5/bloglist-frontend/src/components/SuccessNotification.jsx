
const SuccessNotification = ({ showMessage, successMessage }) => {

  const style = {
    color: 'green',
    backgroundColor: 'lightGrey',
    borderStyle: 'double',
    borderColor: 'green',
    borderRadius: '3px',
    padding: '5px'
  }

  return ( showMessage &&
        <div>
          <div style={style}>{successMessage}</div> <br />
        </div>
  )
}
export default SuccessNotification