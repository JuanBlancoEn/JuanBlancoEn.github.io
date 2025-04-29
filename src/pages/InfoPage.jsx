import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/r2d2logo.jpeg';  // Asegúrate de colocar la ruta correcta de tu logo

function InfoPage() {
  return (
    <div className="d-flex justify-content-center align-items-center background" style={{ minHeight: '100vh' }}>
      <div className="container-fluid p-4 rounded shadow" style={{ maxWidth: '1000px' }}>
        
        {/* Sección con el logo */}
        <div className="text-center">
          <img src={logo} alt="Logo de la Asociación R2D2 X-Wing" style={{ width: '150px', marginBottom: '20px' }} />  {/* Logo con tamaño ajustable */}
          <h1 className="mb-4">R2D2 X-Wing</h1>
          <p className="lead">
            ¡Bienvenido a nuestra página de contacto! Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros.
          </p>
        </div>
        
        <div className="row mt-5">
          <div className="col-md-6">
            <h3>Información de contacto</h3>
            <ul className="list-unstyled">
              <li><strong>Email:</strong> <a href="mailto:r2d2xwinggrupo@gmail.com">r2d2xwinggrupo@gmail.com</a></li> {/* Enlace mailto */}
            </ul>
          </div>
          
          <div className="col-md-6">
            <h3>Redes Sociales</h3>
            <ul className="list-unstyled">
              <li><Link to="https://chat.whatsapp.com/HXlUbwYIv4SCOA8rVgHBoo" target="_blank">Whatsapp</Link></li>
              <li><Link to="https://instagram.com/r2d2xwing" target="_blank">Instagram</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="btn btn-secondary btn-lg">
            Volver a la página de inicio
          </Link>
        </div>

        <footer className="text-center mt-5">
          <p>&copy; {new Date().getFullYear()} <Link to="https://github.com/JuanBlancoEn" target="_blank">JuanBlancoEn</Link>. Proyecto de código abierto.</p>
        </footer>
      </div>   
    </div>
  );
}

export default InfoPage;
