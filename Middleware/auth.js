const { GetUser } = require("../service/auth");
const jwt = require('jsonwebtoken')
const  secreteTable = 'omnagare'

async function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.cookies._uid;
  
  try {
    if (!token) {
      return res.redirect('/Login'); // 🛑 No token provided
    }
    
    const decoded = jwt.verify(token, secreteTable);

    if (!decoded) {
      return res.redirect('/Login'); // 🛑 Invalid token
    }


    req.user = decoded; // ✅ Attach decoded payload to req.user
    next(); // ✅ Proceed to the next middleware or route

  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.redirect('/Login'); // 🛑 Redirect on error
  }
}


 


async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = GetUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};