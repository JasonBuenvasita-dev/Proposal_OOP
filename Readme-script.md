# 📖 Complete Line-by-Line Breakdown of `script.js`

---

## 🔧 SECTION 1 — INITIALIZATION (Lines 1–4)

```javascript
const SUPABASE_URL = 'https://lafiafbqccrojlkjgcvk.supabase.co';
```
- `const` means this variable **cannot be reassigned** later in the code — it's a fixed value.
- `SUPABASE_URL` is written in ALL_CAPS by convention to signal it's a **constant** that never changes.
- The string value is your **unique Supabase project address** — like a home address for your database. Every project on Supabase gets its own URL.

```javascript
const SUPABASE_KEY = 'sb_publishable_TLRwCGXv6swosm6ntUguow_aRSkS0We';
```
- This is your **publishable API key** — a password that tells Supabase "this request is coming from my app."
- It's called "publishable" because it's safe to include in front-end code — it's **not a secret admin key**. It only gives limited, controlled access.

```javascript
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```
- `supabase` here refers to the **Supabase JavaScript library** that was loaded in the HTML via a `<script>` tag.
- `.createClient()` takes the URL and KEY and creates a **connection object** — think of it as opening a phone line to your database.
- The result is stored in `db`. From this point on, every time you want to talk to the database, storage, or auth system, you use `db.something()`.
- Without this line, **nothing else in the file would work** — it's the foundation of everything.

---

## 🔐 SECTION 2 — AUTHENTICATION LOGIC (Lines 6–41)

### `toggleAuthMode()` — Switches Between Login and Register Form

```javascript
function toggleAuthMode() {
```
- Declares a regular (non-async) function named `toggleAuthMode`.
- It's called when the user clicks the "Create Account" or "Log In" link at the bottom of the auth card.

```javascript
    const title = document.getElementById('authTitle');
```
- `document.getElementById()` searches the entire HTML page for an element with `id="authTitle"`.
- That element is the `<h4>` tag showing "Welcome Back" or "Join StudySmart".
- Stored in `title` so we can change its text.

```javascript
    const btn = document.getElementById('authBtn');
```
- Gets the main action button (the one that says "Log In" or "Register Now").
- We need this to both **read** its current label and **change** it.

```javascript
    const link = document.getElementById('toggleLink');
```
- Gets the toggle anchor link at the bottom ("Create Account" / "Log In").
- We need to change its label too so it always shows the opposite of the current mode.

```javascript
    if (btn.innerText === "Log In") {
```
- `innerText` reads the **visible text** currently inside the button element.
- This is how the function knows which mode it's currently in — it checks the button label as a state indicator.
- If the button says "Log In", the form is currently in login mode, so we need to switch to register mode.

```javascript
        title.innerText = "Join StudySmart";
```
- Changes the heading text from "Welcome Back" to "Join StudySmart" to visually signal registration mode.

```javascript
        btn.innerText = "Register Now";
```
- Changes the button label to tell the user what clicking it will do.

```javascript
        btn.setAttribute("onclick", "signUp()");
```
- `setAttribute()` changes an HTML attribute dynamically.
- This rewires the button's click action from `signIn()` to `signUp()`.
- This is important — without this, clicking "Register Now" would still try to log in instead of register.

```javascript
        link.innerText = "Log In";
```
- Changes the toggle link text. Now that we're in register mode, the link should say "Log In" so users can switch back.

```javascript
    } else {
        title.innerText = "Welcome Back";
        btn.innerText = "Log In";
        btn.setAttribute("onclick", "signIn()");
        link.innerText = "Create Account";
    }
}
```
- The `else` branch handles the reverse — switching **back** from register to login mode.
- Every change is the mirror image of the `if` block: heading resets, button resets, onclick resets, link resets.

---

### `signUp()` — Creates a New Account

```javascript
async function signUp() {
```
- `async` means this function contains `await` calls — it performs **asynchronous operations** (things that take time, like network requests).
- Without `async`, using `await` inside would throw a syntax error.

