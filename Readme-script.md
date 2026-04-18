To help your team (and your instructor, **Timothy James Castro**) understand the logic behind the **StudySmart** engine, I’ve broken down the `script.js` file section by section. 

This is formatted as a **Technical Reference Guide** for your `README.md`.

---

## 🧠 script.js: Detailed Logic Breakdown

### 1. Initialization (Connecting to the Cloud)
```javascript
const SUPABASE_URL = '...'; 
const SUPABASE_KEY = '...';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```
* **Purpose:** These lines establish a secure tunnel between your web app and the Supabase servers.
* **The Logic:** `createClient` initializes the library, allowing us to use the `db` variable to perform tasks like logging in or saving data later in the script.

2. Authentication Logic (The "Security Gate")
JavaScript
async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await db.auth.signInWithPassword({ email, password });
    if (error) alert(error.message); else checkUserSession();
}
Purpose: To verify user credentials against the database.

The Logic: It uses await because talking to the cloud isn't instant. The script "waits" for Supabase to check the email and password before deciding whether to show an error or let the user in.

3. Universal File Upload (The "Storage Bridge")
JavaScript
async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    let { error } = await db.storage.from('task-images').upload(fileName, file);
    const { data } = db.storage.from('task-images').getPublicUrl(fileName);
    return data.publicUrl;
}
Purpose: To move physical files (images/PDFs) from your computer to cloud storage.

The Logic: It implements Collision Prevention by using Date.now(). By renaming every file to a unique timestamp, it ensures that two users never overwrite each other's files.

4. Dynamic UI Rendering (The "Artist")
JavaScript
function renderTable(tasks) {
    tbody.innerHTML = tasks.map(t => {
        // ... HTML Row Generation ...
    }).join('');
}
Purpose: To transform raw data into a visual table.

The Logic: This is a Human-Computer Interaction (HCI) feature. Instead of refreshing the page, the script clears the old table and "paints" new rows using Template Literals, making the app feel fast and reactive.

5. Focus Timer Logic (The "Clockwork")
JavaScript
function updateTimer() {
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
Purpose: To manage time intervals for the Pomodoro technique.

The Logic: It uses Modular Arithmetic (% 60) to separate total seconds into minutes and seconds, ensuring the clock displays correctly (e.g., showing 24:09 instead of 24:9).

---

### 💡 Why this is "Defense Ready" for BSIT 2C:
If asked about the architecture during your presentation, you can explain that this script follows the **Controller** role in an MVC pattern. It handles **Asynchronous State Management** (waiting for cloud data) and **DOM Manipulation** (updating the UI without refreshing), which are standard requirements for professional web applications.
