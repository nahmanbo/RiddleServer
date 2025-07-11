# 🧠 Riddle Server

A modular Express.js server that manages players and riddles using local JSON-based `.txt` files.  
Built with clear separation of concerns: routing, controller logic, and file-based data access.

---

## 🎯 Project Goal

Create a backend server for a riddle game that supports full CRUD operations on two main entities: `players` and `riddles`.  
The server is designed to be easily extendable, and ready to connect with a client or terminal-based game.

---

## 📁 Project Structure

```
riddle-server/
├── app.js                  // Entry point of the Express server
│
├── routes/                 // Route definitions for players and riddles
│   ├── playerRouter.js
│   └── riddleRouter.js
│
├── controllers/            // Business logic separated from routes
│   ├── playerController.js
│   └── riddleController.js
│
├── dal/                    // File-based data access (CRUD logic)
│   ├── createItem.js
│   ├── readItems.js
│   ├── updateItem.js
│   └── deleteItem.js
│
├── utils/                  // Utility functions
│   └── loggerHelper.js     // Middleware: logs every HTTP request
│
├── lib/                    // Local text files storing data as JSON
│   ├── players.txt
│   └── riddles.txt
```

---

## 🛠️ Technologies Used

* Node.js  
* Express.js  
* JavaScript (ES Modules)  
* File System API (`fs/promises`)  
* Middleware pattern  
* Modular architecture  

---

## 🔁 Server Flow

```mermaid
flowchart TD
    A[Client Request] --> B[Express Router (/players or /riddles)]
    B --> C[Controller Function]
    C --> D[DAL File Access]
    D --> E[lib/players.txt or riddles.txt]
    E --> F[Return JSON Response]
```

---

## 🔹 API Overview

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | /players           | Get all players          |
| POST   | /players           | Add a new player         |
| PUT    | /players/:id       | Update player by ID      |
| GET    | /riddles           | Get all riddles          |
| POST   | /riddles           | Add a new riddle         |
| PUT    | /riddles/:id       | Update riddle by ID      |
| DELETE | /riddles/:id       | Delete riddle by ID      |

---

## 🚀 Installation & Run

1. Install dependencies (if needed):
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node app.js
   ```

3. Server runs at:
   ```
   http://localhost:1234
   ```

---

## 📞 Request Logging

Every HTTP request is automatically logged to the console via `loggerHelper.js`, showing method and URL:
```
Incoming request: method = GET, url = /riddles
```

---

📝 **Credits**

Built by Nahman Ben Or as part of the Riddle Game project (server-side).  
Designed for learning full-stack development using modular Node.js architecture.