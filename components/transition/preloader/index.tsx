'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dot } from 'lucide-react';

import { preloaderWords } from '@/data/preloader-words';
import { useDimensions, useTimeOut } from '@/hooks';
import { fade, slideUp } from './variants';

const MotionComponent = motion.div;

export function Preloader() {
  const [index, setIndex] = useState(0);
  const { width, height } = useDimensions();

  useTimeOut({
    callback: () => {
      setIndex(prevIndex => prevIndex + 1);
    },
    duration: index === 0 ? 500 : 250,
    deps: [index],
  });

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${
    height + 300
  } 0 ${height}  L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${
    width / 2
  } ${height} 0 ${height}  L0 0`;

  /** @type {import('framer-motion').Variants} */
  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  return (
    <MotionComponent
      className='fixed z-50 h-screen w-screen cursor-wait bg-black flex items-center justify-center'
      variants={slideUp}
      initial='initial'
      exit='exit'
    >
      {width > 0 ? (
        <>
          <MotionComponent
            className='text-3xl text-white md:text-4xl flex items-center'
            variants={fade}
            initial='initial'
            animate='enter'
          >
            <Dot size={48} className='mr-3' />
            <p>{preloaderWords[index] || preloaderWords[0]}</p>
          </MotionComponent>
          <motion.svg className='absolute top-0 -z-10 h-[calc(100%+300px)] w-full'>
            <motion.path
              className='fill-black'
              variants={curve}
              initial='initial'
              exit='exit'
            />
          </motion.svg>
        </>
      ) : null}
    </MotionComponent>
  );
}
