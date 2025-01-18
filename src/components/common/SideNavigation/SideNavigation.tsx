import React from "react";

export type SideNavItem = {
  title: string;
  href: string;
};

interface SideNavigationProps {
  items: SideNavItem[];
}

const SideNavigation = ({ items }: SideNavigationProps) => {
  const rulerIntermediatePoints = Array.from({ length: 5 }, (_, i) => (
    <div key={i} className="w-1 h-1 rounded-full bg-white opacity-30" />
  ));

  return (
    <nav className="sticky top-0 h-[100vh] w-fit flex flex-col justify-center">
      <div className="flex flex-row gap-3 text-2xl ml-14">
        <div className="flex flex-col py-[0.6em] justify-between">
          <div className="w-1 h-1 rounded-full bg-white opacity-80" />
          {rulerIntermediatePoints}
          <div className="w-1 h-1 rounded-full bg-white opacity-80" />
          {rulerIntermediatePoints}
          <div className="w-1 h-1 rounded-full bg-white opacity-80" />
        </div>
        <div className="flex flex-col gap-6">
          {items.map((item, idx) => {
            return (
              <a
                key={"navLink" + idx}
                href={item.href}
                className="opacity-40 hover:opacity-90"
              >
                {item.title}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
