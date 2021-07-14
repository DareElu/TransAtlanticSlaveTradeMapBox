import React from "react";
//MAP GL
import { Marker } from "react-map-gl";
//ICON
import { GiBattleship } from "react-icons/gi";
//STYLE
import "../styles/style.css";

const Trade = ({ trade, index, showTradeRoute }) => {
    return (
        <Marker
            key={Math.random() * 10000}
            latitude={trade["Purchase-Latitude"]}
            longitude={trade["Purchase-Longitude"]}
            className={trade.active === true ? "active-marker" : ""}
        >
            <div className="purchase-location-marker">
                <GiBattleship
                    onClick={() => showTradeRoute(index, trade.ID)}
                    style={{
                        transform: `translate(${-20 / 2}px,${-20}px)`,
                    }}
                    className={`tradeship-marker ${
                        trade.active === true
                            ? "active-ship-icon intro-trade-animation"
                            : "ship-icon"
                    }`}
                />
            </div>
        </Marker>
    );
};

export default Trade;
