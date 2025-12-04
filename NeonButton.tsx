import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  pulse?: boolean;
}

export const NeonButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
  pulse = false,
}: NeonButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-green text-primary-foreground neon-glow-blue',
    secondary: 'bg-gradient-to-r from-neon-green to-neon-cyan text-primary-foreground neon-glow-green',
    outline: 'bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative font-display font-semibold rounded-lg transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-neon-blue/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        pulse && 'animate-glow-pulse',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-blue to-neon-green opacity-0"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};
