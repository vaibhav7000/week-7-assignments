import { useMemo, useState, memo } from "react"
import { useColor } from "../Context/ColorContext";

export default function BackgroundChanger() {
    // here we will define the state_variable that when changed will will leads to re-rendering of the component again.
    // here we will encount the problem of props-drilling -> the color tray does not need the currentColor and setCurrentColor but have to pass it down to the Child components
    // To avoid this we will be using  React's context API

    const [currentColor, setCurrentColor] = useState("white");
    // every-time when the component gets re-render this variables gets re-declared again
    // since this array depends on the state_variable lets use the useMemo hook to calculate the value whenever the currentColor changes

    // this will only re-calculated when the value of currentColo will change

    // currently all the components re-renders when value of the currentColor changes + there problem of prop-drilling
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
            color: "Default",
            colorCode: "white"
        }]

        tempColors.filter(c => {
            if(c.colorCode === currentColor) {
                c.colorCode = "white"
                c.color = "Default"
                return
            }

            if(c.color === "Default") {
                c.color = currentColor;
                c.colorCode = currentColor;
            }

        })

        return tempColors;

    }, [currentColor])


    return (
        <div style={{
            height: "100vh", width: "100vw", display: "flex", alignItems: "flex-end", backgroundColor: currentColor, justifyContent: "center"
        }} className="color-wrapper">
            <ColorTray setCurrentColor={setCurrentColor} allColors={allColors}/>
        </div>
    )
}

function ColorTray({setCurrentColor, allColors}) {
    // these props are un-necessary for the ColorTray component
    return (
        <div style={{
            display: "flex", gap: 10, boxShadow: "0px 0px 15px 5px rgb(161, 157, 157)", padding: 10, marginBottom: 50, borderRadius: "2%"
        }} className="color-tray">
            {allColors.map((color,index) => <ColorPill key={index} setCurrentColor={setCurrentColor} color={color.color} colorCode={color.colorCode} />)}
        </div>
    )
}

function ColorPill({color, colorCode, currentColor, setCurrentColor}) {
    return (
        <div className="color-pill" style={{
            backgroundColor: colorCode, padding: "6px 12px", cursor: "pointer", borderRadius: "10%", color: color === "Default" && colorCode === "white" ? "black": "white"
        }} onClick={function() {
            setCurrentColor(colorCode);
        }}> 
            {color}
        </div>
    )
}


export function BackgroundChangerContext() {
    const { currentColor, count, setCount } = useColor();

    return (
        <div style={{
            height: "100vh", width: "100vw", display: "flex", justifyContent: "flex-end", backgroundColor: currentColor, alignItems: "center", flexDirection: "column"
        }} className="color-wrapper">
            <ColorTrayContext />

            {/* when the count updates it causes the whole context to get updated 
            => all those components who are using context will also gets updated / re-rendered  */}
            <button onClick={() => setCount(previous => previous + 1)}>
                {count}
            </button>
        </div>
    )
}

const ColorTrayContext = memo(function () {
    const { allColors } = useColor();

    return (
        <div style={{
            display: "flex", gap: 10, boxShadow: "0px 0px 15px 5px rgb(161, 157, 157)", padding: 10, marginBottom: 50, borderRadius: "2%"
        }} className="color-tray">
            {allColors.map((c, index) => <ColorPillContext key={index} color={c.color} colorCode={c.colorCode} />)}
        </div>
    )
})

function ColorPillContext({color, colorCode}) {
    const { setCurrentColor } = useColor();

    return (
        <div className="color-pill" style={{
            backgroundColor: colorCode, padding: "6px 12px", cursor: "pointer", borderRadius: "10%", color: color === "White Default" && colorCode === "white" ? "black": "white", border: "1px solid rgb(236, 164, 164)"
        }} onClick={function() {
            setCurrentColor(colorCode);
        }}> 
            {color.split(" ")[0]}
        </div>
    )
}