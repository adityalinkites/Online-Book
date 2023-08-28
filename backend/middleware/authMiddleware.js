const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "dragon_jwt_secret_key"; 

function verifyToken(req, res, next) {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the authorization header

    if (!token) {
        return res.status(401).json({ error: true, message: 'Token not provided' });
    }
    else{
      decodedToken = jwt.verify(token, JWT_SECRET_KEY)
      // decodedToken = JSON.parse(decodedToken)
      // console.log(decodedToken)
      next();
    }
  }catch(error){
    console.log(error);
  }
}


module.exports = {
  verifyToken,
};