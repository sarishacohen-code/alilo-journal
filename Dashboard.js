import React from 'react';
import { MONTHS } from '../constants';
import { Card, CardTitle, GoldRule } from './ui';

function StatCard({ num, label, accent }) {
  const accents = {
    gold: 'var(--gold)',
    sage: 'var(--sage)',
    dusty: 'var(--dusty)',
    beige: 'var(--beige-deeper)',
  };
  return (
    <div style={{
      background: 'var(--white)', borderRadius: 16, padding: 24,
      boxShadow: '0 2px 12px var(--shadow)', border: '1px solid var(--beige-dark)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: accents[accent] || accents.gold, opacity: 0.7
      }} />
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 42, fontWeight: 300, color: 'var(--dusty-dark)', lineHeight: 1
      }}>{num}</div>
      <div style={{ fontSize: 12, color: 'var(--light)', marginTop: 6, letterSpacing: '0.4px' }}>{label}</div>
    </div>
  );
}

function MeterBar({ label, value, type }) {
  const fill = type === 'stress'
    ? 'linear-gradient(90deg, var(--gold-muted), #c97c4c)'
    : 'linear-gradient(90deg, var(--sage), var(--dusty))';
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: 'var(--light)', marginBottom: 6, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ height: 6, background: 'var(--beige-dark)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 3, width: `${value * 10}%`,
          background: fill, transition: 'width 0.8s ease'
        }} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--light)', marginTop: 4 }}>
        {value > 0 ? `${value}/10` : 'Not recorded yet'}
      </div>
    </div>
  );
}

export default function Dashboard({ data, setView, setActiveMonth }) {
  const completedMonths = data.months.filter(m => m.completed).length;
  const totalWins = data.months.reduce((acc, m) => acc + (m.winsLog?.length || 0), 0);
  const intentionsSet = data.months.filter(m => m.intention).length;
  const gratitudeEntries = data.months.filter(m => m.gratitude[0]).length;

  const lastEnergy = [...data.months].reverse().find(m => m.selfCheck.energy > 0);
  const lastStress = [...data.months].reverse().find(m => m.selfCheck.stress > 0);

  const recentWins = data.months
    .flatMap((m, i) => (m.winsLog || []).map(w => ({ month: MONTHS[i].slice(0, 3), text: w })))
    .slice(-5).reverse();

  const currentMonthIdx = new Date().getMonth();

  return (
    <div style={{ padding: '40px 32px', maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 38, fontWeight: 400, color: 'var(--dusty-dark)', letterSpacing: '-0.5px'
        }}>A Life Less Ordinary</h2>
        <p style={{ color: 'var(--mid)', fontSize: 14, marginTop: 6, fontWeight: 300 }}>
          Your journey, month by month. Progress unfolds.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard num={completedMonths} label="Months Completed" accent="gold" />
        <StatCard num={totalWins} label="Wins Logged" accent="sage" />
        <StatCard num={intentionsSet} label="Intentions Set" accent="dusty" />
        <StatCard num={gratitudeEntries} label="Gratitude Entries" accent="beige" />
      </div>

      {/* Year at a Glance + Wellness */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 20 }}>
        <Card>
          <CardTitle>Year at a Glance</CardTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {MONTHS.map((m, i) => {
              const md = data.months[i];
              const isCurrent = i === currentMonthIdx;
              const isDone = md.completed;
              const hasData = md.intention || md.weeks?.[0]?.win;
              let circleStyle = {
                width: 38, height: 38, borderRadius: '50%',
                border: '2px solid var(--beige-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 500, color: 'var(--light)',
                transition: 'all 0.3s', background: 'transparent'
              };
              if (isCurrent) circleStyle = { ...circleStyle, border: '2px solid var(--dusty)', background: 'var(--dusty)', color: 'white' };
              else if (isDone) circleStyle = { ...circleStyle, border: '2px solid var(--sage)', background: 'var(--sage-light)', color: 'var(--dusty)' };
              else if (hasData) circleStyle = { ...circleStyle, border: '2px solid var(--gold)', background: 'var(--gold-light)', color: 'var(--dark)' };

              return (
                <div key={m} onClick={() => { setActiveMonth(i); setView('month'); }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', padding: '8px 4px', borderRadius: 10, transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--beige)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={circleStyle}>{i + 1}</div>
                  <span style={{ fontSize: 10, color: 'var(--light)' }}>{m.slice(0, 3)}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { color: 'var(--dusty)', label: 'Current month' },
              { color: 'var(--gold)', label: 'In progress' },
              { color: 'var(--sage)', label: 'Completed' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--light)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                {label}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Caregiver Wellness</CardTitle>
          <MeterBar label="Last Energy Level" value={lastEnergy?.selfCheck.energy || 0} type="energy" />
          <MeterBar label="Last Stress Level" value={lastStress?.selfCheck.stress || 0} type="stress" />
          <GoldRule />
          <div style={{ fontSize: 13, color: 'var(--mid)', fontStyle: 'italic', lineHeight: 1.7 }}>
            {lastEnergy?.selfCheck.filling
              ? <><strong style={{ color: 'var(--dusty)', fontStyle: 'normal', fontSize: 11, letterSpacing: '0.5px', textTransform: 'uppercase' }}>What's filling you</strong><br />{lastEnergy.selfCheck.filling}</>
              : <span style={{ color: 'var(--light)' }}>Complete a self check-in to see your wellness summary here.</span>
            }
          </div>
        </Card>
      </div>

      {/* Recent wins */}
      <Card>
        <CardTitle>Recent Wins 🌱</CardTitle>
        {recentWins.length === 0
          ? <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--light)', fontSize: 13, fontStyle: 'italic' }}>
              Your wins will appear here as you log them each week.
            </div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentWins.map((w, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '12px 14px', background: 'var(--sage-light)',
                  borderRadius: 10, borderLeft: '3px solid var(--sage)'
                }}>
                  <div style={{ fontSize: 10, color: 'var(--sage)', fontWeight: 500, letterSpacing: '0.4px', whiteSpace: 'nowrap', paddingTop: 2 }}>{w.month}</div>
                  <div style={{ fontSize: 13, color: 'var(--dark)', lineHeight: 1.5, fontWeight: 300 }}>{w.text}</div>
                </div>
              ))}
            </div>
        }
      </Card>
    </div>
  );
}
