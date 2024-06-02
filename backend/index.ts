declare var require: any
declare var process: any

require('dotenv').config()

import mongoose from 'mongoose';
import express from  'express'
import cors from 'cors'
import fs from 'fs'
import Route from './types/route';


const app = express()
app.use(express.json())
app.use(cors())

const connection = mongoose.connect(process.env.uri)

app.listen(process.env.port, () => {
    FindRoutesInDir(__dirname + "/routes",app)
    
})

function FindRoutesInDir(Path : string, app : any  ) : void{
    console.log("Searching routes in " + Path)
    const files = fs.readdirSync(Path)
    for(const file of files)
    {
        if(file.endsWith(".ts"))
        {
            const route = `${__dirname }/routes/v0/login.ts`
            HandleRoute(route,require(route).default)

        }else{
            FindRoutesInDir(`${Path}/${file}`,app)
        }
    }
}
function HandleRoute(Path: string,route : Route){
    const ApiRoutePath = Path.replace(__dirname + "/routes","").slice(0,-3)
    switch(route.Method)
    {
        case ("post"):
            app.post(ApiRoutePath,route.Handlers)
        break
        case ("get"):
            app.get(ApiRoutePath,route.Handlers)
        break
        case ("delete"):
            app.delete(ApiRoutePath,route.Handlers)
        break
        case ("patch"):
            app.patch(ApiRoutePath,route.Handlers)
        break
        case ("put"):
            app.put(ApiRoutePath,route.Handlers)
        break
    }
    console.log(`Loaded route : ${ApiRoutePath}`)
}