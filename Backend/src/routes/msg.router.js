import { Router } from "express";
import { sendMsg,getMsg ,sendMsg_urlValidator} from "../controllers/msg.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const MsgRouter = Router();


MsgRouter
.post('/send_message/:id',sendMsg)
.get('/get_msg',authMiddleware,getMsg)
.get('/validate_unique_link/:id', sendMsg_urlValidator);


