import express from "express";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Create a new post
router.post("/",requireSignIn,  async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts
router.get("/", requireSignIn, async (req, res) => {
  try {
    const posts = await Post.find().populate("comments");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.put("/:postId", requireSignIn, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a post
router.delete("/:postId", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { postId } = req.params;
    // Delete post and associated comments
    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ postId });
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to a post
router.post("/:postId/comments", requireSignIn,  async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const newComment = await Comment.create({ text, postId });
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate("comments");
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment
router.delete("/:postId/comments/:commentId",requireSignIn,  async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a post
router.post("/:postId/like", requireSignIn, async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post by postId and increment the likes count by 1
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true } // Return the updated post after the update
    );

    // If the post with the given postId is not found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Respond with the updated post object (including the new likes count)
    res.json(post);
  } catch (error) {
    // Handle any errors that occur during the operation
    res.status(500).json({ message: error.message });
  }
});

// Dislike a post
router.post("/:postId/dislike",requireSignIn,  async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post by postId and increment the dislikes count by 1
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { dislikes: 1 } },
      { new: true } // Return the updated post after the update
    );

    // If the post with the specified postId is not found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Respond with the updated post object (including the new dislikes count)
    res.json(post);
  } catch (error) {
    // Handle any errors that occur during the operation
    res.status(500).json({ message: error.message });
  }
});

export default router;
