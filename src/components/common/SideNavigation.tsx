import clsx from 'clsx';
import React from 'react';

export type SideNavItem = {
  title: string;
  majorSlug: string;
};

interface SideNavigationProps {
  items: SideNavItem[];
  activeSectionHref: string;
}

const SideNavigation = ({ items, activeSectionHref }: SideNavigationProps) => {
  const isActive = items.findIndex((item) => item.majorSlug === activeSectionHref) !== -1;

  const rulerIntermediatePoints = Array.from({ length: 5 }, (_, i) => (
    <div key={i} className="w-1 h-1 rounded-full bg-white opacity-30" />
  ));

  const handleScrollToSection = (id: string) => {
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="fixed top-0 h-[100vh] w-fit flex flex-col justify-center z-50">
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
              <button
                key={'navLink' + idx}
                onClick={() => handleScrollToSection(item.majorSlug)}
                className={clsx('w-fit text-left opacity-40 hover:opacity-90', {
                  'opacity-90': activeSectionHref === item.majorSlug,
                })}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
