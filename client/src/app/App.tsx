import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../features/auth/LoginPage";

function App() {
    return (
        /* Switch AppLayout and LoginPage to switch between viewing the authentication and the dashboard */
        <>
            <LoginPage />
        </>
        /*<AppLayout />*/
    );
}

export default App;