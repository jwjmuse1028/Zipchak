import React from 'react';
import "../css/FeedForm.css";
import {ArrowDropDown} from "@material-ui/icons";

function FeedInsertForm(props) {
    return (
        <div className={"form_container"}>
            <h1>FeedInsertForm</h1>
            <div className="form_row">
                <div className="form_row_title">주거형태<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                </div>
                <div style={{width: '220px', marginRight:'80px'}}>
                    <select name="metadata.workType" className="form-select">
                        <option value="" selected disabled></option>
                        <option value="0">홈스타일링</option>
                        <option value="1">리모델링</option>
                        <option value="2">부분시공</option>
                        <option value="3">건축</option>
                    </select>
                </div>
                <div className="form_row_title">평수<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                </div>
                <div style={{width: '130px'}}>
                    <input type={'text'} className={"form-control"}/>
                </div>
            </div>
            <div className="form_row">
                <div className="form_row_title">가족형태<span style={{color:'rgb(255, 119, 119)'}}>*</span></div>
                <div style={{width: '220px',display: 'block', marginRight:'80px'}}>
                    {/* 필수 입력항목 입력 안했을 시 에러 */}
                    <select name="metadata.family.type" className="form-select empty error">
                        <option value="" selected disabled></option>
                        <option value="0">싱글라이프</option>
                        <option value="1">신혼/부부가 사는집</option>
                        <option value="2">자녀가 있는 집</option>
                        <option value="3">부모님과 함께 사는 집</option>
                        <option value="4">룸메이트와 함께 사는 집</option>
                        <option value="5">기타</option>
                    </select>
                    <div className="form_empty_msg">필수 입력 항목입니다.</div>
                </div>
                <div className="form_row_title">반려동물<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                </div>
                <div style={{width: '130px'}}>
                    <select name="metadata.workType" className="form-select">
                        <option value="" selected disabled></option>
                        <option value="없음">없음</option>
                        <option value="강아지">강아지</option>
                        <option value="고양이">고양이</option>
                        <option value="어류">어류</option>
                        <option value="조류">조류</option>
                        <option value="파충류">파충류</option>
                        <option value="기타">기타</option>
                    </select>
                </div>
            </div>
            <div className="form_row">
                <div className="form_row_title">스타일<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                </div>
                <div style={{width: '220px'}}>
                    <select name="metadata.workType" className="form-select">
                        <option value="" selected disabled></option>
                        <option value="없음">모던</option>
                        <option value="강아지">미니멀&심플</option>
                        <option value="고양이">내추럴</option>
                        <option value="북유럽">북유럽</option>
                        <option value="빈티지&레트로">빈티지&레트로</option>
                        <option value="클래식&앤틱">클래식&앤틱</option>
                        <option value="러블리&로맨틱">러블리&로맨틱</option>
                        <option value="한국&아시아">한국&아시아</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FeedInsertForm;