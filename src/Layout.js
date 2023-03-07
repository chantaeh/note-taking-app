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
        getNotes();
        navigate(`/notes/1/edit`);
    }

    let notesList = [];

    const getNotes = () => {
        // Get objects from localStorage and put them into notesList.
        Object.keys(localStorage).forEach(function(key, index) {
            let temp = [];
            temp.push(key);
            temp = temp.concat(JSON.parse(localStorage.getItem(key)));
            notesList.push(temp);
        });
        
        
        // Sort entries by date, from newest to oldest
        notesList.sort((a, b) => b[2].localeCompare(a[2]));

        // Move the newly created note to the top
        for (let i = 0; i < notesList.length; i++) {
            if (notesList[i][2] == " " && i != 0) {
                let temp = notesList[0];
                notesList[0] = notesList[i];
                notesList[i] = temp;
            }
        }
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
                        notesList.map((_note) => {
                            // TODO: CHANGE THIS!
                            let isCurrent = false;
                            if (_note[0] == id) {
                                isCurrent = true;
                            }

                            return(
                                <SidebarNote _note={_note.slice(1, 4)} key={_note[0]} isCurrent={isCurrent}></SidebarNote>
                            )
                        })}
                    </div>
                </div>
                <div id="body-content">
                    <Outlet context={[id, getNotes]}/>
                </div>
            </div>
        
        </div>
        </>
    );
}

export default Layout;