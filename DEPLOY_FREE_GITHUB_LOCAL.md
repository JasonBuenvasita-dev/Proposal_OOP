diff --git a/DEPLOY_FREE_GITHUB_LOCAL.md b/DEPLOY_FREE_GITHUB_LOCAL.md
new file mode 100644
index 0000000000000000000000000000000000000000..5eb5daf31c8261c27a095762cf84ad1a5dd1bc2d
--- /dev/null
+++ b/DEPLOY_FREE_GITHUB_LOCAL.md
@@ -0,0 +1,131 @@
+# Free Deployment Guide, GitHub + Your Computer
+
+## What you can run for free
+
+Your current app uses:
+- Python Tkinter desktop client
+- PHP API
+- MySQL database
+
+This stack runs free on your own computer.
+GitHub stores your code and version history.
+
+## Important limit
+
+GitHub Pages does not run PHP or MySQL.
+So your app must run locally on your computer.
+
+## Step 1, push your project to GitHub
+
+1. Create a new repository on GitHub.
+2. Run these commands in your project folder:
+
+```bash
+git init
+git add .
+git commit -m "Initial StudySmart app"
+git branch -M main
+git remote add origin https://github.com/<your-username>/<your-repo>.git
+git push -u origin main
+```
+
+## Step 2, install free local tools
+
+Install:
+- Python 3.11 or newer
+- XAMPP with Apache and MySQL
+
+## Step 3, set up PHP files in XAMPP
+
+1. Open your XAMPP `htdocs` folder.
+2. Create folder `studysmart`.
+3. Copy `save_task.php` into `htdocs/studysmart/`.
+
+Final path example on Windows:
+`C:\xampp\htdocs\studysmart\save_task.php`
+
+## Step 4, create MySQL database and table
+
+1. Start Apache and MySQL in XAMPP Control Panel.
+2. Open `http://localhost/phpmyadmin`.
+3. Create database `studysmart_db`.
+4. Run this SQL:
+
+```sql
+CREATE TABLE tasks (
+  id INT AUTO_INCREMENT PRIMARY KEY,
+  task_name VARCHAR(255) NOT NULL,
+  subject VARCHAR(255) NOT NULL,
+  deadline DATE NOT NULL,
+  priority ENUM('High','Medium','Low') NOT NULL
+);
+```
+
+## Step 5, match API URL in Python
+
+In `Database.py`, keep this line:
+
+```python
+self.api_url = "http://localhost/studysmart/save_task.php"
+```
+
+If your folder name is different, update the URL.
+
+## Step 6, install Python dependency
+
+In terminal:
+
+```bash
+pip install requests
+```
+
+## Step 7, run the desktop app
+
+In terminal, inside your project folder:
+
+```bash
+python Database.py
+```
+
+## Step 8, verify end to end flow
+
+1. Enter task data in the app.
+2. Click save.
+3. Open phpMyAdmin.
+4. Check `studysmart_db.tasks` rows.
+
+If row appears, deployment works.
+
+## Daily use workflow with GitHub
+
+1. Pull latest code:
+
+```bash
+git pull origin main
+```
+
+2. Work on your code.
+3. Commit and push:
+
+```bash
+git add .
+git commit -m "your update"
+git push origin main
+```
+
+## Share with classmates for free
+
+Each classmate can run the same setup on their own computer.
+Each classmate points Python to local `localhost` PHP endpoint.
+
+## Optional, one click start on Windows
+
+Create `start_studysmart.bat`:
+
+```bat
+@echo off
+cd /d C:\path\to\Proposal_OOP
+python Database.py
+```
+
+Double click the file to open the app.
