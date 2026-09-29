import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  BookOpen,
  Filter,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
  Flame,
  Brain,
  RotateCcw,
  Tag,
  Check,
  Award,
  Layers,
  Search,
} from 'lucide-react';

interface QuestionItem {
  id: string;
  subject: 'Mathematics' | 'Physics' | 'Chemistry' | 'Computer Science';
  topic: string;
  difficulty: 'Foundational' | 'Board Exam' | 'Competitive';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTag: string;
}

const QUESTION_BANK: QuestionItem[] = [
  {
    id: 'm1',
    subject: 'Mathematics',
    topic: 'Calculus & Derivatives',
    difficulty: 'Board Exam',
    question: 'What is the derivative of f(x) = x³ · sin(x) with respect to x?',
    options: [
      '3x² · cos(x)',
      '3x² · sin(x) + x³ · cos(x)',
      'x³ · cos(x) - 3x² · sin(x)',
      '3x² · sin(x) - x³ · cos(x)',
    ],
    correctIndex: 1,
    explanation: 'By the product rule: (u·v)\' = u\'v + uv\'. Here u = x³ (u\' = 3x²) and v = sin(x) (v\' = cos(x)). Thus, f\'(x) = 3x²·sin(x) + x³·cos(x).',
    examTag: 'CBSE Class 12 Calculus',
  },
  {
    id: 'm2',
    subject: 'Mathematics',
    topic: 'Matrices & Determinants',
    difficulty: 'Foundational',
    question: 'If A is a square matrix of order 3 such that det(A) = 4, then what is det(2A)?',
    options: ['8', '16', '32', '64'],
    correctIndex: 2,
    explanation: 'For a square matrix A of order n, det(k·A) = kⁿ · det(A). Here order n = 3 and k = 2, so det(2A) = 2³ · 4 = 8 · 4 = 32.',
    examTag: 'Board Standard Objective',
  },
  {
    id: 'p1',
    subject: 'Physics',
    topic: 'Kinematics & Projectiles',
    difficulty: 'Board Exam',
    question: 'At what angle of projection with the horizontal is the horizontal range of a projectile equal to its maximum height?',
    options: ['θ = 45°', 'θ = tan⁻¹(4)', 'θ = tan⁻¹(2)', 'θ = 60°'],
    correctIndex: 1,
    explanation: 'R = u²·sin(2θ)/g and H = u²·sin²(θ)/(2g). Setting R = H gives 2·sin(θ)·cos(θ) = sin²(θ)/2, which simplifies to tan(θ) = 4, so θ = tan⁻¹(4) ≈ 76°.',
    examTag: 'CBSE / JEE Main Kinematics',
  },
  {
    id: 'p2',
    subject: 'Physics',
    topic: 'Thermodynamics & Heat',
    difficulty: 'Competitive',
    question: 'A Carnot engine operates between temperatures 500 K and 300 K. What is the theoretical efficiency of this cycle?',
    options: ['20%', '40%', '60%', '80%'],
    correctIndex: 1,
    explanation: 'Efficiency η = 1 - (T_cold / T_hot) = 1 - (300 / 500) = 1 - 0.60 = 0.40 or 40%.',
    examTag: 'JEE / NEET Thermodynamics',
  },
  {
    id: 'c1',
    subject: 'Chemistry',
    topic: 'Chemical Bonding & Hybridization',
    difficulty: 'Foundational',
    question: 'What is the hybridization and geometric shape of the SF₆ (Sulfur Hexafluoride) molecule?',
    options: [
      'sp³d² — Octahedral',
      'sp³d — Trigonal Bipyramidal',
      'sp³ — Tetrahedral',
      'dsp² — Square Planar',
    ],
    correctIndex: 0,
    explanation: 'Sulfur has 6 valence electrons and forms 6 single bonds with Fluorine atoms with zero lone pairs. Steric number = 6 corresponds to sp³d² hybridization with regular octahedral geometry.',
    examTag: 'CBSE Class 11 Chemistry',
  },
  {
    id: 'c2',
    subject: 'Chemistry',
    topic: 'Electrochemistry',
    difficulty: 'Competitive',
    question: 'According to Nernst Equation, if the concentration of Zn²⁺ ions in a Daniell cell is increased tenfold at 298 K, how does the cell potential change?',
    options: [
      'Decreases by 0.0591 V',
      'Decreases by 0.0295 V',
      'Increases by 0.0295 V',
      'Remains unchanged',
    ],
    correctIndex: 1,
    explanation: 'In Daniell cell: E_cell = E° - (0.0591/2) · log([Zn²⁺]/[Cu²⁺]). An increase of [Zn²⁺] by a factor of 10 increases the log term by 1, reducing the potential by 0.0591 / 2 = 0.0295 V.',
    examTag: 'CBSE Board & JEE Electrochemistry',
  },
  {
    id: 'cs1',
    subject: 'Computer Science',
    topic: 'Algorithm Complexity & Big-O',
    difficulty: 'Competitive',
    question: 'What is the worst-case time complexity of QuickSort when the pivot chosen is always the extreme (minimum or maximum) element?',
    options: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)'],
    correctIndex: 1,
    explanation: 'When the partition is unbalanced at each step (e.g. sorted array with first element as pivot), the recurrence is T(n) = T(n-1) + O(n), yielding worst-case O(n²).',
    examTag: 'CS Board & Olympiad Theory',
  },
  {
    id: 'cs2',
    subject: 'Computer Science',
    topic: 'Python Object-Oriented Programming',
    difficulty: 'Board Exam',
    question: 'In Python, which dunder (magic) method is invoked when converting an object to its human-readable string representation?',
    options: ['__init__()', '__str__()', '__repr__()', '__call__()'],
    correctIndex: 1,
    explanation: '__str__() is called by str(object) and print(object) to return an informal, readable string representation. __repr__() is intended for unambiguous debugging representations.',
    examTag: 'CBSE Class 12 Computer Science',
  },
];

