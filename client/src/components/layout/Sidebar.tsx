import "./Sidebar.css"

function Sidebar(){
    return(
        <nav className="sidebar">
            <ul className="sidebar-items">
                <li><a href="#Dashboard">Dashboard</a></li>
                <li><button className="create-button">+ Create</button></li>
            </ul>
        </nav>
        );
}

export default Sidebar