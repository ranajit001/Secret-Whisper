import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config()

export const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
console.log(req.headers,'authheader');
    const token = authHeader?.split(' ')[1]; 
    console.log(token,'auth token');
    
        if (!token){ 
            return res.status(401).json({ error: "Access Denied. No token provided." });}
    try {
        const verify = jwt .verify(token,process.env.jwt);
        req.user = verify;
        next();
    } catch (error) { 
         if (error.name === "TokenExpiredError") 
            return res.status(401).json({message:'No user found... 24 hrs passed after account creation...'});
         res.status(500).json({ message:error.message });
    }
}

