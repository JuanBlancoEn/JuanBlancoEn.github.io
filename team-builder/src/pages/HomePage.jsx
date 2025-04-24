import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="d-flex justify-content-center align-items-center background" style={{ minHeight: '100vh' }}>
      <div className="container-fluid p-4 border rounded shadow" style={{ maxWidth: '600px' }}>
        <div className="text-center">
          <h1 className="mb-4">Bienvenido al Builder de Escuadrones X-Wing</h1>
          <p className="lead">Crea y comparte tus escuadrones de una forma rápida y sencilla</p>
          <Link to="/create" className="btn btn-primary btn-lg mt-3">
            Crear escuadrón
          </Link>
          <Link to="/import" className="btn btn-secondary mt-3 ml-3">Importar escuadrón</Link> {/* Enlace para importar equipo */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
