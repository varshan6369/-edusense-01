import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Student } from '../types';
import {
  Compass,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Target,
  BookOpen,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  Cpu,
  Binary,
  Microscope,
  Atom,
  Building,
  Dna,
} from 'lucide-react';

interface AICareerGuidanceProps {
  student: Student;
  onNavigateTab?: (tab: string) => void;
}

interface CareerPathway {
  id: string;
  title: string;
  domain: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  fitScore: number;
  salaryOutlook: string;
  growthRate: string;
  requiredExams: string[];
  keyStrengths: string[];
  classMilestones: string[];
  recommendedElectives: string[];
}

export const AICareerGuidance: React.FC<AICareerGuidanceProps> = ({ student, onNavigateTab }) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('ai_swe');
  const [selectedStreamFilter, setSelectedStreamFilter] = useState<string>('all');

  const scores = student.examScores || {
    Math: 80,
    Physics: 75,
    Chemistry: 78,
    English: 85,
    ComputerScience: 88,
  };

  const math = scores.Math || 75;
  const physics = scores.Physics || 72;
  const chemistry = scores.Chemistry || 74;
  const cs = (scores as any).ComputerScience || (scores as any)['Comp Sci'] || 80;
  const english = scores.English || 80;

  // Deterministic multi-factor match formulas calibrated to student academic performance
  const careerPathways: CareerPathway[] = [
    {
      id: 'ai_swe',
      title: 'AI, Machine Learning & Software Systems',
      domain: 'Computer Science & AI',
      icon: Cpu,
      description: 'Architecting intelligent algorithms, neural network pipelines, and scalable enterprise computing infrastructures.',
      fitScore: Math.min(99, Math.round(cs * 0.45 + math * 0.35 + physics * 0.20)),
      salaryOutlook: '₹18L - ₹45L / year (Top 10%)',
      growthRate: '+31% YoY (Very High Demand)',
      requiredExams: ['JEE Main & Advanced (IIT/NIT)', 'BITSAT', 'CUET-UG (Top Central Universities)', 'SAT / Olympiads'],
      keyStrengths: [
        `Strong Computer Science aptitude (${cs}%)`,
        `Solid foundational logic & discrete math (${math}%)`,
        `Analytical problem breakdown ability`,
      ],
      classMilestones: [
        'Master Python data structures and algorithmic complexity (Big-O).',
        'Build a verified GitHub project or machine learning pipeline.',
        'Score 90%+ in Class 12 CBSE Board examinations for JEE eligibility.',
      ],
      recommendedElectives: ['Applied Mathematics', 'Computer Science (Python & SQL)', 'Artificial Intelligence (Skill Subject)'],
    },
    {
      id: 'data_quant',
      title: 'Data Science & Quantitative Economics',
      domain: 'Mathematics & Computing',
      icon: Binary,
      description: 'Formulating mathematical predictive models, algorithmic trading systems, and high-frequency analytical frameworks.',
      fitScore: Math.min(99, Math.round(math * 0.50 + cs * 0.30 + english * 0.20)),
      salaryOutlook: '₹16L - ₹40L / year',
      growthRate: '+28% YoY',
      requiredExams: ['ISI Admission Test (Indian Statistical Institute)', 'CMI Entrance Exam', 'JEE Advanced', 'CUET (Economics/Stats)'],
      keyStrengths: [
        `Mathematics foundation score (${math}%)`,
        `Analytical reading & problem articulation (${english}%)`,
        `Algorithmic reasoning proficiency`,
      ],
      classMilestones: [
        'Deepen understanding of calculus, probability theory, and linear algebra.',
        'Learn R or Python data analysis libraries (Pandas, NumPy).',
        'Participate in national mathematics olympiads (RMO / INMO).',
      ],
      recommendedElectives: ['Mathematics', 'Statistics / Applied Mathematics', 'Economics'],
    },
    {
      id: 'aerospace_robotics',
      title: 'Aerospace & Autonomous Robotics Engineering',
      domain: 'Physical Sciences & Engineering',
      icon: Atom,
      description: 'Designing space exploration vehicles, autonomous unmanned aerial drones, and electromechanical navigation systems.',
      fitScore: Math.min(99, Math.round(physics * 0.45 + math * 0.35 + cs * 0.20)),
      salaryOutlook: '₹14L - ₹36L / year',
      growthRate: '+22% YoY',
      requiredExams: ['JEE Advanced (IIT Bombay/Madras Aerospace)', 'IIST Admission Test (ISRO)', 'BITSAT'],
      keyStrengths: [
        `Kinematics and classical mechanics proficiency (${physics}%)`,
        `Vector geometry and differential calculus (${math}%)`,
        `Hardware-software integration curiosity`,
      ],
      classMilestones: [
        'Excel in rotational motion, fluid dynamics, and thermodynamics chapters.',
        'Compete in regional ATL (Atal Tinkering Lab) robotics challenges.',
        'Target Top 3,000 AIR in JEE Advanced for premier aerospace seats.',
      ],
      recommendedElectives: ['Physics', 'Mathematics', 'Engineering Graphics / Coding'],
    },
    {
      id: 'pure_research',
      title: 'Theoretical Physics & Quantum Science Research',
      domain: 'Pure Sciences & Discovery',
      icon: Microscope,
      description: 'Investigating condensed matter physics, quantum computation, and fundamental cosmological laws in national laboratories.',
      fitScore: Math.min(99, Math.round(physics * 0.40 + chemistry * 0.35 + math * 0.25)),
      salaryOutlook: 'Fellowships + Assistant Professorship (IISc / TIFR)',
      growthRate: '+18% Steady Academic Growth',
      requiredExams: ['IAT (IISER Aptitude Test)', 'NEST (National Entrance Screening Test)', 'JEE Advanced (IISc Bangalore)', 'KVPY / Olympiads'],
      keyStrengths: [
        `Conceptual physical science intuition (${physics}%)`,
        `Chemical bonding and stoichiometry clarity (${chemistry}%)`,
        `Inquisitive scientific mindset and hypothesis testing`,
      ],
      classMilestones: [
        'Read peer-reviewed introductory papers on quantum mechanics.',
        'Prepare thoroughly for National Standard Examination in Physics (NSEP).',
        'Maintain high laboratory practical and viva marks.',
      ],
      recommendedElectives: ['Physics', 'Chemistry', 'Higher Mathematics'],
    },
    {
      id: 'biotech_health',
      title: 'Computational Biology & Biomedical Engineering',
      domain: 'Bio-Technology & Health Tech',
      icon: Dna,
      description: 'Engineering prosthetic devices, synthetic genomics, and bioinformatics tools to diagnose and treat complex medical conditions.',
      fitScore: Math.min(99, Math.round(chemistry * 0.40 + physics * 0.30 + math * 0.30)),
      salaryOutlook: '₹12L - ₹32L / year',
      growthRate: '+25% YoY (Healthcare Innovation)',
      requiredExams: ['NEET-UG (Medical & Bio Sciences)', 'JEE Main (Biomedical Engineering)', 'CUET-UG (Biotech)'],
      keyStrengths: [
        `Organic chemistry and atomic structure mastery (${chemistry}%)`,
        `Biophysical principles and instrumentation (${physics}%)`,
        `Interdisciplinary research interest`,
      ],
      classMilestones: [
        'Bridge molecular biology concepts with algorithmic sequence alignment.',
        'Target high percentile in NEET / CUET science entrance tests.',
        'Participate in biotechnology project fairs and science Congresses.',
      ],
      recommendedElectives: ['Chemistry', 'Biology / Biotechnology', 'Physics'],
    },
    {
      id: 'sustainable_architecture',
      title: 'Computational Architecture & Urban Systems',
      domain: 'Design & Spatial Planning',
      icon: Building,
      description: 'Designing zero-carbon smart cities, parametric structural architectures, and energy-positive educational habitats.',
      fitScore: Math.min(99, Math.round(math * 0.40 + english * 0.35 + physics * 0.25)),
      salaryOutlook: '₹10L - ₹28L / year',
      growthRate: '+20% YoY (Green Building)',
      requiredExams: ['NATA (National Aptitude Test in Architecture)', 'JEE Main Paper 2 (B.Arch / B.Plan)', 'CEED / UCEED'],
      keyStrengths: [
        `Spatial 3D visualization and geometry (${math}%)`,
        `Design communication and narrative drafting (${english}%)`,
        `Structural equilibrium and statics understanding (${physics}%)`,
      ],
      classMilestones: [
        'Build a freehand sketching and 3D architectural portfolio.',
        'Practice NATA perspective drawing and aesthetic sensitivity problems.',
        'Study sustainable vernacular Indian architecture principles.',
      ],
      recommendedElectives: ['Mathematics', 'Physics', 'Informatics / Fine Arts'],
    },
  ].sort((a, b) => b.fitScore - a.fitScore);

  const selectedPathway = careerPathways.find((p) => p.id === selectedPathwayId) || careerPathways[0];

  const filteredPathways = selectedStreamFilter === 'all'
    ? careerPathways
    : careerPathways.filter((p) => p.domain.toLowerCase().includes(selectedStreamFilter.toLowerCase()));

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <div className="clay-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-300" />
                AI Career Guidance & Stream Recommender
              </span>
              <span className="text-xs text-indigo-200 font-semibold hidden sm:inline">
                • Circular Theme C Alignment
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Personalized Career Pathways for {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl font-medium leading-relaxed">
              Synthesized by EduSense Career Diagnostic Engine by correlating student marks across Math ({math}%), Physics ({physics}%), Chemistry ({chemistry}%), Comp Sci ({cs}%), and English ({english}%).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('planner')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-indigo-300" />
                <span>Sync to Study Plan</span>
              </button>
            )}
            <div className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-900 text-xs font-black flex items-center justify-center gap-1.5 shadow-md">
              <Sparkles className="w-4 h-4" />
              <span>Top Match: {careerPathways[0].fitScore}% Fit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Pathways Cards + Deep Dive Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Left Column: Pathway Recommendations List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#9B9BB8] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Algorithmic Fit Standings
            </h3>
            <span className="text-[11px] font-bold text-indigo-600">
              {careerPathways.length} STEM Pathways Evaluated
            </span>
          </div>

          {filteredPathways.map((pathway, index) => {
            const Icon = pathway.icon;
            const isSelected = pathway.id === selectedPathway.id;
            const isTopMatch = index === 0;

            return (
              <motion.div
                key={pathway.id}
                onClick={() => setSelectedPathwayId(pathway.id)}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-500 shadow-md ring-2 ring-indigo-600/20'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300'
                }`}
              >
                {isTopMatch && (
                  <span className="absolute top-0 right-0 px-3 py-0.5 rounded-bl-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                    ★ Primary Fit
                  </span>
                )}

                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#9B9BB8] uppercase tracking-wider">
                        {pathway.domain}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-[#1A1A2E] dark:text-white truncate">
                      {pathway.title}
                    </h4>

                    {/* Fit Score Progress Bar */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            pathway.fitScore >= 85
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                              : pathway.fitScore >= 75
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500'
                          }`}
                          style={{ width: `${pathway.fitScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 shrink-0">
                        {pathway.fitScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Pathway Dossier */}
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {/* Header of Selected Pathway */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Career Trajectory Specification
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1A1A2E] dark:text-white">
                {selectedPathway.title}
              </h2>
              <p className="text-xs text-[#4A4A6A] dark:text-slate-300 font-medium max-w-xl">
                {selectedPathway.description}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-center shrink-0 min-w-[110px]">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300 uppercase block">
                Suitability
              </span>
              <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
                {selectedPathway.fitScore}%
              </span>
              <span className="text-[9px] text-[#9B9BB8] font-bold block">
                Calculated Fit
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] font-black text-[#9B9BB8] uppercase tracking-wider block mb-1">
                Projected Compensation (India / Global)
              </span>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                {selectedPathway.salaryOutlook}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] font-black text-[#9B9BB8] uppercase tracking-wider block mb-1">
                Industry Expansion Rate
              </span>
              <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                {selectedPathway.growthRate}
              </p>
            </div>
          </div>

          {/* Key Student Strengths Matching This Pathway */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A2E] dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Why You Match This Pathway
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {selectedPathway.keyStrengths.map((strength, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/30 text-xs text-[#1A1A2E] dark:text-slate-200 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-[11px] leading-snug">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Entrance Examinations & Accreditations */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A2E] dark:text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              Mandatory National Entrance Examinations to Target
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedPathway.requiredExams.map((exam, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#1A1A2E] dark:text-slate-200 text-xs font-black border border-slate-200/60 dark:border-slate-700 flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  {exam}
                </span>
              ))}
            </div>
          </div>

          {/* Class 11 & 12 Actionable Milestones */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A2E] dark:text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Class 11 & 12 Strategic Roadmap
            </h4>
            <div className="space-y-2">
              {selectedPathway.classMilestones.map((milestone, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 text-xs text-[#4A4A6A] dark:text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-xs leading-relaxed">{milestone}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended School Electives */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Recommended Elective Strategy
            </div>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
              To maximize your admission chances for {selectedPathway.title}, select these subject combinations:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedPathway.recommendedElectives.map((elec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-200 text-xs font-bold border border-amber-300 dark:border-amber-800 shadow-2xs"
                >
                  {elec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
