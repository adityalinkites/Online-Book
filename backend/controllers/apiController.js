const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "dragon_jwt_secret_key";
const apiModel = require("../models/apiModel");
const { encryptPassword } = require("../middleware/utils");

const multer = require("multer");


// const fs = require('fs');

// img storage config
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "./backend/upload/comicImage");
    },
    filename: (req, file, callBack) => {
      callBack(null, `image-${Date.now()}.${file.originalname}`);
    },
  });
  
  // //img filter
  const isImage = (req, file, callBack) => {
    if (file.mimetype.startsWith("image")) {
      callBack(null, true);
    } else {
      callBack(null, Error("only image is allowed"));
    }
  };
  
  upload = multer({ storage: storage, fileFilter: isImage });

const def = (req, res) => {
    console.log("hello");
    return res.json("Welcome you are connected");
    
}
//User Registration
const registerUser = (req, res) => {
    const {first_name, last_name, gender, email, phone, password} = req.body;
    if(!first_name || !last_name || !gender || !email || !phone || !password){
        return res.status(400).send({
            error: true,
            message: "Provide User Details",
        });
    }
        let id = req.params.id
    if (!id) {
        id = ""
    }
    
    apiModel.getUserEmailPhone(email, phone, id, (error, existingUser) => {

        if(error) {
            console.log("Error checking existing User");
            return res.status(500).json({error: true, message: "Error Checking Existing User"})
        }
        if(existingUser) {
            if(existingUser.email === email){
                return res.status(403).json({error: true, message: "Email already exists"})
            }
            else if(existingUser.phone === phone){
                return res.status(403).json({error: true, message: "Phone already exists"})
            }
        }else {
            const encryptedPassword = encryptPassword(password);
            const userData = {
                first_name,
                last_name, 
                gender, email, 
                phone, 
                password : encryptedPassword,}
            
            apiModel.register(userData, (error, data) => {
                if(error){
                    return res.status(500).json({error: true, message: "Error inserting Data"})
                }
                return res.json({error: false, data, message: "User Registered Successfully"})
            });
        }

    });
}

//Add Comic
const addComic = (req, res) => {
    let filePath = req.file ? req.file.path : "null";
    console.log(req.body.link)
    let values = [
        req.body.name,
        req.body.genre,
        req.body.author, 
        req.body.language, 
        req.body.cost,
        req.body.link,
        req.body.info,
        filePath,
    ];
    if(!req.body.name || !req.body.genre || !req.body.author || !req.body.language || !req.body.cost || !req.body.link || !req.body.info){
        return res.status(404).json({error: true, message: "provide Comic Data"})
    }
    apiModel.addComic(values, (error, data) => {
        if(error) {
            console.error(error)
            return res.status(500).json({error: true, message: "Error inserting Comic Data"})
        }
        return res.json({error: false, data, message: "Comic Added Successfully"})
    });
}


const WebList = (req, res) => {
    let searchKey = req.query.searchKey;
    let pageSize = req.query.pageSize;
    let currentPage = req.query.currentPage;
  
    apiModel.webList(searchKey, currentPage, pageSize, (error, results) => {
        if(error) {
            console.log("error in fetching ComicList", error)
            return res.status(500).json({error: true, message: "Error in fetching Comic List"})
        }
        return res.json({
            error: false,
            data: results.data,
            totalRecords: results.totalRecords,
            message: "Comic List is here"})
    });
}

const DeleteComic = (req, res) => {
    let id = req.body.id;
    if(!id){
        return res.status(404).json({error: true, message: "Provide id"})
    }

    apiModel.DeleteComic(id, (error, deleteRow) => {
        if(error){
            console.error("error deleting row")
            return res.status(500).json({error: true, message: "error deleting row"})
        }

        return res.json({error: false, data:deleteRow, message: "Deleted Successfully"})
    });
}

const DeleteUser = (req, res) => {
    let id = req.body.id;
    console.log(id, "<<Dele")
    if(!id){
        return res.status(404).json({error: true, message: "Provide id"})
    }

    apiModel.DeleteUser(id, (error, deleteRow) => {
        if(error){
            console.error("error deleting row")
            return res.status(500).json({error: true, message: "error deleting row"})
        }

        return res.json({error: false, data:deleteRow, message: "Deleted Successfully"})
    });
}

