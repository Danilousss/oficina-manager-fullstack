import React from 'react';

export default function FinanceiroCards({ faturamento, despesas, pendentes, lucro }) {
  const cardStyle = "card border-dark shadow-sm";
  const titleStyle = "text-muted small fw-bold text-uppercase";
  const valueStyle1 = "fw-bold text-success";
  const valueStyle2 = "fw-bold text-danger";

  return (
    <div className="row mb-4">
      <div className="col-md-3">
        <div className={cardStyle}>
          <div className="card-body text-center">
            <h6 className={titleStyle}>Faturamento Bruto</h6>
            <h4 className={valueStyle1}>R$ {faturamento.toFixed(2)}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className={cardStyle}>
          <div className="card-body text-center">
            <h6 className={titleStyle}>Despesas Totais</h6>
            <h4 className={valueStyle2}>R$ {despesas.toFixed(2)}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className={cardStyle}>
          <div className="card-body text-center">
            <h6 className={titleStyle}>Contas Pendentes</h6>
            <h4 className={valueStyle2}>R$ {pendentes.toFixed(2)}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className={cardStyle}>
          <div className="card-body text-center">
            <h6 className={titleStyle}>Lucro Líquido</h6>
            <h4 className={valueStyle1}>R$ {lucro.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}