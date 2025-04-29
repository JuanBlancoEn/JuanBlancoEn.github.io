import React from 'react';

function FactionSelector({ factions, selected, onSelect }) {
  return (
    <div className="mb-3">
      <label htmlFor="faction-select" className="form-label">Elige una facción:</label>
      <select
        id="faction-select"
        className="form-select"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Selecciona --</option>
        {Object.keys(factions).map(faction => (
          <option key={faction} value={faction}>{faction}</option>
        ))}
      </select>
    </div>
  );
}

export default FactionSelector;
