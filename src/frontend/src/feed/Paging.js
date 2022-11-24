import React, { useState } from "react";
import '../css/Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage, pp}) => {

    return (
        <Pagination
            activePage={page}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={setPage}
        />
    );
};

export default Paging;