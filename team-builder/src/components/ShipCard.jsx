import React from 'react';

function ShipCard({ ship, onAddPilot }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{ship.name}</h5>
        <p>Pilotos disponibles:</p>
        {ship.pilots.map((pilot) => (
          <button
            key={pilot.name}
            className="btn btn-outline-primary btn-sm me-2 mb-2"
            onClick={() => onAddPilot(pilot)}
          >
            {pilot.name} ({pilot.points} pts)
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShipCard;
