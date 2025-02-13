import React from 'react';
import './reports.css';

const reports = [
    {
      id: 1,
      employeeName: 'Juan Pérez',
      project: 'Desarrollo Web',
      date: '2023-06-15',
      hoursWorked: 6.5,
      tasks: 'Implementación de diseño responsivo, corrección de bugs'
    },
    {
      id: 2,
      employeeName: 'María García',
      project: 'App Móvil',
      date: '2023-06-14',
      hoursWorked: 7,
      tasks: 'Integración de API, pruebas de funcionalidad'
    },
    {
      id: 3,
      employeeName: 'Carlos Rodríguez',
      project: 'Sistema de Gestión',
      date: '2023-06-13',
      hoursWorked: 5.5,
      tasks: 'Desarrollo de módulo de reportes, optimización de consultas'
    }
  ];

const Reports = () => {
    return (
        <div className="container">
            {reports.map(report => (
                <div className="report-card" key={report.id}>
                    <div className="report-header">
                        <span className="report-title">{report.project}</span>
                        <span className="report-date">{report.date}</span>
                    </div>
                    <div className="report-details">
                        <div className="report-detail">
                            <span className="detail-label">Empleado:</span>
                            <span className="detail-value">{report.employeeName}</span>
                        </div>
                        <div className="report-detail">
                            <span className="detail-label">Horas Trabajadas:</span>
                            <span className="detail-value">{report.hoursWorked} hrs</span>
                        </div>
                        <div className="report-detail full-width">
                            <span className="detail-label">Tareas:</span>
                            <span className="detail-value">{report.tasks}</span>
                        </div>
                    </div>
                    <div className="report-actions">
                        <button className="btn">Ver Detalles</button>
                        <button className="btn btn-secondary" >Editar</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Reports;
