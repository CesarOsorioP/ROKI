import React, { useState } from "react";
import Card from "./card.jsx";
import "./Pagos.css";
import SelectButton from "./SelectButton.jsx";
import NavigateButton from "./NavigateButton.jsx";
import imagen from "./images/Mastercard.png";
import imagen2 from "./images/pngwing.com.png";
import imagen3 from "./images/Paypal2.png";
import "./Images.css";
import './SelectButton.css';

const PagosT = () => {
  const [isCreditCardSelected, setIsCreditCardSelected] = useState(false);
  const [isPaypalSelected, setIsPaypalSelected] = useState(false);

  const handleCreditCardSelection = () => {
    setIsCreditCardSelected((prevState) => !prevState);
    // Si deseas cerrar PayPal al seleccionar Tarjeta de Crédito:
    if (isPaypalSelected) setIsPaypalSelected(false);
  };

  const handlePaypalSelection = () => {
    setIsPaypalSelected((prevState) => !prevState);
    // Si deseas cerrar Tarjeta de Crédito al seleccionar PayPal:
    if (isCreditCardSelected) setIsCreditCardSelected(false);
  };

  return (
    <Card>
      <div className="split">
        <div className="modal">
          <form className="form">
            <div className="credit-card-info--form">
              <div className="input_container">
                <div>
                  <h1>Método de pago</h1>
                </div>
                <div>
                  <h2>Escoge tu método de pago</h2>
                </div>
                    
                        <div>
                        <SelectButton
                            text="Tarjeta debito/credito"
                            onSelect={handleCreditCardSelection}
                        />
                        </div>

                        {isCreditCardSelected && (
                        <>
                            <div className="imagescss2">
                            <div>
                            <img 
                                src={imagen}
                                alt="Mastercard"
                                className="mastercard"
                            />
                            </div>

                            <div>
                            <img src={imagen2} alt="Visa" className="visa" />
                            </div>
                            </div>
                            <div>
                            <label className="input_label" >
                                Nombre completo dueño
                            </label>
                            <div className="split">
                                <div>
                                <input
                                    placeholder="Nombre"
                                    title="Input title"
                                    name="input-name"
                                    type="text"
                                    className="input_field"
                                    id="password_field"
                                    size="20"
                                />
                                </div>
                                <div>
                                <input
                                    placeholder="Apellido"
                                    title="Input title"
                                    name="input-name"
                                    type="text"
                                    className="input_field"
                                    id="password_field"
                                    size="20"
                                />
                                </div>
                            </div>
                            </div>

                            <div className="input_container">
                            <label className="input_label" htmlFor="password_field">
                                Card Number
                            </label>
                            <input
                                placeholder="0000 0000 0000 0000"
                                title="Input title"
                                name="input-name"
                                type="number"
                                className="input_field"
                                id="password_field"
                            />
                            </div>
                            <div className="input_container">
                            <label className="input_label" htmlFor="password_field">
                                Expiry Date / CVV
                            </label>
                            <div className="split">
                                <input
                                placeholder="01/23"
                                title="Expiry Date"
                                name="input-name"
                                type="text"
                                className="input_field"
                                id="password_field"
                                />
                                <input
                                placeholder="CVV"
                                title="CVV"
                                name="cvv"
                                type="number"
                                className="input_field"
                                id="password_field"
                                />
                            </div>
                            </div>
                        </>
                        )}
                    
              </div>
            </div>
            <div>
              <SelectButton text="Paypal" onSelect={handlePaypalSelection} />
            </div>
            {isPaypalSelected && (
              <>
                <div>
                  <img src={imagen3} alt="Paypal" className="paypal" />
                </div>

                <div className="input_container">
                  <label className="input_label">Correo electrónico</label>
                  <div className="split">
                    <input
                      placeholder="ejemplo@gmail.com"
                      title="Input title"
                      name="input-name"
                      type="text"
                      className="input_email"
                      id="password_field"
                    />
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="membership-card">
          <h1 className="membership-title">R O K I</h1>
          <h1 className="membership-title">M E M B E R S H I P</h1>
          <div className="membership-details">
            <h2 className="tipo-letra">Membresía ROKI mensual</h2>
            <div className="membership-date">
              <p>
                <strong>Fecha:</strong>
              </p>
              <div className="membership-plan">
                <div className="date-box">
                  <p className="tipo-letra">25/09/2024</p>
                  <p className="tipo-letra-pequeña">$4.99 USD</p>
                </div>
                <p className="plan-description">primeros 30 días</p>
              </div>
              <div className="membership-plan">
                <div className="date-box">
                  <p className="tipo-letra">25/10/2024</p>
                  <p className="plan-description">Renovación de plan</p>
                </div>
                <p className="plan-description">Cada 30 días</p>
              </div>
            </div>
            <div className="total-section">
              <p className="tipo-letra">
                <strong>TOTAL:</strong>
              </p>
              <p>$19.900</p>
            </div>
          </div>
          <NavigateButton></NavigateButton>
        </div>
      </div>
    </Card>
  );
};

export default PagosT;
