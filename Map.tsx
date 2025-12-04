import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Layers, Bike, Users, Battery, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';

const stations = [
  { id: 1, name: 'Central Station', x: 45, y: 35, bikes: 12, capacity: 20, status: 'high' },
  { id: 2, name: 'Tech Park', x: 65, y: 25, bikes: 5, capacity: 15, status: 'medium' },
  { id: 3, name: 'University Hub', x: 30, y: 55, bikes: 18, capacity: 25, status: 'high' },
  { id: 4, name: 'Marina Point', x: 75, y: 60, bikes: 2, capacity: 12, status: 'low' },
  { id: 5, name: 'Downtown Plaza', x: 50, y: 50, bikes: 8, capacity: 18, status: 'medium' },
  { id: 6, name: 'Airport Terminal', x: 85, y: 40, bikes: 15, capacity: 20, status: 'high' },
];

const stats = [
  { label: 'Active Stations', value: 24, icon: MapPin },
  { label: 'Available Bikes', value: 186, icon: Bike },
  { label: 'Active Riders', value: 42, icon: Users },
  { label: 'Avg Wait Time', value: '3 min', icon: Clock },
];

export default function Map() {
  const [zoom, setZoom] = useState(1);
  const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'from-neon-green to-emerald-500';
      case 'medium': return 'from-neon-blue to-cyan-500';
      case 'low': return 'from-orange-500 to-red-500';
      default: return 'from-neon-blue to-neon-green';
    }
  };

  const getPulseColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-neon-green';
      case 'medium': return 'bg-neon-blue';
      case 'low': return 'bg-orange-500';
      default: return 'bg-neon-blue';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-green bg-clip-text text-transparent">
              Live Station Map
            </span>
            <span className="ml-3">🗺️</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time bike availability across all stations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <GlassCard className="relative overflow-hidden" hover={false}>
              {/* Map Container */}
              <div
                className="relative w-full aspect-[16/10] rounded-lg overflow-hidden"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
              >
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-card">
                  {/* Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neon-blue" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Heatmap Overlay */}
                  {showHeatmap && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0"
                    >
                      {stations.map((station) => (
                        <motion.div
                          key={`heat-${station.id}`}
                          className="absolute rounded-full"
                          style={{
                            left: `${station.x}%`,
                            top: `${station.y}%`,
                            width: `${station.capacity * 4}px`,
                            height: `${station.capacity * 4}px`,
                            transform: 'translate(-50%, -50%)',
                            background: `radial-gradient(circle, ${
                              station.status === 'high' ? 'rgba(0, 255, 136, 0.4)' :
                              station.status === 'medium' ? 'rgba(0, 212, 255, 0.4)' :
                              'rgba(255, 165, 0, 0.4)'
                            } 0%, transparent 70%)`,
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: station.id * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Station Markers */}
                  {stations.map((station) => (
                    <motion.div
                      key={station.id}
                      className="absolute cursor-pointer"
                      style={{ left: `${station.x}%`, top: `${station.y}%`, transform: 'translate(-50%, -50%)' }}
                      whileHover={{ scale: 1.3 }}
                      onClick={() => setSelectedStation(station)}
                    >
                      {/* Pulse Effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-full ${getPulseColor(station.status)}`}
                        animate={{
                          scale: [1, 2, 2],
                          opacity: [0.5, 0.2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        style={{ width: '24px', height: '24px', margin: '-4px' }}
                      />
                      
                      {/* Marker */}
                      <div className={`relative w-4 h-4 rounded-full bg-gradient-to-br ${getStatusColor(station.status)} shadow-lg`}>
                        <div className="absolute inset-1 rounded-full bg-background/50" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Animated Routes */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                      d="M 45% 35% Q 50% 45% 50% 50%"
                      stroke="url(#routeGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#00FF88" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
                  className="p-2 glass-card rounded-lg hover:neon-glow-blue"
                >
                  <ZoomIn className="w-5 h-5 text-neon-blue" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                  className="p-2 glass-card rounded-lg hover:neon-glow-blue"
                >
                  <ZoomOut className="w-5 h-5 text-neon-blue" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setZoom(1)}
                  className="p-2 glass-card rounded-lg hover:neon-glow-blue"
                >
                  <RotateCcw className="w-5 h-5 text-neon-blue" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`p-2 glass-card rounded-lg ${showHeatmap ? 'neon-glow-green' : 'hover:neon-glow-blue'}`}
                >
                  <Layers className={`w-5 h-5 ${showHeatmap ? 'text-neon-green' : 'text-neon-blue'}`} />
                </motion.button>
              </div>

              {/* Selected Station Info */}
              <AnimatePresence>
                {selectedStation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72"
                  >
                    <GlassCard hover={false}>
                      <button
                        onClick={() => setSelectedStation(null)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                      <h4 className="font-display font-bold text-lg mb-3">{selectedStation.name}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Available Bikes</span>
                          <span className="font-semibold text-neon-green">{selectedStation.bikes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Docks</span>
                          <span className="font-semibold">{selectedStation.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span className={`font-semibold capitalize ${
                            selectedStation.status === 'high' ? 'text-neon-green' :
                            selectedStation.status === 'medium' ? 'text-neon-blue' : 'text-orange-500'
                          }`}>
                            {selectedStation.status} Availability
                          </span>
                        </div>
                        {/* Capacity Bar */}
                        <div className="mt-3">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${getStatusColor(selectedStation.status)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(selectedStation.bikes / selectedStation.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <NeonButton className="w-full mt-4" size="sm">
                        Reserve Bike
                      </NeonButton>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-green/20">
                      <stat.icon className="w-6 h-6 text-neon-blue" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl text-foreground">{stat.value}</div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Legend */}
            <GlassCard>
              <h4 className="font-display font-semibold mb-3">Availability Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-green" />
                  <span className="text-sm text-muted-foreground">High (&gt;70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-blue" />
                  <span className="text-sm text-muted-foreground">Medium (30-70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm text-muted-foreground">Low (&lt;30%)</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}
