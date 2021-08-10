const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedToken);
    req.providerData = {name: decodedToken.name, providerId: decodedToken.providerId}
    next();
  } catch (error) {
    res.status(401).json({message: 'You are not authenitcated user!'})
  }
}
