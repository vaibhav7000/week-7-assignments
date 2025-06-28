import { faker } from "@faker-js/faker";
import { useCallback, useRef, useState, memo } from "react";

export default function ParagraphGenerator() {
    // this will be updated when the generate button will be clicked
    const [paragraph, setParagraph] = useState("");
    console.log("main")
    // we want this function to be created intially does not needs to be re-created at each re-renders => useCallback
    const updateParagraph = useCallback(function(latestValue) {
        setParagraph(latestValue);
    }, [])


    return (
        <div style={{
            height: "100vh", width: "100vw",display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 30
        }}>
            <CustomInput updateParagraph={updateParagraph} />
            <div className="paragraph">
                {paragraph}
            </div>
        </div>
    )
}

const CustomInput = memo(function ({ updateParagraph }) {
    console.log("custom input")
    const [input, setInput] = useState("");
    // using the useRef hook to access the dom elements inside the react-life cycle 
    const inputBox = useRef();

    return (
        <div className="input-wrapper" style={{
            display: "flex",  gap: 20, width: "40%", justifyContent: "center"
        }}>
            <input style={{
                flex: "1 0 50%"
            }} ref={inputBox} placeholder="Enter the number of words" type="text"/>
            <button onClick={() => {
                const words = parseInt(inputBox.current.value);
                inputBox.current.value = '';

                if(!words) {
                    alert("Please enter the value first");
                    return
                }

                if(!words) {
                    alert("Enter valid number")
                    return
                }


                const generatedParagraph = faker.lorem.sentence(words);

                updateParagraph(generatedParagraph);

                inputBox.current.value = '';

            }}>
                Generate
            </button>
        </div>
    )
})