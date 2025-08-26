import { register, login,loginStatusCheck,logout } from "../controllers/user.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const UserRouter = Router(); // Changed UserRouter to userRouter

UserRouter
  .post('/register',f, register)
  .post('/login', loginn,login)
  .post('/logout',logoutt,authMiddleware,logout)
  .get('/verify',f,authMiddleware,loginStatusCheck);



  function f(req,res,next) {
    console.log('comming////');next()
    
  }

    function loginn(req,res,next) {
    console.log('loginnn');next()
    
  }

      function logoutt(req,res,next) {
    console.log('loginnn');next()
    
  }

  