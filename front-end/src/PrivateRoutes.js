import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    const token = !!localStorage.getItem("token");
    const role  = !!localStorage.getItem("role");
    // if(role === "user"){
    //     token ? <Outlet/> : <Navigate to = "/Login"/>
    // }

  return(
            token ? <Outlet/> : <Navigate to = "/Login"/>
        )
    }

export default PrivateRoutes