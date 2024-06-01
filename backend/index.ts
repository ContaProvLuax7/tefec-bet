declare var require: any
declare var process: any

require('dotenv').config()
import mongoose from 'mongoose';
import express from  'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const connection = mongoose.connect(process.env.uri)

app.listen(process.env.port, () => {
    console.log("Hearing at https:localhost:8080")
    

    app.get("")

})