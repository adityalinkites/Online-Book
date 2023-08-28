import { connect } from 'react-redux';
import { SingleUserAPI } from '../../store/singleUser/duck';
import UpdateUserComponent from './component'; 
import { UpdateUserAPI } from '../../store/UpdateUser/duck';

const UpdateUserContainer= connect(
  // Map state to props
  (state) => ({
    singleUser: state?.singleUser,
    updateUser: state?.updateUser,
  }),
  // Map actions to dispatch and props
  {
    SingleUserAPI,
    UpdateUserAPI,
  }
)(UpdateUserComponent)

export default UpdateUserContainer;