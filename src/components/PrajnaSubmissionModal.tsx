import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  FileText,
  Download,
  CheckCircle2,
  X,
  Award,
  BookOpen,
  Calendar,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface PrajnaSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrajnaSubmissionModal: React.FC<PrajnaSubmissionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@chinmayaeducationcell.org');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl h-[92vh] max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col font-sans overflow-hidden animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner (Shrink-0) */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 text-white p-5 sm:p-7 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/25 hover:bg-black/50 text-white transition-all cursor-pointer z-10"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Award className="w-3.5 h-3.5" /> Prajñā (प्रज्ञा) Journal 2026
            </span>
            <span className="text-amber-200 text-xs font-semibold hidden sm:inline">
              Central Chinmaya Mission Trust (CCMT) Ed Cell
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-snug">
            Official Journal Article & Competition Submission Package
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1 max-w-2xl">
            Sutantra Goshti 2026 · Residential Workshop at CIRS, Coimbatore · Deadline: 30th September 2026
          </p>
        </div>

        {/* Modal Scrollable Body (flex-1 min-h-0 overflow-y-auto) */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 min-h-0 space-y-6 text-[#1A1A2E] dark:text-slate-100">
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white">
                  MS Word Document (.DOC) Ready for Submission
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                  Times New Roman 12pt · 1.5 Spacing · Complete CCMT Circular Specifications
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/EduSense_Prajna_Journal_Submission_2026.doc"
                download="EduSense_Prajna_Journal_Submission_2026.doc"
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download .DOC Manuscript
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 hover:bg-amber-100/50 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Mail className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
                {copiedEmail ? 'Email Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>

          {/* Submission Specifications Compliance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Word Limit</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">1,248 Words</span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">800–1500 range (PASS)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Format & Font</span>
              <span className="text-base font-black text-slate-800 dark:text-white">Times New Roman</span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">12pt, 1.5 Spacing (.DOC)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Category</span>
              <span className="text-base font-black text-indigo-600 dark:text-indigo-400">Category B</span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">For Teachers & Staff</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Target Deadline</span>
              <span className="text-base font-black text-rose-600 dark:text-rose-400">30 Sep 2026</span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Final Call for Entries</span>
            </div>
          </div>

          {/* Manuscript Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">
                Paper Title & Structure
              </h3>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                "EduSense: An Explainable Machine Learning Decision-Support System for Early Academic Risk Intervention and Student Metacognitive Development"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Author:</span> Vinoth D (PGT Computer Science & AI Lead)
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Institution:</span> Chinmaya Vidyalaya / Vision School
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Contact:</span> vinothdvino1984@gmail.com | +91 98400 12345
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Empirical Baseline:</span> Kaggle Student Performance Benchmark
                </div>
              </div>
            </div>
          </div>

          {/* Key Tested Features Aligned with Prajñā Themes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">
                Alignment with Prajñā (CCMT) Themes
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Theme A: School Education & Question Bank</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  AI Study Planner (7-day revision generator) & STEM Digital Question Bank with step-by-step reasoning.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Theme B: Computational Thinking & Code</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Interactive Sorting & Binary Search Visualizer + Pāṇinian morphological computational grammar engine.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Theme C: AI & Career Guidance Tools</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Deterministic ML Exam Risk Predictor + AI Career & Stream Recommender correlated to student scores.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Theme D: Virtual Science Labs & Wellness</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real-time Ohm's Law circuit, pH titration curve, photosynthesis simulator & Mindful Focus Tracker.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Theme E: Administration & Campus Hub</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  4-mode Teacher Triage Queue, Digital Library circulation, live bus fleet GPS, and green solar telemetry.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Circular Lead: Indian Knowledge (IKS)</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Vedic Math speed multiplication sutras, Sanskrit Sloka audio phonetics & Chinmaya Vision Programme.
                </p>
              </div>
            </div>
          </div>

          {/* Principal Undertaking Certificate Callout */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
              <ShieldCheck className="w-4 h-4" />
              Certificate of Undertaking & Originality Included
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              The downloaded MS Word document includes the complete official Annexure with candidate declarations, originality affirmations, and the Principal's verification & school seal signatory blocks.
            </p>
          </div>
        </div>

        {/* Footer Action (Shrink-0) */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 shrink-0">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Target Email: <strong className="text-slate-800 dark:text-white">info@chinmayaeducationcell.org</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-xs cursor-pointer"
            >
              Close
            </button>
            <a
              href="/EduSense_Prajna_Journal_Submission_2026.doc"
              download="EduSense_Prajna_Journal_Submission_2026.doc"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download .DOC Now
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
