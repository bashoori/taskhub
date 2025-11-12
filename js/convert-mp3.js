document.addEventListener("DOMContentLoaded", async () => {
  const { createFFmpeg, fetchFile } = FFmpeg;
  const ffmpeg = createFFmpeg({ log: true });
  const fileInput = document.getElementById("fileInput");
  const convertBtn = document.getElementById("convertBtn");
  const outputBox = document.getElementById("outputBox");
  const statusMsg = document.getElementById("statusMsg");
  const downloadLink = document.getElementById("downloadLink");

  convertBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Please choose a video or audio file.");

    outputBox.classList.remove("hidden");
    statusMsg.textContent = "Loading FFmpeg...";

    await ffmpeg.load();

    statusMsg.textContent = "Converting to MP3...";
    const inputFileName = file.name;
    const outputFileName = "output.mp3";

    ffmpeg.FS("writeFile", inputFileName, await fetchFile(file));

    await ffmpeg.run("-i", inputFileName, "-vn", "-ar", "44100", "-ac", "2", "-b:a", "192k", outputFileName);

    const data = ffmpeg.FS("readFile", outputFileName);
    const blob = new Blob([data.buffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
    statusMsg.textContent = "✅ Conversion complete!";
  });
});
document.addEventListener("DOMContentLoaded", async () => {
  const { createFFmpeg, fetchFile } = FFmpeg;
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/ffmpeg-core.js"
  });

  const fileInput = document.getElementById("fileInput");
  const convertBtn = document.getElementById("convertBtn");
  const outputBox = document.getElementById("outputBox");
  const statusMsg = document.getElementById("statusMsg");
  const downloadLink = document.getElementById("downloadLink");

  convertBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a video or audio file first.");
      return;
    }

    try {
      outputBox.classList.remove("hidden");
      statusMsg.textContent = "Loading FFmpeg (first time may take 10–20s)...";

      // Load FFmpeg core (only once)
      if (!ffmpeg.isLoaded()) await ffmpeg.load();

      statusMsg.textContent = "Converting to MP3...";

      const inputName = file.name;
      const outputName = "output.mp3";

      // Write file into memory
      ffmpeg.FS("writeFile", inputName, await fetchFile(file));

      // Run conversion
      await ffmpeg.run("-i", inputName, "-vn", "-ar", "44100", "-ac", "2", "-b:a", "192k", outputName);

      // Read converted file
      const data = ffmpeg.FS("readFile", outputName);
      const blob = new Blob([data.buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.download = inputName.replace(/\.[^/.]+$/, "") + ".mp3";
      statusMsg.textContent = "✅ Conversion complete!";
    } catch (err) {
      console.error(err);
      statusMsg.textContent = "❌ Conversion failed. Check console for details.";
    }
  });
});
