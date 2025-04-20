import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTeamPage() {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para guardar el equipo
    // Por ahora solo redirige a la página de detalles
    navigate(`/team/${teamName}`);
  };

  return (
    <div className="container create-team-container">
      <h1 className="mt-5">Crear un equipo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="teamName" className="form-label">Nombre del equipo</label>
          <input 
            type="text" 
            className="form-control" 
            id="teamName" 
            value={teamName} 
            onChange={(e) => setTeamName(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear equipo</button>
      </form>
    </div>
  );
}

export default CreateTeamPage;  {/* Asegúrate de que esta línea esté aquí */}
