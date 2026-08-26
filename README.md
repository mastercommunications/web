# MASTER COMMUNICATIONS

Bangladeshi film studio website for films and drama (natok). The site is a framework-free static website that can be opened directly or served with any static HTTP server.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Site structure

- `index.html` - homepage with the centered logo entrance, interactive poster deck, filters, and scroll-driven logo animation.
- `work.html` - full poster archive.
- `omar.html` - OMAR film details and YouTube player.
- `danger-bou.html`, `nabik.html`, `boro-bhai.html`, `featured-natok.html`, `original-natok.html` - drama/natok detail pages.
- `about.html` - studio information.
- `images/` - supplied poster artwork and the text-free `master-mark.svg` logo mark.
- `styles.css`, `local.css`, `pages.css`, `detail.css` - shared and page-specific styling.
- `script.js` - navigation, poster grouping, galleries, filters, adaptive framing, and YouTube embed behavior.

## Media behavior

Posters for the same title are grouped on their detail page instead of appearing as separate homepage/archive projects. The detail pages use a single poster area with previous/next controls. Poster frames automatically use each image's natural dimensions and center the artwork without cropping. The OMAR YouTube embed is configured; other detail pages keep a ready-to-replace player area.

## Visual direction

The design uses a red, orange, and white palette with Bangladeshi/Bengali language accents. The homepage opening uses the separate text-free logo mark as a transparent image mask and scales/fades it on scroll.

## Change history

All recorded commits below are on `main` and dated 2026-08-26. Commit messages are preserved as written in Git.

| Commit | Time | What changed |
| --- | --- | --- |
| `2a19876` | 18:13 +0600 | Initial README commit. |
| `d532774` | 12:43 +0000 | Created the first static homepage, shared styles/scripts, and added the supplied poster images. |
| `5bcd573` | 13:04 +0000 | Added another poster batch, moved artwork into `images/`, and updated homepage poster content and local styling. |
| `5023fee` | 13:46 +0000 | Refined homepage title/category copy. |
| `c29e21c` | 15:25 +0000 | Added the About, Contact, Work archive, and film/drama detail pages, plus shared page/detail styles and poster routing. |
| `c3265d6` | 18:13 +0000 | Added the uploaded logo/reference assets, standalone `master-mark.svg`, Bengali/local visual treatment, adaptive poster behavior, and the Nabik route. |

## Current working-tree note

At README update time, `index.html`, `local.css`, `script.js`, and `work.html` have local edits not represented in the latest commit. These include the latest homepage card-deck, poster grouping, gallery, framing, and Work-page refinements.