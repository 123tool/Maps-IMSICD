## 📡 SPY IMSICD MAPS System

![License](https://img.shields.io/badge/License-GPLv3-red.svg)
![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![React](https://img.shields.io/badge/React-18.x-cyan.svg)
![Status](https://img.shields.io/badge/Status-Operational-green.svg)

**Advanced Mobile Network Intrusion Detection System (MNIDS)**

Alat forensik tingkat profesional yang dirancang untuk mendeteksi **IMSI Catchers**, **Stingrays**, dan **Rogue Base Stations**. Proyek ini berfokus pada intelijen sinyal real-time dan deteksi anomali jaringan seluler dengan tampilan antarmuka *Cyber-Forensics*.

---

## 🛠️ Stack

- **Backend:** Python 3.10+ (FastAPI, WebSockets, SQLAlchemy)
- **Frontend:** React.js & Tailwind CSS (Glassmorphism Architecture)
- **Engine:** Anomaly-based Detection Logic (Signal Fingerprinting)
- **Mapping:** Leaflet.js (Geospatial Intelligence)

## ⚡ Features

*   **Tower Consistency Check:** Validasi silang data LAC/CellID untuk mendeteksi pemalsuan tower.
*   **Power Analytics:** Identifikasi perangkat intersepsi gain tinggi (Stingray) melalui kekuatan sinyal.
*   **Neighbor List Verification:** Mendeteksi tower terisolasi yang tidak memiliki daftar tetangga valid.
*   **Real-time Radar:** Visualisasi spektrum sinyal aktif melalui koneksi WebSocket.
*   **Geospatial Tracking:** Pemetaan lokasi menara yang terdeteksi secara real-time pada dashboard.
*   **Forensic Logging:** Penyimpanan otomatis hingga 50 aktivitas mencurigakan terakhir ke database.

---

## 🚀 Installation Guide

## 1. Prasyarat Sistem
Pastikan Anda memiliki perangkat keras SDR (RTL-SDR atau HackRF) dan driver `gr-gsm` sudah terinstal di sistem operasi Anda.

## 2. Backend Setup
Masuk ke direktori utama proyek dan jalankan perintah berikut:
## Install dependencies
```
pip install -r requirements.txt
```
## Jalankan server engine
```
uvicorn app.main:app --reload --host 0.0.0.0
```
## 3. Frontend Setup
​Buka terminal baru, lalu masuk ke folder web untuk instalasi UI :
```
cd web
```
## Install core dependencies & mapping tools
```
npm install
npm install react-leaflet leaflet
```
## Jalankan
```
npm start
```

## 🛡️ Updates

1. ​WebSocket Sync : Sinkronisasi otomatis ke ws://localhost:8000/ws/live-monitor untuk data tanpa delay.
2. ​Threat Score Indicator : Progress bar dinamis yang berubah warna (Cyan ke Red) berdasarkan tingkat risiko keamanan.
3. ​Auto-Forensic Log : Tabel arsip yang menyimpan data teknis setiap kali anomali terdeteksi.
   
## ​⚠️ Disclaimer

​**This software is intended for educational and defensive security research only.
Penyalahgunaan alat ini untuk kegiatan ilegal di luar tujuan riset keamanan adalah tanggung jawab pengguna sepenuhnya.**
