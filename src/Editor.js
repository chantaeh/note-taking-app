import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {parse, stringify} from 'flatted';


function Editor() {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [id, getNotes, setTempState] = useOutletContext();
    let tempId = id;
    console.log(tempId);

    // Get current datetime and format it
    const currDateTime = new Date();
    let dateStr = currDateTime.toISOString();
    dateStr = dateStr.slice(0, 11);
    dateStr += currDateTime.toTimeString().slice(0, 8);
    
    let [name, setName] = useState("");
    const [date, setDate] = useState(dateStr);
    let [content, setContent] = useState("");


    useEffect(() => {
        if (id == "") {
            let notesList = [];
            Object.keys(localStorage).forEach(function(key, index) {
                let temp = [key, ...parse(localStorage.getItem(key))];
                notesList.push(temp);
            });       
            
            // Sort entries by creation date, from newest to oldest
            notesList.sort((a, b) => b[1].localeCompare(a[1]));
    
            setName(notesList[noteId-1][2]);
            setDate(notesList[noteId-1][3]==" " ? dateStr : notesList[noteId-1][3]);
            setContent(notesList[noteId-1][4]=="..." ? "" : notesList[noteId-1][4]);

            tempId = notesList[noteId-1][0];
        } else {
            setName(parse(localStorage.getItem(id))[1]);
            setDate(parse(localStorage.getItem(id))[2]==" " ? dateStr : parse(localStorage.getItem(id))[2]);
            setContent(parse(localStorage.getItem(id))[3]=="..." ? "" : parse(localStorage.getItem(id))[3]);
        }
    }, [id]);
    
    
    const onChange = (text) => setContent(text);

    const dateChanged = (event) => {
        setDate(event.target.value);
    }

    const keyPressed = (event) => {
        setName(event.target.value);
    };


    const saveNote = () => {
        let notesList = [];
        Object.keys(localStorage).forEach(function(key, index) {
            let temp = [key, ...parse(localStorage.getItem(key))];
            notesList.push(temp);
        });       
        
        // Sort entries by creation date, from newest to oldest
        notesList.sort((a, b) => b[1].localeCompare(a[1]));
        
        const creationDate = (tempId=="" ? notesList[noteId-1][1] : parse(localStorage.getItem(tempId))[0]);
        console.log(tempId, creationDate);
        // const creationDate = parse(localStorage.getItem(tempId))[0];

        if (content === "") {
            content = "...";
        }
        const temp = [creationDate, name, date, content]

        if (id == "") {
            tempId = notesList[noteId-1][0];
        }

        localStorage.setItem(tempId, stringify(temp));
        getNotes();
        navigate(`/notes/` + noteId);
    }

    const deleteNote = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
            localStorage.removeItem(tempId);
            navigate(`/notes`);
        }
    }



    return (
        <>
        <div id="editor-container">
            <div className="div-inside-header">
                <div className="vertical">
                    <div className="editor-header">
                        <input type="text" placeholder='Untitled' value={name} onChange={keyPressed}/>
                    </div>

                    <div className="editor-datetime">
                        <input type="datetime-local" value={date} onChange={dateChanged}/>
                    </div>
                </div>
                <div className="horizontal">
                    <button className="editor-button" onClick={saveNote}>Save</button>
                    <button className="editor-button" onClick={deleteNote}>Delete</button>
                </div>
                
            </div>

            <div className="editor">
                <ReactQuill theme="snow" placeholder="Your Note Here" value={content}onChange={onChange}/>
            </div>
        </div>

        </>
    );
}

export default Editor;