```javascript
    const email = document.getElementById('email').value;
```
- Gets the `<input id="email">` element and reads its `.value` property — whatever text the user typed.
- `.value` is specific to input elements; it returns the current text content of the field.

```javascript
    const password = document.getElementById('password').value;
```
- Same pattern — reads the password field's current value.
- Even though it's a password input (characters show as dots), `.value` still gives the actual text.

```javascript
    const { error } = await db.auth.signUp({ email, password });
```
- `db.auth.signUp()` calls Supabase's authentication system to **create a new user account**.
- `{ email, password }` is ES6 shorthand for `{ email: email, password: password }`.
- `await` pauses this function until Supabase finishes the network request and responds.
- `{ error }` is **destructuring** — Supabase returns an object like `{ data: {...}, error: null }`, and we pull out only the `error` property. We don't need `data` here.

```javascript
    if (error) alert("Error: " + error.message);
```
- If `error` is not null (meaning something went wrong), shows a browser alert dialog.
- `error.message` is a human-readable description of what failed (e.g., "User already registered", "Password too short").
- The `+` operator joins the string "Error: " with the message.

```javascript
    else alert("Success! Please check your email for a confirmation link.");
}
```
- If no error, the account was created — but Supabase requires **email verification** before the user can log in.
- The alert instructs the user to check their inbox and click the confirmation link.

---

### `signIn()` — Logs In an Existing User

```javascript
async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
```
- Same as `signUp()` — reads email and password from the form inputs.

```javascript
    const { error } = await db.auth.signInWithPassword({ email, password });
```
- `signInWithPassword()` sends the credentials to Supabase, which checks them against stored accounts.
- If correct, Supabase **automatically stores a session token** in the browser (in localStorage or a cookie) — this is what enables auto-login on future visits.
- Again we only destructure `error`; the session is handled internally by the Supabase client library.

```javascript
    if (error) alert("Login failed: " + error.message);
```
- Common errors here include: wrong password, email not confirmed, account doesn't exist.

```javascript
    else checkUserSession();
}
```
- If login succeeded, immediately calls `checkUserSession()` to update the UI.
- Instead of reloading the page, we call this function directly to avoid a flash — it hides the login form and shows the app smoothly.

---

### `signOut()` — Logs Out the Current User

```javascript
async function signOut() {
    await db.auth.signOut();
```
- `db.auth.signOut()` tells Supabase to **invalidate the current session**.
- Supabase deletes the session token from the browser's storage.
- `await` waits for this to complete before moving to the next line.

```javascript
    location.reload();
}
```
- `location` is a built-in browser object representing the current URL.
- `.reload()` refreshes the entire page — like pressing F5.
- Since the session is now gone, when the page reloads and `checkUserSession()` runs again at `window.onload`, `user` will be `null` and the login form will be shown.

---

## 🔍 SECTION 3 — SESSION CHECK (Lines 43–58)

### `checkUserSession()` — Determines What to Show on Page Load

```javascript
async function checkUserSession() {
    const { data: { user } } = await db.auth.getUser();
```
- `db.auth.getUser()` asks the Supabase client: "Is there an active logged-in session right now?"
- Supabase checks its stored session token in the browser and returns user data if valid, or `null` if not.
- `{ data: { user } }` is **nested destructuring** — the response shape is `{ data: { user: {...} }, error: null }`, and this one-liner drills two levels deep to extract just the `user` object directly.

```javascript
    const loginBox = document.getElementById('auth-section');
```
- Gets the div that wraps the entire login/register form.
- In the HTML it has the class `d-none` removed/added to show or hide it.

```javascript
    const appBox = document.getElementById('main-app');
```
- Gets the div that contains the full app — the timer, task form, and task table.
- In the HTML it starts with class `d-none` (hidden by default) until a user logs in.

```javascript
    const logoutBtn = document.getElementById('logoutBtn');
```
- Gets the logout button in the header.
- It starts with `style="display:none;"` in the HTML so it's invisible until login.

```javascript
    if (user) {
```
- `user` will be a JavaScript object (truthy) if logged in, or `null` (falsy) if not.
- Only the `if` branch exists — if no user, nothing happens and both sections stay as they are (login visible, app hidden).

