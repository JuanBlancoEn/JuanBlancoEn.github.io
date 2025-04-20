import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container-fluid p-4 border rounded shadow" style={{ maxWidth: '600px' }}>
        <div className="text-center">
          <h1 className="mb-4">Bienvenido al Builder de Equipos</h1>
          <p className="lead">Organiza y crea tus equipos personalizados para el juego de mesa.</p>
          <Link to="/create" className="btn btn-primary btn-lg mt-3">
            Crear un nuevo equipo
          </Link>
          <Link to="/import" className="btn btn-secondary mt-3 ml-3">Importar un equipo</Link> {/* Enlace para importar equipo */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
