 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/save_task.php b/save_task.php
index f358d45546e0374593905c3cf242d4a67a8c6dbb..310b0dcb27cdec0dc4f972d7db339819b662605d 100644
--- a/save_task.php
+++ b/save_task.php
@@ -1,31 +1,59 @@
-<?php
-// 1. Enable full error reporting
-mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
-
-try {
-    // 2. Connect to the database
-    $conn = new mysqli("localhost", "root", "", "studysmart_db");
-
-    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
-        // 3. Get data from Python
-        $task = $_POST['task_name'] ?? '';
-        $subject = $_POST['subject'] ?? '';
-        $deadline = $_POST['deadline'] ?? '';
-        $priority = $_POST['priority'] ?? '';
-
-        // 4. Try to insert
-        $sql = "INSERT INTO tasks (task_name, subject, deadline, priority) 
-                VALUES (?, ?, ?, ?)";
-        
-        $stmt = $conn->prepare($sql);
-        $stmt->bind_param("ssss", $task, $subject, $deadline, $priority);
-        
-        if ($stmt->execute()) {
-            echo "Success";
-        }
-    }
-} catch (Exception $e) {
-    // This sends the REAL error message back to Python
-    echo "Database Error: " . $e->getMessage();
-}
-?>
\ No newline at end of file
+<?php
+mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
+header('Content-Type: application/json');
+
+function respond($status, $message, $id = null, $data = null) {
+    echo json_encode([
+        'status' => $status,
+        'message' => $message,
+        'id' => $id,
+        'data' => $data
+    ]);
+    exit;
+}
+
+try {
+    $conn = new mysqli("localhost", "root", "", "studysmart_db");
+
+    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
+        $result = $conn->query("SELECT id, task_name, subject, deadline, priority FROM tasks ORDER BY id DESC");
+        $rows = [];
+        while ($row = $result->fetch_assoc()) {
+            $rows[] = $row;
+        }
+        respond('success', 'Tasks loaded.', null, $rows);
+    }
+
+    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
+        respond('error', 'Invalid request method.');
+    }
+
+    $task = trim($_POST['task_name'] ?? '');
+    $subject = trim($_POST['subject'] ?? '');
+    $deadline = trim($_POST['deadline'] ?? '');
+    $priority = trim($_POST['priority'] ?? '');
+
+    if ($task === '' || $subject === '' || $deadline === '' || $priority === '') {
+        respond('error', 'All fields are required.');
+    }
+
+    $dateObj = DateTime::createFromFormat('Y-m-d', $deadline);
+    if (!$dateObj || $dateObj->format('Y-m-d') !== $deadline) {
+        respond('error', 'Deadline format must be YYYY-MM-DD.');
+    }
+
+    $allowed = ['High', 'Medium', 'Low'];
+    if (!in_array($priority, $allowed, true)) {
+        respond('error', 'Invalid priority value.');
+    }
+
+    $sql = "INSERT INTO tasks (task_name, subject, deadline, priority) VALUES (?, ?, ?, ?)";
+    $stmt = $conn->prepare($sql);
+    $stmt->bind_param("ssss", $task, $subject, $deadline, $priority);
+    $stmt->execute();
+
+    respond('success', 'Task saved to MySQL Database.', $conn->insert_id);
+} catch (Exception $e) {
+    respond('error', 'Database Error: ' . $e->getMessage());
+}
+?>
 
EOF
)
