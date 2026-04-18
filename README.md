
--- a/README.md
+++ b/README.md
@@ -1,17 +1,124 @@
-# Proposal_OOP
-Proposal For OOP
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/README.md b/README.md
-index 76fb3bd581c29c7bfa2484ad6258bfc38f64e11b..55ca28a3a143d8c5e3b5c2f0ae631a1f8577a062 100644
---- a/README.md
-+++ b/README.md
-@@ -1,2 +1,5 @@
- # Proposal_OOP
--Proposal For OOP
-+
-+Programming project proposal for StudySmart.
-+
-+See `project_proposal.txt` for the full form.
- 
-EOF
-)
+# StudySmart Task Manager
+
+This project is a student task manager.
+
+It includes two app versions:
+
+- A modern web app that uses Supabase for login, task storage, and file upload.
+- A Python Tkinter desktop app that sends tasks to a local PHP endpoint.
+
+## What the code does
+
+### 1) Web app, primary implementation
+
+Files:
+
+- `index.html`
+- `script.js`
+- `Style.css` (legacy styles, optional)
+
+Main features:
+
+- User authentication with Supabase email and password.
+- Account creation and sign in.
+- Session check on page load.
+- Add task with:
+  - task name
+  - subject
+  - due date
+  - priority
+  - optional file attachment
+- Upload file to Supabase Storage bucket `task-images`.
+- Save task row to Supabase table `tasks`.
+- Load only the logged in user's tasks.
+- Show tasks in a table sorted by nearest deadline.
+- Delete a task.
+- Toggle dark mode.
+- 25 minute focus timer with start and pause.
+
+How data flows:
+
+1. You sign in with `db.auth.signInWithPassword`.
+2. The app reads the active user with `db.auth.getUser`.
+3. On save, it uploads the file first with `db.storage.from('task-images').upload(...)`.
+4. It writes task data into `tasks` with `db.from('tasks').insert(...)`.
+5. It queries tasks with `db.from('tasks').select('*').eq('user_id', user.id)`.
+6. It renders rows in `#taskTableBody`.
+
+## 2) Flask API prototype
+
+File:
+
+- `App.py`
+
+What it does:
+
+- Starts a Flask server.
+- Stores tasks in memory with a Python list named `tasks`.
+- Exposes routes:
+  - `GET /` returns `index.html`
+  - `POST /add_task` appends a task object to memory
+  - `GET /get_tasks` returns the current in-memory list
+
+Important:
+
+- This version does not persist data.
+- Restarting the server clears all tasks.
+
+## 3) Tkinter desktop client prototype
+
+File:
+
+- `Database.py`
+
+What it does:
+
+- Builds a desktop GUI for entering student tasks.
+- Sends task form data to `http://localhost/studysmart/save_task.php`.
+- Shows success and error status in the UI.
+- Uses `requests` for HTTP communication.
+- Displays tasks in a tree view widget.
+
+Important:
+
+- This path expects a local PHP backend and MySQL setup.
+
+## Project structure
+
+- `index.html`, `script.js`, `Style.css` -> web UI and client logic.
+- `App.py` -> Flask prototype backend.
+- `Database.py` -> Tkinter plus PHP integration prototype.
+- `Script.js` -> older script variant.
+
+## How to run
+
+### Web app with Supabase
+
+1. Open `index.html` in a browser, or serve the folder with any static server.
+2. Ensure your Supabase project has:
+   - Auth enabled for email/password
+   - `tasks` table with columns used in `script.js`
+   - `task-images` storage bucket
+
+### Flask prototype
+
+1. Install dependencies:
+   - `pip install flask`
+2. Run:
+   - `python App.py`
+3. Open `http://127.0.0.1:5000`
+
+### Tkinter plus PHP prototype
+
+1. Install dependency:
+   - `pip install requests`
+2. Ensure XAMPP, Apache, and MySQL are running.
+3. Ensure `save_task.php` exists at `http://localhost/studysmart/save_task.php`.
+4. Run:
+   - `python Database.py`
+
+## Notes for future cleanup
+
+- Remove hardcoded Supabase publishable key from client code and load from environment for deployment.
+- Keep one JavaScript file, remove old duplicate `Script.js`.
+- Choose one backend path, Supabase or Flask/PHP, then delete unused prototype files.
 
EOF
)
