import React from 'react';
import {BrowserRouter} from "react-router-dom";
import RouteMain from "./RouteMain";

function Root(props) {
    sessionStorage.url=process.env.REACT_APP_BACK_URL;
    return (
        <div>
            <BrowserRouter>
                <RouteMain/>
            </BrowserRouter>
        </div>
    );
}

export default Root;