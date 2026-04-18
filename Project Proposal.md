PROGRAMMING PROJECT PROPOSAL FORM
Student Information
Name(s):

AGANA, DEGHNE GABRIEL

ALUMBRO, RYAN VELASCO

BARAJAN, VERL ANDRIAN POSADAS

BUENAVISTA, JASON JONH
Section/Year: BSIT 2C

Course/Subject: Bachelor of Science in Information Technology

Instructor: Timothy James Castro

Date Submitted: April 18, 2026

Project Title
StudySmart: Integrated Academic Task & Deadline Management System

Problem Statement
College students frequently struggle with academic "information overload," leading to missed deadlines and high stress levels. Traditional methods (physical planners or memory) lack the dynamic capability to handle file attachments, real-time status updates, and centralized cloud accessibility, resulting in fragmented organization and missed project submissions.

Proposed Solution
The team will develop a multi-platform Task Manager (Web & Desktop) that centralizes academic life.
Key Capabilities:

Cloud Sync: Persistent data storage accessible via the web.

Asset Management: Ability to upload and link PDFs, images, and documents to specific tasks.

Focus Tools: Integrated Pomodoro timer to manage study sessions.

Visual Priority: Color-coded urgency levels to guide student workflow.

Target Users
College and Senior High School students.

Working students requiring strict schedule management.

IT students managing complex, multi-subject project timelines.

Core Features
User Authentication: Secure individual accounts with email/password protection.

Task Input: Capture Task Name, Subject (e.g., HCI, DBMS, Ethics), Deadline, and Priority.

Universal File Upload: Integration with cloud storage for academic attachments (PDF, JPG, DOCX).

Live Task Dashboard: A responsive table showing pending tasks with dynamic badge coloring.

Status Control: Instant deletion and real-time list refreshing.

Tools and Technologies
Frontend: HTML5, CSS3 (Custom Variables), Bootstrap 5.

Logic: JavaScript (ES6+), Asynchronous Fetch API.

Backend-as-a-Service (BaaS): Supabase (PostgreSQL Database, Auth, and S3 Storage).

Desktop Prototype (Optional): Python with Tkinter and requests library.

System Flow
Authentication: App checks for an active session. If none, the user logs in via Supabase Auth.

Initialization: System fetches the specific user_id from the cloud and populates the task table.

Data Entry: User enters task details and selects an optional file attachment.

Processing (Async): * Stage A: File is renamed and uploaded to the Cloud Storage Bucket.

Stage B: Metadata and the File URL are saved to the PostgreSQL database.

Dynamic Rendering: The DOM updates instantly using insertAdjacentHTML without a page refresh.

Focus Session: User engages the Pomodoro timer for 25-minute study intervals.

Data Model
Task Object: * task_name, subject, priority: String

deadline: Date (YYYY-MM-DD)

image_url: Text (Cloud link)

user_id: UUID (Foreign Key for User Isolation)

is_completed: Boolean (Default: 0)

Expected Challenges
State Management: Ensuring the UI stays in sync with the cloud database.

Security Policies: Configuring Row Level Security (RLS) so users only see their own tasks.

File Validation: Handling different MIME types (PDF vs. Images) and preventing upload errors.

Optional / Advanced Features
Dark Mode Toggle: Native CSS variable switching for night use.

Real-time Search: Filtering the task list by Subject or Task Name.

Attachment Preview: Automatic icon generation (📕 for PDF, 🖼️ for Images).

Approval Section (For Instructor Use Only)
Status: Approved [ ]   For Revision [ ]   Rejected [ ]

Comments/Suggestions: __________________________________________________________

Instructor Signature: _________________________ Date: ___________

Student Declaration
We declare this project idea as original work by our team.

Signatures: _________________________________
