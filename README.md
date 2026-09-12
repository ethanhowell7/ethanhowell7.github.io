# Portfolio site

A static site — plain HTML, CSS, and vanilla JS. No build step, no framework,
so it runs on GitHub Pages exactly as-is.

## Structure

```
index.html          Home — interactive oscilloscope, now strip, pillars, selected work
engineering.html    Projects with live category filters and expandable cards
leadership.html     Three tabbed threads (robotics, martial arts, DJ), each a timeline
about.html          Bio, "how I work", off the clock, resume on request
contact.html        Grouped contact channels, copy-email button, availability panel
404.html            Custom not-found page (GitHub Pages picks it up automatically)
css/style.css       All styling
js/main.js          Nav, scope, filters, expanders, tabs, copy button
images/favicon.svg  Site icon
```

## Before you deploy

All the copy is written and ready to publish. What still needs your input:

- **Contact details** — search every file for `you@example.com`, `yourusername`,
  and `yourhandle`, and swap in your real email, LinkedIn, GitHub, and Instagram
  (or delete the Instagram item on the contact page if you don't use one).
- **Photos** — the dashed `.thumb` boxes are stand-ins for real `<img>` tags.
  Replace a block like `<div class="thumb">photo</div>` with:
  `<img src="images/your-photo.jpg" alt="Describe it" style="width:100%;border-radius:10px;">`
- **Resume** — currently "request by email" plus LinkedIn. If you'd rather host a
  PDF, there's a commented-out download button in about.html; strip your phone
  number and street address from that version first.
- A few `<!-- Personalize: ... -->` comments mark where a specific story of yours
  would make a section stronger. They never show on the live site.

## Local preview

From this folder: `python3 -m http.server 8000`, then open http://localhost:8000
