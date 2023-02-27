import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <div id="container">
                <header>
                <span class="header-item">
                    <ul id="ul-nav">
                        <li id="menu">&#9776;</li>
                    </ul>
                </span>
                <span class="header-item name">
                    <h1>Lotion</h1>
                    <p class="subname">Like Notion, but worse.</p>
                </span>
                <span class="header-item">
                </span>
            </header>
            
            <div id="body-container">
                <div id="sidebar">
                    <div id="sidebar-header">
                        <div id="div-h2"><h2>Notes</h2></div>
                        <div id="div-add-note"><p>+</p></div>
                    </div>
                </div>
                <div id="body">b</div>
            </div>
        
        </div>
        </>
    );
}

export default Layout;