interface DigitalQuestionBankProps {
  onNavigateTab?: (tab: string) => void;
}

export const DigitalQuestionBank: React.FC<DigitalQuestionBankProps> = ({ onNavigateTab }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science'];
  const difficulties = ['All', 'Foundational', 'Board Exam', 'Competitive'];

  const filteredQuestions = QUESTION_BANK.filter((q) => {
    const matchesSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesQuery =
      searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.examTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesDifficulty && matchesQuery;
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // already answered

    const question = QUESTION_BANK.find((q) => q.id === questionId);
    if (!question) return;

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setRevealedExplanations((prev) => ({ ...prev, [questionId]: true }));
    setAnsweredCount((prev) => prev + 1);

    if (optionIndex === question.correctIndex) {
      setScore((prev) => prev + 10);
    }
  };

  const handleResetSession = () => {
    setSelectedAnswers({});
    setRevealedExplanations({});
    setScore(0);
    setAnsweredCount(0);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Banner */}
      <div className="clay-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-52 h-52 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                Digital Question Bank App
              </span>
              <span className="text-xs text-indigo-300 font-semibold hidden sm:inline">
                • Circular Theme A Alignment
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Class 11 & 12 STEM Digital Question Bank
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium max-w-2xl leading-relaxed">
              Curated conceptual question bank mapped to CBSE, JEE, and NEET blueprints with instant step-by-step mathematical reasoning.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 text-center">
              <span className="text-[10px] font-bold text-indigo-300 uppercase block">Practice XP</span>
              <span className="text-xl font-black text-amber-400">+{score} XP</span>
            </div>
            <button
              onClick={handleResetSession}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="Reset Practice Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="clay-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-indigo-600 shrink-0 ml-1" />
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                selectedSubject === subj
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                Difficulty: {diff}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or formula..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 clay-card">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No questions found matching the selected filter.
            </p>
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-black text-indigo-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const hasAnswered = selectedAnswers[q.id] !== undefined;
            const chosenAnswer = selectedAnswers[q.id];
            const isCorrect = chosenAnswer === q.correctIndex;
            const isRevealed = revealedExplanations[q.id];

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="clay-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {q.subject}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {q.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        q.difficulty === 'Foundational'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : q.difficulty === 'Board Exam'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      {q.examTag}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-bold text-[#1A1A2E] dark:text-white leading-relaxed">
                  {q.question}
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosenAnswer === optIdx;
                    const isRightOption = optIdx === q.correctIndex;

                    let btnClass = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

                    if (hasAnswered) {
                      if (isRightOption) {
                        btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-black';
                      } else if (isSelected && !isRightOption) {
                        btnClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 line-through';
                      } else {
                        btnClass = 'opacity-50 border-slate-200 dark:border-slate-800';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={hasAnswered}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="font-semibold">{opt}</span>
                        </span>

                        {hasAnswered && isRightOption && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {hasAnswered && isSelected && !isRightOption && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-black text-indigo-900 dark:text-indigo-300">
                        <Brain className="w-4 h-4 text-indigo-600" />
                        <span>Step-by-Step Mathematical Explanation</span>
                      </div>
                      <span className="text-[11px] font-extrabold text-emerald-600">
                        {isCorrect ? '✓ Correct (+10 XP)' : '✗ Incorrect Concept'}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {q.explanation}
                    </p>

                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab('copilot')}
                        className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <span>Ask AI Copilot for deeper breakdown</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
