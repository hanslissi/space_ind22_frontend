import React, { useState } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface FullscreenImageProps {
  image: IGatsbyImageData;
  alt: string;
}

const FullscreenImage: React.FC<FullscreenImageProps> = ({ image, alt }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
    <motion.div
      whileHover={{ scale: 1.01}}
      transition={{ duration: 0.4 }}
      className={clsx('cursor-pointer', {
        'fixed inset-0 z-50 bg-black flex items-center justify-center p-8': isFullscreen,
      })}
      onClick={handleImageClick}
    >
      <GatsbyImage
        image={image}
        alt={alt}
        className={clsx('w-full h-auto rounded-3xl', {
        'max-h-full max-w-full': isFullscreen,
        })}
        imgStyle={{ objectFit: 'contain' }}
      />
    </motion.div>
      {isFullscreen && (
        <button
          className="fixed top-4 right-4 z-50 text-white text-2xl"
          onClick={handleImageClick}
        >
          &times;
        </button>
      )}
    </>
  );
};

export default FullscreenImage;
