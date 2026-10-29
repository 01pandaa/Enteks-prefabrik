# Enteks Prefabrik — web sitesi

Tarsus merkezli Enteks Prefabrik için programatik SEO sitesi. Mersin'in 13 ilçesi, 3 ev tipi (prefabrik, çelik, Yutong) ve Tarsus'un tüm mahalleleri için ayrı sayfalar üretir.

## Üretilen sayfalar (191)

| Sayfa | Adres örneği |
|---|---|
| Ana sayfa | `/` |
| Ev tipi | `/prefabrik-ev/`, `/celik-ev/`, `/yutong-ev/` |
| İlçe | `/mersin/tarsus/` (13 ilçe) |
| İlçe × ev tipi | `/mersin/tarsus/celik-ev/` (39 sayfa) |
| Tarsus mahallesi | `/tarsus/gulek/` (123 mahalle) |
| Modeller | `/modeller/2-1-prefabrik-ev/` |
| Diğer | `/iletisim/`, `/hakkimizda/`, `/sss/`, `sitemap.xml`, `robots.txt` |

Her sayfada başlık/açıklama, canonical, Open Graph, `HomeAndConstructionBusiness`, `BreadcrumbList`, `FAQPage` ve `Service` şemaları, telefon ve WhatsApp düğmeleri ile WhatsApp'a mesaj hazırlayan teklif formu bulunur.

## İçeriği düzenleme

Tüm metinler `src/data.js` içindedir: firma bilgileri, ilçeler, mahalleler, modeller, SSS. Değiştirip `main` dalına gönderdiğinizde site otomatik yeniden yayınlanır.

```bash
npm run build      # dist/ klasörüne üretir
npm run serve      # yerelde önizleme
```

## Yayın

Site GitHub Pages'te **main dalının kökünden** yayınlanır (Settings → Pages → Deploy from a branch → `main` / `/ (root)`).
Adres: https://01pandaa.github.io/Enteks-prefabrik/

`src/` içinde bir değişiklik gönderildiğinde `.github/workflows/siteyi-uret.yml` sayfaları yeniden üretip köke kaydeder. Elle üretmek için: `npm run yayinla`.

Özel alan adı için depo ayarlarında **Actions variables** bölümüne `SITE_URL` (ör. `https://www.enteksprefabrik.com`) ve `CNAME` (ör. `www.enteksprefabrik.com`) ekleyin, ardından Actions sekmesinden "Siteyi üret" iş akışını bir kez çalıştırın.

Yayından sonra `sitemap.xml` adresini Google Search Console'a ekleyin.
