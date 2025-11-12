document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("qrText");
  const btn = document.getElementById("generateQRBtn");
  const outputBox = document.getElementById("output");
  const canvas = document.getElementById("qrCanvas");
  const downloadLink = document.getElementById("downloadLink");

  // safety: make sure the QRCode lib exists
  if (typeof QRCode === "undefined") {
    console.error("QRCode library not loaded.");
    return;
  }

  btn.addEventListener("click", function () {
    const text = (input.value || "").trim();

    if (!text) {
      alert("Please enter a URL or text.");
      return;
    }

    // clear previous QR
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // generate
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
          alert("Could not generate QR. Check console.");
          return;
        }

        // show box
        outputBox.classList.remove("hidden");

        // make download work
        const dataURL = canvas.toDataURL("image/png");
        downloadLink.href = dataURL;
      }
    );
  });
});
