// 🐾 CONFIG
const SUPABASE_URL = 'https://ezdnztybarjtkgedenos.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZG56dHliYXJqdGtnZWRlbm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTQwNjYsImV4cCI6MjA2ODY3MDA2Nn0.AkbetAqtr9C1zG1qc54feMMNGIjvv016KZhEVG2CPJg';
const BUCKET = 'transfernest';

const fileInput = document.getElementById("fileInput");
const form = document.getElementById("uploadForm");
const uploadLink = document.getElementById("uploadLink");
const uploadHistoryEl = document.getElementById("uploadHistory");
const uploadCountEl = document.getElementById("uploadCount");
const totalSizeEl = document.getElementById("totalSize");
const dropArea = document.getElementById("drop-area");

const progressBar = document.createElement("progress");
progressBar.style.width = "100%";
progressBar.max = 100;
progressBar.value = 0;
form.appendChild(progressBar);

// 🐾 Supabase client
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🐾 LocalStorage Stats
let uploadCount = parseInt(localStorage.getItem("uploadCount") || "0");
let totalSize = parseInt(localStorage.getItem("totalSize") || "0");

function updateStatsDisplay() {
  uploadCountEl.textContent = uploadCount;
  totalSizeEl.textContent = (totalSize / 1024).toFixed(2) + " KB";
}
function getFileIcon(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  if (["png", "jpg", "jpeg", "gif", "bmp", "webp"].includes(ext)) return "🖼️";
  if (["txt", "md", "log"].includes(ext)) return "📄";
  if (["zip", "rar", "7z"].includes(ext)) return "🗜️";
  if (["js", "html", "css", "json"].includes(ext)) return "💻";
  return "📦";
}

function saveToHistory(name, link) {
  let history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
  history.unshift({ name, link });
  localStorage.setItem("uploadHistory", JSON.stringify(history.slice(0, 10)));
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
  uploadHistoryEl.innerHTML = "";
  for (const file of history) {
    const icon = getFileIcon(file.name);
    const entry = document.createElement("div");
    entry.className = "file-entry";
    entry.innerHTML = `<span class="file-icon">${icon}</span><a class="glow" href="${file.link}" target="_blank">${file.name}</a>`;
    uploadHistoryEl.appendChild(entry);
  }
}

// 🐾 Upload Logic
async function uploadFile(file) {
  if (file.size > 50 * 1024 * 1024) {
    uploadLink.textContent = "❌ File too big! Max is 50MB.";
    return;
  }
  const filename = Date.now() + "-" + file.name;

  try {
    // lil manual progress trick
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 10, 90);
      progressBar.value = progress;
    }, 150);

    const { data, error } = await client.storage
      .from(BUCKET)
      .upload(filename, file);

    clearInterval(interval);
    progressBar.value = 100;

    if (error) {
      uploadLink.textContent = `⚠️ Upload error: ${error.message}`;
      return;
    }

    // get public URL
    const { data: pub } = client.storage.from(BUCKET).getPublicUrl(filename);
    const link = pub.publicUrl;

    uploadLink.innerHTML = `✅ Uploaded: <a class="glow" href="${link}" target="_blank">${link}</a>`;
    uploadCount++;
    totalSize += file.size;
    localStorage.setItem("uploadCount", uploadCount);
    localStorage.setItem("totalSize", totalSize);
    saveToHistory(file.name, link);
    updateStatsDisplay();
    loadHistory();
  } catch (err) {
    uploadLink.textContent = "⚠️ Upload failed.";
    console.error(err);
  }
}

form.addEventListener("change", (e) => {
  const file = fileInput.files[0];
  if (file) uploadFile(file);
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("hover");
});
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("hover");
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("hover");
  const file = e.dataTransfer.files[0];
  if (file) uploadFile(file);
});

updateStatsDisplay();
loadHistory();
