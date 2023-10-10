const express = require('express');
require('dotenv').config();
const router = require('./router/router');
const {dbConnect} = require('./config/dbConnect');
const {cdConnect} = require('./config/cdConnect');

const app = express();
dbConnect();
cdConnect();

app.use(express.json());
app.use('/api/v1',router);

app.listen(process.env.PORT , () => console.log("app listning succsesfully"));
app.get('/',(req,res) => res.send('<h1>Home page for api</h1>'))