const axios = require("axios");
const { loadCache, saveCache } = require("./cache");
const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchData(force = false) {
  let cache = loadCache();
  if (!force && cache.posts && cache.users) return cache;

  try {
    const [postsRes, usersRes] = await Promise.all([
      axios.get(BASE_URL + "/posts", { timeout: 5000 }),
      axios.get(BASE_URL + "/users", { timeout: 5000 })
    ]);
    cache = { posts: postsRes.data, users: usersRes.data, fetchedAt: Date.now() };
    saveCache(cache); return cache;
  } catch (err) {
    if (cache.posts && cache.users) return cache;
    throw new Error("API fetch failed");
  }
}
module.exports = { fetchData };