import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
import * as userSchema from "../schema/user.schema";
import { userService } from "../services/user.service";

const ajv = new Ajv();

class UserController {
  hello(req: Request, res: Response, next: NextFunction) {
    const resp = userService.hello();
    res.send(resp);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = ajv.validate(userSchema.createUserBody, req.body);
      if (!valid) {
        res.status(400).send({ error: ajv.errors });
      }
      const name:string = req.body.name;
      const age:number = req.body.age;
      const resp = await userService.createUser(name, age);
      res.send(resp);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      let resp;
      if (!req.query.user_id) {
        resp = await userService.getUser();
      } else {
        const user_id = parseInt(req.query.user_id as string);
        resp = await userService.getUser(user_id);
      }
      res.send(resp);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      let resp;
      if (!req.query.user_id) {
        resp = { msg: "no user id"}
      } else {
        const valid = ajv.validate(userSchema.updateUserBody, req.body);
        if (!valid) {
          res.status(400).send({ error: ajv.errors });
        }
        const user_id = parseInt(req.query.user_id as string);
        resp = await userService.updateUser(user_id, req.body.name, req.body.age);
      }
      res.send(resp);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      let resp;
      if (!req.query.user_id) {
        resp = { msg: "no user id"}
      } else {
        const user_id = parseInt(req.query.user_id as string);
        if(!req.body.name)
        resp = await userService.deleteUser(user_id);
      }
      res.send(resp);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}

export const userController = new UserController();
