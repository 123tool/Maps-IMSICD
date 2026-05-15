import time
import logging

class IMSIDetector:
    def __init__(self):
        # Database internal sementara untuk membandingkan tower
        self.known_towers = {}
        self.threat_logs = []

    def get_geo_location(self, mcc, mnc, lac, cid):
        """
        Simulasi pengambilan koordinat. 
        Dalam produksi, ini bisa menembak API OpenCellID atau Mozilla Location Service.
        """
        # Contoh koordinat acak di wilayah Jakarta untuk testing
        import random
        lat = random.uniform(-6.2146, -6.1751)
        lng = random.uniform(106.8166, 106.8456)
        
        return {"lat": lat, "lng": lng, "address": "Detected Sector Area"}


    def process_signal(self, cid, lac, mcc, mnc, signal_strength, neighbors):
        """
        Menganalisis data seluler yang tertangkap oleh SDR.
        """
        score = 0
        reasons = []

        # 1. Deteksi Kekuatan Sinyal yang Tidak Wajar
        # Stingray biasanya memancarkan sinyal sangat kuat agar HP target 'pindah' ke mereka
        if signal_strength > -40: 
            score += 45
            reasons.append("Abnormal Signal Strength (Proximity Alert)")

        # 2. Konsistensi LAC (Location Area Code)
        if cid in self.known_towers:
            if self.known_towers[cid]['lac'] != lac:
                score += 50
                reasons.append("LAC Mismatch Detected (Possible Cell Spoofing)")
        else:
            self.known_towers[cid] = {'lac': lac, 'first_seen': time.time()}

        # 3. Deteksi Sel Tetangga (Neighboring Cells)
        # Tower palsu seringkali tidak memiliki daftar tower tetangga yang valid
        if len(neighbors) == 0:
            score += 30
            reasons.append("Empty Neighbor List (Typical Rogue Base Station)")

        # Penentuan Status
        status = "SECURE"
        if score >= 70:
            status = "CRITICAL"
        elif score >= 35:
            status = "SUSPICIOUS"

        result = {
            "timestamp": time.time(),
            "tower_info": {"cid": cid, "lac": lac, "mcc": mcc, "mnc": mnc},
            "metrics": {"signal": signal_strength, "score": score},
            "status": status,
            "alerts": reasons
        }
        
        if status != "SECURE":
            self.threat_logs.append(result)
            
        return result
