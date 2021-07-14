import React from "react";
import "../styles/style.css";
import { GiDetour } from "react-icons/gi";

const Nav = ({ filterViewStatus, setFilterViewStatus, setIntroState }) => {
    return (
        <nav>
            <h1>Transatlantic Slave Trade</h1>
            <ul>
                <li>
                    <button
                        onClick={() => setIntroState((state) => !state)}
                        className="launch-tour"
                    >
                        Launch Tour <GiDetour />
                    </button>
                </li>
                <li>
                    <div className="filter-overlay-btn intro-filters">
                        <button
                            onClick={() =>
                                setFilterViewStatus(!filterViewStatus)
                            }
                        >
                            Map Filters
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
