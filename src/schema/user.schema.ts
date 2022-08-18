import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

export const userModel = mongoose.model(
  "typescript-api-user",
  userSchema,
  "typescript-api-user"
);

type user = {
  user_id: Number,
  name: String,
  age: Number
}

export type userDocument = user & mongoose.Document | null;

export const createUserBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name", "age"],
  additionalProperties: false,
};

export const updateUserBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  additionalProperties: false,
};
