import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function Editor(props) {
    const navigate = useNavigate();
    const { noteId } = useParams();
    let [name, setName] = useState("Untitled");

    const keyPressed = (event) => {
        setName(event.target.value);
    };

    const saveNote = () => {
        localStorage.setItem(name, "12345");
        navigate(`/notes/` + noteId);
    }

    const deleteNote = () => {
        navigate(`/notes`);
    }

    return (
        <>
        <div id="editor-container">
            <div class="div-inside-header">
                <div class="vertical">
                    <div class="editor-header">
                        <input type="text" placeholder='Untitled' value={name} onChange={keyPressed}/>
                    </div>

                    <div class="editor-datetime">
                        <input type="datetime-local" />
                    </div>
                </div>
                <div class="horizontal">
                    <button class="editor-button" onClick={saveNote}>Save</button>
                    <button class="editor-button" onClick={deleteNote}>Delete</button>
                </div>
                
            </div>

            <div class="editor">
                <ReactQuill theme="snow" placeholder='Your Note Here'/>
            </div>
        </div>

        </>
    );
}

export default Editor;



//  change title default text to Unititlled - add this as a variable? idk