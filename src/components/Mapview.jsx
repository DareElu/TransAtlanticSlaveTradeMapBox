import React from "react";
//STYLE
import "../styles/style.css";

const Mapview = ({ style, id, updateMapStyleHandler }) => {
    return (
        <div className="mapview">
            {style.active === false && (
                <img
                    onClick={() => updateMapStyleHandler(id)}
                    src={style.image}
                    alt={style.name}
                />
            )}

            {style.active === false && <p>{style.name}</p>}
        </div>
    );
};

export default Mapview;
