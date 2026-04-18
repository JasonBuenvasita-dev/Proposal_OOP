# StudySmart Task Manager

StudySmart is a comprehensive academic tool designed to help students manage deadlines, track course tasks, and maintain focus through an integrated productivity timer.

## 🚀 App Versions

This repository contains three developmental iterations of the StudySmart system:
1. **Web App (Main):** A modern, cloud-synced implementation using Supabase for Auth, Database, and Storage.
2. **Flask Prototype:** A Python-based backend experiment for in-memory task management.
3. **Desktop Prototype:** A Tkinter GUI that integrates with a local PHP/MySQL environment.

---

## 🔍 Technical Deep Dive (Main Web App)

The web version of StudySmart follows a **Client-Server Architecture** using a Backend-as-a-Service (BaaS) model.

### 1. Security & Authentication Logic
* **User Isolation:** The system uses Supabase Auth to assign a unique `user_id` (UUID) to every registered student.
* **Session Persistence:** The `checkUserSession` function runs on page load (`window.onload`) to ensure users aren't logged out when they refresh the page.
* **Protected Queries:** When fetching tasks, the code uses `.eq('user_id', user.id)`, ensuring that Student A can never see the tasks of Student B.

### 2. File Handling & Storage Strategy
* **Naming Collision Prevention:** Files are renamed using `Date.now()` (the number of milliseconds since 1970) to ensure every upload is unique, even if two students upload a file named "homework.pdf".
* **Dynamic Rendering:** The `renderTable` function uses JavaScript string methods to detect file extensions. It dynamically generates HTML to show 📕 for PDFs or `<img>` tags for photos based on the `image_url` metadata.

### 3. Database Schema (`tasks` table)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | int8 | Unique identifier for every task. |
| `task_name` | text | The title of the academic requirement. |
| `subject` | text | Academic course (e.g., DBMS, HCI, Ethics). |
| `deadline` | date | The due date used for chronological sorting. |
| `priority` | text | High, Medium, or Low status. |
| `image_url` | text | The public cloud link to the attachment. |
| `user_id` | uuid | Link to the authenticated user account. |

---

## 🌐 Implementation Logic Flow

1. **Initialization:** The app establishes a connection via `supabase.createClient` using your project URL and API key.
2. **Input Capture:** The `saveTask()` function gathers data from the DOM using `document.getElementById`.
3. **Asynchronous Upload:** The app uses `async/await` to wait for the file to finish uploading to the **Storage Bucket** before attempting to save the task text to the **Database**.
4. **State Management:** After a successful save, `fetchTasks()` is called to refresh the UI without requiring a full page reload.

---

## 🧪 Prototypes & Testing

### Flask API Prototype (`App.py`)
* **Purpose:** To test RESTful API routes (`GET` and `POST`).
* **Behavior:** Stores tasks in a Python list. This is "Volatile Storage," meaning it is suitable for testing logic but not for long-term data persistence.

### Tkinter Desktop Client (`Database.py`)
* **Purpose:** To demonstrate cross-platform capability (Desktop vs Web).
* **Integration:** Uses the `requests` library to bridge the Python GUI with a local PHP backend, simulating a traditional internal school network setup.

---

## ⚙️ Setup & Installation

### Web App
1. Ensure your Supabase project has the `tasks` table and `task-images` bucket configured.
2. Set the `task-images` bucket to **Public** to allow the app to display file icons.
3. Open `index.html` in any modern web browser.

---

## 👨‍💻 Project Details
* **Lead Developer:** Buenavista Jason Jonh
* **Section:** BSIT 2C
* **Course Focus:** Database Management, HCI, and Information Technology
