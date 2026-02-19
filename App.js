import React, { useState, useEffect, useCallback, useRef } from 'react';
import './index.css';
import { EMPTY_YEAR } from './constants';
import { loadData, saveData, exportData, importData } from './storage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MonthView from './components/MonthView';
import YearEnd from './components/YearEnd';

export default function App() {
  const [data, setData] = useState(null);
  const [view, setView] = useState('dashboard');
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  const triggerSave = useCallback((newData) => {
    setSaving(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveData(newData);
      setSaving(false);
    }, 600);
  }, []);

  function updateMonth(monthIdx, key, val) {
    setData(prev => {
      const months = prev.months.map((m, i) =>
        i === monthIdx ? { ...m, [key]: val } : m
      );
      const next = { ...prev, months };
      triggerSave(next);
      return next;
    });
  }

  function updateYear(key, val) {
    setData(prev => {
      const next = { ...prev, [key]: val };
      triggerSave(next);
      return next;
    });
  }

  function handleImport(file) {
    importData(
      file,
      (newData) => { setData(newData); setView('dashboard'); },
      (err) => alert('Import failed: ' + err)
    );
  }

  if (!data) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22, color: 'var(--mid)', background: 'var(--beige)'
      }}>
        Loading your journal…
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        data={data}
        view={view}
        activeMonth={activeMonth}
        setView={setView}
        setActiveMonth={setActiveMonth}
        saving={saving}
        onExport={() => exportData(data)}
        onImport={handleImport}
      />

      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--beige)' }}>
        {view === 'dashboard' && (
          <Dashboard data={data} setView={setView} setActiveMonth={setActiveMonth} />
        )}
        {view === 'month' && (
          <MonthView
            data={data}
            monthIdx={activeMonth}
            setMonthIdx={setActiveMonth}
            updateMonth={updateMonth}
          />
        )}
        {view === 'yearend' && (
          <YearEnd data={data} updateYear={updateYear} />
        )}
      </main>
    </div>
  );
}
