// 1. INITIALIZATION
const SUPABASE_URL = 'https://lafiafbqccrojlkjgcvk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TLRwCGXv6swosm6ntUguow_aRSkS0We';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. AUTHENTICATION LOGIC
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
    else alert("Success! Please check your email for a confirmation link.");
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

// 3. SESSION & DEADLINE LOGIC
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

// 4. FILE & DATA OPERATIONS
async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    let { error: uploadError } = await db.storage
        .from('task-images')
        .upload(fileName, file);

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
        if (fileInput) {
            fileUrl = await uploadFile(fileInput);
        }

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
        // Clear inputs
        document.getElementById('task_name').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('task_image').value = '';

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
        checkDeadlines(data); // Checks for tomorrow's deadlines on load
    }
}

function renderTable(tasks) {
    const tbody = document.getElementById('taskTableBody');
    const counter = document.getElementById('taskCounter');
    if(counter) counter.innerText = tasks.length + ' Tasks';

    if (!tasks || tasks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <div class="empty-icon">📋</div>
                        <p>No tasks yet. Add your first task!</p>
                    </div>
                </td>
            </tr>`;
        return;
    }

    tbody.innerHTML = tasks.map(t => {
        let fileDisplay = '<span style="opacity:0.3;font-size:1.3rem;">📄</span>';

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
                <td class="task-name-cell">${t.task_name}</td>
                <td class="subject-cell">${t.subject}</td>
                <td class="deadline-cell">${t.deadline}</td>
                <td><span class="priority-badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
                <td><button class="btn-delete" onclick="deleteTask(${t.id})">🗑</button></td>
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

// 5. TIMER & THEME
let timer;
let timeLeft = 1500; 
let isRunning = false;

function toggleTimer() {
    const btn = document.getElementById('timerBtn');
    if (isRunning) {
        clearInterval(timer);
        btn.innerText = "Start";
    } else {
        timer = setInterval(updateTimer, 1000);
        btn.innerText = "Pause";
    }
    isRunning = !isRunning;
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time is up! Take a break.");
        timeLeft = 1500;
        document.getElementById('timerBtn').innerText = "Start";
        isRunning = false;
    } else {
        timeLeft--;
    }
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function toggleDarkMode() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('ss-theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// 6. INITIALIZATION ON LOAD
window.onload = function() {
    // Restore saved theme (default: light)
    const savedTheme = localStorage.getItem('ss-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    // Check if user is logged in
    checkUserSession();

    // Prevent past dates in the calendar
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        deadlineInput.setAttribute('min', todayStr);
    }
};
