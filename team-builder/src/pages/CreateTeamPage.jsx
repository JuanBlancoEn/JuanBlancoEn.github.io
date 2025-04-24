import React, { useState } from 'react';
import factionsData from '../data/factions.json';
import FactionSelector from '../components/FactionSelector';
import SquadBuilder from '../components/SquadBuilder';

function CreateTeamPage() {
  const [selectedFaction, setSelectedFaction] = useState("");
  const [importedSquad, setImportedSquad] = useState(null); // Esto es para el escuadrón creado
  const [showImportButton, setShowImportButton] = useState(false); // No se usa en esta página

  return (
    <div className="container mt-4 background">
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
          factionData={factionsData[selectedFaction]}
          preloadedSquad={importedSquad}
        />
      )}
    </div>
  );
}

export default CreateTeamPage;
