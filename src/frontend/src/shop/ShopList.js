import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Bookmark, BookmarkBorder, Create} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import {
    Button,
    Fab,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import transitions from "@material-ui/core/styles/transitions";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '21%',
        minWidth: 240
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
    const [search_col, setSearch_col]=useState('sp_title');
    const [search_word, setSearch_word]=useState('');
    const [viewPaging,setViewPaging]=useState(true);
    // const [chkSoldOut,setChkSoldOut]=useState(true);
    // const [like, setLike]=useState(false);
    // const [bookmark, setBookmark]=useState('unlike');

    const getList=()=>{
        let ur_num=sessionStorage.ur_num;
        let url = sessionStorage.url+"/shop/list?currentPage="+currentPage+"&ur_num="+ur_num;
        axios.get(url)
            .then(res=>{
                setData(res.data);
                setViewPaging(true);
                setSearch_word('');
            })
    }
    const searchbutton=()=>{

        let ur_num=sessionStorage.ur_num;
        let url = sessionStorage.url+"/shop/list?search_col="+search_col+"&search_word="+search_word+"&ur_num="+ur_num;
        axios.get(url)
            .then(res=>{
                // alert("성공");
                setData(res.data);
                if(search_word==null || search_word.length==0){
                    setViewPaging(true);
                }else{
                    setViewPaging(false);
                }
                setSearch_word('');
            })
    }

    useEffect(() => {
            getList();
        },[currentPage,data.userlike]);

    // useEffect(() => {
    //     getList();
    // },[data]);

    const numberFormat=(inputNumber) =>{
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // console.log("row="+JSON.stringify(data));
    const onClickLike = (sp_num,Transition,e) => () => {
        let ur_num=sessionStorage.ur_num;
        // console.log("spnum="+sp_num,"ur="+ur_num);
        let url=sessionStorage.url+"/shop/likes?sp_num="+sp_num+"&ur_num="+ur_num;
        if (sessionStorage.loginok==null){
            alert("로그인 후 이용해주세요");
            return;
        }
        axios.get(url)
            .then(res=>{
                // console.log("성공");
                setData(
                    {
                        ...data,
                        totallikes: res.data.totallikes,
                        userlike: res.data.userlike
                    }
                );
                setState({
                    open: true,
                    Transition,
                });

            });
    }

    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
    });

    const likeClose = () => {
        setState({
            ...state,
            open: false,
        });
    };
    return (
        <div style={{margin:"auto", width:'100%', maxWidth:'1500px'}}>
            <div>
                <Fab color="info" variant="extended" onClick={() => {
                        if (sessionStorage.loginok==null){
                            alert("로그인 후 이용해주세요");
                            return
                        }else {
                            navi("/shop/insert");
                        }
                        }}>
                        <Create/>&nbsp;판매글작성
                </Fab>
                    {/*    <RadioGroup row aria-label="position" name="status" defaultValue="전체보기" style={{float:"right"}}>*/}
                    {/*        <FormControlLabel*/}
                    {/*            control={<Radio/>}*/}
                    {/*            value="전체보기"*/}
                    {/*            label="전체보기"*/}
                    {/*        />*/}
                    {/*        <FormControlLabel*/}
                    {/*            control={<Radio/>}*/}
                    {/*            value="판매중인 상품만 보기"*/}
                    {/*            label="판매중인 상품만 보기"*/}
                    {/*        />*/}
                    {/*    </RadioGroup>*/}
                <div style={{justifyContent:"center"}} className={'input-group'}>
                    <Select style={{width:'7%', textAlign:"center"}} defaultValue={'sp_title'} name={'search_col'} onChange={(e)=>setSearch_col(e.target.value)}>
                        <MenuItem value={'sp_title'}>제목</MenuItem>
                        <MenuItem value={'sp_txt'}>내용</MenuItem>
                    </Select>
                    <TextField placeholder={'검색어'} style={{width:'30%'}} value={search_word} onChange={(e)=>setSearch_word(e.target.value)}/>
                    <Button variant="contained" color="info" style={{width:'7%'}} onClick={searchbutton}>검색</Button>
                </div>
            </div>
                <br/>
            {
                data.list && data.list.map((row,idx)=>
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
                            <IconButton color={"primary"} onClick={onClickLike(row.sp_num,SlideTransition)}>
                                {
                                    row.userlike===0?<BookmarkBorder fontSize={"large"}/>:<Bookmark fontSize={"large"}/>
                                }
                            </IconButton>
                        </CardActions>

                            <CardContent>
                                <b className={'list-title'}
                                   onClick={()=>navi(`/shop/detail/${row.pd_num}/${row.sp_num}/${currentPage}`)}>{row.sp_title}</b>
                                <span>{numberFormat(row.pd_price)}원</span><br/>
                                <span style={{color:"gray", fontSize:'0.9em'}}>관심&nbsp;{row.totallikes}·채팅&nbsp;{}</span>
                            </CardContent>
                        </div>
                    </Card>
                )
            }
            <Snackbar
                open={state.open}
                onClose={likeClose}
                autoHideDuration={2000}
                TransitionComponent={state.Transition}
                message= {data.userlike===1?"관심목록에 추가하였습니다":"관심목록에서 삭제하였습니다"}
                key={state.Transition.name}
                action={
                    data.userlike===1?
                        <React.Fragment>
                            <Button color="info" onClick={()=>{navi("/mypage")}}>
                                찜 목록 바로가기
                            </Button>
                        </React.Fragment>:''
                }
            />
            <br/>
            {
                viewPaging &&
                <div className={'page'} variant="outlined" shape="rounded" style={{clear: 'both'}}>
                    {
                        data.startPage > 1 ?
                            <Link to={`/shop/list/${data.startPage - 1}`} className={'pageprev'}>이전</Link> : ''
                    }
                    {
                        data.parr &&
                        data.parr.map((n, i) =>
                            <Link to={`/shop/list/${n}`} className={'pagenum'} key={i}>
                                <b style={{color: n == currentPage ? '#38B9E0' : 'black'}}>{n}</b></Link>)
                    }
                    {
                        data.endPage < data.totalPage ?
                            <Link to={`/shop/list/${data.endPage + 1}`} className={'pagenext'}>다음</Link> : ''
                    }
                </div>
            }<br/>
        </div>
    );
}

export default ShopList;
