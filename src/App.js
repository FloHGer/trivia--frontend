import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import { useAuth } from "./context/loginContext";

import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import LogIn from "./pages/LogIn";
import Warning from "./pages/Warning";
import Game from "./pages/Game";
import Footer from "./common/Footer";

import "./sass/app.scss";

export default function App() {
    const [isLoggedIn] = useAuth();
    return (
        <Router>
            <main>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Home />
                            </>
                        }
                    ></Route>

                    {/* {isLoggedIn && ( */}
                    <Route
                        exact
                        path="/game"
                        element={
                            <>
                                <Game />
                            </>
                        }
                    ></Route>
                    {/* )} */}
                    {/* {isLoggedIn && ( */}
                    <Route
                        exact
                        path="/userprofile"
                        element={
                            <>
                                <UserProfile />
                            </>
                        }
                    ></Route>
                    {/* )} */}

                    {!isLoggedIn && (
                        <Route
                            exact
                            path="/login"
                            element={
                                <>
                                    <LogIn />
                                </>
                            }
                        ></Route>
                    )}
                    {!isLoggedIn && (
                        <Route
                            exact
                            path="/warning"
                            element={
                                <>
                                    <Warning />
                                </>
                            }
                        ></Route>
                    )}

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
