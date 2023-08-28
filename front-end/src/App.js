import React from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./views/Dashboard/Header";
import Navbar from "./views/Dashboard/Navbar";
import RegisterComponent from "./views/Register/container"
import LoginComponent from "./views/Login/container";
import WebListComponent from "./views/WebtoonList/container";
import UserComponent from "./views/UserList/container";
import AddComicComponent from "./views/AddComic/container";
import UpdateComicComponent from "./views/UpdateComic/container";
import ViewPage from "./views/ViewPage/container"
import SingleUserComponent from "./views/SingleUser/container";
import UpdateUserComponent from "./views/UpdateUser/container";
import PrivateLogin from "./PrivateLogin";
import CartComponent from "./views/Cart/container";
import OrderListComponent from "./views/OrderList/container";
// import PrivateRoutes from "./PrivateRoutes";

const App = () => {
  return(
    <>
    <Header/>
      <Routes>
        <Route path= "/" element= {<ViewPage />}/>
        <Route path= "/Register" element= {<RegisterComponent />}/>
        {/* <Route path= "/Login" element= {<LoginComponent />}/> */}
        <Route path= "/WebList" element= {<WebListComponent />}/>
        <Route path= "/UserList" element= {<UserComponent />}/>
        <Route path= "/AddComic" element= {<AddComicComponent />}/>
        <Route path= "/UpdateComic/:id" element= {<UpdateComicComponent />}/>
        <Route path= "/SingleUser" element= {<SingleUserComponent />}/>
        <Route path= "/UpdateUser/:id" element= {<UpdateUserComponent/>}/>
        <Route path="/Cart" element={<CartComponent/>} />
        <Route path="/OrderList/:id" element={<OrderListComponent/>} />
        <Route element={<PrivateLogin />}>
          <Route path="/Login" element={<LoginComponent />} />
        </Route>
      </Routes>
  </>
  );
};

export default App