# StudySmart Task Manager

StudySmart is a browser-based task manager for students.
It combines task tracking, file attachments, and a focus timer in one page.
## 🚀 App Versions

- Email and password sign up, sign in, and sign out with Supabase Auth.
- Private task lists per user, filtered by `user_id`.
- Task fields for name, subject, due date, and priority.
- Optional file upload to Supabase Storage.
- Dynamic file previews in the task table.
- Built-in 25-minute focus timer.
- Light and dark theme toggle.

## Tech Stack

## 🔍 Technical Deep Dive (Main Web App)
- HTML5
- Vanilla JavaScript
- Bootstrap 5
- Supabase JavaScript SDK v2

### 1. Security & Authentication Logic

- `index.html`, Main UI, layout, and styles.
- `script.js`, Auth flow, task CRUD, storage upload, timer logic.
- `Project Proposal.md`, project background and academic framing.
- `DEPLOY_FREE_GITHUB_LOCAL.md`, deployment notes.

## Prerequisites

Before you run the app, set up a Supabase project with:

- Authentication enabled for Email provider.
- A table named `tasks`.
- A public Storage bucket named `task-images`.

- Suggested `tasks` table columns:

- | Column | Type | Notes |
| --- | --- | --- |
| `id` | `int8` | Primary key |
| `task_name` | `text` | Required |
| `subject` | `text` | Optional |
| `deadline` | `date` | Required |
| `priority` | `text` | High, Medium, Low |
| `image_url` | `text` | Optional |
| `user_id` | `uuid` | References authenticated user |

## Local Run

1. Clone this repository.
2. Open `script.js` and review these constants:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
3. Open `index.html` in your browser.
4. Create an account and add your first task.



1. User signs in.
2. App checks session on load.
3. User creates a task.
4. App uploads file first if a file exists.
5. App inserts task row into `tasks`.
6. App reloads tasks sorted by nearest deadline.

## Security Notes

- Task reads use `.eq('user_id', user.id)`.
- Each uploaded file uses `Date.now()` in the filename to reduce collisions.
- Public file links are generated through Supabase Storage URL helpers.

- ## Known Limits

- - `SUPABASE_URL` and `SUPABASE_KEY` are stored in client code.
- Input validation is minimal.
- Timer resets to 25:00 after completion.
- No offline mode

- ## Next Improvements

- Add edit task support.
- Add task completion status.
- Add due-soon alerts.
- Move secrets to environment-based build flow.
- Add automated tests.
