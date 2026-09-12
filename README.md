# Feed Desk

News-style wall of live traffic cams, webcams, and social/live video.

**GitHub stores the files. It does not run the scraper.**
GitHub Pages can host the HTML only. Reddit/NYC/Iowa scrapes still need the Python hub on your Chromebook.

## Files (keep in the same folder)

- `live-feed-desk.html` — the wall
- `feed-desk-server.py` — local hub (scrapes + image/HLS proxy)

## Chromebook

1. Download this repo (Code → Download ZIP) or clone it.
2. In Linux terminal:

```bash
cd feed-desk
python3 feed-desk-server.py
```

3. Open http://127.0.0.1:8080/
   Do not open the HTML as `file://`.

## GitHub Pages (HTML only)

Settings → Pages → Deploy from branch `main`.
YouTube embeds can work on `https://tbenitz.github.io/feed-desk/live-feed-desk.html` because there is a real referrer.
Many DOT/Reddit APIs will still fail in the browser. Use the hub for those.
