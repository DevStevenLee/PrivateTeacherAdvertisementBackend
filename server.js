
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const connectDB = require('./config/db');
const errorHandler = require("./src/middleware/error");

const fileupload = require('express-fileupload');
const path = require('path');

dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();
app.use(fileupload());


app.use(express.json({ limit : "50mb" })); 
app.use(express.urlencoded({ limit:"50mb", extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const user = require("./src/routes/auth");
const profiles = require('./src/routes/profiles');

app.use('/auth', user);
app.use("/profiles", profiles);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT,  () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});