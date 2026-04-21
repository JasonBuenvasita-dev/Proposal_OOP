# 📖 Complete Line-by-Line Breakdown of the Updated `script.js`

---

## 🔧 SECTION 1 — INITIALIZATION (Lines 1–4)

```javascript
const SUPABASE_URL = 'https://lafiafbqccrojlkjgcvk.supabase.co';
```
- `const` means this value **can never be reassigned** after this line.
- Written in ALL_CAPS by convention to signal it's a fixed constant.
- This is your **unique Supabase project address** — like a home address for your entire backend (database, auth, storage).

```javascript
const SUPABASE_KEY = 'sb_publishable_TLRwCGXv6swosm6ntUguow_aRSkS0We';
```
- Your **publishable API key** — a credential that proves requests are coming from your app.
- "Publishable" means it's safe in front-end code — it only grants limited, controlled access, not full admin control.

```javascript
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```
- `supabase` is the global object made available by the Supabase library loaded in the HTML `<script>` tag.
- `.createClient()` takes the URL and KEY, establishes the connection, and returns a **client object**.
- Stored in `db` — every database query, auth call, and storage operation in this file uses `db.something()`.
- This is the **single most important line** — without it, the entire app has no backend connection.

---

## 🏗️ SECTION 2 — OOP: POMODORO TIMER CLASS (Lines 6–55)

This is the biggest change from the previous version. Instead of scattered global variables and standalone functions, the timer is now built as a **Class** — a blueprint for creating objects.

### `class StudyTimer` — The Class Definition

```javascript
class StudyTimer {
```
- `class` is an ES6 JavaScript keyword that defines a **blueprint** for creating objects.
- `StudyTimer` is the class name — by convention, class names use **PascalCase** (each word capitalized).
- Everything between `{` and `}` defines what every `StudyTimer` object will look like and be able to do.
- This demonstrates **Encapsulation** — the timer's data (`timeLeft`, `isRunning`) and its behavior (`tick()`, `toggle()`) are bundled together inside one class instead of being spread across the file.

---

### `constructor()` — Runs When the Object is Created

```javascript
    constructor(displayId, buttonId) {
```
- The `constructor` is a **special method** that automatically runs when you create a new instance with `new StudyTimer(...)`.
- Takes two parameters: `displayId` and `buttonId` — the HTML element IDs it needs to control.
- This makes the timer **reusable** — you could create multiple timers for different elements just by passing different IDs.

```javascript
        this.display = document.getElementById(displayId);
```
- `this` refers to **the specific object being created** — it's how a class stores data on itself.
- `document.getElementById(displayId)` finds the HTML element with that ID.
- `this.display` stores a reference to the timer number display element — so the timer can update it later without searching the DOM every second.

```javascript
        this.button = document.getElementById(buttonId);
```
- Same pattern — stores a reference to the Start/Pause button directly on the object.

```javascript
        this.timeLeft = 1500;
```
- Initializes `timeLeft` at 1500 seconds = **25 minutes**.
- Stored on `this` so it persists as long as the object exists and is accessible by all methods inside the class.

```javascript
        this.timerInterval = null;
```
- Will later hold the **interval ID** returned by `setInterval()`.
- Starts as `null` (no timer running yet).
- Stored on `this` so both `toggle()` and `tick()` can access and cancel it.

```javascript
        this.isRunning = false;
    }
```
- Boolean flag tracking whether the timer is currently counting down.
- Starts as `false` — timer is stopped initially.
- Closing `}` ends the constructor.

---

### `updateUI()` — Refreshes the Timer Display

```javascript
    updateUI() {
```
- A **method** (a function belonging to the class).
- No parameters needed — it uses `this.timeLeft` and `this.display` that are already stored on the object.

```javascript
        const mins = Math.floor(this.timeLeft / 60);
```
- `Math.floor()` rounds **down** to the nearest whole integer.
- `this.timeLeft / 60` converts seconds to minutes (e.g., 90 seconds → 1.5 minutes).
- `Math.floor(1.5)` → `1` minute. The `.5` (30 seconds) is handled separately by the `secs` line.

```javascript
        const secs = this.timeLeft % 60;
```
- `%` is the **modulo operator** — returns the remainder after division.
- Example: `90 % 60 = 30` → 30 remaining seconds.
- Together with `mins`, this breaks the raw second count into a proper minutes:seconds pair.

