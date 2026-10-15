'use client';
import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Modal({ onClose, label, children }: { onClose: () => void; label: string; children: ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()} className="panel max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2rem] p-6 sm:p-7" initial={{ y: 60, scale: 0.94, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
