import tkinter as tk
from tkinter import ttk, messagebox
import requests  # Make sure you ran 'pip install requests'


class StudySmartApp:
-    def __init__(self, root):
-        self.root = root
-        self.root.title("StudySmart: Student Task Manager (MySQL Version)")
-        self.root.geometry("700x550")
-        self.root.configure(bg="#f0f0f0")
-
-        # Your PHP Server URL (Change if your folder name is different)
-        self.api_url = "http://localhost/studysmart/save_task.php"
-
-        self.create_widgets()
-
-    def create_widgets(self):
-        # --- HEADER ---
-        header = tk.Label(self.root, text="STUDY SMART", font=("Arial", 20, "bold"), bg="#2c3e50", fg="white", pady=10)
-        header.pack(fill="x")
-
-        # --- INPUT SECTION ---
-        input_frame = tk.LabelFrame(self.root, text="Add New Academic Task", padx=15, pady=15, font=("Arial", 10, "bold"))
-        input_frame.pack(fill="x", padx=20, pady=15)
-
-        # Task Name
-        tk.Label(input_frame, text="Task Name:").grid(row=0, column=0, sticky="w")
-        self.entry_task = tk.Entry(input_frame, width=30)
-        self.entry_task.grid(row=0, column=1, padx=10, pady=5)
-
-        # Subject
-        tk.Label(input_frame, text="Subject:").grid(row=0, column=2, sticky="w")
-        self.entry_subject = tk.Entry(input_frame, width=20)
-        self.entry_subject.grid(row=0, column=3, padx=10, pady=5)
-
-        # Deadline
-        tk.Label(input_frame, text="Deadline (YYYY-MM-DD):").grid(row=1, column=0, sticky="w")
-        self.entry_deadline = tk.Entry(input_frame, width=30)
-        self.entry_deadline.insert(0, "2026-04-05") # Example placeholder
-        self.entry_deadline.grid(row=1, column=1, padx=10, pady=5)
-
-        # Priority
-        tk.Label(input_frame, text="Priority:").grid(row=1, column=2, sticky="w")
-        self.combo_priority = ttk.Combobox(input_frame, values=["High", "Medium", "Low"], width=17)
-        self.combo_priority.grid(row=1, column=3, padx=10, pady=5)
-
-        # Add Button
-        btn_add = tk.Button(input_frame, text="SAVE TO DATABASE", command=self.add_task, 
-                            bg="#27ae60", fg="white", font=("Arial", 10, "bold"), width=20)
-        btn_add.grid(row=2, column=0, columnspan=4, pady=15)
-
-        # --- LIST VIEW (TREEVIEW) ---
-        list_frame = tk.Frame(self.root)
-        list_frame.pack(fill="both", expand=True, padx=20, pady=10)
-
-        columns = ("ID", "Task Name", "Subject", "Deadline", "Priority")
-        self.tree = ttk.Treeview(list_frame, columns=columns, show="headings")
-        
-        for col in columns:
-            self.tree.heading(col, text=col)
-            self.tree.column(col, width=100)
-
-        self.tree.pack(side="left", fill="both", expand=True)
-
-        # Status Bar
-        self.status_var = tk.StringVar()
-        self.status_var.set("Ready. Make sure XAMPP is running.")
-        status_bar = tk.Label(self.root, textvariable=self.status_var, bd=1, relief="sunken", anchor="w")
-        status_bar.pack(side="bottom", fill="x")
-
-    def add_task(self):
-        # 1. Get data from widgets
-        name = self.entry_task.get()
-        subj = self.entry_subject.get()
-        date = self.entry_deadline.get()
-        prio = self.combo_priority.get()
-
-        # 2. Basic Validation
-        if not name or not date:
-            messagebox.showwarning("Input Error", "Task Name and Deadline are required!")
-            return
-
-        # 3. Data for PHP
-        my_data = {
-            'task_name': name,
-            'subject': subj,
-            'deadline': date,
-            'priority': prio
-        }
-
-        # 4. Attempt to send to PHP
-        try:
-            self.status_var.set("Sending data to server...")
-            self.root.update_idletasks() # Refresh the UI to show status change
-            
-            response = requests.post(self.api_url, data=my_data, timeout=5)
-            
-            if response.status_code == 200 and "Success" in response.text:
-                messagebox.showinfo("Success", "Task saved to MySQL Database!")
-                self.clear_entries()
-                self.status_var.set("Task saved successfully.")
-            else:
-                messagebox.showerror("Server Error", f"PHP Error: {response.text}")
-                self.status_var.set("Server error occurred.")
-                
-        except requests.exceptions.ConnectionError:
-            messagebox.showerror("Connection Error", "Is XAMPP running? Could not reach http://localhost")
-            self.status_var.set("Connection failed.")
-        except Exception as e:
-            messagebox.showerror("Error", f"An unexpected error occurred: {e}")
-            self.status_var.set("Error occurred.")
-
-    def clear_entries(self):
-        """Clears the input boxes after a successful save"""
-        self.entry_task.delete(0, tk.END)
-        self.entry_subject.delete(0, tk.END)
-        self.entry_deadline.delete(0, tk.END)
-        self.combo_priority.set('')
-
-if __name__ == "__main__":
-    root = tk.Tk()
-    app = StudySmartApp(root)
-    root.mainloop()
\ No newline at end of file
+import tkinter as tk
+from tkinter import ttk, messagebox
+from datetime import datetime
+import requests
+
+
+class StudySmartApp:
+    def __init__(self, root):
+        self.root = root
+        self.root.title("StudySmart, Student Task Manager")
+        self.root.geometry("760x560")
+        self.root.configure(bg="#f0f0f0")
+
+        self.api_url = "http://localhost/studysmart/save_task.php"
+        self.http = requests.Session()
+
+        self.create_widgets()
+
+    def create_widgets(self):
+        header = tk.Label(
+            self.root,
+            text="STUDY SMART",
+            font=("Arial", 20, "bold"),
+            bg="#2c3e50",
+            fg="white",
+            pady=10,
+        )
+        header.pack(fill="x")
+
+        input_frame = tk.LabelFrame(
+            self.root,
+            text="Add New Academic Task",
+            padx=15,
+            pady=15,
+            font=("Arial", 10, "bold"),
+        )
+        input_frame.pack(fill="x", padx=20, pady=15)
+
+        tk.Label(input_frame, text="Task Name:").grid(row=0, column=0, sticky="w")
+        self.entry_task = tk.Entry(input_frame, width=30)
+        self.entry_task.grid(row=0, column=1, padx=10, pady=5)
+
+        tk.Label(input_frame, text="Subject:").grid(row=0, column=2, sticky="w")
+        self.entry_subject = tk.Entry(input_frame, width=20)
+        self.entry_subject.grid(row=0, column=3, padx=10, pady=5)
+
+        tk.Label(input_frame, text="Deadline (YYYY-MM-DD):").grid(row=1, column=0, sticky="w")
+        self.entry_deadline = tk.Entry(input_frame, width=30)
+        self.entry_deadline.insert(0, datetime.now().strftime("%Y-%m-%d"))
+        self.entry_deadline.grid(row=1, column=1, padx=10, pady=5)
+
+        tk.Label(input_frame, text="Priority:").grid(row=1, column=2, sticky="w")
+        self.combo_priority = ttk.Combobox(
+            input_frame,
+            values=["High", "Medium", "Low"],
+            width=17,
+            state="readonly",
+        )
+        self.combo_priority.grid(row=1, column=3, padx=10, pady=5)
+        self.combo_priority.set("Medium")
+
+        self.btn_add = tk.Button(
+            input_frame,
+            text="SAVE TO DATABASE",
+            command=self.add_task,
+            bg="#27ae60",
+            fg="white",
+            font=("Arial", 10, "bold"),
+            width=20,
+        )
+        self.btn_add.grid(row=2, column=0, columnspan=4, pady=15)
+
+        list_frame = tk.Frame(self.root)
+        list_frame.pack(fill="both", expand=True, padx=20, pady=10)
+
+        columns = ("ID", "Task Name", "Subject", "Deadline", "Priority")
+        self.tree = ttk.Treeview(list_frame, columns=columns, show="headings", height=12)
+
+        for col in columns:
+            self.tree.heading(col, text=col)
+            self.tree.column(col, width=130, anchor="w")
+
+        self.tree.column("ID", width=70, anchor="center")
+
+        y_scroll = ttk.Scrollbar(list_frame, orient="vertical", command=self.tree.yview)
+        self.tree.configure(yscrollcommand=y_scroll.set)
+
+        self.tree.pack(side="left", fill="both", expand=True)
+        y_scroll.pack(side="right", fill="y")
+
+        self.status_var = tk.StringVar(value="Ready. Start XAMPP and MySQL before saving.")
+        status_bar = tk.Label(self.root, textvariable=self.status_var, bd=1, relief="sunken", anchor="w")
+        status_bar.pack(side="bottom", fill="x")
+
+    def validate_inputs(self, name, subject, deadline, priority):
+        if not name:
+            return "Task Name is required."
+        if not subject:
+            return "Subject is required."
+        if not deadline:
+            return "Deadline is required."
+        if not priority:
+            return "Priority is required."
+
+        try:
+            datetime.strptime(deadline, "%Y-%m-%d")
+        except ValueError:
+            return "Deadline format must be YYYY-MM-DD."
+
+        return ""
+
+    def add_task(self):
+        name = self.entry_task.get().strip()
+        subject = self.entry_subject.get().strip()
+        deadline = self.entry_deadline.get().strip()
+        priority = self.combo_priority.get().strip()
+
+        validation_error = self.validate_inputs(name, subject, deadline, priority)
+        if validation_error:
+            messagebox.showwarning("Input Error", validation_error)
+            return
+
+        payload = {
+            "task_name": name,
+            "subject": subject,
+            "deadline": deadline,
+            "priority": priority,
+        }
+
+        self.btn_add.config(state="disabled")
+
+        try:
+            self.status_var.set("Sending data to server...")
+            self.root.update_idletasks()
+
+            response = self.http.post(self.api_url, data=payload, timeout=8)
+            response.raise_for_status()
+
+            result = response.json()
+            if result.get("status") == "success":
+                task_id = result.get("id", "-")
+                self.tree.insert("", "end", values=(task_id, name, subject, deadline, priority))
+                messagebox.showinfo("Saved", result.get("message", "Task saved."))
+                self.clear_entries()
+                self.status_var.set("Task saved successfully.")
+            else:
+                error_message = result.get("message", "Server rejected the request.")
+                messagebox.showerror("Server Error", error_message)
+                self.status_var.set("Server error occurred.")
+
+        except requests.exceptions.ConnectionError:
+            messagebox.showerror("Connection Error", "Could not connect to localhost. Check XAMPP services.")
+            self.status_var.set("Connection failed.")
+        except requests.exceptions.Timeout:
+            messagebox.showerror("Timeout", "Server response took too long. Try again.")
+            self.status_var.set("Request timed out.")
+        except ValueError:
+            messagebox.showerror("Response Error", "Server returned an invalid JSON response.")
+            self.status_var.set("Invalid server response.")
+        except requests.exceptions.RequestException as err:
+            messagebox.showerror("Request Error", f"Request failed: {err}")
+            self.status_var.set("Request failed.")
+        finally:
+            self.btn_add.config(state="normal")
+
+    def clear_entries(self):
+        self.entry_task.delete(0, tk.END)
+        self.entry_subject.delete(0, tk.END)
+        self.entry_deadline.delete(0, tk.END)
+        self.entry_deadline.insert(0, datetime.now().strftime("%Y-%m-%d"))
+        self.combo_priority.set("Medium")
+
+
+if __name__ == "__main__":
+    root = tk.Tk()
+    app = StudySmartApp(root)
+    root.mainloop()
