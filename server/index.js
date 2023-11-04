const express = require('express');
require('dotenv').config();
const router = require('./router/router');
const { dbConnect } = require('./config/dbConnect');
const { cdConnect } = require('./config/cdConnect');
const expressFileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { registerOrderHandlers } = require("./controllers/chat");
const { registerUserHandlers } = require("./controllers/chat");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log(socket);
});

dbConnect();
cdConnect();

app.use(express.json({
    limit: '1mb'
}));
app.use(cookieParser());
app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/'
}));
app.use('/api/v1', router);

httpServer.listen(process.env.PORT, () => console.log("app listning succsesfully"));
app.get('/', (req, res) => res.send('<h1>Home page for api</h1>'))