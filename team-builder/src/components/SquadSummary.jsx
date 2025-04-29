import React from 'react';

function SquadSummary({ squad }) {
  // Calcular puntos totales del escuadrón
  const totalPoints = squad.reduce((sum, ship) => sum + (ship.points || 0), 0);

  return (
    <div className="mt-4">
      <h4>Resumen del escuadrón</h4>

      {squad.map((ship) => {
        const upgradesPoints = ship.appliedUpgrades?.reduce(
          (sum, upgrade) => sum + (upgrade.points || 0), 0
        ) || 0;

        const totalShipPoints = ship.basePoints + upgradesPoints;

        return (
          <div key={ship.id} className="card mb-2 p-2">
            <h5>{ship.name} - {ship.pilot}</h5>
            <div>
              <p>Coste base: {ship.basePoints} pts</p>

              {ship.appliedUpgrades?.length > 0 && (
                <div>
                  <strong>Mejoras equipadas:</strong>
                  <ul className="mb-1">
                    {ship.appliedUpgrades.map((upgrade, idx) => (
                      <li key={idx}>{upgrade.name} (+{upgrade.points} pts)</li>
                    ))}
                  </ul>
                  <p>Puntos por mejoras: {upgradesPoints} pts</p>
                </div>
              )}

              <p><strong>Total: {totalShipPoints} pts</strong></p>
            </div>
          </div>
        );
      })}

      <h5 className="mt-3">Total del escuadrón: {totalPoints} puntos</h5>
    </div>
  );
}

export default SquadSummary;
