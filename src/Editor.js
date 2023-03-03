import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor(props) {
    

    return (
        <>
        <div id="editor-container">
            <div class="div-inside-header">
                <div class="vertical">
                    <div class="editor-header">
                        <input type="text" placeholder='Text here'/>
                    </div>

                    <div class="editor-datetime">
                        <input type="datetime-local" />
                    </div>
                </div>
                <div class="horizontal">
                    <button class="editor-button">Save</button>
                    <button class="editor-button">Delete</button>
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



//  change title default text to Unititlled