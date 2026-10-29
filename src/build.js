// Enteks Prefabrik — programatik SEO site üreticisi (bağımlılıksız)
// Kullanım: node src/build.js   (SITE_URL=https://alanadi.com ile özel alan adı)
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  company as C,
  services,
  districts,
  tarsusNeighborhoods,
  terrains,
  models,
  faqs,
} from "./data.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist");
const SITE_URL = (process.env.SITE_URL || "https://01pandaa.github.io/Enteks-prefabrik").replace(/\/$/, "");
const BASE = new URL(SITE_URL).pathname.replace(/\/$/, ""); // "" veya "/enteks-prefabrik"
const TODAY = new Date().toISOString().slice(0, 10);

// ---------- yardımcılar ----------
const trMap = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u" };
const slugify = (s) =>
  s.replace(/[çğıİöşüÇĞÖŞÜ]/g, (c) => trMap[c]).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const u = (p) => BASE + p; // site içi link
const abs = (p) => SITE_URL + p;
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const pick = (seed, arr) => arr[hash(seed) % arr.length];
const lc = (s) => s.toLocaleLowerCase("tr");
const ucFirst = (s) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);
const listTr = (arr) => (arr.length < 2 ? arr.join("") : arr.slice(0, -1).join(", ") + " ve " + arr.at(-1));

// Türkçe ek: "Tarsus'ta", "Mut'ta", "Anamur'da"
function locative(name) {
  const vowels = "aeıioöuü";
  const last = [...lc(name)].reverse().find((c) => vowels.includes(c)) || "e";
  const back = "aıou".includes(last);
  const end = lc(name).at(-1);
  const hard = "çfhkpsşt".includes(end);
  return `${name}'${hard ? "t" : "d"}${back ? "a" : "e"}`;
}

const tc = (s) => s.name.replace(/ ev$/, " Ev");
const svc = Object.fromEntries(services.map((s) => [s.slug, s]));
const dist = Object.fromEntries(districts.map((d) => [d.slug, d]));
for (const n of tarsusNeighborhoods) n.slug = slugify(n.name);

const waLink = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;

// ---------- teknik çizim (sayfanın imza öğesi) ----------
function drawing(kind = "prefabrik-ev", label = "") {
  const dim = (x1, y1, x2, y2, t, vertical = false) => {
    const tx = vertical ? x1 - 14 : (x1 + x2) / 2;
    const ty = vertical ? (y1 + y2) / 2 : y1 - 8;
    return `<g class="dim"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
      <line x1="${x1 - (vertical ? 5 : 0)}" y1="${y1 - (vertical ? 0 : 5)}" x2="${x1 + (vertical ? 5 : 0)}" y2="${y1 + (vertical ? 0 : 5)}"/>
      <line x1="${x2 - (vertical ? 5 : 0)}" y1="${y2 - (vertical ? 0 : 5)}" x2="${x2 + (vertical ? 5 : 0)}" y2="${y2 + (vertical ? 0 : 5)}"/>
      <text x="${tx}" y="${ty}" ${vertical ? `transform="rotate(-90 ${tx} ${ty})"` : ""}>${t}</text></g>`;
  };
  let body = "";
  if (kind === "celik-ev") {
    body = `
      <path class="wall" d="M70 250 V130 H330 V250 Z"/>
      <path class="wall" d="M70 130 V70 H250 V130"/>
      <path class="roof" d="M60 70 H262"/><path class="roof" d="M60 130 H342"/>
      <g class="frame"><line x1="135" y1="70" x2="135" y2="250"/><line x1="200" y1="70" x2="200" y2="250"/><line x1="265" y1="130" x2="265" y2="250"/>
      <line x1="70" y1="190" x2="330" y2="190"/><line x1="70" y1="100" x2="250" y2="100"/></g>
      <rect class="win" x="90" y="150" width="30" height="28"/><rect class="win" x="215" y="150" width="34" height="28"/>
      <rect class="win" x="150" y="82" width="34" height="34"/><rect class="door" x="282" y="196" width="28" height="54"/>
      ${dim(70, 280, 330, 280, "10,80 m")}${dim(36, 70, 36, 250, "6,20 m", true)}`;
  } else if (kind === "yutong-ev") {
    body = `
      <path class="wall" d="M60 250 V120 H340 V250 Z"/>
      <path class="roof" d="M48 120 H352 V108 H48 Z"/>
      <rect class="win" x="80" y="140" width="120" height="90"/>
      <line class="mull" x1="120" y1="140" x2="120" y2="230"/><line class="mull" x1="160" y1="140" x2="160" y2="230"/>
      <rect class="door" x="230" y="160" width="34" height="90"/>
      <rect class="win" x="282" y="150" width="40" height="40"/>
      <line class="deck" x1="40" y1="258" x2="360" y2="258"/>
      ${dim(60, 285, 340, 285, "12,00 m")}${dim(30, 108, 30, 250, "3,10 m", true)}`;
  } else {
    body = `
      <path class="wall" d="M80 250 V140 H320 V250 Z"/>
      <path class="roof" d="M60 148 L200 62 L340 148"/>
      <g class="frame"><line x1="140" y1="140" x2="140" y2="250"/><line x1="200" y1="140" x2="200" y2="250"/><line x1="260" y1="140" x2="260" y2="250"/></g>
      <rect class="win" x="100" y="165" width="28" height="30"/><rect class="win" x="272" y="165" width="28" height="30"/>
      <rect class="door" x="186" y="190" width="28" height="60"/>
      ${dim(80, 282, 320, 282, "8,40 m")}${dim(40, 62, 40, 250, "4,80 m", true)}`;
  }
  return `<figure class="drawing" aria-hidden="true">
    <svg viewBox="0 0 400 310" role="img">
      <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" class="grid"/></pattern></defs>
      <rect width="400" height="310" fill="url(#g)"/>
      <line class="ground" x1="20" y1="250" x2="380" y2="250"/>
      ${body}
    </svg>
    <figcaption>${esc(label || svc[kind]?.name || "")} · ön görünüş</figcaption>
  </figure>`;
}

