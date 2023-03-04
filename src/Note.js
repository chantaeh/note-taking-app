import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

function Note() {
    const { noteId } = useParams();
    console.log(localStorage.key(noteId-1));
    const name = localStorage.getItem(localStorage.key(noteId-1));

    return (

        <ReactQuill value={name}
        readOnly={true}
        theme={"bubble"} />
    );
}

export default Note;