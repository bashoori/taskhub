document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("qrText");
  const btn = document.getElementById("generateQRBtn");
  const outputBox = document.getElementById("output");
  const canvas = document.getElementById("qrCanvas");
  const downloadLink = document.getElementById("downloadLink");

  // guard: library loaded?
  if (typeof QRCode === "undefined") {
    console.error("QRCode library not loaded.");
    return;
  }

  btn.addEventListener("click", function () {
    const text = (input.value || "").trim();

    if (!text) {
      alert("Please enter a URL or text.");
      input.focus();
      return;
    }

    // clear previous draw
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    QRCode.toCanvas(
      canvas,
      text,
      {
        width: 256,
        margin: 2,
        errorCorrectionLevel: "H",
      },
      function (err) {
        if (err) {
          console.error(err);
          alert("QR generation failed. Check console.");
          return;
        }

        // show box
        outputBox.classList.remove("hidden");

        // make download link
        const dataURL = canvas.toDataURL("image/png");
        downloadLink.href = dataURL;
      }
    );
  });
});
