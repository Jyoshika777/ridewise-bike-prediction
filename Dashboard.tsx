import { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Cloud, Sun, CloudRain, Snowflake, Bike, TrendingUp, Zap, Calendar, Clock } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import CountUp from 'react-countup';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const seasons = [
  { value: '1', label: 'Spring', icon: '🌸' },
  { value: '2', label: 'Summer', icon: '☀️' },
  { value: '3', label: 'Fall', icon: '🍂' },
  { value: '4', label: 'Winter', icon: '❄️' },
];

const weatherConditions = [
  { value: '1', label: 'Clear', icon: Sun },
  { value: '2', label: 'Cloudy', icon: Cloud },
  { value: '3', label: 'Rain', icon: CloudRain },
  { value: '4', label: 'Snow', icon: Snowflake },
];

const daysOfWeek = [
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];

export default function Dashboard() {
  // Hourly prediction state
  const [temperature, setTemperature] = useState([20]);
  const [humidity, setHumidity] = useState([50]);
  const [windspeed, setWindspeed] = useState([15]);
  const [season, setSeason] = useState('2');
  const [weather, setWeather] = useState('1');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Daily prediction state
  const [dailyTemp, setDailyTemp] = useState([22]);
  const [dailyHumidity, setDailyHumidity] = useState([55]);
  const [dailyWindspeed, setDailyWindspeed] = useState([12]);
  const [dailySeason, setDailySeason] = useState('2');
  const [dailyWeather, setDailyWeather] = useState('1');
  const [dayOfWeek, setDayOfWeek] = useState('1');
  const [isHoliday, setIsHoliday] = useState('0');
  const [dailyPrediction, setDailyPrediction] = useState<number | null>(null);
  const [isDailyLoading, setIsDailyLoading] = useState(false);

  const handlePredict = () => {
    setIsLoading(true);
    setTimeout(() => {
      const base = 500;
      const tempFactor = temperature[0] * 10;
      const humidityFactor = (100 - humidity[0]) * 2;
      const windFactor = (50 - windspeed[0]) * 1.5;
      const seasonFactor = season === '2' ? 200 : season === '3' ? 100 : 0;
      const weatherFactor = weather === '1' ? 150 : weather === '2' ? 50 : -100;
      
      const predicted = Math.max(0, Math.round(base + tempFactor + humidityFactor + windFactor + seasonFactor + weatherFactor));
      setPrediction(predicted);
      setIsLoading(false);
      toast.success('Hourly prediction complete! 🚲');
    }, 1500);
  };

  const handleDailyPredict = () => {
    setIsDailyLoading(true);
    setTimeout(() => {
      const base = 3500;
      const tempFactor = dailyTemp[0] * 80;
      const humidityFactor = (100 - dailyHumidity[0]) * 15;
      const windFactor = (50 - dailyWindspeed[0]) * 12;
      const seasonFactor = dailySeason === '2' ? 1500 : dailySeason === '3' ? 800 : dailySeason === '1' ? 600 : 0;
      const weatherFactor = dailyWeather === '1' ? 1200 : dailyWeather === '2' ? 400 : -800;
      const weekdayFactor = ['0', '6'].includes(dayOfWeek) ? 800 : 0; // Weekend bonus
      const holidayFactor = isHoliday === '1' ? 500 : 0;
      
      const predicted = Math.max(0, Math.round(base + tempFactor + humidityFactor + windFactor + seasonFactor + weatherFactor + weekdayFactor + holidayFactor));
      setDailyPrediction(predicted);
      setIsDailyLoading(false);
      toast.success('Daily prediction complete! 📊');
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
              RideWise Bike Rental Predictor
            </span>
            <span className="ml-3">🚲</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Predict bike rental demand using AI-powered analytics
          </p>
        </motion.div>

        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 glass-card p-1">
            <TabsTrigger value="hourly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-green data-[state=active]:text-primary-foreground rounded-md flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Hourly Prediction
            </TabsTrigger>
            <TabsTrigger value="daily" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-green data-[state=active]:text-primary-foreground rounded-md flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Daily Prediction
            </TabsTrigger>
          </TabsList>

          {/* Hourly Prediction Tab */}
          <TabsContent value="hourly">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Temperature Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
                      <Thermometer className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Temperature</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-neon-blue">{temperature[0]}°C</div>
                    <Slider
                      value={temperature}
                      onValueChange={setTemperature}
                      max={40}
                      min={-10}
                      step={1}
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-neon-blue [&_[role=slider]]:to-neon-green [&_[role=slider]]:border-0 [&_[role=slider]]:neon-glow-blue"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>-10°C</span>
                      <span>40°C</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Humidity Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full" glowColor="cyan">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <Droplets className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Humidity</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-neon-cyan">{humidity[0]}%</div>
                    <Slider
                      value={humidity}
                      onValueChange={setHumidity}
                      max={100}
                      min={0}
                      step={1}
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-neon-cyan [&_[role=slider]]:to-neon-blue [&_[role=slider]]:border-0"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Windspeed Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full" glowColor="green">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20">
                      <Wind className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Windspeed</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-neon-green">{windspeed[0]} km/h</div>
                    <Slider
                      value={windspeed}
                      onValueChange={setWindspeed}
                      max={50}
                      min={0}
                      step={1}
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-neon-green [&_[role=slider]]:to-neon-cyan [&_[role=slider]]:border-0"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0 km/h</span>
                      <span>50 km/h</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Season Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
                      <span className="text-2xl">🌸</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg">Season</h3>
                  </div>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger className="w-full bg-muted/50 border-border focus:ring-neon-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border">
                      {seasons.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          <span className="flex items-center gap-2">
                            <span>{s.icon}</span>
                            <span>{s.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </GlassCard>
              </motion.div>

              {/* Weather Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/20">
                      <Cloud className="w-6 h-6 text-sky-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Weather</h3>
                  </div>
                  <Select value={weather} onValueChange={setWeather}>
                    <SelectTrigger className="w-full bg-muted/50 border-border focus:ring-neon-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border">
                      {weatherConditions.map((w) => (
                        <SelectItem key={w.value} value={w.value}>
                          <span className="flex items-center gap-2">
                            <w.icon className="w-4 h-4" />
                            <span>{w.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </GlassCard>
              </motion.div>

              {/* Predict Button */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full flex flex-col justify-center items-center">
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/e9b8f01c-7c0a-4c7a-b6d8-f4b1e2d6c8a9/bikeRide.json"
                    style={{ height: '80px', width: '80px' }}
                  />
                  <NeonButton onClick={handlePredict} pulse disabled={isLoading} className="w-full mt-4">
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Zap className="w-5 h-5" />
                        </motion.div>
                        Predicting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Predict Rentals
                      </span>
                    )}
                  </NeonButton>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Hourly Prediction Result */}
            {prediction !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mt-8"
              >
                <GlassCard className="max-w-2xl mx-auto text-center animate-glow-pulse" hover={false}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Bike className="w-8 h-8 text-neon-green" />
                    <h3 className="font-display text-2xl font-bold">Predicted Hourly Rentals</h3>
                  </div>
                  <div className="text-6xl md:text-7xl font-display font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                    <CountUp end={prediction} duration={2} separator="," />
                  </div>
                  <p className="text-muted-foreground mt-4">bikes expected to be rented this hour</p>
                </GlassCard>
              </motion.div>
            )}
          </TabsContent>

          {/* Daily Prediction Tab */}
          <TabsContent value="daily">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Daily Temperature Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
                      <Thermometer className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Avg Temperature</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-neon-blue">{dailyTemp[0]}°C</div>
                    <Slider
                      value={dailyTemp}
                      onValueChange={setDailyTemp}
                      max={40}
                      min={-10}
                      step={1}
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-neon-blue [&_[role=slider]]:to-neon-green [&_[role=slider]]:border-0"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>-10°C</span>
                      <span>40°C</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Daily Humidity Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full" glowColor="cyan">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <Droplets className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Avg Humidity</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-neon-cyan">{dailyHumidity[0]}%</div>
                    <Slider
                      value={dailyHumidity}
                      onValueChange={setDailyHumidity}
                      max={100}
                      min={0}
                      step={1}
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-neon-cyan [&_[role=slider]]:to-neon-blue [&_[role=slider]]:border-0"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Daily Windspeed Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full" glowColor="green">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20">
                      <Wind className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Avg Windspeed</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-neon-green">{dailyWindspeed[0]} km/h</div>
                    <Slider
                      value={dailyWindspeed}
                      onValueChange={setDailyWindspeed}
                      max={50}
                      min={0}
                      step={1}
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-neon-green [&_[role=slider]]:to-neon-cyan [&_[role=slider]]:border-0"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0 km/h</span>
                      <span>50 km/h</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Daily Season Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
                      <span className="text-2xl">🌸</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg">Season</h3>
                  </div>
                  <Select value={dailySeason} onValueChange={setDailySeason}>
                    <SelectTrigger className="w-full bg-muted/50 border-border focus:ring-neon-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border">
                      {seasons.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          <span className="flex items-center gap-2">
                            <span>{s.icon}</span>
                            <span>{s.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </GlassCard>
              </motion.div>

              {/* Daily Weather Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/20">
                      <Cloud className="w-6 h-6 text-sky-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Weather</h3>
                  </div>
                  <Select value={dailyWeather} onValueChange={setDailyWeather}>
                    <SelectTrigger className="w-full bg-muted/50 border-border focus:ring-neon-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border">
                      {weatherConditions.map((w) => (
                        <SelectItem key={w.value} value={w.value}>
                          <span className="flex items-center gap-2">
                            <w.icon className="w-4 h-4" />
                            <span>{w.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </GlassCard>
              </motion.div>

              {/* Day of Week Card */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Calendar className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Day of Week</h3>
                  </div>
                  <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                    <SelectTrigger className="w-full bg-muted/50 border-border focus:ring-neon-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border">
                      {daysOfWeek.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </GlassCard>
              </motion.div>

              {/* Holiday Toggle */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-rose-500/20 to-red-500/20">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg">Holiday?</h3>
                  </div>
                  <Select value={isHoliday} onValueChange={setIsHoliday}>
                    <SelectTrigger className="w-full bg-muted/50 border-border focus:ring-neon-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border">
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </GlassCard>
              </motion.div>

              {/* Daily Predict Button */}
              <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
                <GlassCard className="h-full flex flex-col md:flex-row justify-center items-center gap-6">
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/2bf43c35-3687-4c6b-b72c-3ad50f4a3d4a/FHqUJd4tq2.json"
                    style={{ height: '100px', width: '100px' }}
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-display text-xl font-bold mb-2">Daily Rental Forecast</h3>
                    <p className="text-muted-foreground text-sm mb-4">Predict total bike rentals for the entire day based on daily averages</p>
                    <NeonButton onClick={handleDailyPredict} pulse disabled={isDailyLoading} className="w-full md:w-auto">
                      {isDailyLoading ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Zap className="w-5 h-5" />
                          </motion.div>
                          Predicting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Predict Daily Rentals
                        </span>
                      )}
                    </NeonButton>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Daily Prediction Result */}
            {dailyPrediction !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mt-8"
              >
                <GlassCard className="max-w-2xl mx-auto text-center animate-glow-pulse" hover={false}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Calendar className="w-8 h-8 text-neon-green" />
                    <h3 className="font-display text-2xl font-bold">Predicted Daily Rentals</h3>
                  </div>
                  <div className="text-6xl md:text-7xl font-display font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                    <CountUp end={dailyPrediction} duration={2} separator="," />
                  </div>
                  <p className="text-muted-foreground mt-4">total bikes expected to be rented today</p>
                </GlassCard>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
