## MAPS SPY IMSICD
**Advanced Mobile Network Intrusion Detection System (MNIDS)**

SPY-IMSICD is a professional-grade forensic tool designed for detecting **IMSI Catchers**, **Stingrays**, and **Rogue Base Stations**. Built with a focus on real-time signal intelligence and cellular anomaly detection.

## 🛠️ Tech Stack
- **Backend:** Python 3.10+ (FastAPI, WebSockets, SQLAlchemy)
- **Frontend:** React.js, Tailwind CSS (Glassmorphism Architecture)
- **Engine:** Anomaly-based Detection Logic (Signal Fingerprinting)

## ⚡ Features
- **Tower Consistency Check:** Detects LAC/CellID mismatches.
- **Power Analytics:** Identifies high-gain interception devices.
- **Neighbor List Verification:** Spots isolated malicious towers.
- **Real-time Radar:** Visual signal tracking via WebSocket.
- **Forensic Logging:** Persistent database storage for malicious activity.

## 🚀 Installation

## 1. Requirements
Ensure you have an SDR (RTL-SDR/HackRF) and `gr-gsm` installed on your system.

## 2. Backend Setup
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0
```
## 3. Frontend Setup
```
cd web
npm install
npm start
```
## Update :

​1. **WebSocket Sync :**
Langsung otomatis konek ke 
```
ws://localhost:8000/ws/live-monitor.
```
2. **Threat Score Indicator :**
Menambahkan Progress Bar yang berubah warna jadi merah jika skor ancaman naik (mirip indikator kesehatan di game/film aksi).
3. **​Map Integration :**
Komponen MapTracker ditaruh di kolom kanan paling atas agar menjadi pusat perhatian visual.
4. **Log Forensik :**
Tabel di bawah otomatis menyimpan 50 riwayat aktivitas mencurigakan secara real-time.
5. **​Styling :**
Menggunakan kombinasi warna bg-[#050505] (Pure Black) dan bg-white/[0.03] (Glass effect) agar terkesan sangat elit dan profesional.

## ​Langkah Terakhir :
Pastikan kamu sudah menginstal dependensi map dengan mengetik ini di terminal folder web :
```
npm install react-leaflet leaflet
```
Setelah itu, jalankan :
```
npm start.
```
Dashboard spionase kamu siap digunakan!

## Disclaimer

**​This software is intended for educational and defensive security research only. The author is not responsible for any misuse. Always comply with local telecommunication laws.**
