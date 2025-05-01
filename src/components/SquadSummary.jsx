import React from 'react';

function SquadSummary({ squad, setSquad }) {
  const totalPoints = squad.reduce((sum, ship) => sum + (ship.points || 0), 0);

  const removeUpgrade = (shipId, indexToRemove) => {
    setSquad(prevSquad =>
      prevSquad.map(ship => {
        if (ship.id !== shipId) return ship;

        const updatedUpgrades = [...(ship.appliedUpgrades || [])];
        updatedUpgrades.splice(indexToRemove, 1);

        const newPoints = ship.basePoints + updatedUpgrades.reduce((sum, upg) => sum + (upg.points || 0), 0);

        return {
          ...ship,
          appliedUpgrades: updatedUpgrades,
          points: newPoints
        };
      })
    );
  };

  const removeShip = (shipId) => {
    setSquad(prevSquad => prevSquad.filter(ship => ship.id !== shipId));
  };

  return (
    <div className="mt-4">
      <h4>Resumen del escuadrón</h4>

      {squad.map((ship) => {
        const upgradesPoints = ship.appliedUpgrades?.reduce(
          (sum, upgrade) => sum + (upgrade.points || 0), 0
        ) || 0;

        const totalShipPoints = ship.basePoints + upgradesPoints;

        return (
          <div key={ship.id} className="card mb-2 p-2 position-relative " style={{ paddingRight: '3rem' }}>
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="me-2" style={{ wordBreak: 'break-word', flex: 1 }}>
                    {ship.name} - {ship.pilot}
                  </h5>
                  <button
                    className="btn-close"
                    aria-label="Eliminar nave"
                    onClick={() => removeShip(ship.id)}
                  ></button>
                </div>
            <div>
              <p>Coste base: {ship.basePoints} pts</p>

              {ship.appliedUpgrades?.length > 0 && (
                <div>
                  <strong>Mejoras equipadas:</strong>
                  <ul className="list-unstyled">
                    {ship.appliedUpgrades.map((upgrade, idx) => (
                      <li key={idx} className="d-flex justify-content-between align-items-center">
                        <span>{upgrade.name} (+{upgrade.points} pts)</span>
                        <button
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={() => removeUpgrade(ship.id, idx)}
                        >
                          ✕
                        </button>
                      </li>
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
