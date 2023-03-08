import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularJSON from 'circular-json';
import {parse, stringify} from 'flatted';


function Note() {
    const { noteId } = useParams();
    let [name, date, content] = parse(localStorage.getItem(localStorage.key(noteId-1))).slice(1, 5);
    const navigate = useNavigate();


    const goEdit = () => {
        navigate(`/notes/` + noteId + `/edit`);
    }

    // Format date nicely
    if (date != " ") {
        date = new Date(date);
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

    return (
        <>
            <div className="note-inside-header">
                <div className="vertical">
                    <div className="editor-header">
                        <h2>{name}</h2>
                    </div>

                    <div className="editor-datetime">
                        <p className="note-date">{date}</p>
                    </div>
                </div>
                <div className="horizontal">
                    <button className="editor-button" onClick={goEdit}>Edit</button>
                    <button className="editor-button">Delete</button>
                </div> 
            </div>
            
            <ReactQuill value={content}
            readOnly={true}
            theme={"bubble"} />
        </>
    );
}

export default Note;

// HIGHER PRIORITY
// how to make it get the correct item from localStorage on sidebar note click?
// and how make the page address still start at 1 for each new note created???

// sidebar note text is doing funny things again

// sidebar note is supposed to have some html styling D:


// LOWER PRIORITY
// fix title squished (fixed ish)

// fix page being able to grow to the right with long note text

// sidebar scroll

