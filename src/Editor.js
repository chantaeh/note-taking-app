import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function Editor() {
    const navigate = useNavigate();
    const { noteId } = useParams();
    let [name, setName] = useState("Untitled");

    const [content, setContent] = useState('...');
    const onChange = (text) => setContent(text);

    // Get current datetime and format it
    const currDateTime = new Date();
    let dateStr = currDateTime.toISOString();
    dateStr = dateStr.slice(0, 11);
    dateStr += currDateTime.toTimeString().slice(0, 8);

    const [date, setDate] = useState(dateStr);

    const dateChanged = (event) => {
        setDate(event.target.value);
    }

    const keyPressed = (event) => {
        setName(event.target.value);
    };

    const [id, getNotes] = useOutletContext();
    console.log(id);

    const saveNote = () => {
        const temp = [name, date, content]
        localStorage.setItem(id, JSON.stringify(temp));
        getNotes();
        // notes are going in order, BUT the newest note is going to the bottom
        // doesn't get sorted until later

        // I think it works now???? have to test

        // notesList.pop();
        // notesList.push([name, date, content]);
        // console.log(notesList);
        navigate(`/notes/` + noteId);
    }

    const deleteNote = () => {
        localStorage.removeItem(id);
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
                <ReactQuill theme="snow" placeholder="Your Note Here" onChange={onChange}/>
            </div>
        </div>

        </>
    );
}

export default Editor;



