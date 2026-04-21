# 📖 Complete Line-by-Line Breakdown of the Updated `index.html`

---

## 🔝 SECTION 1 — DOCUMENT HEAD (Lines 1–7)

```html
<!DOCTYPE html>
```
- Declares this as an **HTML5 document** — tells the browser which rules to use when parsing.
- Must always be the absolute first line. Without it, browsers enter "quirks mode" and render inconsistently.

```html
<html lang="en">
```
- The root element that wraps everything on the page.
- `lang="en"` declares the language as English — helps screen readers pronounce words correctly and helps search engines understand the content.

```html
<head>
```
- The invisible section — contains metadata, links to external resources, and styles.
- Nothing inside `<head>` appears directly on screen.

```html
    <meta charset="UTF-8">
```
- Sets character encoding to UTF-8 — supports every character in every language plus emojis (📚, 🔴, ⏲, etc.).
- Without this, emojis and special characters would display as garbled symbols.

```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- Critical for **mobile responsiveness**.
- `width=device-width` — tells mobile browsers to use the actual screen width instead of pretending to be a desktop.
- `initial-scale=1.0` — starts at 100% zoom, no pinch-zoom pre-applied.
- Without this, phones would zoom out to show a tiny desktop-sized layout.

```html
    <title>StudySmart | Task Manager</title>
```
- Text shown in the **browser tab**, bookmarks, and search engine results.
- The `|` is just a visual separator.

```html
    <!-- Fonts: Space Grotesk (display) · DM Sans (body) · JetBrains Mono (timer/dates) -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
