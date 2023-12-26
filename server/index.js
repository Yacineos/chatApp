import express from 'express'
import {Server} from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.port || 3500 ;

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

const io = new Server(expressServer , {
    cors: {
        // if we are not hosting the backend on a different domain then the front end , we need to add the front end production URL 
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500","http://127.0.0.1:5500"]
    }
})

io.on('connection', socket =>{
    // print the id of the connected user 
    console.log(`User ${socket.id} connected`)
    
    // Upon connection - only to user
    socket.emit('message', "Welcome to Chat App!")

    //Upon connection - to all others
    socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} connected`)

    socket.on('message', data =>{
        console.log(data);
        io.emit('message' ,`${socket.id.substring(0,5)}: ${data}`); // send the first 5 chars of the id of the client + the data
    })

    //when user disconnects - to all others 
    socket.on('disconnect', ()=> {
        socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} disconnected`)
    })

    //Listen for activity 
    socket.on('activity',(name) =>{
        socket.broadcast.emit('activity' , name);
    })


})