import { connect } from 'react-redux';
import { WebListAPI } from '../../store/webList/duck';
import { addToCart } from '../../store/cart/duck';
import ViewPageComponent from './component';

const ViewPageContainer = connect(
  // Map state to props
  (state) => ({
    webList:state?.webList,
    cartItems: state.cart.cartItems,
  }),
  // Map actions to dispatch and props
  {
    WebListAPI,
    addToCart,
  }
)(ViewPageComponent)

export default ViewPageContainer;