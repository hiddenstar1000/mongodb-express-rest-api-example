import express, { Request, Response } from "express";
import { ObjectId, Collection } from "mongodb";
import { db } from "../db/conn.js";
import type { Post, PostDocument, Comment } from "../types/index.js";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const collection: Collection<PostDocument> = db.collection("posts");
  const results = await collection.find({}).limit(50).toArray();
  res.status(200).send(results);
});

// Fetches the latest posts
router.get("/latest", async (_req: Request, res: Response): Promise<void> => {
  const collection: Collection<PostDocument> = db.collection("posts");
  const results = await collection
    .aggregate([
      { $project: { author: 1, title: 1, tags: 1, date: 1 } },
      { $sort: { date: -1 } },
      { $limit: 3 },
    ])
    .toArray();
  res.status(200).send(results);
});

// Get a single post
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const collection: Collection<PostDocument> = db.collection("posts");
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result);
  }
});

// Add a new document to the collection
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const collection: Collection<Post> = db.collection("posts");
  const newDocument: Post = {
    ...req.body,
    date: new Date(),
  };
  const result = await collection.insertOne(newDocument);
  res.status(201).send(result);
});

// Update the post with a new comment
router.patch(
  "/comment/:id",
  async (req: Request, res: Response): Promise<void> => {
    const query = { _id: new ObjectId(req.params.id) };
    const comment: Comment = req.body;
    const updates = {
      $push: { comments: comment },
    };

    const collection: Collection<PostDocument> = db.collection("posts");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  }
);

// Delete an entry
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection: Collection<PostDocument> = db.collection("posts");
  const result = await collection.deleteOne(query);
  res.status(200).send(result);
});

export default router;

