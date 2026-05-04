import { useState } from 'react'
import { Analytics } from "@vercel/analytics/react";
function App() {
  const [tin, setTin] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (tin.length !== 12 || isNaN(tin)) {
      alert("Please enter a valid 12-digit TIN.");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(false);
    try {
      const response = await fetch(`https://nbr-server-production.up.railway.app/search/${tin}`);
      const data = await response.json();
      if (data.found) {
        setResult(data.data);
      } else {
        setError(true);
      }
    } catch (err) {
      alert("Server is not running! Run 'node server.js'");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', margin: 0, paddingBottom: '60px', fontFamily: '"Segoe UI", Roboto, Arial, sans-serif' }}>

      {/* 1. Official Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '6px solid #f42a41', padding: '25px 0', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ margin: 0, color: '#006a4e', fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px' }}>Find Your TIN</h1>
        <p style={{ margin: '5px 0 0', color: '#f42a41', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Find your TIN is Selected By NBR for Audit</p>
      </header>

      <main style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>

        {/* 2. Disclaimer Box (As per Screenshot) */}
        <div style={{ backgroundColor: '#f0f2ff', border: '1px solid #d0d7ff', borderRadius: '12px', padding: '20px', marginBottom: '30px', color: '#4a5568', fontSize: '13px', lineHeight: '1.6' }}>
          <p style={{ margin: 0 }}>
            <strong>Disclaimer:</strong> This is a digital assistance tool using publicly available NBR data. This tool is not affiliated with the National Board of Revenue. Regardless of what this tool shows, <strong>always verify your audit status directly with NBR</strong> or your tax circle before taking any action.
          </p>
        </div>

        {/* 3. Main Search Card */}
        <div style={{ backgroundColor: '#006a4e', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 40px rgba(0,106,78,0.2)', marginBottom: '30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ color: '#ffcc00', margin: 0, fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>Audit Selection Database (2023-24)</h2>
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', color: 'white', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px', opacity: 0.8, textTransform: 'uppercase' }}>Taxpayer Identification Number (TIN)</label>
            <input
              type="text"
              maxLength="12"
              style={{ width: '100%', padding: '20px', borderRadius: '12px', border: '4px solid #ffcc00', fontSize: '24px', textAlign: 'center', fontWeight: '900', letterSpacing: '4px', outline: 'none', boxSizing: 'border-box', color: '#ffffff' }}
              placeholder="12-digit-e-TIN"
              value={tin}
              onChange={(e) => setTin(e.target.value.replace(/\D/g, ""))}
            />
            <button
              onClick={handleSearch}
              style={{ width: '100%', marginTop: '20px', backgroundColor: '#f42a41', color: 'white', border: 'none', padding: '20px', borderRadius: '12px', fontSize: '18px', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', transition: '0.3s', boxShadow: '0 4px 15px rgba(244,42,65,0.4)' }}
            >
              {loading ? 'Verifying...' : 'Check Audit Status'}
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', animation: 'fadeIn 0.5s' }}>
              <div style={{ backgroundColor: '#f42a41', color: 'white', padding: '10px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>TIN is selected for Audit</div>
              <div style={{ padding: '25px' }}>
                <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 10px 0', fontSize: '15px' }}><strong>TIN:</strong> <span>{result.tin}</span></p>
                <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 10px 0', fontSize: '15px' }}><strong>Zone:</strong> <span>{result.zone}</span></p>
                <p style={{ display: 'flex', justifyContent: 'space-between', margin: 0, fontSize: '15px' }}><strong>Circle:</strong> <span>{result.circle}</span></p>
              </div>

            </div>
          )}

          {error && (
            <div style={{ marginTop: '30px', backgroundColor: '#ffee00', padding: '20px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', color: '#000' }}>
              ⚠️ TIN NOT FOUND IN AUDIT SELECTION LIST
            </div>
          )}
        </div>




        {/* 6. WhatsApp Floating Action */}
        <div style={{ marginTop: '30px' }}>
          <a href="https://wa.me/8801715240183" target="_blank" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#25d366', color: 'white', padding: '20px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 10px 20px rgba(37,211,102,0.2)' }}>
            <span style={{ fontWeight: '900', textTransform: 'uppercase', fontSize: '14px' }}>Talk to Tax Consultant</span>
            <span style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '5px 15px', borderRadius: '8px', fontWeight: 'bold' }}>+8801715240183</span>
          </a>
        </div>

      </main>
      <Analytics />
    </div>

  )
}

export default App