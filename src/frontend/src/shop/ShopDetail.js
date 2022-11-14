import React from 'react';
import {useParams} from "react-router-dom";

function ShopDetail(props) {
    const {sp_num,currentPage}=useParams();
    return (
        <div>
            <h1>디테일</h1>
            <h3>{sp_num}</h3>
            <h3>{currentPage}</h3>
        </div>
    );
}

export default ShopDetail;