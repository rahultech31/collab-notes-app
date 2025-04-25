# Collaborative Notes App

A real-time, collaborative note-taking application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can create, share, and edit notes together with role-based permissions and activity tracking.

---

## Features

- **User Authentication**
  - JWT-based signup and login
  - Secure route protection

- **Note Management**
  - Create, edit, and delete notes
  - Rich text editing with Quill.js

- **Realtime Collaboration**
  - Live note editing with Socket.io
  - Autosave every 10 seconds

- **Note Sharing & Permissions**
  - Share notes by user email
  - Role-based access: Owner, Collaborator, Viewer

- **Activity Logs**
  - Track who edited what and when

---

## Tech Stack

**Frontend:**
- React.js
- Context API / Redux Toolkit (if used)
- Quill.js (Rich Text Editor)
- Socket.io-client

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io
- JSON Web Tokens (JWT)
- Bcrypt.js (Password hashing)

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/collab-notes-app.git
cd collab-notes-app
