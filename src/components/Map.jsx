import React, { useState, useEffect, useCallback } from "react";
//MAP GL
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactMapGL, {
    Marker,
    Popup,
    Source,
    Layer,
    FlyToInterpolator,
    NavigationControl,
} from "!react-map-gl";
//TURF
import * as turf from "@turf/turf";
//DATA
import { slaveTradeData } from "./Data";
//STYLE
import "../styles/style.css";
//COMPONENTS
import Trade from "./Trade";
import TradeInfo from "./TradeInfo";
import MapviewLibrary from "./MapviewLibrary";
import MapFilters from "./MapFilters";
//ICON
import { FaMapMarkedAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

const Map = ({ filterViewStatus }) => {
    //VARIABLES
    const [origin, setOrigin] = useState([-66.097588, 18.452689]);
    const [destination, setDestination] = useState([-79.847956, 32.745318]);
    const [midPoint, setMidpoint] = useState([
        -72.55780589268187, 25.759897548006503,
    ]);
    const [index, setIndex] = useState(0);
    const [zoom, setZoom] = useState(3);
    const [activeTradeData, setActiveTradeData] = useState(slaveTradeData);
    const [mapViewStatus, setMapViewStatus] = useState(false);
    const [mapStyles, setMapStyles] = useState([
        {
            style: "mapbox://styles/deeyin/ckpxexv8p0wqb17pfbqe0pqu1",
            name: "Streets",
            image: "https://miro.medium.com/max/3332/0*yPSQlTHRvLaIVBcG.jpg",
            active: true,
        },
        {
            style: "mapbox://styles/deeyin/ckq1ji2240kra17p2w2z0ajvo",
            name: "Chilled",
            image: "https://openlayers.org/workshop/en/vectortile/bright.png",
            active: false,
        },
        {
            style: "mapbox://styles/deeyin/ckq1jm7k83p7317k47t9x7dwl",
            name: "Seashore",
            image: "https://footpathapp.com/user-guide/maps/mapbox-outdoors/mapbox_outdoors.png",
            active: false,
        },
        {
            style: "mapbox://styles/deeyin/ckq0zy2zk0e7u17p9oapt8fh7",
            name: "Basic",
            image: "https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg",
            active: false,
        },
    ]);
    const [mapStyle, setMapStyle] = useState(mapStyles[0].style);

    const [viewport, setViewport] = useState({
        latitude: 18.1850507,
        longitude: -77.3947693,
        width: "70vw",
        height: "90vh",
        zoom: 3,
    });

    //ROUTE DATA
    const routeData = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: [origin, destination],
                },
            },
        ],
    };

    //ROUTE STYLING
    const routeLayer = {
        id: "route",
        type: "line",
        source: "route",
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "#fff",
            "line-width": 1,
        },
    };

    //SHIP LAYER
    const shipLayer = {
        id: "point",
        source: "point",
        type: "symbol",
        layout: {
            "icon-image": "battleship-1",
            "icon-size": 0.06,
            "icon-rotate": ["get", "bearing"],
            "icon-rotation-alignment": "map",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
        },
    };

    const tradeShipData = ({ coordinates }) => {
        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Point",
                        coordinates: coordinates,
                    },
                },
            ],
        };
    };

    //SHIP DATA STATE
    const [shipData, setShipData] = useState(null);

    // Calculate the distance in kilometers between route start/end point.
    const lineDistance = turf.length(routeData.features[0]);

    const arc = [];

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    const steps = 500;

    // Draw an arc between the `origin` & `destination` of the two points
    for (var i = 0; i < lineDistance; i += lineDistance / steps) {
        var segment = turf.along(routeData.features[0], i);
        arc.push(segment.geometry.coordinates);
    }

    // Update the route with calculated arc coordinates
    routeData.features[0].geometry.coordinates = arc;

    // Used to increment the value of the point measurement against the route.
    let [counter, setCounter] = useState(0);

    const animate = () => {
        const start =
            routeData.features[0].geometry.coordinates[
                counter >= steps ? counter - 1 : counter
            ];
        const end =
            routeData.features[0].geometry.coordinates[
                counter >= steps ? counter : counter + 1
            ];
        if (!start || !end) return;
        if (counter < steps) {
            const animation = window.requestAnimationFrame(() =>
                setShipData(
                    tradeShipData({
                        coordinates:
                            routeData.features[0].geometry.coordinates[counter],
                    })
                )
            );
            setCounter((counter) => counter + 1);
            return () => window.cancelAnimationFrame(animation);
        }
    };

    //Show Trade Route Dynamically changes the trade route on marker click the midpoint is also updated here
    const showTradeRoute = (index, ID) => {
        setCounter(0);
        const currentTrade = activeTradeData.filter((trade) => trade.ID === ID);
        setShipData(
            tradeShipData({
                coordinates:
                    routeData.features[0].geometry.coordinates[counter],
            })
        );
        setOrigin([
            currentTrade[0]["Purchase-Longitude"],
            currentTrade[0]["Purchase-Latitude"],
        ]);

        setDestination([
            currentTrade[0]["Disembarkment-Longitude"],
            currentTrade[0]["Disembarkment-Latitude"],
        ]);

        setMidpoint(
            turf.midpoint(
                [
                    currentTrade[0]["Purchase-Longitude"],
                    currentTrade[0]["Purchase-Latitude"],
                ],
                [
                    currentTrade[0]["Disembarkment-Longitude"],
                    currentTrade[0]["Disembarkment-Latitude"],
                ]
            ).geometry.coordinates
        );
        setIndex(index);

        const updatedActiveTradeData = activeTradeData.map((trade) => {
            if (trade.ID === ID) {
                return {
                    ...trade,
                    active: true,
                };
            } else {
                return {
                    ...trade,
                    active: false,
                };
            }
        });

        setActiveTradeData(updatedActiveTradeData);

        animate();
    };

    const zoomHandler = (origin, destination) => {
        const options = { units: "miles" };
        const distance = turf.distance(origin, destination, options);
        if (distance < 100) {
            setZoom(7);
        } else if (distance > 1500) {
            setZoom(3);
        } else {
            setZoom(4);
        }
    };

    const onShowTradeRoute = useCallback(
        (longitude, latitude) => {
            setViewport({
                longitude,
                latitude,
                zoom: zoom,
                transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
                transitionDuration: "auto",
            });
        },
        [zoom]
    );

    const updateMapStyleHandler = (index) => {
        const updatedStyles = mapStyles.map((style, id) => {
            if (id === index) {
                return {
                    ...style,
                    active: true,
                };
            } else {
                return {
                    ...style,
                    active: false,
                };
            }
        });
        setMapStyles(updatedStyles);
        setMapStyle(mapStyles[index].style);
    };

    const filterBySlaveCount = (nrOfSlaves) => {
        const filteredTrades = slaveTradeData.filter(
            (trade) => trade["Slave-Count"] >= nrOfSlaves
        );

        console.log(activeTradeData);
        setActiveTradeData(filteredTrades);
        return filteredTrades;
    };
    const filterByTradeYears = (startYear, endYear) => {
        const filteredTrades = slaveTradeData.filter(
            (trade) =>
                trade["Trade-Year"] >= startYear &&
                trade["Trade-Year"] <= endYear
        );
        setActiveTradeData(filteredTrades);
        return filteredTrades;
    };

    const applyAllFilters = (startYear, endYear, slaveCount) => {
        const filteredByTradeYears = filterByTradeYears(startYear, endYear);
        const filteredBySlaveCount = filterBySlaveCount(slaveCount);
        const combinedFilters =
            filteredByTradeYears.concat(filteredBySlaveCount);
        const uniqueCombinedFilters = [...new Set(combinedFilters)];
        const applyAllFilters = uniqueCombinedFilters.filter(
            (trade) =>
                trade["Trade-Year"] >= startYear &&
                trade["Trade-Year"] <= endYear &&
                trade["Slave-Count"] >= slaveCount
        );
        setActiveTradeData(applyAllFilters);
    };

    useEffect(() => {
        animate();
    }, [counter]);
    useEffect(() => {
        if (activeTradeData) {
            zoomHandler(origin, destination);
        }
        onShowTradeRoute(midPoint[0], midPoint[1]);
    }, [midPoint, zoom]);

    return (
        <div className="map">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN_API}
                mapStyle={mapStyle}
                onViewportChange={(currentViewport) => {
                    setViewport(currentViewport);
                }}
                className="map-view"
            >
                {activeTradeData.map((trade, index) => (
                    <Trade
                        key={Math.random() * 10000}
                        index={index}
                        trade={trade}
                        showTradeRoute={showTradeRoute}
                    />
                ))}
                <Source type="geojson" data={routeData}>
                    <Layer {...routeLayer} />
                </Source>
                <Source type="geojson" data={shipData}>
                    <Layer {...shipLayer} />
                </Source>
                <div className="btn-overlay">
                    <button
                        onClick={() =>
                            setViewport({
                                latitude: midPoint[1],
                                longitude: midPoint[0],
                                width: "70vw",
                                height: "90vh",
                                zoom: 2,
                            })
                        }
                        id="zoom-rest"
                    >
                        Zoom Reset
                    </button>
                </div>
                <NavigationControl className="nav-controls" />
                <IconContext.Provider
                    value={{ className: "mapview-library intro-styles" }}
                >
                    <FaMapMarkedAlt
                        onClick={() => setMapViewStatus(!mapViewStatus)}
                    />
                </IconContext.Provider>
                <MapviewLibrary
                    mapViewStatus={mapViewStatus}
                    updateMapStyleHandler={updateMapStyleHandler}
                    mapStyles={mapStyles}
                />
            </ReactMapGL>
            <div className="map-tools">
                <TradeInfo activeTradeData={activeTradeData} />
                <MapFilters
                    filterViewStatus={filterViewStatus}
                    filterBySlaveCount={filterBySlaveCount}
                    filterByTradeYears={filterByTradeYears}
                    applyAllFilters={applyAllFilters}
                    setActiveTradeData={setActiveTradeData}
                />
            </div>
        </div>
    );
};

export default Map;
