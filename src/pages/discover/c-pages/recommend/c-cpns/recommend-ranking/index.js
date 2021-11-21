import React, { memo,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getTopListAction} from '../../store/actionCreators';

import {
    RecommendRankingWrapper
} from './style';

import HYThemeHeaderRcm from '@/components/theme-header-rcm';
import HYTopRanking from '@/components/top-ranking';

export default memo(function HYRecommendRanking() {
    const {upRankings,newRankings,originRankings} = useSelector((state) => {
        return{
            upRankings:state.getIn(['recommend','upRankings']),
            newRankings:state.getIn(['recommend','newRankings']),
            originRankings:state.getIn(['recommend','originRankings'])
        }
    })
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getTopListAction(2884035));
       dispatch(getTopListAction(19723756));
       dispatch(getTopListAction(3779629));
    }, [dispatch])
 
    return (
        <RecommendRankingWrapper>
            <HYThemeHeaderRcm title="榜单"></HYThemeHeaderRcm>
            <div className="tops">
                <HYTopRanking info={upRankings}></HYTopRanking>
                <HYTopRanking info={newRankings}></HYTopRanking>
                <HYTopRanking info={originRankings}></HYTopRanking>
            </div>
        </RecommendRankingWrapper>
    )
})
