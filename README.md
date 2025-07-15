# TransferNest

**TransferNest** is a lightweight file uploading and sharing service built with Node.js and vanilla HTML. It allows users to upload files and instantly receive a downloadable link to share.

---

## 🚀 Features

- 📁 Simple drag-n-drop file uploads  
- 🔗 Instant download links  
- 💡 Self-hostable backend with REST API  
- 🌐 Minimal frontend with iframe preview support  
- 🔒 Private links (if hosted securely)

---

## 📦 Project Structure

```
TransferNest/
├── index.html         # Frontend UI
├── server.js          # Node.js backend for file uploads
├── uploads/           # Uploaded files directory
└── README.md          # This file!
```

---

## 🛠️ Requirements

- Node.js (v14+)
- Express.js

---

## 🚧 Setup & Run

1. **Clone the repo:**
   ```bash
   git clone https://github.com/justdev-chris/TransferNest.git
   cd TransferNest
   ```

2. **Install dependencies:**
   ```bash
   npm install express multer
   ```

3. **Run the server:**
   ```bash
   node server.js
   ```

4. **Visit frontend:**
   Open `index.html` in your browser or deploy it using GitHub Pages.  
   Make sure the `backendURL` in the HTML points to your server.

---

## 🔒 Security Note

This project is intended for learning and lightweight use. For production, consider:

- Adding authentication
- Rate limiting
- Upload size restrictions
- HTTPS support

---

## 🐾 License

This project is under a **License** made by the creator.

You’re free to:
- Use and modify for personal or educational purposes.
- Share with credit back to the original repo or author.

You **cannot**:
- Resell or redistribute this project commercially.
- Remove credits or claim it as your own.
- Use it for malicious or illegal activity.

Contact the repo owner for special permissions or commercial use.

---

made with ☕ and code by justdev-chris💻✨  
because uploading should be very simple... its nice for 24/7 hosting tho
