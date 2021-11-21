/* eslint-disable no-sequences */
import React, { memo, useEffect } from 'react';
import {useDispatch ,useSelector,shallowEqual} from 'react-redux';

import reducer from '../../store/redux';
import {getHotRecommentAction} from '../../store/actionCreators';

import {
    RecommendWrapper
} from './style';

import HYThemeHeaderRcm from '@/components/theme-header-rcm';
import HYSongsCover from '@/components/songs-cover'

// import {getHotRecommend} from '@/service/recommend'

export default memo(function HYHotRecommend(porps) {

    const dispatch = useDispatch(reducer)

    const {hotRecommends} = useSelector((state)=>{
        // console.log(state)
        return{
            hotRecommends:state.getIn(["recommend","hotRecommends"])
            // hotRecommends:state.get("recommend").get("hotRecommends")
        }
    },shallowEqual)
    // console.log(hotRecommends)

    useEffect(()=>{
        dispatch(getHotRecommentAction(8))
        // dispatch((dispatch)=>{
        //     getHotRecommend(8).then(res => {
        //         console.log(res)
        //         dispatch({
        //             type:"recommend/GET_HOT_RECOMMEND",
        //             hotRecommends:res.result
        //         })
        //     })
        // })
    },[dispatch])

    return (
        <RecommendWrapper>
            <HYThemeHeaderRcm title="热门推荐" keywords={['华语','流行','摇滚','民谣','电子']} />
            <div className="hotContent">
                {
                    hotRecommends.map((item,index) => {
                        return <HYSongsCover item={item} key={item.id}></HYSongsCover>
                    })
                }
            </div>
        </RecommendWrapper>
    )
})