```javascript
        this.display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
```
- Updates the visible timer text on screen.
- Template literal `` ` `` embeds variables directly into the string.
- `secs < 10 ? '0' : ''` is a **ternary operator** — if seconds is single-digit (e.g., 7), prepends `'0'` to show `"07"` instead of `"7"`. Gives proper `"4:07"` format instead of `"4:7"`.

---

### `toggle()` — Starts or Pauses the Timer

```javascript
    toggle() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.button.innerText = "Start";
```
- If the timer is currently running:
  - `clearInterval(this.timerInterval)` cancels the interval — stops `tick()` from being called every second. Uses `this.timerInterval` (the stored interval ID) to identify which interval to stop.
  - Changes button text back to "Start".

```javascript
        } else {
            this.timerInterval = setInterval(() => this.tick(), 1000);
            this.button.innerText = "Pause";
        }
```
- If the timer is NOT running:
  - `setInterval(() => this.tick(), 1000)` schedules `tick()` to run every 1000ms (1 second).
  - **Why the arrow function `() => this.tick()`?** — Critical detail. If you wrote `setInterval(this.tick, 1000)`, `this` inside `tick()` would be `undefined` or `window` when called by `setInterval`. The arrow function **preserves** the `this` context from the enclosing scope, so `this` still correctly refers to the `StudyTimer` object.
  - The interval ID is stored in `this.timerInterval` for later cancellation.
  - Button changes to "Pause".

```javascript
        this.isRunning = !this.isRunning;
    }
```
- `!this.isRunning` flips the boolean: `true` → `false`, `false` → `true`.
- Always correctly reflects the new state after toggling.

---

### `tick()` — Called Every Second

```javascript
    tick() {
        if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval);
```
- Checks if time has run out.
- Stops the interval immediately so `tick()` stops being called.

```javascript
            alert("Focus session complete! Time for a break.");
```
- Browser alert — **blocking**, meaning all JavaScript pauses until the user clicks OK.

```javascript
            this.timeLeft = 1500;
            this.isRunning = false;
            this.button.innerText = "Start";
```
- Resets the timer back to 25 minutes.
- Resets the state flag.
- Resets the button label — so the user can start a new session.

```javascript
        } else {
            this.timeLeft--;
        }
