import React, {useEffect, useState} from 'react';
import "../css/FeedList.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function FeedList(props) {
    const navi = useNavigate();
    const [feedlist, setFeedlist] = useState([]);
    const [search_col,setSearch_col] = useState("");
    const [search_word,setSearch_word] = useState('');
    const [order_col,setOrder_col] = useState("");
    const [option, setOption] = useState({
        spc: '',
        lvtp: '',
        fml: '',
        style: '',
    })

    const feedList = () => {

        const listUrl = localStorage.url + "/feed/list";

        axios.get(listUrl)
            .then(res => {
                setFeedlist(res.data);
            })
    }

    const uploadDB = (e) => {
        const uploadUrl = localStorage.url + "/crawling/insert"

        const formData = new FormData()
        formData.append("file",e.target.files[0])
        console.log(e.target.files[0])
        axios.post(uploadUrl, formData,
            {'Content-Type': 'multipart/form-data'}
        ).then()
    }

    //처음 시작시 list() 함수 호출
    useEffect(() => {
        feedList();
    }, []);

    const updaterdcnt=(fd_num)=>{

        const rdcntUrl=localStorage.url+"/feed/uprdcnt?fd_num="+fd_num;

        axios.get(rdcntUrl)
            .then(res=>{
                console.log("조회수+1");
            })
    }
    const searchFeed = ()=>{
        console.log("search_col:"+search_col);
        const searchUrl = localStorage.url + "/feed/list?search_col="+search_col+"&search_word="+search_word+"&order_col="+order_col;

        axios.get(searchUrl)
            .then(res => {
                setFeedlist(res.data);
            })
    }
    const searchEnter = (e) => {
        if(e.key === 'Enter') {
            searchFeed();
        }
    }

    const selectOrder=(e)=>{
        new Promise((e)=>{setOrder_col(e.target.value)}
        ).then(()=>{searchFeed()})
    }
    const setOptionSelect=(e)=>{
        const {name, value} = e.target;
        setOption({
            ...option,
            [name]: value,
        })
    }


    return (
        <div className="feed_container">
            <div className="input-group" style={{margin:"50px auto"}}>
                <select className="form-select fsel" name="order_col"
                        onChange={(e)=>{selectOrder(e)}}>
                    <option value="" selected disabled>정렬</option>
                    <option value="fd_num" >최신순</option>
                    <option value="fd_rdcnt">조회순</option>
                    <option value="fd_likes">좋아요순</option>
                </select>
                <select className="form-select fsel" name="style"
                        onChange={setOptionSelect}>
                    <option value="" selected disabled>스타일</option>
                    <option value="모던">모던</option>
                    <option value="미니멀&심플">미니멀&심플</option>
                    <option value="내추럴">내추럴</option>
                    <option value="북유럽">북유럽</option>
                    <option value="빈티지&레트로">빈티지&레트로</option>
                    <option value="클래식&앤틱">클래식&앤틱</option>
                    <option value="러블리&로맨틱">러블리&로맨틱</option>
                    <option value="한국&아시아">한국&아시아</option>
                </select>
                <select className="form-select fsel" name="search_col"
                        onChange={(e)=>setSearch_col(e.target.value)}>
                    <option value="fd_title" >제목</option>
                    <option value="prf_nick">작성자</option>
                    <option value="fd_txt">내용</option>
                </select>
                <select className="form-select fsel" name="search_col"
                        onChange={(e)=>setSearch_col(e.target.value)}>
                    <option value="fd_title" >제목</option>
                    <option value="prf_nick">작성자</option>
                    <option value="fd_txt">내용</option>
                </select>
                <span style={{color:"#777", lineHeight:"40px"}}>총 {feedlist.length}개 게시물</span>
                <div className="input-group" style={{width: "40%",margin:"0 0 0 auto"}}>
                    <select className="form-select fsearch" style={{width: "100px"}} name="search_col"
                        onChange={(e)=>setSearch_col(e.target.value)}>
                        <option value="fd_title">제목</option>
                        <option value="prf_nick">작성자</option>
                        <option value="fd_txt">내용</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;
                    <input type="text" name="search_word" className="form-control fsearch" style={{width: "150px"}}
                        placeholder="검색단어" onChange={(e)=>setSearch_word(e.target.value)} onKeyPress={searchEnter}/>
                    <button type="button" className="btn btn-secondary"
                            style={{width: "50px",backgroundColor:"#35C5F0",border:"#35C5F0"}}
                            onClick={searchFeed}><SearchOutlinedIcon/></button>
                </div>
            </div>

            {/*<input type={'file'} id="fileimg" multiple required*/}
            {/*       style={{visibility: 'hidden'}} onChange={uploadDB}/>*/}
            {/*<button className="btn btn-danger" onClick={() => {*/}
            {/*    document.getElementById("fileimg").click();*/}
            {/*}}>누르지 마시오</button>*/}

            <div className="virtualized-list row">
                {
                    feedlist?feedlist.filter((data)=>data.fd_style.includes(option.style))
                        .map((fdto, idx) => (

                        <div className="col-12 col-md-4">
                            <article className="project-feed__item">
                                <a className="project-feed__item__link"
                                   href={`/feed/detail/${fdto.fd_num}`} onClick={()=>{updaterdcnt(fdto.fd_num)}}></a>
                                <div className="project-feed__item__image">
                                    <img className="image" alt=""
                                         src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/${fdto.fd_num}/${fdto.fd_img}`}/>
                                </div>
                                <h1 className="project-feed__item__title">{fdto.fd_title}</h1>
                                <address className="project-feed__item__writer-wrap">
                                    <a className="project-feed__item__writer"
                                       href="/users/5940593?affect_type=ProjectSelfIndex&amp;affect_id=0">
                                        <img className="project-feed__item__writer__image" alt=""
                                             src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/${fdto.prf_img}`}/>
                                        <span className="project-feed__item__writer__name">{fdto.prf_nick}</span>
                                    </a>
                                </address>
                                {/* 스크랩 수, 조회 수 */}
                                <footer className="project-feed__item__status">
                                    <span className="entry" style={{marginRight: '10px'}}>좋아요 {fdto.fd_likes}</span>
                                    <span className="entry">조회 {fdto.fd_rdcnt}</span>
                                </footer>
                            </article>
                        </div>
                    )):null
                }
            </div>

        </div>
    );
}

export default FeedList;