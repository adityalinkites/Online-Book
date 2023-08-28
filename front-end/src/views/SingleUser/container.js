import { connect } from 'react-redux';
import { SingleUserAPI } from '../../store/singleUser/duck';
import SingleUserComponent from './component'; 

const SingleUserContainer = connect(
  // Map state to props
  (state) => ({
    singleUser: state?.singleUser,
  }),
  // Map actions to dispatch and props
  {
    SingleUserAPI
  }
)(SingleUserComponent)

export default SingleUserContainer;