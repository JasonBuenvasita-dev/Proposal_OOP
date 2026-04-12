from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Store tasks in memory (free - no database needed)
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.json
    task = {
        'id': len(tasks) + 1,
        'task_name': data.get('task_name'),
        'subject': data.get('subject'),
        'deadline': data.get('deadline'),
        'priority': data.get('priority')
    }
    tasks.append(task)
    return jsonify({"status": "Success", "task": task})

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    return jsonify({"tasks": tasks})

if __name__ == '__main__':
    app.run(debug=False)
