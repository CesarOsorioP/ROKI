import React from 'react';
import Card from "./card.jsx";
import "./Pagos.css";
import SelectButton from './SelectButton.jsx';

const PagosT = () => {
    const handleSelection = (isSelected) => {
        console.log(isSelected ? "Botón seleccionado" : "Botón deseleccionado");
    };

    return (
        <Card>
            <div class="split">
            <div class="modal">
                <form class="form">
                    <div class="credit-card-info--form">
                                <div class="input_container">
                                    <div>
                                        <h1>Metodo de pago</h1>
                                    </div>
                                    <div>
                                        <h2>Escoge tu metodo de pago</h2>
                                    </div>
                                    <div>
                                    <SelectButton text="Tarjeta debito/credito" onSelect={handleSelection} />
                                    </div>
                                            <label class="input_label" for="password_field">Nombre completo dueño</label>
                                            <div class = "split">
                                            <div><input
                                            placeholder="Nombre"
                                            title="Inpit title"
                                            name="input-name"
                                            type="text"
                                            class="input_field"
                                            id="password_field"
                                            size = "20"
                                            />
                                            </div>
                                            <div>
                                            <input
                                            placeholder="Apellido"
                                            title="Inpit title"
                                            name="input-name"
                                            type="text"
                                            class="input_field"
                                            id="password_field"
                                            size = "20"
                                            />
                                            </div>
                                        </div>
                                </div>
                                    
                                <div class="input_container">
                                    <label class="input_label" for="password_field">Card Number</label>
                                    <input
                                    placeholder="0000 0000 0000 0000"
                                    title="Inpit title"
                                    name="input-name"
                                    type="number"
                                    class="input_field"
                                    id="password_field"
                                    />
                                </div>
                                <div class="input_container">
                                    <label class="input_label" for="password_field"
                                    >Expiry Date / CVV</label
                                    >
                                    <div class="split">
                                    <input
                                        placeholder="01/23"
                                        title="Expiry Date"
                                        name="input-name"
                                        type="text"
                                        class="input_field"
                                        id="password_field"
                                    />
                                    <input
                                        placeholder="CVV"
                                        title="CVV"
                                        name="cvv"
                                        type="number"
                                        class="input_field"
                                        id="password_field"
                                    />
                                    </div>
                                </div>
                                <div>
                                <div>
                                    <SelectButton text="Paypal" onSelect={handleSelection} />
                                    </div>
                                </div>
                    </div>
                </form>
            </div>
            <div>
                <form class = "form">
                <h1>chupalaaaaaaaaaa</h1>
                <button class="purchase--btn">Suscribirse</button>
                </form>
            </div>
            </div>
        </Card>
        

        
    );
};

export default PagosT;

