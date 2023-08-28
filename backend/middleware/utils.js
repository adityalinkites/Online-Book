const crypto = require("crypto");
const encryptPassword = (password) =>{
    // Create an MD5 hash object
    const md5 = crypto.createHash("md5");
  
    // Update the hash object with the password
    md5.update(password);
  
    // Generate the hashed password as a hex string
    const hashedPassword = md5.digest("hex");
  
    return hashedPassword;
  }

//   export default encryptPassword;
  module.exports = {
    encryptPassword,
  }