import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../../common/Button";
import DashboardItem from "./DashboardItem";
import { categorySelection } from "../../../common/categorySelection.js";
import { useCategories, useAllCategories } from "../../../context/gameContext";
import { useAuth } from "../../../context/loginContext";

import styles from "../../common/Button.module.scss";
import classes from "./SettingsContainer.module.scss";

export default function SettingsContainer() {
    const navigate = useNavigate();
    const [currentUser] = useAuth();
    const [allCategories] = useAllCategories();
    const [selectedCategories, setSelectedCategories] = useCategories([]);

    const [gameMode, setGameMode] = useState("quick");
    const [savedCategories, setSavedCategories] = useState([]);

		const patchHandler = async () =>
		await axios.patch(
				`${process.env.REACT_APP_BACKEND}/user/${currentUser}`,
				{
						updates: {
								options: {
										gameMode,
										categories: selectedCategories,
								},
						},
				}
		);

    // get settings
    useEffect(() => {
        (async () => {
            try {
                const settingsResponse = await axios.get(
                    `${process.env.REACT_APP_BACKEND}/user/${currentUser}`
                );
                setGameMode(settingsResponse.data.payload.options.gameMode);
                setSavedCategories(
                    settingsResponse.data.payload.options.categories
                );
            } catch (err) {
                console.log(err);
            }
        })();
    }, [currentUser]);


    return (
        <section className={classes.dashboard}>
            <div className={classes.dashboard__game}>
                <DashboardItem
                    title={{ name: "Game Mode", shortName: "gameMode" }}
                    values={[
                        {
                            name: "quick",
                            tooltip: "get random categories",
                            change: () => {
                                setGameMode("quick");
                                setSelectedCategories([]);
                                patchHandler();
                            },
                        },
                        {
                            name: "custom",
                            tooltip: "choose your own categories",
                            change: () => {
                                setGameMode("custom");
                                setSelectedCategories(savedCategories);
                                patchHandler();
                            },
                        },
                    ]}
                    type={"radio"}
                />
                {gameMode === "custom" && allCategories && (
                    <DashboardItem
                        title={{
                            name: "Select categories",
                            shortName: "categories",
                        }}
                        values={[
													savedCategories.map((category, i) => {
														return {
															name: `Category ${i}`,
															value: category,
															change: (newValue) => {
																selectedCategories[i] = newValue;
																setSelectedCategories(selectedCategories);
																patchHandler();
															}
														}
													})
                            // {
                            //     name: "Category 1",
                            //     value: [selectedCategories[0]],
                            //     change: (newValue) => {
                            //         console.log(newValue);
                            //         selectedCategories[0] = newValue;
                            //         setSelectedCategories(selectedCategories);
                            //         patchHandler();
                            //     },
                            // },
                            // {
                            //     name: "Category 2",
                            //     value: [selectedCategories[1]],
                            //     change: (newValue) => {
                            //         selectedCategories[1] = newValue;
                            //         setSelectedCategories(selectedCategories);
                            //     },
                            // },
                            // {
                            //     name: "Category 3",
                            //     value: [selectedCategories[2]],
                            //     change: (newValue) => {
                            //         selectedCategories[2] = newValue;
                            //         setSelectedCategories(selectedCategories);
                            //     },
                            // },
                            // {
                            //     name: "Category 4",
                            //     value: [selectedCategories[3]],
                            //     change: (newValue) => {
                            //         selectedCategories[3] = newValue;
                            //         setSelectedCategories(selectedCategories);
                            //     },
                            // },
                            // {
                            //     name: "Category 5",
                            //     value: [selectedCategories[4]],
                            //     change: (newValue) => {
                            //         selectedCategories[4] = newValue;
                            //         setSelectedCategories(selectedCategories);
                            //     },
                            // },
                            // {
                            //     name: "Category 6",
                            //     value: [selectedCategories[5]],
                            //     change: (newValue) => {
                            //         selectedCategories[5] = newValue;
                            //         setSelectedCategories(selectedCategories);
                            //     },
                            // },
                        ]}
                        type={"select"}
                    />
                )}
            </div>
            <div className={classes.dashboard__button}>
                <div className={classes["dashboard__line--2"]}></div>
                <Button
                    className={styles.btn__blue}
                    title={"Play!"}
                    onClick={() =>
                        categorySelection(
                            selectedCategories,
                            setSelectedCategories,
                            allCategories,
                            navigate
                        )
                    }
                />
            </div>
        </section>
    );
}
