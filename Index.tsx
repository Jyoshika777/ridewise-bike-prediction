import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bike, TrendingUp, Map, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import CountUp from 'react-countup';
import { Player } from '@lottiefiles/react-lottie-player';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';

const features = [
  {
    icon: TrendingUp,
    title: 'AI Predictions',
    description: 'Accurate bike rental demand forecasting powered by machine learning',
    link: '/dashboard',
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    icon: Map,
    title: 'Live Map',
    description: 'Real-time station locations and bike availability tracking',
    link: '/map',
    color: 'from-neon-green to-emerald-500',
  },
  {
    icon: Calendar,
    title: 'Easy Booking',
    description: 'Reserve your perfect ride in just a few clicks',
    link: '/reservations',
    color: 'from-neon-cyan to-neon-blue',
  },
];

const stats = [
  { value: 3292679, label: 'Total Rides' },
  { value: 45892, label: 'Happy Riders' },
  { value: 24, label: 'Stations' },
  { value: 94, label: 'Accuracy %' },
];

export default function Index() {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              >
                <Sparkles className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-medium">AI-Powered Smart Mobility</span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-green bg-clip-text text-transparent">
                  RideWise
                </span>
                <br />
                <span className="text-foreground">Smart Bike</span>
                <br />
                <span className="text-foreground">Rental System</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Experience the future of urban mobility with AI-powered predictions, real-time tracking, and seamless bookings.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <NeonButton size="lg" pulse>
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </NeonButton>
                </Link>
                <Link to="/about">
                  <NeonButton variant="outline" size="lg">
                    Learn More
                  </NeonButton>
                </Link>
              </div>
            </motion.div>

            {/* Right - Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-neon-blue/30 via-neon-green/10 to-transparent blur-3xl" />
                
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/2bf43c35-3687-4c6b-b72c-3ad50f4a3d4a/FHqUJd4tq2.json"
                    style={{ height: '450px', width: '450px' }}
                  />
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-10 right-10 p-4 glass-card rounded-xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <TrendingUp className="w-8 h-8 text-neon-green" />
                </motion.div>
                <motion.div
                  className="absolute bottom-20 left-0 p-4 glass-card rounded-xl"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Bike className="w-8 h-8 text-neon-blue" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12"
        >
          <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" hover={false}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                  <CountUp end={stat.value} duration={2.5} separator="," />
                </div>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </GlassCard>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need for smarter bike rental management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={feature.link}>
                  <GlassCard className="h-full group">
                    <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <span className="text-neon-blue font-medium flex items-center gap-1 group-hover:gap-3 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <GlassCard className="text-center py-12 relative overflow-hidden" hover={false}>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-neon-green/5 to-neon-cyan/10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Ride Smart?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands of riders using AI-powered predictions for a better commute
              </p>
              <Link to="/auth">
                <NeonButton size="lg" pulse>
                  <span className="flex items-center gap-2">
                    <Bike className="w-5 h-5" />
                    Start Your Journey
                  </span>
                </NeonButton>
              </Link>
            </div>
          </GlassCard>
        </motion.section>
      </div>
    </Layout>
  );
}
