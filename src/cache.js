const fs = require("fs");
const CACHE_FILE = "cache.json";

console.log('before loading cache')

function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE))
      return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  } catch {}
  return {};
}

console.log('before saving cache')

function saveCache(data) {
    fs.writeFileSync("cache.json", JSON.stringify(data, null, 2), (err) => {
        if(err) console.error("Failed to save cache:", err);
    });
}

console.log('after saving cache')

module.exports = { loadCache, saveCache };