// ---------- ortak bloklar ----------
function breadcrumbs(items) {
  const html = `<nav class="crumbs" aria-label="Sayfa yolu"><ol>${items
    .map((it, i) =>
      i === items.length - 1 ? `<li aria-current="page">${esc(it.name)}</li>` : `<li><a href="${u(it.path)}">${esc(it.name)}</a></li>`
    )
    .join("")}</ol></nav>`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
  return { html, ld };
}

function quoteForm({ place = "", service = "" } = {}) {
  const opts = services
    .map((s) => `<option value="${esc(s.name)}"${s.slug === service ? " selected" : ""}>${esc(s.name)}</option>`)
    .join("");
  return `<form class="quote" data-wa="${C.whatsapp}">
    <h2 id="teklif">Ücretsiz keşif ve teklif</h2>
    <p class="quote-note">Formu doldurun, mesajınız WhatsApp'ta hazır açılsın. Dilerseniz doğrudan <a href="tel:${C.phoneIntl}">${C.phoneDisplay}</a> numarasını arayın.</p>
    <label>Adınız<input name="ad" autocomplete="name" required></label>
    <label>Ev tipi<select name="tip">${opts}<option>Henüz karar vermedim</option></select></label>
    <label>Arsanın yeri<input name="yer" value="${esc(place)}" placeholder="Örn. Tarsus, Gülek"></label>
    <label>Yaklaşık büyüklük<select name="boyut"><option>1+1</option><option selected>2+1</option><option>3+1</option><option>Dubleks</option><option>Bilmiyorum</option></select></label>
    <label class="wide">Notunuz<textarea name="not" rows="3" placeholder="Arsa durumu, ne zaman başlamak istediğiniz…"></textarea></label>
    <button type="submit" class="btn btn-wa">WhatsApp'tan teklif iste</button>
  </form>`;
}

function faqBlock(list, heading = "Sık sorulan sorular") {
  const html = `<section class="faq"><h2>${esc(heading)}</h2>${list
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("")}</section>`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return { html, ld };
}

