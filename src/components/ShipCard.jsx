import React, { useState, useEffect } from 'react';
import upgradesData from '../data/upgrades.json';

function ShipCard({ ship, onAddPilot }) {
  const [selectedPilot, setSelectedPilot] = useState(null);
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [selectedUpgradeType, setSelectedUpgradeType] = useState('');
  const [selectedUpgrade, setSelectedUpgrade] = useState(null);
  const [appliedUpgrades, setAppliedUpgrades] = useState([]);

  // useEffect que limpia las mejoras cuando se cambia de nave o piloto
  useEffect(() => {
    setSelectedAbilities([]); // Limpiar habilidades
    setAppliedUpgrades([]); // Limpiar las mejoras
  }, [selectedPilot, ship]); // Este efecto se ejecuta cada vez que cambia el piloto o la nave

  const handleAdd = () => {
    if (selectedPilot) {
      const totalPoints =
        selectedPilot.basePoints +
        appliedUpgrades.reduce((sum, u) => sum + u.points, 0);

      onAddPilot(selectedPilot, appliedUpgrades, totalPoints);
    }
  };

  const handleAddUpgrade = () => {
    if (selectedUpgrade) {
      const exists = appliedUpgrades.some((u) => u.name === selectedUpgrade.name);
      if (!exists) {
        setAppliedUpgrades([...appliedUpgrades, selectedUpgrade]);
      }
    }
  };

  return (
    <div className="card p-3">
      <h5>{ship.name}</h5>

      <select
        className="form-select mb-2"
        onChange={(e) => {
          const pilot = ship.pilots.find((p) => p.name === e.target.value);
          setSelectedPilot(pilot);
        }}
      >
        <option>Seleccionar piloto</option>
        {ship.pilots.map((pilot) => (
          <option key={pilot.name} value={pilot.name}>
            {pilot.name} ({pilot.basePoints} pts)
          </option>
        ))}
      </select>

      {/* Selección de tipo de mejora */}
      {selectedPilot && (
        <div className="mb-2">
          <label><strong>Tipo de mejora:</strong></label>
          <select
            className="form-select"
            onChange={(e) => {
              setSelectedUpgradeType(e.target.value);
              setSelectedUpgrade(null);
            }}
            value={selectedUpgradeType}
          >
            <option value="">Selecciona un tipo</option>
            {Object.keys(upgradesData.upgrades).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selección de mejora específica */}
      {selectedUpgradeType && (
        <div className="mb-2">
          <label><strong>Mejora:</strong></label>
          <select
            className="form-select"
            onChange={(e) => {
              const upgrade = upgradesData.upgrades[selectedUpgradeType].find(
                (u) => u.name === e.target.value
              );
              setSelectedUpgrade(upgrade);
            }}
          >
            <option value="">Selecciona una mejora</option>
            {upgradesData.upgrades[selectedUpgradeType].map((upgrade) => (
              <option key={upgrade.name} value={upgrade.name}>
                {upgrade.name} (+{upgrade.points} pts)
              </option>
            ))}
          </select>
          <button className="btn btn-sm btn-outline-secondary mt-2" onClick={handleAddUpgrade}>
            Añadir mejora
          </button>
        </div>
      )}

      {/* Lista de mejoras aplicadas */}
      {appliedUpgrades.length > 0 && (
        <div className="mt-2">
          <strong>Mejoras añadidas:</strong>
          <ul>
            {appliedUpgrades.map((upg, i) => (
              <li key={i}>{upg.name} (+{upg.points} pts)</li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn btn-primary" onClick={handleAdd} disabled={!selectedPilot}>
        Añadir al equipo
      </button>
    </div>
  );
}

export default ShipCard;