const UserList = (req, res) => {
    // let {searchKey, pageSize, currentPage} = req.query
    let searchKey = req.query.searchKey ;
    let currentPage = req.query.currentPage;
    let pageSize = req.query.pageSize || 8;
  
    apiModel.UserList(searchKey, currentPage, pageSize, (error, results) => {
        if(error) {
            console.log(error, "error in fetching User List")
            return res.status(500).json({error: true, message: "Error in fetching User List"})
        }
        return res.json({
            error: false,
            data: results.data,
            role: decodedToken.userData.role,
            totalRecords: results.totalRecords,
            message: "User List is here"})
    });
}

const prefillData = (req, res) => {
    let id = req.params.id;
    if(!id){
        return res.status(404).json({error: true, message: "Provide id "})
    }
    apiModel.prefillData(id, (error, results) => {
        if(error) {
            console.error(error, "Error fetching pre fill Data");
            return res.status(500).json({error: true, message: "Error fetching pre fill Data"})
        }
        if(results.length === 0){
            console.log("pre fill data not found")
            return res.status(404).json({error: true, message: "prefill data not found"})
        }
        const data = results[0];
        return res.json({error: false, data, message: "Pre Filled Data is here"})
    });
}

const SingleUser = (req, res) => {
    // let id = req.params.id;
    let id = decodedToken.userData.id
    if(!id){
        return res.status(404).json({error: true, message: "Provide id "})
    }
    apiModel.SingleUser(id, (error, results) => {
        if(error) {
            console.error(error, "Error fetching User Data");
            return res.status(500).json({error: true, message: "Error fetching User Data"})
        }
        if(results.length === 0){
            console.log("pre fill data not found")
            return res.status(404).json({error: true, message: "UserData not found"})
        }
        const data = results[0];
        return res.json({error: false, data, message: "UserData is here"})
    });
}

const UpdateComic = (req, res) => {
    let id = parseInt(req.params.id);
    let filePath = req.file ? req.file.path : undefined;
    let values = [
        req.body.name,
        req.body.genre,
        req.body.author, 
        req.body.language, 
        req.body.cost, 
        req.body.info,
        parseInt(req.body.permission),
        filePath,
    ];
    console.log(values)
    if(!req.body.name || !req.body.genre || !req.body.author || !req.body.language || !req.body.cost || !req.body.info){
        return res.status(404).json({error: true, message: "provide Comic Data"})
    }
    apiModel.UpdateComic(values, id, (error, data) => {
        if(error){
            console.error(error, "Error Updating Comic Information")
            return res.status(500).json({error: true, message: "Error Updating Comic Data"})
        }
        return res.json({error: false, data, message: "Data SuccessFully UPdated"})
    });
}

const Login = (req, res) => {
    const {phone, password} = req.body;
    let email = "";
    let id = req.params.id
    if (!id) {
        id = ""
    }

    if(!phone || !password){
        return res.status(404).send({
            error: true,
            message: "Provide Login Credentials",
        });
    }
    apiModel.getUserEmailPhone(email, phone, id,(error, existingUser) => {
        if(error){
            console.log("Error while login");
            return res.status(500).json({error: true, message: "Error while login"})
        }
        if(!existingUser){
            return res.status(404).json({error:true, message: "Invalid Credentials"})
        }
        if(encryptPassword(password) === existingUser.password){
            if(existingUser.permission === 0){
                console.log("user don't have permission");
                return res.status(401).json({error: true, message: "User don't have permission "})
            }
            const userData = {
                id: existingUser.user_id,
                role: existingUser.role
            };
            const token = jwt.sign({userData}, JWT_SECRET_KEY);
            return res.json({error: false, data: existingUser, token, message: "Login Successfully Done"})
        }
        else {
            return res
        }
    });
}

const UpdateUser = (req, res) => {
    let id = parseInt(req.params.id);
    let filePath = req.file ? req.file.path : undefined;
    const {phone, email} = req.body;

    let values1 = [
        req.body.first_name,
        req.body.last_name,
        req.body.gender,
        req.body.email,
        req.body.phone,
        req.body.permission? req.body.permission : 0
    ];

    console.log(values1)
    let values2 = [req.body.city, req.body.state, req.body.country];

    if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.gender ||
        !req.body.email ||
        !req.body.phone ||
        !req.body.city ||
        !req.body.state||
        !req.body.country
    ) {
        return res.status(404).send({
            error: true,
            message: "Please provide all required user data.",
        });
    }
    apiModel.getUserEmailPhone( email, phone, id, (error, existingUser) => {
        if (error) {
            console.error("Error checking existing user:", error);
            return res
                .status(500)
                .json({ error: true, message: "Error checking existing user" });
        }

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(403).json({
                    error: true,
                    message: "Email already exists",
                });
            } else if (existingUser.phone === phone) {
                return res.status(403).json({
                    error: true,
                    message: "Phone already exists",
                });
            }
        }else{
            uploadPhoto(id, filePath, values1, values2, res);
        }
    });
}

