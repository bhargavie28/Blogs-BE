const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db')
const app = express();
const cors = require("cors");



// connect database

connectDB();
app.use(cors());


//Init Middleware

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res)=> res.send('API running') )


// Define Routes

app.use('/api/blogs', require('./routes/api/blogs'))

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));