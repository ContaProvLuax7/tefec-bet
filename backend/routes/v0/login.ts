import UserSchema from "../../schemas/userSchema";
import Route from "../../types/route";
import mongoose from "mongoose";
import {scryptSync, timingSafeEqual,createHash} from 'crypto'
import jwt from 'jsonwebtoken';

declare var process : any

export default {
    Method:"post",
    Handlers:[],
    async Callback(req, res, next) {
        if(req.body.password && (req.body.email || req.body.username))
        {
            const Model = mongoose.model('users',UserSchema)
            let Query = Model.findOne()
            const result = await Query.or([{email:req.body.email},{username:req.body.username}])

            if(result){
                const [salt, key] = result.password.split(':')

                const HashedBuffer = scryptSync(createHash('sha256').update(req.body.password).digest('hex') , salt,64)
                const Hashedkey = Buffer.from(key,'hex')

                if(timingSafeEqual(HashedBuffer,Hashedkey)){
                    const token = jwt.sign(result.id, process.env.jwtsecret)
                    res.json({
                        "status":"Sucess",
                        "Message":"Logging in",
                        "auth-token":token
                    }).status(200)
                }else{
                    res.json({
                        "status":"Error",
                        "Message":"Passwords do not match",
                        "auth-token":null
                    }).status(502)
                }

            }else{
                res.json({
                    "status":"Error",
                    "Message":"No account is using this email or username",
                    "auth-token":null
                }).status(404)
            }
            
        }else {
            res.json({
                "status":"Error",
                "Message":"Password, username or email missing",
                "auth-token":null
            }).status(502)
        }
    },
} as Route