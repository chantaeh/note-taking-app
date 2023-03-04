import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function Editor(props) {
    const navigate = useNavigate();
    const { noteId } = useParams();
    let [name, setName] = useState("Untitled");

    const [content, setContent] = useState('')
    const onChange = (text) => setContent(text)

    const keyPressed = (event) => {
        setName(event.target.value);
    };

    const saveNote = () => {
        localStorage.setItem(name, content);
        navigate(`/notes/` + noteId);
    }

    const deleteNote = () => {
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
                        <input type="datetime-local" />
                    </div>
                </div>
                <div className="horizontal">
                    <button className="editor-button" onClick={saveNote}>Save</button>
                    <button className="editor-button" onClick={deleteNote}>Delete</button>
                </div>
                
            </div>

            <div className="editor">
                {/* <Quill theme="snow" /> */}
                {/* <ReactQuill theme="snow" placeholder='Your Note Here'/> */}
                <ReactQuill theme="snow" placeholder="Your Note Here" onChange={onChange}/>
            </div>
        </div>

        </>
    );
}

export default Editor;



//  change title default text to Unititlled - add this as a variable? idk