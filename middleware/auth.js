
const adminAuth = (req, res, next) => {
  console.log("Admin Auth Middleware Invoked");
  const authToken = 'abc'
  const isAdmin = authToken === 'abc';
  if (!isAdmin) {
    return res.status(403).send('Access denied. Admins only.');
  }else{
  next();
  }
};

const userAuth = (req, res, next) => {

  console.log("User Auth Middleware Invoked");
  
  const authToken = 'abc'
  const isUser = authToken === 'abc';
  if (!isUser || authToken !== 'abc') {
    return res.status(403).send('Access denied. Users only.');
  }else{
    next();
  }
};

module.exports = {adminAuth, userAuth};