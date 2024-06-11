import React, { useState, useEffect } from "react";
import "./App.css";
import Lobby from "./view/Lobby.jsx";
import Instruction from "./view/Instruction.jsx";
import Aurthor from "./view/Aurthor.jsx";

const App = () => {
    const [currentPage, setCurrentPage] = useState("Lobby");

    return (
        <div className="container">
            {currentPage === "Lobby" && <Lobby />}
            {currentPage === "Instruction" && <Instruction />}
            {currentPage === "Aurthor" && <Aurthor />}
            <span className="information">
                <button onClick={() => setCurrentPage("Instruction")}>How to use?</button> <button onClick={() => setCurrentPage("Aurthor")}>Aurthor</button> {!(currentPage === "Lobby") && <button onClick={() => setCurrentPage("Lobby")}>Go Back</button>}
            </span>
        </div>
    );
};

export default App;