// 1. INITIALIZATION
const SUPABASE_URL = 'https://lafiafbqccrojlkjgcvk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TLRwCGXv6swosm6ntUguow_aRSkS0We';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. AUTHENTICATION LOGIC
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await db.auth.signUp({ email, password });
    
    if (error) alert("Error: " + error.message);
    else alert("Success! Please check your email for a confirmation link.");
}

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await db.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        alert("Welcome back!");
        checkUserSession(); // Update UI to show tasks
    }
}

async function signOut() {
    await db.auth.signOut();
    location.reload(); // Refresh to hide private data
}

// 3. CHECK SESSION
// Automatically hide login form and show tasks if already logged in
async function checkUserSession() {
    const { data: { user } } = await db.auth.getUser();
    const loginBox = document.getElementById('login-container');
    const appBox = document.getElementById('main-app'); // Ensure your main UI has this ID

    if (user) {
        if(loginBox) loginBox.classList.add('d-none');
        if(appBox) appBox.classList.remove('d-none');
        fetchTasks();
    }
}

// 4. TASK MANAGEMENT (CRUD)
async function saveTask() {
    const { data: { user } } = await db.auth.getUser();

    if (!user) {
        alert("You must be logged in!");
        return;
    }

    const taskData = {
        task_name: document.getElementById('taskName').value,
        subject: document.getElementById('subject').value,
        deadline: document.getElementById('deadline').value,
        priority: document.getElementById('priority').value,
        user_id: user.id // Links task to the logged-in account
    };

    const { error } = await db.from('tasks').insert([taskData]);

    if (error) {
        console.error("Save Error:", error.message);
    } else {
        alert("Task saved successfully!");
        fetchTasks();
    }
}
async function uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error: uploadError } = await db.storage
        .from('task-images')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data } = db.storage.from('task-images').getPublicUrl(filePath);
    return data.publicUrl;
}

// Update your saveTask function to include this
async function saveTask() {
    const imageFile = document.getElementById('task_image').files[0];
    let imageUrl = null;

    if (imageFile) {
        imageUrl = await uploadImage(imageFile);
    }

    // Now include imageUrl in your db.from('tasks').insert([...]) call
}
async function fetchTasks() {
    // Because of your RLS policy (auth.uid() = user_id), 
    // Supabase automatically only returns YOUR tasks.
    const { data, error } = await db
        .from('tasks')
        .select('*')
        .order('deadline', { ascending: true });

    if (error) {
        console.error("Fetch Error:", error.message);
    } else {
        renderTable(data);
    }
}

function renderTable(tasks) {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = ''; // Clear current list

    tasks.forEach(task => {
        const row = `
            <tr>
                <td>${task.task_name}</td>
                <td>${task.subject}</td>
                <td>${task.deadline}</td>
                <td><span class="badge bg-${task.priority === 'High' ? 'danger' : 'primary'}">${task.priority}</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Run on page load
checkUserSession();
