import React, {useState} from 'react';
import {Button, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

function ShopInsertForm(props) {
    const [sp_title, setSp_title]=useState('');
    const [pd_ctg, setPd_ctg]=useState('');
    const [pd_price, setPd_price]=useState('');
    const [img_name, setImg_name]=useState('');
    const [sp_txt, setSp_txt]=useState('');
    const navi = useNavigate();
    return (
        <div>
            <form>
                <table className={'table table-bordered'} style={{width:'40%', margin:"auto", borderColor:'white'}}>
                    <caption align={'top'}><h1>상품등록</h1></caption>
                    <tbody>
                        <tr>
                            <th style={{width:'20%'}}>제목&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td style={{width:'80%'}}>
                                <TextField id="standard-basic" label="" variant={"standard"} style={{width:'100%'}} value={sp_title}/>
                            </td>
                        </tr>
                        <tr>
                            <th>카테고리&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <Select variant={"standard"} style={{width:'100%'}}>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <th>가격&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <TextField id="standard-basic" label="" variant={"standard"} style={{width:'100%'}} value={pd_price}/>
                            </td>
                        </tr>
                        <tr>
                            <th>사진&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <TextField id="standard-basic" label="" variant={"standard"} style={{width:'100%'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <TextareaAutosize id="standard-basic" label="" style={{width:'100%', height:'300px'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td align={"center"}>
                                <Button color={"info"} variant={"contained"}>상품등록</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default ShopInsertForm;