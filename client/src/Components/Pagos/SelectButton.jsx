import React from 'react';
import './SelectButton.css';

const SelectButton = ({ text, onSelect, isSelected }) => {

    const handleClick = (event) => {
        event.preventDefault();
        onSelect(!isSelected); // Cambia el estado basado en si está seleccionado o no
    };

    return (
        <button 
            className={`select-button ${isSelected ? 'selected' : ''}`} 
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default SelectButton;
