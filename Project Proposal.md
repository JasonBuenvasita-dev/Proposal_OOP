# 📚 PROGRAMMING PROJECT PROPOSAL
**Course:** Bachelor of Science in Information Technology (BSIT 2C)  
**Instructor:** Timothy James Castro  
**Date:** April 18, 2026

---

## 🟢 1. PROJECT IDENTIFICATION
**Project Title:** StudySmart: Integrated Academic Task & Deadline Management System  
**Lead Developers:** * AGANA, DEGHNE GABRIEL  
* ALUMBRO, RYAN VELASCO  
* BARAJAN, VERL ANDRIAN POSADAS  
* BUENAVISTA, JASON JONH  

---

## 🔴 2. PROBLEM STATEMENT
College students face significant "Information Overload," where academic requirements from multiple subjects (e.g., DBMS, HCI, Ethics) lead to missed deadlines and disorganized workflows. Existing manual methods lack **Cloud Persistence** and **Asset Integration**, meaning students cannot easily link their research PDFs or project images directly to their task reminders.

---

## 🔵 3. THE PROPOSED SOLUTION
**StudySmart** is a browser-based productivity engine that centralizes academic life. It bridges the gap between a simple "To-Do List" and a "Document Manager" by utilizing a Cloud-Native backend.

### **Key Capabilities:**
* **Asset Linkage:** Direct attachment of academic resources (PDFs, Images) to tasks.
* **Deep Work Integration:** A built-in Pomodoro timer to discourage "multi-tasking" and encourage focused study sessions.
* **Data Isolation:** Using UUID-based filtering to ensure every student has a private, secure dashboard.

---

## 🛠️ 4. TECH STACK (Architecture)
The project utilizes a **Modern Web Architecture** to ensure high performance and scalability.



[Image of client-server architecture diagram]


* **Frontend:** HTML5, CSS3 (Custom Variables), and **Bootstrap 5** for mobile responsiveness.
* **Logic Engine:** **Vanilla JavaScript (ES6+)** using the Asynchronous Fetch API for non-blocking UI updates.
* **BaaS (Backend-as-a-Service):** **Supabase**, leveraging:
    * **PostgreSQL:** For structured relational data.
    * **Supabase Auth:** For JWT-based secure user sessions.
    * **Supabase Storage (S3):** For hosting academic file attachments.

---

## 🔄 5. SYSTEM FLOW & LOGIC
1.  **Handshake:** On load, the app validates the session via `auth.getUser()`.
2.  **Two-Phase Persistence:** * **Phase A:** Files are renamed with a unique timestamp (`Date.now()`) and pushed to the S3 bucket.
    * **Phase B:** The resulting Public URL is bundled with the task metadata and inserted into the `tasks` table.
3.  **Reactive UI:** The DOM is updated using `insertAdjacentHTML`, providing an **SPA (Single Page Application)** feel without page refreshes.



---

## 📊 6. DATA MODEL (Database Schema)
| Attribute | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | `int8` | Primary Key | Unique Task ID |
| `task_name` | `text` | NOT NULL | Title of the requirement |
| `subject` | `text` | Optional | E.g., DBMS, HCI, Ethics |
| `deadline` | `date` | NOT NULL | Due date for sorting |
| `priority` | `text` | Check Constraint | High, Medium, Low |
| `image_url` | `text` | Optional | Link to Cloud Storage |
| `user_id` | `uuid` | Foreign Key | Links to Auth User |

---

## 🚀 7. EXPECTED CHALLENGES & ADVANCED FEATURES
* **Security:** Configuring **Row Level Security (RLS)** policies to prevent unauthorized data access.
* **UX Design:** Implementing "Glassmorphism" UI and **Dark Mode** for a modern student-centric aesthetic.
* **Dynamic Previews:** Automatic icon generation (📕 for PDF, 🖼️ for Images) based on file MIME types.

---

### **Student Declaration**
We declare this project idea as original work by our team.

**Signatures:**
__________________________  __________________________
__________________________  __________________________

---

### **Instructor Approval Section**
**Status:** Approved [ ]   For Revision [ ]   Rejected [ ]  
**Comments:** __________________________________________________________________  
**Instructor Signature:** _________________________ **Date:** ___________
