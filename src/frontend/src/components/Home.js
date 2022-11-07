import React from 'react';

function Home(props) {
    localStorage.url=process.env.REACT_APP_BACK_URL;
    console.log(localStorage.url);
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;