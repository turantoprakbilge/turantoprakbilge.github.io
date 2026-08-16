# Toprak Bilge - Personal Portfolio & CV Website

Modern, responsive, high-performance portfolio and CV website designed specifically for international job applications in **BI & Analytics Engineering**, **Data Platform Engineering** (Databricks, PySpark, Azure Synapse), and **Applied AI / LLMs**.

---

## 🚀 Projeyi Yerelde Önizleme (Local Preview)

Herhangi bir sunucu veya eklentiyle açabilirsiniz:
- Tarayıcınızda doğrudan [`index.html`](./index.html) dosyasını çift tıklayarak açabilirsiniz.
- Veya VS Code / Antigravity IDE içinden **Live Server** ile `http://localhost:5500` üzerinden görüntüleyebilirsiniz.

---

## 🌐 Ücretsiz Canlıya Alma (Hosting) Rehberi

Sitenizi **sıfır maliyetle, SSL (HTTPS) korumalı ve global CDN ile** yayınlamak için en popüler iki yöntem:

---

### Yöntem 1: GitHub Pages ile Yayınlama (Önerilen)

1. [GitHub](https://github.com)'a giriş yapın ve **New Repository** (Yeni Repo) butonuna tıklayın.
2. Repo adı olarak:
   - `toprakbilge.github.io` *(Özel kullanıcı web sitesi formatı)* VEYA `portfolio` yazabilirsiniz.
   - Repoyu **Public** olarak işaretleyin.
3. Bu klasördeki dosyaları terminal üzerinden GitHub'a yükleyin:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Toprak Bilge Portfolio"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/toprakbilge.github.io.git
   git push -u origin main
   ```
4. GitHub sayfanızda **Settings (Ayarlar) -> Pages** sekmesine gidin.
   - **Branch** olarak `main` ve klasör olarak `/ (root)` seçip **Save** butonuna tıklayın.
5. Yaklaşık 1-2 dakika içinde siteniz `https://kullaniciadi.github.io` adresinde yayına girecektir! 🎉

---

### Yöntem 2: Vercel ile Tek Tıkla Yayınlama

1. [Vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
2. **Add New... -> Project** seçeneğini seçin.
3. GitHub reponuzu seçip **Deploy** butonuna basın.
4. Siteniz 15 saniyede `https://toprakbilge.vercel.app` şeklinde anında canlıya geçecektir.

---

### 🏷️ Özel Alan Adı (Custom Domain) Bağlama

Eğer `toprakbilge.com` veya `toprakbilge.dev` gibi bir domain satın alırsanız:
- **GitHub Pages'te:** Repo Ayarları -> *Pages* -> *Custom domain* kutusuna domaininizi yazıp DNS'inize GitHub CNAME / A kayıtlarını ekleyin.
- **Vercel'de:** Project Settings -> *Domains* sekmesinden alan adınızı yazarak tek tıkla bağlayabilirsiniz. Ücretsiz SSL otomatik tanımlanır.

---

## 📁 Proje Dosya Yapısı

```
portfolio-toprak/
├── index.html            # Ana sayfa (Tüm CV bölümleri, metrikler, meta etiketler)
├── css/
│   └── style.css         # Glassmorphism, karanlık/aydınlık tema ve responsive tasarım
├── js/
│   └── app.js            # Filtreleme, sayaç animasyonları, tema ve kopyalama motoru
└── README.md             # Yayınlama ve kurulum rehberi
```

---

## ✨ İçerik Güncelleme

- **Yeni Deneyim / Şirket Ekleme:** `index.html` içinde `#experience` bölümündeki `timeline-item` bloğunu kopyalayıp yeni bilgilerinizi yazabilirsiniz.
- **Yeni Yetenek Ekleme:** `index.html` içinde `#skills` bölümüne yeni `skill-card` ekleyebilirsiniz.
- **İletişim Bilgileri:** `index.html` dosyasındaki e-posta veya telefon bilgilerini kolayca güncelleyebilirsiniz.
