import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Moon,
  Zap,
  Smile,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Award,
  Bell,
  CheckCircle2,
} from 'lucide-react';

interface StudentWellnessCheckinProps {
  onLoggedWellness?: (readinessScore: number) => void;
}

export const StudentWellnessCheckin: React.FC<StudentWellnessCheckinProps> = ({
  onLoggedWellness,
}) => {
  const [energyLevel, setEnergyLevel] = useState<'High' | 'Balanced' | 'Tired'>('Balanced');
  const [stressLevel, setStressLevel] = useState<'Calm' | 'Moderate' | 'Stressed'>('Calm');
  const [sleepSatisfaction, setSleepSatisfaction] = useState<number>(4);
  const [loggedToday, setLoggedToday] = useState<boolean>(false);

  // 2-Minute Mindful Breathing State (Pranayama Box Breathing: 4s Inhale, 4s Hold, 4s Exhale, 4s Hold)
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCounter, setBreathCounter] = useState<number>(4);
  const [completedBreaths, setCompletedBreaths] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev <= 1) {
            setBreathingPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              if (currentPhase === 'Exhale') {
                setCompletedBreaths((c) => c + 1);
                return 'Rest';
              }
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  // Cognitive Readiness Score: 0-100%
  const calculateReadiness = (): number => {
    let score = 70;
    if (energyLevel === 'High') score += 15;
    else if (energyLevel === 'Tired') score -= 15;

    if (stressLevel === 'Calm') score += 10;
    else if (stressLevel === 'Stressed') score -= 15;

    score += (sleepSatisfaction - 3) * 5;
    return Math.max(40, Math.min(99, score));
  };

  const readinessScore = calculateReadiness();

  const handleSaveCheckin = () => {
    setLoggedToday(true);
    if (onLoggedWellness) {
      onLoggedWellness(readinessScore);
    }
  };

  return (
    <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-rose-200 dark:border-rose-900/50">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              Health & Cognitive Readiness Tracker
            </span>
            <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
              • Circular Theme D
            </span>
          </div>
          <h3 className="text-xl font-black text-[#1A1A2E] dark:text-white">
            Daily Academic Mindset & Focus Check-in
          </h3>
          <p className="text-xs text-[#4A4A6A] dark:text-slate-300 font-medium">
            Prevents exam fatigue and monitors cognitive leading indicators before intensive study sessions.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-950 border border-indigo-100 dark:border-indigo-900/60 text-center shrink-0">
          <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            Cognitive Readiness
          </span>
          <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
            {readinessScore}%
          </span>
          <span className="text-[9px] font-bold text-emerald-600 block">
            {readinessScore >= 80 ? 'Optimal Focus' : readinessScore >= 65 ? 'Moderate Focus' : 'Recovery Needed'}
          </span>
        </div>
      </div>

      {/* Wellness Metrics Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Energy Level */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            Energy & Alertness
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {(['Tired', 'Balanced', 'High'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setEnergyLevel(lvl)}
                className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center ${
                  energyLevel === lvl
                    ? 'bg-amber-500 text-white border-amber-600 font-black shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Metric 2: Academic Anxiety / Stress */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Smile className="w-4 h-4 text-indigo-500" />
            Mental Calmness
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {(['Calm', 'Moderate', 'Stressed'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setStressLevel(lvl)}
                className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center ${
                  stressLevel === lvl
                    ? 'bg-indigo-600 text-white border-indigo-700 font-black shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Metric 3: Sleep Satisfaction */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Moon className="w-4 h-4 text-purple-500" />
            Sleep Restfulness
          </div>
          <div className="flex items-center justify-between pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSleepSatisfaction(star)}
                className={`w-9 h-9 rounded-xl font-black text-xs transition-all cursor-pointer border ${
                  sleepSatisfaction >= star
                    ? 'bg-purple-600 text-white border-purple-700 shadow-2xs'
                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {star}★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2-Minute Mindful Focus Pacer (Indian Knowledge Systems - Pranayama Box Breathing) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-50/70 via-purple-50/70 to-pink-50/70 dark:from-slate-800/80 dark:to-indigo-950/80 border border-indigo-200/80 dark:border-indigo-900/40 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Mindful Study Focus Pacer (Prāṇāyāma)
            </div>
            <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300/80 font-medium">
              2-minute grounding exercise inspired by Indian Knowledge Systems to clear cognitive noise before studying.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                isBreathingActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isBreathingActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isBreathingActive ? 'Pause Exercise' : 'Start 2m Reset'}</span>
            </button>
            {completedBreaths > 0 && (
              <span className="text-[11px] font-black text-indigo-800 dark:text-indigo-300">
                {completedBreaths} Cycles
              </span>
            )}
          </div>
        </div>

        {/* Breathing Animation Orb */}
        {isBreathingActive && (
          <div className="py-6 flex flex-col items-center justify-center">
            <motion.div
              animate={{
                scale: breathingPhase === 'Inhale' ? 1.4 : breathingPhase === 'Hold' ? 1.4 : breathingPhase === 'Exhale' ? 0.9 : 0.9,
                opacity: breathingPhase === 'Exhale' ? 0.8 : 1,
              }}
              transition={{ duration: 3.8, ease: 'easeInOut' }}
              className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col items-center justify-center shadow-xl shadow-indigo-500/30 text-center select-none"
            >
              <span className="text-xs font-black uppercase tracking-widest">{breathingPhase}</span>
              <span className="text-2xl font-black">{breathCounter}s</span>
            </motion.div>
            <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200 mt-4">
              {breathingPhase === 'Inhale' && 'Inhale deeply through the nose...'}
              {breathingPhase === 'Hold' && 'Gently retain your breath and center your focus...'}
              {breathingPhase === 'Exhale' && 'Slowly release breath through the mouth...'}
              {breathingPhase === 'Rest' && 'Settle in natural calm awareness...'}
            </p>
          </div>
        )}
      </div>

      {/* Save Check-in Bar */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-[#9B9BB8] font-bold">
          {loggedToday ? '✓ Mindset recorded for today.' : 'Ready to record today’s mindset?'}
        </span>
        <button
          onClick={handleSaveCheckin}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          {loggedToday ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Sparkles className="w-4 h-4" />}
          <span>{loggedToday ? 'Check-in Saved!' : 'Save Today’s Check-in (+15 XP)'}</span>
        </button>
      </div>
    </div>
  );
};
