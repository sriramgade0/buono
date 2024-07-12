const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try {
        const newUser = req.body;

        const takenUserEmail = await User.findOne({ email: newUser.email });
        const takenUsername = await User.findOne({ username: newUser.username });

        if (takenUserEmail || takenUsername) {
            return res.status(403).send({ message: 'Username or Email is already registered!' });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newUser.password, salt);

            const dbUser = new User({
                username: newUser.username.toLowerCase(),
                email: newUser.email.toLowerCase(),
                password: hashedPassword
            });

            await dbUser.save();

            return res.status(201).send({ message: 'Successfully registered new user' });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ message: 'Error registering user!' });
    }
};

exports.loginUser = async (req, res) => {
    const userLoggingIn = req.body;

    try {
        const existingUser = await User.findOne({ username: userLoggingIn.username });

        if (!existingUser) {
            return res.status(401).send({ message: "Invalid username or password!" });
        }

        const isPasswordCorrect = await bcrypt.compare(userLoggingIn.password, existingUser.password);

        if (isPasswordCorrect) {
            const payload = {
                id: existingUser._id,
                email: existingUser.email
            };

            jwt.sign(
                payload,
                process.env.AUTH_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRY * 24 * 60 * 60 }, // Convert days to seconds
                (error, token) => {
                    if (error) {
                        console.error('JWT signing error:', error.message); // Log the error for debugging
                        return res.status(400).send({ message: 'Failed to authenticate' });
                    }
                    return res.status(200).send({
                        message: "Success",
                        token: 'Bearer ' + token
                    });
                }
            );

        } else {
            return res.status(401).send({ message: "Invalid username or password!" });
        }
    } catch (error) {
        console.error('Login error:', error.message); // Log any unexpected errors
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};
