import React from "react";
import Mapview from "./Mapview";
//STYLE
import "../styles/style.css";

const MapviewLibrary = ({
    mapViewStatus,
    updateMapStyleHandler,
    mapStyles,
}) => {
    return (
        <div className={`library ${mapViewStatus ? "active-library" : ""} `}>
            {mapStyles.map((style, index) => {
                if (style.active === false) {
                    return (
                        <Mapview
                            key={index}
                            id={index}
                            style={style}
                            updateMapStyleHandler={updateMapStyleHandler}
                        />
                    );
                }
            })}
        </div>
    );
};

export default MapviewLibrary;
