Certainly! Here is the complete, line-by-line breakdown of your `script.js` code. This is structured as a **Technical Narrative**, explaining exactly what each section does, the purpose behind it, and the logic that makes it work.

---

### 1. Initialization (Connecting to the Cloud)
```javascript
const SUPABASE_URL = 'https://lafiafbqccrojlkjgcvk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TLRwCGXv6swosm6ntUguow_aRSkS0We';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```
* **Purpose:** These lines establish the "handshake" between your website and the Supabase cloud servers.
* **The Logic:** `createClient` uses your unique project URL and Key to create a "Database Object" (which we call `db`). This object is what we use for every other function in the script to send or receive data.

---

### 2. Authentication Logic (The "Security Gate")
```javascript
function toggleAuthMode() { ... }
async function signUp() { ... }
async function signIn() { ... }
async function signOut() { ... }
```
* **Purpose:** To manage user accounts and ensure only authorized students can access their data.
* **The Logic:** * **`toggleAuthMode`**: This is a UI function. It flips the text on the buttons so you can use the same form for both Logging In and Registering.
    * **`signUp/signIn`**: These use `await` because talking to a server isn't instant. The code "waits" for Supabase to confirm if the password is correct before letting you in.
    * **`signOut`**: It deletes the current "Session" and reloads the page to clear any sensitive data from the screen.

---

### 3. Session Check (The "Auto-Login")
```javascript
async function checkUserSession() {
    const { data: { user } } = await db.auth.getUser();
    // ... UI toggling logic ...
}
```
* **Purpose:** To detect if a user is already logged in so they don't have to re-enter their password every time they refresh the page.
* **The Logic:** This function acts as a **State Observer**. It asks Supabase for the current "User Object." If a user is found, it uses `classList.add('d-none')` to hide the login screen and reveal the main app.

---

### 4. Universal File Upload (The "Storage Bridge")
```javascript
async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    // ... upload and get URL ...
    return data.publicUrl;
}
```
* **Purpose:** To move physical files (like a PDF of a syllabus or a photo of a textbook) from your laptop to the cloud.
* **The Logic:** This uses **Timestamp-based Naming**. By naming the file using `Date.now()`, the script ensures every file has a unique ID (the current millisecond). This prevents two students from accidentally overwriting each other's files if they both upload something named "homework.pdf."

---

### 5. Save Task (The "Database Writer")
```javascript
async function saveTask() {
    // ... input capture and file upload ...
    const { error } = await db.from('tasks').insert([{ ... }]);
}
```
* **Purpose:** To package all your information (text, dates, and file links) and save them as one permanent record in the database.
* **The Logic:** This is a **Two-Phase Operation**. First, it uploads your file to get a "Public URL." Second, it takes that URL and your task details and "inserts" them into the `tasks` table. It also includes a "Guard" that stops the process if the Task Name or Deadline is missing.

---

### 6. Render and Fetch (The "Organizer")
```javascript
async function fetchTasks() { ... }
function renderTable(tasks) { ... }
```
* **Purpose:** To retrieve your private list and display it beautifully on the screen.
* **The Logic:** * **`fetchTasks`**: Uses `.eq('user_id', user.id)` to make sure you only see *your* tasks and not anyone else's.
    * **`renderTable`**: This uses **Polymorphic Rendering**. It looks at the file link; if it ends in `.pdf`, it shows a 📕 icon. If it's an image, it shows a thumbnail. This helps the user identify their files at a glance.

---

### 7. Timer Logic (The "Focus Engine")
```javascript
function updateTimer() {
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    // ... update display ...
}
```
* **Purpose:** To help students study using the Pomodoro technique (25 minutes of focus).
* **The Logic:** It uses **Modular Arithmetic** (`% 60`) to calculate the remaining seconds. It runs exactly once every 1,000 milliseconds (1 second) to create a perfect countdown clock.

---

### 8. Final Page Logic
```javascript
function toggleDarkMode() { ... }
window.onload = checkUserSession;
```
* **Purpose:** To handle the final user preferences and start the app.
* **The Logic:** * **`toggleDarkMode`**: Flips a "Theme" switch on the body tag so the CSS can change the colors.
    * **`window.onload`**: This is the "Ignition." It tells the browser, "The moment the page is finished loading, run the Security Check to see if we should show the Login screen or the Dashboard."

### 💡 Why this is great for your BSIT Project:
By documenting your code this way, you are showing **Instructor Timothy James Castro** that you understand the "Full Stack" process—from how data is saved in a database to how it is displayed for the user. 

[Image of client server architecture]
