import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Team Builder</Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/create" className="nav-link">Crear Equipo</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
