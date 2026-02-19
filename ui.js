import React from 'react';

export function GoldRule({ style }) {
  return <div style={{
    height: 1,
    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
    margin: '24px 0',
    ...style
  }} />;
}

export function SectionDivider() {
  return <div style={{
    height: 2,
    background: 'linear-gradient(90deg, var(--gold), transparent)',
    margin: '12px 0 28px',
    borderRadius: 1
  }} />;
}

export function Field({ label, children, style }) {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      {label && (
        <label style={{
          display: 'block', fontSize: 11, color: 'var(--mid)',
          letterSpacing: '0.6px', textTransform: 'uppercase',
          fontWeight: 500, marginBottom: 8
        }}>{label}</label>
      )}
      {children}
    </div>
  );
}

export function Input({ value, onChange, placeholder, style }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '11px 15px',
        background: 'var(--beige)', border: '1px solid var(--beige-dark)',
        borderRadius: 10, fontFamily: "'Jost', sans-serif",
        fontSize: 14, color: 'var(--dark)', fontWeight: 300,
        outline: 'none', transition: 'border-color 0.2s, background 0.2s',
        ...style
      }}
      onFocus={e => { e.target.style.borderColor = 'var(--sage)'; e.target.style.background = 'var(--white)'; }}
      onBlur={e => { e.target.style.borderColor = 'var(--beige-dark)'; e.target.style.background = 'var(--beige)'; }}
    />
  );
}

export function Textarea({ value, onChange, placeholder, minHeight = 80 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '11px 15px',
        background: 'var(--beige)', border: '1px solid var(--beige-dark)',
        borderRadius: 10, fontFamily: "'Jost', sans-serif",
        fontSize: 14, color: 'var(--dark)', fontWeight: 300,
        resize: 'vertical', outline: 'none', minHeight,
        lineHeight: 1.7, transition: 'border-color 0.2s, background 0.2s',
      }}
      onFocus={e => { e.target.style.borderColor = 'var(--sage)'; e.target.style.background = 'var(--white)'; }}
      onBlur={e => { e.target.style.borderColor = 'var(--beige-dark)'; e.target.style.background = 'var(--beige)'; }}
    />
  );
}

export function Button({ children, onClick, variant = 'primary', style }) {
  const variants = {
    primary: { background: 'var(--dusty)', color: 'white' },
    gold: { background: 'var(--gold)', color: 'var(--dark)' },
    ghost: { background: 'transparent', color: 'var(--mid)', border: '1px solid var(--beige-dark)' },
  };
  return (
    <button onClick={onClick} style={{
      padding: '10px 22px', borderRadius: 10, border: 'none',
      cursor: 'pointer', fontFamily: "'Jost', sans-serif",
      fontSize: 13, fontWeight: 400, letterSpacing: '0.3px',
      transition: 'all 0.2s', ...variants[variant], ...style
    }}>
      {children}
    </button>
  );
}

export function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--white)', borderRadius: 16,
      padding: 28, boxShadow: '0 2px 12px var(--shadow)',
      border: '1px solid var(--beige-dark)', ...style
    }}>
      {children}
    </div>
  );
}

export function CardTitle({ children }) {
  return (
    <h3 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 20, fontWeight: 500, color: 'var(--dusty-dark)',
      marginBottom: 20, letterSpacing: '0.2px'
    }}>{children}</h3>
  );
}

export function SavePill({ saving }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 20,
      fontSize: 11, fontWeight: 400, letterSpacing: '0.3px',
      background: saving ? 'var(--gold-light)' : 'rgba(255,255,255,0.08)',
      color: saving ? 'var(--mid)' : 'rgba(255,255,255,0.35)',
      border: `1px solid ${saving ? 'var(--gold-muted)' : 'rgba(255,255,255,0.1)'}`,
      transition: 'all 0.3s'
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: saving ? 'var(--gold)' : 'var(--sage)',
        opacity: saving ? 1 : 0.6
      }} />
      {saving ? 'Saving…' : 'All saved'}
    </span>
  );
}
