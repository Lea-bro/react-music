import React, { memo } from "react";

import { ThemeHeaderWrapper } from "./style";

export default memo(function HYThemeHeaderRcm(props) {
  const { title, keywords = [] } = props;

  return (
    <ThemeHeaderWrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <a href="/#">{item}</a>
                <span className="divider">|</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        <a href="todo">更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </ThemeHeaderWrapper>
  );
});
