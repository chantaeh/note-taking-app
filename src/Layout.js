import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();

    const createNewNote = () => {
        navigate(`/notes/1/edit`);
    }

    return (
        <>
            <div id="container">
                <header>
                <span className="header-item">
                    <ul id="ul-nav">
                        <li id="menu">&#9776;</li>
                    </ul>
                </span>
                <span className="header-item name">
                    <h1>Lotion</h1>
                    <p className="subname">Like Notion, but worse.</p>
                </span>
                <span className="header-item">
                </span>
            </header>
            
            <div id="body-container">
                <div id="sidebar">
                    <div id="sidebar-header">
                        <div id="div-h2"><h2>Notes</h2></div>
                        <div id="div-add-note" onClick={createNewNote}><p>+</p></div>
                    </div>
                    <div id="sidebar-content">
                        content here
                    </div>
                </div>
                <div id="body-content">
                    <Outlet />
                </div>
            </div>
        
        </div>
        </>
    );
}

export default Layout;