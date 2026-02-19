import React from 'react';
import { Card, Field, Textarea, GoldRule } from './ui';

export default function YearEnd({ data, updateYear }) {
  const fields = [
    ['biggestGrowth', 'Biggest Growth This Year', 'Reflect on how far you\'ve all come…'],
    ['milestone', 'A Milestone I Will Never Forget', 'Describe it vividly…'],
    ['parentGrowth', 'How I Have Grown as a Parent', 'Be honest and gentle with yourself…'],
    ['hopefulFor', 'What I Am Hopeful For Next Year', 'Dream a little…'],
  ];

  return (
    <div style={{ padding: '40px 32px', maxWidth: 800 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 42, fontWeight: 300, color: 'var(--dusty-dark)'
        }}>Year-End Reflection</h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18, fontStyle: 'italic', color: 'var(--mid)', marginTop: 8
        }}>"Look how far you've come."</p>
        <GoldRule style={{ maxWidth: 400, margin: '24px auto' }} />
      </div>

      <Card>
        {fields.map(([key, label, ph]) => (
          <Field key={key} label={label}>
            <Textarea value={data[key] || ''} onChange={e => updateYear(key, e.target.value)}
              placeholder={ph} minHeight={110} />
          </Field>
        ))}
      </Card>

      <div style={{
        marginTop: 48, textAlign: 'center',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 20, fontStyle: 'italic', color: 'var(--mid)', lineHeight: 2
      }}>
        Progress is not always loud.<br />
        Sometimes it whispers.<br />
        Sometimes it trembles.<br />
        <br />
        <strong style={{ color: 'var(--dusty)', fontStyle: 'normal', fontSize: 22 }}>But it is there. And so are you.</strong>
      </div>
    </div>
  );
}
