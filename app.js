const express = require('express');
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const routes = require('./routes/index')

app.use('/api', routes)


app.listen(process.env.PORT, () => {
   console.log(`server start`)
})