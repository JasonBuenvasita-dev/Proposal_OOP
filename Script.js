document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById('task_name').value;
    const subj = document.getElementById('subject').value;
    const date = document.getElementById('deadline').value;
    const prio = document.getElementById('priority').value;

    // Determine badge color
    let badgeClass = 'badge-low';
    if(prio === 'High') badgeClass = 'badge-high';
    if(prio === 'Medium') badgeClass = 'badge-medium';

    // 1. Send data to PHP
    let formData = new FormData(this); // Shorthand for all inputs
    
    fetch('save_task.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // 2. Instead of alert, add it to the table visually
        const tableBody = document.getElementById('taskTableBody');
        const newRow = `
            <tr style="animation: fadeIn 0.5s forwards">
                <td><strong>${name}</strong></td>
                <td>${subj}</td>
                <td>${date}</td>
                <td><span class="badge ${badgeClass}">${prio}</span></td>
            </tr>
        `;
        
        tableBody.insertAdjacentHTML('afterbegin', newRow);
        
        // 3. Clear the form and show a small success toast/message
        document.getElementById('taskForm').reset();
    });
});