const steps = [
  ["Keşif", "Arsanıza gelir, zemini, yolu ve ölçüleri yerinde inceleriz."],
  ["Proje ve teklif", "Planı birlikte çizer, malzemeyi seçer, yazılı teklif veririz."],
  ["Üretim", "Paneller ve çelik profiller atölyede ölçüsüne göre hazırlanır."],
  ["Kurulum", "Zemin hazırlığının ardından ev arsanızda kurulur, anahtar teslim edilir."],
];
const processBlock = (place) => `<section class="process"><h2>${place ? esc(locative(place)) + " ev kurulumu" : "Ev nasıl kuruluyor"}</h2><ol>${steps
  .map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`)
  .join("")}</ol></section>`;

const callStrip = (text) => `<aside class="call-strip"><p>${esc(text)}</p><div class="call-actions">
  <a class="btn btn-call" href="tel:${C.phoneIntl}">Ara: ${C.phoneDisplay}</a>
  <a class="btn btn-ghost" href="${waLink("Merhaba, ev için bilgi almak istiyorum.")}" rel="noopener">WhatsApp</a></div></aside>`;

function serviceCards(placeSlug) {
  return `<ul class="svc-list">${services
    .map((s) => {
      const href = placeSlug ? `/mersin/${placeSlug}/${s.slug}/` : `/${s.slug}/`;
      const title = placeSlug ? `${dist[placeSlug].name} ${lc(s.name)}` : s.name;
      return `<li><a href="${u(href)}"><h3>${esc(ucFirst(title))}</h3><p>${esc(s.short)}</p></a></li>`;
    })
    .join("")}</ul>`;
}

const districtLinks = (svcSlug, exclude) =>
  `<ul class="district-grid">${districts
    .filter((d) => d.slug !== exclude)
    .map((d) => {
      const href = svcSlug ? `/mersin/${d.slug}/${svcSlug}/` : `/mersin/${d.slug}/`;
      return `<li><a href="${u(href)}">${esc(d.name)}${svcSlug ? ` <span>${esc(lc(svc[svcSlug].name))}</span>` : ""}</a></li>`;
    })
    .join("")}</ul>`;

// ---------- sayfa iskeleti ----------
const businessLD = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": abs("/#isletme"),
  name: C.name,
  url: abs("/"),
  telephone: C.phoneIntl,
  address: { "@type": "PostalAddress", addressLocality: C.base, addressRegion: C.city, addressCountry: "TR" },
  areaServed: districts.map((d) => ({ "@type": "City", name: `${d.name}, Mersin` })),
  sameAs: [C.instagram, C.tiktok],
  makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
};

function layout({ path, title, description, body, ld = [] }) {
  const schemas = [businessLD, ...ld].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="${C.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta name="theme-color" content="#1d3a33">
<link rel="icon" href="${u("/favicon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${u("/style.css")}">
${schemas}
</head>
<body>
<a class="skip" href="#icerik">İçeriğe geç</a>
<header class="site-head">
  <a class="brand" href="${u("/")}"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 15 16 5l13 10v13H3z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M11 28V18h10v10" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>Enteks <b>Prefabrik</b></a>
  <nav class="main-nav" aria-label="Ana menü">
    <a href="${u("/prefabrik-ev/")}">Prefabrik ev</a>
    <a href="${u("/celik-ev/")}">Çelik ev</a>
    <a href="${u("/yutong-ev/")}">Yutong ev</a>
    <a href="${u("/modeller/")}">Modeller</a>
    <a href="${u("/mersin/")}">Bölgeler</a>
    <a href="${u("/iletisim/")}">İletişim</a>
  </nav>
  <a class="head-call" href="tel:${C.phoneIntl}">${C.phoneDisplay}</a>
</header>
<main id="icerik">
${body}
</main>
<footer class="site-foot">
  <div class="foot-cols">
    <div>
      <p class="foot-brand">Enteks Prefabrik</p>
      <p>Tarsus merkezli; Mersin'in tüm ilçelerinde prefabrik ev, çelik ev ve Yutong ev üretimi ve kurulumu.</p>
      <p><a href="tel:${C.phoneIntl}">${C.phoneDisplay}</a></p>
      <p class="social"><a href="${C.instagram}" rel="noopener">Instagram</a> <a href="${C.tiktok}" rel="noopener">TikTok</a></p>
    </div>
    <div>
      <p class="foot-h">Ev tipleri</p>
      <ul>${services.map((s) => `<li><a href="${u(`/${s.slug}/`)}">${s.name}</a></li>`).join("")}<li><a href="${u("/modeller/")}">Tüm modeller</a></li></ul>
    </div>
    <div class="foot-wide">
      <p class="foot-h">Mersin ilçeleri</p>
      <ul class="foot-districts">${districts.map((d) => `<li><a href="${u(`/mersin/${d.slug}/`)}">${d.name}</a></li>`).join("")}</ul>
    </div>
  </div>
  <p class="foot-legal">© ${new Date().getFullYear()} Enteks Prefabrik · <a href="${u("/hakkimizda/")}">Hakkımızda</a> · <a href="${u("/sss/")}">Sık sorulanlar</a> · <a href="${u("/tarsus-mahalleleri/")}">Tarsus mahalleleri</a></p>
</footer>
<div class="mobile-bar">
  <a href="tel:${C.phoneIntl}">Hemen ara</a>
  <a href="${waLink("Merhaba, ev için bilgi almak istiyorum.")}" rel="noopener">WhatsApp</a>
</div>
<script src="${u("/main.js")}" defer></script>
</body>
</html>`;
}

// ---------- sayfalar ----------
const pages = [];
const add = (p) => pages.push(p);

// Ana sayfa
{
  const f = faqBlock(faqs.slice(0, 4));
  add({
    path: "/",
    priority: "1.0",
    title: "Mersin Prefabrik Ev, Çelik Ev ve Yutong Ev | Enteks Prefabrik Tarsus",
    description:
      "Tarsus merkezli Enteks Prefabrik; Mersin'in tüm ilçelerinde prefabrik ev, çelik ev ve Yutong ev yapıyor. Ücretsiz keşif ve teklif: 0545 641 29 09.",
    ld: [f.ld],
    body: `
<section class="hero">
  <div class="hero-text">
    <h1>Tarsus'tan Mersin'in her köşesine prefabrik, çelik ve Yutong ev</h1>
    <p class="lead">Arsanıza gelip ölçüyoruz, planı birlikte çiziyoruz, evinizi atölyede hazırlayıp yerinde kuruyoruz. Bağ evinden kalıcı aile evine kadar.</p>
    <div class="hero-actions">
      <a class="btn btn-call" href="tel:${C.phoneIntl}">Ara: ${C.phoneDisplay}</a>
      <a class="btn btn-ghost" href="#teklif">Teklif formu</a>
    </div>
  </div>
  ${drawing("prefabrik-ev", "2+1 prefabrik ev")}
</section>
<section class="band"><h2>Üç ev tipi, tek ekip</h2>${serviceCards()}</section>
<section class="band"><h2>Mersin'de hizmet verdiğimiz ilçeler</h2><p class="section-lead">Merkezimiz Tarsus'ta. Keşif için Mersin'in 13 ilçesinin tamamına geliyoruz.</p>${districtLinks()}</section>
${processBlock()}
<section class="band two-col">
  <div><h2>Kimler için kuruyoruz</h2>
  <ul class="ticks"><li>Narenciye bahçesine ya da tarlasına bağ evi isteyenler</li><li>Köyünde, arsasında kalıcı ev yaptırmak isteyen aileler</li><li>Sahilde ya da yaylada yazlık arayanlar</li><li>Şantiye, sera ve tesis için hızlı bina gerekenler</li></ul></div>
  <div><h2>Tarsus mahalleleri</h2><p>Tarsus'un ${tarsusNeighborhoods.length} mahallesinin her biri için ayrı bilgi sayfamız var.</p><p><a class="text-link" href="${u("/tarsus-mahalleleri/")}">Mahallenizi bulun</a></p></div>
</section>
${f.html}
${quoteForm()}`,
  });
}

