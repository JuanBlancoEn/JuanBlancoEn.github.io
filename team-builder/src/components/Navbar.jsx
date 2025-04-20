import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">R2 X-Wing Builder</Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/create" className="nav-link">Crear Equipo</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
