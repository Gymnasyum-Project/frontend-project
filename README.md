# 🏋️ Gymnasyum Frontend — Admin Retention & AI Follow-Up Dashboard

Antarmuka web panel admin (**Admin Panel**) untuk **Gymnasyum**, sistem retensi anggota gym dan *private coaching* berbasis **Machine Learning Risk Prediction** dan **AI RAG Follow-Up Generator**. Aplikasi ini memudahkan tim admin memantau tingkat risiko anggota, meninjau ringkasan analisis perilaku dari AI, serta menyunting dan mengirim draf pesan *follow-up* WhatsApp.

🔗 **Live Demo:** <https://frontend-project-3jco-pearl.vercel.app>

## 📋 Daftar Isi

* [Arsitektur & Alur Aplikasi](#-arsitektur--alur-aplikasi)

* [Fitur Utama](#-fitur-utama)

* [Tech Stack](#-tech-stack)

* [Struktur Proyek](#-struktur-proyek)

* [Alur Penggunaan Admin](#-alur-penggunaan-admin)

* [Prasyarat & Instalasi Lokal](#-prasyarat--instalasi-lokal)

* [Konfigurasi Environment Variables](#-konfigurasi-environment-variables)

* [Deployment (Vercel)](#-deployment-vercel)

* [Troubleshooting Umum](#-troubleshooting-umum)

## 🏗 Arsitektur & Alur Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│                  Gymnasyum Frontend (React)                 │
│  • Dashboard Analitik & Ringkasan Risiko                    │
│  • Manajemen Anggota & Detail Profil                        │
│  • Prioritas Follow-Up (At Risk & Need Attention)           │
│  • Editor Draf WhatsApp & Markdown AI Summary Viewer        │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API (HTTPS + Bearer JWT)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Gymnasyum Backend API (Express)               │
│  • Autentikasi Admin & Data Anggota                         │
│  • Integrasi ML Risk Scoring & RAG Service                  │
└─────────────────────────────────────────────────────────────┘

```

## ✨ Fitur Utama

* **Dashboard & Prioritas Follow-Up:** Menampilkan ringkasan status retensi anggota (`At Risk`, `Need Attention`, `Low Risk`) beserta daftar prioritas anggota yang membutuhkan tindakan segera.

* **Manajemen & Detail Customer:** Pencarian anggota, riwayat sesi latihan, status kehadiran (*Hadir* / *Tidak Hadir*), pelatih (*Coach*), serta sisa sesi dan masa berlaku paket.

* **Analisis & Ringkasan AI (RAG):**

  * Menampilkan hasil analisis terstruktur dari layanan AI (Informasi Customer, Tabel Indikator Risiko, Rekomendasi Pendekatan berbasis SOP, serta Alternatif Pesan) dengan dukungan *horizontal scroll* pada tabel responsif.

  * Mendukung pembuatan draf baru maupun pembaruan ulang (**Generate Ulang**).

* **Editor Draf WhatsApp Interaktif:** Admin dapat menyunting teks `followup_draft` secara langsung, menyimpan perubahan (`edited_draft`), menyetujui draf (`approved`), dan menyalin/mengirim pesan ke WhatsApp anggota.

* **Input Data & Pengaturan:** Antarmuka pencatatan data operasional dan konfigurasi akun admin.

## 🛠 Tech Stack

* **Core Framework:** React (JavaScript `.jsx`) + Vite

* **Styling:** Custom CSS (`src/index.css` & `src/styles/`)

* **State & Context:** React Context API (`src/contexts/`) & Custom Hooks (`src/hooks/`)

* **API Communication:** Fetch / HTTP Client Service Layer (`src/services/`)

* **Deployment & Routing:** Vercel (`vercel.json` SPA rewrite configuration)

## 📂 Struktur Proyek

```
Frontend-Gymnasyum/
├── public/                    # Aset statis publik (ikon, favicon)
├── src/
│   ├── assets/                # Gambar, logo, dan ilustrasi aplikasi
│   ├── components/            # Komponen UI modular (DetailAiSummary, DetailRingkasanAi, DetailDrafWhatsapp, dll.)
│   ├── contexts/              # Global state management (AuthContext, dll.)
│   ├── hooks/                 # Custom React hooks untuk fetching & state logic
│   ├── pages/                 # Halaman utama (Dashboard, Customer, Detail Customer, Prioritas Follow-Up, Input Data, Pengaturan)
│   ├── services/              # Integrasi REST API ke Backend Gymnasyum
│   ├── styles/                # File CSS modular untuk layout & komponen
│   ├── utils/                 # Fungsi helper & formatter data
│   ├── App.jsx                # Konfigurasi routing & layout utama aplikasi
│   ├── index.css              # Global stylesheet
│   └── main.jsx               # Entry point aplikasi React
├── .env.example               # Template environment variables
├── eslint.config.js           # Konfigurasi linter ESLint
├── index.html                 # Root HTML template Vite
├── package.json               # Daftar dependencies & scripts
├── pnpm-lock.yaml             # Lockfile pnpm
├── vercel.json                # Konfigurasi SPA routing untuk Vercel
└── vite.config.js             # Konfigurasi bundler Vite

```

## 🧭 Alur Penggunaan Admin

1. **Login Admin:** Masuk menggunakan kredensial akun admin untuk memperoleh sesi autentikasi.

2. **Pantau Prioritas Follow-Up:** Buka menu **Prioritas Follow-Up** atau **Customer** untuk melihat anggota dengan label *At Risk* dan *Need Attention*.

3. **Tinjau Detail & Ringkasan AI:** Klik salah satu anggota untuk membuka halaman **Detail Customer**, lalu periksa bagian **Faktor Resiko Utama** dan **Ringkasan AI**.

4. **Sesuaikan & Kirim Draf WhatsApp:** Periksa teks pada kartu **Draft Follow-Up WhatsApp**, lakukan penyesuaian bahasa bila diperlukan, simpan pembaruan, lalu kirimkan ke anggota.

## 🚀 Prasyarat & Instalasi Lokal

### Prasyarat

* **Node.js** versi `>= 18.x`

* **npm** atau **pnpm**

* Server **Backend Gymnasyum** sudah berjalan (lokal maupun URL production Vercel)

### Langkah Instalasi

1. **Clone repository ini:**

   ```
   git clone https://github.com/waylifeaman/Frontend-Gymnasyum.git
   cd Frontend-Gymnasyum
   
   ```

2. **Install dependencies:**
   Menggunakan `pnpm` (direkomendasikan):

   ```
   pnpm install
   
   ```

   Atau menggunakan `npm`:

   ```
   npm install
   
   ```

3. **Salin dan sesuaikan file environment:**

   ```
   cp .env.example .env
   
   ```

4. **Jalankan server development:**

   ```
   pnpm dev
   # atau: npm run dev
   
   ```

   Aplikasi dapat diakses melalui browser di `http://localhost:5173`.

## 🔐 Konfigurasi Environment Variables

Sesuaikan variabel pada file `.env` (lokal) dan **Vercel Project Settings → Environment Variables**:

| Variabel | Wajib | Deskripsi | Contoh Nilai | 
| ----- | ----- | ----- | ----- | 
| `VITE_API_BASE_URL` | **Ya** | Base URL endpoint REST API Backend Gymnasyum *(sesuaikan dengan nama key di `.env.example`)* | `https://backend-gymnasyum.vercel.app/api` | 

> **Catatan:** Pada Vite, semua variabel environment yang diakses dari kode client wajib diawali dengan prefix `VITE_`.

## ☁️ Deployment (Vercel)

1. Push repository ke GitHub dan impor proyek ke **Vercel**.

2. Konfigurasikan **Framework Preset** ke **Vite** (Build Command: `npm run build` / `pnpm build`, Output Directory: `dist`).

3. Tambahkan environment variable pada pengaturan proyek Vercel.

4. File `vercel.json` sudah disertakan untuk menangani *client-side routing* (SPA fallback ke `index.html`) agar tidak terjadi `404` saat halaman di-refresh pada route seperti `/customer/467`.

## 🔧 Troubleshooting Umum

| Gejala / Error | Penyebab | Solusi | 
| ----- | ----- | ----- | 
| **Network Error / CORS Error** saat login | URL frontend belum terdaftar di `FRONTEND_URL` backend atau `VITE_API_BASE_URL` salah | Pastikan `VITE_API_BASE_URL` mengarah ke URL backend yang benar dan terdaftar di konfigurasi CORS backend. | 
| **404 Not Found** saat refresh halaman `/customer/:id` | Vercel mencari file fisik sesuai path URL pada aplikasi SPA | Pastikan file `vercel.json` memiliki aturan `rewrites` ke `/index.html`. | 
| **Tabel Ringkasan AI melebar keluar layar** | Tabel Markdown LLM memiliki banyak kolom pada layar kecil | Pastikan kontainer `.col-ai` memiliki `min-width: 0` dan elemen `table` diatur `display: block; overflow-x: auto;`. | 
| **Kotak Draft Follow-Up WhatsApp kosong** | Draf belum di-generate atau sedang diproses batch cron | Klik tombol **Generate Ulang** pada halaman Detail Customer untuk memicu generasi instan. | 
