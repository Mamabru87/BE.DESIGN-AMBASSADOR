# Local preview (static)

This folder is a **static export** of the BE.DESIGN AMBASSADOR site pages in this repo.

## ✅ Quick start (recommended)

Because the pages reference scripts/styles and use “root-style” paths, it’s best to run a tiny local web server (instead of opening `index.html` via `file://`).

### Option A — VS Code Live Server

1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.
3. Your browser should open at a URL like `http://127.0.0.1:5500/`.

### Option B — Python (if installed)

From this folder, start a server (any port is fine):

- `python -m http.server 5500`

Then open:

- `http://localhost:5500/`

## What was fixed

- Updated page CSS/JS links to use **local** files under:
  - `wp-content/themes/studiopepe/assets/dist/styles/main.css`
  - `wp-content/themes/studiopepe/assets/dist/scripts/main.js`
  - `wp-content/themes/studiopepe/assets/dist/scripts/jquery.js`
  - `wp-content/themes/studiopepe/assets/static/js/gallery.js`
- Updated icons/logo/font references on the homepage to use local `wp-content/themes/studiopepe/assets/static/...`.
- Updated internal navigation for the pages that exist in this repo: `about/`, `contacts/`, `limited-editions/`, `press/`.

## Notes / troubleshooting

- Some images in the homepage content still point to the live domain (for example: `https://<your-domain>/wp-content/uploads/...`). If an image isn’t present in `wp-content/uploads/` locally, it will not appear offline.
- If you see blank styles/scripts, ensure you are serving the folder with a web server (Live Server / Python) rather than opening the HTML files directly.
