import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Linkedin, Github, CheckCircle, Bike } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: Mail, label: 'Email', value: 'jyoshikajyoshika3@gmail.com', href: 'mailto:jyoshikajyoshika3@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Hyderabad, India', href: '#' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jyoshika777', label: 'LinkedIn', color: 'hover:text-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.5)]' },
  { icon: Github, href: 'https://github.com/Jyoshika777', label: 'GitHub', color: 'hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' },
  { icon: Mail, href: 'mailto:jyoshikajyoshika3@gmail.com', label: 'Email', color: 'hover:text-destructive hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const timestamp = new Date().toLocaleString();
    const mailtoSubject = encodeURIComponent(`[RideWise Contact] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n` +
      `Timestamp: ${timestamp}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Open mailto link
    window.open(`mailto:jyoshikajyoshika3@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Opening your email client...', {
      description: 'Your message is ready to send!',
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-green bg-clip-text text-transparent">
              Get In Touch
            </span>
            <span className="ml-3">📬</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question or want to collaborate? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left - Illustration & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Animated Bike Illustration */}
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/2bf43c35-3687-4c6b-b72c-3ad50f4a3d4a/FHqUJd4tq2.json"
                  style={{ height: '300px', width: '300px', margin: '0 auto' }}
                />
              </motion.div>
              
              {/* Floating Elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                  }}
                >
                  <Bike className="w-6 h-6 text-neon-blue/30" />
                </motion.div>
              ))}
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <GlassCard className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-green/20">
                      <info.icon className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </GlassCard>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <GlassCard>
              <h3 className="font-display font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg bg-muted/50 transition-all ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard hover={false}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 mx-auto text-neon-green mb-4" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-2">Message Ready!</h3>
                  <p className="text-muted-foreground">Your email client should open shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all placeholder:text-muted-foreground"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all placeholder:text-muted-foreground"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all placeholder:text-muted-foreground"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] outline-none transition-all resize-none placeholder:text-muted-foreground"
                      placeholder="Tell us more..."
                    />
                  </div>

                  <NeonButton type="submit" className="w-full" disabled={isSubmitting} pulse>
                    {isSubmitting ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Preparing...
                      </motion.span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </NeonButton>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
