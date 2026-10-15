'use client';
import { AnimatePresence, motion } from 'framer-motion';

export default function Bounce({ value, className = '' }: { value: number | string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: -14, scale: 1.6, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 14, opacity: 0 }} transition={{ type: 'spring', stiffness: 520, damping: 14 }}>
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
