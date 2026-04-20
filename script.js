// 1. INITIALIZATION & CONFIGURATION
const SUPABASE_URL = 'https://lafiafbqccrojlkjgcvk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TLRwCGXv6swosm6ntUguow_aRSkS0We';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. OOP SECTION: POMODORO CLASS
// This demonstrates Encapsulation: Keeping data (timeLeft) and logic (tick) together.
class StudyTimer {
    constructor(displayId, buttonId) {
        this.display = document.getElementById(displayId);
        this.button = document.getElementById(buttonId);
        this.timeLeft = 1500; // 25 minutes
        this.timerInterval = null;
        this.isRunning = false;
    }

    updateUI() {
        const mins = Math.floor(this.timeLeft / 60);
        const secs = this.timeLeft % 60;
        this.display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    toggle() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.button.innerText = "Start";
        } else {
            this.timerInterval = setInterval(() => this.tick(), 1000);
            this.button.innerText = "Pause";
        }
        this.isRunning = !this.isRunning;
    }

    tick() {
        if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval);
            alert("Focus session complete! Time for a break.");
            this.timeLeft = 1500;
            this.isRunning = false;
            this.button.innerText = "Start";
        } else {
            this.timeLeft--;
        }
        this.updateUI();
    }
}

// Instantiate the Timer Object
const pomodoro = new StudyTimer('timerDisplay', 'timerBtn');

// Helper function for the HTML button
function toggleTimer() {
    pomodoro.toggle();
}

// 3. AUTHENTICATION LOGIC
function toggleAuthMode() {
    const title = document.getElementById('authTitle');
    const btn = document.getElementById('authBtn');
    const link = document.getElementById('toggleLink');
    if (btn.innerText === "Log In") {
        title.innerText = "Join StudySmart";
        btn.innerText = "Register Now";
        btn.setAttribute("onclick", "signUp()");
        link.innerText = "Log In";
    } else {
        title.innerText = "Welcome Back";
        btn.innerText = "Log In";
        btn.setAttribute("onclick", "signIn()");
        link.innerText = "Create Account";
    }
}

async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await db.auth.signUp({ email, password });
    if (error) alert("Error: " + error.message);
    else alert("Success! Check your email for a confirmation link.");
}

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await db.auth.signInWithPassword({ email, password });
    if (error) alert("Login failed: " + error.message);
    else checkUserSession();
}

async function signOut() {
    await db.auth.signOut();
    location.reload();
}

// 4. SESSION & DEADLINE LOGIC
async function checkUserSession() {
    const { data: { user } } = await db.auth.getUser();
    const loginBox = document.getElementById('auth-section');
    const appBox = document.getElementById('main-app');
    const logoutBtn = document.getElementById('logoutBtn');

    if (user) {
        if(loginBox) loginBox.classList.add('d-none');
        if(appBox) appBox.classList.remove('d-none');
        if(logoutBtn) logoutBtn.style.display = 'block';
        fetchTasks();
    }
}

function checkDeadlines(tasks) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    tasks.forEach(t => {
        if (t.deadline === tomorrowStr) {
            alert(`⚠️ URGENT: The task "${t.task_name}" is due tomorrow!`);
        }
    });
}

// 5. FILE & DATA OPERATIONS
async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    let { error: uploadError } = await db.storage.from('task-images').upload(fileName, file);
    if (uploadError) throw uploadError;
    const { data } = db.storage.from('task-images').getPublicUrl(fileName);
    return data.publicUrl;
}

async function saveTask() {
    const { data: { user } } = await db.auth.getUser();
    if (!user) return alert("Please log in first!");

    const name = document.getElementById('task_name').value;
    const subject = document.getElementById('subject').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    const fileInput = document.getElementById('task_image').files[0];

    if (!name || !deadline) return alert("Name and Deadline are required!");

    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Saving...";
    saveBtn.disabled = true;

    try {
        let fileUrl = null;
        if (fileInput) fileUrl = await uploadFile(fileInput);

        const { error } = await db.from('tasks').insert([{ 
            task_name: name, 
            subject: subject, 
            deadline: deadline, 
            priority: priority,
            image_url: fileUrl,
            user_id: user.id 
        }]);

        if (error) throw error;
        fetchTasks();
        
        // Reset Inputs
        ['task_name', 'subject', 'deadline', 'task_image'].forEach(id => document.getElementById(id).value = '');
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        saveBtn.innerText = "Save Task";
        saveBtn.disabled = false;
    }
}

async function fetchTasks() {
    const { data: { user } } = await db.auth.getUser();
    const { data, error } = await db.from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('deadline', { ascending: true });

    if (!error) {
        renderTable(data);
        checkDeadlines(data);
    }
}

function renderTable(tasks) {
    const tbody = document.getElementById('taskTableBody');
    const counter = document.getElementById('taskCounter');
    if(counter) counter.innerText = tasks.length + ' Tasks';

    if (!tasks || tasks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center p-5 opacity-50">📋 No tasks yet. Add your first task!</td></tr>`;
        return;
    }

    tbody.innerHTML = tasks.map(t => {
        let fileDisplay = '📄';
        if (t.image_url) {
            const url = t.image_url.toLowerCase();
            if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                fileDisplay = `<img src="${t.image_url}" class="task-img" onclick="window.open('${t.image_url}', '_blank')">`;
            } else if (url.endsWith('.pdf')) {
                fileDisplay = `<span style="cursor:pointer;font-size:1.4rem;" onclick="window.open('${t.image_url}', '_blank')">📕</span>`;
            } else {
                fileDisplay = `<span style="cursor:pointer;font-size:1.4rem;" onclick="window.open('${t.image_url}', '_blank')">📁</span>`;
            }
        }

        return `
            <tr>
                <td>${fileDisplay}</td>
                <td class="fw-bold">${t.task_name}</td>
                <td>${t.subject}</td>
                <td>${t.deadline}</td>
                <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
                <td><button class="btn btn-sm text-danger" onclick="deleteTask(${t.id})">🗑</button></td>
            </tr>
        `;
    }).join('');
}

async function deleteTask(id) {
    if(confirm("Delete this task?")) {
        const { error } = await db.from('tasks').delete().eq('id', id);
        if(!error) fetchTasks();
    }
}

// 6. THEME LOGIC
function toggleDarkMode() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('ss-theme', newTheme);
}

// 7. INITIALIZATION ON LOAD
window.onload = function() {
    const savedTheme = localStorage.getItem('ss-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    checkUserSession();

    // Prevent past dates
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        deadlineInput.setAttribute('min', todayStr);
    }
};
