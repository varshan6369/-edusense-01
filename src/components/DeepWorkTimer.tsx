import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  CheckCircle2,
  BellRing,
} from 'lucide-react';

interface DeepWorkTimerProps {
  onSessionComplete?: (xpEarned: number) => void;
  mindsetMode?: 'scholar' | 'tapasya' | 'goggins';
}

export const DeepWorkTimer: React.FC<DeepWorkTimerProps> = ({
  onSessionComplete,
  mindsetMode = 'scholar',
}) => {
  const [sessionLength, setSessionLength] = useState<number>(25); // minutes
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Play gentle web audio chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio frequency
      osc.frequency.exponentialRampToValueAtTime(1056, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playChime();
      if (mode === 'study') {
        const nextCount = completedSessions + 1;
        setCompletedSessions(nextCount);
        if (onSessionComplete) {
          onSessionComplete(25);
        }
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('study');
        setTimeLeft(sessionLength * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, sessionLength, completedSessions]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = (newMinutes: number = sessionLength) => {
    setIsRunning(false);
    setSessionLength(newMinutes);
    setTimeLeft(newMinutes * 60);
    setMode('study');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent =
    (( (mode === 'study' ? sessionLength * 60 : 5 * 60) - timeLeft) /
      (mode === 'study' ? sessionLength * 60 : 5 * 60)) *
    100;

  const modeTheme = {
    scholar: {
      accent: 'indigo',
      badge: 'Sāttvik Focus Sprint',
      motto: 'Calm, steady retention with active recall',
    },
    tapasya: {
      accent: 'amber',
      badge: 'Tapasya Sādhanā Sprint',
      motto: '“Arise, awake! Single-minded intellectual dedication.”',
    },
    goggins: {
      accent: 'orange',
      badge: 'Savage Deep Work Grind',
      motto: '“No distractions. No phone. Outwork the governor!”',
    },
  }[mindsetMode];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                mindsetMode === 'tapasya'
                  ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300'
                  : mindsetMode === 'goggins'
                  ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 border border-orange-300'
                  : 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              {modeTheme.badge}
            </span>
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">• Pomodoro Sprint</span>
          </div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {modeTheme.motto}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs transition-all cursor-pointer"
            title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <span className="text-xs font-black text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            {completedSessions} Sprints Done
          </span>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className={`transition-all duration-300 ${
                  mindsetMode === 'tapasya'
                    ? 'stroke-amber-500'
                    : mindsetMode === 'goggins'
                    ? 'stroke-orange-500'
                    : 'stroke-indigo-600'
                }`}
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * progressPercent) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                {mode === 'study' ? 'Deep Work' : 'Rest Break'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              {[15, 25, 45].map((m) => (
                <button
                  key={m}
                  disabled={isRunning}
                  onClick={() => resetTimer(m)}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    sessionLength === m
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isRunning
                ? 'Sprint in progress. Phone away, focus active!'
                : 'Choose duration and press start to log revision XP.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => resetTimer(sessionLength)}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleTimer}
            className={`px-6 py-3 rounded-2xl text-white font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer ${
              isRunning
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                : mindsetMode === 'tapasya'
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                : mindsetMode === 'goggins'
                ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isRunning ? 'Pause Sprint' : 'Start Focus Sprint (+25 XP)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
