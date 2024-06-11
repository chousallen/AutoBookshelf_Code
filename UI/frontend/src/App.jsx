import React, { useState, useEffect } from "react";
import "./App.css";
import Lobby from "./view/Lobby.jsx";
import Instruction from "./view/Instruction.jsx";
import Author from "./view/Author.jsx";
import Easter from "./view/Easter.jsx";

const App = () => {
    const [currentPage, setCurrentPage] = useState("Lobby");

    return (
        <div className="container">
            {currentPage === "Lobby" && <Lobby />}
            {currentPage === "Instruction" && <Instruction />}
            {currentPage === "Author" && <Author />}
            {currentPage === "Easter" && <Easter />}
            <span className="information">
                <button onClick={() => setCurrentPage("Instruction")}>How to use?</button> <button onClick={() => setCurrentPage("Author")}>Author</button> {!(currentPage === "Lobby") && <button onClick={() => setCurrentPage("Lobby")}>Go Back</button>}
            </span>
            <span className="secret">
                <button onClick={() => setCurrentPage("Easter")}>Self Destruct</button>
            </span>
        </div>
    );
};

export default App;