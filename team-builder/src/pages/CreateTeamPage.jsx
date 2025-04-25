import React, { useState } from 'react';
import factionsData from '../data/factions.json';
import FactionSelector from '../components/FactionSelector';
import SquadBuilder from '../components/SquadBuilder';

function CreateTeamPage() {
  const [selectedFaction, setSelectedFaction] = useState("");
  const [importedSquad, setImportedSquad] = useState(null); // Esto es para el escuadrón creado
  const [showImportButton, setShowImportButton] = useState(false); // No se usa en esta página

  return (

    <div className="d-flex justify-content-center align-items-center background" style={{ minHeight: '100vh' }}>
      <div className="container-fluid p-4 border rounded shadow" style={{ maxWidth: '1000px' }}>
        <div className="container mt-4">
      <h2>Crear escuadrón</h2>
      
      {/* Mostrar el selector de facción */}
      <FactionSelector
        factions={factionsData}
        selected={selectedFaction}
        onSelect={(f) => {
          setSelectedFaction(f);
          setImportedSquad(null); // Limpiar el escuadrón importado
        }}
      />

      {/* Solo mostrar el SquadBuilder cuando haya una facción seleccionada */}
      {selectedFaction && (
        <SquadBuilder
        factionName={selectedFaction}
        factionData={factionsData[selectedFaction]}
        preloadedSquad={importedSquad}
      />
      )}
        </div>
      </div>
    </div>
  );
}

export default CreateTeamPage;
