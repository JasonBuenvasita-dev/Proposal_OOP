The `script.js` file is the **Logic Engine** of StudySmart. While the HTML provides the skeleton, this JavaScript code acts as the intermediary that captures your input, talks to the server, and updates the screen without refreshing the page.

Here is a deep dive into how this specific script works.

---

### 1. The Event Listener (Line 1)
* **`addEventListener('submit', ...)`**: This tells the browser to "listen" for when the user clicks the Save button or presses Enter.
* **`e.preventDefault()`**: This is a critical line for modern web apps. By default, browsers try to refresh the whole page when a form is submitted; this command stops that refresh so the experience feels smooth and fast.

---

### 2. Variable Capture (Lines 5–8)
* **`document.getElementById(...).value`**: The script reaches into the HTML, finds the input boxes by their unique IDs (like `task_name`), and "reads" the text you typed inside them. It stores these in **constants** (`name`, `subj`, etc.) so they can be used later.

---

### 3. Dynamic Styling Logic (Lines 11–13)
* **`let badgeClass = 'badge-low'`**: This sets a default CSS class for the priority tag.
* **Conditional (If) Statements**: The script checks the value of the priority dropdown. If you chose "High," it swaps the class to `badge-high`. This ensures that your tasks are color-coded (Red for High, Green for Low) automatically.

---

### 4. The "Fetch" API: Talking to PHP (Lines 16–21)
This is the most technical part of your code. It handles the **Client-Server communication**.
* **`new FormData(this)`**: This gathers every input field inside the form into a single package, ready to be sent to the server.
* **`fetch('save_task.php', ...)`**: The script sends that package to your PHP file using the **POST** method. It’s like sending a letter to the backend so the data can be saved in your MySQL database.

---

### 5. Asynchronous UI Update (Lines 23–34)
Because the `fetch` is **asynchronous**, the rest of the code waits until the PHP server replies before finishing.
* **`const newRow = ...`**: Instead of reloading the whole table, the script creates a new HTML table row (`<tr>`) "on the fly" using **Template Literals** (the backtick \` symbol).
* **`${name}`**: This syntax inserts the variables we captured earlier directly into the HTML code.
* **`insertAdjacentHTML('afterbegin', ...)`**: This takes the newly created row and "injects" it at the very top of your table body. This provides instant visual feedback to the student that their task was saved.

---

### 6. Resetting the State (Line 37)
* **`reset()`**: After the data is sent and the table is updated, this command clears all the text boxes. This prepares the form for the next task without forcing the user to delete their previous typing manually.

---

### 💡 Why this is great for your BSIT Project:
1.  **User Experience (UX):** By using `fetch` and `insertAdjacentHTML`, you've created a **Single Page Application** feel.
2.  **Organization:** You separated your styling logic (the badge classes) from your data logic (the fetch request).
3.  **Modern Standards:** You are using **ES6 features** (like `const`, `let`, and arrow functions `=>`), which is what professional developers use today.

This logic aligns perfectly with your **HCI (Human-Computer Interaction)** studies, as it focuses on immediate system feedback and user efficiency.
