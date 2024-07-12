const jwt = require('jsonwebtoken'); 
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
        jwt.verify(
            token,
            process.env.AUTH_SECRET,
            (error, decoded) => {
                if (error) {
                    console.error('JWT verification error:', error.message); // Log the error for debugging
                    return res.status(401).send({
                        isLoggedIn: false,
                        message: 'Failed to authenticate'
                    });
                }
                
                // Set decoded information to req.user for use in subsequent middleware or routes
                req.user = {
                    id: decoded.id,
                    email: decoded.username
                };

                next(); // Continue to the next middleware
            }
        );
    } else {
        return res.status(401).send({ message: 'Not logged in! Login or signup to access this resource!' });
    }
};