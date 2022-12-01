import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../css/FeedCmt.css";
import Paging from "./Paging";
import {useNavigate} from "react-router-dom";

function FeedDetailCmt({fd_num}) {

    const navi=useNavigate();
    const [cmtlist, setCmtlist] = useState([]);
    const [count, setCount] = React.useState(0); //아이템 총 개수
    const [page, setPage] = React.useState(1); //현재페이지
    const [postPerPage] = React.useState(6); //페이지당 아이템 개수

    const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
    const [currentPosts, setCurrentPosts] = React.useState(0);

    const [cmt_num, setCmt_num] = useState(0);
    const [cmt_txt, setCmt_txt] = useState('');
    const [cmt_rg, setCmt_rg] = useState(0);
    const [cmt_rs, setCmt_rs] = useState(0);
    const [cmt_rl, setCmt_rl] = useState(0);
    const [reok, setReok] = useState(-1);
    const [cmtre_txt, setCmtre_txt] = useState('');
    const [cmt_btn_cls,setCmt_btn_cls]=useState("css-17ydrlm");
    const [cmtre_btn_cls,setCmtre_btn_cls]=useState("css-17ydrlm");
    const [cmt_fr_cls,setCmt_fr_cls]=useState("css-1hlhf3b");
    const [cmtre_fr_cls,setCmtre_fr_cls]=useState("css-1hlhf3b");

    const [oldpp,setOldpp]=useState(0);

    const ur_num = sessionStorage.ur_num;
    // 로그인한 사람 사진과 닉네임 출력(getPrfByNum으로 axios 가져오기 실패...)
    const prf_img = sessionStorage.prf_img;
    const prf_nick = sessionStorage.prf_nick;

    const imgUrl = "https://s3.ap-northeast-2.amazonaws.com/bitcampteam2";
    const cmtinsertUrl = localStorage.url + "/fdcmt/insert";

    const getAllCmt = () => {
        const cmtUrl = localStorage.url + "/fdcmt/list?fd_num=" + fd_num;

        axios.get(cmtUrl)
            .then(res => {
                setCmtlist(res.data);
                setCount(res.data.length);
                // let pp=page * postPerPage;
                // let fp=postPerPage;
                // console.log(res.data[pp-1].cmt_rl);
                // while(res.data[pp-1].cmt_rl>0)
                // {
                //     console.log("whilepp:"+pp--);
                //     fp--;
                // }
                setIndexOfLastPost(page * postPerPage);
                setIndexOfFirstPost(indexOfLastPost-postPerPage)
                setCurrentPosts(res.data.slice(indexOfFirstPost, indexOfLastPost));

            })
    }
    useEffect(() => {
        getAllCmt();
    }, [page, indexOfFirstPost, indexOfLastPost, postPerPage]);


    const onCmtSubmit = (e) => {

        e.preventDefault();

        setCmt_num(0);
        setCmt_rg(0);
        setCmt_rs(0);
        setCmt_rl(0);

        axios.post(cmtinsertUrl, {cmt_num, fd_num, ur_num, cmt_txt, cmt_rg, cmt_rs, cmt_rl})
            .then(res => {
                alert("insert 성공");
                getAllCmt();
                setCmt_txt('');
                }
            )


    }
    const onCmtReSubmit =(e,cmt_num,cmt_rg,cmt_rs,cmt_rl)=> {

        e.preventDefault();

        setCmt_num(cmt_num);
        setCmt_rg(cmt_rg);
        setCmt_rs(cmt_rs);
        setCmt_rl(cmt_rl);

        axios.post(cmtinsertUrl, {cmt_num, fd_num, ur_num, "cmt_txt":cmtre_txt, cmt_rg, cmt_rs, cmt_rl})
            .then(res => {
                getAllCmt();
                //초기화
                setCmtre_txt('');
                setCmt_num(0);
                setCmt_rg(0);
                setCmt_rs(0);
                setCmt_rl(0);
                setReok(-1);
                }
            )
    }

    const onFocus=(e)=>{
        setCmt_fr_cls("css-vg56");
        setCmt_btn_cls("css-fw3oix");
    }
    const onBlur=(e)=>{
        setCmt_fr_cls("css-1hlhf3b");
        setCmt_btn_cls("css-17ydrlm");
    }
    const onRefocus=(e)=>{
        setCmtre_fr_cls("css-vg56");
        setCmtre_btn_cls("css-fw3oix");
    }
    const onReblur=(e)=>{
        setCmtre_fr_cls("css-1hlhf3b");
        setCmtre_btn_cls("css-17ydrlm");
    }

    return (
        <div className={"cmt_container"}>
            {ur_num &&
                <form className="css-blglsf e1lhpdsz3" onSubmit={onCmtSubmit}>
                    <img src={`${imgUrl}/prf_img/${prf_img}`}
                         class="css-1iaw8mx e1lhpdsz1"/>
                    <div className="e1lhpdsz0 css-juhhnt eaz7a9d5">
                        <div className={`comment-feed__form__content__text eaz7a9d4 ${cmt_fr_cls}`}>
                            <div className="css-1ua7n09">
                                <input placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
                                       className="css-11bu34y" size="44" value={cmt_txt}
                                       onFocus={onFocus}
                                       onBlur={onBlur}
                                       onChange={(e) => {
                                           setCmt_txt(e.target.value);
                                       }}/>
                                {/*<a className="mention"*/}
                                {/*   href="/users/3879597">@영구르으</a>&nbsp;*/}

                                <div className="css-1n3lsph">
                                    <button type={"submit"} className={cmt_btn_cls}
                                            onClick={onCmtSubmit}
                                            disabled="">입력</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            }
            {currentPosts &&
                currentPosts.map((cdto, idx) => (
                    <div>
                        {/* 댓글 출력 부분 */}
                        {cdto.cmt_rl>0?
                            <div style={{marginLeft: "20px"}} class="css-f9yozn ewncmdz14">
                                <li className="css-1fzkxhd ec4queb0">
                                    <div className="css-ame6mi ewncmdz14">
                                        <div className="css-eayw7z ewncmdz13"><a onClick={()=>navi(`/profile/${cdto.ur_num}`)}>
                                            <img className="css-50jqym ewncmdz12" src={`${imgUrl}/prf_img/${cdto.prf_img}`}/>
                                            <span className="css-nltycz ewncmdz11">{cdto.prf_nick}</span></a></div>
                                        <div className={"input-group"}>
                                            <p className="ewncmdz7 css-ofv0mw eyi4x8z0">{cdto.cmt_txt}</p>
                                            <div className={"css-lw9a6t"}>
                                                <button type={'button'} onClick={(e) =>{
                                                    setReok(idx);
                                                    setCmtre_txt("@"+cdto.prf_nick+"  ");
                                                }} className={"css-lw9a6t"} style={{marginLeft:'10px'}}>답글달기</button>
                                                &nbsp;·&nbsp;{cdto.cmt_wdate}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                            :
                            <div>
                                <li className="css-1fzkxhd ec4queb0">
                                    <div className="css-ame6mi ewncmdz14">
                                        <div className="css-eayw7z ewncmdz13"><a onClick={()=>navi(`/profile/${cdto.ur_num}`)}>
                                            <img className="css-50jqym ewncmdz12" src={`${imgUrl}/prf_img/${cdto.prf_img}`}/>
                                            <span className="css-nltycz ewncmdz11">{cdto.prf_nick}</span></a></div>
                                        <div className={"input-group"}>
                                            <p className="ewncmdz7 css-ofv0mw eyi4x8z0">{cdto.cmt_txt}</p>
                                            <div className={"css-lw9a6t"}>
                                                <button type={'button'} onClick={(e) =>{
                                                    setReok(idx);
                                                    setCmtre_txt("@"+cdto.prf_nick+"  ");
                                                }} className={"css-lw9a6t"} style={{marginLeft:'10px'}}>답글달기</button>
                                                &nbsp;·&nbsp;{cdto.cmt_wdate}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        }

                        {ur_num &&
                            <div>
                                {/* 대댓글 입력 부분 */}
                                {reok == idx &&
                                        <form className="css-blglsf e1lhpdsz3" style={{marginLeft:'20px'}}
                                              onSubmit={(e)=>onCmtReSubmit(e,cdto.cmt_num,cdto.cmt_rg,cdto.cmt_rs,cdto.cmt_rl)}>
                                            <img src={`${imgUrl}/prf_img/${prf_img}`}
                                                 class="css-1iaw8mx e1lhpdsz1"/>
                                            <div className="e1lhpdsz0 css-juhhnt eaz7a9d5">
                                                <div className={`comment-feed__form__content__text eaz7a9d4 ${cmtre_fr_cls}`}>
                                                    <div className="css-1ua7n09">
                                                        <input placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
                                                               className="css-11bu34y" size="44" value={cmtre_txt}
                                                               onFocus={onRefocus}
                                                               onBlur={onReblur}
                                                               onChange={(e) => {
                                                                   setCmtre_txt(e.target.value);
                                                               }}/>
                                                            {/*<a className="mention"*/}
                                                            {/*   href="/users/3879597">@영구르으</a>&nbsp;*/}

                                                        <div className="css-1n3lsph">
                                                            <button type={"submit"} className={cmtre_btn_cls}
                                                                    onClick={()=>{onCmtReSubmit(cdto.cmt_num,cdto.cmt_rg,cdto.cmt_rs,cdto.cmt_rl)}}
                                                                    disabled="">입력</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                }
                            </div>
                        }
                    </div>))
            }
            { count>0 &&
                <div style={{marginTop: '60px',marginBottom:'100px'}}>
                    <Paging count={count} page={page} setPage={setPage}/>
                </div>
            }
        </div>
    )
}

export default FeedDetailCmt;