import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarNote from "./SidebarNote";
import uuid from "react-uuid";
import {parse, stringify} from 'flatted';

function Layout() {
    const navigate = useNavigate();
    let [id, setId] = useState("");
    const [tempState, setTempState] = useState();

    const createNewNote = () => {
        let tempId = uuid();
        setId(tempId);
        id=tempId;
        let date = new Date().toISOString();
        const temp = [date, "Untitled", " ", "..."];
        localStorage.setItem(tempId, stringify(temp));
        getNotes();
        navigate(`/notes/1/edit`);
    }

    let notesList = [];

    const getNotes = () => {
        // Get objects from localStorage and put them into notesList.
        Object.keys(localStorage).forEach(function(key, index) {
            let temp = [key, ...parse(localStorage.getItem(key))];
            notesList.push(temp);
        });       
        
        // Sort entries by creation date, from newest to oldest
        notesList.sort((a, b) => b[1].localeCompare(a[1]));
    }

    getNotes();

    const switchNote = (newId) => {
        // figure out which notes page to navigate to 
        let index = 0;
        for (let i = 0; i < notesList.length; i++) {
            if (notesList[i][0] === newId) {
                index = i+1;
            }
        }
        getNotes();
        navigate(`/notes/` + index);
    }


    const toggleMenu = () => {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("hidden");
    }

    // on render/re-render
    useEffect(() => {
        // show sidebar-text if there are no notes
        const sidebarText = document.getElementById("sidebar-text");
        if (localStorage.length == 0) {
            sidebarText.classList.remove("hidden");
        } else {
            sidebarText.classList.add("hidden");
        }

        const bodyText = document.getElementById("body-text");
        if (window.location.pathname == '/notes') {
            bodyText.classList.remove("hidden");
        } else {
            bodyText.classList.add("hidden");
        }

        if (id == undefined && localStorage.length != 0) {
            getNotes();
            setId(notesList[0][0]);
            navigate(`/notes/1`);
        }
    });

    const deleteId = () => {
        id = "";
    }

    return (
        <>
        <div id="container">
            <header>
                <span className="header-item">
                    <ul id="ul-nav">
                        <li id="menu" onClick={toggleMenu}>&#9776;</li>
                    </ul>
                </span>
                <span className="header-item name">
                    <h1>Lotion</h1>
                    <p className="subname">Like Notion, but worse.</p>
                </span>
                <span className="header-item">
                </span>
            </header>
            
            <div id="body-container">
                <div id="sidebar">
                    <div id="sidebar-header">
                        <div id="div-h2"><h2>Notes</h2></div>
                        <div id="div-add-note" onClick={createNewNote}><p>+</p></div>
                    </div>
                    <div id="sidebar-content">
                        <p id="sidebar-text">No Note Yet</p>
                        {
                        notesList.map((_note) => {
                            // set current note
                            let isCurrent = false;
                            if (_note[0] == id) {
                                isCurrent = true;
                            }

                            return(
                                <SidebarNote _note={_note.slice(2, 5)} key={_note[0]} isCurrent={isCurrent} noteThings={[_note[0], setId, switchNote]}></SidebarNote>
                            )
                        })}
                    </div>
                </div>
                <div id="body-content">
                        <p id="body-text">Select a note, or create a new one.</p>
                    <Outlet context={[id, getNotes, setId, deleteId, setTempState]}/>
                </div>
            </div>
        
        </div>
        </>
    );
}

export default Layout;