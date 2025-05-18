
import './UsersList.css'
import PropTypes from "prop-types";


const UsersList = ({customer}) => {
  return (
    <div className='user flex-col'>
        <p className="user-title">Users List</p>
        <div className="user-table">
            <div className="user-table-format title">
                <b>S/N</b>
                <b>Name</b>
                <b>Email</b>
                
            </div>
            {customer.map((item, index) => {
                return (
                    <div className="user-table-format" key={index}>
                        <h3>{index + 1}</h3>
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        
                    </div>
                )
            })}
        </div>
    </div>
  )
}
UsersList.propTypes = {
    customer: PropTypes.array.isRequired,
    
}

export default UsersList