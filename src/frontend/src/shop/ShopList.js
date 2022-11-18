import React, {useEffect, useState} from 'react';
import {
    Button,
    Fab,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {BookmarkBorder, Create} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '21%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

function ShopList() {
    const classes = useStyles();
    const navi = useNavigate();
     const {currentPage}=useParams();
    const [data, setData]=useState('');
    // const imageUrl = sessionStorage.url+"/image/";

    const getList=()=>{
        let url = sessionStorage.url+"/shop/list?currentPage="+currentPage;
        axios.get(url)
            .then(res=>{
                setData(res.data);
                // console.log("res.data.length="+res.data.list.length);
            })
    }
    const numberFormat=(inputNumber) =>{
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    useEffect(() => {
           getList();
        },
        [currentPage]);

    return (
        <div style={{margin:"auto", width:'70%'}}>
            {/*{*/}
            {/*    data &&*/}
            {/*    <h1>중고 글 수:{data.list.length}개</h1>*/}
            {/*}*/}
            <div>
                <Fab color="primary" variant="extended" onClick={() => {
                        if (sessionStorage.loginok==null){
                            alert("로그인 후 이용해주세요");
                            return
                        }else {
                            navi("/shop/insert");
                        }
                        }}>
                        <Create/>&nbsp;판매글작성
                </Fab>

                    {/*<label><input type={"radio"} name={'pd_status'} checked/>&nbsp;전체보기</label>&nbsp;&nbsp;&nbsp;*/}
                    {/*<label><input type={"radio"} name={'pd_status'}/>&nbsp;판매중인 상품만 보기</label>*/}
                        <RadioGroup row aria-label="position" name="status" defaultValue="전체보기" style={{float:"right"}}>
                            <FormControlLabel
                                control={<Radio/>}
                                value="전체보기"
                                label="전체보기"
                            />
                            <FormControlLabel
                                control={<Radio/>}
                                value="판매중인 상품만 보기"
                                label="판매중인 상품만 보기"
                            />
                        </RadioGroup>
            </div>
                <br/>
            {
                data.list && data.list.map((row,idx)=>
                        // <div style={{verticalAlign: "middle",
                        //     display: "block",
                        //     position: "relative",
                        //     overflow: "hidden",
                        //     paddingTop: "55%"}}>
                        //     <span
                        //         style={{
                        //              backgroundImage:
                        //             // `url(${
                        //             //     imageUrl + r.thumbnailImage
                        //             // })`,
                        //             `url(${row.img_first})`,
                        //             verticalAlign: "top",
                        //             backgroundSize: "cover",
                        //             position: "absolute",
                        //             top: "0",
                        //             left: "0",
                        //             width:'150px',
                        //             height:'150px'
                        //             // width: "100%",
                        //             // height: "100%"
                        //         }}
                        //     >
                        //         {row.pd_status=="soldout" ? (
                        //             <span style={{
                        //                 display: "table",
                        //                 width: "102%",
                        //                 height: "102%",
                        //                 background: "rgba(0, 0, 0, 0.6)",
                        //                 color: "#fff",
                        //                 textAlign: "center",
                        //                 zIndex: "0",
                        //                 fontSize: "17px"
                        //             }}>
                        //                 <em className='label'
                        //                 style={{
                        //                     display: "table-cell",
                        //                     verticalAlign: "middle"
                        //                 }}>
                        //                     판매완료
                        //                 </em>
                        //             </span>
                        //         )  : null}
                        //     </span>
                        //
                        // </div>
                        // <span style={{backgroundImage:`url(${row.img_first})`}}>
                        //     { row.pd_status=="soldout"?<span></span>:null}
                        // </span>
                    <Card className={classes.root} style={{float:'left',margin:'2%'}} key={idx}
                    >
                        <CardMedia
                            className={classes.media}
                            // image={row.img_first} //대표사진
                            image={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/${row.img_first}`}
                            style={{width:'300px',height:'220px', cursor:'pointer', filter:row.pd_status=="soldout"?'brightness(40%)':''}}
                            onClick={()=>navi(`/shop/detail/${row.pd_num}/${row.sp_num}/${currentPage}`)}
                        />
                        {
                            row.pd_status=="soldout"?
                            <span className={'soldouttxt'}>판매완료</span>:''
                        }
                        <div className={'input-group'}>
                        <CardActions disableSpacing>
                            <IconButton color={"primary"}>
                                {/*<Bookmark/>*/}
                                <BookmarkBorder/>
                            </IconButton>
                        </CardActions>
                            <CardContent>
                                <b className={'list-title'}
                                   onClick={()=>navi(`/shop/detail/${row.pd_num}/${row.sp_num}/${currentPage}`)}>{row.sp_title}</b>
                                <span>{numberFormat(row.pd_price)}원</span><br/>
                                <span style={{color:"gray", fontSize:'0.9em'}}>관심{}</span>·<span style={{color:"gray", fontSize:'0.9em'}}>채팅{}</span>
                            </CardContent>
                        </div>
                    </Card>
                )
            }<br/>
            <div style={{textAlign:"center"}} className={'input-group'}>
                <Select style={{width:'7%'}} defaultValue={'제목'}>
                    <MenuItem value={'제목'} selected={true}>제목</MenuItem>
                    <MenuItem value={'내용'}>내용</MenuItem>
                </Select>
            <TextField placeholder={'검색어'} style={{width:'30%'}}/>
            <Button variant="contained" color="info" style={{width:'7%'}}>검색</Button>
            </div>
            <br/>
            <div className={'page'} variant="outlined" shape="rounded" style={{clear:'both'}}>
                {
                    data.startPage>1?
                        <Link to={`/shop/list/${data.startPage-1}`} className={'pageprev'}>이전</Link> : ''
                }
                {
                    data.parr &&
                    data.parr.map((n,i)=>
                        <Link to={`/shop/list/${n}`} className={'pagenum'} key={i}>
                            <b style={{color:n==currentPage?'#38B9E0':'black'}}>{n}</b></Link>)
                }
                {
                    data.endPage<data.totalPage?
                        <Link to={`/shop/list/${data.endPage+1}`} className={'pagenext'}>다음</Link> : ''
                }
            </div>
        </div>
    );
}

export default ShopList;