```
- `this.timeLeft--` is shorthand for `this.timeLeft = this.timeLeft - 1`.
- Decrements the counter by 1 each second.

```javascript
        this.updateUI();
    }
}
```
- Calls `updateUI()` on every tick — whether time ran out or just decremented.
- This ensures the display always shows the current value.
- Closing `}` ends `tick()`, second `}` ends the class definition.

---

### Instantiation and Helper Function

```javascript
const pomodoro = new StudyTimer('timerDisplay', 'timerBtn');
```
- `new StudyTimer(...)` **creates an instance** of the class — like building an actual house from the blueprint.
- Calls the `constructor` with `'timerDisplay'` and `'timerBtn'` as arguments.
- The resulting object is stored in `pomodoro` — a constant holding the single timer instance.
- After this line, `pomodoro.timeLeft`, `pomodoro.toggle()`, etc. are all accessible.

```javascript
function toggleTimer() {
    pomodoro.toggle();
}
```
- A plain function that acts as a **bridge** between the HTML `onclick="toggleTimer()"` and the class method.
- HTML buttons can't directly call `pomodoro.toggle()` in their `onclick` attribute (it would work, but this is cleaner).
- This wrapper keeps the HTML simple and decoupled from the class structure.

---

## 🔐 SECTION 3 — AUTHENTICATION LOGIC (Lines 57–87)

These functions are **identical** to the previous version. Brief recap:

### `toggleAuthMode()`
```javascript
function toggleAuthMode() {
    const title = document.getElementById('authTitle');
    const btn = document.getElementById('authBtn');
    const link = document.getElementById('toggleLink');
    if (btn.innerText === "Log In") {
        title.innerText = "Join StudySmart";
        btn.innerText = "Register Now";
        btn.setAttribute("onclick", "signUp()");
        link.innerText = "Log In";
    } else {
        title.innerText = "Welcome Back";
        btn.innerText = "Log In";
        btn.setAttribute("onclick", "signIn()");
        link.innerText = "Create Account";
    }
}
```
- Reads the current button label to determine which mode the form is in.
- Swaps all text and the button's `onclick` handler between login and register mode.
- Full explanation already covered — no changes from the previous version.

### `signUp()`
```javascript
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await db.auth.signUp({ email, password });
    if (error) alert("Error: " + error.message);
    else alert("Success! Check your email for a confirmation link.");
}
```
- Reads email/password from inputs, calls Supabase `signUp()`, shows result.
- Unchanged from previous version.

### `signIn()`
```javascript
async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await db.auth.signInWithPassword({ email, password });
    if (error) alert("Login failed: " + error.message);
    else checkUserSession();
}
```
- Sends credentials to Supabase, calls `checkUserSession()` on success.
- Unchanged from previous version.

### `signOut()`
```javascript
async function signOut() {
    await db.auth.signOut();
    location.reload();
}
```
- Clears the Supabase session, reloads the page.
- Unchanged from previous version.

---

## 🔍 SECTION 4 — SESSION & DEADLINE LOGIC (Lines 89–115)

### `checkUserSession()` — Determines What to Show

```javascript
async function checkUserSession() {
    const { data: { user } } = await db.auth.getUser();
    const loginBox = document.getElementById('auth-section');
    const appBox = document.getElementById('main-app');
    const logoutBtn = document.getElementById('logoutBtn');

    if (user) {
        if(loginBox) loginBox.classList.add('d-none');
        if(appBox) appBox.classList.remove('d-none');
        if(logoutBtn) logoutBtn.style.display = 'block';
        fetchTasks();
    }
}
```
- Identical to previous version — checks Supabase for an active session, hides login form, shows app, loads tasks.
- Full explanation already covered.

---

### `checkDeadlines(tasks)` — ⭐ NEW FUNCTION

```javascript
function checkDeadlines(tasks) {
```
- A **new function** not present in the previous version.
- Takes the `tasks` array as a parameter (passed in from `fetchTasks()`).
- Purpose: automatically alert the user if any task is due tomorrow.

```javascript
    const tomorrow = new Date();
```
- `new Date()` creates a JavaScript **Date object** representing the current date and time right now.
- Stored in `tomorrow` — we'll modify this to point to tomorrow's date.

```javascript
    tomorrow.setDate(tomorrow.getDate() + 1);
```
- `tomorrow.getDate()` returns today's day of the month as a number (e.g., `21` for the 21st).
- `+ 1` adds one day.
- `tomorrow.setDate(...)` sets the date back on the object.
- JavaScript handles **month/year rollovers automatically** — if today is the 31st, adding 1 correctly rolls over to the 1st of next month.

```javascript
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
```
- `tomorrow.toISOString()` converts the Date object to a string in ISO 8601 format: `"2026-04-22T00:00:00.000Z"`.
- `.split('T')` splits at the `T` character into an array: `["2026-04-22", "00:00:00.000Z"]`.
- `[0]` takes the first element: `"2026-04-22"`.
- Result: a clean `YYYY-MM-DD` date string — the same format stored in the database for deadlines.

```javascript
    tasks.forEach(t => {
```
- `.forEach()` loops over every task in the array.
- `t` represents each individual task object in the loop.
- Unlike `.map()`, `forEach` doesn't return anything — it's purely for side effects (showing alerts here).

```javascript
        if (t.deadline === tomorrowStr) {
            alert(`⚠️ URGENT: The task "${t.task_name}" is due tomorrow!`);
        }
    });
}
```
- `===` is **strict equality** — checks both value and type.
- If the task's deadline string exactly matches tomorrow's date string, fires an alert.
- `${t.task_name}` inserts the actual task name into the message.
- The quotes around `${t.task_name}` are inside the template literal — they appear literally in the alert as visual quotes around the task name.
- If multiple tasks are due tomorrow, multiple alerts fire one after another.

---

## 📁 SECTION 5 — FILE & DATA OPERATIONS (Lines 117–183)

### `uploadFile(file)` — Uploads a File to Supabase Storage

```javascript
async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    let { error: uploadError } = await db.storage.from('task-images').upload(fileName, file);
    if (uploadError) throw uploadError;
    const { data } = db.storage.from('task-images').getPublicUrl(fileName);
    return data.publicUrl;
}
```
- Identical logic to previous version — gets file extension, creates unique timestamped filename, uploads to Supabase Storage bucket, returns public URL.
- One minor style difference: the upload is now written on **one line** instead of three — functionally identical.
- Full explanation already covered.

---

### `saveTask()` — Saves a New Task to the Database

```javascript
async function saveTask() {
    const { data: { user } } = await db.auth.getUser();
    if (!user) return alert("Please log in first!");

    const name = document.getElementById('task_name').value;
    const subject = document.getElementById('subject').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    const fileInput = document.getElementById('task_image').files[0];

    if (!name || !deadline) return alert("Name and Deadline are required!");

    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Saving...";
    saveBtn.disabled = true;
```
- All identical to previous version — verifies user, reads form values, validates required fields, disables button.

```javascript
    try {
        let fileUrl = null;
        if (fileInput) fileUrl = await uploadFile(fileInput);
```
- The `if` block is now written on **one line** instead of three — same logic, more compact. If a file is selected, upload it and get the URL; otherwise `fileUrl` stays `null`.

```javascript
        const { error } = await db.from('tasks').insert([{ 
            task_name: name, 
            subject: subject, 
            deadline: deadline, 
            priority: priority,
            image_url: fileUrl,
            user_id: user.id 
        }]);

        if (error) throw error;
        fetchTasks();
```
- Inserts the task row into Supabase. Throws any error to `catch`. Refreshes the task table.

```javascript
        ['task_name', 'subject', 'deadline', 'task_image'].forEach(id => document.getElementById(id).value = '');
```
- **⭐ New approach** — instead of 4 separate lines clearing each input, this uses a single line with `.forEach()`.
- `['task_name', 'subject', 'deadline', 'task_image']` — an array of the input field IDs to clear.
- `.forEach(id => ...)` loops over each ID in the array.
- `document.getElementById(id).value = ''` finds each input and sets it to empty.
- Functionally identical to the previous version but much more concise — if you need to add/remove fields to clear, you just edit the array.

```javascript
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        saveBtn.innerText = "Save Task";
        saveBtn.disabled = false;
    }
}
```
- `catch` shows any error that was thrown. `finally` always re-enables the button.
- Unchanged from previous version.

---

### `fetchTasks()` — Loads Tasks From the Database

```javascript
async function fetchTasks() {
    const { data: { user } } = await db.auth.getUser();
    const { data, error } = await db.from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('deadline', { ascending: true });
```
- Same as before — gets current user, queries all their tasks ordered by soonest deadline first.

```javascript
    if (!error) {
        renderTable(data);
        checkDeadlines(data);
    }
}
```
- **⭐ New addition** — now calls `checkDeadlines(data)` after rendering the table.
- Both functions receive the same `data` array — no extra database call needed.
- If there's an error, neither function runs (both are inside the `if (!error)` block).

---

### `renderTable(tasks)` — Builds the HTML Table

```javascript
function renderTable(tasks) {
    const tbody = document.getElementById('taskTableBody');
    const counter = document.getElementById('taskCounter');
    if(counter) counter.innerText = tasks.length + ' Tasks';
```
- Gets the table body and counter badge, updates the count. Unchanged.

```javascript
    if (!tasks || tasks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center p-5 opacity-50">📋 No tasks yet. Add your first task!</td></tr>`;
        return;
    }
```
- **Minor update** — empty state message is slightly improved:
  - `p-5` instead of `p-4` (more padding).
  - `opacity-50` Bootstrap class makes the message 50% transparent — a subtle visual treatment for placeholder text.
  - Different message text: "No tasks yet. Add your first task!" is more encouraging.

```javascript
    tbody.innerHTML = tasks.map(t => {
        let fileDisplay = '📄';
```
- **Small change** — the default file icon is now just `'📄'` plain text instead of the previous `'<span style="opacity:0.3;">📄</span>'`.
- Simpler, slightly less styled.

```javascript
        if (t.image_url) {
            const url = t.image_url.toLowerCase();
            if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                fileDisplay = `<img src="${t.image_url}" class="task-img" onclick="window.open('${t.image_url}', '_blank')">`;
```
- Image detection using regex — same as before. Shows a clickable thumbnail.
- **Minor difference**: the `style="cursor:pointer;"` inline style is removed — the cursor styling is expected to come from CSS instead.

```javascript
            } else if (url.endsWith('.pdf')) {
                fileDisplay = `<span style="cursor:pointer;font-size:1.4rem;" onclick="window.open('${t.image_url}', '_blank')">📕</span>`;
```
- PDF icon — same logic. `font-size:1.4rem` instead of `24px` (different unit but visually similar).

```javascript
            } else {
                fileDisplay = `<span style="cursor:pointer;font-size:1.4rem;" onclick="window.open('${t.image_url}', '_blank')">📁</span>`;
            }
        }
```
- **Simplified** — the previous version had separate handling for `.doc` files (📘 blue book). This version uses a single `else` catch-all for everything that isn't an image or PDF, showing 📁 folder icon.
- Word documents now show as a folder instead of a blue book.

```javascript
        return `
            <tr>
                <td>${fileDisplay}</td>
                <td class="fw-bold">${t.task_name}</td>
```
- **Minor change** — `fw-bold` is now on the `<td>` itself as a Bootstrap class instead of wrapping the task name in a `<strong>` tag. Functionally identical — both make the text bold.

```javascript
                <td>${t.subject}</td>
                <td>${t.deadline}</td>
                <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
                <td><button class="btn btn-sm text-danger" onclick="deleteTask(${t.id})">🗑</button></td>
            </tr>
        `;
    }).join('');
}
```
- Subject, deadline, priority badge, and delete button — all unchanged.

---

### `deleteTask(id)` — Removes a Task

```javascript
async function deleteTask(id) {
    if(confirm("Delete this task?")) {
        const { error } = await db.from('tasks').delete().eq('id', id);
        if(!error) fetchTasks();
    }
}
```
- Completely unchanged — confirms, deletes the row by ID, refreshes the table.

---

## 🌙 SECTION 6 — THEME LOGIC (Lines 185–191)

### `toggleDarkMode()` — ⭐ Now Saves Theme Preference

```javascript
function toggleDarkMode() {
    const body = document.body;
```
- Gets the `<body>` element directly.

```javascript
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
```
- **Refactored** from the previous version.
- Reads the current theme and calculates the new one using a ternary.
- Stores it in `newTheme` instead of applying it inline — allows the value to be used in two places.

```javascript
    body.setAttribute('data-theme', newTheme);
```
- Applies the new theme to the `<body>` element — triggers the CSS variable switch instantly.

```javascript
    localStorage.setItem('ss-theme', newTheme);
}
```
- **⭐ New addition** — saves the chosen theme to `localStorage`.
- `localStorage` is a browser API that stores **key-value pairs** that **persist across page reloads and browser restarts**.
- `'ss-theme'` is the key (a custom name; `ss` = StudySmart).
- `newTheme` is the value (`'light'` or `'dark'`).
- This means if you set dark mode, close the browser, and come back tomorrow — it'll still be in dark mode.

---

## 🚀 SECTION 7 — INITIALIZATION ON LOAD (Lines 193–207)

### `window.onload` — ⭐ Significantly Enhanced

```javascript
window.onload = function() {
```
- `window.onload` fires when the page fully loads.
- **Changed from previous version**: instead of `window.onload = checkUserSession` (a single function reference), it's now `window.onload = function() { ... }` — an **anonymous function** that does multiple things.

```javascript
    const savedTheme = localStorage.getItem('ss-theme') || 'light';
```
- `localStorage.getItem('ss-theme')` retrieves the previously saved theme.
- If no theme was ever saved (first visit), `getItem` returns `null`.
- `|| 'light'` — the **OR operator** provides a fallback: if the result is `null` (falsy), use `'light'` as the default.
- So new users always start in light mode, returning users get their saved preference.

```javascript
    document.body.setAttribute('data-theme', savedTheme);
```
- Immediately applies the saved theme on page load.
- This runs **before** the page is visible to the user, so there's no flash of the wrong theme.

```javascript
    checkUserSession();
```
- Same as before — checks if the user is logged in and shows the appropriate UI.

```javascript
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
```
- Gets the date input element.
- `if (deadlineInput)` guard — only proceeds if the element exists in the DOM (safety check).

```javascript
        const todayStr = new Date().toISOString().split('T')[0];
```
- `new Date()` — current date and time.
- `.toISOString()` — converts to `"2026-04-21T12:00:00.000Z"` format.
- `.split('T')[0]` — takes only the date part: `"2026-04-21"`.
- Result: today's date as a `YYYY-MM-DD` string.

```javascript
        deadlineInput.setAttribute('min', todayStr);
    }
};
```
- `setAttribute('min', todayStr)` sets the **minimum selectable date** on the date picker to today.
- **⭐ New feature** — this prevents users from selecting past dates when setting a deadline.
- The browser's native date picker will grey out all past dates and refuse to accept them.
- The closing `}` ends the `if` block, `;` ends the `window.onload` function assignment.

---

## 🔁 Summary of What Changed vs. The Previous Version

| Feature | Previous Version | This Version |
|---|---|---|
| Timer | Global variables + standalone functions | OOP Class (`StudyTimer`) |
| Dark mode | Just toggles theme | Toggles + **saves to localStorage** |
| Theme on load | Always starts light | **Restores saved theme** |
| Deadline input | No restriction | **Blocks past dates** |
| Deadline alerts | No alerts | **⭐ Alerts for tasks due tomorrow** |
| Form clearing | 4 separate lines | Single `.forEach()` loop |
| `window.onload` | Just `checkUserSession` | Theme restore + session check + date minimum |
