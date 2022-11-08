import React from 'react';
import Menu from "./components/Menu";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import MemberList from "./member/MemberList";

import MarketList from "./market/MarketList";
import LoginForm from "./member/LoginForm";
import RegisterForm from "./member/RegisterForm";

import ChatRoomList from "./chat/ChatRoomList";
import ChatMessage from "./chat/ChatMessage";
import Chat from "./chat/Chat";

import FeedInsertForm from "./feed/FeedInsertForm";
import FeedList from "./feed/FeedList";



function RouteMain(props) {
    return (
        <div>
            {/* 항상 나오게 할 컴포넌트는 Routes 밖에 넣는다 */}
            <Menu/>
            <br style={{clear:'both'}}/><br/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path={'/register'} element={<RegisterForm/>}/>
                <Route path={'/login'} element={<LoginForm/>}/>
                {/*<Route path='/login' element={<LoginForm/>}/>*/}
                <Route path='/member'>
                    {/*<Route path='form' element={<MemberForm/>}/>*/}
                    <Route path='list' element={<MemberList/>}/>
                </Route>

                <Route path='/market'>
                    <Route path='list' element={<MarketList/>}/>

                <Route path='/chat' element={<Chat/>}>
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
                    {/*<Route path='list/:currentPage' element={<BoardList/>}/>*/}
                </Route>
                {/* 지정된 주소 외 주소는 잘못된 url주소라고 출력 */}
                <Route path='*' element={
                    <div>
                        <h1>잘못된 URL 주소입니다</h1>
                        {/*<br/>*/}
                        {/*<img alt='' src={img1} width='400'/>*/}
                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default RouteMain;