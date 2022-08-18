import express from "express";
import { userController } from "../controller/user.controller";

export const userRouter = express.Router();

userRouter.get('', userController.hello);

userRouter.post('/create', userController.createUser);
userRouter.get('/get', userController.getUser);
userRouter.patch('/update', userController.updateUser);
userRouter.delete('/delete', userController.deleteUser);
