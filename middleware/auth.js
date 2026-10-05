const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if (!authoHeader) {
        return res.Status(401).json({
            error: "Authorization required"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }

};

module.exports = authMiddleware;