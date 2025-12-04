import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'green' | 'cyan';
  hover?: boolean;
}

export const GlassCard = ({
  children,
  className,
  glowColor = 'blue',
  hover = true,
  ...props
}: GlassCardProps) => {
  const glowClasses = {
    blue: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]',
    green: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]',
    cyan: 'hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'glass-card p-6 transition-all duration-300',
        hover && glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
