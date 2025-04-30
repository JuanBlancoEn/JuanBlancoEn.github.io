import React, { useState, useEffect } from 'react';
import factionsData from '../data/factions.json';
import FactionSelector from '../components/FactionSelector';
import SquadBuilder from '../components/SquadBuilder';

function CreateTeamPage() {
  const [selectedFaction, setSelectedFaction] = useState("");
  const [importedSquad, setImportedSquad] = useState(null); // Esto es para el escuadrón creado

  const getBackground = (faction) => {
    switch (faction) {
      case 'Alianza Rebelde':
        return 'linear-gradient(90deg, rgba(255, 28, 28, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(0, 191, 255, 1) 100%)';
      case 'Imperio Galáctico':
        return 'linear-gradient(90deg, rgba(255, 28, 28, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 28, 28, 1) 100%)';
      case 'Escoria y Villanos':
        return 'linear-gradient(90deg, rgba(255, 28, 28, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(46, 46, 46, 1) 100%)';
      default:
        return 'linear-gradient(90deg, rgba(255, 28, 28, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(0, 191, 255, 1) 100%)';
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center background"
      style={{
        minHeight: '100vh',
        background: getBackground(selectedFaction), // Usamos la función para el fondo
        transition: 'background 1s ease-in-out', // Esto añadirá una transición suave al fondo
      }}
    >
      <div className="container-fluid p-4 rounded shadow">
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
              showImport={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTeamPage;