// Hizmet ana sayfaları
for (const s of services) {
  const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: s.name, path: `/${s.slug}/` }]);
  const f = faqBlock(faqs.slice(0, 5));
  const relModels = models.filter((m) => m.services.includes(s.slug));
  add({
    path: `/${s.slug}/`,
    priority: "0.9",
    title: `Mersin ${tc(s)} Fiyatları ve Modelleri | Tarsus ${tc(s)} | Enteks Prefabrik`,
    description: `Mersin ve Tarsus'ta ${lc(s.name)}: ${s.short} ${listTr(s.uses.slice(0, 3))} için ücretsiz keşif. ${C.phoneDisplay}`,
    ld: [bc.ld, f.ld, { "@context": "https://schema.org", "@type": "Service", name: `${s.name} yapımı`, serviceType: s.name, provider: { "@id": abs("/#isletme") }, areaServed: "Mersin" }],
    body: `${bc.html}
<section class="hero">
  <div class="hero-text"><h1>Mersin ${lc(s.name)} yapımı</h1><p class="lead">${esc(s.intro)}</p>
  <div class="hero-actions"><a class="btn btn-call" href="tel:${C.phoneIntl}">Ara: ${C.phoneDisplay}</a><a class="btn btn-ghost" href="#teklif">Teklif formu</a></div></div>
  ${drawing(s.slug)}
</section>
<section class="band two-col"><div><h2>Neden ${lc(s.name)}</h2><ul class="ticks">${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
<div><h2>Nerelerde kullanılır</h2><p>${esc(ucFirst(listTr(s.uses)))} olarak kuruyoruz.</p>
<h3>Uygun modeller</h3><ul class="plain">${relModels.map((m) => `<li><a href="${u(`/modeller/${m.slug}/`)}">${esc(m.name)}</a> · ${esc(m.area)}</li>`).join("")}</ul></div></section>
<section class="band"><h2>İlçe ilçe Mersin ${lc(s.name)}</h2>${districtLinks(s.slug)}</section>
${processBlock()}
${f.html}
${quoteForm({ service: s.slug })}`,
  });
}

// Bölgeler dizini
{
  const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "Mersin ilçeleri", path: "/mersin/" }]);
  add({
    path: "/mersin/",
    priority: "0.8",
    title: "Mersin İlçelerinde Prefabrik, Çelik ve Yutong Ev | Enteks Prefabrik",
    description: "Mersin'in 13 ilçesinde prefabrik ev, çelik ev ve Yutong ev kurulumu. İlçenizi seçin, ücretsiz keşif isteyin.",
    ld: [bc.ld],
    body: `${bc.html}<section class="band"><h1>Mersin'in tüm ilçelerinde ev kurulumu</h1><p class="section-lead">Tarsus'taki atölyemizden Mersin'in doğusundan batısına kadar her ilçeye geliyoruz.</p>
${districts.map((d) => `<article class="district-row"><h2><a href="${u(`/mersin/${d.slug}/`)}">${esc(d.name)}</a></h2><p>${esc(d.about)}</p><p class="row-links">${services.map((s) => `<a href="${u(`/mersin/${d.slug}/${s.slug}/`)}">${esc(d.name)} ${lc(s.name)}</a>`).join(" ")}</p></article>`).join("")}
</section>${quoteForm()}`,
  });
}

