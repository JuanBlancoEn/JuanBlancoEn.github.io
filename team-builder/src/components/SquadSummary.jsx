import React from 'react';

function SquadSummary({ squad }) {
  const totalPoints = squad.reduce((acc, ship) => acc + ship.points, 0);

  return (
    <div className="mt-5">
      <h4>Escuadrón actual</h4>
      <ul className="list-group">
        {squad.map((ship) => (
          <li key={ship.id} className="list-group-item d-flex justify-content-between align-items-center">
            {ship.name} - {ship.pilot}
            <span className="badge bg-primary rounded-pill">{ship.points} pts</span>
          </li>
        ))}
      </ul>
      <h5 className="mt-3">Total: {totalPoints} puntos</h5>
    </div>
  );
}

export default SquadSummary;
