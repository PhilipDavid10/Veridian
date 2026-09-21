import AddButton from "../AddButton";
import "./Dashboard.css"

function Dashboard(){
    return(
        <main className="dashboard-page">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-greeting">Welcome Back! Here's your personal workspace</p>
            <AddButton />
        </main>
    );
}

export default Dashboard