// İlçe sayfaları ve ilçe × hizmet sayfaları
for (const d of districts) {
  const terr = d.terrain.map((t) => terrains[t]);
  const near = d.neighbors.map((n) => dist[n]);
  const placesText = listTr(d.places);
  {
    const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "Mersin", path: "/mersin/" }, { name: d.name, path: `/mersin/${d.slug}/` }]);
    const localFaq = [
      { q: `${locative(d.name)} keşfe geliyor musunuz?`, a: `Evet. ${d.home ? "Merkezimiz Tarsus'ta olduğu için Tarsus'ta keşfi genellikle hızlı ayarlıyoruz." : `${d.name} için keşif gününü telefonda birlikte belirliyoruz.`} Keşif ve teklif ücretsizdir.` },
      ...faqs.slice(0, 3),
    ];
    const f = faqBlock(localFaq, `${d.name} için sık sorulanlar`);
    add({
      path: `/mersin/${d.slug}/`,
      priority: d.home ? "0.95" : "0.8",
      title: `${d.name} Prefabrik Ev, Çelik Ev, Yutong Ev | Enteks Prefabrik`,
      description: `${locative(d.name)} prefabrik ev, çelik ev ve Yutong ev yapımı. ${d.demand} Ücretsiz keşif: ${C.phoneDisplay}`,
      ld: [bc.ld, f.ld],
      body: `${bc.html}
<section class="hero"><div class="hero-text"><h1>${esc(locative(d.name))} prefabrik, çelik ve Yutong ev</h1><p class="lead">${esc(d.about)}</p>
<div class="hero-actions"><a class="btn btn-call" href="tel:${C.phoneIntl}">Ara: ${C.phoneDisplay}</a><a class="btn btn-ghost" href="#teklif">Teklif formu</a></div></div>
${drawing(pick(d.slug, services).slug)}</section>
<section class="band"><h2>${esc(d.name)} için ev tipleri</h2>${serviceCards(d.slug)}</section>
<section class="band two-col"><div><h2>${esc(d.name)} arazisine göre öneriler</h2>${terr.map((t) => `<p>${esc(t.advice)}</p>`).join("")}</div>
<div><h2>Çalıştığımız yerler</h2><p>${esc(d.demand)}</p><p>${esc(placesText)} başta olmak üzere ${esc(d.name)} genelinde keşfe geliyoruz.</p>
${d.home ? `<p><a class="text-link" href="${u("/tarsus-mahalleleri/")}">Tarsus'un tüm mahalleleri</a></p>` : ""}</div></section>
${processBlock(d.name)}
<section class="band"><h2>Yakın ilçeler</h2><ul class="district-grid">${near.map((n) => `<li><a href="${u(`/mersin/${n.slug}/`)}">${esc(n.name)}</a></li>`).join("")}</ul></section>
${f.html}
${quoteForm({ place: d.name })}`,
    });
  }

  for (const s of services) {
    const path = `/mersin/${d.slug}/${s.slug}/`;
    const bc = breadcrumbs([
      { name: "Ana sayfa", path: "/" },
      { name: s.name, path: `/${s.slug}/` },
      { name: d.name, path: `/mersin/${d.slug}/` },
      { name: `${d.name} ${lc(s.name)}`, path },
    ]);
    const seed = d.slug + s.slug;
    const opener = pick(seed, [
      `${locative(d.name)} ${lc(s.name)} yaptırmak isteyenler için keşiften anahtar teslimine kadar bütün işi üstleniyoruz.`,
      `${d.name} ${lc(s.name)} projelerinde arsayı yerinde görüp planı ona göre çiziyoruz.`,
      `${d.name} için ${lc(s.name)} ararken ilk adım ücretsiz keşif: arsanıza gelir, ölçer, seçenekleri anlatırız.`,
    ]);
    const relModels = models.filter((m) => m.services.includes(s.slug));
    const localFaq = [
      { q: `${d.name} ${lc(s.name)} fiyatı ne kadar?`, a: `${locative(d.name)} ${lc(s.name)} fiyatı metrekareye, plana, malzemeye ve arsanın ulaşımına göre değişir. Keşiften sonra yazılı ve kalem kalem teklif veriyoruz.` },
      { q: `${locative(d.name)} hangi ${lc(s.name)} modelleri kurulabilir?`, a: `${relModels.map((m) => m.name).join(", ")} başta olmak üzere planı arsanıza göre uyarlıyoruz.` },
      ...faqs.slice(1, 4),
    ];
    const f = faqBlock(localFaq, `${d.name} ${lc(s.name)} hakkında sorular`);
    add({
      path,
      priority: d.home ? "0.9" : "0.7",
      title: `${d.name} ${tc(s)} Fiyatları ve Modelleri | Enteks Prefabrik`,
      description: `${locative(d.name)} ${lc(s.name)}: ${s.short} ${d.places[0]} ve çevresinde ücretsiz keşif. ${C.phoneDisplay}`,
      ld: [bc.ld, f.ld, { "@context": "https://schema.org", "@type": "Service", name: `${d.name} ${lc(s.name)}`, serviceType: s.name, provider: { "@id": abs("/#isletme") }, areaServed: { "@type": "City", name: `${d.name}, Mersin` } }],
      body: `${bc.html}
<section class="hero"><div class="hero-text"><h1>${esc(d.name)} ${esc(lc(s.name))}</h1><p class="lead">${esc(opener)} ${esc(s.intro)}</p>
<div class="hero-actions"><a class="btn btn-call" href="tel:${C.phoneIntl}">Ara: ${C.phoneDisplay}</a><a class="btn btn-wa-ghost btn-ghost" href="${waLink(`Merhaba, ${d.name} için ${lc(s.name)} hakkında bilgi almak istiyorum.`)}" rel="noopener">WhatsApp'tan yaz</a></div></div>
${drawing(s.slug)}</section>
<section class="band two-col"><div><h2>${esc(d.name)} ${esc(lc(s.name))} avantajları</h2><ul class="ticks">${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
<div><h2>${esc(d.name)} iklimine uygun yapı</h2>${terr.map((t) => `<p>${esc(t.advice)} ${esc(t.heat)}</p>`).join("")}</div></section>
<section class="band"><h2>${esc(d.name)} için ${esc(lc(s.name))} modelleri</h2><ul class="model-list">${relModels
        .map((m) => `<li><a href="${u(`/modeller/${m.slug}/`)}"><h3>${esc(m.name)}</h3><p class="model-area">${esc(m.area)}</p><p>${esc(m.fit)}</p></a></li>`)
        .join("")}</ul><p class="note">Ölçüler örnektir; plan arsanıza ve isteğinize göre değişir.</p></section>
<section class="band"><h2>${esc(d.name)} içinde nerelere kuruyoruz</h2><p>${esc(d.demand)} ${esc(placesText)} çevresi dahil ${esc(d.name)} genelinde ${esc(lc(s.plural))} için keşfe geliyoruz. En çok ${esc(listTr(s.uses.slice(0, 3)))} olarak isteniyor.</p>
${d.home ? `<p><a class="text-link" href="${u("/tarsus-mahalleleri/")}">Mahallenizi seçin</a></p>` : ""}</section>
${processBlock(d.name)}
<section class="band"><h2>${esc(d.name)} için diğer ev tipleri</h2><ul class="district-grid">${services
        .filter((x) => x.slug !== s.slug)
        .map((x) => `<li><a href="${u(`/mersin/${d.slug}/${x.slug}/`)}">${esc(d.name)} ${esc(lc(x.name))}</a></li>`)
        .join("")}</ul>
<h2 class="sub">Diğer ilçelerde ${esc(lc(s.name))}</h2>${districtLinks(s.slug, d.slug)}</section>
${f.html}
${quoteForm({ place: d.name, service: s.slug })}`,
    });
  }
}

// Tarsus mahalle dizini
{
  const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "Tarsus", path: "/mersin/tarsus/" }, { name: "Tarsus mahalleleri", path: "/tarsus-mahalleleri/" }]);
  const groups = {};
  for (const n of [...tarsusNeighborhoods].sort((a, b) => a.name.localeCompare(b.name, "tr"))) {
    const k = n.name.charAt(0).toLocaleUpperCase("tr");
    (groups[k] ||= []).push(n);
  }
  add({
    path: "/tarsus-mahalleleri/",
    priority: "0.8",
    title: "Tarsus Mahallelerinde Prefabrik Ev, Çelik Ev ve Yutong Ev | Enteks Prefabrik",
    description: `Tarsus'un ${tarsusNeighborhoods.length} mahallesinde prefabrik ev, çelik ev ve Yutong ev kurulumu. Mahallenizi seçin, ücretsiz keşif isteyin.`,
    ld: [bc.ld],
    body: `${bc.html}<section class="band"><h1>Tarsus mahallelerinde ev kurulumu</h1><p class="section-lead">Tarsus merkezli olduğumuz için ilçenin her mahallesine, köy kökenli mahallelerden şehir merkezine kadar keşfe geliyoruz.</p>
<div class="alpha">${Object.entries(groups)
      .map(([k, list]) => `<div class="alpha-group"><h2>${k}</h2><ul>${list.map((n) => `<li><a href="${u(`/tarsus/${n.slug}/`)}">${esc(n.name)}</a></li>`).join("")}</ul></div>`)
      .join("")}</div></section>${quoteForm({ place: "Tarsus" })}`,
  });
}

