import AccountButton from "../navigation/AccountButton"
import SettingsButton from "../navigation/SettingsButton"

function TopNavBar(){
    return(
        <header>
            <div>
            <input type="Search" placeholder="Search ... " />
                <SettingsButton />
                <AccountButton />
            </div>
        </header>
    )
}

export default TopNavBar