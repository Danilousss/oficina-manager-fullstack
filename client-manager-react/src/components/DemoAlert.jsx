import React from "react";

export default function DemoAlert(){
    return (
        <div
            className="badge bg-warning text-dark shadow-sm d-flex align-items-center gap-2 p-2"
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 9999, 
        fontSize: '0.75rem',
        border: '1px solid #d9a406',
        opacity: '0.9'
      }}
      >
      <i className="bi bi-exclamation-triangle-fill"></i>
      <span><strong>Modo de Exibição:</strong> Algumas funções podem estar limitadas.</span>
        </div>
    );
}