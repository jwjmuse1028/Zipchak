import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../css/FeedCmt.css";

function FeedDetailCmt({fd_num}) {

    const [cmtlist, setCmtlist] = useState([]);

    const [cmt_num, setCmt_num] = useState(0);
    const [cmt_txt, setCmt_txt] = useState('');
    const [cmt_rg, setCmt_rg] = useState(0);
    const [cmt_rs, setCmt_rs] = useState(0);
    const [cmt_rl, setCmt_rl] = useState(0);
    const [reok, setReok] = useState(-1);
    const [cmtre_txt, setCmtre_txt] = useState('');
    const [cmt_btn_cls,setCmt_btn_cls]=useState("css-17ydrlm");

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
                console.log("success");
                setCmtlist(res.data);
            })
    }
    useEffect(() => {
        getAllCmt();
    }, []);

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
    const onCmtReSubmit =(cmt_num,cmt_rg,cmt_rs,cmt_rl)=> {

        setCmt_num(cmt_num);
        setCmt_rg(cmt_rg);
        setCmt_rs(cmt_rs);
        setCmt_rl(cmt_rl);


        axios.post(cmtinsertUrl, {cmt_num, fd_num, ur_num, "cmt_txt":cmtre_txt, cmt_rg, cmt_rs, cmt_rl})
            .then(res => {
                alert("insert 성공");
                getAllCmt();
                //초기화
                setCmtre_txt('');
                setCmt_rg(0);
                setCmt_rs(0);
                setCmt_rl(0);
                }
            )



    }

    return (
        <div className={"cmt_container"}>
            {ur_num &&
                <form className="css-blglsf e1lhpdsz3"
                      onClick={(e)=>setCmt_btn_cls("css-fw3oix")}>
                    <img src={`${imgUrl}/prf_img/${prf_img}`}
                         style={{height: '40px', width: '40px', borderRadius: '100%'}}/>
                    <div className="e1lhpdsz0 css-juhhnt eaz7a9d5">
                        <div className="comment-feed__form__content__text eaz7a9d4 css-1hlhf3b">
                            <div className="css-1ua7n09">
                                <input placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
                                       className="css-11bu34y" size="44" value={cmt_txt}
                                       onChange={(e) => {
                                           setCmt_txt(e.target.value);
                                           setCmt_btn_cls("css-fw3oix");
                                       }}/>
                                {/*<a className="mention"*/}
                                {/*   href="/users/3879597">@영구르으</a>&nbsp;*/}

                                <div className="css-1n3lsph">
                                    <button type={"button"} className={cmt_btn_cls}
                                            onClick={onCmtSubmit}
                                            disabled="">입력</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            }
            {cmtlist &&
                cmtlist.map((cdto, idx) => (
                    <div>
                        {/* 댓글 출력 부분 */}
                        {cdto.cmt_rl>0?
                            <div style={{marginLeft: "20px"}}>
                                <div className={"input-group"}>
                                    <img src={`${imgUrl}/prf_img/${cdto.prf_img}`}
                                         style={{height: '30px', width: '30px', borderRadius: '100%'}}/>
                                    <span>{cdto.prf_nick}</span>
                                </div>
                                <div>{cdto.cmt_txt}</div>
                            </div>
                            :
                            <div>
                                <div className={"input-group"}>
                                    <img src={`${imgUrl}/prf_img/${cdto.prf_img}`}
                                         style={{height: '30px', width: '30px', borderRadius: '100%'}}/>
                                    <span>{cdto.prf_nick}</span>
                                </div>
                                <div>{cdto.cmt_txt}</div>
                            </div>
                        }
                        {ur_num &&
                            <div>
                                {/* 대댓글 입력 부분 */}
                                <button type={'button'} onClick={(e) =>{
                                    setReok(idx);
                                    setCmtre_txt("@"+cdto.prf_nick+"  ");
                                }} className={"css-17ydrlm"}>답글달기</button>
                                {reok == idx &&
                                        <form className="css-blglsf e1lhpdsz3" style={{marginLeft:'20px'}}
                                              onClick={(e)=>setCmt_btn_cls("css-fw3oix")}>
                                            <img src={`${imgUrl}/prf_img/${prf_img}`}
                                                 style={{height: '40px', width: '40px', borderRadius: '100%'}}/>
                                            <div className="e1lhpdsz0 css-juhhnt eaz7a9d5">
                                                <div className="comment-feed__form__content__text eaz7a9d4 css-1hlhf3b">
                                                    <div className="css-1ua7n09">
                                                        <input placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
                                                             className="css-11bu34y" size="44" value={cmtre_txt}
                                                               onChange={(e) => {
                                                                   setCmtre_txt(e.target.value);
                                                                   setCmt_btn_cls("css-fw3oix");
                                                               }}/>
                                                            {/*<a className="mention"*/}
                                                            {/*   href="/users/3879597">@영구르으</a>&nbsp;*/}

                                                        <div className="css-1n3lsph">
                                                            <button type={"button"} className={cmt_btn_cls}
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

        </div>
    )
}

export default FeedDetailCmt;