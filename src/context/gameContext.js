import { createContext, useContext, useState} from "react";

const GameContext = createContext();
export const useGame = () => useContext(GameContext);

export default function Game({ children }) {
    const [selectedCategories, setSelectedCategories] = useState([]);


    return (
        <GameContext.Provider value={[selectedCategories, setSelectedCategories]}>
            {children}
        </GameContext.Provider>
    );
}
