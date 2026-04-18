Since your code has transitioned from a local PHP setup to a **Cloud-Integrated Supabase** system, your documentation needs to reflect this jump in technical complexity. 

Here is the updated **Technical Logic Breakdown** for your `README-script.md`. It explains the "Why" and "How" of your JavaScript in a way that aligns with your **BSIT 2C** curriculum (DBMS and HCI).

---

## 🧠 Script.js: The Logical Core of StudySmart

The `script.js` file serves as the **Controller** in our architecture. It manages the real-time interaction between the user’s browser and the **Supabase Cloud Backend**.

### 1. Asynchronous Lifecycle (`async/await`)
Unlike standard scripts, almost every function here is **Asynchronous**. 
* **The Concept:** Talking to a cloud server in another part of the world takes time (latency). 
* **The Logic:** We use `await` to pause code execution on specific lines until the database confirms success. This prevents the "Race Condition" where the app tries to display a task before the server has finished saving it.

---

### 2. Multi-Stage Save Architecture (`saveTask`)
The saving process is an **Atomic Operation**—it must complete several steps in a specific order to ensure data integrity:
1.  **State Capture:** The script extracts values from the DOM using `document.getElementById`.
2.  **Storage Phase:** If an attachment exists, the script pushes the binary data to the **Supabase S3 Bucket**. It uses `Date.now()` to rename the file, ensuring a unique **Primary Key** for every file upload.
3.  **Persistence Phase:** Once the file URL is secured, the metadata (task name, deadline, priority) is inserted into the PostgreSQL database.

---

### 3. State-Driven UI Management
The script acts as a "Gatekeeper" for the user interface through the `checkUserSession` function:
* **Session Handshake:** On every page load, the script contacts the Supabase Auth server. 
* **Dynamic DOM Manipulation:** If a session is valid, the script uses `classList.toggle` to hide the login portal and reveal the Task Dashboard, providing a seamless **HCI (Human-Computer Interaction)** experience without page reloads.

---

### 4. Reactive UI Rendering (`renderTable`)
Instead of static HTML, the table is built dynamically using **Functional Mapping**:
* **The Logic:** The script takes an array of database records and "maps" them into HTML rows using **Template Literals**.
* **Polymorphic Rendering:** The logic parses the `image_url` string. It intelligently decides whether to render an `<img>` tag for photos or specific emojis (📕 for PDFs, 📘 for Docs), enhancing the system’s visual communication.

---

### 5. Focus Engine (Pomodoro Logic)
The timer leverages the browser’s **Web API** (`setInterval`):
* **Temporal Logic:** Every 1000ms, the script decrements the `timeLeft` variable and updates the UI.
* **HCI Feedback Loop:** When the timer reaches zero, the script triggers a system-level alert. This provides immediate **System Feedback**, a core principle of usable software design.

---

### 💡 Why this is a "BSIT-Level" Implementation:
* **Data Security:** You are utilizing UUID-based filtering (`.eq('user_id', user.id)`) to ensure **User Isolation**—a critical DBMS security concept.
* **Efficiency:** By using `insertAdjacentHTML`, you avoid expensive full-page repaints, optimizing the application's performance.
* **Modern Standards:** Your code follows **ES6+ standards** (Arrow functions, Destructuring, and Template Literals), showing that the project is built on professional, industry-standard foundations.

This documentation highlights your growth from a student writing basic scripts to a developer managing **Cloud-Synchronized State**.
