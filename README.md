# Portfolio site

A static site — plain HTML, CSS, and a little JS. No build step, no framework,
so it runs on GitHub Pages exactly as-is.

## Structure

```
index.html          Home
engineering.html     Projects + research
leadership.html      Robotics mentorship, martial arts, the camp, DJ business
about.html            Bio, philosophy, goals, resume
contact.html          Contact links
css/style.css         All styling
js/main.js            Mobile nav toggle
images/favicon.svg    Site icon
```

## Before you deploy

The copy on every page is already written — feel free to edit any of it, but
it's ready to publish as-is. What still needs your input:

- **Contact links** — search each file for `yourusername` and `you@example.com`
  and swap in your real email, GitHub, and LinkedIn.
- **Resume** — add a `resume.pdf` file to this folder (the About page already
  links to it).
- **Photos** — the `.thumb` boxes with dashed borders are stand-ins for real
  `<img>` tags (see below).
- A few spots have an HTML comment like `<!-- Personalize: ... -->` right
  after a paragraph — those are places a specific detail or story of yours
  would make the page stronger. They won't show up on the live site either
  way, they're just notes to yourself in the code.

To add a real photo, replace a block like this:

```html
<div class="thumb">Project photo</div>
```

with:

```html
<img src="images/your-photo.jpg" alt="Describe the photo" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">
```

Add your resume as `resume.pdf` in this same folder — the About page already
links to it.

## Local preview

No install needed. From this folder, run:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.
