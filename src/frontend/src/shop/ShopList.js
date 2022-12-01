import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../css/ShopList.css";
import {Bookmark, BookmarkBorder, SearchRounded} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import white from "../image/white.png"

import {
    Button,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '21%',
        minWidth: 240,
        boxShadow: "none"
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
    const {currentPage,sp_num}=useParams();
    const [data, setData]=useState('');
    const [search_col, setSearch_col]=useState('sp_title');
    const [search_word, setSearch_word]=useState('');
    const [viewPaging,setViewPaging]=useState(true);
    const [category, setCategory] = useState('all')
    const [categorychange,setCategorychange]=useState(false);
    //채팅 수
    const [chatCnt,setChatCnt]=useState(0);

    //함수
    //채팅 수 출력
    const getChatCnt=()=>{
        let getChatCntUrl=sessionStorage.url+"/shop/getchatcnt?sp_num="+sp_num;
        axios.get(getChatCntUrl).
        then(res=>setChatCnt(res.data))
    }
    useEffect(()=>{
        getChatCnt();
    },[sp_num]);

    // const [chkSoldOut,setChkSoldOut]=useState(true);
     const [like, setLike]=useState(false);
    // const [bookmark, setBookmark]=useState('unlike');

    const getList=()=>{
        let newcurrentPage=1
        if (categorychange==false){newcurrentPage=currentPage;}
        let ur_num=sessionStorage.ur_num;
        let url = sessionStorage.url+"/shop/list?currentPage="+newcurrentPage+"&ur_num="+ur_num+"&pd_ctg="+category;
        axios.get(url)
            .then(res=>{
                setData(res.data);
                setViewPaging(true);
                setSearch_word('');
                setCategorychange(false);
                window.history.pushState("", null, '/shop/list/'+newcurrentPage);
            })
    }
    const searchbutton=()=>{

        let ur_num=sessionStorage.ur_num;
        let url = sessionStorage.url+"/shop/list?search_col="+search_col+"&search_word="+search_word+"&ur_num="+ur_num+"&pd_ctg="+category;
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
        },[currentPage,data.userlike,category]);

    // useEffect(() => {
    //     getList();
    // },[data]);

    const numberFormat=(inputNumber) =>{
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // console.log("row="+JSON.stringify(data));
    const onClickLike = (idx,sp_num,Transition,e) => () => {
        let ur_num=sessionStorage.ur_num;
        // console.log("spnum"+sp_num,"ur"+ur_num);
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

                setLike(res.data.userlike);

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

    const addshop=(e)=>{
        const uploadFile = new FormData();
        uploadFile.append("uploadfile",e.target.files[0])

        let url = sessionStorage.url+"/crawling/insertshop"
        axios({
            method:'post',
            url:url,
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        })
            .then()
    }

    const setOptionSelect=(e)=>{
        setCategorychange(true);
        setCategory(e.target.value);
    }
    
    return (
        <div style={{margin:"auto", width:'70%', minWidth:'1000px'}}>
            <input type={"file"} className={"btn btn-danger"} onChange={addshop}/>
            <div style={{display:'flex',alignItems:"center", justifyContent:'space-between'}}>
                <select className="form-select fsel" style={{width: "15%",margin:"0 30px 0 0",
                    maxWidth:'250px',height:'50px'}}
                        onChange={setOptionSelect} value={category}>
                    <option value={'all'} >카테고리</option>
                    <option value={'가구'}>가구</option>
                    <option value={'데코'}>데코</option>
                    <option value={'식물'}>식물</option>
                    <option value={'패브릭'}>패브릭</option>
                    <option value={'가전·디지털'}>가전·디지털</option>
                    <option value={'주방용품'}>주방용품</option>
                    <option value={'조명'}>조명</option>
                    <option value={'수납·정리'}>수납·정리</option>
                    <option value={'생활용품'}>생활용품</option>
                    <option value={'생필품'}>생필품</option>
                    <option value={'유아·아동'}>유아·아동</option>
                    <option value={'반려동물'}>반려동물</option>
                    <option value={'실내운동'}>실내운동</option>
                    <option value={'캠핑용품'}>캠핑용품</option>
                    <option value={'공구·DIY'}>공구·DIY</option>
                    <option value={'기타'}>기타</option>
                </select>
                <div style={{height:'56px',display:'flex', width:'50%',justifyContent:"flex-end"}}>
                    <Select style={{width:'20%', textAlign:"center", height:'100%'}} defaultValue={'sp_title'} name={'search_col'} onChange={(e)=>setSearch_col(e.target.value)}>
                        <MenuItem value={'sp_title'}>제목</MenuItem>
                        <MenuItem value={'sp_txt'}>내용</MenuItem>
                    </Select>
                    <TextField placeholder={'검색어'} inputProps={{style:{borderColor:'#35c5f0'}}} style={{width:'50%'}}
                               value={search_word} onChange={(e)=>setSearch_word(e.target.value)}/>
                    <Button variant="contained" style={{width:'7%', height:'100%', backgroundColor:'#35c5f0'}} onClick={searchbutton}><SearchRounded/></Button>
                </div>
            </div>
                <br/>
            {
                data.list && data.list.map((row,idx)=>
                    <Card className={classes.root} style={{float:'left',margin:'2%'}} key={idx}
                    >
                        <CardMedia
                            className={classes.media}
                            image={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/${row.img_first}`} //e
                            style={{width:'300px',height:'220px', cursor:'pointer', filter:row.pd_status=="soldout"?'brightness(40%)':''}}
                            onClick={()=>navi(`/shop/detail/${row.pd_num}/${row.sp_num}/${currentPage}`)}
                        />
                        {
                            row.pd_status=="soldout"?
                            <span className={'soldouttxt'}>판매완료</span>:''
                        }
                        <div className={'input-group'}>
                        <CardActions disableSpacing>
                            <IconButton onClick={onClickLike(idx,row.sp_num,SlideTransition)}>
                                {

                                    row.userlike===0?<BookmarkBorder fontSize={"large"} style={{color:'#828C94'}}/>:<Bookmark style={{color:'#35c5f0'}} fontSize={"large"}/>
                                }
                            </IconButton>

                        </CardActions>

                            <CardContent>
                                <b className={'list-title'}
                                   onClick={()=>navi(`/shop/detail/${row.pd_num}/${row.sp_num}/${currentPage}`)}>{row.sp_title}</b>
                                <span>{numberFormat(row.pd_price)}원</span><br/>
                                <span style={{color:"gray", fontSize:'0.9em'}}>관심&nbsp;{row.totallikes}·채팅&nbsp;{chatCnt}</span>
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
                // message= {data.userlike===1?"관심목록에 추가하였습니다":"관심목록에서 삭제하였습니다"}
                message= {like===1?"관심목록에 추가하였습니다":"관심목록에서 삭제하였습니다"}
                key={state.Transition.name}
                action={
                    like===1?
                        <React.Fragment>
                            <Button color="info" onClick={()=>{navi("/mypage/2")}}>
                                <b>찜 목록 바로가기</b>
                            </Button>
                        </React.Fragment>:''
                }
            />
            <img src={white} height={'1px'}/>
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
                                <b style={{color: n == currentPage ? '#35c5f0' : 'black'}}>{n}</b></Link>)
                    }
                    {
                        data.endPage < data.totalPage ?
                            <Link to={`/shop/list/${data.endPage + 1}`} className={'pagenext'}>다음</Link> : ''
                    }
                </div>
            }
        </div>
    );
}

export default ShopList;
