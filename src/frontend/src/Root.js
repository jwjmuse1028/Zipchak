import React from 'react';
import {BrowserRouter} from "react-router-dom";
import RouteMain from "./RouteMain";
import "./css/Layout.css";

function Root(props) {
    sessionStorage.url=process.env.REACT_APP_BACK_URL;
    return (
        <div className={'rootdiv'}>
            <BrowserRouter>
                <RouteMain/>
            </BrowserRouter>
        </div>
    );
}

export default Root;