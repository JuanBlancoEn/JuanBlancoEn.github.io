import React, { useState } from 'react';
import factionsData from '../data/factions.json';
import FactionSelector from '../components/FactionSelector';
import SquadBuilder from '../components/SquadBuilder';

function CreateTeamPage() {
  const [selectedFaction, setSelectedFaction] = useState("");

  return (
    <div className="create-team-container">
      <h2>Crear Equipo</h2>
      <FactionSelector
        factions={factionsData}
        selected={selectedFaction}
        onSelect={setSelectedFaction}
      />

      {selectedFaction && (
        <SquadBuilder factionData={factionsData[selectedFaction]} />
      )}
    </div>
  );
}

export default CreateTeamPage;
