import { useMemo, useState } from "react"

export default function BackgroundChanger() {
    // here we will define the state_variable that when changed will will leads to re-rendering of the component again.
    // here we will encount the problem of props-drilling -> the color tray does not need the currentColor and setCurrentColor but have to pass it down to the Child components
    // To avoid this we will be using  React's context API

    const [currentColor, setCurrentColor] = useState("white");
    // every-time when the component gets re-render this variables gets re-declared again
    // since this array depends on the state_variable lets use the useMemo hook to calculate the value whenever the currentColor changes

    // this will only re-calculated when the value of currentColo will change
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
        }, [currentColor]]

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

    })


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