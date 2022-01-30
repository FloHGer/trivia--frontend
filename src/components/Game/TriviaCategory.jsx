import React from "react";
import { useState } from "react";

import TriviaCategorySquare from "./TriviaCategorySquare";

import classes from "./../../sass/components/Game/TriviaCategory.module.scss";

function TriviaCategory() {
    const [title, setTitle] = useState("Category");

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>{title}</h2>
            <TriviaCategorySquare amount="500" />
            <TriviaCategorySquare amount="400" />
            <TriviaCategorySquare amount="300" />
            <TriviaCategorySquare amount="200" />
            <TriviaCategorySquare amount="100" />
        </div>
    );
}

export default TriviaCategory;
