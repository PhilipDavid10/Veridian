import AddButton from "../AddButton";
import "./Dashboard.css"

export default function Dashboard(){

    function loadWidget(widgetName: string): void{
        console.log("Dashboard: ", widgetName)
    }   

    return(
        <main className="dashboard-page">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-greeting">Welcome Back! Here's your personal workspace</p>
            <AddButton loadWidget={loadWidget}/>
        </main>
    );
}