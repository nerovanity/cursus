const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

const db = process.env.DATABASE_LOCAL;

mongoose.connect(db, {}).then(() =>{
    console.log("database is connected");
});

const app = require('./app');

const port = process.env.PORT;
app.listen(port,'0.0.0.0', () =>{
    console.log(`app running on ${port}...`);
    console.log(process.env.NODE_ENV);
});