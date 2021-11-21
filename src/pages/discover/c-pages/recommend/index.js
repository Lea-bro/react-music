import React, { memo } from 'react'; 

import HYTopBanner from './c-cpns/top-banner';
import HYHotRecommend from './c-cpns/hot-recommend';
import HYNewAlbum from './c-cpns/new-album';
import HYRecommendRanking from './c-cpns/recommend-ranking';

import HYUserLogin from './c-cpns/user-login';
import HYSettleSinger from './c-cpns/settle-singer';
import HYHotAnchor from './c-cpns/hot-anchor'; 
import {
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight
} from './style';

function HYRecommend(props) {
   

    return (
        <RecommendWrapper>
            <HYTopBanner></HYTopBanner>
            <Content className="wrap-v2">
                <RecommendLeft>
                    <HYHotRecommend></HYHotRecommend>
                    <HYNewAlbum></HYNewAlbum>
                    <HYRecommendRanking></HYRecommendRanking>
                </RecommendLeft>
                <RecommendRight>
                    <HYUserLogin></HYUserLogin>
                    <HYSettleSinger></HYSettleSinger>
                    <HYHotAnchor></HYHotAnchor>
                </RecommendRight>
            </Content>
        </RecommendWrapper>
    )
}


export default memo(HYRecommend)