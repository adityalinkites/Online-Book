const mysql = require("mysql");
const moment = require("moment");

//Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dragonball",
  database: "webtoon",
});

db.connect();

//Query for inserting User Data
const register = (userData, callback)=> {
  db.query("INSERT INTO register SET ?", userData, (error, results) => {
    if(error) {
      return callback(error, null);
    }
    return callback(null, results);
  });  
};

//Query for checking email and phone already exist or not 
const getUserEmailPhone = (email, phone, id, callback) => {
  let query = "SELECT * FROM register WHERE (email = ? OR phone = ?)";

  if(id){
    console.log(id, "<<<id") 
    query += " AND user_id !=?";
  }

  db.query(query,[email, phone, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  });
};


const UserList = (searchKey, currentPage, pageSize, callback) => {
  let offset = (currentPage -1) * pageSize;
  Query = "SELECT rf.*, IFNULL(att.city, '') AS city, IFNULL(att.state, '') AS state, IFNULL(att.country, '') AS country, IFNULL(img.image_path, '') AS image_path FROM register rf LEFT JOIN address_table att ON rf.user_id = att.user_id LEFT JOIN user_image img ON rf.user_id = img.user_id";

  let search = `${searchKey}%`;

  if(searchKey) {
    Query += " WHERE rf.first_name LIKE ? OR rf.email LIKE ?";
  }
  countQuery = `SELECT COUNT(*) AS totalRecords FROM (${Query}) AS subQuery`;

  Query += ` ORDER BY rf.user_id DESC LIMIT ${pageSize} OFFSET ${offset}`;

  db.query(Query, [search, search, pageSize, offset], (error, results) => {
    if(error){
      return callback(error, null);
    }
    db.query(countQuery,[search, search], (error, count) => {
      if(error) {
        console.error("Error fetching count", error);
        return callback(error, null);
      }
      const totalRecords = count[0].totalRecords;

      const completeResult = {
        data: results,
        totalRecords,
      };
      return callback(null, completeResult);
    });
  });
}

//Query for inserting Comic Data
const addComic = (values, callback) => {
  db.query("INSERT INTO addcomic ( `name`, `genre`, `author`, `language`, `cost`, `comic_link`, `info`, `comic_img`, `permission`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)", values, (error, results) => {
    if(error){
      return callback(error, null)
    }
    return callback(null, results)
  });
}

//Query for selecting comic list
const webList = (searchKey, currentPage, pageSize, callback) => {
  let offset = (currentPage -1) * pageSize;

  const role = decodedToken.userData.role;

  let Query = `SELECT * FROM addComic`;

  if(searchKey) {
    Query += " Where name LIKE ? OR  author LIKE ?";
  }

  if(role === "user"){
    Query = `SELECT * FROM addComic WHERE permission = 1`;

    if(searchKey) {
      Query += " AND (name LIKE ? OR  author LIKE ?)";
    }
  }

  let search = `${searchKey}%`;

  countQuery = `SELECT COUNT(*) AS totalRecords FROM (${Query}) AS subQuery`;

  Query += ` ORDER BY comic_id DESC LIMIT ${pageSize} OFFSET ${offset}`;

  db.query(Query, [search, search, pageSize, offset], (error, results) => {
    if(error){
      return callback(error, null);
    }
    db.query(countQuery, [search, search], (error, count) => {
      if(error) {
        return callback(error, null);
      }
      const totalRecords = count[0].totalRecords;

      const completeResult = {
        data: results,
        totalRecords,
      };
      return callback(null, completeResult);
    });
  });
}

const DeleteComic = (id, callBack) => {
  Query = "DELETE FROM addComic WHERE comic_id = ? ";
  db.query(Query, [id], (error, results) => {
    if(error){
      console.error("Error Deleting record in addComic", error);
      return callBack(error, null);
    }
    return callBack(null, results);
  });
}

const DeleteUser = (id, callBack) => {
  Query = "DELETE FROM register WHERE user_id = ? ";
  db.query(Query, [id], (error, results) => {
    if(error){
      console.error("Error Deleting record in users", error);
      return callBack(error, null);
    }
    return callBack(null, results);
  });
}

