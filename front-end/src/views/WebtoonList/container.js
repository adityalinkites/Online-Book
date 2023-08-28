import { connect } from 'react-redux';
import { WebListAPI, DeleteUser } from '../../store/webList/duck';
import WebListComponent from './component';

const WebListContainer = connect(
  // Map state to props
  (state) => ({
    webList:state?.webList,
  }),
  // Map actions to dispatch and props
  {
    WebListAPI,
    DeleteUser,
  }
)(WebListComponent)

export default WebListContainer;