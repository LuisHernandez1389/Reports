import React, { useState, useEffect } from 'react';
import './reports.css';
import { database } from '../../firebase'; // Asegúrate de que la ruta de importación es correcta
import { ref, onValue } from 'firebase/database';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const reportsRef = ref(database, 'reportes');
    onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedReports = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setReports(loadedReports);
      } else {
        setError('No hay reportes disponibles');
      }
      setLoading(false);
    }, (error) => {
      setError('Error al cargar los reportes');
      console.error('Error fetching reports:', error);
      setLoading(false);
    });
  }, []);

  const openViewModal = (report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const openEditModal = (report) => {
    setSelectedReport(report);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
  };

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
              <span className="report-title">{report.proyecto}</span>
              <span className="report-date">{report.fecha}</span>
            </div>
            <div className="report-details">
              <div className="report-detail">
                <span className="detail-label">Empleado:</span>
                <span className="detail-value">{report.nombreEmpleado}</span>
              </div>
              <div className="report-detail">
                <span className="detail-label">Horas Trabajadas:</span>
                <span className="detail-value">{report.horasTrabajadas} hrs</span>
              </div>
              <div className="report-detail full-width">
                <span className="detail-label">Tareas:</span>
                <span className="detail-value">{report.tareasRealizadas}</span>
              </div>


            </div>
            <div className="report-actions">
              <button className="btn" onClick={() => openViewModal(report)}>Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>

      {isViewModalOpen && selectedReport && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Detalles del Reporte</h2>
            <div className="card">
              <img src={selectedReport.foto} width="190" alt="Detalle del reporte" className="modal-report-image" />
              <div className="report-grid">
                <div className="grid-item label">Empleado:</div>
                <div className="grid-item value">{selectedReport.nombreEmpleado}</div>
                <div className="grid-item label">Proyecto:</div>
                <div className="grid-item value">{selectedReport.proyecto}</div>
                <div className="grid-item label">Fecha:</div>
                <div className="grid-item value">{selectedReport.fechaReporte}</div>
                <div className="grid-item label">Horas:</div>
                <div className="grid-item value">{selectedReport.horasTrabajadas} hrs</div>
                <div className="grid-item label">Tareas:</div>
                <div className="grid-item value">{selectedReport.tareasRealizadas}</div>
                <div className="grid-item label">Pasos :</div>
                <br/>

              </div>
              <div className="pasos-list">
                  {selectedReport.pasosRealizados.map((paso, index) => (
                    <div key={index} className="paso-item">
                      {paso}
                    </div>
                  ))}
                </div>
            </div>
            <button className="btn" onClick={closeModals}>Cerrar</button>
          </div>
        </div>


      )}

    </div>
  );
};

export default Reports;
