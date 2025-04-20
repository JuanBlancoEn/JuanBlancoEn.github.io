import React, { useState } from 'react';
import ShipCard from './ShipCard';
import SquadSummary from './SquadSummary';
import { encodeSquad } from '../utils/encodeSquad'; // Asegúrate de importar correctamente la función encodeSquad
import { decodeSquad } from '../utils/encodeSquad'; // Asegúrate de tener esta función para decodificar el escuadrón

function SquadBuilder({ factionData, factionName, preloadedSquad = [] }) {
  const [squad, setSquad] = useState([]);
  const [importedSquad, setImportedSquad] = useState(null); // Estado para almacenar el escuadrón importado

  const handleImport = (encodedData) => {
    const decoded = decodeSquad(encodedData); // Decodificar el escuadrón
    if (decoded && decoded.ships) {
      setImportedSquad(decoded.ships); // Establecer el escuadrón importado
    }
  };

  const addShip = (ship, pilot) => {
    const newShip = {
      id: Date.now(), // Asignar un ID único
      name: ship.name,
      pilot: pilot.name,
      points: pilot.points,
    };
    setSquad([...squad, newShip]); // Añadir la nueva nave al escuadrón
  };

  const handleShare = () => {
    const encoded = encodeSquad(factionName, squad); // Codificar los datos del escuadrón
    const url = `${window.location.origin}/create?data=${encoded}`; // Generar la URL con los datos
    navigator.clipboard.writeText(url) // Copiar la URL al portapapeles
      .then(() => alert("¡URL copiada al portapapeles!"))
      .catch(() => alert("No se pudo copiar la URL"));
  };

  return (
    <div className="mt-4">
      <h4>Naves disponibles</h4>
      <div className="row">
        {factionData?.ships.map((ship) => (
          <div className="col-md-6 mb-3" key={ship.name}>
            <ShipCard ship={ship} onAddPilot={(pilot) => addShip(ship, pilot)} />
          </div>
        ))}
      </div>

      {/* Mostrar el escuadrón importado si está disponible */}
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

      {/* Botón para importar el equipo */}
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
              handleImport(encodedData); // Importar el escuadrón desde la URL
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
