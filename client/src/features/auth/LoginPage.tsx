import "./LoginPage.css";

export default function LoginPage(){
    return(
        <main className="login-page">
            <header className="login-header">
                <h1>Veridian</h1>
                <button>Sign up</button>
            </header>
            <section className="login-card">
                <h2 className="login-title">Log in</h2>
                <form>
                    <div className="login-email">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" />
                    </div>
                    <div className="login-password">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password"/>
                    </div>
                    <div>
                        <button type="submit" className="login-submit">
                            Log in
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}