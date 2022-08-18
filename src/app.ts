import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { router } from "./router";
import mongoose from "mongoose";

const app: Application = express();

const PORT = process.env.PORT || 3000;


try {
  mongoose.connect(process.env.MONGO_URI!).then((result) => {
    console.log(`Connected to Mongo Database`);
  });
} catch (error) {
  console.error(error);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    msg: "Home",
  });
});

app.use(router);

app.listen(PORT, () => {
  console.log(`\nServer is running on port ${PORT}.\n`);
});
