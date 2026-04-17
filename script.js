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
        checkUserSession(); 
    }
}

async function signOut() {
    await db.auth.signOut();
    location.reload();
}

// 3. SESSION CHECK
async function checkUserSession() {
    const { data: { user } } = await db.auth.getUser();
    const loginBox = document.getElementById('auth-section'); // Matches your HTML
    const appBox = document.getElementById('main-app');

    if (user) {
        if(loginBox) loginBox.classList.add('d-none');
        if(appBox) appBox.classList.remove('d-none');
        fetchTasks();
    }
}

// 4. IMAGE UPLOAD HELPER
async function uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // IMPORTANT: Make sure your bucket name is 'task-images' in Supabase
    let { error: uploadError } = await db.storage
        .from('task-images') 
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = db.storage.from('task-images').getPublicUrl(filePath);
    return data.publicUrl;
}

// 5. CONSOLIDATED SAVE TASK
async function saveTask() {
    const { data: { user } } = await db.auth.getUser();
    if (!user) return alert("Please log in first!");

    // Get input values
    const name = document.getElementById('task_name').value;
    const subject = document.getElementById('subject').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    const imageFile = document.getElementById('task_image').files[0];

    if (!name || !deadline) return alert("Name and Deadline are required!");

    let imageUrl = null;

    try {
        // Handle Image if exists
        if (imageFile) {
            imageUrl = await uploadImage(imageFile);
        }

        // Insert into Database
        const { error } = await db.from('tasks').insert([{ 
            task_name: name, 
            subject: subject, 
            deadline: deadline, 
            priority: priority,
            image_url: imageUrl,
            user_id: user.id 
        }]);

        if (error) throw error;

        alert("Task saved!");
        fetchTasks();
        
        // Clear inputs
        document.getElementById('task_name').value = '';
        document.getElementById('task_image').value = '';

    } catch (err) {
        console.error("Operation failed:", err.message);
        alert("Error: " + err.message);
    }
}

// 6. RENDER AND FETCH
async function fetchTasks() {
    const { data: { user } } = await db.auth.getUser();
    const { data, error } = await db.from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('deadline', { ascending: true });

    if (!error) renderTable(data);
}

function renderTable(tasks) {
    const tbody = document.getElementById('taskTableBody');
    const counter = document.getElementById('taskCounter');
    if(counter) counter.innerText = tasks.length + ' Tasks';
    
    if (!tasks || tasks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center p-4">No tasks found.</td></tr>`;
        return;
    }

    tbody.innerHTML = tasks.map(t => {
        const imgTag = t.image_url 
            ? `<img src="${t.image_url}" style="width:40px; height:40px; object-fit:cover; border-radius:8px; cursor:pointer;" onclick="window.open('${t.image_url}', '_blank')">`
            : `<span class="text-muted small">No Image</span>`;

        return `
            <tr>
                <td>${imgTag}</td>
                <td><strong>${t.task_name}</strong></td>
                <td>${t.subject}</td>
                <td>${t.deadline}</td>
                <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
                <td><button class="btn btn-sm text-danger" onclick="deleteTask(${t.id})">🗑</button></td>
            </tr>
        `;
    }).join('');
}

async function deleteTask(id) {
    const { error } = await db.from('tasks').delete().eq('id', id);
    if(!error) fetchTasks();
}

window.onload = checkUserSession;
