// /js/audio-main.js
document.addEventListener("DOMContentLoaded", () => {
  const fileInput   = document.getElementById("audioFile");
  const transBtn    = document.getElementById("transcribeBtn");
  const outputBox   = document.getElementById("output");
  const resultMsg   = document.getElementById("resultMsg");

  if (!fileInput || !transBtn) return;

  transBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
      alert("Please upload an audio file first.");
      return;
    }

    // show "working..."
    outputBox.classList.remove("hidden");
    resultMsg.textContent = "Transcribing… (demo mode)";

    // 🔁 fake delay so UI feels real
    setTimeout(() => {
      // 👉 THIS is where you'd send `file` to your backend
      // e.g. fetch('/api/transcribe', { method: 'POST', body: formData })

      resultMsg.textContent =
        `Demo transcript for: ${file.name}
        
(You'll get the real transcript here once the backend/API is connected.)`;
    }, 1200);
  });
});
