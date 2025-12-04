import { motion } from 'framer-motion';
import { Bike, Linkedin, Github, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jyoshika777', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Jyoshika777', label: 'GitHub' },
  { icon: Mail, href: 'mailto:jyoshikajyoshika3@gmail.com', label: 'Email' },
];

const footerLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Insights', href: '/insights' },
  { label: 'Map', href: '/map' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
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
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              AI-powered smart bike rental prediction system. Making urban mobility smarter, greener, and more efficient.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg glass-card hover:neon-glow-blue transition-all"
                >
                  <social.icon className="w-5 h-5 text-neon-blue" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-neon-blue transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-neon-blue transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Jyoshika Irlapati
          </p>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} RideWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