// Tarsus mahalle sayfaları
const tarsusDistrict = dist.tarsus;
tarsusNeighborhoods.forEach((n, i) => {
  const path = `/tarsus/${n.slug}/`;
  const full = `Tarsus ${n.name}`;
  const bc = breadcrumbs([
    { name: "Ana sayfa", path: "/" },
    { name: "Tarsus", path: "/mersin/tarsus/" },
    { name: "Mahalleler", path: "/tarsus-mahalleleri/" },
    { name: n.name, path },
  ]);
  const t = terrains[n.terrain];
  const context = n.urban
    ? pick(n.slug, [
        `${n.name} Mahallesi, Tarsus'un yerleşik dokusu içinde yer alıyor. Burada en çok bahçeli evlere ek bina, iş yeri ofisi ve küçük arsalarda tek katlı ev soruluyor.`,
        `${n.name}, Tarsus'un şehir mahallelerinden. Sınırlı arsalarda alanı iyi kullanan 1+1 ve 2+1 planlar ile bahçeye misafir evi öne çıkıyor.`,
        `${n.name} gibi merkeze yakın mahallelerde dar parsellere uygun, hızlı kurulan ve komşuyu rahatsız etmeyen kısa şantiyeli çözümler tercih ediliyor.`,
      ])
    : pick(n.slug, [
        `${n.name}, Tarsus'un kırsal mahallelerinden. Tarla, bahçe ve geniş arsalarda bağ evi, kalıcı köy evi ve ek bina kuruyoruz.`,
        `${n.name} çevresinde tarım arazileri geniş yer tutuyor. Bahçe başına bağ evi ya da aile için kalıcı çelik ev en sık istenenler.`,
        `${locative(n.name)} arsa sahipleri çoğunlukla bağ evi, yazlık ya da çocukları için ikinci bir ev kurduruyor; geniş arazide dubleks çelik ev de mümkün.`,
      ]);
  const prev = tarsusNeighborhoods[(i - 1 + tarsusNeighborhoods.length) % tarsusNeighborhoods.length];
  const nexts = [1, 2, 3, 4].map((k) => tarsusNeighborhoods[(i + k) % tarsusNeighborhoods.length]);
  const localFaq = [
    { q: `${full} için keşfe ne zaman gelebilirsiniz?`, a: `Merkezimiz Tarsus'ta olduğundan ${n.name} için keşfi kısa sürede planlıyoruz. Telefonla ya da WhatsApp'tan gün belirleyebilirsiniz.` },
    { q: `${locative(n.name)} hangi ev tipini önerirsiniz?`, a: n.urban ? "Şehir içi arsalarda 1+1 ve 2+1 prefabrik ya da Yutong ev hızlı ve pratik olur; kalıcı oturum için çelik ev öneriyoruz." : "Bağ evi ve hafta sonu için prefabrik ya da Yutong ev, kalıcı aile evi için çelik ev öneriyoruz." },
    ...faqs.slice(0, 3),
  ];
  const f = faqBlock(localFaq, `${full} hakkında sorular`);
  add({
    path,
    priority: "0.6",
    title: `${full} Prefabrik Ev, Çelik Ev, Yutong Ev | Enteks Prefabrik`,
    description: `${full} ${n.urban ? "Mahallesi'nde" : "bölgesinde"} prefabrik ev, çelik ev ve Yutong ev yapımı. Tarsus merkezli ekip, ücretsiz keşif: ${C.phoneDisplay}`,
    ld: [bc.ld, f.ld],
    body: `${bc.html}
<section class="hero"><div class="hero-text"><h1>${esc(full)} prefabrik, çelik ve Yutong ev</h1><p class="lead">${esc(context)}</p>
<div class="hero-actions"><a class="btn btn-call" href="tel:${C.phoneIntl}">Ara: ${C.phoneDisplay}</a><a class="btn btn-ghost" href="${waLink(`Merhaba, Tarsus ${n.name} için ev hakkında bilgi almak istiyorum.`)}" rel="noopener">WhatsApp'tan yaz</a></div></div>
${drawing(pick(n.slug, services).slug)}</section>
<section class="band"><h2>${esc(n.name)} için ev tipleri</h2><ul class="svc-list">${services
      .map((s) => `<li><a href="${u(`/mersin/tarsus/${s.slug}/`)}"><h3>${esc(n.name)} ${esc(lc(s.name))}</h3><p>${esc(s.short)}</p></a></li>`)
      .join("")}</ul></section>
<section class="band two-col"><div><h2>${esc(n.name)} arazisine uygun yapı</h2><p>${esc(t.advice)}</p><p>${esc(t.heat)}</p></div>
<div><h2>Neden Tarsus'tan bir ekip</h2><p>Atölyemiz Tarsus'ta. ${esc(n.name)} için malzeme taşıma ve ekip yolu kısa olduğundan keşif, kurulum ve sonrasındaki servis daha hızlı ilerliyor.</p></div></section>
${processBlock(n.name)}
<section class="band"><h2>Yakındaki diğer Tarsus mahalleleri</h2><ul class="district-grid">${[prev, ...nexts]
      .map((x) => `<li><a href="${u(`/tarsus/${x.slug}/`)}">${esc(x.name)}</a></li>`)
      .join("")}<li><a href="${u("/tarsus-mahalleleri/")}">Tüm mahalleler</a></li></ul></section>
${f.html}
${quoteForm({ place: full })}`,
  });
});

