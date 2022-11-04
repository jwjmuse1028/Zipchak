import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MemberList(props) {
    const [memberlist,setMemberlist]=useState([]);

    localStorage.url="http://localhost:9005"

    const list=()=>{
        let listUrl=localStorage.url+"/member/list";
        axios.get(listUrl)
            .then(res=>{
                setMemberlist(res.data); //res.data는 list

            });
    }
    //처음 시작시 list() 함수 호출
    useEffect(()=>{
        list();
    },[]);

    const deleteMember=(num)=>{
        //console.log(num);
        let deleteUrl=localStorage.url+"/member/delete?num="+num;

        axios.delete(deleteUrl)
            .then((res)=>{
                list();
            });
    }

    return (
        <div>

            <h3 className='alert alert-info'>총 {memberlist.length}명의 회원이 있습니다</h3>
            <br/>
            <table className='table' style={{width:'500px'}}>
                <thead>
                <tr>
                    <th align='center' style={{width:'60px'}}>번호</th>
                    <th style={{width:'100px'}}>이름</th>
                    <th style={{width:'100px'}}>아이디</th>
                    <th style={{width:'150px'}}>가입일</th>
                    <th align='center' style={{width:'50px'}}>삭제</th>
                </tr>
                </thead>
                <tbody>
                {
                    memberlist.map((mem,idx)=>
                        <tr>
                            <td align='center'>{idx+1}</td>
                            <td>
                                <b style={{cursor:'pointer'}}>
                                    {mem.myname}
                                </b>
                            </td>
                            <td>
                                {mem.myid}
                            </td>
                            <td>{mem.gaipday}</td>
                            <td align='center'>
                            <span style={{color: 'gray', cursor:'pointer'}}
                                  onClick={()=>{
                                      let ans=window.confirm("삭제하려면 [확인]을 눌러주세요");
                                      if(ans){
                                          deleteMember(mem.num);
                                      }
                                  }}>
                            </span>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>

        </div>
    );
}

export default MemberList;