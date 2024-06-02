declare var require: any
declare var process: any

import dotenv from 'dotenv'
import mongoose from 'mongoose';
import express from  'express'
import cors from 'cors'
import fs from 'fs'
import Route from './types/route';
import jwt from 'jsonwebtoken'

dotenv.config()


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
            const route = `${Path}/${file}`
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
            app.post(ApiRoutePath,route.Callback)
        break
        case ("get"):
            app.get(ApiRoutePath,route.Callback)
        break
        case ("delete"):
            app.delete(ApiRoutePath,route.Callback)
        break
        case ("patch"):
            app.patch(ApiRoutePath,route.Callback)
        break
        case ("put"):
            app.put(ApiRoutePath,...route.Handlers , route.Callback)
        break
    }
    console.log(`Loaded route : ${ApiRoutePath}`)
}

export function verifyJWT(req, res, next){
    const token = req.headers['auth'];
    if (!token) return res.status(401)
    .json({ auth: false, message: 'No token provided.',status:"Error" });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.',status:"Error" });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}