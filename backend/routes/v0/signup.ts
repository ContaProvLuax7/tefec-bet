import Route from "../../types/route";
import UserSchema from "../../schemas/userSchema";
import mongoose, { Cursor } from 'mongoose'
import crypto from 'crypto';

export default {
    Method:"post",

    async Handlers(req, res, next) {
        //Username,password,email,email confirm
        if(req.body.username && req.body.password && req.body.email && req.body.emailConfirm)
        {
            const UserModel = mongoose.model('users', UserSchema);
            try{    
                if(req.body.password.length < 8){
                    throw new Error("Password has to contain at least 8 letters")
                }
                let Query;

                Query = await UserModel.findOne({username:req.body.username})
                console.log(Query)
                if(Query){

                    throw new Error("This username is already being used")
                }
                Query = await UserModel.findOne({email:req.body.email})
                if(Query){
                    throw new Error("This email is already being used")
                }
            }
            catch(err)
            {
                if(err){
                    return res.json({
                        Status:"Error",
                        Message:err.message
                    }).status(502)
                }
            }
            finally{
                new UserModel({
                    username:req.body.username,
                    email:req.body.email,
                    password:GenHashedKey(req.body.password),
                }).save()
            }
        }
        else{
            res.json({
                Status:"Error",
                Message:"Information not received"
            }).status(502)
        }
}
} as Route

function GenHashedKey(Input:string) : string
{
    
    const salt = crypto.randomBytes(16).toString('hex')
    const Hash = crypto.createHash('argon2').update(Input).digest('hex')
    
    return `${salt}:${crypto.scryptSync(Hash,salt,64).toString('hex')}`;
}