// Modeller
{
  const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "Modeller", path: "/modeller/" }]);
  add({
    path: "/modeller/",
    priority: "0.8",
    title: "Prefabrik ve Çelik Ev Modelleri: 1+1, 2+1, 3+1, Dubleks | Enteks Prefabrik",
    description: "1+1, 2+1, 3+1, dubleks çelik ev, bağ evi ve şantiye binası modelleri. Mersin ve Tarsus'ta isteğe göre plan.",
    ld: [bc.ld],
    body: `${bc.html}<section class="band"><h1>Ev modelleri</h1><p class="section-lead">Aşağıdaki planlar başlangıç noktasıdır; oda sayısı, ölçü ve cephe isteğinize göre değişir.</p>
<ul class="model-list">${models.map((m) => `<li><a href="${u(`/modeller/${m.slug}/`)}"><h2>${esc(m.name)}</h2><p class="model-area">${esc(m.area)}</p><p>${esc(m.rooms)}</p><p>${esc(m.fit)}</p></a></li>`).join("")}</ul></section>${quoteForm()}`,
  });
  for (const m of models) {
    const path = `/modeller/${m.slug}/`;
    const mbc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "Modeller", path: "/modeller/" }, { name: m.name, path }]);
    const f = faqBlock(faqs.slice(0, 4));
    add({
      path,
      priority: "0.7",
      title: `${m.name} Modeli (${m.area}) | Mersin Tarsus | Enteks Prefabrik`,
      description: `${m.name}: ${m.rooms}. ${m.fit} Mersin ve Tarsus'ta kurulum, ücretsiz keşif.`,
      ld: [mbc.ld, f.ld],
      body: `${mbc.html}
<section class="hero"><div class="hero-text"><h1>${esc(m.name)}</h1><p class="lead">${esc(m.fit)}</p>
<dl class="specs"><div><dt>Alan</dt><dd>${esc(m.area)}</dd></div><div><dt>Plan</dt><dd>${esc(m.rooms)}</dd></div><div><dt>Yapılabildiği tipler</dt><dd>${m.services.map((x) => `<a href="${u(`/${x}/`)}">${esc(svc[x].name)}</a>`).join(", ")}</dd></div></dl>
<div class="hero-actions"><a class="btn btn-call" href="tel:${C.phoneIntl}">Ara: ${C.phoneDisplay}</a><a class="btn btn-ghost" href="#teklif">Teklif formu</a></div></div>
${drawing(m.services[0], m.name)}</section>
<section class="band"><h2>${esc(m.name)} kurduğumuz ilçeler</h2>${districtLinks(m.services[0])}</section>
${f.html}${quoteForm({ service: m.services[0] })}`,
    });
  }
}

