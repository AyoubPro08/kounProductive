const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('../frontend/public'))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})

app.use((req, res) => {
    res.status(404).send('Resource Not Found');
})
app.listen(5000, () => {
    console.log("Server is running on port 5000...")
})

