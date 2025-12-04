import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Zap, Crown, Calendar, Clock, CheckCircle, ChevronRight, Sparkles, Package, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import CountUp from 'react-countup';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { useAuth } from '@/hooks/useAuth';
import { useBookings, Booking } from '@/hooks/useBookings';
import { toast } from 'sonner';

const bikeTypes = [
  {
    id: 'basic',
    name: 'Basic Bike',
    icon: Bike,
    price: 5,
    features: ['Standard comfort', 'City riding', '3-speed gear'],
    color: 'from-blue-500 to-cyan-500',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium Bike',
    icon: Crown,
    price: 12,
    features: ['Enhanced comfort', 'All-terrain', '21-speed gear', 'GPS tracking'],
    color: 'from-neon-blue to-neon-green',
    popular: true,
  },
  {
    id: 'electric',
    name: 'Electric Bike',
    icon: Zap,
    price: 20,
    features: ['Electric assist', 'Extended range', 'Smart display', 'USB charging'],
    color: 'from-neon-green to-emerald-500',
    popular: false,
  },
];

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
];

export default function Reservations() {
  const [step, setStep] = useState(1);
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  
  const { user } = useAuth();
  const { bookings, addBooking, getTotalBookings } = useBookings();

  const handleBikeSelect = (bikeId: string) => {
    setFlippedCard(bikeId);
    setTimeout(() => {
      setSelectedBike(bikeId);
      setFlippedCard(null);
      setStep(2);
    }, 600);
  };

  const handleConfirm = () => {
    const selectedBikeData = bikeTypes.find(b => b.id === selectedBike);
    if (!selectedBikeData || !user) return;

    const booking = addBooking({
      bikeType: selectedBike!,
      bikeName: selectedBikeData.name,
      date: selectedDate,
      timeSlot: selectedTime!,
      duration: '1 hour',
      totalFare: selectedBikeData.price,
      username: user.username,
    });

    setLastBooking(booking);
    setShowConfirmation(true);
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#00D4FF', '#00FF88', '#FF6B9D', '#FFD700'],
    });

    toast.success('Booking confirmed! 🎉');
  };

  const selectedBikeData = bikeTypes.find(b => b.id === selectedBike);
  const totalBookings = getTotalBookings();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Booking Counter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-green bg-clip-text text-transparent">
                Reserve Your Ride
              </span>
              <span className="ml-3">🛒</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your perfect bike and book in seconds
            </p>
          </motion.div>

          {/* Total Bookings Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center md:justify-end"
          >
            <GlassCard className="px-6 py-4 flex items-center gap-4 animate-glow-pulse" hover={false}>
              <div className="p-3 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-green/20">
                <Package className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Bookings</p>
                <p className="text-3xl font-display font-bold text-neon-green">
                  <CountUp end={totalBookings} duration={1.5} />
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((s) => (
              <motion.div
                key={s}
                className="relative z-10 flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: s * 0.1 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold transition-all duration-300 ${
                    step >= s
                      ? 'bg-gradient-to-r from-neon-blue to-neon-green text-primary-foreground neon-glow-blue'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                <span className={`mt-2 text-sm ${step >= s ? 'text-neon-blue' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Select Bike' : s === 2 ? 'Choose Time' : 'Confirm'}
                </span>
              </motion.div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue to-neon-green"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Bike */}
          {step === 1 && !showConfirmation && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {bikeTypes.map((bike, i) => (
                <motion.div
                  key={bike.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="perspective-1000"
                >
                  <motion.div
                    className="relative w-full cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: flippedCard === bike.id ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => handleBikeSelect(bike.id)}
                  >
                    {/* Front */}
                    <GlassCard className="relative backface-hidden">
                      {bike.popular && (
                        <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-green text-xs font-bold text-primary-foreground">
                          Popular
                        </div>
                      )}
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${bike.color} flex items-center justify-center`}>
                        <bike.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-center mb-2">{bike.name}</h3>
                      <div className="text-center mb-4">
                        <span className="text-3xl font-display font-bold text-neon-blue">${bike.price}</span>
                        <span className="text-muted-foreground">/hour</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {bike.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-neon-green" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <NeonButton className="w-full" variant={bike.popular ? 'primary' : 'outline'}>
                        Select <ChevronRight className="w-4 h-4 ml-1" />
                      </NeonButton>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Step 2: Choose Time */}
          {step === 2 && !showConfirmation && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <GlassCard>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label className="flex items-center gap-2 mb-3 font-display font-semibold">
                      <Calendar className="w-5 h-5 text-neon-blue" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all"
                    />
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="flex items-center gap-2 mb-3 font-display font-semibold">
                      <Clock className="w-5 h-5 text-neon-blue" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            selectedTime === time
                              ? 'bg-gradient-to-r from-neon-blue to-neon-green text-primary-foreground neon-glow-blue'
                              : 'bg-muted/50 hover:bg-muted text-foreground'
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <NeonButton variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </NeonButton>
                  <NeonButton
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1"
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                  </NeonButton>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && !showConfirmation && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-xl mx-auto"
            >
              <GlassCard>
                <h3 className="font-display text-2xl font-bold text-center mb-6">Booking Summary</h3>
                
                {selectedBikeData && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${selectedBikeData.color}`}>
                          <selectedBikeData.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{selectedBikeData.name}</p>
                          <p className="text-sm text-muted-foreground">${selectedBikeData.price}/hour</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Booked by</span>
                      <span className="font-medium text-neon-blue">{user?.username}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-display font-bold text-lg">Total</span>
                      <span className="font-display font-bold text-lg text-neon-green">
                        ${selectedBikeData.price}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <NeonButton variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </NeonButton>
                  <NeonButton onClick={handleConfirm} className="flex-1" pulse>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </NeonButton>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Confirmation Modal */}
          {showConfirmation && lastBooking && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <GlassCard className="animate-glow-pulse" hover={false}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle className="w-20 h-20 mx-auto mb-4 text-neon-green" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-display text-2xl font-bold mb-2">Booking Confirmed!</h3>
                  <div className="my-4 p-3 rounded-lg bg-neon-green/10 border border-neon-green/30">
                    <p className="text-xs text-muted-foreground">Confirmation ID</p>
                    <p className="font-display font-bold text-neon-green text-lg">{lastBooking.confirmationId}</p>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Your {lastBooking.bikeName} is reserved for {lastBooking.date} at {lastBooking.timeSlot}
                  </p>
                  <NeonButton onClick={() => {
                    setShowConfirmation(false);
                    setStep(1);
                    setSelectedBike(null);
                    setSelectedDate('');
                    setSelectedTime(null);
                    setLastBooking(null);
                  }}>
                    Book Another Ride
                  </NeonButton>
                </motion.div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking History */}
        {bookings.length > 0 && !showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-neon-blue" />
              My Bookings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.map((booking, index) => {
                const bikeData = bikeTypes.find(b => b.id === booking.bikeType);
                const isExpanded = expandedBooking === booking.id;
                
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard 
                      className="cursor-pointer" 
                      onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {bikeData && (
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${bikeData.color}`}>
                              <bikeData.icon className="w-5 h-5 text-primary-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">{booking.bikeName}</p>
                            <p className="text-xs text-muted-foreground">{booking.date}</p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-neon-blue" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-border space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Confirmation ID</span>
                                <span className="font-mono text-neon-green">{booking.confirmationId}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Time</span>
                                <span>{booking.timeSlot}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Duration</span>
                                <span>{booking.duration}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Total Fare</span>
                                <span className="text-neon-green font-bold">${booking.totalFare}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Booked By</span>
                                <span className="text-neon-blue">{booking.username}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
