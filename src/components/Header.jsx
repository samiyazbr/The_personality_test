import React from "react";
import { Link } from "react-router-dom";
import "../index.css"

export default function Header() {
    return (<>
    <h1>Which Element are you?</h1>
    <p>(based on completely random things)</p>
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/quiz">Quiz</Link>
        </nav>
    </>
    );
}