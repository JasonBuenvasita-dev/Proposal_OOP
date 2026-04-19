# 📖 Complete Line-by-Line Breakdown of `index.html`

---

## 🔝 SECTION 1 — DOCUMENT HEAD (Lines 1–10)

```html
<!DOCTYPE html>
```
- This is the **document type declaration** — it's not an HTML tag, it's an instruction to the browser.
- Tells the browser: "This file uses **HTML5**" — the modern standard.
- Without this, browsers enter **"quirks mode"** and may render the page incorrectly with old, inconsistent rules.
- Must always be the **very first line** of every HTML file.

```html
<html lang="en">
```
- The root element — every other element in the page lives inside this.
- `lang="en"` tells the browser and screen readers that the page content is in **English**.
- This helps with accessibility (screen readers pronounce words correctly) and SEO (search engines understand the language).

```html
<head>
```
- The `<head>` section is **invisible to users** — it contains metadata and resources.
- Nothing inside `<head>` appears on screen directly.
- The browser reads this section first before rendering anything.

```html
    <meta charset="UTF-8">
```
- `<meta>` tags provide metadata — information about the page itself.
- `charset="UTF-8"` sets the **character encoding** to UTF-8.
- UTF-8 supports virtually every character in every language, plus emojis (📚, 🔴, 🌙, etc.).
- Without this, emojis and special characters (accents, symbols) might display as garbled characters like `â€™`.

```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- This is the **responsive design meta tag** — critically important for mobile devices.
- `width=device-width` tells the browser: "Set the viewport width to the actual screen width" — so a phone shows the mobile layout, not a zoomed-out desktop view.
- `initial-scale=1.0` sets the default zoom level to 100% on first load.
- Without this tag, mobile browsers would zoom out to fit a "desktop-sized" page, making everything tiny.

```html
    <title>StudySmart | Task Manager</title>
```
- Sets the text that appears in the **browser tab** and bookmark name.
- Also used by search engines as the page title in search results.
- The `|` is just a visual separator between the app name and description.

```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```
- `<link>` loads an **external CSS file**.
- `rel="stylesheet"` tells the browser this is a CSS stylesheet.
- This loads **Bootstrap 5.3.0** from a CDN (Content Delivery Network) — a fast public server.
- Bootstrap provides hundreds of pre-built CSS classes like `btn`, `card`, `d-none`, `container`, `row`, `col-md-4`, etc. that are used throughout the HTML.
- `bootstrap.min.css` is the **minified** version — whitespace and comments stripped out, smaller file = faster download.

```html
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- Loads the **Plus Jakarta Sans** font from Google Fonts.
- `wght@400;500;600;700` loads 4 specific font weights: regular (400), medium (500), semibold (600), bold (700).
- `display=swap` is a font loading strategy — it shows a fallback font first, then swaps to Plus Jakarta Sans once loaded. This prevents invisible text during loading.
- This font is referenced in the CSS as `font-family: 'Plus Jakarta Sans', sans-serif`.

```html
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```
- Loads the **Supabase JavaScript library** from a CDN.
- This makes the global `supabase` object available, which `script.js` uses to call `supabase.createClient()`.
- Must be loaded **before** `script.js` — if it loaded after, `script.js` would crash because `supabase` wouldn't be defined yet.
- `@supabase/supabase-js@2` is version 2 of the library.

---

## 🎨 SECTION 2 — CSS STYLES (Lines 11–95)

### `:root` — Global CSS Variables (Light Theme)

```css
:root {
```
- `:root` is a CSS pseudo-class that targets the `<html>` element — the highest level of the document.
- Variables defined here are **globally accessible** anywhere in the CSS using `var()`.
- This is where the entire **light theme color palette** is defined.

```css
    --bg: #f0f2ff;
```
- `--bg` is a **CSS custom property** (CSS variable). The `--` prefix is required for all custom properties.
- `#f0f2ff` is a very light lavender/blue — used as the page background color.
- Used in `body { background: var(--bg); }`.

```css
    --card-bg: rgba(255,255,255,0.95);
```
- Card background — near-white with 95% opacity (slightly transparent).
- `rgba()` = Red, Green, Blue, Alpha (opacity). Alpha `0.95` = 95% visible.
- The slight transparency works with `backdrop-filter: blur()` on cards.

