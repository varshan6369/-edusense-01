import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Binary,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Code2,
  ChevronRight,
  BookOpen,
  Cpu,
  Workflow,
  CheckCircle2,
} from 'lucide-react';

export const AlgorithmVisualizer: React.FC = () => {
  const [activeAlgo, setActiveAlgo] = useState<'sorting' | 'binarySearch' | 'panini'>('sorting');

  // Sorting Visualizer State
  const initialArray = [64, 34, 25, 12, 22, 11, 90, 45, 78, 18, 56];
  const [array, setArray] = useState<number[]>(initialArray);
  const [sortingActive, setSortingActive] = useState<boolean>(false);
  const [comparedIndices, setComparedIndices] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [stepExplanation, setStepExplanation] = useState<string>('Select an algorithm and press Run to visualize step-by-step operations.');

  // Binary Search State
  const sortedSearchArray = [12, 24, 35, 48, 59, 67, 73, 85, 91, 104, 118, 130];
  const [targetValue, setTargetValue] = useState<number>(73);
  const [searchLow, setSearchLow] = useState<number | null>(null);
  const [searchHigh, setSearchHigh] = useState<number | null>(null);
  const [searchMid, setSearchMid] = useState<number | null>(null);
  const [searchStatus, setSearchStatus] = useState<string>('Click search to watch binary divide-and-conquer.');

  // Pāṇini Grammar Rule Engine (Aṣṭādhyāyī Morphological Decomposition)
  const paniniExamples = [
    {
      word: 'रामस्य (Rāmasya)',
      root: 'राम (Rāma) + ङस् (ṅas)',
      sutra: 'टाङसिङसामिनात्स्याः (Aṣṭādhyāyī 7.1.12)',
      meaning: 'Genitive singular ("Of Rama"). Sutra substitutes -sya for affix -ṅas after short -a ending stems.',
    },
    {
      word: 'गच्छति (Gacchati)',
      root: 'गम् (Gam) + शप् (śap) + तिप् (tip)',
      sutra: 'इषिगमियमाम् छः (Aṣṭādhyāyī 7.3.77)',
      meaning: 'Present 3rd person singular ("He/She goes"). Root gam transforms to gacch before śap.',
    },
    {
      word: 'विद्यालयः (Vidyālayaḥ)',
      root: 'विद्या (Vidyā) + आलयः (Ālayaḥ)',
      sutra: 'अकः सवर्णे दीर्घः (Aṣṭādhyāyī 6.1.101)',
      meaning: 'Savarna-Dīrgha Sandhi: Merging two homogeneous vowels into a single lengthened vowel.',
    },
  ];
  const [selectedPaniniIndex, setSelectedPaniniIndex] = useState<number>(0);

  // Sorting Animation (Bubble Sort Step Simulator)
  const runBubbleSort = async () => {
    setSortingActive(true);
    const arr = [...array];
    const n = arr.length;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparedIndices([j, j + 1]);
        setStepExplanation(`Comparing index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`);
        await new Promise((r) => setTimeout(r, 260));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          setStepExplanation(`Swapped ${arr[j + 1]} and ${arr[j]} because ${arr[j + 1]} > ${arr[j]}.`);
          await new Promise((r) => setTimeout(r, 260));
        }
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }
    setComparedIndices(null);
    setSortingActive(false);
    setStepExplanation('Array completely sorted in ascending order! O(n²) worst-case complexity.');
  };

  const resetSortingArray = () => {
    setArray([...initialArray]);
    setComparedIndices(null);
    setSortedIndices([]);
    setStepExplanation('Array reset to initial unsorted state.');
  };

  // Binary Search Step Simulator
  const runBinarySearch = async () => {
    let low = 0;
    let high = sortedSearchArray.length - 1;
    setSearchLow(low);
    setSearchHigh(high);

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      setSearchMid(mid);
      setSearchStatus(`Middle index is ${mid} (value: ${sortedSearchArray[mid]}). Target is ${targetValue}.`);
      await new Promise((r) => setTimeout(r, 600));

      if (sortedSearchArray[mid] === targetValue) {
        setSearchStatus(`Target ${targetValue} found at index ${mid} in O(log n) logarithmic time!`);
        return;
      }
      if (sortedSearchArray[mid] < targetValue) {
        setSearchStatus(`${sortedSearchArray[mid]} < ${targetValue} → Discarding left half. Search window: [${mid + 1} .. ${high}].`);
        low = mid + 1;
        setSearchLow(low);
      } else {
        setSearchStatus(`${sortedSearchArray[mid]} > ${targetValue} → Discarding right half. Search window: [${low} .. ${mid - 1}].`);
        high = mid - 1;
        setSearchHigh(high);
      }
      await new Promise((r) => setTimeout(r, 600));
    }
    setSearchStatus(`Target ${targetValue} was not found in the array.`);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Banner */}
      <div className="clay-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-indigo-400" />
                Theme B: Computational Thinking & Code Visualizer
              </span>
              <span className="text-xs text-indigo-300 font-semibold hidden sm:inline">
                • Pāṇini Computational Linguistics & Sorting
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Interactive Algorithm & Linguistics Simulator
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium max-w-2xl leading-relaxed">
              Step-by-step visual dissection of fundamental sorting, divide-and-conquer search, and the historical computational grammar rules of Pāṇini.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setActiveAlgo('sorting')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeAlgo === 'sorting' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Sorting
            </button>
            <button
              onClick={() => setActiveAlgo('binarySearch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeAlgo === 'binarySearch' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Binary Search
            </button>
            <button
              onClick={() => setActiveAlgo('panini')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeAlgo === 'panini' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Pāṇini Linguistics
            </button>
          </div>
        </div>
      </div>

      {/* MODULE 1: SORTING VISUALIZER */}
      {activeAlgo === 'sorting' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Bubble Sort Dynamic Bar Representation
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Time Complexity: Worst O(n²) • Space Complexity: O(1) in-place
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetSortingArray}
                disabled={sortingActive}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={runBubbleSort}
                disabled={sortingActive}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{sortingActive ? 'Sorting...' : 'Run Bubble Sort'}</span>
              </button>
            </div>
          </div>

          {/* Bar Chart Area */}
          <div className="h-64 flex items-end justify-center gap-2 sm:gap-3 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {array.map((val, idx) => {
              const isCompared = comparedIndices && (comparedIndices[0] === idx || comparedIndices[1] === idx);
              const isSorted = sortedIndices.includes(idx);

              let barColor = 'bg-indigo-500';
              if (isCompared) barColor = 'bg-amber-500 ring-2 ring-amber-400';
              if (isSorted) barColor = 'bg-emerald-500';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 max-w-[42px] h-full justify-end">
                  <span className="text-[10px] font-black text-slate-600 dark:text-slate-400">
                    {val}
                  </span>
                  <motion.div
                    layout
                    style={{ height: `${(val / 100) * 100}%` }}
                    className={`w-full rounded-t-xl transition-colors duration-200 ${barColor}`}
                  />
                  <span className="text-[9px] font-mono text-slate-400">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {/* Step Explanation Banner */}
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
              {stepExplanation}
            </p>
          </div>
        </div>
      )}

      {/* MODULE 2: BINARY SEARCH VISUALIZER */}
      {activeAlgo === 'binarySearch' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Binary Search Logarithmic Interval Reduction
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Time Complexity: O(log n) • Sorted Array Requirement
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Target:</span>
                <select
                  value={targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value))}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-black border-none"
                >
                  {sortedSearchArray.map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                  <option value={999}>999 (Not Present)</option>
                </select>
              </div>

              <button
                onClick={runBinarySearch}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Array Cell Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
            {sortedSearchArray.map((val, idx) => {
              const isMid = searchMid === idx;
              const isTargetFound = isMid && val === targetValue;
              const isOutOfRange =
                (searchLow !== null && idx < searchLow) || (searchHigh !== null && idx > searchHigh);

              let cellStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white';
              if (isOutOfRange) cellStyle = 'opacity-30 bg-slate-100 dark:bg-slate-950/60 line-through';
              if (isMid) cellStyle = 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-400';
              if (isTargetFound) cellStyle = 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-300';

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between h-20 ${cellStyle}`}
                >
                  <span className="text-[9px] font-mono opacity-60">[{idx}]</span>
                  <span className="text-base font-black">{val}</span>
                  <span className="text-[8px] font-bold uppercase tracking-wider">
                    {searchLow === idx ? 'LOW' : searchHigh === idx ? 'HIGH' : isMid ? 'MID' : ''}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Search Status Banner */}
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-xs font-semibold text-indigo-900 dark:text-indigo-200">
            {searchStatus}
          </div>
        </div>
      )}

      {/* MODULE 3: PĀṆINI COMPUTATIONAL LINGUISTICS */}
      {activeAlgo === 'panini' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                Ancient Formal Grammar Precursor to BNF
              </span>
            </div>
            <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
              Pāṇinian Morphological Decomposition Engine
            </h3>
            <p className="text-xs text-[#9B9BB8] font-medium">
              4th century BCE generative grammar recognized by modern computer scientists (Backus-Naur Form precursor).
            </p>
          </div>

          {/* Example Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {paniniExamples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPaniniIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedPaniniIndex === idx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {ex.word}
              </button>
            ))}
          </div>

          {/* Linguistic Rule Breakdown Box */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-amber-900 dark:text-amber-300">
                {paniniExamples[selectedPaniniIndex].word}
              </span>
              <span className="text-xs font-mono bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-amber-200 font-bold text-amber-900 dark:text-amber-200">
                {paniniExamples[selectedPaniniIndex].sutra}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/70 dark:border-amber-900/30">
                <span className="text-[10px] font-bold text-[#9B9BB8] uppercase tracking-wider block mb-1">
                  Morphological Formula (Dhatu / Pratipadika + Pratyaya)
                </span>
                <p className="text-sm font-mono font-black text-indigo-600 dark:text-indigo-400">
                  {paniniExamples[selectedPaniniIndex].root}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/70 dark:border-amber-900/30">
                <span className="text-[10px] font-bold text-[#9B9BB8] uppercase tracking-wider block mb-1">
                  Computational Rule Explanation
                </span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                  {paniniExamples[selectedPaniniIndex].meaning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
