import { createContext, useContext, useMemo, useState } from "react";

const ColorContext = createContext();

export default function ColorProvider({children}) {
    const [currentColor, setCurrentColor] = useState("white");

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
            {allColors, currentColor, setCurrentColor}
        }>
            {children}
        </ColorContext.Provider>
    )
}

export const useColor = function() {
    return useContext(ColorContext);
}