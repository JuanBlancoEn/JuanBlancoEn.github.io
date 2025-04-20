import React, { useState } from 'react';
import ShipCard from './ShipCard';
import SquadSummary from './SquadSummary';

function SquadBuilder({ factionData }) {
  const [squad, setSquad] = useState([]);

  const addShip = (ship, pilot) => {
    const newShip = {
      id: Date.now(), // ID único para cada nave añadida
      name: ship.name,
      pilot: pilot.name,
      points: pilot.points,
    };
    setSquad([...squad, newShip]);
  };

  return (
    <div className="mt-4">
      <h4>Naves disponibles</h4>
      <div className="row">
        {factionData.ships.map((ship) => (
          <div className="col-md-6 mb-3" key={ship.name}>
            <ShipCard ship={ship} onAddPilot={(pilot) => addShip(ship, pilot)} />
          </div>
        ))}
      </div>

      <SquadSummary squad={squad} />
    </div>
  );
}

export default SquadBuilder;
