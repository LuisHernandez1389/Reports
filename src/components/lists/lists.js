import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, set, get, update, push, remove } from "firebase/database";
import "./lists.css";

const Lists = () => {
    const [projectName, setProjectName] = useState('');
    const [projectStatus, setProjectStatus] = useState('Por hacer');
    const [projects, setProjects] = useState([]);
    const [activeTab, setActiveTab] = useState("tab1"); // Nuevo estado para controlar el tab activo
    const [employeeName, setEmployeeName] = useState('');
    const [employees, setEmployees] = useState([]);

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
    const handleSubmitE = async (e) => {
        e.preventDefault();
        const employeesRef = ref(database, 'employees/');
        const newEmployeeRef = push(employeesRef);
        const newEmployee = { name: employeeName };
        try {
            await set(newEmployeeRef, newEmployee);
            setEmployees([...employees, { ...newEmployee, id: newEmployeeRef.key }]);
            setEmployeeName('');
        } catch (error) {
            console.error("Error al guardar el empleado:", error);
        }
    };

    const handleDeleteE = async (id) => {
        const employeeRef = ref(database, `employees/${id}`);
        try {
            await remove(employeeRef);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsRef = ref(database, 'projects/');
            try {
                const snapshot = await get(projectsRef);
                if (snapshot.exists()) {
                    const fetchedProjects = Object.keys(snapshot.val()).map(key => ({
                        id: key,
                        name: snapshot.val()[key].name,
                        status: snapshot.val()[key].status || 'Por hacer'
                    }));
                    setProjects(fetchedProjects);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectsRef = ref(database, 'projects/');
        const newProjectRef = push(projectsRef);
        const newProject = {
            name: projectName,
            status: projectStatus
        };
        try {
            await set(newProjectRef, newProject);
            setProjects([...projects, { ...newProject, id: newProjectRef.key }]);
            setProjectName('');
            setProjectStatus('Por hacer');
        } catch (error) {
            console.error("Error al guardar el proyecto:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const projectRef = ref(database, `projects/${id}`);
        try {
            await update(projectRef, { status: newStatus });
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
        <div className="lcontainer">
            <div class="tabs-container">
                <div class="tab-buttons">
                    <button className={`tab-btn ${activeTab === 'tab1' ? 'active' : ''}`} id="ex-with-icons-tab-1" href="#ex-with-icons-tabs-1" role="tab"
                        aria-controls="ex-with-icons-tabs-1" aria-selected={activeTab === 'tab1'} onClick={() => handleTabClick('tab1')}>Proyectos</button>
                    <button class="tab-btn" className={`tab-btn ${activeTab === 'tab2' ? 'active' : ''}`} id="ex-with-icons-tab-2" href="#ex-with-icons-tabs-2" role="tab"
                        aria-controls="ex-with-icons-tabs-2" aria-selected={activeTab === 'tab2'} onClick={() => handleTabClick('tab2')}>Empleados</button>
                </div>

            </div>
            {activeTab === "tab1" && (
                <><div className="lform-wrapper">
                    <h1>Gestión de Proyectos</h1>
                    <form onSubmit={handleSubmit} className="elegant-form">
                        <div className="lform-group full-width">
                            <label>Nombre del Proyecto</label>
                            <input
                                className='input-project'
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required />
                            <button type="submit" className="submit-btn">
                                Agregar Proyecto
                            </button>
                        </div>
                    </form>
                </div><br/><div className="projects-table-container">
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
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div></>
            )}
            {activeTab === "tab2" && (
                <div>
                    <div>
                        <div className="lform-wrapper">
                            <h1>Gestión de Empleados</h1>
                            <form onSubmit={handleSubmitE} className="elegant-form">
                                <div className="lform-group full-width">
                                    <label>Nombre del Empleado</label>
                                    <input
                                        className='input-project'
                                        type="text"
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                        required />
                                    <button type="submit" className="submit-btn">
                                        Agregar Empleado
                                    </button>
                                </div>
                            </form>
                        </div>
                        <br/>
                        <div className="projects-table-container">
                            <h2>Lista de Empleados</h2>
                            <table className="projects-table">
                                <thead>
                                    <tr>
                                        <th>Empleado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.name}</td>
                                            <td>
                                                <button className="action-btn" onClick={() => handleDeleteE(employee.id)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Lists;
