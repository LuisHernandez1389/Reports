import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./projects.css";

const Projects = () => {
    const [projectName, setProjectName] = useState('');
    const [projectStatus, setProjectStatus] = useState('Por hacer');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://encuesta-online-carquin-default-rtdb.firebaseio.com/projects.json');
                const fetchedProjects = response.data ? Object.keys(response.data).map(key => ({
                    id: key,
                    name: response.data[key].name,
                    status: response.data[key].status || 'Por hacer'
                })) : [];
                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const project = {
            name: projectName,
            status: projectStatus
        };
        try {
            const response = await axios.post('https://encuesta-online-carquin-default-rtdb.firebaseio.com/projects.json', project);
            const newProject = { id: response.data.name, name: projectName, status: projectStatus };
            setProjects([...projects, newProject]);
            setProjectName('');
            setProjectStatus('Por hacer');
        } catch (error) {
            console.error("Error al guardar el proyecto:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`https://encuesta-online-carquin-default-rtdb.firebaseio.com/projects/${id}.json`, { status: newStatus });
            const updatedProjects = projects.map(p => 
                p.id === id ? { ...p, status: newStatus } : p
            );
            setProjects(updatedProjects);
        } catch (error) {
            console.error("Error al actualizar el estado del proyecto:", error);
        }
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'por hacer':
                return 'status-por-hacer';
            case 'en proceso':
                return 'status-en-proceso';
            case 'terminado':
                return 'status-terminado';
            default:
                return 'status-default';
        }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1>Gestión de Proyectos</h1>
                <form onSubmit={handleSubmit} className="elegant-form">
                    <div className="form-group full-width">
                        <label>Nombre del Proyecto</label>
                        <input 
                            type="text" 
                            value={projectName} 
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Agregar ProyectO
                    </button>
                </form>
            </div>

            <div className="projects-table-container">
                <h2>Lista de Proyectos</h2>
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>
                                    <select 
                                        className={`status-select ${getStatusClass(project.status)}`} 
                                        value={project.status} 
                                        onChange={(e) => handleStatusChange(project.id, e.target.value)}
                                    >
                                        <option value="Por hacer">Por Hacer</option>
                                        <option value="En proceso">En Proceso</option>
                                        <option value="Terminado">Terminado</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="action-btn" onClick={() => handleStatusChange(project.id, 'Eliminado')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Projects;
