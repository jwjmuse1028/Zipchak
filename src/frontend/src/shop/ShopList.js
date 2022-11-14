import React, {useEffect, useState} from 'react';
import {CircularProgress, Fab, Pagination} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {BookmarkBorder, Create} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 255,
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
    avatar: {
        backgroundColor: red[500],
    },
}));

function ShopList() {
    const classes = useStyles();
    const navi = useNavigate();
     const {currentPage}=useParams();
    const [data, setData]=useState('');
    const imageUrl = sessionStorage.url+"/image/";

    const getList=()=>{
        let url = sessionStorage.url+"/shop/list?currentPage="+currentPage;
        console.log(url);
        axios.get(url)
            .then(res=>{
                setData(res.data);
                console.log("res.data.length="+res.data.list.length);
            })
    }
    useEffect(() => {
            console.log("useEffect");
           getList();
        },
        [currentPage]);

    return (
        <div style={{margin:"auto", width:'70%'}}>
            {/*{*/}
            {/*    data &&*/}
            {/*    <h1>중고 글 수:{data.list.length}개</h1>*/}
            {/*}*/}

            <Fab color="primary" variant="extended" onClick={()=>{
                navi("/shop/insert");
            }}>
                <Create />&nbsp;판매하기
            </Fab>
            <br/>
            {
                data.list && data.list.map((row,idx)=>
                    <Card className={classes.root} style={{float:'left',margin:'20px'}}>
                        {/*<CardHeader*/}
                        {/*    avatar={*/}
                        {/*        <Avatar aria-label="recipe" className={classes.avatar} src={imageUrl+row.prf_img}>*/}
                        {/*        </Avatar>*/}
                        {/*    }*/}
                        {/*    title={row.sp_title}*/}
                        {/*    subheader={row.sp_wdate}*/}
                        {/*/>*/}
                        <CardMedia
                            className={classes.media}
                            image={imageUrl+row.img_first}
                            style={{width:'300px',height:'220px', cursor:'pointer'}}
                            onClick={()=>navi(`/shop/detail/${row.sp_num}/${currentPage}`)}
                        />
                        <div className={'input-group'}>
                        <CardActions disableSpacing>
                            <IconButton>
                                <BookmarkBorder/>
                            </IconButton>
                        </CardActions>
                            <CardContent>
                                <b>{row.sp_title}</b><br/>
                                <span>{row.pd_price}원</span>
                            </CardContent>
                        </div>
                    </Card>
                )
            }
            <Pagination variant="outlined" shape="rounded" style={{clear:'both'}}>
                {
                    data.startPage>1?
                        <Link to={`/shop/list/${data.startPage-1}`} className={'pagenum'}>prev</Link> : ''
                }
                {
                    data.parr &&
                    data.parr.map((n,i)=>
                        <Link to={`/shop/list/${n}`} className={'pagenum'}>
                            <b style={{color:n==currentPage?'red':'black'}}>{n}</b></Link>)
                }
                {
                    data.endPage<data.totalPage?
                        <Link to={`/shop/list/${data.endPage+1}`} className={'pagenum'}>next</Link> : ''
                }
            </Pagination>
        </div>
    );
}

export default ShopList;
