import React from "react";
import "../styles/style.css";
//DATA
import { slaveTradeData } from "./Data";

const TradeInfo = ({ activeTradeData }) => {
    const getCurrentActiveTrade = () => {
        const currentActiveTrade = activeTradeData.find(
            (trade) => trade.active === true
        );

        if (currentActiveTrade) {
            return currentActiveTrade;
        } else {
            return slaveTradeData[0];
        }
    };

    return (
        <div className="trade-info">
            <img
                src={getCurrentActiveTrade()[`Vessel-Image`]}
                alt={getCurrentActiveTrade()[`Vessel-Name`]}
            />
            <h3>
                <span>Ship Name: </span>
                {getCurrentActiveTrade()[`Vessel-Name`]}
            </h3>
            <h3>
                <span>Vessel Captain: </span>
                {getCurrentActiveTrade()[`Captain's name`]}
            </h3>
            <h3>
                <span>Trade Year: </span>
                {getCurrentActiveTrade()[`Trade-Year`]}
            </h3>
            <h3>
                <span>Embarkment Location: </span>
                {getCurrentActiveTrade()[`Purchase-Location`]}
            </h3>
            <h3>
                <span>Disembarkment Location: </span>
                {getCurrentActiveTrade()[`Disembarkment-Location`]}
            </h3>
            <h3>
                <span>Total Number of Slaves Transported: </span>
                {getCurrentActiveTrade()[`Slave-Count`]}
            </h3>
        </div>
    );
};

export default TradeInfo;
