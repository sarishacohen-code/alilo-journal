import React from 'react';
import { Field, Input, Textarea } from '../ui';

export default function IntentionSection({ month, update }) {
  return (
    <div>
      <Field label="This month, I want to focus on">
        <Textarea value={month.intention}
          onChange={e => update('intention', e.target.value)}
          placeholder="Write your intention for this month…" minHeight={90} />
      </Field>
      <Field label="Therapy Goals">
        {month.goals.map((g, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <Input value={g}
              onChange={e => { const g2 = [...month.goals]; g2[i] = e.target.value; update('goals', g2); }}
              placeholder={`Goal ${i + 1}…`} />
          </div>
        ))}
      </Field>
      <Field label="One Word for This Month" style={{ maxWidth: 300 }}>
        <Input value={month.oneWord}
          onChange={e => update('oneWord', e.target.value)}
          placeholder="e.g. Courage, Steady, Bloom…" />
      </Field>
    </div>
  );
}
