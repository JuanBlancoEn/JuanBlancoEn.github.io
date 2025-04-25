import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/r2d2logo.jpeg';


function Navbar() {
  return (
    <nav className="navbar navbar-bg sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
        <img
          src={logo}
            alt="R2 X-Wing Builder"
            style={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.4)"
            }}
        />
        </Link>

        <div className="d-flex gap-3">
          <Link to="/" className="nav-btn text-white">Inicio</Link>
          <Link to="/create" className="nav-btn text-white">Crear Equipo</Link>
          <Link to="/import" className="nav-btn text-white">Importar Equipo</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
