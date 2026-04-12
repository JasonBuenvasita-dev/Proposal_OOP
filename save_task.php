<?php
// 1. Enable full error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // 2. Connect to the database
    $conn = new mysqli("localhost", "root", "", "studysmart_db");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // 3. Get data from Python
        $task = $_POST['task_name'] ?? '';
        $subject = $_POST['subject'] ?? '';
        $deadline = $_POST['deadline'] ?? '';
        $priority = $_POST['priority'] ?? '';

        // 4. Try to insert
        $sql = "INSERT INTO tasks (task_name, subject, deadline, priority) 
                VALUES (?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $task, $subject, $deadline, $priority);
        
        if ($stmt->execute()) {
            echo "Success";
        }
    }
} catch (Exception $e) {
    // This sends the REAL error message back to Python
    echo "Database Error: " . $e->getMessage();
}
?>