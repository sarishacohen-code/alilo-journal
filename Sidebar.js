import React, { useState } from 'react';
import { MONTHS } from '../constants';
import { SavePill } from './ui';

export default function Sidebar({ data, view, activeMonth, setView, setActiveMonth, saving, onExport, onImport }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentMonthIdx = new Date().getMonth();

  return (
    <>
      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', position: 'fixed', top: 12, left: 12, zIndex: 1000,
        background: 'var(--dusty-dark)', border: 'none', borderRadius: 10,
        width: 44, height: 44, cursor: 'pointer', color: 'white', fontSize: 18,
        alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
      }} className="hamburger">☰</button>

      <nav style={{
        width: 256, minWidth: 256, background: 'var(--dusty-dark)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: '28px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20, fontWeight: 500, color: 'var(--gold-light)',
            lineHeight: 1.3, letterSpacing: '0.2px'
          }}>A Life Less Ordinary</h1>
          <p style={{ fontSize: 10, color: 'var(--sage-mid)', marginTop: 5, letterSpacing: '0.9px', textTransform: 'uppercase', fontWeight: 300 }}>
            Sarisha du Plessis
          </p>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: '10px 0' }}>
          <div style={{ fontSize: 9, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '14px 22px 5px', fontWeight: 500 }}>
            Navigation
          </div>

          {/* Dashboard */}
          <NavBtn label="Overview" active={view === 'dashboard'} onClick={() => setView('dashboard')} />

          {/* Months */}
          <div style={{ fontSize: 9, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '14px 22px 5px', fontWeight: 500 }}>
            Months
          </div>
          {MONTHS.map((m, i) => (
            <NavBtn
              key={m}
              label={m}
              active={view === 'month' && activeMonth === i}
              completed={data.months[i].completed}
              isCurrent={i === currentMonthIdx}
              onClick={() => { setActiveMonth(i); setView('month'); }}
            />
          ))}

          {/* Year end */}
          <div style={{ fontSize: 9, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '14px 22px 5px', fontWeight: 500 }}>
            Year
          </div>
          <NavBtn label="Year-End Reflection" active={view === 'yearend'} onClick={() => setView('yearend')} />
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 22px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <SavePill saving={saving} />
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={onExport} style={{
              flex: 1, padding: '6px 0', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7,
              color: 'rgba(255,255,255,0.45)', fontSize: 11, cursor: 'pointer',
              fontFamily: "'Jost', sans-serif", transition: 'all 0.2s'
            }}>Export</button>
            <label style={{
              flex: 1, padding: '6px 0', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7,
              color: 'rgba(255,255,255,0.45)', fontSize: 11, cursor: 'pointer',
              fontFamily: "'Jost', sans-serif", textAlign: 'center', transition: 'all 0.2s'
            }}>
              Import
              <input type="file" accept=".json" style={{ display: 'none' }}
                onChange={e => { if (e.target.files[0]) onImport(e.target.files[0]); }} />
            </label>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavBtn({ label, active, completed, isCurrent, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      width: '100%', padding: '9px 22px',
      background: active ? 'rgba(201,168,76,0.09)' : 'none',
      border: 'none', borderLeft: `3px solid ${active ? 'var(--gold)' : 'transparent'}`,
      cursor: 'pointer', color: active ? 'var(--gold-light)' : completed ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.42)',
      fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 300, textAlign: 'left',
      transition: 'all 0.18s',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
        background: active ? 'var(--gold)' : completed ? 'var(--sage-mid)' : isCurrent ? 'var(--dusty)' : 'var(--sage)',
        opacity: active ? 1 : completed ? 0.7 : 0.35,
        transition: 'all 0.2s'
      }} />
      {label}
    </button>
  );
}
