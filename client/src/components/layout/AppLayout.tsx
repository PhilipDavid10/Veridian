import Content from "./Content";
import Header from "./Header"
import "./AppLayout.css"

function AppLayout(){
    return(
        <div className="app-layout">
            <Header />
            <Content />
        </div>
    );
}

export default AppLayout