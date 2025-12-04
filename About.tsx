import { motion } from 'framer-motion';
import { Bike, Code, Brain, Leaf, Users, Globe, Linkedin, Github, Mail, Zap, Target, Heart } from 'lucide-react';
import CountUp from 'react-countup';
import { Player } from '@lottiefiles/react-lottie-player';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Python', icon: '🐍' },
  { name: 'TensorFlow', icon: '🧠' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Framer Motion', icon: '✨' },
];

const timeline = [
  { year: '2023', title: 'Project Inception', description: 'RideWise concept was born as a ML project' },
  { year: '2023', title: 'Model Development', description: 'Built and trained bike rental prediction models' },
  { year: '2024', title: 'Web Platform', description: 'Developed the futuristic web interface' },
  { year: '2024', title: 'Launch', description: 'RideWise goes live with full features' },
];

const whyRideWise = [
  { icon: Brain, title: 'AI-Powered', description: 'Smart predictions using machine learning' },
  { icon: Leaf, title: 'Eco-Friendly', description: 'Promoting sustainable urban mobility' },
  { icon: Target, title: 'Accurate', description: 'High precision rental demand forecasting' },
  { icon: Zap, title: 'Real-Time', description: 'Live data updates and analytics' },
];

const impactStats = [
  { label: 'Predictions Made', value: 150000 },
  { label: 'Active Users', value: 5200 },
  { label: 'Accuracy Rate', value: 94, suffix: '%' },
  { label: 'Cities Covered', value: 12 },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          {/* Floating Bikes Background */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${20 + i * 10}%`,
                }}
              >
                <Bike className="w-12 h-12 text-neon-blue/20" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-green/20 flex items-center justify-center neon-border"
          >
            <Bike className="w-12 h-12 text-neon-blue" />
          </motion.div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-green bg-clip-text text-transparent">
              About RideWise
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing urban mobility with AI-powered bike rental predictions
          </p>
        </motion.div>

        {/* Project Story - Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="font-display font-bold text-neon-blue">{item.year}</span>
                </div>
                <div className="relative">
                  <div className="absolute top-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-green" />
                  <div className="absolute top-6 -left-0.5 w-1 h-full bg-gradient-to-b from-neon-blue/50 to-transparent" />
                </div>
                <GlassCard className="flex-1">
                  <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <GlassCard className="text-center py-6">
                  <span className="text-4xl mb-2 block">{tech.icon}</span>
                  <span className="font-medium text-sm">{tech.name}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Developer Profile */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard className="max-w-2xl mx-auto text-center relative overflow-visible" hover={false}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue to-neon-green p-1 neon-glow-blue">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <Code className="w-10 h-10 text-neon-blue" />
                </div>
              </div>
            </motion.div>
            
            <div className="pt-16">
              <h3 className="font-display text-2xl font-bold mb-1">Jyoshika Irlapati</h3>
              <p className="text-muted-foreground mb-4">CSE Student | Frontend Developer | AI/ML Enthusiast</p>
              
              <div className="flex justify-center gap-4 mb-6">
                <motion.a
                  href="https://www.linkedin.com/in/jyoshika777"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="p-3 rounded-lg glass-card hover:neon-glow-blue"
                >
                  <Linkedin className="w-5 h-5 text-neon-blue" />
                </motion.a>
                <motion.a
                  href="https://github.com/Jyoshika777"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="p-3 rounded-lg glass-card hover:neon-glow-green"
                >
                  <Github className="w-5 h-5 text-neon-green" />
                </motion.a>
                <motion.a
                  href="mailto:jyoshikajyoshika3@gmail.com"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="p-3 rounded-lg glass-card hover:neon-glow-cyan"
                >
                  <Mail className="w-5 h-5 text-neon-cyan" />
                </motion.a>
              </div>
              
              <p className="text-muted-foreground text-sm">
                Passionate about building innovative solutions at the intersection of web development and machine learning.
              </p>
            </div>
          </GlassCard>
        </motion.section>

        {/* Why RideWise */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              Why RideWise?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyRideWise.map((item, i) => (
              <motion.div key={item.title} variants={itemVariants}>
                <GlassCard className="text-center h-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-green/20 flex items-center justify-center"
                  >
                    <item.icon className="w-7 h-7 text-neon-blue" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Impact Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard hover={false}>
            <h2 className="font-display text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                Our Impact
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                    <CountUp end={stat.value} duration={2.5} separator="," />
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.section>
      </div>
    </Layout>
  );
}
