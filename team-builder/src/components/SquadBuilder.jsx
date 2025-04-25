import React, { useState, useEffect } from 'react';
import ShipCard from './ShipCard';
import SquadSummary from './SquadSummary';
import { encodeSquad, decodeSquad } from '../utils/encodeSquad';

function SquadBuilder({ factionData, factionName, preloadedSquad = [] }) {
  const [squad, setSquad] = useState([]);
  const [selectedShipName, setSelectedShipName] = useState('');
  const [importedSquad, setImportedSquad] = useState(null);

  useEffect(() => {
    // Resetear nave seleccionada si cambia la facción
    setSelectedShipName('');
    setSquad([]);
    setImportedSquad(null);
  }, [factionName]);

  const handleImport = (encodedData) => {
    const decoded = decodeSquad(encodedData);
    if (decoded && decoded.ships) {
      setImportedSquad(decoded.ships);
    }
  };

  const addShip = (ship, pilot, selectedAbilities = []) => {
    const basePoints = pilot.basePoints;
    const abilityPoints = selectedAbilities.reduce((sum, name) => {
      const ability = pilot.optionalAbilities.find(a => a.name === name);
      return sum + (ability?.points || 0);
    }, 0);
    const totalPoints = basePoints + abilityPoints;

    const newShip = {
      id: Date.now(),
      name: ship.name,
      pilot: pilot.name,
      basePoints,
      abilityPoints,
      points: totalPoints,
      abilities: selectedAbilities,
    };

    setSquad(prev => [...prev, newShip]);
  };

  const handleShare = () => {
    const encoded = encodeSquad(factionName, squad);
    const url = `${window.location.origin}/create?data=${encoded}`;
    navigator.clipboard.writeText(url)
      .then(() => alert("¡URL copiada al portapapeles!"))
      .catch(() => alert("No se pudo copiar la URL"));
  };

  const selectedShip = factionData.ships.find(s => s.name === selectedShipName);

  return (
    <div className="mt-4">
      <h4>Selecciona una nave</h4>
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedShipName}
          onChange={(e) => setSelectedShipName(e.target.value)}
        >
          <option value="">-- Elige una nave --</option>
          {factionData?.ships.map((ship) => (
            <option key={ship.name} value={ship.name}>
              {ship.name}
            </option>
          ))}
        </select>
      </div>

      {selectedShip && (
        <div className="row">
          <div className="col-md-12 mb-3">
            <ShipCard ship={selectedShip} onAddPilot={(pilot, abilities) => addShip(selectedShip, pilot, abilities)} />
          </div>
        </div>
      )}

      {importedSquad && (
        <>
          <h4>Escuadrón Importado</h4>
          <div className="row">
            {importedSquad.map((ship, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ship.name}</h5>
                    <p className="card-text">Piloto: {ship.pilot}</p>
                    <p className="card-text">Puntos: {ship.points}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
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
            if (encodedData) {
              handleImport(encodedData);
            }
          }}
        >
          Importar equipo
        </button>
      </div>
    </div>
  );
}

export default SquadBuilder;
