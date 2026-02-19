import React from "react";

export default function LeftFazerLoader() {
  return (
    <div className="left-fazer" aria-hidden="true">
      <div className="loader-wrap">
        <div className="loader">
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>

          <div className="base">
            <span />
            <div className="face" />
          </div>
        </div>

        <div className="longfazers">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
