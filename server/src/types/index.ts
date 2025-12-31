import { ObjectId } from "mongodb";

export interface Comment {
  author: string;
  body: string;
}

export interface Post {
  _id?: ObjectId;
  author: string;
  title: string;
  tags: string[];
  body: string;
  date: Date;
  comments?: Comment[];
}

export interface PostDocument extends Post {
  _id: ObjectId;
}

