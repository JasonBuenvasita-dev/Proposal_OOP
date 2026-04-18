# StudySmart Task Manager

StudySmart is a comprehensive academic tool designed to help students manage deadlines, track course tasks, and maintain focus through an integrated productivity timer.

## 🚀 App Versions

This repository contains three developmental iterations of the StudySmart system:
1. **Web App (Main):** A modern, cloud-synced implementation using Supabase for Auth, Database, and Storage.
2. **Flask Prototype:** A Python-based backend experiment for in-memory task management.
3. **Desktop Prototype:** A Tkinter GUI that integrates with a local PHP/MySQL environment.

---

## 🌐 1. Web Implementation (Primary)
The primary version of StudySmart is built for the web to ensure cross-device accessibility.

### Key Features
- **User Authentication:** Secure registration and login via Supabase Auth.
- **Task Management:** Full CRUD (Create, Read, Delete) capabilities for academic tasks.
- **File Attachments:** Upload and view PDFs (📕), Word docs (📘), and images (🖼️) directly from the task list.
- **Focus Timer:** Built-in Pomodoro-style 25-minute timer to aid study sessions.
- **Personalized View:** Automatically filters tasks so users only see their own data.
- **Dark Mode:** A toggleable interface for reduced eye strain during late-night study.

### Data Workflow
1. **Auth:** User signs in using `db.auth.signInWithPassword`.
2. **Storage:** Files are uploaded to the `task-images` bucket using `db.storage`.
3. **Database:** Task details and file URLs are saved to the `tasks` table.
4. **UI:** Tasks are fetched and sorted by deadline for display in `#taskTableBody`.

---

## 🧪 2. Flask API Prototype (`App.py`)
A backend prototype used to test server-side logic and API routing.
- **Technology:** Python & Flask.
- **Storage:** Uses an in-memory Python list (volatile; data resets on server restart).
- **Routes:** - `POST /add_task`: Appends a task object to the memory list.
  - `GET /get_tasks`: Retrieves all currently stored tasks.

---

## 🖥️ 3. Tkinter Desktop Client (`Database.py`)
A desktop-based GUI prototype designed for local network environments.
- **Technology:** Python Tkinter for the GUI and `requests` for HTTP communication.
- **Integration:** Connects to a local PHP endpoint (`save_task.php`) hosted on XAMPP/Apache.
- **UI Components:** Utilizes `treeview` widgets to organize and display tasks in a desktop window.

---

## ⚙️ Setup & Installation

### Web App
1. Ensure your Supabase project has the `tasks` table and `task-images` bucket configured.
2. Open `index.html` in any modern web browser.

### Flask Prototype
1. Run `pip install flask`.
2. Execute `python App.py` and navigate to `http://127.0.0.1:5000`.

### Tkinter Prototype
1. Run `pip install requests`.
2. Ensure XAMPP is active with Apache and MySQL running.
3. Execute `python Database.py`.

---

## 👨‍💻 Project Details
- **Lead Developer:** Buenavista Jason Jonh
- **Section:** BSIT 2C
- **Focus:** Information Technology, Database Management, and HCI
