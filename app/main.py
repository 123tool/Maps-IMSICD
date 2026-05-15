from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
import random
from app.core.detector import IMSIDetector

app = FastAPI(title="SPY-IMSICD Engine")

# Bypass CORS agar bisa diakses dari IP manapun/localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = IMSIDetector()

@app.get("/")
async def root():
    return {"brand": "SPY-IMSICD", "status": "Online", "owner": "Indonesia OSINT"}

@app.websocket("/ws/live-monitor")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulasi input data dari SDR (Nanti dihubungkan ke sdr_driver.py)
            # Dalam penggunaan asli, ini akan menerima data dari HackRF/RTL-SDR
            sample_data = {
                "cid": random.choice([1201, 1202, 9999]),
                "lac": random.choice([10, 11, 99]),
                "mcc": 510, # Indonesia
                "mnc": 10,  # Telkomsel
                "signal": random.randint(-90, -30),
                "neighbors": [] if random.random() > 0.8 else [1, 2, 3]
            }
            
            analysis = engine.process_signal(**sample_data)
            await websocket.send_json(analysis)
            await asyncio.sleep(1.5) # Interval scanning
            
    except WebSocketDisconnect:
        print("Client disconnected")
