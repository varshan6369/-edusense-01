import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Calculator,
  Compass,
  CheckCircle2,
  Layers,
  Heart,
  Globe,
  Sun,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const IndianKnowledgeSystems: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vedicMath' | 'slokas' | 'cvp'>('vedicMath');

  // Vedic Math State
  const [vedicSutra, setVedicSutra] = useState<'sutra1' | 'sutra2' | 'sutra3'>('sutra1');
  const [numEndingFive, setNumEndingFive] = useState<number>(75);
  const [baseNumA, setBaseNumA] = useState<number>(97);
  const [baseNumB, setBaseNumB] = useState<number>(94);

  // Sloka Pronunciation State
  const slokas = [
    {
      title: 'Bhagavad Gītā 4.38 — Supremacy of Knowledge',
      devanagari: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥',
      transliteration: 'na hi jñānena sadṛśaṁ pavitram-iha vidyate |\ntat-svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati ||',
      meaning: 'In this world, there is nothing as purifying as transcendental knowledge. One who becomes perfected through yoga finds this wisdom within the self in due course of time.',
      pillar: 'Integrated Intellectual Development',
    },
    {
      title: 'Taittirīya Upaniṣad — Ethical Code of Learning',
      devanagari: 'सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ॥',
      transliteration: 'satyaṁ vada | dharmaṁ cara | svādhyāyān-mā pramadaḥ ||',
      meaning: 'Speak the truth. Practice righteousness. Never neglect your daily self-study and pursuit of wisdom.',
      pillar: 'Indian Culture & Values',
    },
    {
      title: 'Śānti Mantra — Universal Peace & Harmony',
      devanagari: 'ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ।\nतेजस्वि नावधीतमस्तु मा विद्विषावहै ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'oṁ saha nāvavatu | saha nau bhunaktu | saha vīryaṁ karavāvahai |\ntejasvi nāvadhītam-astu mā vidviṣāvahai ||\noṁ śāntiḥ śāntiḥ śāntiḥ ||',
      meaning: 'May the Divine protect teacher and student together. May our learning be brilliant and illumined. May we never harbor animosity. Peace, peace, peace.',
      pillar: 'Universal Outlook',
    },
  ];
  const [selectedSlokaIndex, setSelectedSlokaIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handleSpeakSloka = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  // Vedic Math Calculations
  const calculateEndingFive = (val: number) => {
    const tens = Math.floor(val / 10);
    const leftPart = tens * (tens + 1);
    const rightPart = 25;
    return {
      tens,
      leftPart,
      rightPart,
      total: leftPart * 100 + rightPart,
    };
  };
  const endingFiveResult = calculateEndingFive(numEndingFive);

  const calculateNikhilam = (a: number, b: number) => {
    const defA = 100 - a;
    const defB = 100 - b;
    const leftPart = a - defB;
    const rightPart = defA * defB;
    const rightStr = rightPart < 10 ? `0${rightPart}` : `${rightPart}`;
    return {
      defA,
      defB,
      leftPart,
      rightPart,
      rightStr,
      total: leftPart * 100 + rightPart,
    };
  };
  const nikhilamResult = calculateNikhilam(baseNumA, baseNumB);

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Banner */}
      <div className="clay-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-amber-950 via-orange-950 to-indigo-950 text-white">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/30 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Indian Knowledge Systems & Chinmaya Vision Programme
              </span>
              <span className="text-xs text-amber-300 font-semibold hidden sm:inline">
                • Circular Lead Theme
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Indian Knowledge Systems (IKS) & Vedic Math
            </h1>
            <p className="text-xs sm:text-sm text-amber-200 font-medium max-w-2xl leading-relaxed">
              Bridging ancient mathematical speed algorithms, Upaniṣadic moral pedagogy, and Sanskrit computational phonetics.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setActiveTab('vedicMath')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'vedicMath' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" /> Vedic Math
            </button>
            <button
              onClick={() => setActiveTab('slokas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'slokas' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" /> Sanskrit Slokas
            </button>
            <button
              onClick={() => setActiveTab('cvp')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cvp' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> CVP Values
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: VEDIC MATHEMATICS */}
      {activeTab === 'vedicMath' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Vedic Speed Mental Calculation Engine
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Derived from the 16 Sutras of Swami Bharati Krishna Tirtha for lightning-fast mental arithmetic.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setVedicSutra('sutra1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vedicSutra === 'sutra1' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Ekādhikena (Ending in 5)
              </button>
              <button
                onClick={() => setVedicSutra('sutra2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vedicSutra === 'sutra2' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Nikhilam (Base 100)
              </button>
            </div>
          </div>

          {/* Sutra 1 Demonstration */}
          {vedicSutra === 'sutra1' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-1">
                  Sutra 1: एकाधिकेन पूर्वेण (Ekādhikena Pūrveṇa) — "By one more than the previous one"
                </span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Instant formula for squaring any number ending in 5: Multiply the preceding digit <code className="font-bold">n</code> by <code className="font-bold">n+1</code>, then append <code className="font-bold">25</code>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select a number ending in 5:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[15, 25, 35, 45, 65, 75, 85, 95, 105, 115].map((val) => (
                    <button
                      key={val}
                      onClick={() => setNumEndingFive(val)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        numEndingFive === val
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Decomposition Card */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Step 1: Left Portion</span>
                  <span className="text-lg font-mono font-bold text-slate-700 dark:text-slate-300">
                    {endingFiveResult.tens} × ({endingFiveResult.tens} + 1) =
                  </span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 ml-2">
                    {endingFiveResult.leftPart}
                  </span>
                </div>

                <div className="text-2xl font-black text-slate-300 dark:text-slate-700">+</div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Step 2: Right Portion</span>
                  <span className="text-lg font-mono font-bold text-slate-700 dark:text-slate-300">5² =</span>
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 ml-2">25</span>
                </div>

                <div className="text-2xl font-black text-slate-300 dark:text-slate-700">=</div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-300 shadow-sm">
                  <span className="text-[10px] font-black text-amber-600 uppercase block">Final Result ({numEndingFive}²)</span>
                  <span className="text-3xl font-black text-[#1A1A2E] dark:text-white">
                    {endingFiveResult.total}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Sutra 2 Demonstration */}
          {vedicSutra === 'sutra2' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-1">
                  Sutra 2: निखिलं नवतश्चरमं दशतः (Nikhilaṁ Navataścaramaṁ Daśataḥ) — "All from 9 and the last from 10"
                </span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Multiply numbers close to base 100 in 2 seconds by cross-subtracting their deficits and multiplying deficits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Number A (near 100):</label>
                  <input
                    type="number"
                    min="85"
                    max="99"
                    value={baseNumA}
                    onChange={(e) => setBaseNumA(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Number B (near 100):</label>
                  <input
                    type="number"
                    min="85"
                    max="99"
                    value={baseNumB}
                    onChange={(e) => setBaseNumB(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Deficits from 100</span>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    d₁ = -{nikhilamResult.defA} • d₂ = -{nikhilamResult.defB}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Cross-Subtraction (Left)</span>
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {baseNumA} - {nikhilamResult.defB} = {nikhilamResult.leftPart}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Deficit Product (Right)</span>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {nikhilamResult.defA} × {nikhilamResult.defB} = {nikhilamResult.rightStr}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-300 shadow-sm">
                  <span className="text-[10px] font-black text-amber-600 uppercase block">
                    Product ({baseNumA} × {baseNumB})
                  </span>
                  <span className="text-3xl font-black text-[#1A1A2E] dark:text-white">
                    {nikhilamResult.total}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SANSKRIT SLOKAS & PHONETICS */}
      {activeTab === 'slokas' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Sanskrit Sloka Pronunciation & Universal Wisdom
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Audio synthesized recitations, transliteration, and ethical reflections.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {slokas.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSlokaIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedSlokaIndex === idx
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  {s.pillar}
                </span>
                <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">
                  {s.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Selected Sloka Display Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                {slokas[selectedSlokaIndex].title}
              </span>
              <button
                onClick={() => handleSpeakSloka(slokas[selectedSlokaIndex].transliteration)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                <span>{isPlayingAudio ? 'Chanting...' : 'Listen Pronunciation'}</span>
              </button>
            </div>

            {/* Devanagari */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/40 shadow-xs text-center">
              <p className="text-lg sm:text-2xl font-bold font-serif text-slate-900 dark:text-amber-100 whitespace-pre-line leading-relaxed">
                {slokas[selectedSlokaIndex].devanagari}
              </p>
            </div>

            {/* Transliteration */}
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 italic text-center whitespace-pre-line leading-relaxed">
              {slokas[selectedSlokaIndex].transliteration}
            </p>

            {/* Meaning */}
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/30 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              <strong className="text-amber-900 dark:text-amber-300">Philosophical Meaning: </strong>
              {slokas[selectedSlokaIndex].meaning}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHINMAYA VISION PROGRAMME (CVP) */}
      {activeTab === 'cvp' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
              Chinmaya Vision Programme (CVP) Four-Pillar Framework
            </h3>
            <p className="text-xs text-[#9B9BB8] font-medium">
              The foundational pedagogical architecture guiding CCMT schools worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-black text-sm">
                <Award className="w-5 h-5" />
                <span>1. Integrated Development</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Nurtures physical fitness, emotional resilience, intellectual sharpness, and spiritual centering. Balanced daily study routines prevent academic burnout.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-black text-sm">
                <Sun className="w-5 h-5" />
                <span>2. Indian Culture</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Grounds students in rich indigenous heritage, Vedic mathematics, classical Sanskrit computational structures, and deep appreciation for noble ancestral traditions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-black text-sm">
                <Heart className="w-5 h-5" />
                <span>3. Patriotic Fervor</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Inspires genuine love for the motherland, national pride, and dedication to constructive technological and scientific contributions for nation-building.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-sm">
                <Globe className="w-5 h-5" />
                <span>4. Universal Outlook</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Cultivates the timeless ethos of <em>Vasudhaiva Kuṭumbakam</em> ("The whole world is one family"), embracing international scientific collaboration with ethical humility.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
