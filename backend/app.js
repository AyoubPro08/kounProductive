const express = require('express');
const app = express();

import path from "path";
import { fileURLToPath } from "url";

const cors = require("cors");
app.use(cors());

const connectDB = require('./db/connect.js')
const tasks = require('./routes/tasks')
const journal = require('./routes/journals.js')
const notFound = require('./route-not-found.js')

require('dotenv').config();

app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use('/api/v1/journal', journal)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

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