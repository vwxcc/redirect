const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
const AI_CH_URL = (process.env.AI_CH_URL || "https://ai-ch.onrender.com").trim();

function validTarget(value) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") ? url.href : null;
  } catch {
    return null;
  }
}

const target = validTarget(AI_CH_URL);
const indexPath = path.join(__dirname, "index.html");

http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    return res.end("ok");
  }
  if (req.url !== "/" && !req.url.startsWith("/?")) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  }
  if (!target) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    return res.end("AI_CH_URL must be a valid http(s) URL.");
  }
  fs.readFile(indexPath, "utf8", (err, html) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      return res.end("Unable to load landing page.");
    }
    const safeTarget = target.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const page = html.replaceAll("__AI_CH_URL__", safeTarget);
    res.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin"
    });
    res.end(page);
  });
}).listen(PORT, "0.0.0.0", () => {
  console.log("AI-CH redirect page listening on port " + PORT);
});
