const express = require("express");
const router = express.Router();
const { fetchData } = require("./api");

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

module.exports = router;