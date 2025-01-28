import clsx from "clsx";
import React from "react";

interface CopyrightFooterProps {
  fixed?: boolean;
  className?: string;
}

const CopyrightFooter = ({ fixed = false, className }: CopyrightFooterProps) => {
  return (
    <div
      className={clsx("w-full flex flex-row justify-center p-2 opacity-20 text-sm", {
        "fixed": fixed,
      }, className)}
    >
      <span>© FH Joanneum</span>
    </div>
  );
};

export default CopyrightFooter;
