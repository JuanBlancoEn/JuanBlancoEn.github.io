import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import factionsData from '../data/factions.json';
import SquadBuilder from '../components/SquadBuilder';
import { decodeSquad } from '../utils/encodeSquad';

function ImportTeamPage() {
  const [importedSquad, setImportedSquad] = useState(null);
  const [selectedFaction, setSelectedFaction] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get("data");
    if (encoded) {
      const decoded = decodeSquad(encoded);
      console.log(decoded); // Verifica los datos decodificados en la consola
      if (decoded && factionsData[decoded.faction]) {
        setSelectedFaction(decoded.faction);
        setImportedSquad(decoded.ships); // Cargar el escuadrón importado
      }
    }
  }, [location.search]);

  return (
    <div className="container mt-4">

      {/* Solo mostrar el SquadBuilder cuando haya una facción seleccionada */}
      { (
        <SquadBuilder
          factionData={factionsData[selectedFaction]}
          preloadedSquad={importedSquad}
        />
      )}
    </div>
  );
  
}

export default ImportTeamPage;
