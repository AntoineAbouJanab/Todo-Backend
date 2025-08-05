const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const users = require("./routes/users")
const connectDB =require('./db/connect')
require('dotenv').config()
const port = 3080
const cors = require('cors')

app.use(cors());

//middleware
 app.use(express.json()) //to get data in req.body




//routes
app.get('/hello', (req, res)=>{
    res.send('Todo App')
})

app.use('/todo', tasks)
app.use('/user', users)






const start = async ()=>{
    try{
        console.log("Starting app");
        
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to db")
        app.listen(port, console.log(`Server is listening on port ${port}.`))

    }catch(error){

    }
}

start()