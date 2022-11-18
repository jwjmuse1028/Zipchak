import React, {useEffect, useState} from 'react';
import "../css/FeedList.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function FeedList(props) {
    const navi = useNavigate();
    const [feedlist, setFeedlist] = useState([]);

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


    return (
        <div className="feed_container">
            <h1>FeedList: 총 {feedlist.length}개 게시물</h1>
            {/*<input type={'file'} id="fileimg" multiple required*/}
            {/*       style={{visibility: 'hidden'}} onChange={uploadDB}/>*/}
            {/*<button className="btn btn-danger" onClick={() => {*/}
            {/*    document.getElementById("fileimg").click();*/}
            {/*}}>누르지 마시오</button>*/}

            <div className="virtualized-list row">
                {
                    feedlist.map((fdto, idx) => (

                        <div className="col-12 col-md-4">
                            <article className="project-feed__item">
                                <a className="project-feed__item__link"
                                   href={`/feed/detail/${fdto.fd_num}`}></a>
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
                    ))
                }
            </div>
            {/*<div className="col-12 col-md-4">*/}
            {/*    <article className="project-feed__item">*/}
            {/*        <a className="project-feed__item__link" href="/projects/130370/detail?affect_type=ProjectSelfIndex&amp;affect_id=0"></a>*/}
            {/*        /!* 이미지 *!/*/}
            {/*        <div className="project-feed__item__image">*/}
            {/*            <img className="image" alt="" src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=480&amp;h=320&amp;c=c&amp;q=80&amp;webp=1"/>*/}
            {/*            /!* 스크랩 버튼 *!/*/}
            {/*            <button className="project-feed__item__image__scrap" type="button" aria-label="스크랩">*/}
            {/*                /!*스크랩 아이콘인듯??*!/*/}
            {/*                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"*/}
            {/*                     className="icon">*/}
            {/*                    <g fill="none" fill-rule="nonzero" transform="matrix(1 0 0 -1 0 24)">*/}
            {/*                        <use fill="#000" filter="url(#scrap-icon-71-a)" href="#scrap-icon-71-b"></use>*/}
            {/*                        <use fill="#FFF" fill-opacity=".4" href="#scrap-icon-71-b"></use>*/}
            {/*                        <use fill="#000" filter="url(#scrap-icon-71-c)" href="#scrap-icon-71-b"></use>*/}
            {/*                        <path stroke="#FFF"*/}
            {/*                              d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"></path>*/}
            {/*                    </g>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        /!* 제목 *!/*/}
            {/*        <h1 className="project-feed__item__title">리모델링 없이도 마음에 쏙! 차분한 톤의 24평 신혼집</h1>*/}
            {/*        /!* 글쓴이 *!/*/}
            {/*        <address className="project-feed__item__writer-wrap">*/}
            {/*            <a className="project-feed__item__writer" href="/users/5940593?affect_type=ProjectSelfIndex&amp;affect_id=0">*/}
            {/*                <img className="project-feed__item__writer__image" alt=""  src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=36&amp;h=36&amp;c=c&amp;webp=1"/>*/}
            {/*            <span className="project-feed__item__writer__name">nuoy-haus</span>*/}
            {/*            </a>*/}
            {/*        </address>*/}
            {/*        /!* 스크랩 수, 조회 수 *!/*/}
            {/*        <footer className="project-feed__item__status">*/}
            {/*            <span className="entry">스크랩 29&nbsp;</span>*/}
            {/*            <span className="entry">조회 1,104</span>*/}
            {/*        </footer>*/}
            {/*    </article>*/}
            {/*</div>*/}

        </div>
    );
}

export default FeedList;