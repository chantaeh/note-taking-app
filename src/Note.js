import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {parse, stringify} from 'flatted';
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";


function Note() {
    const { noteId } = useParams();
    const [id, setId, deleteId] = useOutletContext();
    const [name, setName] = useState();
    const [content, setContent] = useState();
    let [date, setDate] = useState();

    // on re-render, set name, content, date
    useEffect(() => {
        let notesList = [];
        Object.keys(localStorage).forEach(function(key, index) {
            let temp = [key, ...parse(localStorage.getItem(key))];
            notesList.push(temp);
        });       
        
        // Sort entries by creation date, from newest to oldest
        notesList.sort((a, b) => b[1].localeCompare(a[1]));


        setName(notesList[noteId-1][2]);
        setDate(notesList[noteId-1][3]);
        setContent(notesList[noteId-1][4]=="..." ? "" : notesList[noteId-1][4]);
    });

    const navigate = useNavigate();


    const goEdit = () => {
        navigate(`/notes/` + noteId + `/edit`);
    }

    const deleteNote = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
            localStorage.removeItem(id);
            setId("");
            deleteId();
            navigate(`/notes`);
        }
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
                    <button className="editor-button" onClick={deleteNote}>Delete</button>
                </div> 
            </div>
            
            <ReactQuill value={content}
            readOnly={true}
            theme={"bubble"} />
        </>
    );
}

export default Note;
