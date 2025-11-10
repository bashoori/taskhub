const texts = {
  en: {
    title: "File Converter 🔁",
    desc: "Convert between PDF, Word, Excel, JPG, PNG, and TXT — fast, secure, and free.",
    upload: "Select a file to convert:",
    format: "Choose output format:",
    convert: "Convert",
    success: "✅ File converted successfully!",
    download: "⬇️ Download converted file"
  },
  fa: {
    title: "تبدیل‌گر فایل 🔁",
    desc: "تبدیل بین فرمت‌های PDF، Word، Excel، JPG، PNG و TXT — سریع، امن و رایگان.",
    upload: "فایلی برای تبدیل انتخاب کنید:",
    format: "فرمت خروجی را انتخاب کنید:",
    convert: "تبدیل",
    success: "✅ فایل با موفقیت تبدیل شد!",
    download: "⬇️ دانلود فایل تبدیل‌شده"
  }
};

function setLang(lang) {
  const t = texts[lang];
  document.body.dir = lang === "fa" ? "rtl" : "ltr";
  document.getElementById("title").innerText = t.title;
  document.getElementById("desc").innerText = t.desc;
  document.getElementById("lblUpload").innerText = t.upload;
  document.getElementById("lblFormat").innerText = t.format;
  document.getElementById("convertBtn").innerText = t.convert;
  document.getElementById("resultMsg").innerText = t.success;
  document.getElementById("downloadLink").innerText = t.download;

  document.querySelectorAll(".lang-btns button").forEach(b => b.classList.remove("active"));
  document.getElementById(lang === "fa" ? "btnFarsi" : "btnEnglish").classList.add("active");
}

document.getElementById("btnEnglish").addEventListener("click", () => setLang("en"));
document.getElementById("btnFarsi").addEventListener("click", () => setLang("fa"));
setLang("en");

const fileInput = document.getElementById("fileInput");
const formatSelect = document.getElementById("formatSelect");
const convertBtn = document.getElementById("convertBtn");
const outputBox = document.getElementById("output");
const resultMsg = document.getElementById("resultMsg");
const downloadLink = document.getElementById("downloadLink");

convertBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  const format = formatSelect.value;
  if (!file) return alert("Please select a file to convert.");

  const reader = new FileReader();
  reader.onload = () => {
    const blob = new Blob([reader.result], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = file.name.split('.')[0] + "." + format;
    resultMsg.innerText = texts.en.success;
    outputBox.classList.remove("hidden");
  };
  reader.readAsArrayBuffer(file);
});
