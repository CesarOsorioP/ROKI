import React from "react";
import Card from "../Pagos/card.jsx";
import "./recuperarContraseñacss.css"
const RecuperateC = () => {

    return (
        <Card>
            <div className="divprime">
                <div className="split1">
                    <div className="tittle">
                        <h1>Cambiar contraseña</h1>
                    </div>
                    <div className="split">
                        <div>
                            <div>
                                <label>
                                    Ingrese su correo electronico:
                                </label>
                                <input
                                placeholder="Correo"
                                type="text"
                                className="input_field"
                                size="30"
                                />
                            </div>
                            <div >
                                <div className="label">
                                <label className="label">
                                    Ingrese su contraseña actual:
                                </label>
                                </div>
                                <input
                                placeholder="Contraseña actual"
                                type="text"
                                className="input_field"
                                size="30"
                                />
                            </div>
                        </div>
                        <div className="right-section">
                        <label>
                                    Ingrese su nueva contraseña:
                                </label>
                                <input
                                placeholder="Contraseña nueva"
                                type="text"
                                className="input_field"
                                size="30"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </Card>

    );

};

export default RecuperateC;