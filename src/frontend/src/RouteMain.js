import React from 'react';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";

import ShopList from "./shop/ShopList";
import LoginForm from "./user/LoginForm";
import RegisterForm from "./user/RegisterForm";

import ChatRoomList from "./chat/ChatRoomList";
import Chat from "./chat/Chat";

import FeedInsertForm from "./feed/FeedInsertForm";
import FeedList from "./feed/FeedList";
import ShopInsertForm from "./shop/ShopInsertForm";
import ShopUpdateForm from "./shop/ShopUpdateForm";
import ShopDetail from "./shop/ShopDetail";
import FeedDetailView from "./feed/FeedDetailView";
import MyPage from "./user/MyPage";
import Profile from "./user/Profile";
import Footer from "./components/Footer";
import FeedUpdateForm from "./feed/FeedUpdateForm";
import SearchList from "./components/SearchList";


function RouteMain(props) {
    return (
        <div>
            {/* 항상 나오게 할 컴포넌트는 Routes 밖에 넣는다 */}
            <Header/>
            <br style={{clear:'both'}}/><br/><br/><br/><br/><br/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path={'/register'} element={<RegisterForm/>}/>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/profile/:user'} element={<Profile/>}/>
                <Route path={'/mypage/:show'} element={<MyPage/>}/>
                {/*<Route path='/login' element={<LoginForm/>}/>*/}

                <Route path='/shop'>
                    <Route path='list' element={<ShopList/>}/>
                    <Route path='list/:currentPage' element={<ShopList/>}/>
                    <Route path='insert' element={<ShopInsertForm/>}/>
                    <Route path='update/:pd_num/:sp_num/:currentPage' element={<ShopUpdateForm/>}/>
                    <Route path='detail/:pd_num/:sp_num/:currentPage' element={<ShopDetail/>}/>
                </Route>

                <Route path='/chat'>
                    <Route path=':roomno' element={<Chat/>}/>
                    <Route path='list/' element={<ChatRoomList/>}/>
                </Route>
                {/*<Route path='/board'>*/}
                {/*    <Route path='form' element={<BoardForm/>}/>*/}
                {/*    <Route path='list' element={<BoardList/>}/>*/}
                {/*    <Route path='list/:currentPage' element={<BoardList/>}/>*/}
                {/*</Route>*/}
                <Route path='/feed'>
                    <Route path='insertform' element={<FeedInsertForm/>}/>
                    <Route path='list' element={<FeedList/>}/>
                    <Route path='detail/:fd_num' element={<FeedDetailView/>}/>
                    <Route path='update/:fd_num' element={<FeedUpdateForm/>}/>
                </Route>
                <Route path='/search' element={<SearchList/>}/>

                {/* 지정된 주소 외 주소는 잘못된 url주소라고 출력 */}
                <Route path='*' element={
                    <div>
                        <h1>잘못된 URL 주소입니다</h1>
                    </div>
                }/>
            </Routes><br/><br/><br/>
            <Footer/>
        </div>
    );
}

export default RouteMain;