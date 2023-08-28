import { connect } from 'react-redux';
import { UserListAPI, DeleteUserAPI } from '../../store/userList/duck';
import UserListComponent from "./component"

const UserListContainer = connect(
  // Map state to props
  (state) => ({
    userList:state?.userList
  }),
  // Map actions to dispatch and props
  {
    UserListAPI,
    DeleteUserAPI,
  }
)(UserListComponent)

export default UserListContainer;