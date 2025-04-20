import React from 'react';
import { encodeSquad } from '../utils/encodeSquad';

function SquadSummary({ squad, faction }) {
    const totalPoints = (squad || []).reduce((acc, ship) => acc + ship.points, 0);

  const handleShare = () => {
    const encoded = encodeSquad(faction, squad);
    const url = `${window.location.origin}/create?data=${encoded}`;
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado al portapapeles!");
  };

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
      <button className="btn btn-success mt-3" onClick={handleShare}>Compartir escuadrón</button>
    </div>
  );
}

export default SquadSummary;
