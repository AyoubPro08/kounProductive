const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors());

const connectDB = require('./db/connect.js')
const tasks = require('./routes/tasks')
const notFound = require('./route-not-found.js')

require('dotenv').config();

app.use(express.json())
app.use('/api/v1/tasks', tasks)

app.use(notFound)

const port = process.env.PORT || 3000

const start = async() => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Server is running on port ${port}...`)})
    } catch (err) {
        console.log(err)
    }
}
start()