import { connect } from 'react-redux';
import { LoginUserAPI} from '../../store/login/duck';
import LoginComponent from './component'; 

const LoginContainer = connect(
  // Map state to props
  (state) => ({
    loginUser: state?.loginUser,
  }),
  // Map actions to dispatch and props
  {
    LoginUserAPI,
  }
)(LoginComponent)

export default LoginContainer;