import React from 'react';
import { useParams } from 'react-router-dom';

function TeamDetailPage() {
  const { id } = useParams(); // Obtener el id del equipo desde la URL

  return (
    <div className="container create-team-container">
      <h1 className="mt-5">Detalles del equipo {id}</h1>
      <p>Aquí se mostrarán los detalles del equipo {id}.</p>
    </div>
  );
}

export default TeamDetailPage;
