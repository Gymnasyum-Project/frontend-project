# Gymnasyum — Frontend

Dashboard admin untuk **memantau risiko berhenti (churn) pelanggan gym** dan menindaklanjutinya dengan pesan WhatsApp yang dibantu AI.

> Proyek capstone Dicoding — *Customer Retention Risk System berbasis Generative AI*.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-build-646CFF?logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## Daftar Isi

- [Latar Belakang](#latar-belakang)
- [Fitur Utama](#fitur-utama)
- [Alur Sistem](#alur-sistem)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi & Menjalankan](#instalasi--menjalankan)
- [Environment Variables](#environment-variables)
- [Script yang Tersedia](#script-yang-tersedia)
- [Struktur Folder](#struktur-folder)
- [Cara Pakai Aplikasi](#cara-pakai-aplikasi)
- [Integrasi dengan Backend](#integrasi-dengan-backend)
- [Konvensi Git & Kontribusi](#konvensi-git--kontribusi)
- [Troubleshooting](#troubleshooting)
- [Tim](#tim)

---

## Latar Belakang

Pusat kebugaran sering kehilangan member tanpa sadar: kehadiran menurun, sesi paket tidak terpakai, lalu member berhenti. Gymnasyum membantu admin **menemukan member berisiko lebih awal** dan menghubungi mereka secara personal.

Sistem ini terdiri dari tiga bagian:

| Bagian | Peran |
| --- | --- |
| **Backend** (Express + Prisma + PostgreSQL) | Menyimpan data, menghitung fitur, mengelola alur |
| **Model ML** (Flask API) | Mengklasifikasikan risiko: *Active*, *Need Attention*, *At Risk* |
| **GenAI Service** | Menulis ringkasan kondisi member dan draf pesan WhatsApp |
| **Frontend (repo ini)** | Antarmuka admin untuk melihat, mencatat, dan menindaklanjuti |

**Prinsip human-in-the-loop:** AI hanya menyarankan. Admin selalu meninjau, mengedit, lalu mengirim pesan secara manual. Tidak ada pesan yang terkirim otomatis.

---

## Fitur Utama

- **Login admin** — akses dilindungi token (JWT).
- **Dashboard prioritas** — daftar member berurutan dari risiko tertinggi, lengkap dengan skor prioritas.
- **Daftar & detail customer** — statistik 7 hari terakhir: kehadiran, tidak hadir, reschedule, sisa sesi, kunjungan terakhir, reminder.
- **Ringkasan & draf WhatsApp dari AI** — bisa digenerate ulang, diedit, disalin, atau dikirim lewat WhatsApp.
- **Reminder otomatis tercatat** — saat tombol *Kirim ke WhatsApp* ditekan, reminder langsung dicatat ke sistem.
- **Input data operasional**
  - Kehadiran (hadir / tidak hadir / dijadwal ulang)
  - Kedatangan reschedule
  - Reminder dan respons customer
- **Manajemen paket** — tambah, ubah, dan atur status paket (aktif / nonaktif), serta pasang paket ke customer.
- **Log follow-up** — riwayat tindak lanjut ke customer.

---

## Alur Sistem

```
Admin mencatat aktivitas ──► Backend menghitung fitur (7 hari terakhir)
                                      │
                                      ▼
                          Model ML: Active / Need Attention / At Risk
                                      │
                                      ▼
                          GenAI: ringkasan + draf WhatsApp
                                      │
                                      ▼
         Admin meninjau/mengedit ──► Kirim manual via WhatsApp ──► Reminder tercatat
```

---

## Tech Stack

- **React** + **Vite**
- **React Router** — navigasi halaman
- **Axios** — komunikasi dengan API backend
- **react-select** — pencarian customer
- **react-icons** — ikon

> Sesuaikan daftar ini dengan `package.json` jika ada library yang berbeda.

---

## Prasyarat

Pastikan sudah terpasang:

- [Node.js](https://nodejs.org/) **v20 atau lebih baru**
- npm (ikut terpasang bersama Node.js)
- Backend Gymnasyum sudah berjalan (lihat repo backend)

Cek versi:

```bash
node -v
npm -v
```

---

## Instalasi & Menjalankan

1. **Clone repository**

   ```bash
   git clone <URL-REPO-FRONTEND>
   cd <NAMA-FOLDER-FRONTEND>
   ```

2. **Pasang dependensi**

   ```bash
   npm install
   ```

3. **Buat file environment**

   ```bash
   cp .env.example .env
   ```

   (Windows PowerShell: `Copy-Item .env.example .env`)

   Lalu isi sesuai bagian [Environment Variables](#environment-variables).

4. **Jalankan mode pengembangan**

   ```bash
   npm run dev
   ```

   Buka alamat yang tampil di terminal (biasanya `http://localhost:5173`).

5. **Login**

   Gunakan akun admin dari backend. Jika backend memakai data seed:

   | Email | Password |
   | --- | --- |
   | `admin@gymnasyum.id` | `admin123` |

   > Akun ini hanya untuk pengembangan. Ganti passwordnya sebelum aplikasi dibuka untuk umum.

---

## Environment Variables

Buat file `.env` di root proyek. Variabel Vite harus diawali `VITE_`.

| Variabel | Contoh | Keterangan |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:4000/api/v1` | Alamat dasar API backend |

> Sesuaikan nama variabel dengan yang dipakai di kode (cek file konfigurasi Axios). Jangan commit file `.env`; commit hanya `.env.example`.

---

## Script yang Tersedia

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Membuat build produksi di folder `dist/` |
| `npm run preview` | Menjalankan hasil build secara lokal |
| `npm run lint` | Memeriksa kualitas kode dengan ESLint |

---

## Struktur Folder

Gambaran umum struktur `src/` (sesuaikan jika ada perubahan):

```
src/
├── assets/         # gambar, ikon, font
├── components/     # komponen UI yang dipakai ulang
├── hooks/          # custom hooks (customer, reschedule, reminder, dst.)
├── pages/          # halaman utama (dashboard, customer, input data, ...)
├── services/       # fungsi pemanggil API (customerService, reminderService, ...)
├── App.jsx         # routing utama
└── main.jsx        # entry point
```

Pola yang dipakai:

- **services/** — satu-satunya tempat yang berbicara langsung ke API.
- **hooks/** — membungkus services + state (loading, error) agar komponen tetap sederhana.
- **components/pages** — fokus pada tampilan.

---

## Cara Pakai Aplikasi

### 1. Memantau risiko customer
Buka dashboard untuk melihat daftar prioritas. Customer berlabel **At Risk** dan **Need Attention** tampil paling atas. Klik satu customer untuk melihat detailnya.

### 2. Menindaklanjuti customer
Di halaman detail:
1. Baca ringkasan AI dan statistik 7 hari terakhir.
2. Klik **Generate Draft** (atau **Generate Ulang**) untuk membuat draf pesan.
3. Edit pesan sesuai kebutuhan.
4. Klik **Kirim ke WhatsApp**. WhatsApp terbuka dengan pesan terisi, dan reminder otomatis tercatat.

### 3. Mencatat kehadiran
Menu **Input Data → Kehadiran**: pilih customer, pilih sesi paket, tentukan status (Hadir / Tidak Hadir / Dijadwal Ulang), lalu simpan. Sisa sesi paket ikut berkurang saat status *Hadir*.

### 4. Mencatat kedatangan reschedule
Menu **Input Data → Reschedule**: pilih customer, pilih sesi yang dijadwal ulang dan belum dihadiri, isi tanggal & jam kedatangan, lalu simpan. Tanggal kedatangan tidak boleh di masa depan.

### 5. Mencatat respons reminder
Setelah customer membalas pesan, perbarui status reminder (*replied*, *read*, atau *no_response*).

### 6. Mengelola paket
Menu **Paket**: tambah atau ubah paket, dan ubah status menjadi *aktif* atau *nonaktif*. Paket nonaktif tidak bisa dipasang ke customer.

---

## Integrasi dengan Backend

Frontend memanggil REST API backend. Beberapa endpoint yang dipakai:

| Method | Endpoint | Kegunaan |
| --- | --- | --- |
| `POST` | `/auth/login` | Login admin |
| `GET` | `/customers` | Daftar customer |
| `GET` | `/customers/:id` | Detail customer + statistik |
| `GET` | `/attendance?customer_id=` | Riwayat kehadiran |
| `POST` | `/attendance` | Catat kehadiran |
| `GET` | `/attendance/pending-reschedule?customer_id=` | Sesi reschedule yang menunggu |
| `POST` | `/attendance/:id/reschedule` | Catat kedatangan reschedule |
| `POST` | `/reminders` | Catat reminder terkirim |
| `PATCH` | `/reminders/:id` | Perbarui respons reminder |
| `GET` | `/packages` | Daftar paket (`?status=active`) |

> Daftar di atas adalah ringkasan. Dokumentasi lengkap ada di repo backend. Periksa kembali nama endpoint sesuai versi backend terbaru.

Semua request (kecuali login) membutuhkan header:

```
Authorization: Bearer <token>
```

Peran pengguna ditentukan oleh **token dari backend**, bukan dikirim oleh frontend.

---

## Konvensi Git & Kontribusi

**Penamaan branch**

```
feat/nama-fitur      # fitur baru
fix/nama-bug         # perbaikan bug
docs/nama-dokumen    # perubahan dokumentasi
```

**Pesan commit** (mengikuti [Conventional Commits](https://www.conventionalcommits.org/)):

```
feat: tambah form input reschedule
fix: perbaiki validasi tanggal kedatangan
docs: perbarui README
```

**Alur kontribusi**

1. Pindah ke `main` dan ambil versi terbaru: `git checkout main && git pull origin main`
2. Buat branch baru: `git checkout -b feat/nama-fitur`
3. Kerjakan, lalu `git add .` dan `git commit`
4. Push: `git push -u origin feat/nama-fitur`
5. Buka Pull Request ke `main` dan minta review minimal satu anggota tim

**Jangan pernah commit:** `.env`, password, URI database, atau token.

---

## Troubleshooting

| Masalah | Kemungkinan penyebab & solusi |
| --- | --- |
| Halaman kosong / data tidak muncul | Backend belum jalan atau `VITE_API_URL` salah. Cek di tab Network browser. |
| Error CORS | Izinkan alamat frontend (mis. `http://localhost:5173`) di konfigurasi CORS backend. |
| `403 Forbidden` | Akun bukan admin atau token lama. Logout lalu login ulang dengan akun admin. |
| `401 Unauthorized` | Token kedaluwarsa. Login ulang. |
| Perubahan `.env` tidak terbaca | Restart `npm run dev`; Vite hanya membaca `.env` saat start. |
| WhatsApp tidak terbuka saat Kirim | Browser memblokir popup. Izinkan popup untuk situs ini. |
| `visited_at must be ≤ now` | Tanggal/jam kedatangan reschedule berada di masa depan. Pilih waktu yang sudah lewat. |

---

## Tim

Proyek capstone Dicoding oleh tim 5 orang:

| Peran | Nama |
| --- | --- |
| Frontend | _isi nama_ |
| Backend | Aman |
| Machine Learning | Joy |
| Generative AI | Seleni |
| _peran lain_ | _isi nama_ |

---

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran (capstone Dicoding). Tentukan lisensi sesuai kebutuhan tim, misalnya MIT.