function uploadPhoto(id, filePath, values1, values2, res) {
    if (!filePath) {
      filePath = "";
    }
    if (filePath) {
        apiModel.getImageTable(id, (error, results) => {
            if(error){
                console.error("Error checking existing image", error);
                return res
                    .status(500)
                    .json({error : true, message : "Error checking existing image"})
            }
            if(results.length > 0){
                apiModel.updateImageTable(filePath, id, (error, userImage) => {
                    if(error){
                        console.error("Error updating Image", error);
                        return res
                            .status(500)
                            .json({error: true, message: "Error updating Image"})
                    }
                    updateUserDetails(id, values1, values2, res, userImage);
                });
            }else{
                apiModel.insertImageTable(id, filePath, (error, userImage) => {
                    if(error) {
                        console.error("Error Inserting image", error);
                        return res
                            .status(500)
                            .json({error: true, message: "Error inserting Image"})
                    }
                    updateUserDetails(id, values1, values2, res, userImage);
                });
            }
        });
    } else {
      const userImage = '';
      updateUserDetails(id, values1, values2, res, userImage);
    }
}

function updateUserDetails(id, values1, values2, res, userImage) {
    apiModel.updateUserTable(values1, id, (error, userData) => {
        if(error){
            console.error("Error updating User", error);
            return res
                .status(500)
                .json({error: true, message: "Error Updating User"})
        }
        updateAddress(id, values2, res, userData, userImage);
    });
}

function updateAddress(id, values2, res, userData, userImage) {
    apiModel.getAddressTable(id, (error, results) => {
        if(error){
            console.log(error);
            return res
                .status(500)
                .json({error: true, message: "Error"})
        }
        if(results.length > 0) {
            apiModel.updateAddressTable(values2, id, (error, userAddress) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                      error: true,
                      message: "Failed to update data.",
                    });
                  }
                  return res.status(200).json({
                    error: false,
                    data: results,
                    joinData:{
                        userData,
                        userAddress,
                        userImage, 
                      },
                    message: "Data updated successfully.",
                  });
            });
        }else{
            apiModel.insertAddressTable(id, values2, (error, userAddress) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                      error: true,
                      message: "Failed to update data.",
                    });
                }
                console.log(res, "response")
                return res.status(200).json({
                    error: false,
                    data: results,
                    joinData:{
                      userData,
                      userAddress,
                      userImage,
                    },
                    message: "Data updated successfully.",
                  });
            });
        }
    });
  }

  const InsertCartValues = (req, res) => {
    let values = req.body.id;
    console.log(req.body.id);

    if(!values|| !Array.isArray(values) || values.length === 0){
        return res.status(404).json({error: true, message: "provide id"})
    }
    apiModel.InsertCartValues(values, (error, results) => {
        if(error){
            console.log("error inserting id in orderList",error);
            res.status(500).json({error: true, message: "error in orderList"})
        }
        return res.status(200).json({error: false, data:results})
    })
  }

  const SelectOrders = (req, res) => {
    let id = req.params.id;
    console.log(id, "<<<");
    if(!id){
        return res.status(404).json({error: true, message: "Provide id "})
    }
    apiModel.SelectOrders(id, (error, results) => {
        if(error) {
            console.error(error, "Error fetching Orders");
            return res.status(500).json({error: true, message: "Error fetching Orders"})
        }
        if(results.length === 0){
            console.log("order data not found")
            return res.status(404).json({error: true, message: "Orders not found"})
        }
        const data = results;
        return res.json({error: false, data, message: "Your Order is here"})
    });
    
  }

module.exports = {
    def,
    registerUser,
    addComic,
    WebList,
    DeleteComic,
    DeleteUser,
    UserList,
    prefillData,
    UpdateComic,
    Login,
    SingleUser,
    UpdateUser,
    InsertCartValues,
    SelectOrders,
};