```css
    --card-border: rgba(109,40,217,0.12);
```
- A very faint purple border color for cards — 12% opacity purple.
- `109,40,217` is the RGB value of a deep purple (#6d28d9).

```css
    --text: #1e1b4b;
```
- Deep navy/indigo — the main text color. Dark enough for readability on light backgrounds.

```css
    --accent: #7c3aed;
```
- Vibrant purple — used for headings, the timer number, table headers, and button gradients.

```css
    --accent2: #0ea5e9;
```
- Sky blue — used as the second color in gradients (buttons, header).

```css
    --input-bg: #f8f7ff;
    --input-border: #e0d9ff;
```
- Very light purple-tinted white for form input backgrounds and borders.

```css
    --shadow: 0 8px 32px rgba(109,40,217,0.10);
```
- A CSS box shadow definition:
  - `0` = no horizontal offset
  - `8px` = 8px vertical offset (shadow below)
  - `32px` = blur radius (soft, spread-out shadow)
  - `rgba(109,40,217,0.10)` = 10% opacity purple shadow
- Creates a subtle purple glow under cards and the header.

```css
    --header-gradient: linear-gradient(-45deg,#7c3aed,#0ea5e9,#f43f5e,#7c3aed);
}
```
- A 4-stop gradient at -45 degrees going through: purple → sky blue → rose/pink → purple again.
- The repeated purple at the end creates a seamless loop for the animation.

---

### `[data-theme="dark"]` — Dark Theme Overrides

```css
[data-theme="dark"] {
```
- This CSS selector targets any element that has the attribute `data-theme="dark"`.
- Applied to `<body>` by JavaScript's `toggleDarkMode()`.
- When active, every `var()` call in the CSS automatically uses these dark values instead of the `:root` ones — the entire UI repaints instantly.

```css
    --bg: #0f0e1a;
```
- Very dark navy/black — the dark mode page background.

```css
    --card-bg: rgba(22,20,40,0.97);
```
- Near-opaque dark purple-black for card backgrounds.

```css
    --card-border: rgba(139,92,246,0.18);
```
- A brighter purple border (18% opacity) — slightly more visible against dark backgrounds.

```css
    --text: #ede9fe;
```
- Very light lavender — text color in dark mode. Soft white rather than pure white to reduce eye strain.

```css
    --accent: #a78bfa;
    --accent2: #38bdf8;
```
- Lighter versions of the accent colors — the original purples/blues would be too dark to see on dark backgrounds.

```css
    --input-bg: #1a1730;
    --input-border: #2e2850;
    --shadow: 0 8px 32px rgba(0,0,0,0.35);
}
```
- Dark input backgrounds and borders.
- Shadow becomes a pure black shadow (35% opacity) instead of purple-tinted, since dark backgrounds need stronger contrast.

---

### `body` Styles

```css
body {
    background: var(--bg);
```
- Sets the full page background to the `--bg` variable (light lavender in light mode, dark navy in dark mode).

```css
    color: var(--text);
```
- Sets the **default text color** for the entire page. All text inherits this unless overridden.

```css
    font-family: 'Plus Jakarta Sans', sans-serif;
```
- Sets the font for the entire page.
- `sans-serif` is the **fallback** — if Plus Jakarta Sans fails to load, the browser uses its default sans-serif font.

```css
    transition: 0.3s;
```
- Applies a **0.3-second transition** to ALL CSS properties on the body.
- This is what makes the dark/light mode switch **animate smoothly** instead of snapping instantly.
- All the CSS variable changes (background, text color, etc.) transition over 0.3 seconds.

```css
    min-height: 100vh;
}
```
- `100vh` = 100% of the **viewport height** (the visible browser window).
- Ensures the background color covers at least the full screen height, even if there's little content.

---

### `.header-section` Styles

```css
.header-section {
    background: var(--header-gradient);
```
- Applies the animated 4-color gradient as the background.

```css
    background-size: 320% 320%;
```
- Makes the gradient **much larger** than the element (320% of its size).
- This is required for the animation to work — you can only "scroll" through a gradient if it's bigger than the visible area.

```css
    animation: gradientShift 14s ease infinite;
```
- Applies the `@keyframes gradientShift` animation:
  - `14s` = takes 14 seconds to complete one cycle
  - `ease` = starts slow, speeds up, slows down at the end
  - `infinite` = loops forever

```css
    color: white;
    padding: 30px 10px;
    text-align: center;
```
- White text on the colorful gradient background.
- `30px 10px` = 30px top/bottom padding, 10px left/right padding.
- Centers all text content.

```css
    border-radius: 0 0 24px 24px;
```
- Rounds only the **bottom-left and bottom-right** corners (24px each).
- Top corners stay sharp (0) so the header sits flush with the browser top.
- Order is: top-left, top-right, bottom-right, bottom-left.

```css
    box-shadow: var(--shadow);
    margin-bottom: 30px;
}
```
- Applies the purple shadow beneath the header.
- 30px space below the header before the main content begins.

---

### `@keyframes gradientShift`

```css
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```
- Defines the animation sequence for the header gradient.
- `background-position` shifts the visible portion of the oversized gradient:
  - At 0% (start): shows the left portion of the gradient (purple side).
  - At 50% (halfway): shifts to show the right portion (pink/rose side).
  - At 100% (end): returns to start — seamless loop.
- The `50%` vertical position keeps the gradient horizontally shifting (not vertically).
- Combined with `background-size: 320%`, this creates the flowing color animation.

---

### `.card` Styles

```css
.card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
```
- Overrides Bootstrap's default `.card` styles with custom ones.
- Heavily rounded corners (20px) for a modern, soft look.

```css
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
```
- `backdrop-filter: blur(10px)` blurs whatever is **behind** the card element.
- This creates a frosted glass effect when cards overlap with the gradient header or colored backgrounds.
- Only works if the card background has some transparency (which it does — `rgba(..., 0.95)`).

```css
    margin-bottom: 18px;
}
```
- 18px gap below each card so stacked cards don't touch.

---

### Form and Button Styles

```css
.timer-num { font-size: 2.5rem; font-weight: 700; color: var(--accent); }
```
- Styles the large timer display (e.g., "25:00").
- `2.5rem` = 2.5× the root font size (typically 40px).
- `700` = bold weight. Purple accent color.

```css
.form-control, .form-select {
    background: var(--input-bg) !important;
    border: 1.5px solid var(--input-border) !important;
    color: var(--text) !important;
    border-radius: 10px !important;
}
```
- Overrides Bootstrap's default form styles.
- `!important` forces these styles to win over Bootstrap's own styles (which are quite specific and would otherwise take priority).
- All four properties use CSS variables so they automatically switch in dark mode.

```css
.btn-save {
    background: linear-gradient(135deg,var(--accent),var(--accent2));
    color: white; border: none; border-radius: 10px;
    font-weight: 600; padding: 12px; width: 100%;
    transition: 0.2s;
}
```
- Styles the "Save Task" button with a purple-to-blue diagonal gradient.
- `135deg` = diagonal gradient (top-left to bottom-right).
- `width: 100%` makes the button span the full width of its container.
- `transition: 0.2s` enables smooth hover animations.

```css
.btn-save:hover { opacity: 0.9; transform: translateY(-1px); }
```
- On hover: slightly fades (90% opacity) and lifts 1px upward.
- `translateY(-1px)` moves the element 1px up — gives a subtle "lift" effect.
- Combined with the quick `0.2s` transition, this feels responsive and polished.

---

### Badge and Table Styles

```css
.badge-high { background: #ef4444; color: white; }
.badge-medium { background: #f59e0b; color: white; }
.badge-low { background: #22c55e; color: white; }
```
- Custom badge colors for the priority labels:
  - `#ef4444` = red (High priority — urgent)
  - `#f59e0b` = amber/yellow (Medium priority — moderate)
  - `#22c55e` = green (Low priority — relaxed)
- These class names are generated dynamically in `script.js` using `badge-${t.priority.toLowerCase()}`.

```css
.task-img { width: 45px; height: 45px; object-fit: cover; border-radius: 8px; border: 1px solid var(--input-border); }
```
- Styles the thumbnail images shown in the task table.
- `45px × 45px` = fixed square size.
- `object-fit: cover` crops the image to fill the square without stretching — maintains aspect ratio by cropping excess.
- `border-radius: 8px` slightly rounds the corners of the thumbnail.

```css
.table th { border: none; color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.75rem; }
```
- Styles table header cells (`<th>`):
  - `border: none` removes Bootstrap's default bottom border on headers.
  - `color: var(--accent)` — purple headers.
  - `text-transform: uppercase` — makes all header text UPPERCASE automatically (no need to type it in caps).
  - `font-size: 0.75rem` = 12px — small, compact header text.

```html
</style>
</head>
```
- Closes the `<style>` block and the `<head>` section.

---

## 🖥️ SECTION 3 — HEADER (Lines 96–105)

```html
<body>
```
- Everything from here is **visible content** rendered on screen.

```html
<div class="header-section" id="mainHeader">
```
- A `<div>` (generic container) with the `.header-section` class (applies the animated gradient styles) and `id="mainHeader"` for JavaScript reference if needed.

```html
    <h1>📚 STUDY SMART</h1>
```
- The largest heading level — the app's main title.
- `<h1>` is important for accessibility and SEO — should be used once per page for the main title.
- The 📚 emoji is purely visual decoration.

```html
    <p>Efficient Academic Task Management</p>
```
- A subtitle/tagline in a paragraph tag beneath the main heading.

```html
    <div class="d-flex justify-content-center gap-2 mt-2">
```
- `d-flex` — Bootstrap class that sets `display: flex`, enabling flexbox layout.
- `justify-content-center` — centers children horizontally inside the flex container.
- `gap-2` — Bootstrap spacing: adds 0.5rem (8px) gap between flex children (the two buttons).
- `mt-2` — Bootstrap margin-top utility: adds 0.5rem top margin.

```html
        <button class="btn btn-outline-light btn-sm px-3" onclick="toggleDarkMode()">🌙 Theme</button>
```
- `btn` — Bootstrap's base button class (handles sizing, cursor, focus styles).
- `btn-outline-light` — transparent background with white border and text (looks good on the colorful gradient).
- `btn-sm` — small button size.
- `px-3` — Bootstrap padding: 1rem (16px) left and right padding.
- `onclick="toggleDarkMode()"` — calls the JavaScript function directly when clicked.

```html
        <button class="btn btn-outline-light btn-sm px-3" id="logoutBtn" onclick="signOut()" style="display:none;">🚪 Logout</button>
```
- Same styling as the theme button.
- `id="logoutBtn"` — JavaScript uses this ID to find and show this button after login (`logoutBtn.style.display = 'block'`).
- `style="display:none;"` — **inline style** that hides the button by default. It's hidden until the user logs in.
- `onclick="signOut()"` — triggers the logout function.

```html
    </div>
</div>
```
- Closes the flex button container div and the header section div.

---

## 📦 SECTION 4 — MAIN CONTAINER (Line 107)

```html
<div class="container pb-5">
```
- `container` — Bootstrap class that creates a centered, responsive-width wrapper with automatic left/right margins. On large screens it has a max-width; on small screens it spans full width.
- `pb-5` — Bootstrap padding-bottom utility: adds 3rem (48px) padding at the bottom so content doesn't get clipped at the bottom of the page.

---

## 🔐 SECTION 5 — AUTH SECTION (Lines 108–121)

```html
    <div id="auth-section" class="row justify-content-center">
```
- `id="auth-section"` — JavaScript hides this entire div after login using `classList.add('d-none')`.
- `row` — Bootstrap grid row (needed before column divs).
- `justify-content-center` — centers the column horizontally within the row.

```html
        <div class="col-md-4">
```
- Bootstrap grid column: takes up 4 out of 12 columns on medium+ screens (≥768px wide).
- On small screens (mobile), it automatically expands to full width.
- 4/12 = 33% width — makes the login form a narrow centered card, not spanning the full page.

```html
            <div class="card p-4">
```
- A Bootstrap card container.
- `p-4` — Bootstrap padding: 1.5rem (24px) on all sides inside the card.

```html
                <h4 class="text-center mb-3 fw-bold" id="authTitle">Welcome Back</h4>
```
- `h4` — 4th level heading, smaller than h1.
- `text-center` — Bootstrap: centers text.
- `mb-3` — Bootstrap margin-bottom: 1rem (16px) below the heading.
- `fw-bold` — Bootstrap: font-weight bold.
- `id="authTitle"` — JavaScript changes this text between "Welcome Back" and "Join StudySmart".

```html
                <input type="email" id="email" class="form-control mb-2" placeholder="Email Address">
```
- `type="email"` — HTML5 email input: browsers validate the `@` symbol and show an email keyboard on mobile.
- `id="email"` — JavaScript reads this with `document.getElementById('email').value`.
- `form-control` — Bootstrap class that styles inputs with proper sizing, borders, and focus states.
- `mb-2` — 0.5rem (8px) margin below.
- `placeholder` — gray hint text shown when the field is empty.

```html
                <input type="password" id="password" class="form-control mb-3" placeholder="Password">
```
- `type="password"` — browser automatically masks characters as dots/asterisks for security.
- `mb-3` — slightly more bottom margin than the email field (separates it visually from the button).

```html
                <button class="btn btn-primary w-100 fw-bold" id="authBtn" onclick="signIn()">Log In</button>
```
- `btn-primary` — Bootstrap's blue button (the default primary action color).
- `w-100` — Bootstrap: `width: 100%` — button stretches full width of the card.
- `fw-bold` — bold text.
- `id="authBtn"` — JavaScript rewires its `onclick` attribute and changes its text via `toggleAuthMode()`.
- Default `onclick="signIn()"` — starts in login mode.

```html
                <p class="text-center mt-3 small">
                    <span id="authMsg">New to StudySmart?</span> 
                    <a href="#" onclick="toggleAuthMode()" id="toggleLink">Create Account</a>
                </p>
```
- `mt-3` — 1rem top margin.
- `small` — Bootstrap: reduces font size slightly.
- `<span id="authMsg">` — the "New to StudySmart?" text. Note: this `id` is declared but never used by `script.js` — it's unused.
- `<a href="#">` — `href="#"` is a placeholder link (goes nowhere, stays on same page).
- `onclick="toggleAuthMode()"` — switches the form mode when clicked.
- `id="toggleLink"` — JavaScript changes this link's text between "Create Account" and "Log In".

---

## 🖥️ SECTION 6 — MAIN APP (Lines 123–172)

```html
    <div id="main-app" class="row d-none">
```
- `id="main-app"` — JavaScript reveals this after login: `appBox.classList.remove('d-none')`.
- `d-none` — Bootstrap: `display: none` — hidden by default until login.
- `row` — Bootstrap grid row containing two columns (the left sidebar and the right task table).

---

### Left Column — Timer and Task Form

```html
        <div class="col-md-4">
```
- Left column: 4/12 columns wide on medium+ screens (33% width).
- Contains the focus timer card and the new task form card.

```html
            <div class="card p-3 text-center mb-4">
                <h6>⏲️ Focus Timer</h6>
```
- Timer card. `p-3` = 1rem padding. `mb-4` = 1.5rem bottom margin.
- `h6` — smallest standard heading level.

```html
                <div class="timer-num" id="timerDisplay">25:00</div>
```
- `timer-num` class — applies the large purple bold timer font style.
- `id="timerDisplay"` — JavaScript updates this with `document.getElementById('timerDisplay').innerText`.
- `25:00` — the initial display value (matches `timeLeft = 1500` in JS).

```html
                <button class="btn btn-primary btn-sm mt-2 px-4" onclick="toggleTimer()" id="timerBtn">Start</button>
```
- `mt-2` — 8px top margin, separating from the timer display.
- `px-4` — 1.5rem horizontal padding, making the button wider.
- `id="timerBtn"` — JavaScript changes its text between "Start" and "Pause".

```html
            <div class="card p-4">
                <h5 class="mb-3 fw-bold">✏️ New Task</h5>
```
- Task form card with a bold heading.

```html
                <input type="text" id="task_name" class="form-control mb-2" placeholder="Task Name" />
```
- Plain text input for the task name.
- `id="task_name"` — read by JavaScript: `document.getElementById('task_name').value`.
- The self-closing `/>` is optional in HTML5 but some developers use it for clarity.

```html
                <input type="text" id="subject" class="form-control mb-2" placeholder="Subject (e.g., DBMS, HCI)" />
```
- Text input for the course/subject name.
- The placeholder gives concrete examples to guide users.

```html
                <label class="small text-muted ms-1 mb-1">Due Date</label>
                <input type="date" id="deadline" class="form-control mb-2" />
```
- `<label>` provides a text label above the date input.
- `text-muted` — Bootstrap: gray, lower-contrast text (for secondary labels).
- `ms-1` — Bootstrap: 0.25rem left margin (slight indent).
- `type="date"` — renders a **native date picker** (calendar popup) in the browser.
- The value returned is always in `YYYY-MM-DD` format regardless of how it displays to the user.

```html
                <label class="small text-muted ms-1 mb-1">File Attachment</label>
                <input type="file" id="task_image" class="form-control mb-3" />
```
- Label + file input pair.
- `type="file"` — opens the OS file picker dialog.
- Despite being named `task_image`, the JavaScript accepts any file type (PDF, DOC, images, etc.).
- `id="task_image"` — JavaScript accesses it: `document.getElementById('task_image').files[0]`.

```html
                <label class="small text-muted ms-1 mb-1">Priority Level</label>
                <select id="priority" class="form-select mb-4">
                    <option value="High">🔴 High Priority</option>
                    <option value="Medium" selected>🟡 Medium Priority</option>
                    <option value="Low">🟢 Low Priority</option>
                </select>
```
- `<select>` creates a dropdown menu.
- `form-select` — Bootstrap class that styles dropdowns similarly to `form-control`.
- `mb-4` — 1.5rem bottom margin, more spacing before the save button.
- Each `<option>` has a `value` attribute (what gets saved to the database) separate from its display text (what the user sees with emojis).
- `selected` on the Medium option makes it the **default selection** when the page loads.

```html
                <button class="btn-save" id="saveBtn" onclick="saveTask()">Save Task</button>
```
- Uses the custom `btn-save` class (not Bootstrap's `btn`) for the gradient button style.
- `id="saveBtn"` — JavaScript disables it and changes its text during saving.
- `onclick="saveTask()"` — triggers the full save workflow.

---

### Right Column — Task Table

```html
        <div class="col-md-8">
```
- Right column: 8/12 columns wide (67% width) — the larger portion for the task list.
- 4 + 8 = 12, which is Bootstrap's full grid width. Together the two columns span the full row.

```html
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold">Pending Tasks</h5>
                <span class="badge bg-primary px-3" id="taskCounter">0 Tasks</span>
            </div>
```
- `d-flex` — flex container putting the heading and badge on the same line.
- `justify-content-between` — pushes heading to the far left and badge to the far right.
- `align-items-center` — vertically centers both items in the row.
- `<span>` with `badge` and `bg-primary` — Bootstrap badge: a small blue pill showing the task count.
- `id="taskCounter"` — JavaScript updates this: `counter.innerText = tasks.length + ' Tasks'`.
- Starts at "0 Tasks" as a placeholder before data loads.

```html
            <div class="card p-3">
                <div class="table-responsive">
```
- `table-responsive` — Bootstrap wrapper that adds horizontal scrolling to the table on small screens, preventing layout overflow.

```html
                    <table class="table align-middle">
```
- `table` — Bootstrap's base table class (adds proper spacing and borders).
- `align-middle` — Bootstrap: vertically centers all cell content.

```html
                        <thead>
                            <tr>
                                <th>Pic/File</th>
                                <th>Task</th>
                                <th>Subject</th>
                                <th>Deadline</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
```
- `<thead>` groups the header row — semantically distinct from data rows.
- Each `<th>` is a **header cell** (bold by default, also styled by the `.table th` CSS rule).
- 6 columns total — these correspond to the 6 `<td>` cells generated in `renderTable()`.

```html
                        <tbody id="taskTableBody">
                        </tbody>
```
- `<tbody>` is the body of the table where data rows go.
- `id="taskTableBody"` — JavaScript targets this: `document.getElementById('taskTableBody')` and sets its `innerHTML` with all the task rows.
- Starts empty — JavaScript fills it after fetching tasks.

```html
</div></div></div></div></div>
```
- Closes: table-responsive div → card div → col-md-8 div → row div → container div. Each closing tag ends one of the nested containers opened above.

---

## 📜 SECTION 7 — SCRIPT TAG (Last Line in Body)

```html
<script src="script.js"></script>
```
- Loads the JavaScript file that contains all the app logic.
- Placed at the **very bottom of `<body>`** — this is intentional and important:
  - By the time this line is reached, all the HTML above has already been parsed and the DOM elements exist.
  - If it were in `<head>`, the script would run before the HTML was built, and `document.getElementById()` calls would return `null` (elements don't exist yet).
- `src="script.js"` — a relative path, meaning the file must be in the **same folder** as `index.html`.

```html
</body>
</html>
```
- Closes the body and the root HTML element.
- Every HTML file should end with these two closing tags.
