# GreenPostel Global — Web Sitesi

İkinci nesil hibrit posta projesinin tanıtım sitesi. Next.js 14 + Tailwind + Framer Motion + next-intl.

## Diller (otomatik)
- `/tr` Türkçe · `/de` Almanca · `/en` İngilizce
- Ziyaretçi `/` adresine girdiğinde tarayıcı dili (Accept-Language) algılanır ve uygun dile yönlendirilir.
- Sağ üstteki seçiciyle manuel değiştirilebilir.

## Çalıştırma
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production derleme
npm start        # production sunucu
```

## Yapı
- `messages/{tr,de,en}.json` — tüm metinler (içerik buradan düzenlenir)
- `src/components/` — bölümler (Hero, Architecture animasyonlu akış, vb.)
- `src/i18n/` + `src/middleware.ts` — dil yönlendirme
- `public/logo.png` — şeffaf logo · `public/architecture-original.png` — orijinal diyagram

## İletişim bilgileri
`src/components/Contact.tsx` ve `Footer.tsx` içinde sabit (telefon / e-posta / web).

> Not: Sunum dosyasındaki finansal projeksiyonlar talep üzerine siteye dahil EDİLMEDİ.
