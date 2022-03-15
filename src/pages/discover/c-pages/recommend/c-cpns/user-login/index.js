import React, { memo } from 'react'

import {
    UserLoginWarpper
} from './style';

export default memo(function HYUserLogin() {
    return (
        <UserLoginWarpper className="sprite_02">
            
            <p className="text">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            
            <a href="#a" className="sprite_02 userlogin">用户登录</a>
        </UserLoginWarpper>
    )
})
