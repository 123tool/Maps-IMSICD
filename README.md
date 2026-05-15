## MAPS SPY IMSICD
**Advanced Mobile Network Intrusion Detection System (MNIDS)**

SPY-IMSICD is a professional-grade forensic tool designed for detecting **IMSI Catchers**, **Stingrays**, and **Rogue Base Stations**. Built with a focus on real-time signal intelligence and cellular anomaly detection.

## 🛠️ Tech Stack
- **Backend:** Python 3.10+ (FastAPI, WebSockets, SQLAlchemy)
- **Frontend:** React.js, Tailwind CSS (Glassmorphism Architecture)
- **Engine:** Anomaly-based Detection Logic (Signal Fingerprinting)

## ⚡ Key Features
- **Tower Consistency Check:** Detects LAC/CellID mismatches.
- **Power Analytics:** Identifies high-gain interception devices.
- **Neighbor List Verification:** Spots isolated malicious towers.
- **Real-time Radar:** Visual signal tracking via WebSocket.
- **Forensic Logging:** Persistent database storage for malicious activity.

## 🚀 Installation

### 1. Requirements
Ensure you have an SDR (RTL-SDR/HackRF) and `gr-gsm` installed on your system.

### 2. Backend Setup
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0
