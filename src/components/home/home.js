import React, { useState, useEffect } from 'react';
import { database, storage } from '../../firebase'; // Importa la configuración de Firebase
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, push, set, get, ref } from 'firebase/database';
import "./home.css";

function Home() {
  // Estados para cada campo del formulario, incluyendo la imagen
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [fechaReporte, setFechaReporte] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [tareasRealizadas, setTareasRealizadas] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [pasos, setPasos] = useState([]);
  const [paso, setPaso] = useState('');
  const [imagen, setImagen] = useState(null);
  const [message, setMessage] = useState('');
  const [proyectosDisponibles, setProyectosDisponibles] = useState([]); // Nuevo estado para almacenar los proyectos
  const [employees, setEmployees] = useState([]);

  // Función para eliminar un paso específico
  const eliminarPaso = (index) => {
    const nuevosPasos = pasos.filter((_, i) => i !== index);
    setPasos(nuevosPasos);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesRef = ref(database, 'employees/');
      try {
        const snapshot = await get(employeesRef);
        if (snapshot.exists()) {
          const fetchedEmployees = Object.keys(snapshot.val()).map(key => ({
            id: key,
            name: snapshot.val()[key].name,
          }));
          setEmployees(fetchedEmployees);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error al cargar los empleados:", error);
      }
    };

    fetchEmployees();
  }, []);


  const manejarCambioPaso = (e) => {
    setPaso(e.target.value);
  };

  const manejarKeyDown = (e) => {
    if (e.key === 'Enter' && paso.trim() !== '') {
      e.preventDefault(); // Evita agregar un salto de línea
      setPasos([...pasos, paso]);
      setPaso('');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      setMessage('Por favor, selecciona una imagen.');
      return;
    }

    // Subir la imagen primero a Firebase Storage
    const imageRef = storageRef(storage, `images/${Date.now()}_${imagen.name}`);
    uploadBytes(imageRef, imagen).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const newReport = {
          nombreEmpleado,
          fechaReporte,
          proyecto,
          tareasRealizadas,
          horasTrabajadas: Number(horasTrabajadas),
          comentarios,
          pasosRealizados: pasos,
          foto: url,
        };

        // Ahora enviamos el reporte a Firebase Realtime Database
        const newReportRef = push(databaseRef(database, 'reportes'));
        set(newReportRef, newReport).then(() => {
          setMessage('¡Reporte enviado exitosamente!');

          // Limpiar los campos del formulario
          setNombreEmpleado('');
          setFechaReporte('');
          setProyecto('');
          setTareasRealizadas('');
          setHorasTrabajadas('');
          setComentarios('');
          setPasos([]);
          setImagen(null);
        }).catch((error) => {
          setMessage('Error al enviar el reporte.');
          console.error('Error al enviar reporte:', error);
        });
      });
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsRef = databaseRef(database, 'projects/');
      try {
        const snapshot = await get(projectsRef);
        if (snapshot.exists()) {
          const fetchedProjects = Object.keys(snapshot.val()).map(key => ({
            id: key,
            name: snapshot.val()[key].name
          }));
          setProyectosDisponibles(fetchedProjects);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error al cargar los proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="container">
      <div className="form-container">
        <h1>Generar Reporte</h1>
        <form onSubmit={handleSubmit} className="elegant-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombreEmpleado">Nombre del Empleado</label>
              <select
                id="nombreEmpleado"
                value={nombreEmpleado}
                onChange={(e) => setNombreEmpleado(e.target.value)}
                required
                className='input-home'
              >
                <option value="">Seleccione un proyecto</option>
                {employees.map((proj) => (
                  <option key={proj.id} value={proj.name}>{proj.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fechaReporte">Fecha del Reporte</label>
              <input
                type="date"
                id="fechaReporte"
                value={fechaReporte}
                onChange={(e) => setFechaReporte(e.target.value)}
                required
                className='input-home'

              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="proyecto">Proyecto</label>
              <br />
              <select
                id="proyecto"
                value={proyecto}
                onChange={(e) => setProyecto(e.target.value)}
                required
                className='input-home'
              >
                <option value="">Seleccione un proyecto</option>
                {proyectosDisponibles.map((proj) => (
                  <option key={proj.id} value={proj.name}>{proj.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="tareasRealizadas">Tareas Realizadas</label>
              <input
                id="tareasRealizadas"
                value={tareasRealizadas}
                onChange={(e) => setTareasRealizadas(e.target.value)}
                rows="4"
                required
                className='input-home'

              />
              <div className="pasos-container">
                <div className="pasos-header">
                  <h4>Pasos Realizados</h4>
                </div>
                <input
                  id="pasosRealizados"
                  value={paso}
                  onChange={manejarCambioPaso}
                  onKeyDown={manejarKeyDown}
                  rows="2"
                  placeholder="Escribe un paso y presiona 'Enter' para agregarlo."
                  className="paso-input"
                />
                <div className="pasos-list">
                  {pasos.map((item, index) => (
                    <div className="paso-item" key={index}>
                      <span>{item}</span>

                      <button className='btn-eliminar' onClick={() => eliminarPaso(index)}>Eliminar</button>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <div className="form-group">
              <label htmlFor="horasTrabajadas">Horas Trabajadas</label>
              <input
                type="number"
                id="horasTrabajadas"
                value={horasTrabajadas}
                onChange={(e) => setHorasTrabajadas(e.target.value)}
                min="0"
                step="0.5"
                required
                className='input-home'

              />
            </div>

            <div className="form-group">
              <label htmlFor="comentarios">Comentarios</label>
              <input
                className='input-home'
                id="comentarios"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                rows="2"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="foto">Foto de Evidencia</label>
              <input
                className='input-home'
                type="file"
                id="foto"
                onChange={handleImageChange}
                required
              />
              <button type="submit" className="submit-btn">
                Generar Reporte
              </button>
            </div>

          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </main>
  );
}
export default Home;
