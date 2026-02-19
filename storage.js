import { STORAGE_KEY, EMPTY_YEAR } from './constants';

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all months exist (backwards compatibility)
      if (parsed.months && parsed.months.length === 12) return parsed;
    }
  } catch (e) {
    console.warn('Could not load journal data:', e);
  }
  return EMPTY_YEAR();
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save journal data:', e);
  }
}

export function exportData(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'a-life-less-ordinary-journal-backup.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(file, onSuccess, onError) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.months && data.months.length === 12) {
        saveData(data);
        onSuccess(data);
      } else {
        onError('Invalid journal file.');
      }
    } catch {
      onError('Could not read file.');
    }
  };
  reader.readAsText(file);
}
