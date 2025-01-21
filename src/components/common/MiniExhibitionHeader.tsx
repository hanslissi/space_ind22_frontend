import clsx from "clsx";
import React from "react";

interface MiniExhibitionHeaderProps {
  fixed?: boolean;
}

const MiniExhibitionHeader = ({ fixed = false }: MiniExhibitionHeaderProps) => {
  return (
    <div
      className={clsx("w-full flex flex-row justify-between p-4 uppercase z-50", {
        fixed: fixed,
      })}
    >
      <a href="/">space</a>
      <span>30.01 - 01.02.2025</span>
      <a href="/">exhibition</a>
    </div>
  );
};

export default MiniExhibitionHeader;
