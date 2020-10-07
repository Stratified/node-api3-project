const server = require('./server.js');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(userRouter);
server.use(postRouter);
