# Website Desa Wisata Patakbanteng

Website statis berdasarkan **Brief Website Desa Wisata Patakbanteng**.

## Membuka website

1. Ekstrak folder.
2. Klik dua kali `index.html`, atau jalankan server lokal:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Data yang perlu diisi terlebih dahulu

Buka `assets/js/config.js`, lalu isi:

- nomor WhatsApp pusat informasi dan setiap layanan;
- tautan Google Maps desa, basecamp, dan Rumah Bibit;
- tautan video profil YouTube;
- tautan media sosial resmi.

Format nomor WhatsApp memakai kode negara tanpa `+`, contoh `6281234567890`.

## Mengganti gambar

Semua gambar sementara berbentuk SVG dan diberi tulisan **PLACEHOLDER FOTO**. Ganti file di dalam `assets/images/` menggunakan nama file yang sama agar HTML tidak perlu diubah. Gunakan WebP untuk foto final bila memungkinkan.

Contoh:

- `assets/images/hero/patakbanteng-hero.svg`
- `assets/images/hero/gunung-prau-hero.svg`
- `assets/images/hero/rumah-bibit-hero.svg`
- `assets/images/umum/peta-transek.svg`
- `assets/images/gunung-prau/peta-jalur.svg`

Bila ekstensi diubah dari `.svg` ke `.webp`, ubah juga alamat gambar pada HTML terkait.

## Struktur utama

- `index.html` — Beranda
- `gunung-prau.html` — Informasi pendakian
- `basecamp.html` — Basecamp Patakbanteng
- `agrowisata.html` — Agrowisata desa
- `rumah-bibit.html` — Rumah Bibit
- `jelajahi.html` — Aktivitas desa
- `berita.html` — Artikel dan agenda
- `layanan.html` — Layanan dan fasilitas
- `paket.html` — Paket wisata
- `kuliner.html` — Kuliner dan UMKM
- `perjalanan.html` — Rute dan peta
- `tentang.html` — Profil desa
- `kontak.html` — Helpdesk dan direktori kontak
- `assets/css/style.css` — gaya utama
- `assets/css/responsive.css` — aturan tablet dan ponsel
- `assets/js/config.js` — data kontak terpusat
- `assets/js/main.js` — navigasi, animasi, filter, galeri, dan formulir

## Prinsip pengisian konten

- Jangan mengarang harga, jadwal, kontak, lokasi, atau SOP.
- Hapus label placeholder hanya setelah data resmi tersedia.
- Kompres foto dan gunakan `loading="lazy"` untuk gambar di bawah hero.
- Uji setiap tombol WhatsApp, peta, dan tautan sebelum dipublikasikan.

## Deploy ke Vercel

Folder ini sudah memiliki `vercel.json`. Unggah seluruh folder ke repository lalu import repository tersebut ke Vercel.
