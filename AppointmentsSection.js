import React from 'react';

const COLS = ['date', 'type', 'focus', 'notes', 'followUp'];
const HEADERS = ['Date', 'Therapy / Appt', 'Focus', 'Notes', 'Follow-Up'];

export default function AppointmentsSection({ month, update }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {HEADERS.map(h => (
              <th key={h} style={{
                textAlign: 'left', fontSize: 11, letterSpacing: '0.6px',
                textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 500,
                padding: '0 8px 12px', borderBottom: '2px solid var(--gold-light)'
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {month.appointments.map((row, ri) => (
            <tr key={ri}>
              {COLS.map(col => (
                <td key={col} style={{ padding: '5px 6px' }}>
                  <input
                    value={row[col]}
                    onChange={e => {
                      const appts = month.appointments.map((r, idx) =>
                        idx === ri ? { ...r, [col]: e.target.value } : r
                      );
                      update('appointments', appts);
                    }}
                    placeholder="—"
                    style={{
                      width: '100%', padding: '8px 10px',
                      background: ri % 2 === 1 ? 'var(--sage-light)' : 'var(--beige)',
                      border: '1px solid transparent', borderRadius: 7,
                      fontFamily: "'Jost', sans-serif", fontSize: 13,
                      color: 'var(--dark)', fontWeight: 300, outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--sage-mid)'; e.target.style.background = 'var(--white)'; }}
                    onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = ri % 2 === 1 ? 'var(--sage-light)' : 'var(--beige)'; }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
