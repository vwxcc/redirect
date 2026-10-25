const http = require("node:http");

const PORT = Number(process.env.PORT || 3000);
const AI_CH_URL = (process.env.AI_CH_URL || "https://ai-ch.onrender.com").trim();

function validTarget(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

const target = validTarget(AI_CH_URL);

http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store"
    });
    return res.end("ok");
  }

  if (!target) {
    res.writeHead(500, {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store"
    });
    return res.end("AI_CH_URL must be a valid http(s) URL.");
  }

  // Redirect at the HTTP level immediately; do not load an interstitial page.
  res.writeHead(302, {
    "location": target,
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin"
  });
  res.end();
}).listen(PORT, "0.0.0.0", () => {
  console.log("AI-CH immediate redirect listening on port " + PORT);
});
