import React, { useState } from 'react';
import ShipCard from './ShipCard';
import SquadSummary from './SquadSummary';
import { encodeSquad, decodeSquad } from '../utils/encodeSquad';

function SquadBuilder({ factionData, factionName, preloadedSquad = [] }) {
  const [squad, setSquad] = useState([]);
  const [selectedShipName, setSelectedShipName] = useState('');
  const [importedSquad, setImportedSquad] = useState(null);

  const selectedShip = factionData.ships.find(s => s.name === selectedShipName);

  const addShip = (pilot, upgrades, totalPoints) => {
    const basePoints = pilot.basePoints;

    // Limpiar las mejoras de todas las naves en el escuadrón antes de añadir una nueva nave
    setSquad(prevSquad => [
      ...prevSquad,  // Agregar la nave nueva
      {
        id: Date.now(),
        name: selectedShip.name,
        pilot: pilot.name,
        basePoints,
        appliedUpgrades: upgrades, // Aquí aplicas las mejoras de la nave actual
        points: totalPoints,
      }
    ]);
  };

  const handleShare = () => {
    const encoded = encodeSquad(factionName, squad);
    const url = `${window.location.origin}/create?data=${encoded}`;
    navigator.clipboard.writeText(url)
      .then(() => alert("¡URL copiada al portapapeles!"))
      .catch(() => alert("No se pudo copiar la URL"));
  };

  const handleImport = (encodedData) => {
    const decoded = decodeSquad(encodedData);
    if (decoded && decoded.ships) {
      setImportedSquad(decoded.ships);
    }
  };

  return (
    <div className="mt-4">
      <h4>Selecciona una nave</h4>
      <select
        className="form-select mb-3"
        value={selectedShipName}
        onChange={(e) => setSelectedShipName(e.target.value)}
      >
        <option value="">-- Elige una nave --</option>
        {factionData.ships.map((ship) => (
          <option key={ship.name} value={ship.name}>{ship.name}</option>
        ))}
      </select>

      {selectedShip && (
        <div className="row">
          <div className="col-md-12 mb-3">
            <ShipCard ship={selectedShip} onAddPilot={addShip} />
          </div>
        </div>
      )}

      <SquadSummary squad={squad} />

      {squad.length > 0 && (
        <div className="mt-4">
          <h5>Compartir escuadrón</h5>
          <button className="btn btn-outline-primary" onClick={handleShare}>
            Copiar URL del equipo
          </button>
        </div>
      )}

      <div className="mt-4">
        <input
          type="text"
          placeholder="Pega la URL aquí para importar el equipo"
          id="importUrl"
          className="form-control"
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            const url = document.getElementById('importUrl').value;
            const params = new URLSearchParams(new URL(url).search);
            const encodedData = params.get('data');
            if (encodedData) handleImport(encodedData);
          }}
        >
          Importar equipo
        </button>
      </div>
    </div>
  );
}

export default SquadBuilder;
