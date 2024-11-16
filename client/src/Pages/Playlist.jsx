import React from 'react'
import Playlist from '../Components/Playlist/Playlist'
import Sidebar from '../Components/Playlist/Sidebar';
import MainContent from '../Components/Playlist/MainContent';

function PlayList() {
    return (
    <div>
        <Playlist/>
        <MainContent/>
        <Sidebar/>
    </div>
    );
}

export default PlayList;
