import axios from "axios";

// Create instance called instance
const instance = axios.create({
  baseURL: "http://localhost:3005/",
});

// Define the API functions
const api = {
  UserList: (searchKey, currentPage, pageSize, token) =>
    instance({
      method: "GET",
      url: "/api/UserList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        searchKey,
        pageSize,
        currentPage,
      },
    }),

  Register: (User) =>
    instance({
      method: "POST",
      url: "/api/register",
      data: User,
    }),
    
  Login: (User) =>
    instance({
      method: "POST",
      url: "/api/login",
      data:User,
    }),

  Update: (id, formData, token) =>
    instance({
      method: "PUT",
      url: `/api/updateComic/${id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }),
    
    SingleUser: (id, token) =>
    instance({
      method: "GET",
      url: `/api/SingleUser/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    DeleteComic: (id) =>
    instance({
      method: "DELETE",
      url: `/api/deleteRow`,
      data:id,
    }),

    DeleteUser: (id) =>
    instance({
      method: "DELETE",
      url: `/api/deleteUser`,
      data:id,
    }),

    Add: (formData, token) =>
    instance({
      method: "POST",
      url: "/api/addComic",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

    WebList: (searchKey, currentPage, pageSize, token) =>
    instance({
      method: "GET",
      url: "/api/webList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        searchKey,
        pageSize,
        currentPage,
      },
    }),

    PreFillData: (id, token) =>
    instance({
      method: "GET",
      url: `/api/preFillData/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

    UpdateUser: (id, formData, token) =>
    instance({
      method: "PUT",
      url: `/api/updateUser/${id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }),

    CheckOut: (token, id) =>
    instance({
      method: "POST",
      url: "/api/checkOut",
      data: id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

    OrderList: (id, token) =>
    instance({
      method: "GET",
      url: `/api/yourOrder/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default api;

