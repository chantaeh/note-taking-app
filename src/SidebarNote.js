import ReactQuill from "react-quill";
import { useState } from "react";

function SidebarNote({_note, isCurrent, noteId}) {
    let divClass = "div-sidebar-note";
    if (isCurrent) {
        divClass += " ";
        divClass += "current-note";
    }    

    let date = " ";

    // Format date nicely
    if (_note[1] != " ") {
        date = new Date(_note[1]);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let dateStr = months[date.getMonth()] + " " + date.getDate();
        dateStr += ", " + date.getFullYear() + " at ";

        let hours = date.getHours();
        let mins = date.getMinutes().toString();
        let amPm = "AM";

        if (hours % 12 > 1) {
            hours = hours % 12;
            amPm = "PM";
        }

        if (mins.length == 1) {
            mins = "0" + mins;
        }

        dateStr += hours + ":" + mins + " " + amPm;
        date = dateStr;
    } 

    let name = _note[0];

    let content = _note[2];
    // Remove HTML and shorten
    content = content.replace(/<\/{0,1}a>/g, ' ');
    content = content.replace(/<[^>]*>?/gm, '');
    content = content.replace(/&[a-z]{1,};/g, '');

    const showNote = async () => {
        const [id, setId, switchNote] = noteId;
        await setId(id);
        switchNote(id);
    }

    return (
    <>
        <div className={divClass} onClick={showNote}>
            <h4>{name}</h4>
            <p className="note-date">{date}</p>
            <p className="sidebar-note-content">{content}</p>
        </div>
    </>
    );
}

export default SidebarNote;