import mongoose, { Schema, InferSchemaType } from "mongoose";

export interface IComment {
  author: string;
  body: string;
}

const CommentSchema = new Schema<IComment>(
  {
    author: { type: String, required: true },
    body: { type: String, required: true },
  },
  { _id: false }
);

const PostSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comments: { type: [CommentSchema], default: [] },
});

export type IPost = InferSchemaType<typeof PostSchema>;

export const Post = mongoose.model("Post", PostSchema, "posts");
