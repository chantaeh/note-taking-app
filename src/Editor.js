import {ReactQuill, QuillEditor, CustomToolbar} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";

function Editor() {
    const [text,setText] = useState('');
    
    const handleChange= (html)=> {
        setText(html);
    }
    const modules = {
        toolbar: {
            container: "#toolbar",
        }
    }
    const formats = [
    'font','size',
    'bold','italic','underline','strike',
    'color','background',
    'script',
    'header','blockquote','code-block',
    'indent','list',
    'direction','align',
    'link','image','video','formula',
    ]

    return (
        <>
        <div id="editor-container">
            <div id="editor-header">

            </div>

            <div id="format-header">

            </div>

            <div id="editor">

            <textarea placeholder="Your Note Here" />

            </div>
        </div>

        </>
    );
}

export default Editor;