```javascript
        if(loginBox) loginBox.classList.add('d-none');
```
- `if(loginBox)` is a safety guard — checks the element actually exists before trying to modify it (avoids "Cannot read properties of null" errors).
- `.classList.add('d-none')` adds Bootstrap's `d-none` class which applies `display: none !important` via CSS, hiding the login form.

```javascript
        if(appBox) appBox.classList.remove('d-none');
```
- `.classList.remove('d-none')` removes the hidden class, making the main app visible.
- Bootstrap's `d-none` was on this element in the HTML by default.

```javascript
        if(logoutBtn) logoutBtn.style.display = 'block';
```
- Directly sets the inline CSS `display` property to `'block'`, making the logout button visible.
- Uses inline style here (rather than classList) because the original HTML hid it with an inline style.

```javascript
        fetchTasks();
    }
}
```
- Immediately loads the user's tasks from the database once we know they're logged in.
- This is what populates the table when you first open the app while already logged in.

---

## 📁 SECTION 4 — FILE UPLOAD (Lines 60–73)

### `uploadFile(file)` — Sends a File to Supabase Storage

```javascript
async function uploadFile(file) {
```
- Takes one parameter: `file` — a JavaScript `File` object (from `<input type="file">`).
- This function is a **helper** — it's only called from inside `saveTask()`, never directly by the user.

```javascript
    const fileExt = file.name.split('.').pop();
```
- `file.name` is the original filename, e.g., `"homework_notes.pdf"`.
- `.split('.')` breaks it into an array: `["homework_notes", "pdf"]`.
- `.pop()` removes and returns the **last element** of that array: `"pdf"`.
- Result: `fileExt = "pdf"`. This is needed to preserve the correct file extension when saving.

