// Teklif formu: mesajı WhatsApp'ta hazır açar
document.querySelectorAll("form.quote").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const lines = [
      "Merhaba Enteks Prefabrik, teklif almak istiyorum.",
      "Ad: " + (d.get("ad") || ""),
      "Ev tipi: " + (d.get("tip") || ""),
      "Arsanın yeri: " + (d.get("yer") || ""),
      "Büyüklük: " + (d.get("boyut") || ""),
    ];
    if (d.get("not")) lines.push("Not: " + d.get("not"));
    window.open("https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });
});
