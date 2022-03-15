import React, { memo,useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';


import {
    SettleWrapper
} from './style';
import HyHotSing from './c-cpns/HotSinger/index';
import {getSingerAction} from '../../store/actionCreators';

export default memo(function HYSettleSinger() {
    const {settleSinger} = useSelector((state) =>{
        return{
            settleSinger:state.getIn(['recommend','settleSinger'])
        }
    },shallowEqual)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getSingerAction(5))
        
    },[dispatch])

    console.log(settleSinger)
    return (
        <SettleWrapper>
            <div className="content">
                <div className="topText">
                    <p><b>入驻歌手</b></p>
                    <a href="#s">查看全部 {`>`}</a>
                </div>
                <div className="center">
                    {
                        settleSinger.map((item) =>{
                            return <HyHotSing key={item.id} imgUrl={item.picUrl} imgText={item.name}></HyHotSing>
                        })
                    }
                    
                </div>
                <div className="bot sprite_button">
                    <a href="#s" className="bot-a sprite_button">申请成为网易音乐人</a>
                </div>
            </div>
        </SettleWrapper>
    )
})
