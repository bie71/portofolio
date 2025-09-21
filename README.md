# Portfolio

Portofolio pribadi yang kini dibangun menggunakan [Vite](https://vitejs.dev) + [Vue 3](https://vuejs.org) serta [Tailwind CSS](https://tailwindcss.com). Seluruh konten halaman utama diambil dari store reaktif dan dapat diedit lewat dashboard admin.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Aplikasi akan tersedia pada http://localhost:5173 secara bawaan.

## Build untuk produksi

```bash
npm run build
npm run preview
```

## Dashboard Admin

- Halaman utama: `/`
- Dashboard admin: `/admin`
- Perubahan konten disimpan ke `localStorage`, sehingga bertahan setelah refresh di browser yang sama.
- Tombol "Reset Default" akan mengembalikan data ke konfigurasi bawaan repositori.

## Struktur Penting

- `src/stores/site.js` – data default dan logika penyimpanan.
- `src/views/PublicLayout.vue` – komposisi halaman portofolio.
- `src/views/AdminDashboard.vue` – form untuk mengubah konten.
- `public/img` – aset statis (logo, ikon, gambar project, favicon, dll).

Silakan sesuaikan data bawaan sesuai kebutuhan Anda.
