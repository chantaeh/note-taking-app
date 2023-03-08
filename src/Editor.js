import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CircularJSON from 'circular-json';
import {parse, stringify} from 'flatted';


function Editor() {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [id, getNotes] = useOutletContext();

    let [name, setName] = useState(parse(localStorage.getItem(id))[1]);
    const [content, setContent] = useState(parse(localStorage.getItem(id))[3]=="..." ? "" : parse(localStorage.getItem(id))[3]);
    const onChange = (text) => setContent(text);

    // Get current datetime and format it
    const currDateTime = new Date();
    let dateStr = currDateTime.toISOString();
    dateStr = dateStr.slice(0, 11);
    dateStr += currDateTime.toTimeString().slice(0, 8);

    const [date, setDate] = useState(    parse(localStorage.getItem(id))[2]==" " ? dateStr : parse(localStorage.getItem(id))[2]    );

    const dateChanged = (event) => {
        setDate(event.target.value);
    }

    const keyPressed = (event) => {
        setName(event.target.value);
    };


    const saveNote = () => {
        const creationDate = parse(localStorage.getItem(id))[0];
        const temp = [creationDate, name, date, content]
        localStorage.setItem(id, stringify(temp));
        getNotes();
        // notesList.pop();
        // notesList.push([name, date, content]);
        // console.log(notesList);
        navigate(`/notes/` + noteId);
    }

    const deleteNote = () => {
        localStorage.removeItem(id);
        // remove note from sidebar?
        navigate(`/notes`);
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



