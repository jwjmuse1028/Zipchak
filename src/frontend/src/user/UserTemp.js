import React, {useEffect, useState} from 'react';
import tmp from "../image/tmp.png";
import '../css/UserTemp.css';

function UserTemp(props) {
    const {prf_tmp}=props;
    const [tmpCol,setTmpCol]=useState('green');
    const [tmpH, setTmpH]=useState('10px');
    const [tmpY,setTmpY]=useState('5px');
    //상대방 온도 출력
    const getTmpCol=()=>{
        if (prf_tmp>80)
        {
            setTmpCol('red');
            setTmpH('35px');
            setTmpY('7px')
        }else if(prf_tmp>60) {
            setTmpCol('orange');
            setTmpH('27px');
            setTmpY('10px')
        }else if(prf_tmp>40) {
            setTmpCol('gold');
            setTmpH('20px');
            setTmpY('15px')
        }else if(prf_tmp>20) {
            setTmpCol('green');
            setTmpH('15px');
            setTmpY('20px')
        }else if(prf_tmp>10) {
            setTmpCol('dodgerblue');
            setTmpH('10px');
            setTmpY('25px')
        }else {
            setTmpCol('midnightblue');
            setTmpY('0px')
            setTmpH('0px');
        }
    }
    useEffect(()=>getTmpCol(),[prf_tmp]
    )
    return (
        <div style={{display:"flex"}}>
            <img alt={''} src={tmp} className={'tmp_img'}/>
            <div className={'tmp_circle'} style={{backgroundColor:tmpCol}}></div>
            <div className={'tmp_rec'} style={{backgroundColor:tmpCol, height:tmpH,top:tmpY}}></div>
            <div className={'prf_tmp'}>{prf_tmp}℃</div>
        </div>
    );
}

export default UserTemp;