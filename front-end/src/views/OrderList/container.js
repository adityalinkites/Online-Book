import { connect } from 'react-redux';
import { OrderListAPI } from '../../store/orderList/duck';
import OrderListComponent from './component';

const OrderListContainer = connect(
  // Map state to props
  (state) => ({
    orderList: state?.orderList
  }),
  // Map actions to dispatch and props
  {
    OrderListAPI
  }
)(OrderListComponent)

export default OrderListContainer;