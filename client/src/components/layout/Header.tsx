import AccountButton from "../navigation/AccountButton"
import SettingsButton from "../navigation/SettingsButton"
import "./Header.css"


function TopNavBar(){
    return(
        <header className="header">
            <h1 className="header-title">Veridian</h1>
            
            <div className="header-actions">
                <div className="search-container">
                    <input type="Search" className="search-input" placeholder="Search ... " />
                </div>

                    <SettingsButton />
                    <AccountButton />
                </div>
        </header>
    )
}

export default TopNavBar