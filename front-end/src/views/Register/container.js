import { connect } from 'react-redux';
import { RegisterUserAPI } from "../../store/register/duck";
import RegisterComponent from './component'; 

const RegisterContainer = connect(
  // Map state to props
  (state) => ({
    register:state?.registerUser
  }),
  // Map actions to dispatch and props
  {
    RegisterUserAPI,
  }
)(RegisterComponent)

export default RegisterContainer;