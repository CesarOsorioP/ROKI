import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LikeButton.css'; // Importa los estilos CSS

const LikeButton = ({ userId, songId }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        if (response.data.favoritos.canciones.includes(songId)) {
          setLiked(true);
        }
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };

    if (userId && songId) {
      checkIfLiked();
    }
  }, [userId, songId]);

  const handleLike = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/like/${userId}/${songId}`);
      setLiked(response.data.includes(songId));
    } catch (error) {
      console.error('Error liking song:', error);
    }
  };

  return (
    <button onClick={handleLike} className="like-button">
      <i className={`fas fa-heart${liked ? '' : '-o'}`} /> {/* Ícono de corazón */}
    </button>
  );
};

export default LikeButton;
