import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Menu, X, Sun, Moon, User, LogOut, ChevronDown, UserCircle } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/insights', label: 'Insights' },
  { path: '/map', label: 'Map' },
  { path: '/reservations', label: 'Reservations' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    toast.success('Logged out successfully! 👋', {
      style: {
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--muted)))',
        border: '1px solid hsl(var(--neon-green) / 0.5)',
        color: 'hsl(var(--foreground))',
        boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
      },
    });
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card mx-4 mt-4 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-green/20 neon-border"
            >
              <Bike className="w-6 h-6 text-neon-blue" />
            </motion.div>
            <span className="font-display text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              RideWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-lg bg-neon-blue/10 neon-border"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 ${
                  location.pathname === item.path 
                    ? 'text-neon-blue' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="w-5 h-5 text-neon-blue" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="w-5 h-5 text-neon-blue" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Profile / Login */}
            {isAuthenticated && user ? (
              <div ref={profileRef} className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-green/20 border-2 border-neon-blue/40 hover:border-neon-blue/70 transition-all shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-neon-blue to-neon-green flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{user.username}</span>
                  <motion.div
                    animate={{ rotate: showProfileMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-neon-blue" />
                  </motion.div>
                </motion.button>

                {/* Enhanced Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden border-2 border-neon-blue/30 bg-card/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,212,255,0.2)]"
                    >
                      {/* User Info Header */}
                      <div className="p-5 bg-gradient-to-br from-neon-blue/10 to-neon-green/10 border-b border-border/50">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-blue to-neon-green flex items-center justify-center shadow-lg">
                            <User className="w-7 h-7 text-primary-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Logged in as</p>
                            <p className="font-display font-bold text-lg text-foreground truncate">{user.username}</p>
                            <p className="text-sm text-neon-blue truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-3 space-y-1">
                        <motion.button
                          whileHover={{ x: 5, backgroundColor: 'hsl(var(--neon-blue) / 0.1)' }}
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-foreground transition-all"
                        >
                          <div className="p-2 rounded-lg bg-neon-blue/10">
                            <UserCircle className="w-5 h-5 text-neon-blue" />
                          </div>
                          <span className="font-medium">View Profile</span>
                        </motion.button>

                        {/* Logout Button - Highlighted */}
                        <motion.button
                          whileHover={{ x: 5, scale: 1.02 }}
                          onClick={handleLogout}
                          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 hover:border-destructive/50 transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]"
                        >
                          <div className="p-2 rounded-lg bg-destructive/20">
                            <LogOut className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-lg">Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-green text-primary-foreground font-medium text-sm neon-glow-blue"
                >
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-muted/50"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1">
                {/* User info on mobile */}
                {isAuthenticated && user && (
                  <div className="px-4 py-4 mb-3 rounded-xl bg-gradient-to-r from-neon-blue/10 to-neon-green/10 border border-neon-blue/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-green flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Logged in as</p>
                        <p className="font-bold text-foreground">{user.username}</p>
                      </div>
                    </div>
                  </div>
                )}

                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-neon-blue/10 text-neon-blue'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {isAuthenticated ? (
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full mt-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive font-bold text-left flex items-center gap-3"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </motion.button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <motion.button
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navItems.length * 0.05 }}
                      className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-green text-primary-foreground font-medium"
                    >
                      Login
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