const prefillData = (id, callback) => {
  let Query = "SELECT * FROM addComic WHERE comic_id = ?";
  db.query(Query, [id], (error, results) => {
    if(error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

const SingleUser = (id, callback) => {
  let Query = "SELECT rf.*, IFNULL(att.city, '') AS city, IFNULL(att.state, '') AS state, IFNULL(img.image_path, '') AS image_path, IFNULL(att.country, '') AS Area FROM register rf LEFT JOIN address_table att ON rf.user_id = att.user_id LEFT JOIN user_image img ON rf.user_id = img.user_id WHERE rf.user_id = ?";
  db.query(Query, [id], (error, results) => {
    if(error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

const UpdateComic = (values, id, callback) => {
  let Query = "UPDATE addComic SET `name` = ?, `genre` = ?, `author` = ?, `language` = ?, `cost` = ?, `info` = ?, `permission` = ?";
  // console.log(values[7])
  if(values[7] !== undefined){
    Query += " , `comic_img` = ?"
  }
  if(values[7] === undefined){
    values[7] = id;
  }
  Query += " WHERE `comic_id` = ?"
  console.log(values[7])
  db.query(Query, [...values, id], (error, results) => {
 
    if (error) {
      return callback(error, null);
    }
    console.log(Query)
    return callback(null, results);
  });
};

const getImageTable = (id, callback) => {

  db.query("SELECT * FROM user_image WHERE user_id =?", [id], (error, results) => {
      if(error){
          console.log("Error fetching Image Table", error);
          return callback(error, null);
      }
      return callback(null, results);
  });
}

const updateImageTable = (filePath, id, callback) => {

  db.query("UPDATE user_image SET `image_path` = ? WHERE `user_id` = ?", [filePath, id], (error, userImage) => {
    if(error){
      console.log("Error Updating ImageTable", error);
      return callback(error, null);
    }
    return callback(null, userImage);
  });
}

const insertImageTable = (id, filePath, callback) => {

  db.query("INSERT INTO user_image (`user_id`, `image_path`) VALUES(?, ?)", [id, filePath], (error, userImage) => {
    if(error){
      console.log("Error Inserting Image", error);
      return callback(error, null)
    }
    return callback(null, userImage);
  });
}

const updateUserTable = (values1, id, callback) => {
  if(values1.permission === ""){
    values1.permission = 0;
  }
  db.query("UPDATE register SET `first_name` = ?, `last_name` = ?, `gender` = ?, `email` = ?, `phone` = ?, `permission` = ? WHERE `user_id` = ?", [...values1, id], (error, userData) => {
    if(error){
      console.log("Error Updating UserDetails", error);
      return callback(error, null);
    }
    return callback(null, userData);
  });
}

const getAddressTable = (id, callback) => {

  db.query("SELECT * FROM address_table WHERE user_id = ?", [id], (error, results) => {
    if(error) {
      console.log("Error Fetching AddressTable", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
}

const updateAddressTable = (values2, id, callback) => {
  db.query("UPDATE address_table SET `city` = ?, `state` = ?, `country` = ? WHERE user_id = ?", [...values2, id], (error, userAddress) => {
    if(error){
      console.log("Error updating AddressTable", error);
      return callback(error, null);
    }
    return(null, userAddress);
  });
}

const insertAddressTable = (id, values2, callback) => {
  db.query("INSERT INTO address_table (`user_id`, `city`, `state`,`country`) VALUES (?, ?, ?, ?)", [id, ...values2], (error, userAddress) => {
    if(error){
      return callback(error, null);
    }
    return(null, userAddress);
  });
}

const ViewPage = (callback) => {
  Query = `SELECT * FROM addComic WHERE permission = 1`;
  db.query(Query, (error, results) => {
    if(error){
      return callback(error, null)
    }
    return (null, results)
  });
}

const InsertCartValues = (values, callback) => {
  const user_id = decodedToken.userData.id;
  console.log(user_id);
  const rowsToInsert = values.map(comic_id => [user_id, comic_id]);

  const Query = "INSERT INTO order_list (`user_id`, `comic_id`) VALUES ?";
  db.query(Query, [rowsToInsert], (error, results) => {
    if(error){
      return callback(error, null);
    }
    return callback(null, results);
  });
}

const SelectOrders = (id, callback) => {
  Query = "SELECT ac.*, ol.order_id FROM addcomic AS ac JOIN order_list AS ol ON ac.comic_id = ol.comic_id WHERE ol.user_id = ? AND permission = 1";

  db.query(Query, [id], (error, results) => {
    if(error){
      return callback(error, null);
    }
    return callback(null, results);
  });
}

module.exports = {
  register,
  getUserEmailPhone,
  addComic,
  webList,
  DeleteComic,
  DeleteUser,
  UserList,
  prefillData,
  UpdateComic,
  SingleUser,
  getImageTable,
  updateImageTable,
  insertImageTable,
  getAddressTable,
  updateAddressTable,
  insertAddressTable,
  updateUserTable,
  ViewPage,
  InsertCartValues,
  SelectOrders,
};
