import {useLocation, Link } from 'react-router-dom';

import { useAuth } from "../../context/loginContext";
import NavItem from './NavItem';
import Square from './Square';

import classes from './Navigation.module.scss';


export default function Navigation({children}) {
	const [currentUser] = useAuth();
	const path = useLocation().pathname;


	return (
        <>
            {path !== "/dashboard" && (
                <header className={classes.header}>
                    <nav className={classes.navigation}>
                        <ul className={classes.navigation__list}>
                            <NavItem
                                title={"Statistics"}
                                target={"/stats"}
                                number={"1"}
                            />

                            <NavItem
                                title={"Rankings"}
                                target={"/ranks"}
                                number={"2"}
                            />

                            <NavItem
                                title={"Feedback"}
                                target={"/feedback"}
                                number={"3"}
                            />

                            <NavItem
                                title={"About us"}
                                target={"/about"}
                                number={"4"}
                            />

                            {path !== "/" && (
                                <NavItem
                                    title={currentUser ? "Dashboard" : "Home"}
                                    target={currentUser ? "/dashboard" : "/"}
                                    number={"6"}
                                />
                            )}

                            <Square	
								button = {true}
                                title={"LogIn / LogOut"}
                                onClick={"logout"}
                                size={"10rem"}
                            />
                        </ul>
                    </nav>
                </header>
            )}

            {path === "/dashboard" && (
                <header className={classes.dashHeader}>
                    <nav>
                        <ul className={classes.dashNavigation}>
                            <li>
                                <Link to={"/stats"}>
                                    <Square	
										button = {true}
                                        title={"Stats"}
                                        target={"/stats"}
                                        size={"15rem"}
                                    />
                                </Link>
                            </li>

                            <li>
                                <Link to={"/ranks"}>
                                    <Square	
										button = {true}
                                        title={"Ranks"}
                                        target={"/ranks"}
                                        size={"15rem"}
                                    />
                                </Link>
                            </li>

                            <li>
                                <Link to={"/feedback"}>
                                    <Square	
										button = {true}
                                        title={"Feedback"}
                                        target={"/feedback"}
                                        size={"15rem"}
                                    />
                                </Link>
                            </li>

                            <li>
                                <Link to={"/about"}>
                                    <Square	
										button = {true}
                                        title={"About us"}
                                        target={"/about"}
                                        size={"15rem"}
                                    />
                                </Link>
                            </li>

                            <li>
                                <Square
                                    button={true}
                                    title={"LogIn / LogOut"}
                                    onClick={"logout"}
                                    size={"10rem"}
                                />
                            </li>
                        </ul>
                    </nav>
                </header>
            )}
            {children}
        </>
    );
}
