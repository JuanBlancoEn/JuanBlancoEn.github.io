import React from 'react';

function SquadSummary({ squad }) {
  // Calcula el total de puntos del escuadrón
  const totalPoints = squad.reduce((sum, ship) => {
    const abilitiesPoints = ship.abilities // Cambié selectedAbilities a abilities
      ? ship.abilities.reduce((sum, ability) => sum + ability.points, 0)
      : 0;
    return sum + ship.basePoints + abilitiesPoints;
  }, 0);

  return (
    <div className="mt-4">
      <h4>Resumen del escuadrón</h4>
      {squad.map((ship) => {
        const abilitiesPoints = ship.abilities // Cambié selectedAbilities a abilities
          ? ship.abilities.reduce((sum, ability) => sum + ability.points, 0)
          : 0;

        const totalShipPoints = ship.basePoints + abilitiesPoints;

        return (
          <div key={ship.id} className="card mb-2 p-2">
            <h5>{ship.name} - {ship.pilot}</h5>
            <p>
              Coste base: {ship.basePoints} pts
              {ship.abilities && ship.abilities.length > 0 && (
                <>
                  <br />
                  Habilidades activadas:
                  <ul>
                    {ship.abilities.map((ability, idx) => (
                      <li key={idx}>{ability.name}</li>
                    ))}
                  </ul>
                  Puntos extra por habilidades: {abilitiesPoints} pts
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
