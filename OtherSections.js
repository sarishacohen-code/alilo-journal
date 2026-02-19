import React from 'react';
import { Field, Textarea, Input, Button, GoldRule } from '../ui';

export function ProgressSection({ month, update }) {
  return (
    <div>
      {[
        ['skill', 'A Skill That Improved', 'What got better this month…'],
        ['easier', 'Something That Became Easier', 'Describe the shift…'],
        ['breakthrough', 'An Emotional Breakthrough', 'What shifted emotionally…'],
        ['proud', 'A Moment That Made Me Proud', 'Describe it in detail…'],
      ].map(([key, label, ph]) => (
        <Field key={key} label={label}>
          <Textarea value={month.progress[key]}
            onChange={e => update('progress', { ...month.progress, [key]: e.target.value })}
            placeholder={ph} />
        </Field>
      ))}
    </div>
  );
}

export function HardDaysSection({ month, update }) {
  return (
    <div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontStyle: 'italic', color: 'var(--mid)', marginBottom: 24, lineHeight: 1.6 }}>
        This is a safe space. Let it out.
      </p>
      {[
        ['heavy', 'What Felt Heavy This Month?', 'Let it out…'],
        ['emotions', 'What Emotions Surfaced?', 'Name them honestly…'],
        ['support', 'What Support Do I Need Moving Forward?', 'Be specific with yourself…'],
        ['truth', 'One Truth I Want to Remember', 'Something to hold onto…'],
      ].map(([key, label, ph]) => (
        <Field key={key} label={label}>
          <Textarea value={month.hardDays[key]}
            onChange={e => update('hardDays', { ...month.hardDays, [key]: e.target.value })}
            placeholder={ph} />
        </Field>
      ))}
    </div>
  );
}

export function SelfCheckSection({ month, update }) {
  const sc = month.selfCheck;
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 4 }}>
        {[['energy', 'Energy Level'], ['stress', 'Stress Level']].map(([key, label]) => (
          <Field key={key} label={`${label} — ${sc[key] || 0}/10`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="range" min={0} max={10} value={sc[key] || 0}
                onChange={e => update('selfCheck', { ...sc, [key]: Number(e.target.value) })}
                style={{ flex: 1, accentColor: 'var(--sage)' }} />
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'var(--sage-light)', border: '1px solid var(--sage-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 500, color: 'var(--dusty)', flexShrink: 0
              }}>{sc[key] || 0}</div>
            </div>
          </Field>
        ))}
        <Field label="Sleep Quality">
          <Input value={sc.sleep}
            onChange={e => update('selfCheck', { ...sc, sleep: e.target.value })}
            placeholder="e.g. Restful, Broken…" />
        </Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="What Is Draining Me?">
          <Textarea value={sc.draining}
            onChange={e => update('selfCheck', { ...sc, draining: e.target.value })}
            placeholder="…" minHeight={70} />
        </Field>
        <Field label="What Is Filling Me?">
          <Textarea value={sc.filling}
            onChange={e => update('selfCheck', { ...sc, filling: e.target.value })}
            placeholder="…" minHeight={70} />
        </Field>
      </div>
      <Field label="One Thing I Will Do for Myself Next Month">
        <Input value={sc.selfCare}
          onChange={e => update('selfCheck', { ...sc, selfCare: e.target.value })}
          placeholder="Something kind, just for you…" />
      </Field>
    </div>
  );
}

export function GratitudeSection({ month, update }) {
  return (
    <div>
      <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 20, fontStyle: 'italic' }}>
        Three things I'm grateful for this month:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
        {month.gratitude.map((g, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--gold-light)', border: '1px solid var(--gold-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 500, color: 'var(--dark)', flexShrink: 0
            }}>{i + 1}</div>
            <Input value={g}
              onChange={e => { const gr = [...month.gratitude]; gr[i] = e.target.value; update('gratitude', gr); }}
              placeholder="I'm grateful for…" />
          </div>
        ))}
      </div>
      <GoldRule />
      <Field label="A Memory I Want to Hold Onto">
        <Textarea value={month.memory} onChange={e => update('memory', e.target.value)}
          placeholder="Describe this moment in detail…" minHeight={100} />
      </Field>
      <div style={{ marginTop: 24, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={() => update('completed', true)}>
          ✓ Mark Month Complete
        </Button>
        {month.completed && (
          <span style={{ fontSize: 12, color: 'var(--sage)', fontStyle: 'italic' }}>
            ✦ Completed — beautifully done.
          </span>
        )}
        {month.completed && (
          <Button variant="ghost" style={{ fontSize: 12, padding: '6px 14px' }}
            onClick={() => update('completed', false)}>
            Reopen
          </Button>
        )}
      </div>
    </div>
  );
}
