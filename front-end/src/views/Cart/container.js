import { connect } from 'react-redux';
import { CheckOutAPI } from '../../store/checkout/duck';
import { removeItemFromCart } from '../../store/cart/duck';
import { SingleUserAPI } from '../../store/singleUser/duck';
import ViewPageComponent from './component'; 

const ViewPageContainer = connect(
  // Map state to props
  (state) => ({
    cartItems: state.cart.cartItems,
    checkOut: state?.checkOut,
  }),
  // Map actions to dispatch and props
  {
    removeItemFromCart,
    CheckOutAPI,
    SingleUserAPI,
  }
)(ViewPageComponent)

export default ViewPageContainer;