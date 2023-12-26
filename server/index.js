import {createServer} from "http" ;
import {Server} from "socket.io"

const httpServer = createServer();

const io = new Server(httpServer , {
    cors: {
        // if we are not hosting the backend on a different domain then the front end , we need to add the front end production URL 
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500","http://127.0.0.1:5500"]
    }
})

io.on('connection', socket =>{
    // print the id of the connected user 
    console.log(`User ${socket.id} connected`)
    
    socket.on('message', data =>{
        console.log(data);
        io.emit('message' ,`${socket.id.substring(0,5)}: ${data}`); // send the first 5 chars of the id of the client + the data
    })
})

httpServer.listen(3500, ()=> console.log('listening on the port 3500'))

