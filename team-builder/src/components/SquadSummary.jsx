import React from 'react';

function SquadSummary({ squad }) {
  // Calcular puntos totales del escuadrón
  const totalPoints = squad.reduce((sum, ship) => sum + (ship.points || 0), 0);

  return (
    <div className="mt-4">
      <h4>Resumen del escuadrón</h4>

      {squad.map((ship) => {
        // Sumar puntos de mejoras (si existen)
        const upgradesPoints = ship.appliedUpgrades?.reduce(
          (sum, upgrade) => sum + (upgrade.points || 0), 0
        ) || 0;

        const totalShipPoints = ship.basePoints + upgradesPoints;

        return (
          <div key={ship.id} className="card mb-2 p-2">
            <h5>{ship.name} - {ship.pilot}</h5>
            <p>
              Coste base: {ship.basePoints} pts
              {ship.appliedUpgrades?.length > 0 && (
                <>
                  <br />
                  Mejoras equipadas:
                  <ul>
                    {ship.appliedUpgrades.map((upgrade, idx) => (
                      <li key={idx}>{upgrade.name} (+{upgrade.points} pts)</li>
                    ))}
                  </ul>
                  Puntos por mejoras: {upgradesPoints} pts
                </>
              )}
              <br />
              <strong>Total: {totalShipPoints} pts</strong>
            </p>
          </div>
        );
      })}

      <h5 className="mt-3">Total del escuadrón: {totalPoints} puntos</h5>
    </div>
  );
}

export default SquadSummary;
