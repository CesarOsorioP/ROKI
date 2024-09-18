import React, { useState } from 'react';
import './SelectButton.css';

const SelectButton = ({ text, onSelect }) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
        onSelect(!selected);
    };

    return (
        <button 
            className={`select-button ${selected ? 'selected' : ''}`} 
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default SelectButton;
