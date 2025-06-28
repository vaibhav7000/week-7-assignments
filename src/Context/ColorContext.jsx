import { createContext, useContext, useMemo, useState } from "react";

const ColorContext = createContext();

export default function ColorProvider({children}) {
    const [currentColor, setCurrentColor] = useState("white");
    const [count, setCount] = useState(0);

    const allColors = useMemo(function() {
        const tempColors = [{
            color: "red",
            colorCode: "red",
        }, {
            color: "yellow",
            colorCode: "yellow"
        }, {
            color: "black",
            colorCode: "black",
        }, {
            color: "purple",
            colorCode: "purple"
        }, {
            color: "green",
            colorCode: "green"
        }, {
            color: "blue",
            colorCode: "blue"
        }, {
            color: "White Default",
            colorCode: "white"
        }]

        tempColors.forEach(c => {
            if (c.colorCode === currentColor) {
                c.color = "White Default",
                c.colorCode = "white"
                return
            }

            if(c.color === "White Default") {
                c.color = currentColor;
                c.colorCode = currentColor;
            }
        })

        return tempColors;
    }, [currentColor]);


    return (
        <ColorContext.Provider value={
            {allColors, currentColor, setCurrentColor, count, setCount}
        }>
            {children}
        </ColorContext.Provider>
    )
}

export const useColor = function() {
    return useContext(ColorContext);
}

// Whenever any component uses the ContextAPI "context" to access the value, it gets the whole context as a value, destructure it according to it and when any value inside the context changes by any component, the "whole context gets updated" with a new value => all the components that uses the context will automatically update now
