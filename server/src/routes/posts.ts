import express, { Request, Response } from "express";
import { Post } from "../models/Post.js";
import type { IComment } from "../models/Post.js";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const results = await Post.find({}).limit(50);
  res.status(200).send(results);
});

// Fetches the latest posts
router.get("/latest", async (_req: Request, res: Response): Promise<void> => {
  const results = await Post.find({})
    .select("author title tags date")
    .sort({ date: -1 })
    .limit(3);
  res.status(200).send(results);
});

// Get a single post
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const result = await Post.findById(req.params.id);

  if (!result) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result);
  }
});

// Add a new document to the collection
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const newPost = new Post({
    ...req.body,
    date: new Date(),
  });
  const result = await newPost.save();
  res.status(201).send(result);
});

// Update the post with a new comment
router.patch(
  "/comment/:id",
  async (req: Request, res: Response): Promise<void> => {
    const comment: IComment = req.body;
    const result = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );
    res.status(200).send(result);
  }
);

// Delete an entry
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const result = await Post.findByIdAndDelete(req.params.id);
  res.status(200).send(result);
});

export default router;
