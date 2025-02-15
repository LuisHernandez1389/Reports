import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reports.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          'https://encuesta-online-carquin-default-rtdb.firebaseio.com/reportes.json'
        );
        
        // Transform Firebase data into array format
        const reportsData = Object.keys(response.data).map(key => ({
          id: key,
          employeeName: response.data[key].nombreEmpleado,
          project: response.data[key].proyecto,
          date: response.data[key].fechaReporte,
          hoursWorked: response.data[key].horasTrabajadas,
          tasks: response.data[key].tareasRealizadas
        }));
        
        setReports(reportsData);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los reportes');
        setLoading(false);
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);


  if (loading) {
    return <div className="loading">Cargando reportes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (reports.length === 0) {
    return <div className="no-reports">No hay reportes disponibles</div>;
  }

    return (
        <div className="container">
        <div className="reports-grid">
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
                <button className="btn btn-secondary">Editar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Reports;
