import { useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth } from '../../../../context/loginContext';
import AchievCard from './AchievCard';
import classes from './Achievs.module.scss';

function Achievs() {
    const [currentUser] = useAuth();
    const [data, setData] = useState();
    const [allUnlocked, setAllUnlocked] = useState();

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND}/user/${currentUser}/achievs`
            );
            if (response.data.message === 'success') {
                setData(response.data.payload);
                if (
                    response.data.payload.gamesPlayed.unlocked.length === 3 &&
                    response.data.payload.score.high.unlocked.length === 3 &&
                    response.data.payload.score.total.unlocked.length === 3 &&
                    response.data.payload.correctAnswers.unlocked.length ===
                        3 &&
                    response.data.payload.completedCategories.total.unlocked
                        .length === 3 &&
                    response.data.payload.completedCategories.max.unlocked
                        .length === 6
                )
                    setAllUnlocked(true);
            }
        })();
    }, [currentUser]);
    return (
        <>
            {data && !allUnlocked && (
                <div className={classes.achievements}>
                    <AchievCard
                        title='Games played'
                        text= {['Play ', ' games!']}
                        values={[10, 100, 1000]}
                        data={data.gamesPlayed}
                    />
                    <AchievCard
                        title='HighScore'
                        text= {['Reach a Highscore of ', '!']}
                        values={[3000, 6000, 11111]}
                        data={data.score.high}
                    />
                    <AchievCard
                        title='Total score'
                        text= {['Collect a total score of ', ' points!']}
                        values={[100000, 500000, 1000000]}
                        data={data.score.total}
                    />
                    <AchievCard
                        title='Correct answers'
                        text= {['Give ', ' correct answers!']}
                        values={[100, 1000, 10000]}
                        data={data.correctAnswers}
                    />
                    <AchievCard
                        title='Completed categories'
                        text= {['Answer ', ' categories completely!']}
                        values={[100, 500, 1000]}
                        data={data.completedCategories.total}
                    />
                    <AchievCard
                        title='Comp. categories per game'
                        text= {['Complete ', ' categories in one game!']}
                        values={[1, 2, 3, 4, 5, 6]}
                        data={data.completedCategories.max}
                    />
                </div>
            )}
            {data && allUnlocked && (
                <AchievCard title='All Achievements' data={data.all} />
            )}
        </>
    );
}
export default Achievs;
