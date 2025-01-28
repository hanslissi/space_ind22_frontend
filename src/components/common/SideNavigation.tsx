import clsx from 'clsx';
import { motion } from 'framer-motion';
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
    <motion.nav 
    className="fixed top-0 md:h-screen md:w-fit h-fit w-full md:mt-0 mt-14 flex flex-col justify-center pointer-events-none z-50"
    initial={{ x: '-100%' }}
    animate={{ x: isActive ? 0 : '-100%' }}
    transition={{ 
      type: 'spring',
      stiffness: 200,
      damping: 30,
    }}
    >
      <div className="flex flex-row gap-4 text-2xl md:ml-14 ml-4">
        <div className="flex flex-col py-[0.6em] justify-between">
          <div className="w-1 h-1 rounded-full bg-white opacity-80" />
          {rulerIntermediatePoints}
          <div className="w-1 h-1 rounded-full bg-white opacity-80" />
          {rulerIntermediatePoints}
          <div className="w-1 h-1 rounded-full bg-white opacity-80" />
        </div>
        <div className="flex flex-col md:gap-6 gap-4 pointer-events-auto">
          {items.map((item, idx) => {
            return (
              <button
                key={'navLink' + idx}
                onClick={() => handleScrollToSection(item.majorSlug)}
                className={clsx('w-fit text-left transition-opacity duration-200 opacity-40 hover:opacity-90', {
                  'opacity-90': activeSectionHref === item.majorSlug,
                })}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default SideNavigation;
