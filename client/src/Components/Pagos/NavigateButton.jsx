import { Link } from 'react-router-dom';
import './NavigateButton.css'; // Opcional: tu archivo de estilos para el botón

const NavigateButton = () => {
  return (
    <Link to="/login" className="subscribe-button">
      suscribirse
    </Link>
  );
};

export default NavigateButton;