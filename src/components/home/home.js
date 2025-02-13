import React, { useState } from 'react';
import axios from 'axios';  // Importa axios
import './home.css';

function Home() {
  // Estados para cada campo del formulario
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [fechaReporte, setFechaReporte] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [tareasRealizadas, setTareasRealizadas] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [message, setMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un nuevo reporte con todos los datos del formulario
    const newReport = {
      nombreEmpleado,
      fechaReporte,
      proyecto,
      tareasRealizadas,
      horasTrabajadas: Number(horasTrabajadas), // Asegura que las horas sean un número
      comentarios
    };

    // Verifica si los datos son correctos antes de enviar
    console.log("Enviando a Firebase:", newReport);

    try {
      // Usamos axios para enviar la solicitud POST a Firebase
      const response = await axios.post(
        'https://encuesta-online-carquin-default-rtdb.firebaseio.com/reportes.json',
        newReport
      );

      // Si la solicitud es exitosa, mostramos un mensaje
      console.log("Respuesta de Firebase:", response.data);
      setMessage('¡Reporte enviado exitosamente!');

      // Limpiar los campos del formulario
      setNombreEmpleado('');
      setFechaReporte('');
      setProyecto('');
      setTareasRealizadas('');
      setHorasTrabajadas('');
      setComentarios('');
    } catch (error) {
      // En caso de error, mostramos un mensaje
      setMessage('Error al enviar el reporte.');
      console.error('Error al enviar reporte:', error);
    }
  };

  return (
    <main className="container">
      <div className="form-wrapper">
        <h1>Generar Reporte</h1>
        <form onSubmit={handleSubmit} className="elegant-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombreEmpleado">Nombre del Empleado</label>
              <input type="text" id="nombreEmpleado" value={nombreEmpleado} onChange={e => setNombreEmpleado(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="fechaReporte">Fecha del Reporte</label>
              <input type="date" id="fechaReporte" value={fechaReporte} onChange={e => setFechaReporte(e.target.value)} required />
            </div>

            <div className="form-group full-width">
              <label htmlFor="proyecto">Proyecto</label>
              <input type="text" id="proyecto" value={proyecto} onChange={e => setProyecto(e.target.value)} required />
            </div>

            <div className="form-group full-width">
              <label htmlFor="tareasRealizadas">Tareas Realizadas</label>
              <textarea id="tareasRealizadas" value={tareasRealizadas} onChange={e => setTareasRealizadas(e.target.value)} rows="4" required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="horasTrabajadas">Horas Trabajadas</label>
              <input type="number" id="horasTrabajadas" value={horasTrabajadas} onChange={e => setHorasTrabajadas(e.target.value)} min="0" step="0.5" required />
            </div>

            <div className="form-group">
              <label htmlFor="comentarios">Comentarios</label>
              <textarea id="comentarios" value={comentarios} onChange={e => setComentarios(e.target.value)} rows="2"></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn">


            Generar Reporte</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </main>
  );
}

export default Home;
