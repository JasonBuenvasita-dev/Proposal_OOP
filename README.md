# 📚 StudySmart: Student Task & Focus Manager

StudySmart is a high-performance, browser-based productivity suite specifically engineered for students. It centralizes academic requirement tracking, cloud-based file management, and deep-work sessions via an integrated Pomodoro timer.

---

## 🚀 Key Features

* **Secure Authentication:** Full user lifecycle management (Sign Up, Sign In, Sign Out) powered by **Supabase Auth**.
* **User Isolation:** Row-Level Security (RLS) simulation using `user_id` filtering ensures students only access their own data.
* **Cloud Storage Integration:** Supports uploading and previewing subject materials (PDFs, Images, Docs) directly within the task list.
* **Intelligent UI:** Dynamic badge color-coding for priorities and automatic file-type detection (📕 for PDFs, thumbnails for images).
* **Focus Engine:** A built-in 25-minute Pomodoro timer to facilitate deep study sessions.
* **Modern UX:** Responsive design using **Bootstrap 5** with a native Dark Mode toggle for late-night productivity.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Properties), Vanilla JavaScript (ES6+).
* **UI Framework:** Bootstrap 5 (Responsive Grid & Components).
* **Backend-as-a-Service (BaaS):** [Supabase](https://supabase.com/) (PostgreSQL, Auth, and S3 Storage).

---

## 🔍 Technical Architecture & Logic

### 1. Data Integrity & Storage
The application utilizes a **Two-Phase Commit** pattern for tasks with attachments:
1.  **Phase 1 (Binary Storage):** The file is renamed with a `Date.now()` timestamp to prevent naming collisions and uploaded to the S3 bucket.
2.  **Phase 2 (Metadata Entry):** The public URL of the file is retrieved and saved alongside task details (name, subject, priority) in the PostgreSQL `tasks` table.

### 2. Database Schema (`tasks`)

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `int8` | Primary Key (Auto-increment) |
| `task_name` | `text` | Title of the academic requirement |
| `subject` | `text` | Course category (e.g., DBMS, HCI, Ethics) |
| `deadline` | `date` | Due date used for chronological sorting |
| `priority` | `text` | Priority status (High, Medium, Low) |
| `image_url` | `text` | Public cloud link to the file attachment |
| `user_id` | `uuid` | Foreign Key linking to the authenticated student |

---

## 🌐 Implementation Workflow

1.  **Session Handshake:** On page load (`window.onload`), the app checks for a persistent Supabase session to bypass the login screen.
2.  **Asynchronous CRUD:** Uses `async/await` to handle database operations, ensuring the UI remains non-blocking.
3.  **Data Retrieval:** Tasks are fetched using `.eq('user_id', user.id)`, providing a secure, personalized dashboard.
4.  **Dynamic Rendering:** The table is cleared and rebuilt via JavaScript string literals whenever the data state changes.

---

## ⚙️ Setup & Installation

### Prerequisites
Configure your Supabase project as follows:
1.  **Auth:** Enable Email/Password provider.
2.  **Database:** Create the `tasks` table using the schema provided above.
3.  **Storage:** Create a **Public** bucket named `task-images`.

### Local Execution
1.  Clone the repository.
2.  In `script.js`, input your project credentials:
    ```javascript
    const SUPABASE_URL = 'YOUR_PROJECT_URL';
    const SUPABASE_KEY = 'YOUR_ANON_KEY';
    ```
3.  Launch `index.html` in any modern web browser.

---

## 🛡️ Security & Constraints
* **Current Security:** Filtering is handled via client-side queries (`.eq`). For production, PostgreSQL **Row Level Security (RLS)** policies should be enabled.
* **Secrets Management:** API keys are currently stored in `script.js`. For deployment, these should be moved to environment variables.
* **Validation:** Input validation is minimal to maintain prototype speed; formal regex validation is recommended for future builds.

---

## 👨‍💻 Project Details
* **Developers:** Buenavista Jason Jonh (Lead), Agana Deghne Gabriel, Alumbro Ryan Velasco, Barajan Verl Andrian Posadas.
* **Section:** BSIT 2C
* **Academic Focus:** Database Management (DBMS) & Human-Computer Interaction (HCI).
