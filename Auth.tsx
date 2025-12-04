import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Linkedin, Github, Mail, Bike, User, Lock, ArrowRight, AlertCircle, UserPlus, CheckCircle } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { ParticleBackground } from '@/components/layout/ParticleBackground';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Typewriter component
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-neon-blue">|</span>
    </span>
  );
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const triggerError = (message: string) => {
    setError(message);
    setShake(true);
    setPasswordError(true);
    setTimeout(() => {
      setShake(false);
      setPasswordError(false);
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (isLogin) {
      const result = login(identifier, password);
      if (result.success) {
        toast.success('Welcome back, Rider! 🚲');
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        triggerError(result.error || 'Invalid credentials');
      }
    } else {
      // Signup validation
      if (!fullName.trim()) {
        triggerError('Please enter your full name');
        setIsLoading(false);
        return;
      }
      if (!username.trim()) {
        triggerError('Please enter a username');
        setIsLoading(false);
        return;
      }
      if (username.length < 3) {
        triggerError('Username must be at least 3 characters');
        setIsLoading(false);
        return;
      }
      if (!email.trim()) {
        triggerError('Please enter your email');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        triggerError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        triggerError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      const result = signup(fullName, username, email, password);
      if (result.success) {
        setShowSuccess(true);
        toast.success('Account created successfully! 🎉');
        
        // Reset form and switch to login after showing success
        setTimeout(() => {
          setShowSuccess(false);
          setIsLogin(true);
          setFullName('');
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setIdentifier('');
        }, 2000);
      } else {
        triggerError(result.error || 'Signup failed');
      }
    }
    
    setIsLoading(false);
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jyoshika777', color: 'hover:text-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.5)]' },
    { icon: Github, href: 'https://github.com/Jyoshika777', color: 'hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' },
    { icon: Mail, href: 'mailto:jyoshikajyoshika3@gmail.com', color: 'hover:text-destructive hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]' },
  ];

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent" />
      
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-gradient-to-b from-neon-blue to-neon-green z-50 origin-top"
      />
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left - Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col items-center justify-center"
        >
          <Player
            autoplay
            loop
            src="https://assets5.lottiefiles.com/packages/lf20_uwWgICKCxj.json"
            style={{ height: '400px', width: '400px' }}
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display text-3xl font-bold text-center mt-4"
          >
            <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              <TypewriterText text="Welcome Rider 🚲" />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-center mt-2 max-w-md"
          >
            Join RideWise and experience the future of smart bike rentals
          </motion.p>
        </motion.div>

        {/* Right - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div animate={shake ? 'shake' : ''} variants={shakeVariants}>
            <GlassCard className="max-w-md mx-auto" hover={false}>
              {/* Success Popup */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm rounded-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-20 h-20 text-neon-green mb-4" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-center mb-2">Account Created!</h3>
                    <p className="text-muted-foreground text-center">Redirecting to login...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Logo */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="p-3 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-green/20 neon-border"
                >
                  <Bike className="w-8 h-8 text-neon-blue" />
                </motion.div>
                <span className="font-display text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                  RideWise
                </span>
              </div>

              {/* Toggle */}
              <div className="relative flex bg-muted/50 rounded-lg p-1 mb-8">
                <motion.div
                  className="absolute top-1 bottom-1 rounded-md bg-gradient-to-r from-neon-blue to-neon-green"
                  initial={false}
                  animate={{ x: isLogin ? 0 : '100%', width: '50%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
                <button
                  onClick={() => { setIsLogin(true); setError(null); }}
                  className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    isLogin ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={() => { setIsLogin(false); setError(null); }}
                  className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    !isLogin ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/50 flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  >
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <span className="text-sm text-destructive">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="signup-fields"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4"
                    >
                      {/* Full Name */}
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all placeholder:text-muted-foreground"
                        />
                      </div>

                      {/* Username */}
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">@</span>
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all placeholder:text-muted-foreground"
                        />
                      </div>

                      {/* Email for signup */}
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all placeholder:text-muted-foreground"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login: Email/Username field */}
                {isLogin && (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Email or Username"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                )}

                {/* Password */}
                <motion.div 
                  className="relative"
                  animate={passwordError ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full pl-10 pr-12 py-3 rounded-lg bg-muted/50 border outline-none transition-all placeholder:text-muted-foreground ${
                      passwordError 
                        ? 'border-destructive ring-2 ring-destructive/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                        : 'border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                    }`}
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotate: showPassword ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </motion.div>
                  </motion.button>
                </motion.div>

                {/* Confirm Password (signup only) */}
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="relative"
                    >
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 rounded-lg bg-muted/50 border outline-none transition-all placeholder:text-muted-foreground ${
                          passwordError && password !== confirmPassword
                            ? 'border-destructive ring-2 ring-destructive/20' 
                            : 'border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                        }`}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <NeonButton type="submit" className="w-full" pulse disabled={isLoading}>
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Bike className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        {isLogin ? 'Login' : 'Create Account'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </NeonButton>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg bg-muted/50 border border-border hover:border-neon-blue/50 transition-all ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Demo credentials hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-3 rounded-lg bg-neon-blue/5 border border-neon-blue/20 text-center"
              >
                <p className="text-xs text-muted-foreground">
                  Demo: <span className="text-neon-blue">jyoshika</span> or <span className="text-neon-blue">jyoshikajyoshika3@gmail.com</span> / <span className="text-neon-green">RideWise123</span>
                </p>
              </motion.div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
