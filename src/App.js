import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [img, setImg] = useState('');
  const [load, setLoad] = useState(false);
  const [qrdata, setQrData] = useState('');
  const [size, setSize] = useState(200);

  async function qrGen() {
    if (!qrdata) {
      alert('Please enter some data to generate QR code');
      return;
    }
    try {
      setLoad(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        qrdata
      )}&size=${size}x${size}`;
      setImg(url);
    } catch (error) {
      alert('Error in generating the QR code');
    } finally {
      setLoad(false);
    }
  }

  function handleQrData(data) {
    setQrData(data);
  }

  function handleSize(data) {
    const newSize = parseInt(data);
    if (newSize >= 100 && newSize <= 1000) {
      setSize(newSize);
    }
  }

  function downloadQR() {
    if (!img) {
      alert('Generate a QR code first');
      return;
    }
    const link = document.createElement('a');
    link.href = img;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="app-container">
      <div className="qr-container">
        <h1>QR Code Generator</h1>
        
        <div className="input-group">
          <div className="input-field">
            <label>Enter your data</label>
            <textarea
              placeholder="Enter text, URL, or any data"
              onChange={(e) => handleQrData(e.target.value)}
              value={qrdata}
            />
          </div>

          <div className="input-field">
            <label>Image size (100-1000)</label>
            <input
              type="number"
              min="100"
              max="1000"
              value={size}
              onChange={(e) => handleSize(e.target.value)}
            />
          </div>
        </div>

        <div className="button-group">
          <button className="generate-btn" onClick={qrGen} disabled={load}>
            {load ? 'Generating...' : 'Generate QR Code'}
          </button>
          <button className="download-btn" onClick={downloadQR} disabled={!img}>
            Download QR Code
          </button>
        </div>

        <div className="qr-output">
          {img && <img src={img} alt="QR Code" className="qr-image" />}
        </div>
      </div>
    </div>
  );
};

export default App;
