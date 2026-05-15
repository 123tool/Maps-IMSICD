#!/bin/bash
# SPY-IMSICD Automated Setup Script

echo "--- SPY-IMSICD: Starting Installation ---"

# 1. Update & Install System Dependencies
sudo apt-get update
sudo apt-get install -y python3-pip rtl-sdr gr-gsm nodejs npm

# 2. Setup Python Environment
echo "Installing Python Libraries..."
pip3 install -r requirements.txt

# 3. Setup React Frontend
echo "Installing Frontend Dependencies..."
cd web
npm install
npm install react-leaflet leaflet

echo "--- Installation Complete ---"
echo "To run Backend: uvicorn app.main:app --reload"
echo "To run Frontend: cd web && npm start"
