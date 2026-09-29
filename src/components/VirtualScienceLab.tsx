import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FlaskConical,
  Zap,
  Leaf,
  Activity,
  RotateCcw,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const VirtualScienceLab: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState<'physics' | 'chemistry' | 'biology'>('physics');

  // Physics: Ohm's Law (V = I * R)
  const [voltage, setVoltage] = useState<number>(12); // Volts
  const [resistance, setResistance] = useState<number>(20); // Ohms
  const current = Number((voltage / resistance).toFixed(2)); // Amperes
  const power = Number((voltage * current).toFixed(2)); // Watts

  // Generate dynamic V-I data points for graphing
  const viGraphData = [
    { v: 0, i: 0 },
    { v: 3, i: Number((3 / resistance).toFixed(2)) },
    { v: 6, i: Number((6 / resistance).toFixed(2)) },
    { v: 9, i: Number((9 / resistance).toFixed(2)) },
    { v: 12, i: Number((12 / resistance).toFixed(2)) },
    { v: 18, i: Number((18 / resistance).toFixed(2)) },
    { v: 24, i: Number((24 / resistance).toFixed(2)) },
  ];

  // Chemistry: Acid-Base Titration (0.1M HCl with 0.1M NaOH)
  const [naohVolume, setNaohVolume] = useState<number>(15); // mL added (25mL equivalence)
  const calculatePH = (vol: number): number => {
    if (vol < 25) {
      // Excess acid
      const remainingMoles = (25 * 0.1 - vol * 0.1) / (25 + vol);
      return Number((-Math.log10(Math.max(1e-7, remainingMoles))).toFixed(2));
    } else if (vol === 25) {
      return 7.0; // Equivalence point
    } else {
      // Excess base
      const excessMoles = (vol * 0.1 - 25 * 0.1) / (25 + vol);
      const pOH = -Math.log10(Math.max(1e-7, excessMoles));
      return Number((14 - pOH).toFixed(2));
    }
  };
  const currentPH = calculatePH(naohVolume);

  // Biology: Photosynthesis Rate vs Light Intensity
  const [lightIntensity, setLightIntensity] = useState<number>(60); // %
  const [co2Level, setCo2Level] = useState<number>(400); // ppm
  const bubbleRate = Math.round((lightIntensity * 0.6) * (co2Level / 400));

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="clay-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                Theme D: Virtual Science Laboratories
              </span>
              <span className="text-xs text-emerald-300 font-semibold hidden sm:inline">
                • Physics, Chemistry & Biology Simulators
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Interactive STEM Virtual Laboratories
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 font-medium max-w-2xl leading-relaxed">
              Real-time mathematical simulations for Ohm's Law circuits, acid-base pH titration, and photosynthetic oxygen evolution.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setSelectedLab('physics')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedLab === 'physics' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> Physics (Ohm)
            </button>
            <button
              onClick={() => setSelectedLab('chemistry')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedLab === 'chemistry' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" /> Chemistry (pH)
            </button>
            <button
              onClick={() => setSelectedLab('biology')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedLab === 'biology' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" /> Biology (Oxygen)
            </button>
          </div>
        </div>
      </div>

      {/* LAB 1: PHYSICS OHM'S LAW */}
      {selectedLab === 'physics' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Ohm's Law Circuit Simulation (V = I · R)
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Adjust potential difference and resistance to observe electrical current and power dissipation.
              </p>
            </div>
            <div className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              Formula: I = V / R • P = V · I
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls & Gauges */}
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                  <span>Battery Potential (V):</span>
                  <span className="text-indigo-600 text-sm">{voltage} V</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                  <span>Circuit Resistance (R):</span>
                  <span className="text-amber-600 text-sm">{resistance} Ω</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={resistance}
                  onChange={(e) => setResistance(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Meter Readouts */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    Ammeter Current (I)
                  </span>
                  <span className="text-2xl font-black text-indigo-900 dark:text-indigo-200">
                    {current} A
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    Power Dissipation (P)
                  </span>
                  <span className="text-2xl font-black text-amber-900 dark:text-amber-200">
                    {power} W
                  </span>
                </div>
              </div>
            </div>

            {/* V-I Characteristic Graph */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                Linear V-I Characteristic Curve (Slope = 1/R = {(1 / resistance).toFixed(3)})
              </span>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viGraphData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="v" unit="V" />
                    <YAxis dataKey="i" unit="A" />
                    <Tooltip />
                    <Line type="monotone" dataKey="i" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: CHEMISTRY ACID-BASE TITRATION */}
      {selectedLab === 'chemistry' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Strong Acid vs Strong Base Titration (0.1M HCl + 0.1M NaOH)
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Observe the sharp S-curve titration jump and phenolphthalein indicator color shift at equivalence.
              </p>
            </div>
            <div className="px-3 py-1 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 text-xs font-bold">
              Equivalence Volume: 25.0 mL
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Slider & Meter */}
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                  <span>Volume of 0.1M NaOH Added:</span>
                  <span className="text-pink-600 text-sm font-black">{naohVolume} mL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={naohVolume}
                  onChange={(e) => setNaohVolume(Number(e.target.value))}
                  className="w-full accent-pink-600 cursor-pointer"
                />
              </div>

              {/* pH Meter Box */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#9B9BB8] block">
                    Digital pH Sensor Readout
                  </span>
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    pH {currentPH}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    currentPH < 6.8
                      ? 'bg-rose-100 text-rose-800'
                      : currentPH > 7.2
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {currentPH < 6.8 ? 'Acidic Solution' : currentPH > 7.2 ? 'Basic Solution' : 'Neutral Equivalence'}
                </span>
              </div>
            </div>

            {/* Simulated Conical Flask with Phenolphthalein Color */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div
                className={`w-28 h-36 rounded-b-3xl border-4 border-slate-400/80 flex items-end justify-center transition-colors duration-300 relative overflow-hidden ${
                  currentPH >= 8.2 ? 'bg-pink-400 shadow-lg shadow-pink-500/30' : 'bg-sky-50/60'
                }`}
              >
                <div className="absolute top-2 text-[10px] font-bold text-slate-500">
                  {currentPH >= 8.2 ? 'Pink Endpoint' : 'Colorless'}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-3">
                Phenolphthalein Indicator in Analyte
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LAB 3: BIOLOGY PHOTOSYNTHESIS */}
      {selectedLab === 'biology' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Photosynthetic Oxygen Evolution Rate Simulation
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Measure oxygen bubble output from aquatic Hydrilla plant as a function of light intensity and CO₂ concentration.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                  <span>Light Intensity (Lux %):</span>
                  <span className="text-emerald-600 text-sm font-black">{lightIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                  <span>CO₂ Concentration (ppm):</span>
                  <span className="text-teal-600 text-sm font-black">{co2Level} ppm</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="800"
                  step="50"
                  value={co2Level}
                  onChange={(e) => setCo2Level(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                Measured Oxygen Gas Bubble Release
              </span>
              <span className="text-4xl font-black text-emerald-700 dark:text-emerald-300">
                {bubbleRate} bubbles / min
              </span>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-400 mt-2 font-medium">
                {bubbleRate > 45 ? 'Optimal Photochemical Velocity' : 'Rate Limited by Substrate / Photons'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
