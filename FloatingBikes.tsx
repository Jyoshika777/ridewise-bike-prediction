import { motion } from 'framer-motion';
import { Bike } from 'lucide-react';

export const FloatingBikes = () => {
  const bikes = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 4,
    duration: 20 + Math.random() * 10,
    y: 20 + Math.random() * 60,
    size: 24 + Math.random() * 24,
    opacity: 0.05 + Math.random() * 0.1,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bikes.map((bike) => (
        <motion.div
          key={bike.id}
          className="absolute"
          style={{ top: `${bike.y}%` }}
          initial={{ x: '-10%', opacity: 0 }}
          animate={{
            x: '110vw',
            opacity: [0, bike.opacity, bike.opacity, 0],
          }}
          transition={{
            duration: bike.duration,
            delay: bike.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Bike
            size={bike.size}
            className="text-neon-blue"
            style={{ opacity: bike.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
};
