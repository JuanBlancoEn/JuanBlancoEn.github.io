import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import factionsData from '../data/factions.json';
import SquadSummary from '../components/SquadSummary';
import { decodeSquad } from '../utils/encodeSquad';

function ImportTeamPage() {
  const [importedSquad, setImportedSquad] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get("data");
    if (encoded) {
      handleImport(encoded);
    }
  }, [location.search]);

  const handleImport = (encoded) => {
    const decoded = decodeSquad(encoded);
    if (decoded && decoded.ships) {
      setImportedSquad(decoded.ships);
      setLocationError(false);
    } else {
      setImportedSquad(null);
      setLocationError(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center background" style={{ minHeight: '100vh' }}>
      <div className="container-fluid p-4 rounded shadow" style={{ maxWidth: '1000px' }}>
        <h2>Importar escuadrón</h2>

        {/* Campo de URL */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Pega aquí la URL del escuadrón"
            id="importUrlInput"
            className="form-control"
          />
          <button
            className="btn btn-success mt-2"
            onClick={() => {
              const url = document.getElementById('importUrlInput').value;
              try {
                const params = new URLSearchParams(new URL(url).search);
                const encodedData = params.get("data");
                if (encodedData) {
                  handleImport(encodedData);
                } else {
                  setLocationError(true);
                }
              } catch (e) {
                setLocationError(true);
              }
            }}
          >
            Importar escuadrón
          </button>
        </div>

        {/* Mostrar escuadrón si existe */}
        <div className="mt-4">
          {importedSquad ? (
            <SquadSummary squad={importedSquad} setSquad={() => {}} />
          ) : locationError ? (
            <p className="text-danger mt-4">No se pudo importar el escuadrón. Verifica la URL.</p>
          ) : (
            <p className="text-muted mt-4">No se ha importado ningún escuadrón.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportTeamPage;
