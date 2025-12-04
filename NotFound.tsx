import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Bike } from "lucide-react";
import { ParticleBackground } from "@/components/layout/ParticleBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10"
      >
        <GlassCard className="text-center max-w-md mx-4" hover={false}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-green/20 flex items-center justify-center"
          >
            <Bike className="w-10 h-10 text-neon-blue" />
          </motion.div>
          
          <h1 className="font-display text-7xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent mb-4">
            404
          </h1>
          <p className="text-xl font-display font-semibold mb-2">Lost Your Way?</p>
          <p className="text-muted-foreground mb-8">
            Looks like this route doesn't exist. Let's get you back on track!
          </p>
          
          <Link to="/">
            <NeonButton>
              <span className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </span>
            </NeonButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default NotFound;
