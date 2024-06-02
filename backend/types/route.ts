import { Request,Response,NextFunction} from 'express';

type Route = {
    Method:"post" | "get" | "patch" | "delete" | "put",
    Handlers: {(req : Request<any>,res:Response<any>,next:NextFunction) : void}[];
    Callback : (req : Request<any> ,res : Response<any> ,next : NextFunction) => void
}

export default Route;