import React, {useEffect, useState} from 'react';
import axios from "axios";

function FeedDetailCmt({fd_num}) {

    const [cmtlist, setCmtlist] = useState([]);

    const [cmt_num, setCmt_num] = useState(0);
    const [cmt_txt, setCmt_txt] = useState('');
    const [cmt_rg, setCmt_rg] = useState(0);
    const [cmt_rs, setCmt_rs] = useState(0);
    const [cmt_rl, setCmt_rl] = useState(0);
    const [reok, setReok] = useState(-1);

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
        setCmt_num(0);
        setCmt_rg(0);
        setCmt_rs(0);
        setCmt_rl(0);

        axios.post(cmtinsertUrl, {cmt_num, fd_num, ur_num, cmt_txt, cmt_rg, cmt_rs, cmt_rl})
            .then(res => {
                    alert("insert 성공");
                    getAllCmt();
                }
            )
        setCmt_txt('');

    }
    const onCmtReSubmit =(cmt_num,cmt_rg,cmt_rs,cmt_rl)=> {

        setCmt_num(cmt_num);
        setCmt_rg(cmt_rg);
        setCmt_rs(cmt_rs);
        setCmt_rl(cmt_rl);
        console.log(cmt_num);
        console.log(cmt_rg);
        console.log(cmt_rs);
        console.log(cmt_rl);

        axios.post(cmtinsertUrl, {cmt_num, fd_num, ur_num, cmt_txt, cmt_rg, cmt_rs, cmt_rl})
            .then(res => {
                    alert("insert 성공");
                    getAllCmt();
                }
            )

        //초기화
        setCmt_txt('');
        setCmt_rg(0);
        setCmt_rs(0);
        setCmt_rl(0);

    }

    return (
        <div>
            {ur_num &&
                <div className={"input-group"}>
                    <img src={`${imgUrl}/prf_img/${prf_img}`}
                         style={{height: '30px', width: '30px', borderRadius: '100%'}}/>
                    <span>{prf_nick}</span>
                    <form onSubmit={onCmtSubmit}>
                        <input type={'text'} className={'form-control'}
                               style={{height: '30px', fontSize: '15px'}}
                               placeholder={'내용을 입력하세요.'} name={"cmt_txt"} required
                               onChange={(e) => setCmt_txt(e.target.value)}/>
                        <button type={"submit"}>댓글저장</button>
                    </form>
                </div>
            }
            {cmtlist &&
                cmtlist.map((cdto, idx) => (
                    <div>
                        <div className={"input-group"}>
                            <img src={`${imgUrl}/prf_img/${cdto.prf_img}`}
                                 style={{height: '30px', width: '30px', borderRadius: '100%'}}/>
                            <span>{cdto.prf_nick}</span>
                        </div>
                        <div>{cdto.cmt_txt}</div>
                        {ur_num &&
                            <div>
                                <button type={'button'} onClick={(e) =>setReok(idx)}>답글달기</button>
                                {reok == idx &&
                                    <div className={"input-group"}>
                                        <img src={`${imgUrl}/prf_img/${prf_img}`}
                                             style={{height: '30px', width: '30px', borderRadius: '100%'}}/>
                                        <span>{prf_nick}</span>
                                        <form>
                                            <input type={'text'} className={'form-control'}
                                                   style={{height: '30px', fontSize: '15px'}}
                                                   placeholder={'내용을 입력하세요.'} name={"cmt_txt"} required
                                                   onChange={(e) => setCmt_txt(e.target.value)}/>
                                            <button type={"button"} onClick={()=>{onCmtReSubmit(cdto.cmt_num,cdto.cmt_rg,cdto.cmt_rs,cdto.cmt_rl)}}>저장</button>
                                        </form>
                                    </div>
                                }
                            </div>
                        }
                    </div>))
            }

        </div>
    )
}

export default FeedDetailCmt;