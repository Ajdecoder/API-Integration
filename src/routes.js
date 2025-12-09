const express = require("express");
const router = express.Router();
const { fetchData } = require("./api");

router.get("/refresh", async (req, res) => {
  try {
    const data = await fetchData(true);
    res.json({
      message: "Cache refreshed successfully",
      fetchedAt: new Date(data.fetchedAt),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to refresh cache", details: err.message });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const { userId, title } = req.query;
    const data = await fetchData(false);
    let posts = data.posts;
    if (userId) posts = posts.filter(p => p.userId == userId);
    if (title) posts = posts.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
    return res.json({ count: posts.length, posts });
  } catch (err) { return res.status(500).json({ error: err.message }); }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const data = await fetchData(false);
    const post = data.posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const user = data.users.find(u => u.id === post.userId);
    return res.json({ post, user });
  } catch (err) { return res.status(500).json({ error: err.message }); }
});

router.get("/users", async (req, res) => {
  try {
    const data = await fetchData(false);
    return res.json({ count: data.users.length, users: data.users });
  } catch (err) { return res.status(500).json({ error: err.message }); }
});

router.get("/users/:id", async (req, res) => {
  try {
    const data = await fetchData(false);
    const user = data.users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const userPosts = data.posts.filter(p => p.userId == user.id);
    return res.json({ user, posts: userPosts });
  } catch (err) { return res.status(500).json({ error: err.message }); }
});


module.exports = router;