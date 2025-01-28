import clsx from "clsx";
import React from "react";

interface MiniExhibitionHeaderProps {
  fixed?: boolean;
  className?: string;
}

const MiniExhibitionHeader = ({ fixed = false, className }: MiniExhibitionHeaderProps) => {
  return (
    <div
      className={clsx("w-full flex flex-row justify-between p-4 uppercase z-50", {
        "fixed": fixed,
      }, className)}
    >
      <a href="/">space</a>
      <span>30.01 - 01.02.2025</span>
      <a href="/">exhibition</a>
    </div>
  );
};

export default MiniExhibitionHeader;
