This `index.html` file serves as the **User Interface (UI)** for your StudySmart application. It uses a combination of **HTML5** for structure, **CSS3** for styling, and external **Frameworks** to make it look professional and connect to the cloud.

Here is a breakdown of every section of your code.

---

## 1. The "Meta" Section (Lines 1–10)
This part is invisible to the user but essential for the browser.
* **`<!DOCTYPE html>`**: Tells the browser this is a modern HTML5 document.
* **`lang="en"`**: Sets the language to English for accessibility and search engines.
* **`<meta name="viewport" ...>`**: Crucial for mobile responsiveness. It ensures the app fits properly on phone screens without zooming.
* **External Links**:
    * **Bootstrap 5**: A CSS framework that provides pre-made classes for layout (like `row`, `col-md-4`) and components (like `btn`, `card`).
    * **Plus Jakarta Sans**: A modern Google Font to give the app a "tech" feel.
    * **Supabase JS**: The official library that allows this HTML file to talk to your Supabase database.

---

## 2. The Styling Section (CSS) (Lines 12–80)
This controls the "look and feel."
* **CSS Variables (`:root`)**: Instead of typing colors repeatedly, you defined them once (e.g., `--accent`). This makes it easy to change the entire color scheme in one place.
* **Dark Mode (`[data-theme="dark"]`)**: Changes the values of your variables when your JavaScript adds the `data-theme` attribute to the body.
* **Animations (`@keyframes gradientShift`)**: This creates that smooth, moving color effect in your header. It slowly slides a large background gradient back and forth.
* **Glassmorphism (`backdrop-filter: blur(10px)`)**: This gives your cards a frosted-glass look, a popular modern design trend.

---

## 3. The Header Section (Lines 83–91)
* **`header-section`**: Contains the title and the "Theme" and "Logout" buttons.
* **`style="display:none;"`**: The Logout button is hidden by default. It only appears via JavaScript once a user successfully logs in.

---

## 4. The Authentication Section (Lines 93–109)
This is the first thing a user sees.
* **`auth-section`**: A centered card containing email and password inputs.
* **`toggleAuthMode()`**: This function (linked in the "Create Account" text) allows the user to switch between "Log In" and "Sign Up" without leaving the page.

---

## 5. The Main App (Dashboard) (Lines 111–157)
This section is wrapped in `id="main-app"` and has the class `d-none` (display none). It stays hidden until the user logs in.

### Left Column: Tools & Inputs (col-md-4)
* **Focus Timer**: A Pomodoro timer display. It uses a large font (`timer-num`) to keep the user focused on their work session.
* **New Task Form**:
    * Uses `<input>` and `<select>` fields to collect task data.
    * **File Attachment**: The `<input type="file">` allows students to upload PDFs or images for their subjects like **DBMS** or **HCI**.
    * **Priority Select**: Uses different emojis (🔴, 🟡, 🟢) to visually represent urgency.

### Right Column: Task List (col-md-8)
* **Task Counter**: A badge that updates dynamically (e.g., "3 Tasks") using JavaScript.
* **Responsive Table**: 
    * **`<thead>`**: Defines the headers (Pic, Task, Subject, etc.).
    * **`<tbody id="taskTableBody">`**: This is the most important part of the table. It is **empty**. When you fetch data from Supabase, JavaScript generates the `<tr>` (rows) and `<td>` (cells) and injects them here.

---

## 6. The Script Connection (Line 160)
* **`<script src="script.js"></script>`**: This connects the structure you see here to the logic. Without this line, the buttons wouldn't work, and the data wouldn't load from Supabase.

---

### Summary for your Project Defense:
> "My `index.html` follows a **Single Page Application (SPA)** structure. It uses **Bootstrap 5** for a responsive grid system and **CSS Custom Properties** for a dynamic Dark Mode. The interface is divided into an Auth state and an App state, which are toggled based on the user's authentication status with **Supabase**."

Would you like me to do a similar deep dive for the `script.js` file next?
