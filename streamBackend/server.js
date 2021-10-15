const express =require('express')
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
   cors: {
       origin:'*'
   }
});
const cors = require('cors')
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
connectDb();
const node_media_server = require('./mediaServer');
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
}))
const PORT = process.env.PORT || 5000;

server.listen(PORT, err => {
    if (err) throw err;
    console.log("Express server running");
    node_media_server.run();
  }); 


  io.on('connection',(socket)=>{

    socket.on("join", async ({ userId }) => {
      console.log(userId);
    });

    socket.emit('message', 'Welcome to The Chat room');

    socket.on("sendNewMsg", async ({ userId,  messageString,date }) => {
     
        io.emit('messageEveryone',{userId,messageString,date});
      
    });


  })

  app.use('/api/signup',require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use('/api/streams',require('./api/streams'));
//   app.all("*", (req, res) => handle(req, res))