```
- **⭐ Major upgrade** — this version loads **three distinct fonts** instead of one.
- `Space Grotesk` — a geometric, modern sans-serif used for headings, labels, logos, and buttons.
- `DM Sans` — a clean, highly readable sans-serif used for body text and general UI.
- `JetBrains Mono` — a **monospace** font (all characters same width) used for the timer and dates — gives a technical/coding aesthetic.
- `wght@400;500;600;700` — loads specific weights to avoid downloading the full font family.
- `ital,opsz,wght@0,9..40,400...` — DM Sans uses variable font axes (italic, optical size, weight).
- `display=swap` — shows fallback font immediately, swaps to loaded font when ready. Prevents invisible text during load.
- All three fonts are loaded in **one single `<link>` tag** — more efficient than three separate requests.

```html
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```
- Loads the **Supabase JavaScript SDK** from a CDN before any other scripts.
- Must come before `script.js` — the JS file needs this library to already exist when it runs.
- Creates the global `supabase` object used in `script.js`.

---

## 🎨 SECTION 2 — CSS DESIGN SYSTEM (Lines 10–200)

### `:root` — Design Tokens (Light Theme)

```css
:root {
```
- Targets the `<html>` element — the highest scope for CSS variables.
- Everything defined here is accessible anywhere via `var()`.
- This version uses a much more complete **design token system** than before.

```css
    --bg:           #f0f2ff;
```
- Page background — light lavender. The extra spacing after the colon is for visual alignment of all token values (a stylistic convention).

```css
    --surface:      rgba(255,255,255,0.96);
```
- **New token** replacing `--card-bg`. Named `surface` — a design system term for elevated UI layers (cards, panels).
- Nearly opaque white with 4% transparency for frosted glass effect.

```css
    --surface-up:   #ffffff;
```
- **New token** — pure white, for elements that sit *above* `--surface` (e.g., dropdown option backgrounds). The `-up` suffix means "one level higher in elevation."

```css
    --card-border:  rgba(109,40,217,0.10);
```
- Very faint purple border — 10% opacity. Used on all panels/cards.

```css
    --text:         #1e1b4b;
    --text-muted:   #6b63a4;
```
- `--text` — deep indigo/navy for primary text.
- `--text-muted` — **new token**, a medium purple-gray for secondary text, labels, and subdued content. Gives visual hierarchy without needing extra elements.

```css
    --accent:       #7c3aed;
    --accent2:      #0ea5e9;
```
- Primary purple and sky blue accent colors — used in gradients, highlights, and interactive elements.

```css
    --input-bg:     #f8f7ff;
    --input-border: #e0d9ff;
```
- Light purple-tinted backgrounds and borders for form inputs.

```css
    --shadow-sm:    0 2px 8px  rgba(109,40,217,0.07);
    --shadow:       0 8px 32px rgba(109,40,217,0.10);
    --shadow-lg:    0 16px 48px rgba(109,40,217,0.14);
```
- **⭐ Three-tier shadow system** — new in this version.
- `--shadow-sm` — subtle shadow for small elements.
- `--shadow` — standard card shadow.
- `--shadow-lg` — deeper shadow for floating elements like the auth card.
- Each level increases: vertical offset (2→8→16px), blur (8→32→48px), and opacity (7%→10%→14%).

```css
    --header-grad:  linear-gradient(-45deg,#7c3aed,#0ea5e9,#f43f5e,#7c3aed);
```
- Renamed from `--header-gradient` to `--header-grad` — shorter token name. Same 4-color animated gradient.

```css
    --radius:       16px;
    --radius-sm:    10px;
```
- **⭐ New tokens** — standardized corner radius values. Instead of writing `border-radius: 16px` every time, you use `var(--radius)`. Changing this one value updates all rounded corners simultaneously.

```css
    --sidebar-w:    300px;
}
```
- **⭐ New token** — the fixed width of the left sidebar, used in the CSS Grid layout. Centralizes this value so changing it one place updates the entire layout.

---

### `[data-theme="dark"]` — Dark Theme

```css
[data-theme="dark"] {
    --bg:           #0f0e1a;
    --surface:      rgba(22,20,40,0.97);
    --surface-up:   #1c1932;
```
- Dark background, near-opaque dark purple surfaces.
- `--surface-up: #1c1932` — a slightly lighter dark color for elements that sit above the surface (dropdowns, etc.).

```css
    --card-border:  rgba(139,92,246,0.15);
    --text:         #ede9fe;
    --text-muted:   #9d8fe0;
```
- Brighter purple border (slightly more visible in dark).
- Light lavender primary text. Medium purple for muted text.

```css
    --accent:       #a78bfa;
    --accent2:      #38bdf8;
    --input-bg:     #1a1730;
    --input-border: #2e2850;
```
- Lighter accent colors for readability on dark backgrounds.
- Dark input backgrounds with subtle purple borders.

```css
    --shadow-sm:    0 2px 8px  rgba(0,0,0,0.25);
    --shadow:       0 8px 32px rgba(0,0,0,0.35);
    --shadow-lg:    0 16px 48px rgba(0,0,0,0.50);
}
```
- All three shadow levels switch to pure black shadows in dark mode.
- Pure black shadows look more natural on dark backgrounds than purple-tinted ones.

---

### CSS Reset

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
```
- **⭐ New universal reset** — applies to every element, including `::before` and `::after` pseudo-elements.
- `box-sizing: border-box` — changes how width/height are calculated: padding and border are **included inside** the declared width, not added on top. This is the modern standard that prevents layout surprises.
- `margin: 0; padding: 0` — removes all browser default spacing. Browsers add their own margins/padding to elements like `<h1>`, `<p>`, `<ul>` — this wipes all of that for a clean slate.

```css
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
```
- All links (`<a>`) default to purple accent color with no underline.
- Underline appears only on hover — cleaner look while maintaining usability.

```css
body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    line-height: 1.6;
    transition: background 0.35s, color 0.35s;
}
```
- `font-family: 'DM Sans'` — body text uses DM Sans (not Plus Jakarta Sans like before).
- `line-height: 1.6` — **new** — sets comfortable text line spacing (1.6× the font size). Improves readability.
- `transition: background 0.35s, color 0.35s` — **more specific** than before. Previous version used `transition: 0.3s` (transitions ALL properties). This version only transitions background and color — more performant.

---

### Ambient Gradient Blobs

```css
body::before {
    content: '';
    position: fixed; inset: 0;
    background:
        radial-gradient(ellipse 60% 50% at 15% 25%, rgba(124,58,237,0.06) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 85% 75%, rgba(14,165,233,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
}
```
- **⭐ Completely new** — a purely decorative background effect.
- `::before` is a CSS pseudo-element — creates a visual element without any HTML markup.
- `content: ''` — required for pseudo-elements to appear (even if empty).
- `position: fixed; inset: 0` — `inset: 0` is shorthand for `top:0; right:0; bottom:0; left:0` — stretches the element to cover the entire viewport. `fixed` keeps it in place even when scrolling.
- `background: radial-gradient(...)` — creates two large soft elliptical color blobs:
  - First blob: 6% opacity purple, positioned top-left (`15% 25%`).
  - Second blob: 5% opacity blue, positioned bottom-right (`85% 75%`).
  - Both fade to transparent — no hard edges.
- `pointer-events: none` — makes this element completely **non-interactive** — clicks pass through it to elements below.
- `z-index: 0` — sits below all content (which has `z-index: 1`).
- Result: a very subtle, ambient purple-blue glow in the background.

---

### `.app-header` — The Header Bar

```css
.app-header {
    position: relative; z-index: 10;
```
- `z-index: 10` ensures the header stays **above** all other content, including the background blob (`z-index: 0`) and the app body (`z-index: 1`).

```css
    background: var(--header-grad);
    background-size: 320% 320%;
    animation: gradientShift 14s ease infinite;
```
- Same animated gradient as before — 4-color shifting animation.

```css
    height: 64px;
    padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
```
- **Fixed height** of 64px — more controlled than the previous version's `padding: 30px 10px`.
- `display: flex` — makes the header a flex container.
- `align-items: center` — vertically centers logo and buttons.
- `justify-content: space-between` — pushes logo to the far left, buttons to the far right.
- `padding: 0 32px` — 32px horizontal padding only (no vertical padding needed since height is fixed).

```css
    box-shadow: 0 2px 24px rgba(109,40,217,0.22);
}
```
- A specific shadow for the header — not using `--shadow` token because the header needs a more horizontal shadow (only `2px` vertical offset).

---

### `@keyframes gradientShift`

```css
@keyframes gradientShift {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
}
```
- Identical to previous version — animates the gradient by shifting its position.

---

### Header Logo Styles

```css
.header-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700; font-size: 1.15rem;
    color: #fff;
    display: flex; align-items: center; gap: 10px;
    letter-spacing: 0.02em;
}
```
- **⭐ New structured logo** — uses flex to place an emoji icon next to a text stack.
- `letter-spacing: 0.02em` — very slight letter spacing, makes Space Grotesk look more refined.

```css
.header-logo .logo-icon { font-size: 1.35rem; }
```
- Makes the 📚 emoji slightly larger than the text beside it.

```css
.logo-stack { display: flex; flex-direction: column; line-height: 1.15; }
```
- `flex-direction: column` — stacks the "StudySmart" name on top and the subtitle below.
- `line-height: 1.15` — tight line spacing for the stacked text.

```css
.logo-sub {
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    opacity: 0.75;
}
```
- Styles the small "TASK MANAGER" subtitle below the logo name.
- Very small (0.65rem), widely spaced letters, uppercase — typical of "eyebrow text" in design systems.
- 75% opacity — slightly faded to be secondary to the main logo name.

---

### `.pill-btn` — Header Button Style

```css
.pill-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 18px;
    border-radius: 100px;
```
- **⭐ New button style** replacing Bootstrap's `btn btn-outline-light`.
- `border-radius: 100px` — a very large radius that creates a fully **pill-shaped** button regardless of button width.
- `display: inline-flex` — allows flex properties (gap, align-items) for icon+text layout.

```css
    border: 1.5px solid rgba(255,255,255,0.32);
    background: rgba(255,255,255,0.12);
    color: #fff;
```
- Semi-transparent white border and background — creates a frosted glass look on the gradient header.

```css
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 500;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
}
```
- `backdrop-filter: blur(4px)` — slightly blurs what's behind the button — contributes to the glass effect.
- Three specific transition properties instead of a blanket `transition: 0.2s`.

```css
.pill-btn:hover  { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.58); transform: translateY(-1px); }
.pill-btn:active { transform: translateY(0); }
```
- Hover: brighter background and border, lifts 1px.
- Active (clicking): snaps back to position — gives physical "press" feedback.

---

### `.app-body` Layout

```css
.app-body {
    position: relative; z-index: 1;
    display: flex; justify-content: center;
    padding: 40px 24px 64px;
}
```
- `z-index: 1` — sits above the `body::before` blob (`z-index: 0`).
- `display: flex; justify-content: center` — centers all content horizontally.
- `padding: 40px 24px 64px` — 3-value shorthand: 40px top, 24px sides, 64px bottom. Extra bottom padding so content isn't clipped.

---

### Auth Card Styles

```css
.auth-wrap { width: 100%; max-width: 420px; margin: auto; }
```
- Constrains the auth card to 420px maximum width — slightly wider than before (was 33% column).
- `margin: auto` — centers horizontally within the flex parent.

```css
.auth-card {
    background: var(--surface);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    padding: 44px 40px;
    backdrop-filter: blur(14px);
}
```
- Uses `var(--radius)` (16px) — the token-based radius.
- `var(--shadow-lg)` — deepest shadow level, making the auth card feel like a floating modal.
- `backdrop-filter: blur(14px)` — strong frosted glass blur behind the card.
- `padding: 44px 40px` — generous padding, more spacious than before.

```css
.auth-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
}
```
- **⭐ New element** — an "eyebrow" label above the main auth title.
- "Eyebrow text" is a design pattern: small uppercase label above a heading to provide context.
- In the HTML this shows "StudySmart" in small purple caps above "Welcome Back."

```css
.auth-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.75rem; font-weight: 700;
    color: var(--text);
    margin-bottom: 32px;
    line-height: 1.2;
}
```
- Large, bold heading for the auth form (1.75rem ≈ 28px).
- `line-height: 1.2` — tight line spacing appropriate for large headings.

---

### Shared Form Element Styles

```css
.field-group { margin-bottom: 18px; }
```
- **⭐ New wrapper class** — groups a label + input together with consistent spacing below.

```css
.field-label {
    display: block;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 6px;
}
```
- **⭐ New label style** — replaces Bootstrap's `small text-muted` classes.
- `display: block` — puts the label on its own line above the input.
- Uppercase, slightly spaced, small and muted — a very clean form label style.

```css
.form-control, .form-select {
    width: 100%;
    background: var(--input-bg);
    border: 1.5px solid var(--input-border);
    color: var(--text);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.35s;
    -webkit-appearance: none; appearance: none;
}
```
- `outline: none` — removes the browser's default blue outline on focus (replaced with custom focus style below).
- `-webkit-appearance: none; appearance: none` — removes native browser styling on `<select>` and `<input type="date">` in Safari/Chrome — allows custom styling to apply fully.
- No `!important` needed here (unlike before) because there's no Bootstrap to fight.

```css
.form-control:focus, .form-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}
```
- **⭐ Custom focus ring** — when an input is active, a purple border + a soft outer glow ring appears.
- `0 0 0 3px` — a box-shadow with 0 offsets and 0 blur acts as an outer border ring. Much more elegant than the default blue browser outline.

```css
.form-control::placeholder { color: var(--text-muted); opacity: 0.6; }
```
- Placeholder text is muted and 60% opacity — clearly distinguishable from actual input.

```css
select.form-select option {
    background: var(--surface-up);
    color: var(--text);
}
```
- Styles the dropdown options — uses `--surface-up` (pure white in light mode, slightly lighter dark in dark mode) so options are readable in both themes.

---

### `.btn-primary-action` — Main Action Button

```css
.btn-primary-action {
    width: 100%;
    padding: 12px 20px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem; font-weight: 600;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
}
```
- Replaces the previous `.btn-save` class with a more semantically named `.btn-primary-action`.
- `font-family: 'Space Grotesk'` — buttons use the display font, not the body font, for visual distinction.
- `letter-spacing: 0.03em` — subtle letter spacing makes button text look more intentional.

```css
.btn-primary-action:hover  { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(124,58,237,0.3); }
.btn-primary-action:active { transform: translateY(0); }
.btn-primary-action:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
```
- Hover: fades slightly, lifts, adds a purple glow shadow.
- Active: snaps back (physical press feel).
- **Disabled: new state** — 55% opacity, `not-allowed` cursor, no lift. Appears when button is mid-save.

---

### `.app-grid` — CSS Grid Layout

```css
.app-grid {
    width: 100%; max-width: 1140px;
    display: grid;
    grid-template-columns: var(--sidebar-w) 1fr;
    gap: 28px;
    align-items: start;
}
```
- **⭐ Uses CSS Grid** instead of Bootstrap's row/col system.
- `grid-template-columns: var(--sidebar-w) 1fr` — creates two columns: the sidebar is exactly `300px` (`--sidebar-w`), the main content takes `1fr` (all remaining space).
- `gap: 28px` — space between the sidebar and content columns.
- `align-items: start` — columns align to the top, not stretched to equal height. This way the sidebar doesn't unnaturally stretch to match a long task list.
- `max-width: 1140px` — prevents the layout from becoming too wide on large monitors.

---

### `.panel` — The New Card Component

```css
.panel {
    background: var(--surface);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
    padding: 24px;
    margin-bottom: 24px;
    transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
}
.panel:last-child { margin-bottom: 0; }
```
- Replaces Bootstrap's `.card` class entirely.
- `transition` on three specific properties — smooth dark/light mode switch.
- `:last-child { margin-bottom: 0 }` — removes the bottom margin on the last panel in a column so it doesn't add extra space at the bottom.

```css
.panel-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted);
    padding-bottom: 14px;
    margin-bottom: 18px;
    border-bottom: 1px solid var(--card-border);
}
```
- **⭐ New** — section labels within panels (e.g., "⏲ POMODORO TIMER", "✏️ NEW TASK").
- Uppercase, spaced, muted — provides a clear section header without being too dominant.
- A subtle bottom border separates the title from the panel content.

---

### Timer Styles

```css
.timer-display {
    font-family: 'JetBrains Mono', monospace;
    font-size: 3.2rem; font-weight: 700;
    color: var(--accent);
    text-align: center;
    line-height: 1;
    margin: 10px 0 20px;
    letter-spacing: -0.01em;
}
```
- **⭐ Uses JetBrains Mono** — the monospace font makes the timer look like a code display/digital clock.
- `3.2rem` — slightly larger than before (was 2.5rem).
- `letter-spacing: -0.01em` — very slight negative spacing tightens the monospace digits together.

```css
[data-theme="dark"] .timer-display {
    text-shadow: 0 0 24px rgba(167,139,250,0.45);
}
```
- **⭐ Dark mode exclusive** — in dark mode, the timer glows with a soft purple text shadow.
- `0 0 24px` — no offset, just a wide blur = pure glow effect.
- Creates a neon/digital display feel in dark mode.

```css
.timer-btn {
    display: block; width: 100%;
    padding: 10px;
    background: transparent;
    border: 1.5px solid var(--accent);
    color: var(--accent);
    border-radius: 100px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.88rem; font-weight: 600;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.15s;
}
.timer-btn:hover { background: var(--accent); color: #fff; transform: translateY(-1px); }
```
- **⭐ New outline pill button** — transparent with purple border, full text color purple.
- On hover: **fills solid purple** and text turns white — a clean invert effect.
- Different from the gradient "Save Task" button — visually distinguishes secondary actions.

---

### Task Section Styles

```css
.tasks-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
}
```
- Flex row with heading on the left, badge on the right.

```css
.tasks-heading {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.25rem; font-weight: 700;
    color: var(--text);
}
```
- Bold heading for the task list section.

```css
.task-count-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; font-weight: 500;
    color: var(--accent);
    background: rgba(124,58,237,0.09);
    border: 1px solid rgba(124,58,237,0.18);
    padding: 4px 14px; border-radius: 100px;
}
```
- **⭐ Custom badge** replacing Bootstrap's `badge bg-primary`.
- Uses JetBrains Mono — the monospace font makes the number look like a data readout.
- Purple tinted background with purple border — a "ghost" badge style.

```css
[data-theme="dark"] .task-count-badge {
    background: rgba(167,139,250,0.12);
    border-color: rgba(167,139,250,0.25);
}
```
- Dark mode override — uses the lighter purple accent color for better visibility.

---

### Table Styles

```css
.table-wrapper { overflow-x: auto; }
```
- Allows horizontal scrolling on small screens — same purpose as Bootstrap's `table-responsive`.

```css
table { width: 100%; border-collapse: collapse; }
```
- `border-collapse: collapse` — removes the double border between adjacent cells.

```css
thead th {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.67rem; font-weight: 700;
    letter-spacing: 0.11em; text-transform: uppercase;
    color: var(--accent);
    padding: 0 14px 14px;
    text-align: left;
    border-bottom: 1px solid var(--card-border);
    white-space: nowrap;
}
thead th:first-child { padding-left: 22px; }
```
- `white-space: nowrap` — prevents header text from wrapping to a second line.
- `th:first-child` — gives extra left padding to the first column for visual indentation.

```css
tbody tr {
    border-bottom: 1px solid var(--card-border);
    transition: background 0.15s;
}
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: rgba(124,58,237,0.04); }
[data-theme="dark"] tbody tr:hover { background: rgba(167,139,250,0.06); }
```
- Row separators via `border-bottom` on each row.
- `:last-child` removes the final row's bottom border — cleaner edge.
- Hover: very subtle purple tint — gives row highlight feedback.
- Different hover tint in dark mode (slightly stronger opacity since dark backgrounds need more contrast).

```css
tbody td {
    padding: 14px 14px;
    font-size: 0.88rem;
    vertical-align: middle;
    color: var(--text);
}
tbody td:first-child { padding-left: 22px; }
```
- `vertical-align: middle` — centers cell content vertically (thumbnail images and text align).

```css
.task-name-cell {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600; font-size: 0.9rem;
}
.subject-cell { color: var(--text-muted); font-size: 0.83rem; }
.deadline-cell {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem; color: var(--text-muted);
    white-space: nowrap;
}
```
- **⭐ Three specialized cell classes** — each column has its own typography treatment:
  - Task name: Space Grotesk, semibold — most important, stands out.
  - Subject: muted, smaller — secondary info.
  - Deadline: JetBrains Mono — dates look like data in a monospace font. `white-space: nowrap` prevents date from wrapping.

---

### Priority Badges

```css
.priority-badge {
    display: inline-block;
    padding: 3px 10px; border-radius: 100px;
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
}
.badge-high   { background: rgba(239,68,68,0.1);  color: #ef4444; border: 1px solid rgba(239,68,68,0.22); }
.badge-medium { background: rgba(245,158,11,0.1); color: #d97706; border: 1px solid rgba(245,158,11,0.22); }
.badge-low    { background: rgba(34,197,94,0.1);  color: #16a34a; border: 1px solid rgba(34,197,94,0.22); }
```
- **⭐ Major redesign** from solid color badges to **"ghost" badges** — transparent tinted background + colored border + colored text.
- Much more refined than before (where badges were solid red/yellow/green with white text).
- Each badge has three matching colors: a 10% opacity background fill, a solid text color, and a 22% opacity border.

```css
[data-theme="dark"] .badge-high   { color: #f87171; background: rgba(239,68,68,0.14); }
[data-theme="dark"] .badge-medium { color: #fbbf24; background: rgba(245,158,11,0.14); }
[data-theme="dark"] .badge-low    { color: #4ade80; background: rgba(34,197,94,0.14); }
```
- Dark mode uses **lighter shades** of each color (light red/amber/green instead of dark) so they're readable on dark backgrounds.
- Slightly stronger background opacity (14% vs 10%).

---

### Remaining Element Styles

```css
.task-img {
    width: 40px; height: 40px;
    object-fit: cover; border-radius: 8px;
    border: 1px solid var(--input-border);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: block;
}
.task-img:hover { transform: scale(1.08); box-shadow: var(--shadow-sm); }
```
- **⭐ New hover effect on images** — scales up 8% and adds a shadow on hover.
- `display: block` removes the small gap that appears below inline images.

```css
.btn-delete {
    background: transparent; border: none; cursor: pointer;
    color: var(--text-muted);
    padding: 7px 9px; border-radius: 8px;
    font-size: 1rem;
    transition: color 0.18s, background 0.18s;
}
.btn-delete:hover { color: #ef4444; background: rgba(239,68,68,0.09); }
```
- **⭐ New delete button style** replacing `btn btn-sm text-danger`.
- Default: gray/muted color — not alarming until hovered.
- Hover: turns red with a light red background tint — clear destructive action signal.

```css
.empty-state {
    text-align: center; padding: 56px 24px;
    color: var(--text-muted);
}
.empty-state .empty-icon { font-size: 2.2rem; opacity: 0.45; margin-bottom: 12px; }
.empty-state p { font-size: 0.88rem; }
```
- **⭐ New empty state component** — a proper styled empty state instead of just a table row with text.
- Large faded icon above a small message — a common UX pattern for empty states.

```css
.d-none { display: none !important; }
```
- Single utility class replacing Bootstrap's equivalent.
- `!important` ensures it always wins over other display rules.

```css
@media (max-width: 800px) {
    .app-grid { grid-template-columns: 1fr; }
    .app-header { padding: 0 16px; }
    .app-body { padding: 24px 14px 52px; }
    .auth-card { padding: 32px 22px; }
}
```
- **⭐ Custom responsive breakpoint** at 800px instead of relying on Bootstrap breakpoints.
- `grid-template-columns: 1fr` — collapses the two-column grid to a single column on mobile.
- Reduced padding throughout for smaller screens.
- Auth card padding reduced for mobile.

---

## 🖥️ SECTION 3 — HEADER HTML (Lines 202–215)

```html
<header class="app-header" id="mainHeader">
```
- Uses semantic `<header>` tag instead of a `<div>` — better for accessibility and SEO.
- `<header>` communicates to screen readers and search engines that this is the page header.

```html
    <div class="header-logo">
        <span class="logo-icon">📚</span>
        <div class="logo-stack">
            <span>StudySmart</span>
            <span class="logo-sub">Task Manager</span>
        </div>
    </div>
```
- **⭐ Restructured logo** — now a proper component with an icon and a text stack.
- `logo-icon` — the 📚 emoji.
- `logo-stack` — flex column with the app name on top and "Task Manager" subtitle below.
- The subtitle uses `.logo-sub` for small uppercase styling.
- Previous version just had `<h1>📚 STUDY SMART</h1>` — this version is more refined and structured.

```html
    <div class="header-controls">
        <button class="pill-btn" id="themeBtn" onclick="toggleDarkMode()">🌙 Dark Mode</button>
        <button class="pill-btn" id="logoutBtn" onclick="signOut()" style="display:none;">Sign Out</button>
    </div>
```
- `header-controls` — flex container for the header buttons.
- **Changes**: button label is now "Dark Mode" instead of just "Theme". Sign Out instead of "🚪 Logout".
- Both use the new `.pill-btn` style instead of Bootstrap `btn-outline-light`.
- `id="themeBtn"` — added ID (not used by current JS but available for future use).
- `style="display:none;"` — logout hidden until login, same as before.

---

## 📦 SECTION 4 — APP BODY (Line 218)

```html
<div class="app-body">
```
- Replaces Bootstrap's `<div class="container pb-5">`.
- Uses the custom `.app-body` class — a flex container that centers everything.
- No Bootstrap dependency — the layout is fully custom CSS.

---

## 🔐 SECTION 5 — AUTH SECTION (Lines 221–243)

```html
    <div class="auth-wrap" id="auth-section">
```
- `auth-wrap` constrains width to 420px and centers it — replaces Bootstrap's `row justify-content-center` + `col-md-4`.

```html
        <div class="auth-card">
            <div class="auth-eyebrow">StudySmart</div>
            <h2 class="auth-title" id="authTitle">Welcome Back</h2>
```
- **⭐ New structure** — eyebrow text ("StudySmart") above the main heading.
- Uses `<h2>` instead of `<h4>` — higher semantic level for the main auth heading.
- `auth-title` class applies the large 1.75rem Space Grotesk heading style.

```html
            <div class="field-group">
                <label class="field-label" for="email">Email Address</label>
                <input type="email" id="email" class="form-control" placeholder="you@university.edu">
            </div>
```
- **⭐ `<label>` now uses `for="email"`** — the `for` attribute links the label to the input by its ID.
- When users click the label text, the associated input gets focus — improves usability and accessibility.
- Placeholder changed to `"you@university.edu"` — a more contextual hint than just "Email Address."
- Wrapped in `.field-group` for consistent spacing.

```html
            <div class="field-group" style="margin-bottom:28px;">
                <label class="field-label" for="password">Password</label>
                <input type="password" id="password" class="form-control" placeholder="••••••••">
            </div>
```
- `style="margin-bottom:28px;"` — inline override giving extra space before the button.
- Placeholder `"••••••••"` — visual hint showing the password will be masked.

```html
            <button class="btn-primary-action" id="authBtn" onclick="signIn()">Log In</button>
```
- Uses new `.btn-primary-action` class instead of Bootstrap's `btn btn-primary w-100 fw-bold`.

```html
            <p class="auth-footer">
                <span id="authMsg">New to StudySmart?</span>&nbsp;
                <a href="#" onclick="toggleAuthMode()" id="toggleLink">Create Account</a>
            </p>
```
- `&nbsp;` is a **non-breaking space** HTML entity — prevents the text and link from being on separate lines with an awkward break.
- `auth-footer` class handles centering and sizing — replaces Bootstrap's `text-center mt-3 small`.

---

## 🖥️ SECTION 6 — MAIN APP GRID (Lines 246–303)

```html
    <div id="main-app" class="app-grid d-none">
```
- Uses `.app-grid` (CSS Grid) instead of Bootstrap's `row`.
- `.d-none` — custom utility class (replaces Bootstrap's `d-none`) to hide until login.

---

### Left Sidebar

```html
        <div>
```
- A plain `<div>` — no Bootstrap column class needed since CSS Grid handles the layout automatically.

```html
            <!-- Pomodoro Timer -->
            <div class="panel">
                <div class="panel-title">⏲ Pomodoro Timer</div>
                <div class="timer-display" id="timerDisplay">25:00</div>
                <button class="timer-btn" id="timerBtn" onclick="toggleTimer()">Start</button>
            </div>
```
- Uses `.panel` instead of Bootstrap `.card`.
- `.panel-title` — the section label "⏲ POMODORO TIMER."
- `timer-display` class — applies JetBrains Mono, large purple numbers, optional glow in dark mode.
- `timer-btn` class — the new outline pill button style.

```html
            <!-- New Task Form -->
            <div class="panel">
                <div class="panel-title">✏️ New Task</div>

                <div class="field-group">
                    <label class="field-label" for="task_name">Task Name</label>
                    <input type="text" id="task_name" class="form-control" placeholder="e.g., Research Paper" />
                </div>
```
- Every form field is now wrapped in `.field-group` with a `.field-label` using the `for` attribute.
- Placeholders are more descriptive (e.g., `"e.g., Research Paper"`).

```html
                <div class="field-group">
                    <label class="field-label" for="subject">Subject</label>
                    <input type="text" id="subject" class="form-control" placeholder="e.g., DBMS, HCI" />
                </div>

                <div class="field-group">
                    <label class="field-label" for="deadline">Due Date</label>
                    <input type="date" id="deadline" class="form-control">
                </div>

                <div class="field-group">
                    <label class="field-label" for="task_image">Attachment (PDF / Image)</label>
                    <input type="file" id="task_image" class="form-control" />
                </div>
```
- All fields follow the same `field-group` → `field-label` → `form-control` pattern.
- Label text improved: "Attachment (PDF / Image)" clarifies what file types are expected.

```html
                <div class="field-group" style="margin-bottom:26px;">
                    <label class="field-label" for="priority">Priority Level</label>
                    <select id="priority" class="form-select">
                        <option value="High">🔴 High Priority</option>
                        <option value="Medium" selected>🟡 Medium Priority</option>
                        <option value="Low">🟢 Low Priority</option>
                    </select>
                </div>

                <button class="btn-primary-action" id="saveBtn" onclick="saveTask()">Save Task</button>
            </div>
        </div>
```
- `<select>` now has `for` attribute on its label.
- Save button uses `.btn-primary-action` — shares style with the login button (consistent design language).

---

### Main Content Column

```html
        <div>
            <div class="tasks-header">
                <h2 class="tasks-heading">Pending Tasks</h2>
                <span class="task-count-badge" id="taskCounter">0 Tasks</span>
            </div>
```
- `tasks-header` — flex row with heading and badge.
- `tasks-heading` — Space Grotesk bold heading.
- `task-count-badge` — custom monospace ghost badge replacing Bootstrap's `badge bg-primary`.

```html
            <div class="panel" style="padding:0; overflow:hidden;">
```
- **Panel with no padding** and `overflow:hidden` — the table needs to touch the panel edges directly (so rounded corners clip the table properly). Adding padding would leave space between the panel border and table.

```html
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>File</th>
                                <th>Task</th>
                                <th>Subject</th>
                                <th>Deadline</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="taskTableBody"></tbody>
                    </table>
                </div>
```
- `table-wrapper` handles horizontal scroll on mobile.
- Plain `<table>` — no Bootstrap `table` class needed since styles are fully custom.
- Column headers simplified: "Pic/File" → "File."
- `<tbody id="taskTableBody">` — empty by default, filled by JavaScript.

```html
    </div><!-- /main-app -->
</div><!-- /app-body -->
```
- HTML comments label the closing tags — makes nested structure easier to read.

---

## 📜 SECTION 7 — SCRIPT TAG

```html
<script src="script.js"></script>
</body>
</html>
```
- Loads JavaScript at the bottom of `<body>` — same position as before.
- All HTML is parsed before the script runs, so `document.getElementById()` calls in `script.js` will always find their elements.

---

## 🔁 Summary of What Changed vs. Previous HTML Version

| Feature | Previous Version | This Version |
|---|---|---|
| CSS Framework | Bootstrap 5 | Fully **custom CSS** |
| Fonts | Plus Jakarta Sans (1 font) | Space Grotesk + DM Sans + JetBrains Mono (3 fonts) |
| Layout System | Bootstrap Grid (row/col) | **CSS Grid** |
| Shadow System | Single `--shadow` | Three levels: `--shadow-sm`, `--shadow`, `--shadow-lg` |
| Background | Flat color | **Ambient gradient blobs** via `body::before` |
| Header | `<div>` with big padding | Semantic `<header>`, fixed 64px height, flex layout |
| Logo | `<h1>📚 STUDY SMART</h1>` | Structured logo with icon, name, and subtitle |
| Buttons | Bootstrap `btn btn-outline-light` | Custom `.pill-btn` |
| Auth Card | Bootstrap card | Custom `.auth-card` with eyebrow text |
| Form Labels | Bootstrap `small text-muted` spans | Semantic `<label>` with `for` + `.field-label` |
| Priority Badges | Solid colored backgrounds | Ghost badges (transparent + border + colored text) |
| Empty State | Inline table row | Dedicated `.empty-state` component |
| Responsive | Bootstrap breakpoints | Custom `@media (max-width: 800px)` |
| Timer Display | Plain styled div | JetBrains Mono + dark mode glow effect |
| Delete Button | Bootstrap `btn btn-sm text-danger` | Custom `.btn-delete` with hover reveal |
