




# 💬 Chat App Backend

This is the **backend service** for a real-time chat application, built with **Node.js, Express, MongoDB, and Socket.IO**.  
It powers authentication, messaging, file uploads, and live communication features for the chat app frontend.  

---

## 🚀 Features

- 🔐 **User Authentication** – Secure login & signup with JWT  
- 💬 **Real-time Messaging** – Private 1:1 chat powered by Socket.IO  
- 🖼 **Image Uploads** – Send images with Multer + Cloudinary integration  
- 📜 **Message Persistence** – Stores chat history in MongoDB  
- 🧑‍🤝‍🧑 **User Sidebar API** – Fetch all users except the logged-in user  
- ⚡ **Socket Events** – Instant delivery of new messages  
- 🛡 **Protected Routes** – Middleware-based authentication  

---

## 🛠 Tech Stack

- **Node.js** + **Express.js** – REST API  
- **MongoDB + Mongoose** – Database & schemas  
- **Socket.IO** – Real-time WebSockets  
- **Multer** – Handle file uploads (memory storage)  
- **Cloudinary** – Cloud image storage  
- **JWT Authentication** – Token-based security  

---

## 📂 Project Structure

```

chat_app_backend/
├── controllers/      # API route handlers
├── lib/              # Helpers (socket, cloudinary config)
├── middleware/       # Authentication middleware
├── models/           # MongoDB models (User, Message)
├── routes/           # Express routes
├── server.js         # Entry point
├── package.json
└── .env.example      # Example environment variables

````

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chat_app_backend.git
cd chat_app_backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory and add:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the server

For development with hot reload:

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

Server runs at:
👉 `http://localhost:5001`

---

## 📡 API Endpoints

### Auth

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login user
* `POST /api/auth/logout` → Logout user

### Users

* `GET /api/message/user` → Get all users (except logged-in user)

### Messages

* `GET /api/message/:id` → Fetch chat messages with user `:id`
* `POST /api/message/send/:id` → Send message (text/image) to user `:id`

---

## 🔌 Socket.IO Events

* `connection` – User connects to socket
* `newMessage` – Fired when a new message is sent/received
* `disconnect` – User disconnects

Example flow:

1. User A sends a message → API saves it to DB
2. Server emits `newMessage` → User B (receiver) gets it in real time

---

## 📷 Image Uploads

* Uses **Multer (memory storage)** to capture file
* Converts buffer → Base64 Data URI
* Uploads to **Cloudinary** in `chat_images` folder
* Returns `secure_url` which is stored in message object

---

## 🚀 Future Enhancements

* ✅ Group Chats
* ✅ Online/Offline Status
* ✅ Typing Indicators
* ✅ Message Reactions
* ✅ Video/Voice Calls (WebRTC)

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit changes
4. Push to your fork and submit a PR

---

## 📜 License

This project is licensed under the **MIT License**.
Feel free to use and modify as needed.

---
