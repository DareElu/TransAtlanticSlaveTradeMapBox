import React, { useState } from "react";
import Nav from "./components/Nav";
// import Map from './components/Map';
import Map from "./components/Map";
//INTRO JS
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";

import "./App.css";

function App() {
    const [filterViewStatus, setFilterViewStatus] = useState(false);
    const [introState, setIntroState] = useState(false);
    const introJs = {
        stepsEnabled: introState,
        initialStep: 0,
        steps: [
            {
                element: ".intro-trade-animation",
                intro: "Click on any of the black ship icons to trigger the trade route animation relevant to the selected icon you will also be able to see the information related to the trade",
            },
            {
                element: ".intro-styles",
                intro: "You can use this icon to open the styles library and change the map style",
            },
            {
                element: ".intro-filters",
                intro: "You can use this button to open the filters library and filter the data based on the number of slaves that disembarked at the destination port or by trade year or even by both",
            },
        ],
    };

    const handleIntroExit = () => {
        setIntroState(false);
    };
    return (
        <div className="App">
            <Steps
                enabled={introJs.stepsEnabled}
                steps={introJs.steps}
                initialStep={introJs.initialStep}
                onExit={handleIntroExit}
            />
            <Nav
                filterViewStatus={filterViewStatus}
                setFilterViewStatus={setFilterViewStatus}
                setIntroState={setIntroState}
            />
            <Map filterViewStatus={filterViewStatus} introJs={introJs} />
        </div>
    );
}

export default App;
