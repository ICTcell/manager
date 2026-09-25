# Kinnari Mishra — Academic Portfolio

A premium, single-page academic portfolio built with semantic HTML5, modern CSS (Grid/Flexbox) and vanilla JavaScript — no frameworks, no build step.

## Structure
```
index.html              # Page markup, content and sections
assets/css/style.css    # All styling, design tokens, dark/light theme
assets/js/script.js     # Nav, theme toggle, reveals, counters, typing effect, lightbox, form
assets/images/profile.jpg
assets/docs/Kinnari_Mishra_CV.pdf
```

## Deploy to GitHub Pages
1. Create a new repository (e.g. `kinnari-mishra-portfolio`) and push this folder's contents to the `main` branch.
2. In the repo, go to **Settings → Pages**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/` within a few minutes.

## Customize
- **Content**: edit the HTML directly — every section is commented (`<!-- === N. SECTION NAME === -->`).
- **Colors/fonts**: edit the `:root` and `[data-theme="dark"]` CSS variables at the top of `style.css`.
- **Photo**: replace `assets/images/profile.jpg` (same filename, or update the `src`/`href` attributes in `index.html`).
- **CV**: replace `assets/docs/Kinnari_Mishra_CV.pdf` with an updated resume (same filename, or update the `href` attributes).
- **Placeholders**: search the HTML for the word "placeholder" or dashed-border cards — these mark sections (patents, grants, certifications, testimonials, gallery photos, some workshop/FDP entries) where the source resume had no data. Replace with real content as it becomes available.
- **Contact form**: the form in the Contact section is front-end only. Connect it to a service like Formspree or EmailJS (or your own backend) by updating the `<form>` action and the submit handler in `script.js`.
- **Google Map**: the embed uses a generic query string for the address on file. Replace the `iframe` `src` in `index.html` with an exact Google Maps embed link for a pinned location if you want a precise marker.
- **Social links**: LinkedIn is filled in; Google Scholar, ORCID, ResearchGate, GitHub, Scopus, YouTube, X/Twitter, Facebook and Instagram are placeholder `#` links — update `href` values in the Contact section once profiles are available.

## Also included
`index_standalone.html` (in the parent delivery) is a single, fully self-contained file — CSS, JavaScript, the profile photo and the CV are all embedded inline (as a data URI), so it opens and works by double-clicking it, with nothing else needed. Use the multi-file version above for GitHub Pages/version control, and the standalone file for emailing or offline use.
