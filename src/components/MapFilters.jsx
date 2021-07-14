import React, { useState, useLayoutEffect } from "react";
//STYLE
import "../styles/style.css";
import roundSlider from "round-slider";
import $ from "jquery";
import { GrPowerReset } from "react-icons/gr";
import { IconContext } from "react-icons";
import { slaveTradeData } from "./Data";

const MapFilters = ({
    filterViewStatus,
    filterBySlaveCount,
    filterByTradeYears,
    applyAllFilters,
    setActiveTradeData,
}) => {
    const [slaveCount, setSlaveCount] = useState(600);
    const [tradeYears, setTradeYears] = useState([1720, 1810]);

    useLayoutEffect(() => {
        $("#no_of_slaves").roundSlider({
            sliderType: "min-range",
            handleSize: "+8",
            handleShape: "dot",
            startAngle: 90,
            svgMode: true,
            rangeColor: "#0e99da",
            borderColor: "#0e99da",
            mouseScrollAction: true,
            value: slaveCount,
            radius: 60,
            width: 15,
            pathColor: "#eee",
            max: 750,
            min: 390,
            change: slaveCountFilterMapHandler,
        });
        $("#year_of_trade").roundSlider({
            sliderType: "range",
            handleSize: "+8",
            handleShape: "dot",
            startAngle: 90,
            svgMode: true,
            rangeColor: "#237e50",
            borderColor: "#237e50",
            mouseScrollAction: true,
            value: `${tradeYears[0].toString()}, ${tradeYears[1].toString()}`,
            radius: 60,
            width: 15,
            pathColor: "#eee",
            max: 1830,
            min: 1700,
            change: slaveYearFilterMapHandler,
        });
    }, [tradeYears, slaveCount]);

    useLayoutEffect(() => {});

    const slaveCountFilterMapHandler = (e) => {
        setSlaveCount(e.value);
        filterBySlaveCount(e.value);
    };
    const slaveYearFilterMapHandler = (e) => {
        const yearRangeArray = e.value.split(",");
        setTradeYears([
            parseInt(yearRangeArray[0], 10),
            parseInt(yearRangeArray[1], 10),
        ]);
        filterByTradeYears(
            parseInt(yearRangeArray[0], 10),
            parseInt(yearRangeArray[1], 10)
        );
    };

    return (
        <div
            className={`map-filters-container ${
                filterViewStatus ? "active-map-filter-controls" : ""
            } `}
        >
            <h2>Filter Map Data</h2>
            <div className="slaves-onboard-filter-container">
                <div className="slaves-onboard-filter" id="no_of_slaves"></div>
                <p className="slaves-onboard-filter-title">
                    slaves on board vessel: <span>{slaveCount}</span>
                </p>
            </div>
            <div className="trade-year-filter-container">
                <div className="trade-year-filter" id="year_of_trade"></div>
                <p className="trade-year-filter-title">
                    trade year:
                    <span> {`${tradeYears[0]}-${tradeYears[1]}`}</span>
                </p>
            </div>
            <div className="show-all-trades-btn">
                <IconContext.Provider value={{ className: "reset-map-data" }}>
                    <GrPowerReset
                        onClick={() => setActiveTradeData(slaveTradeData)}
                    />
                </IconContext.Provider>
                <button
                    onClick={() =>
                        applyAllFilters(
                            tradeYears[0],
                            tradeYears[1],
                            slaveCount
                        )
                    }
                    className="submit-filter"
                >
                    Apply All
                </button>
            </div>
        </div>
    );
};

export default MapFilters;
