import React, { useState } from 'react';
import { MONTHS, MONTH_QUOTES, SECTIONS } from '../constants';
import { SectionDivider } from '../ui';
import IntentionSection from './sections/IntentionSection';
import AppointmentsSection from './sections/AppointmentsSection';
import WeeklySection from './sections/WeeklySection';
import { ProgressSection, HardDaysSection, SelfCheckSection, GratitudeSection } from './sections/OtherSections';

export default function MonthView({ data, monthIdx, setMonthIdx, updateMonth }) {
  const [activeTab, setActiveTab] = useState(0);
  const month = data.months[monthIdx];

  function update(key, val) { updateMonth(monthIdx, key, val); }

  const sectionContent = [
    <IntentionSection month={month} update={update} />,
    <AppointmentsSection month={month} update={update} />,
    <WeeklySection month={month} update={update} />,
    <ProgressSection month={month} update={update} />,
    <HardDaysSection month={month} update={update} />,
    <SelfCheckSection month={month} update={update} />,
    <GratitudeSection month={month} update={update} />,
  ];

  return (
    <div style={{ padding: '40px 32px', maxWidth: 900 }}>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <button onClick={() => { setMonthIdx(Math.max(0, monthIdx - 1)); setActiveTab(0); }}
          style={{
            background: 'var(--white)', border: '1px solid var(--beige-dark)',
            borderRadius: '50%', width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--mid)', fontSize: 20,
            boxShadow: '0 1px 6px var(--shadow)', transition: 'all 0.2s',
            opacity: monthIdx === 0 ? 0.3 : 1
          }}>‹</button>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 44, fontWeight: 400, color: 'var(--dusty-dark)', lineHeight: 1
          }}>{MONTHS[monthIdx]}</div>
          {data.months[monthIdx].completed && (
            <div style={{ fontSize: 11, color: 'var(--sage)', marginTop: 6, letterSpacing: '0.5px' }}>✦ COMPLETED</div>
          )}
        </div>

        <button onClick={() => { setMonthIdx(Math.min(11, monthIdx + 1)); setActiveTab(0); }}
          style={{
            background: 'var(--white)', border: '1px solid var(--beige-dark)',
            borderRadius: '50%', width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--mid)', fontSize: 20,
            boxShadow: '0 1px 6px var(--shadow)', transition: 'all 0.2s',
            opacity: monthIdx === 11 ? 0.3 : 1
          }}>›</button>
      </div>

      {/* Quote */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 17, fontStyle: 'italic', color: 'var(--mid)',
        textAlign: 'center', padding: '0 32px', marginBottom: 32, lineHeight: 1.7
      }}>
        "{MONTH_QUOTES[monthIdx]}"
      </div>

      {/* Section tabs */}
      <div style={{
        display: 'flex', gap: 2, marginBottom: 28,
        background: 'var(--beige-dark)', borderRadius: 12, padding: 4,
        flexWrap: 'wrap'
      }}>
        {SECTIONS.map((s, i) => (
          <button key={s} onClick={() => setActiveTab(i)} style={{
            flex: 1, padding: '8px 10px', background: activeTab === i ? 'var(--white)' : 'none',
            border: 'none', borderRadius: 9, cursor: 'pointer',
            fontFamily: "'Jost', sans-serif", fontSize: 12,
            fontWeight: activeTab === i ? 500 : 400,
            color: activeTab === i ? 'var(--dusty-dark)' : 'var(--mid)',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
            boxShadow: activeTab === i ? '0 1px 6px var(--shadow)' : 'none'
          }}>{s}</button>
        ))}
      </div>

      {/* Section content */}
      <div style={{
        background: 'var(--white)', borderRadius: 16,
        padding: 32, boxShadow: '0 2px 12px var(--shadow)',
        border: '1px solid var(--beige-dark)'
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26, fontWeight: 500, color: 'var(--dusty-dark)', marginBottom: 6
        }}>{SECTIONS[activeTab]}</h3>
        <SectionDivider />
        {sectionContent[activeTab]}
      </div>
    </div>
  );
}