// İletişim, hakkımızda, SSS
{
  const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "İletişim", path: "/iletisim/" }]);
  add({
    path: "/iletisim/",
    priority: "0.7",
    title: "İletişim | Enteks Prefabrik Tarsus Mersin",
    description: `Enteks Prefabrik iletişim: ${C.phoneDisplay}. Tarsus merkezli, Mersin'in tüm ilçelerine prefabrik, çelik ve Yutong ev.`,
    ld: [bc.ld],
    body: `${bc.html}<section class="band contact"><h1>Bize ulaşın</h1>
<ul class="contact-list"><li><span>Telefon</span><a href="tel:${C.phoneIntl}">${C.phoneDisplay}</a></li>
<li><span>WhatsApp</span><a href="${waLink("Merhaba, ev için bilgi almak istiyorum.")}" rel="noopener">${C.phoneDisplay}</a></li>
<li><span>Instagram</span><a href="${C.instagram}" rel="noopener">@enteksprefabrik33</a></li>
<li><span>TikTok</span><a href="${C.tiktok}" rel="noopener">@enteksprefabrik</a></li>
<li><span>Hizmet bölgesi</span>Tarsus merkezli, Mersin'in tüm ilçeleri</li></ul></section>${quoteForm()}`,
  });
}
{
  const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "Hakkımızda", path: "/hakkimizda/" }]);
  add({
    path: "/hakkimizda/",
    priority: "0.5",
    title: "Hakkımızda | Enteks Prefabrik Tarsus",
    description: "Enteks Prefabrik, Tarsus merkezli olarak Mersin genelinde prefabrik ev, çelik ev ve Yutong ev üretip kuruyor.",
    ld: [bc.ld],
    body: `${bc.html}<section class="band prose"><h1>Enteks Prefabrik</h1>
<p>Enteks Prefabrik, Tarsus'ta kurulu bir prefabrik ve çelik yapı firmasıdır. Mersin'in tüm ilçelerinde prefabrik ev, galvanizli hafif çelik ev ve Yutong tipi modüler ev üretiyor ve kuruyoruz.</p>
<p>İşe her zaman arsayı yerinde görerek başlıyoruz. Zemin, yol, güneş yönü ve iklim; planı ve malzemeyi belirleyen şeyler. Sahilde nem, yaylada kar, ovada yaz sıcağı için farklı çözümler uyguluyoruz.</p>
<p>Çalışmalarımızı <a href="${C.instagram}" rel="noopener">Instagram</a> ve <a href="${C.tiktok}" rel="noopener">TikTok</a> hesaplarımızda paylaşıyoruz.</p></section>
${processBlock()}${callStrip("Arsanız için ücretsiz keşif isteyin.")}`,
  });
}
{
  const bc = breadcrumbs([{ name: "Ana sayfa", path: "/" }, { name: "Sık sorulanlar", path: "/sss/" }]);
  const f = faqBlock(faqs, "Sık sorulan sorular");
  add({
    path: "/sss/",
    priority: "0.6",
    title: "Prefabrik ve Çelik Ev Hakkında Sık Sorulan Sorular | Enteks Prefabrik",
    description: "Prefabrik ev fiyatı, kurulum süresi, ruhsat, zemin ve plan değişikliği hakkında sık sorulan sorular.",
    ld: [bc.ld, f.ld],
    body: `${bc.html}<div class="faq-page">${f.html.replace("<h2>", "<h1>").replace("</h2>", "</h1>")}</div>${callStrip("Sorunuzun cevabı yoksa bizi arayın.")}`,
  });
}

// ---------- yaz ----------
rmSync(OUT, { recursive: true, force: true });
for (const p of pages) {
  const file = join(OUT, p.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, layout(p));
}
writeFileSync(
  join(OUT, "404.html"),
  layout({
    path: "/404.html",
    title: "Sayfa bulunamadı | Enteks Prefabrik",
    description: "Aradığınız sayfa bulunamadı.",
    body: `<section class="band"><h1>Bu sayfa bulunamadı</h1><p>Adres değişmiş olabilir. <a href="${u("/")}">Ana sayfaya</a> dönün ya da <a href="${u("/mersin/")}">ilçenizi seçin</a>.</p></section>`,
  }).replace("<head>", '<head>\n<meta name="robots" content="noindex">')
);
for (const f of ["style.css", "main.js", "favicon.svg"]) copyFileSync(join(ROOT, "src", f), join(OUT, f));
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${TODAY}</lastmod><priority>${p.priority || "0.5"}</priority></url>`)
    .join("\n")}\n</urlset>\n`
);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`);
writeFileSync(join(OUT, ".nojekyll"), "");
if (process.env.CNAME) writeFileSync(join(OUT, "CNAME"), process.env.CNAME + "\n");
console.log(`${pages.length} sayfa üretildi → ${OUT} (SITE_URL=${SITE_URL})`);
