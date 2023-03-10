import { useParams } from "react-router-dom";
import { parse } from "flatted";
import ReactQuill from "react-quill";

function SidebarNote({_note, isCurrent, noteThings}) {
    const { noteId } = useParams();

    let notesList = [];

    // Get objects from localStorage and put them into notesList.
    Object.keys(localStorage).forEach(function(key, index) {
        let temp = [key, ...parse(localStorage.getItem(key))];
        notesList.push(temp);
    });       
    
    // Sort entries by creation date, from newest to oldest
    notesList.sort((a, b) => b[1].localeCompare(a[1]));

    const [id, setId, switchNote] = noteThings;

    // Add current-note class to the correct SidebarNote component
    let divClass = "div-sidebar-note";
    if (isCurrent) {
        divClass += " ";
        divClass += "current-note";
    } else if (noteId != undefined) {
        if (notesList[noteId-1][0]==id) {
            divClass += " ";
        divClass += "current-note";
        }
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
    // content = content.replace(/<\/{0,1}a>/g, ' ');
    // content = content.replace(/<[^>]*>?/gm, '');
    content = content.replace(/style="[ a-z0-9(),:;-]{1,}"/g, '');
    content = content.replace(/&[a-z]{1,};/g, ' ');

    const showNote = async () => {
        await setId(id);
        switchNote(id);
    }

    return (
    <>
        <div className={divClass} onClick={showNote}>
            <h4>{name}</h4>
            <p className="note-date">{date}</p>
            <ReactQuill value={content} readOnly={true} theme={"bubble"} />
        </div>
    </>
    );
}

export default SidebarNote;