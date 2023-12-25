import { connect } from 'react-redux';
import { SingleUserAPI } from '../../store/singleUser/duck';
import Navbar from './Navbar';

const SingleUserContainer = connect(
  // Map state to props
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  // Map actions to dispatch and props
  {
    SingleUserAPI,// change to see i can push the code
  }
)(Navbar)

export default SingleUserContainer;