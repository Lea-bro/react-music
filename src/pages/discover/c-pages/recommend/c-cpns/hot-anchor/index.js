import React, { memo } from 'react';

import {
    HotAnchor
} from './style';
import HYChild from './child';
import {hotRadios} from '@/common/local-data.js';

export default memo(function HYHotAnchor() {
    return (
        <HotAnchor>
            <div className="content">
                <div className="title">
                    <b>热门主播</b>
                </div>
                <div>
                    {
                        hotRadios.map((item,index) => {
                            return <HYChild imgUrl={item.picUrl} 
                                            name={item.name} 
                                            position={item.position}
                                            key={index}>
                                    </HYChild>
                        })
                    }
                </div>
            </div>
        </HotAnchor>
    )
})
