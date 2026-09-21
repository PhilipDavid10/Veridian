import Sidebar from "./Sidebar"
import Dashboard from "./Dashboard"
import "./Content.css"

function Content(){
    return(
        <div className="content">
            <Sidebar />
            <Dashboard />
        </div>
    );
}
export default Content