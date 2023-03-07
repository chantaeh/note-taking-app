import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

function Note() {
    const { noteId } = useParams();
    const [name, date, content] = JSON.parse(localStorage.getItem(localStorage.key(noteId-1)));

    return (
        <>
            <div className="note-inside-header">
                <div className="vertical">
                    <div className="editor-header">
                        <h2>{name}</h2>
                    </div>

                    <div className="editor-datetime">
                        {/* <input type="datetime-local" value={date} onChange={dateChanged}/> */}
                    </div>
                </div>
                <div className="horizontal">
                    <button className="editor-button" >Edit</button>
                    <button className="editor-button" >Delete</button>
                </div> 
            </div>
            
            <ReactQuill value={content}
            readOnly={true}
            theme={"bubble"} />
        </>
    );
}

export default Note;

// how to make it get the correct item from localStorage?
// need to use uuid - unique key/identifier??
// and how make the page address still start at 1 for each new note created???

// figure out to get ntoes from local storage when page refreshed

// fix title squished

// fix page being able to grow to the right with long note text

// make the sidebar content fit/show up - get text out properly
// make the sidebar content not retain styles

