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

### 2. Authentication Logic (Security)
* **`toggleAuthMode()`**: This manages the **UI State**. It switches the text on the screen between "Log In" and "Register," effectively turning one form into two different tools.
* **`signUp()` / `signIn()`**: These are `async` (asynchronous) functions. They send the email and password to Supabase. We use `await` to tell the browser: *"Wait for the server to verify these credentials before moving to the next line."*
* **`signOut()`**: Clears the user's session and reloads the page to ensure all private data is wiped from the current view.

### 3. Session Management (Persistence)
* **`checkUserSession()`**: This is the "Gatekeeper" function. 
* **The Logic:** It asks Supabase, *"Is anyone already logged in on this computer?"* If a user is found, it uses `classList` to hide the login box and show the actual Task Manager. This is why you don't have to log in every time you refresh the page.

### 4. File Upload System (Cloud Storage)
* **`uploadFile(file)`**: 
    * It extracts the file extension (e.g., `.pdf`).
    * It renames the file using `Date.now()` (e.g., `1713456000.pdf`). This is a **Collision Prevention** strategy—it ensures that if two students upload "Homework.pdf," they won't overwrite each other.
    * It returns a **Public URL**, which is the web link to that specific file in the cloud.

### 5. Task CRUD: Save Operation
* **`saveTask()`**: This is the most complex part of the engine.
    1.  **Validation:** Checks if the user filled in the Name and Deadline. If not, it stops execution with an `alert`.
    2.  **UI Feedback:** Changes the button text to "Saving..." and disables it. This prevents the user from clicking 10 times and creating duplicate tasks.
    3.  **Two-Phase Commit:** It uploads the file *first* to get the link, then inserts the task text *second* into the database.

### 6. Data Retrieval & Rendering
* **`fetchTasks()`**: 
    * Uses `.eq('user_id', user.id)`: This is **Row-Level Security**. It ensures Student A can only see Student A's tasks.
    * Uses `.order('deadline', { ascending: true })`: Automatically sorts the list so your most urgent homework appears at the top.
* **`renderTable(tasks)`**: 
    * This function uses **Polymorphic Rendering**. It looks at the file extension and decides what icon to show: 📕 for PDF, 📘 for Word, or an actual image preview for photos.
    * It uses `.map().join('')` to transform raw database data into clean HTML rows efficiently.

### 7. Productivity & Theme Tools
* **`toggleTimer()`**: Uses `setInterval`. It runs the `updateTimer` function exactly once every 1000 milliseconds (1 second).
* **`updateTimer()`**: Calculates minutes and seconds. When it hits `0`, it triggers a system alert. This is a classic **HCI (Human-Computer Interaction)** feature for time management.
* **`toggleDarkMode()`**: Switches the `data-theme` attribute on the `<body>`. Your CSS then looks for this attribute to change colors globally.

---

### 💡 Why this is "Defense Ready" for BSIT 2C:
If asked about the architecture during your presentation, you can explain that this script follows the **Controller** role in an MVC pattern. It handles **Asynchronous State Management** (waiting for cloud data) and **DOM Manipulation** (updating the UI without refreshing), which are standard requirements for professional web applications.
