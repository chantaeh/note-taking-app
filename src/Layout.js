import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <header>
            <span class="header-item">
                <ul id="ul-nav">
                    <li id="menu">&#9776;</li>
                </ul>
            </span>
            <span class="header-item">
                <h1>Lotion</h1>
                <p class="subheader">Like Notion, but worse.</p>
            </span>
            <span class="header-item">
            </span>
        </header>
            
            
        </>
    );
}

export default Layout;