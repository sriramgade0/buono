const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const BuonoRoutes = require('./routes/buono');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const connectMongoDB = require('./config/db');
const { authenticate } = require("./middleware/authMiddle");

const app = express();
app.use(express.json());

connectMongoDB();

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: '*',
    credentials: true
}));
// // app.UseAuthentication();
// app.UseAuthorization();
app.use('/api/Buono', authenticate, BuonoRoutes);
app.use('/api', authRoutes); // Ensure this line is present to use auth routes
// app.get("/", async (req, res) => {
//     return res.status(200).send({ message: "App is up and running" });
// });

app.listen(PORT, () => {
    console.log(`Buono app server is listening on port ${PORT}`);
});

module.exports = app;
