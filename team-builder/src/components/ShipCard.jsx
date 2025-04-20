import React, { useState, useEffect } from 'react';

function ShipCard({ ship, onAddPilot }) {
  const [selectedPilot, setSelectedPilot] = useState(null);
  const [selectedAbilities, setSelectedAbilities] = useState([]);

  useEffect(() => {
    // Cuando el piloto cambia, restablecemos las habilidades seleccionadas
    setSelectedAbilities([]);
  }, [selectedPilot]);

  const handleAdd = () => {
    if (selectedPilot) {
      // Calculamos el total de puntos (base + habilidades seleccionadas)
      const totalPoints =
        selectedPilot.basePoints + selectedAbilities.reduce((sum, ability) => sum + ability.points, 0);

      // Añadimos el piloto con las habilidades seleccionadas
      onAddPilot(selectedPilot, selectedAbilities, totalPoints);
    }
  };

  const toggleAbility = (ability) => {
    if (selectedAbilities.includes(ability)) {
      setSelectedAbilities(selectedAbilities.filter((a) => a !== ability));
    } else {
      setSelectedAbilities([...selectedAbilities, ability]);
    }
  };

  return (
    <div className="card p-3">
      <h5>{ship.name}</h5>

      {/* Selección de piloto */}
      <select
        className="form-select mb-2"
        onChange={(e) => {
          const pilot = ship.pilots.find((p) => p.name === e.target.value);
          setSelectedPilot(pilot); // Establecemos el piloto seleccionado
        }}
      >
        <option>Seleccionar piloto</option>
        {ship.pilots.map((pilot) => (
          <option key={pilot.name} value={pilot.name}>
            {pilot.name} ({pilot.basePoints} pts)
          </option>
        ))}
      </select>

      {/* Mostrar habilidades opcionales del piloto seleccionado */}
      {selectedPilot && selectedPilot.optionalAbilities && (
        <div className="mb-2">
          <strong>Habilidades opcionales:</strong>
          {selectedPilot.optionalAbilities.map((ability) => (
            <div key={ability.name}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedAbilities.includes(ability)}
                  onChange={() => toggleAbility(ability)}
                />{" "}
                {ability.name} (+{ability.points} pts)
              </label>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary" onClick={handleAdd} disabled={!selectedPilot}>
        Añadir al equipo
      </button>
    </div>
  );
}

export default ShipCard;
