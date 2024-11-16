import React from "react";
import { FaPlay, FaTrashAlt } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="create-playlist">
        <MdCreateNewFolder />
        Crear playlist
      </button>
      <div className="playlist-list">
        <div className="playlist-item">
          <span>Nombre de playlist 1</span>
          <div className="playlist-actions">
            <FaPlay />
            <FaTrashAlt />
          </div>
        </div>
        <div className="playlist-item">
          <span>Nombre de playlist 2</span>
          <div className="playlist-actions">
            <FaPlay />
            <FaTrashAlt />
          </div>
        </div>
        <div className="playlist-item">
          <span>Nombre de playlist 3</span>
          <div className="playlist-actions">
            <FaPlay />
            <FaTrashAlt />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;