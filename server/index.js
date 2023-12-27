const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./config/dbConnect');
const { cdConnect } = require('./config/cdConnect');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const allUserRouter = require('./router/all-users');
const authRouter = require('./router/auth');
const chatRouter = require('./router/chat');
const friendsRouter = require('./router/friends');
const postRouter = require('./router/post');
const userRouter = require('./router/user');
const messageRouter = require('./router/message');

const specs = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Together',
            description: 'Api for Chat application',
            version: '1.0.0',
            contact: {
                name: 'Krishna',
                email: 'krishnajain5050@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:4000/api/v1'
            }
        ]
    },
    apis: ['./router/*.js', './models/*.js']
})

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    pingTimeout: 6000,
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

io.on('connection', (socket) => {
    socket.on('joinChat', (room) => {
        socket.join(room);
    });
    socket.on('newMsg', (msg) => {
        io.in(msg.chat).emit('msgRecieved', msg);
    })
});

dbConnect();
cdConnect();

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json({
    limit: '50mb'
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(cookieParser());

app.use('/api/v1/all-users', allUserRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/friends', friendsRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/auth', authRouter);

httpServer.listen(process.env.PORT, () => console.log("app listning succsesfully"));
app.get('/', (req, res) => res.send('<h1>Home page for api</h1>'))