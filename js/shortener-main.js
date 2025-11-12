document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("urlInput");
  const btn = document.getElementById("shortenBtn");
  const outputBox = document.getElementById("output");
  const resultMsg = document.getElementById("resultMsg");
  const copyBtn = document.getElementById("copyBtn");

  btn.addEventListener("click", async function () {
    const url = (input.value || "").trim();
    if (!url) {
      alert("Please enter a valid URL.");
      input.focus();
      return;
    }

    try {
      resultMsg.textContent = "Shortening...";
      outputBox.classList.remove("hidden");
      copyBtn.classList.add("hidden");

      // Use TinyURL public API
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const shortUrl = await response.text();

      if (!shortUrl.startsWith("http")) throw new Error("Invalid response from API");

      resultMsg.innerHTML = `
        <strong>Shortened URL:</strong>
        <a href="${shortUrl}" target="_blank" rel="noopener noreferrer">${shortUrl}</a>
      `;
      copyBtn.classList.remove("hidden");

      copyBtn.onclick = () => {
        navigator.clipboard.writeText(shortUrl);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy Link"), 2000);
      };
    } catch (error) {
      console.error(error);
      resultMsg.textContent = "Error: Could not shorten this URL.";
    }
  });
});
