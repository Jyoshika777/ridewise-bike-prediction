import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart as PieIcon, Cloud, Users, Bike, Sun, Calendar } from 'lucide-react';
import CountUp from 'react-countup';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

const hourlyData = [
  { hour: '6AM', rentals: 120, casual: 30, registered: 90 },
  { hour: '8AM', rentals: 450, casual: 80, registered: 370 },
  { hour: '10AM', rentals: 320, casual: 120, registered: 200 },
  { hour: '12PM', rentals: 380, casual: 150, registered: 230 },
  { hour: '2PM', rentals: 350, casual: 140, registered: 210 },
  { hour: '4PM', rentals: 420, casual: 100, registered: 320 },
  { hour: '6PM', rentals: 580, casual: 180, registered: 400 },
  { hour: '8PM', rentals: 380, casual: 200, registered: 180 },
  { hour: '10PM', rentals: 180, casual: 80, registered: 100 },
];

const seasonData = [
  { name: 'Spring', value: 2500, color: '#FF6B9D' },
  { name: 'Summer', value: 4200, color: '#00D4FF' },
  { name: 'Fall', value: 3100, color: '#FFA726' },
  { name: 'Winter', value: 1800, color: '#00FF88' },
];

const weatherImpact = [
  { weather: 'Clear', rentals: 4500, icon: '☀️' },
  { weather: 'Cloudy', rentals: 3200, icon: '☁️' },
  { weather: 'Rain', rentals: 1200, icon: '🌧️' },
  { weather: 'Snow', rentals: 400, icon: '❄️' },
];

const monthlyTrend = [
  { month: 'Jan', rentals: 1200 },
  { month: 'Feb', rentals: 1400 },
  { month: 'Mar', rentals: 2200 },
  { month: 'Apr', rentals: 3100 },
  { month: 'May', rentals: 3800 },
  { month: 'Jun', rentals: 4200 },
  { month: 'Jul', rentals: 4500 },
  { month: 'Aug', rentals: 4300 },
  { month: 'Sep', rentals: 3600 },
  { month: 'Oct', rentals: 2800 },
  { month: 'Nov', rentals: 1800 },
  { month: 'Dec', rentals: 1300 },
];

const stats = [
  { label: 'Total Rentals', value: 3292679, icon: Bike, color: 'from-neon-blue to-neon-cyan' },
  { label: 'Active Users', value: 45892, icon: Users, color: 'from-neon-green to-neon-cyan' },
  { label: 'Avg Daily', value: 4504, icon: Calendar, color: 'from-neon-cyan to-neon-blue' },
  { label: 'Peak Hour', value: 6, suffix: 'PM', icon: Sun, color: 'from-neon-blue to-neon-green' },
];

export default function Insights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
              Rental Trends & Insights
            </span>
            <span className="ml-3">📈</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover patterns and optimize your bike rental strategy with data-driven insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlassCard className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-neon-blue" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  <CountUp end={stat.value} duration={2.5} separator="," />
                  {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                </div>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Hourly Trend Chart */}
          <motion.div variants={itemVariants}>
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-neon-blue/20">
                  <TrendingUp className="w-5 h-5 text-neon-blue" />
                </div>
                <h3 className="font-display font-semibold text-lg">Hourly Rental Pattern</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="hour" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area type="monotone" dataKey="rentals" stroke="#00D4FF" fillOpacity={1} fill="url(#colorRentals)" />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Season Distribution */}
          <motion.div variants={itemVariants}>
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-neon-green/20">
                  <PieIcon className="w-5 h-5 text-neon-green" />
                </div>
                <h3 className="font-display font-semibold text-lg">Seasonal Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={seasonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {seasonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,136,0.3)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Weather Impact */}
          <motion.div variants={itemVariants}>
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-neon-cyan/20">
                  <Cloud className="w-5 h-5 text-neon-cyan" />
                </div>
                <h3 className="font-display font-semibold text-lg">Weather Impact</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weatherImpact}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="weather" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="rentals" fill="#00D4FF" radius={[8, 8, 0, 0]}>
                    {weatherImpact.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#00FF88' : index === 1 ? '#00D4FF' : index === 2 ? '#FFA726' : '#888'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div variants={itemVariants}>
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-neon-blue/20">
                  <BarChart3 className="w-5 h-5 text-neon-blue" />
                </div>
                <h3 className="font-display font-semibold text-lg">Monthly Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rentals"
                    stroke="#00FF88"
                    strokeWidth={3}
                    dot={{ fill: '#00FF88', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#00D4FF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Highlight Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Peak Season', value: 'Summer', icon: '☀️' },
            { label: 'Best Weather', value: 'Clear', icon: '🌤️' },
            { label: 'Rush Hour', value: '6 PM', icon: '⏰' },
            { label: 'Growth Rate', value: '+23%', icon: '📈' },
          ].map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="text-center py-4">
                <span className="text-3xl mb-2 block">{badge.icon}</span>
                <div className="font-display font-bold text-neon-blue text-lg">{badge.value}</div>
                <p className="text-muted-foreground text-xs">{badge.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}
