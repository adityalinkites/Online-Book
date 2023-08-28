import {Navigate, Outlet} from 'react-router-dom'


const PrivateLogin = () => {
    const token = !!localStorage.getItem("token");
    const role = !!localStorage.getItem("role");
    if(role === "Admin"){
        return(
            token ? <Navigate to="/UserList"/> : <Navigate to="/Login"/>
        )
    }
    
  return(
            token ? <Navigate to="/"/> : <Outlet/>
        )
    }

export default PrivateLogin