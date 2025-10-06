const jwt = require("jsonwebtoken");

// Make sure your JWT_SECRET is set in your Replit Secrets (environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function authenticate(req, res, next) {
  // 1. Get the token directly from the 'auth-token' header
  const token = req.header("auth-token");

  // 2. Check if the token exists
  if (!token) {
    return res.status(401).json({ error: "No token provided, authorization denied." });
  }

  try {
    // 3. Verify the token using your secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Attach the user payload from the token to the request object
    // This makes `req.user.id` available in your note routes
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid." });
  }
};