```javascript
    const fileName = `${Date.now()}.${fileExt}`;
```
- `Date.now()` returns the current time as a **Unix timestamp in milliseconds** — e.g., `1720512345678`.
- This creates a filename like `"1720512345678.pdf"`.
- Why? Because if two users both upload a file called `"notes.pdf"`, they'd overwrite each other. Using timestamps makes every filename **unique**.
- The backticks (`` ` ``) and `${}` syntax is a **template literal** — it embeds variables directly into strings.

```javascript
    let { error: uploadError } = await db.storage
        .from('task-images')
        .upload(fileName, file);
```
- `db.storage` accesses Supabase's file storage system (separate from the database).
- `.from('task-images')` selects the storage **bucket** named "task-images" — think of it like a folder.
- `.upload(fileName, file)` sends the actual file data to that bucket with the generated filename.
- `{ error: uploadError }` — we rename `error` to `uploadError` using destructuring aliasing. This is done to avoid a naming conflict with the `error` variable used later in `saveTask()`.
- `let` is used instead of `const` here because... actually it doesn't need to be — `const` would work fine here too. It's just a stylistic choice.

```javascript
    if (uploadError) throw uploadError;
```
- If the upload failed (bucket doesn't exist, file too large, wrong permissions, etc.), `throw` **raises an exception**.
- `throw` immediately exits the current function and passes the error to the nearest `catch` block — which is in `saveTask()`.
- This is important: if the file upload fails, we don't want to save a broken `image_url` to the database.

```javascript
    const { data } = db.storage.from('task-images').getPublicUrl(fileName);
```
- Once uploaded, this gets the **permanent public URL** where anyone can access the file.
- Note: there's **no `await`** here — `getPublicUrl()` is synchronous because it doesn't make a network request; it just constructs the URL based on the bucket name and filename.
- We destructure `data` from the response.

```javascript
    return data.publicUrl;
}
```
- `data.publicUrl` is the full URL string, like `"https://lafiafbqccrojlkjgcvk.supabase.co/storage/v1/object/public/task-images/1720512345678.pdf"`.
- `return` sends this URL back to wherever `uploadFile()` was called (inside `saveTask()`), so it can be stored in the database.

---

## 💾 SECTION 5 — SAVE TASK (Lines 75–115)

### `saveTask()` — The Most Complex Function

```javascript
async function saveTask() {
    const { data: { user } } = await db.auth.getUser();
```
- Re-verifies the logged-in user at the moment of saving. This is a **security measure** — never trust only front-end state because sessions can expire.

```javascript
    if (!user) return alert("Please log in first!");
```
- `!user` means "if user is null/falsy."
- `return alert(...)` does two things: shows the alert AND immediately exits the function. The `return` prevents any code below from running.
- This guards against edge cases where the session expired while the user had the page open.

```javascript
    const name = document.getElementById('task_name').value;
    const subject = document.getElementById('subject').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
```
- Each line reads one form field's current value.
- `priority` comes from a `<select>` dropdown — `.value` returns whichever `<option>` is currently selected (e.g., `"High"`, `"Medium"`, or `"Low"`).

```javascript
    const fileInput = document.getElementById('task_image').files[0];
```
- `<input type="file">` has a special `.files` property — it's a `FileList` object containing all selected files.
- `[0]` gets the first (and only, since no `multiple` attribute) file.
- If no file was selected, `files[0]` is `undefined`, which is falsy — important for the `if (fileInput)` check later.

```javascript
    if (!name || !deadline) return alert("Name and Deadline are required!");
```
- `||` is the logical OR operator — if **either** `name` OR `deadline` is empty (empty string is falsy), show the alert and exit.
- Subject and priority aren't required — subject has no validation, and priority always has a default selected value.

```javascript
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Saving...";
    saveBtn.disabled = true;
```
- Gets the save button element.
- Changes its label to "Saving..." to give the user visual feedback that something is happening.
- `disabled = true` grays out the button and prevents clicking it again — this prevents **double submission** (user clicking Save twice before the first save completes).

```javascript
    try {
```
- Begins a `try...catch...finally` block.
- Any `throw` statement or unhandled error inside this `try` block will jump to the `catch` block.
- This pattern is essential for async operations that might fail.

```javascript
        let fileUrl = null;
```
- Initializes `fileUrl` as `null`. If no file is attached, the task will be saved with `image_url: null` in the database.
- `let` is used (not `const`) because the value might be reassigned on the next line.

```javascript
        if (fileInput) {
            fileUrl = await uploadFile(fileInput);
        }
```
- Only calls `uploadFile()` if a file was actually selected (remember, `fileInput` is `undefined` if nothing was chosen).
- `await` waits for the upload to finish and for the URL to be returned before continuing.
- If `uploadFile()` throws an error (from the `throw uploadError` line inside it), execution immediately jumps to `catch`.

```javascript
        const { error } = await db.from('tasks').insert([{ 
            task_name: name, 
            subject: subject, 
            deadline: deadline, 
            priority: priority,
            image_url: fileUrl,
            user_id: user.id 
        }]);
```
- `db.from('tasks')` targets the `tasks` table in your Supabase database.
- `.insert([{...}])` inserts a **new row**. The array `[{...}]` can technically hold multiple rows, but here we always insert one.
- Each key (`task_name`, `subject`, etc.) must **match the exact column names** in your Supabase table.
- `image_url: fileUrl` will be either a URL string or `null`.
- `user_id: user.id` stores which user owns this task — this is crucial for **Row Level Security (RLS)** in Supabase, which prevents users from seeing each other's data.

```javascript
        if (error) throw error;
```
- If Supabase returns an error from the insert (e.g., constraint violation, network issue), throws it to jump to `catch`.

```javascript
        fetchTasks();
```
- Refreshes the task table to show the newly added task immediately.

```javascript
        document.getElementById('task_name').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('task_image').value = '';
```
- Clears all form inputs by setting `.value` to an empty string.
- This resets the form so the user can immediately add another task.
- Note: `priority` is intentionally **not** cleared — it keeps its last selected value as a convenience.

```javascript
    } catch (err) {
        alert("Error: " + err.message);
```
- If anything inside the `try` block threw an error, `catch` receives it as `err`.
- Shows the error message in an alert. This handles both upload errors and database errors with one handler.

```javascript
    } finally {
        saveBtn.innerText = "Save Task";
        saveBtn.disabled = false;
    }
}
```
- `finally` runs **no matter what** — whether the task saved successfully, or an error occurred.
- Restores the button's text and re-enables it so the user can try again.
- Without `finally`, if an error occurred, the button would stay disabled forever and the user couldn't save any more tasks.

---

## 📋 SECTION 6 — FETCH AND RENDER (Lines 117–163)

### `fetchTasks()` — Loads Tasks From the Database

```javascript
async function fetchTasks() {
    const { data: { user } } = await db.auth.getUser();
```
- Gets the current user's info again — specifically needed for the `user.id` filter.

```javascript
    const { data, error } = await db.from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('deadline', { ascending: true });
```
- This builds and executes a **SQL-like query** using Supabase's query builder:
  - `.from('tasks')` — FROM tasks table
  - `.select('*')` — SELECT all columns (equivalent to `SELECT *`)
  - `.eq('user_id', user.id)` — WHERE user_id = current user's ID (this is the security filter)
  - `.order('deadline', { ascending: true })` — ORDER BY deadline ASC (soonest first)
- The `await` waits for the network request to complete.
- `data` will be an array of task objects, `error` will be null if successful.

```javascript
    if (!error) renderTable(data);
}
```
- Only calls `renderTable()` if no error occurred.
- If there was an error, silently fails (no alert here — could be improved).

---

### `renderTable(tasks)` — Builds the HTML Table

```javascript
function renderTable(tasks) {
    const tbody = document.getElementById('taskTableBody');
```
- Gets the `<tbody>` element — the body of the HTML table where rows will be injected.

```javascript
    const counter = document.getElementById('taskCounter');
    if(counter) counter.innerText = tasks.length + ' Tasks';
```
- Gets the badge element showing the task count.
- `tasks.length` is the number of items in the array — e.g., `5`.
- `+ ' Tasks'` concatenates to produce `"5 Tasks"`.
- The `if(counter)` guard prevents errors if the element doesn't exist.

```javascript
    if (!tasks || tasks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center p-4">No tasks found.</td></tr>`;
        return;
    }
```
- `!tasks` handles the case where `data` was `null` or `undefined`.
- `tasks.length === 0` handles an empty array (no tasks yet).
- `colspan="6"` makes one cell span all 6 columns so the message is centered across the full table.
- `return` exits the function — no point running the `.map()` below if there's nothing to map.

```javascript
    tbody.innerHTML = tasks.map(t => {
```
- `.map()` transforms each task object `t` in the array into an HTML string.
- `tbody.innerHTML = ` sets the entire inner HTML of the table body at once, replacing whatever was there before (this is how the table "refreshes").

```javascript
        let fileDisplay = '<span style="opacity:0.3;">📄</span>';
```
- Default file icon — a faded document emoji shown when no file is attached.
- `let` is used because this variable will potentially be reassigned in the `if` blocks below.

```javascript
        if (t.image_url) {
```
- Checks if the task has a file URL saved. If `image_url` is `null`, this block is skipped.

```javascript
            const url = t.image_url.toLowerCase();
```
- Converts the URL to lowercase before checking extensions.
- This is important because `.JPG` and `.jpg` should both be treated as images — `.toLowerCase()` ensures the comparison is case-insensitive.

```javascript
            if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
```
- `.match()` tests the string against a **regular expression** (regex).
- `/\.(jpg|jpeg|png|gif|webp)$/` means:
  - `\.` — a literal dot (backslash escapes the special meaning of `.` in regex)
  - `(jpg|jpeg|png|gif|webp)` — any of these extensions
  - `$` — at the **end** of the string
- If the URL ends in any of those extensions, it's an image.

```javascript
                fileDisplay = `<img src="${t.image_url}" class="task-img" style="cursor:pointer;" onclick="window.open('${t.image_url}', '_blank')">`;
```
- Sets `fileDisplay` to an actual `<img>` tag showing a thumbnail of the image.
- `onclick="window.open(..., '_blank')"` opens the full image in a new browser tab when clicked.
- `cursor:pointer` changes the mouse cursor to a hand when hovering, signaling it's clickable.

```javascript
            } else if (url.endsWith('.pdf')) {
                fileDisplay = `<span ...>📕</span>`;
```
- `.endsWith('.pdf')` checks if the URL ends with `.pdf` — simpler than regex for single extensions.
- Shows a red book emoji as a clickable icon for PDF files.

```javascript
            } else if (url.includes('.doc')) {
                fileDisplay = `<span ...>📘</span>`;
```
- `.includes('.doc')` checks if `.doc` appears **anywhere** in the URL — this catches both `.doc` and `.docx`.
- Shows a blue book emoji for Word documents.

```javascript
            } else {
                fileDisplay = `<span ...>📁</span>`;
            }
        }
```
- Catch-all for any other file type (zip, txt, xlsx, etc.) — shows a generic folder emoji.

```javascript
        return `
            <tr>
                <td>${fileDisplay}</td>
                <td><strong>${t.task_name}</strong></td>
                <td>${t.subject}</td>
                <td>${t.deadline}</td>
                <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
                <td><button class="btn btn-sm text-danger" onclick="deleteTask(${t.id})">🗑</button></td>
            </tr>
        `;
```
- Returns the complete HTML for one table row as a template literal string.
- `${fileDisplay}` — inserts whichever file display was built above.
- `<strong>${t.task_name}</strong>` — bolds the task name.
- `badge-${t.priority.toLowerCase()}` — generates class names like `badge-high`, `badge-medium`, `badge-low`, which are styled with red/yellow/green colors in the CSS.
- `onclick="deleteTask(${t.id})"` — embeds the task's actual database ID directly into the HTML so the delete button knows which row to delete.

```javascript
    }).join('');
}
```
- `.map()` returns an **array** of HTML strings — one per task.
- `.join('')` joins all those strings into one single string with no separator.
- This final string is what gets set as `tbody.innerHTML`.

---

### `deleteTask(id)` — Removes a Task

```javascript
async function deleteTask(id) {
```
- Takes `id` as a parameter — the specific task's database ID, passed in from the delete button's `onclick`.

```javascript
    if(confirm("Delete this task?")) {
```
- `confirm()` is a browser built-in that shows a dialog with OK and Cancel buttons.
- Returns `true` if OK was clicked, `false` if Cancel — so the `if` only proceeds on confirmation.
- This prevents accidental deletions.

```javascript
        const { error } = await db.from('tasks').delete().eq('id', id);
```
- Builds the DELETE query:
  - `.from('tasks')` — target the tasks table
  - `.delete()` — perform a DELETE operation
  - `.eq('id', id)` — WHERE id = the specific task ID
- Without `.eq()`, this would delete **all tasks** — the filter is critical.

```javascript
        if(!error) fetchTasks();
    }
}
```
- If deletion succeeded (no error), refreshes the table so the deleted task disappears immediately.
- If there was an error, silently fails (again, could be improved with an alert).

---

## ⏲️ SECTION 7 — TIMER LOGIC (Lines 165–195)

```javascript
let timer;
```
- Declares `timer` without assigning a value (it's `undefined` initially).
- `let` is used because this will be reassigned when the timer starts.
- This will hold the **interval ID** returned by `setInterval()` — needed to stop the timer.

```javascript
let timeLeft = 1500;
```
- Initializes the countdown at 1500 seconds.
- 1500 ÷ 60 = **25 minutes** (a standard Pomodoro work session).

```javascript
let isRunning = false;
```
- A **flag variable** tracking the timer's state.
- Starts as `false` (timer not running).
- These three variables are declared **outside** any function so they persist across function calls (they're module-level state).

---

### `toggleTimer()` — Start or Pause the Timer

```javascript
function toggleTimer() {
    const btn = document.getElementById('timerBtn');
```
- Gets the timer button to update its label.

```javascript
    if (isRunning) {
        clearInterval(timer);
        btn.innerText = "Start";
```
- If the timer is currently running:
  - `clearInterval(timer)` cancels the interval — stops calling `updateTimer` every second. The `timer` variable (interval ID) is used here to identify which interval to clear.
  - Changes button text to "Start" signaling the user can resume.

```javascript
    } else {
        timer = setInterval(updateTimer, 1000);
        btn.innerText = "Pause";
    }
```
- If the timer is NOT running:
  - `setInterval(updateTimer, 1000)` schedules `updateTimer` to be called every **1000 milliseconds** (1 second) indefinitely.
  - The return value (a numeric interval ID) is stored in `timer` for later cancellation.
  - Button changes to "Pause".

```javascript
    isRunning = !isRunning;
}
```
- `!isRunning` flips the boolean: `true` becomes `false`, `false` becomes `true`.
- This always correctly reflects the new state after the toggle.

---

### `updateTimer()` — Called Every Second

```javascript
function updateTimer() {
    if (timeLeft <= 0) {
```
- Checks if the countdown has hit zero.

```javascript
        clearInterval(timer);
```
- Stops the interval so `updateTimer` stops being called.

```javascript
        alert("Time is up! Take a break.");
```
- Shows a browser alert. Note: `alert()` is **blocking** — it pauses all JavaScript until the user closes it.

```javascript
        timeLeft = 1500;
```
- Resets the counter back to 25 minutes so the timer can be used again.

```javascript
        document.getElementById('timerBtn').innerText = "Start";
        isRunning = false;
```
- Resets the button label and state flag to reflect that the timer is stopped.

```javascript
    } else {
        timeLeft--;
    }
```
- `timeLeft--` is shorthand for `timeLeft = timeLeft - 1`.
- Decrements the counter by 1 second.
- This runs every time `updateTimer` is called (every 1000ms), counting down.

```javascript
    const mins = Math.floor(timeLeft / 60);
```
- `Math.floor()` rounds **down** to the nearest whole number.
- Example: `timeLeft = 90` → `90 / 60 = 1.5` → `Math.floor(1.5) = 1` → 1 minute.

```javascript
    const secs = timeLeft % 60;
```
- `%` is the **modulo operator** — returns the remainder after division.
- Example: `90 % 60 = 30` → 30 seconds remaining.
- Together with `mins`, this converts a raw second count into a minutes:seconds format.

```javascript
    document.getElementById('timerDisplay').innerText = 
        `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
```
- Updates the large timer display in the UI.
- `secs < 10 ? '0' : ''` is a **ternary operator** (compact if/else):
  - If seconds is less than 10 (e.g., 7), prepend `'0'` → `"07"`
  - Otherwise prepend nothing → `"42"`
  - This gives `"4:07"` instead of `"4:7"`, which looks correct for a timer.

---

## 🌙 SECTION 8 — DARK MODE (Lines 197–201)

### `toggleDarkMode()`

```javascript
function toggleDarkMode() {
    const body = document.body;
```
- `document.body` directly references the `<body>` HTML element — no `getElementById` needed since there's only one body.

```javascript
    body.setAttribute('data-theme', 
        body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}
```
- `body.getAttribute('data-theme')` reads the current value of the `data-theme` attribute.
- The ternary checks: if it's currently `'dark'`, set it to `'light'`; otherwise set it to `'dark'`.
- `body.setAttribute('data-theme', ...)` writes that new value back to the element.
- This works because the CSS at the top of the HTML has:
  ```css
  [data-theme="dark"] { --bg: #0f0e1a; --text: #ede9fe; ... }
  ```
  Changing the attribute triggers the browser to apply a completely different set of CSS variables, repainting the entire UI instantly — no page reload needed.

---

## 🚀 SECTION 9 — ENTRY POINT (Line 203)

```javascript
window.onload = checkUserSession;
```
- `window` is the global browser object representing the entire browser window.
- `window.onload` is an event that fires when the **page has fully loaded** — all HTML parsed, all scripts loaded.
- `= checkUserSession` (without parentheses) assigns the **function itself** as the handler — not the result of calling it.
- This is the **first thing that runs** when the app opens. It immediately checks if a session exists and either shows the app or the login form accordingly.
- This is what enables the "stay logged in" experience — your session persists across browser refreshes.
