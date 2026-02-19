import React from 'react';
import { Field, Input, Button } from '../ui';

export default function WeeklySection({ month, update }) {
  const allWins = month.winsLog || [];

  return (
    <div>
      {month.weeks.map((week, wi) => (
        <div key={wi} style={{
          border: '1px solid var(--beige-dark)', borderRadius: 12,
          padding: 20, marginBottom: 16, background: 'var(--beige)'
        }}>
          <h4 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20, color: 'var(--sage)', marginBottom: 18, fontWeight: 500
          }}>Week {wi + 1} Reflection</h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              ['effort', 'Biggest Effort Shown', 'What stood out…'],
              ['noticed', 'Something New I Noticed', 'A new skill, reaction, moment…'],
              ['win', 'A Win (No Matter How Small)', 'Celebrate it…'],
              ['challenges', 'Challenges We Faced', 'What was hard…'],
            ].map(([key, label, ph]) => (
              <Field key={key} label={label}>
                <Input value={week[key]} placeholder={ph}
                  onChange={e => {
                    const w = month.weeks.map((wk, i) => i === wi ? { ...wk, [key]: e.target.value } : wk);
                    update('weeks', w);
                  }} />
              </Field>
            ))}
          </div>

          {week.win && !allWins.includes(week.win) && (
            <Button variant="gold" style={{ fontSize: 12, padding: '6px 14px', marginTop: 4 }}
              onClick={() => update('winsLog', [...allWins, week.win])}>
              ✦ Add to Wins Log
            </Button>
          )}
          {week.win && allWins.includes(week.win) && (
            <span style={{ fontSize: 12, color: 'var(--sage)', fontStyle: 'italic' }}>✓ Added to wins log</span>
          )}
        </div>
      ))}
    </div>
  );
}
