# AI-CH Redirect

A minimal, responsive beige landing page explaining that AI-CH has moved and providing one clear button to open the current site.

## Environment

Set `AI_CH_URL` to the current AI-CH URL in your hosting provider's environment settings:

```env
AI_CH_URL=https://ai-ch.onrender.com
```

The app validates that the value is an `http://` or `https://` URL. If the variable is omitted, it uses the current default above. Do not put secrets in this variable.

## Deploy on Render

1. Create a **Web Service** from this repository.
2. Select the Node runtime.
3. Set the build command to leave empty (no dependencies are required).
4. Set the start command to `npm start`.
5. Add `AI_CH_URL` under **Environment**.
6. Deploy. Render provides `PORT` automatically.

Health check path: `/health`.

## Local run

Requires Node.js 18 or newer:

```sh
cp .env.example .env
npm start
```

The server uses `PORT` if set, otherwise port `3000`. Note: Node does not automatically load `.env`; for local testing either export the variables in your shell or run with a compatible dotenv loader. No external packages are needed.
