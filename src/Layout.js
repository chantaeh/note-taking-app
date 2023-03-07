import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Editor from "./Editor";
import Note from "./Note";
import SidebarNote from "./SidebarNote";
import uuid from "react-uuid";

function Layout() {
    const navigate = useNavigate();
    const [id, setId] = useState("");

    const createNewNote = () => {
        let tempId = uuid();
        setId(tempId);
        const temp = ["Untitled", " ", "..."];
        localStorage.setItem(tempId, JSON.stringify(temp));
        navigate(`/notes/1/edit`);
    }

    let notesList = [];

    const getNotes = () => {
        Object.keys(localStorage).forEach(function(key, index) {
            notesList.push(JSON.parse(localStorage.getItem(key)));
        });
    }

    getNotes();
    console.log(notesList);

    return (
        <>
            <div id="container">
                <header>
                <span className="header-item">
                    <ul id="ul-nav">
                        <li id="menu">&#9776;</li>
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
                        {
                        notesList.map((_note, idx) => {
                            // TODO: CHANGE THIS!
                            let isCurrent = false;
                            if (idx == (notesList.length-1)) {
                                isCurrent = true;
                            }

                            return(
                                <SidebarNote _note={_note} key={idx} isCurrent={isCurrent}></SidebarNote>
                            )
                        })}
                    </div>
                </div>
                <div id="body-content">
                    <Outlet context={id}/>
                </div>
            </div>
        
        </div>
        </>
    );
}

export default Layout;