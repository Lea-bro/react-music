import React, { memo } from "react";

import { SongsCoverWrapper } from "./style";

import {getCount,getSizeImage} from '@/utils/format-utils';

export default memo(function HYSongsCover(props) {
  const { item } = props;
  return (
    <SongsCoverWrapper>
      <div className="cover-top">
        <img src={getSizeImage(item.picUrl,140)} alt="" />
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon erji"></i>
              {getCount(item.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{item.name}</div>
      <div className="cover-source text-nowrap">
        by {item.copywriter || "热门推荐"}
      </div>
    </SongsCoverWrapper>
  );
});
