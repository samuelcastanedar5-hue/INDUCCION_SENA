import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Printer, 
  QrCode, 
  Download, 
  ShieldCheck, 
  Share2, 
  Sparkles, 
  Calendar, 
  Building, 
  User, 
  GraduationCap,
  Clock,
  Trophy,
  Flame,
  Zap,
  Check,
  X,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Scale,
  FileCheck,
  AlertTriangle,
  Compass,
  HelpCircle,
  Play,
  Search,
  Hash,
  Mail,
  FileText,
  Layers
} from 'lucide-react';
import { REGULATION_QUESTIONS, REGULATION_SECTIONS, BENCHMARK_LEADERBOARD } from '../data/regulationQuestions';
import { ApprenticeProfile, InductionProgress, RegulationSectionQuestion, GamifiedRankingEntry } from '../types/induction';
import { saveApprenticeSubmission, QuizAnswerDetail } from '../services/adminService';

interface EvaluationAndCredentialModuleProps {
  profile: ApprenticeProfile;
  progress: InductionProgress;
  onUpdateQuizResult: (
    score: number, 
    passed: boolean, 
    extra?: { 
      gamifiedPoints?: number; 
      totalTimeSeconds?: number; 
      correctAnswersCount?: number; 
      maxStreak?: number 
    }
  ) => void;
  onOpenProfile: () => void;
  onUpdateProfile?: (updatedProfile: ApprenticeProfile) => void;
  onNavigateToDriveRegistry?: () => void;
}

export const EvaluationAndCredentialModule: React.FC<EvaluationAndCredentialModuleProps> = ({
  profile,
  progress,
  onUpdateQuizResult,
  onOpenProfile,
  onUpdateProfile,
  onNavigateToDriveRegistry,
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'evaluacion' | 'ranking' | 'carnet' | 'certificado'>(
    progress.quizCompleted ? 'carnet' : 'evaluacion'
  );

  // Apprentice local editing form in Phase A
  const [editForm, setEditForm] = useState<ApprenticeProfile>({
    ...profile,
    email: profile.email || `${profile.fullName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '') || 'aprendiz'}@soy.sena.edu.co`
  });
  const [formSaved, setFormSaved] = useState(false);

  // Evaluation lifecycle state: 'register' | 'in_progress' | 'completed'
  const [evalPhase, setEvalPhase] = useState<'register' | 'in_progress' | 'completed'>(
    progress.quizCompleted ? 'completed' : 'register'
  );

  // Active question index (0 to 24)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  
  // Selected answers: { [questionId: number]: optionIndex }
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // Question submission feedback state
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState<boolean>(false);
  const [selectedOptionForCurrent, setSelectedOptionForCurrent] = useState<number | null>(null);

  // Gamification state
  const [scorePoints, setScorePoints] = useState<number>(progress.gamifiedPoints || 0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(progress.maxStreak || 0);
  const [correctCount, setCorrectCount] = useState<number>(progress.correctAnswersCount || 0);

  // Chronometer / Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(progress.totalTimeSeconds || 0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [lastQuestionSpeedSeconds, setLastQuestionSpeedSeconds] = useState<number>(0);
  const [lastSpeedBonus, setLastSpeedBonus] = useState<number>(0);
  const [lastStreakMultiplier, setLastStreakMultiplier] = useState<number>(1);

  // Confetti / Celebration trigger state
  const [showCelebrationBadge, setShowCelebrationBadge] = useState<boolean>(false);

  // Leaderboard filter
  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'my_token'>('all');

  // Timer interval effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Sync profile if external profile changed
  useEffect(() => {
    setEditForm((prev) => ({
      ...profile,
      email: profile.email || prev.email || `${profile.fullName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '') || 'aprendiz'}@soy.sena.edu.co`
    }));
  }, [profile]);

  // Format seconds into MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion: RegulationSectionQuestion = REGULATION_QUESTIONS[currentQuestionIdx];

  // Start the evaluation after confirming data
  const handleStartEvaluation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile(editForm);
    }
    setFormSaved(true);
    setAnswers({});
    setCurrentQuestionIdx(0);
    setScorePoints(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setElapsedSeconds(0);
    setHasAnsweredCurrent(false);
    setSelectedOptionForCurrent(null);
    setQuestionStartTime(Date.now());
    setIsTimerRunning(true);
    setEvalPhase('in_progress');
  };

  // Trainee selects an option
  const handleSelectOption = (optionIdx: number) => {
    if (hasAnsweredCurrent) return; // Already confirmed for this question

    const now = Date.now();
    const durationSeconds = Math.max(1, Math.round((now - questionStartTime) / 1000));
    setLastQuestionSpeedSeconds(durationSeconds);

    setSelectedOptionForCurrent(optionIdx);
    setHasAnsweredCurrent(true);

    const isCorrect = optionIdx === currentQuestion.correctAnswerIndex;
    const newAnswers = { ...answers, [currentQuestion.id]: optionIdx };
    setAnswers(newAnswers);

    if (isCorrect) {
      // Base points
      const basePts = 100;
      
      // Speed bonus: answering in < 15s earns bonus
      const speedBonus = durationSeconds <= 15 ? (15 - durationSeconds) * 4 : 0;
      setLastSpeedBonus(speedBonus);

      // Streak calculation
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      if (nextStreak > maxStreak) {
        setMaxStreak(nextStreak);
      }

      // Streak multiplier: 1=1.0x, 2=1.2x, 3=1.4x, 4=1.7x, 5+=2.0x
      let multiplier = 1.0;
      if (nextStreak === 2) multiplier = 1.2;
      else if (nextStreak === 3) multiplier = 1.4;
      else if (nextStreak === 4) multiplier = 1.7;
      else if (nextStreak >= 5) multiplier = 2.0;
      setLastStreakMultiplier(multiplier);

      const questionTotalPts = Math.round((basePts + speedBonus) * multiplier);
      setScorePoints((prev) => prev + questionTotalPts);
      setCorrectCount((prev) => prev + 1);

      // Trigger celebration
      setShowCelebrationBadge(true);
      setTimeout(() => setShowCelebrationBadge(false), 2400);
    } else {
      // Reset streak on error, 0 points for this question
      setCurrentStreak(0);
      setLastSpeedBonus(0);
      setLastStreakMultiplier(1.0);
    }
  };

  // Advance to next question or complete evaluation
  const handleNextQuestion = () => {
    if (currentQuestionIdx < REGULATION_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setHasAnsweredCurrent(false);
      setSelectedOptionForCurrent(null);
      setQuestionStartTime(Date.now());
    } else {
      // Evaluation Completed!
      finishEvaluation();
    }
  };

  // Complete and save submission
  const finishEvaluation = () => {
    setIsTimerRunning(false);
    setEvalPhase('completed');

    const totalQuestions = REGULATION_QUESTIONS.length;
    // Calculate final correct count
    let finalCorrect = 0;
    REGULATION_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        finalCorrect += 1;
      }
    });

    const scorePercentage = Math.round((finalCorrect / totalQuestions) * 100);
    const passed = scorePercentage >= 70;

    // Bonus for perfect score
    let finalPoints = scorePoints;
    if (finalCorrect === totalQuestions) {
      finalPoints += 500; // Perfect accuracy bonus
    } else if (scorePercentage >= 90) {
      finalPoints += 250;
    }
    setScorePoints(finalPoints);

    // Build breakdown by Section
    const sectionScores: Record<string, { correct: number; total: number; title: string }> = {};
    REGULATION_SECTIONS.forEach((sec) => {
      const sectionQuestions = REGULATION_QUESTIONS.filter((q) => q.sectionNumber === sec.number);
      const sectionCorrect = sectionQuestions.filter((q) => answers[q.id] === q.correctAnswerIndex).length;
      sectionScores[sec.number] = {
        correct: sectionCorrect,
        total: sectionQuestions.length,
        title: sec.title
      };
    });

    // Build detailed answers
    const detailedAnswers: QuizAnswerDetail[] = REGULATION_QUESTIONS.map((q) => {
      const chosenIdx = answers[q.id] !== undefined ? answers[q.id] : -1;
      const isAnsCorrect = chosenIdx === q.correctAnswerIndex;
      return {
        questionId: q.id,
        category: q.sectionTitle,
        question: q.question,
        selectedOptionIndex: chosenIdx,
        selectedText: chosenIdx >= 0 ? q.options[chosenIdx] : 'No respondió',
        correctOptionIndex: q.correctAnswerIndex,
        correctText: q.options[q.correctAnswerIndex],
        isCorrect: isAnsCorrect,
        explanation: `${q.articleRef}: ${isAnsCorrect ? q.positiveFeedback : q.errorDiagnosis}`,
      };
    });

    // Persist in localStorage and queue for Google Sheets sync
    try {
      saveApprenticeSubmission(
        editForm,
        {
          ...progress,
          quizScore: scorePercentage,
          quizCompleted: passed,
          gamifiedPoints: finalPoints,
          totalTimeSeconds: elapsedSeconds,
          correctAnswersCount: finalCorrect,
          maxStreak: maxStreak,
        },
        answers,
        scorePercentage,
        {
          notes: `Evaluación Acuerdo 009/2024 · Puntos: ${finalPoints} · Tiempo: ${formatTime(elapsedSeconds)} · Aciertos: ${finalCorrect}/${totalQuestions}`,
          totalTimeSeconds: elapsedSeconds,
          totalTimeFormatted: formatTime(elapsedSeconds),
          gamifiedPoints: finalPoints,
          correctAnswersCount: finalCorrect,
          totalQuestionsCount: totalQuestions,
          maxStreak: maxStreak,
          sectionScores: sectionScores,
          detailedAnswers: detailedAnswers,
        }
      );
    } catch (e) {
      console.error('Error saving apprentice gamified evaluation', e);
    }

    // Update parent state
    onUpdateQuizResult(scorePercentage, passed, {
      gamifiedPoints: finalPoints,
      totalTimeSeconds: elapsedSeconds,
      correctAnswersCount: finalCorrect,
      maxStreak: maxStreak,
    });
  };

  const handleResetEvaluation = () => {
    setEvalPhase('register');
    setAnswers({});
    setCurrentQuestionIdx(0);
    setScorePoints(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setElapsedSeconds(0);
    setIsTimerRunning(false);
    setHasAnsweredCurrent(false);
    setSelectedOptionForCurrent(null);
  };

  const handlePrint = () => {
    window.print();
  };

  // Verification code
  const verificationCode = `SENA-IND-${editForm.tokenNumber || '2874102'}-${editForm.documentNumber.slice(-4) || '2026'}-2026`;

  // Build current leaderboard with user inserted
  const userEntry: GamifiedRankingEntry = {
    rank: 0,
    apprenticeName: `${editForm.fullName} (Tú)`,
    tokenNumber: editForm.tokenNumber,
    scorePercent: evalPhase === 'completed' ? Math.round((correctCount / REGULATION_QUESTIONS.length) * 100) : progress.quizScore,
    totalPoints: scorePoints || progress.gamifiedPoints || 0,
    correctAnswers: correctCount || progress.correctAnswersCount || 0,
    totalQuestions: REGULATION_QUESTIONS.length,
    timeSeconds: elapsedSeconds || progress.totalTimeSeconds || 190,
    timeFormatted: formatTime(elapsedSeconds || progress.totalTimeSeconds || 190),
    maxStreak: maxStreak || progress.maxStreak || 0,
    isCurrentApprentice: true,
    badges: [
      ...(correctCount === 25 ? ['Precisión Total'] : []),
      ...(elapsedSeconds < 180 && correctCount >= 20 ? ['Rayo Normativo'] : []),
      ...(maxStreak >= 10 ? ['Racha de Oro'] : []),
      ...(scorePoints >= 2500 ? ['Guardián del Acuerdo 009'] : ['Aspirante Activo'])
    ],
    date: 'Hoy'
  };

  // Combine benchmark with current user and sort
  const combinedLeaderboard = [...BENCHMARK_LEADERBOARD, userEntry]
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return a.timeSeconds - b.timeSeconds; // faster time wins tie
    })
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const currentUserRank = combinedLeaderboard.find((e) => e.isCurrentApprentice)?.rank || 1;

  // Find active section of current question
  const activeSectionInfo = REGULATION_SECTIONS.find((s) => s.number === currentQuestion.sectionNumber) || REGULATION_SECTIONS[0];
  const sectionQuestions = REGULATION_QUESTIONS.filter((q) => q.sectionNumber === currentQuestion.sectionNumber);
  const questionIndexInSection = sectionQuestions.findIndex((q) => q.id === currentQuestion.id) + 1;

  return (
    <div className="space-y-8">
      {/* Module Title Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              Módulo Unificado 05 · Acuerdo 009 de 2024
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Evaluación Gamificada del Reglamento SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              25 preguntas oficiales (5 por cada sección del reglamento). Pon a prueba tu velocidad, racha invicta y conocimientos para clasificar en el ranking institucional y acreditar tu inducción.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {progress.quizCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold font-mono shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Aprobado: {progress.quizScore}% ({progress.gamifiedPoints || 3200} pts)
              </span>
            )}
          </div>
        </div>

        {/* Top Tab Bar Navigation */}
        <div className="flex items-center gap-1.5 mt-6 p-1 bg-slate-100/90 dark:bg-slate-900/90 rounded-2xl max-w-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md overflow-x-auto">
          <button
            onClick={() => setActiveTab('evaluacion')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'evaluacion'
                ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            01. Evaluación (25 Preguntas)
          </button>
          
          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'ranking'
                ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            02. Cuadro de Honor
          </button>

          <button
            onClick={() => {
              if (progress.quizCompleted || evalPhase === 'completed') {
                setActiveTab('carnet');
              } else {
                alert('Debes presentar y aprobar la evaluación (mínimo 70%) para desbloquear tu carnet institucional.');
              }
            }}
            className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'carnet'
                ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white opacity-90'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            03. Carnet Digital
          </button>

          <button
            onClick={() => {
              if (progress.quizCompleted || evalPhase === 'completed') {
                setActiveTab('certificado');
              } else {
                alert('Debes presentar y aprobar la evaluación (mínimo 70%) para emitir la constancia institucional.');
              }
            }}
            className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'certificado'
                ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white opacity-90'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            04. Certificado
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: EVALUACIÓN GAMIFICADA */}
      {/* ============================================================== */}
      {activeTab === 'evaluacion' && (
        <div className="space-y-8 no-print">
          
          {/* FASE A: REGISTRO Y CONFIRMACIÓN DE DATOS DEL APRENDIZ */}
          {evalPhase === 'register' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Introduction Card */}
              <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 text-white p-7 rounded-3xl border border-emerald-700/50 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Award className="w-56 h-56 text-emerald-300" />
                </div>
                
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Paso 1 de 2 · Identificación del Aprendiz
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    ¡Bienvenido a la Prueba Oficial de Inducción SENA!
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                    Para asegurar que tus resultados, calificación y constancia queden formalmente radicados en el sistema institucional y en la hoja de cálculo del Centro, verifica y complementa tus datos a continuación:
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                      <div className="text-emerald-300 font-extrabold text-base font-mono">25</div>
                      <div className="text-[10px] text-slate-200 mt-0.5">Preguntas (5 x Sección)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                      <div className="text-emerald-300 font-extrabold text-base font-mono">⏱️ Reloj</div>
                      <div className="text-[10px] text-slate-200 mt-0.5">Bono por Velocidad</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                      <div className="text-emerald-300 font-extrabold text-base font-mono">🔥 Racha</div>
                      <div className="text-[10px] text-slate-200 mt-0.5">Multiplicador sin fallos</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                      <div className="text-emerald-300 font-extrabold text-base font-mono">70%</div>
                      <div className="text-[10px] text-slate-200 mt-0.5">Mínimo Aprobatorio</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Confirmation Form */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                <form onSubmit={handleStartEvaluation} className="space-y-6">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      Ficha de Identificación del Aprendiz Evaluado
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Estos datos se registrarán en tu carnet, certificado y en la hoja de control de la inducción.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Nombres y Apellidos Completos *
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                        placeholder="Ej. Laura Sofía Gómez Morales"
                      />
                    </div>

                    {/* Document Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Tipo de Documento *
                      </label>
                      <select
                        value={editForm.documentType}
                        onChange={(e) => setEditForm({ ...editForm, documentType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                      >
                        <option value="C.C.">Cédula de Ciudadanía (C.C.)</option>
                        <option value="T.I.">Tarjeta de Identidad (T.I.)</option>
                        <option value="C.E.">Cédula de Extranjería (C.E.)</option>
                        <option value="P.P.T.">Permiso por Protección Temporal (P.P.T.)</option>
                      </select>
                    </div>

                    {/* Document Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.documentNumber}
                        onChange={(e) => setEditForm({ ...editForm, documentNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Ej. 1014285741"
                      />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        <span>Correo Electrónico Institucional o Personal *</span>
                        <span className="text-[10px] text-slate-400 font-normal">Para envío de resultados</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          value={editForm.email || ''}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="aprendiz@soy.sena.edu.co"
                        />
                      </div>
                    </div>

                    {/* Program Name */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Programa de Formación *
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.programName}
                        onChange={(e) => setEditForm({ ...editForm, programName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Ej. Tecnólogo en Análisis y Desarrollo de Software (ADSO)"
                      />
                    </div>

                    {/* Token Number (Ficha) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Número de Ficha de Caracterización *
                      </label>
                      <div className="relative">
                        <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={editForm.tokenNumber}
                          onChange={(e) => setEditForm({ ...editForm, tokenNumber: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="2874102"
                        />
                      </div>
                    </div>

                    {/* Level */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Nivel de Formación *
                      </label>
                      <select
                        value={editForm.formationLevel}
                        onChange={(e) => setEditForm({ ...editForm, formationLevel: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                      >
                        <option value="Tecnólogo">Tecnólogo</option>
                        <option value="Técnico">Técnico Laboral</option>
                        <option value="Operario">Operario / Auxiliar</option>
                        <option value="Especialización Tecnológica">Especialización Tecnológica</option>
                      </select>
                    </div>

                    {/* Regional */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Regional SENA *
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.regional}
                        onChange={(e) => setEditForm({ ...editForm, regional: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Regional Distrito Capital"
                      />
                    </div>

                    {/* Center Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Centro de Formación *
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.centerName}
                        onChange={(e) => setEditForm({ ...editForm, centerName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Centro de Formación en Tecnologías..."
                      />
                    </div>
                  </div>

                  {/* Submission and Start Button */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Tus datos están protegidos bajo política de Habeas Data SENA</span>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Confirmar Datos y Comenzar Prueba (25 Preguntas)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* FASE B: EJECUCIÓN DE LA EVALUACIÓN INTERACTIVA GAMIFICADA */}
          {evalPhase === 'in_progress' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* TOP GAME BAR: Live Timer, Score, Streak, Section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-md sticky top-20 z-20 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Left: Section Indicator & Question Count */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">
                      {currentQuestion.sectionNumber}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        {activeSectionInfo.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        Pregunta <strong>{questionIndexInSection} de 5</strong> en esta sección · Total: <strong>{currentQuestionIdx + 1} de {REGULATION_QUESTIONS.length}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right: Gamified Stats (Chronometer + Points + Streak) */}
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    {/* Live Chronometer */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                      <span>{formatTime(elapsedSeconds)}</span>
                    </div>

                    {/* Streak Combo Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      currentStreak > 0
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 animate-bounce'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}>
                      <Flame className={`w-3.5 h-3.5 ${currentStreak > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                      <span>{currentStreak > 0 ? `Racha x${lastStreakMultiplier.toFixed(1)} (${currentStreak})` : 'Racha 0'}</span>
                    </div>

                    {/* Score Points */}
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-mono font-bold shadow-xs">
                      <Zap className="w-3.5 h-3.5 fill-white" />
                      <span>{scorePoints.toLocaleString()} pts</span>
                    </div>
                  </div>
                </div>

                {/* Overall Progress Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono mb-1.5">
                    <span>Avance General de la Prueba</span>
                    <span>{Math.round(((currentQuestionIdx + (hasAnsweredCurrent ? 1 : 0)) / REGULATION_QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                      style={{ width: `${((currentQuestionIdx + (hasAnsweredCurrent ? 1 : 0)) / REGULATION_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sections Pills Stepper */}
              <div className="grid grid-cols-5 gap-2 no-print">
                {REGULATION_SECTIONS.map((sec, idx) => {
                  const isCurrentSection = sec.number === currentQuestion.sectionNumber;
                  const secQuestions = REGULATION_QUESTIONS.filter(q => q.sectionNumber === sec.number);
                  const answeredInSec = secQuestions.filter(q => answers[q.id] !== undefined).length;
                  const isFinished = answeredInSec === 5;

                  return (
                    <div
                      key={sec.id}
                      className={`p-2.5 rounded-2xl border text-center transition-all ${
                        isCurrentSection
                          ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 ring-2 ring-emerald-500/20'
                          : isFinished
                          ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-400'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] font-bold font-mono uppercase text-slate-500 dark:text-slate-400">
                        Sección {sec.number}
                      </div>
                      <div className="text-[11px] font-bold truncate text-slate-800 dark:text-slate-200 mt-0.5">
                        {sec.number === 'I' && 'Definiciones'}
                        {sec.number === 'II' && 'Derechos'}
                        {sec.number === 'III' && 'Deberes'}
                        {sec.number === 'IV' && 'Novedades'}
                        {sec.number === 'V' && 'Faltas'}
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-1">
                        {answeredInSec}/5
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* QUESTION CARD */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Article Reference Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {currentQuestion.articleRef}
                  </span>

                  <span className="text-xs text-slate-400 font-mono">
                    Pregunta #{currentQuestion.id}
                  </span>
                </div>

                {/* Question Statement */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>

                {/* 4 Options Grid */}
                <div className="space-y-3">
                  {currentQuestion.options.map((optionText, optIdx) => {
                    const isSelected = selectedOptionForCurrent === optIdx;
                    const isCorrectAnswer = optIdx === currentQuestion.correctAnswerIndex;

                    let optionBtnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700';

                    if (hasAnsweredCurrent) {
                      if (isCorrectAnswer) {
                        optionBtnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30 font-semibold shadow-xs';
                      } else if (isSelected && !isCorrectAnswer) {
                        optionBtnStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/80 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30';
                      } else {
                        optionBtnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 opacity-50';
                      }
                    }

                    const optionLetters = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnsweredCurrent}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer border flex items-start gap-3.5 ${optionBtnStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                          hasAnsweredCurrent
                            ? isCorrectAnswer
                              ? 'bg-emerald-600 text-white'
                              : isSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}>
                          {hasAnsweredCurrent && isCorrectAnswer ? (
                            <Check className="w-3.5 h-3.5 text-white" />
                          ) : hasAnsweredCurrent && isSelected ? (
                            <X className="w-3.5 h-3.5 text-white" />
                          ) : (
                            optionLetters[optIdx]
                          )}
                        </span>

                        <span className="flex-1 leading-snug pt-0.5">
                          {optionText}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* ============================================================== */}
                {/* FEEDBACK INMEDIATO TRAS RESPONDER */}
                {/* ============================================================== */}
                {hasAnsweredCurrent && (
                  <div className="pt-2 animate-fade-in space-y-4">
                    {selectedOptionForCurrent === currentQuestion.correctAnswerIndex ? (
                      /* ------------------------------------------- */
                      /* REFUERZO POSITIVO (ACIERTO) */
                      /* ------------------------------------------- */
                      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/70 dark:via-teal-950/50 dark:to-emerald-950/70 border-2 border-emerald-500/70 rounded-2xl p-5 shadow-md relative overflow-hidden">
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-bounce">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="text-sm font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                                ¡Excelente Respuesta! 🎉 +100 Pts Base
                              </h4>

                              {/* Speed and Streak Badges */}
                              <div className="flex items-center gap-2">
                                {lastSpeedBonus > 0 && (
                                  <span className="text-[11px] font-bold font-mono text-emerald-700 dark:text-emerald-300 bg-white/80 dark:bg-emerald-900/80 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700">
                                    ⚡ Bono Velocidad: +{lastSpeedBonus} pts ({lastQuestionSpeedSeconds}s)
                                  </span>
                                )}
                                {currentStreak > 1 && (
                                  <span className="text-[11px] font-bold font-mono text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/80 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-700">
                                    🔥 Racha x{lastStreakMultiplier.toFixed(1)}
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium">
                              {currentQuestion.positiveFeedback}
                            </p>

                            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono pt-1">
                              Norma: <strong>{currentQuestion.articleRef}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ------------------------------------------- */
                      /* REFUERZO PEDAGÓGICO CORRECTIVO (ERROR) */
                      /* ------------------------------------------- */
                      <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 dark:from-rose-950/70 dark:via-amber-950/50 dark:to-rose-950/70 border-2 border-rose-400/80 dark:border-rose-600/80 rounded-2xl p-5 shadow-md relative overflow-hidden">
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          
                          <div className="space-y-2.5 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                                ⚠️ Refuerzo Pedagógico · Identifiquemos en qué fallaste
                              </h4>
                              <span className="text-[11px] font-mono text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-700">
                                0 pts · Racha reiniciada
                              </span>
                            </div>

                            {/* Why it was wrong */}
                            <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-950 dark:text-rose-200 space-y-1">
                              <div className="font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1">
                                <X className="w-3.5 h-3.5 text-rose-600" />
                                <span>Tu elección errónea:</span>
                              </div>
                              <p className="italic text-slate-700 dark:text-slate-300 pl-4">
                                "{selectedOptionForCurrent !== null ? currentQuestion.options[selectedOptionForCurrent] : ''}"
                              </p>
                              <p className="text-[11px] text-rose-700 dark:text-rose-300 pt-1 border-t border-rose-100 dark:border-rose-900/40">
                                <strong>¿Por qué es un error?</strong> {selectedOptionForCurrent !== null ? currentQuestion.optionExplanations[selectedOptionForCurrent] : ''}
                              </p>
                            </div>

                            {/* Correct explanation */}
                            <div className="bg-emerald-50/80 dark:bg-emerald-950/80 rounded-xl p-3 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
                              <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Respuesta correcta según el Acuerdo 009 de 2024:</span>
                              </div>
                              <p className="font-semibold text-slate-900 dark:text-white pl-4">
                                "{currentQuestion.options[currentQuestion.correctAnswerIndex]}"
                              </p>
                              <p className="text-[11px] text-emerald-700 dark:text-emerald-300 pt-1 border-t border-emerald-200 dark:border-emerald-800">
                                <strong>Fundamento Normativo ({currentQuestion.articleRef}):</strong> {currentQuestion.errorDiagnosis}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Button: Next Question */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all transform hover:-translate-y-0.5"
                      >
                        <span>
                          {currentQuestionIdx < REGULATION_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Calificar Prueba'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FASE C: PANTALLA FINAL DE RESULTADOS, RANKING Y ACREDITACIÓN */}
          {evalPhase === 'completed' && (
            <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
              
              {/* Grand Results Banner */}
              <div className={`p-8 rounded-3xl border text-white shadow-xl relative overflow-hidden ${
                correctCount >= 18 
                  ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 border-emerald-600/50' 
                  : 'bg-gradient-to-br from-rose-900 via-slate-900 to-slate-950 border-rose-600/50'
              }`}>
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
                  <div className="space-y-2 max-w-lg">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-white/10 border border-white/20 text-emerald-300">
                      {correctCount >= 18 ? '🏆 ¡EVALUACIÓN APROBADA CON DISTINCIÓN!' : '⚠️ REQUIERE PLAN DE MEJORAMIENTO'}
                    </span>
                    
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                      {editForm.fullName}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-200">
                      Ficha {editForm.tokenNumber} · {editForm.programName}
                    </p>

                    <p className="text-xs text-emerald-200/90 pt-1 leading-relaxed">
                      {correctCount >= 18 
                        ? '¡Felicitaciones! Has demostrado conocimiento cabal de los 5 capítulos del Acuerdo 009 de 2024. Tus respuestas han sido guardadas de acuerdo a la hoja de cálculo del instructor.'
                        : 'Has obtenido un porcentaje inferior al 70%. Te sugerimos revisar los artículos en los que tuviste dudas y reintentar para certificar tu inducción.'}
                    </p>
                  </div>

                  {/* Big Score Dial */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center min-w-[200px]">
                    <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                      {Math.round((correctCount / REGULATION_QUESTIONS.length) * 100)}%
                    </div>
                    <div className="text-xs font-bold text-emerald-300 mt-1 uppercase tracking-wider">
                      {correctCount} de 25 Aciertos
                    </div>
                    <div className="text-sm font-mono text-slate-200 mt-2 pt-2 border-t border-white/15">
                      ⭐ <strong>{scorePoints.toLocaleString()}</strong> Pts Totales
                    </div>
                  </div>
                </div>

                {/* KPI Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
                  <div className="bg-black/20 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-slate-300 uppercase block">Tiempo Empleado</span>
                    <span className="text-base font-bold font-mono text-emerald-300">{formatTime(elapsedSeconds)}</span>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-slate-300 uppercase block">Racha Máxima</span>
                    <span className="text-base font-bold font-mono text-amber-300">🔥 {maxStreak} seguidas</span>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-slate-300 uppercase block">Puesto en Ranking</span>
                    <span className="text-base font-bold font-mono text-emerald-300">#{currentUserRank} de {combinedLeaderboard.length}</span>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-slate-300 uppercase block">Estado Normativo</span>
                    <span className={`text-base font-bold ${correctCount >= 18 ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {correctCount >= 18 ? 'Acreditado' : 'Por Mejorar'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance by 5 Regulation Sections */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Desempeño Específico por las 5 Secciones del Reglamento
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {REGULATION_SECTIONS.map((sec) => {
                    const secQuestions = REGULATION_QUESTIONS.filter(q => q.sectionNumber === sec.number);
                    const secCorrect = secQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length;
                    const secPct = Math.round((secCorrect / secQuestions.length) * 100);

                    return (
                      <div
                        key={sec.id}
                        className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700/60 text-center space-y-1.5"
                      >
                        <div className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                          Capítulo {sec.number}
                        </div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {sec.number === 'I' && 'Definiciones'}
                          {sec.number === 'II' && 'Derechos'}
                          {sec.number === 'III' && 'Deberes'}
                          {sec.number === 'IV' && 'Trámites'}
                          {sec.number === 'V' && 'Disciplinario'}
                        </div>
                        <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                          {secCorrect}/5
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {secPct}% acierto
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Steps Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  onClick={handleResetEvaluation}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reintentar Evaluación (Mejorar Récord)
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('ranking')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <Trophy className="w-4 h-4" />
                    Ver Tabla de Clasificación
                  </button>

                  {correctCount >= 18 && (
                    <>
                      <button
                        onClick={() => setActiveTab('carnet')}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Ver Carnet Digital
                      </button>

                      <button
                        onClick={() => setActiveTab('certificado')}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                      >
                        <Award className="w-4 h-4" />
                        Ver Certificado Oficial
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: RANKING Y CUADRO DE HONOR GAMIFICADO */}
      {/* ============================================================== */}
      {activeTab === 'ranking' && (
        <div className="space-y-8 no-print max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-black/15 text-slate-900">
                <Trophy className="w-3.5 h-3.5" />
                Cuadro de Honor Institucional SENA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Ranking de Velocidad y Precisión Normativa
              </h3>
              <p className="text-xs sm:text-sm text-amber-950 font-medium max-w-lg">
                Clasificación basada en respuestas correctas del Acuerdo 009 de 2024, velocidad de respuesta y rachas invictas sin equivocaciones.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 text-center border border-amber-300 shadow-sm min-w-[150px]">
              <span className="text-[10px] font-bold uppercase text-slate-600 block">Tu Posición</span>
              <span className="text-3xl font-black font-mono text-slate-900 block mt-0.5">#{currentUserRank}</span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">{userEntry.totalPoints.toLocaleString()} pts</span>
            </div>
          </div>

          {/* Scoring System Explainer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-lg">🎯</span>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1">100 Pts Base</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Por cada respuesta correcta</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-lg">⚡</span>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Hasta +60 Pts Velocidad</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Por responder en menos de 15s</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-lg">🔥</span>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Multiplicador x2.0</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Por racha invicta de 5+ seguidas</p>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Tabla Oficial de Posiciones (Ficha {editForm.tokenNumber || '2874102'})
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {combinedLeaderboard.length} Aprendices Clasificados
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {combinedLeaderboard.map((entry) => {
                const isUser = entry.isCurrentApprentice;
                const isTop3 = entry.rank <= 3;

                return (
                  <div
                    key={entry.rank}
                    className={`p-4 sm:px-6 flex items-center justify-between gap-4 transition-colors ${
                      isUser
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-l-4 border-l-emerald-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Medal */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                        entry.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                          : entry.rank === 2
                          ? 'bg-slate-300 text-slate-900 shadow-xs'
                          : entry.rank === 3
                          ? 'bg-amber-700 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        #{entry.rank}
                      </div>

                      {/* Apprentice Name & Token */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs sm:text-sm font-bold ${isUser ? 'text-emerald-900 dark:text-emerald-300 font-black' : 'text-slate-900 dark:text-white'}`}>
                            {entry.apprenticeName}
                          </span>
                          {isUser && (
                            <span className="text-[10px] bg-emerald-600 text-white font-mono font-bold px-1.5 py-0.2 rounded">
                              TÚ
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>Ficha {entry.tokenNumber}</span>
                          <span>·</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{entry.correctAnswers}/25 Aciertos ({entry.scorePercent}%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats & Points */}
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-black font-mono text-slate-900 dark:text-white">
                        {entry.totalPoints.toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center justify-end gap-1.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{entry.timeFormatted}</span>
                        {entry.maxStreak > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-amber-600 dark:text-amber-400 font-bold">🔥 {entry.maxStreak}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: CARNET DIGITAL DEL APRENDIZ */}
      {/* ============================================================== */}
      {activeTab === 'carnet' && (
        <div className="space-y-8">
          <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Carnet Digital Institucional SENA
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Documento oficial de identificación del aprendiz para el ingreso a sedes y talleres.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenProfile}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                Modificar Datos
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir Carnet
              </button>
            </div>
          </div>

          {/* Carnet Dual Side Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-4">
            {/* CARNET FRENTE */}
            <div className="bg-white rounded-3xl border-2 border-emerald-600 shadow-xl overflow-hidden flex flex-col justify-between max-w-sm mx-auto w-full aspect-[1/1.55] relative">
              {/* Top Institutional Header */}
              <div className="bg-emerald-600 px-5 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-emerald-700 font-extrabold text-sm">
                      S
                    </div>
                    <div>
                      <span className="text-xs font-extrabold tracking-wider uppercase block">
                        SENA
                      </span>
                      <span className="text-[9px] text-emerald-100 block -mt-0.5">
                        Servicio Nacional de Aprendizaje
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-700/80 px-2 py-0.5 rounded text-white">
                    APRENDIZ
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-4 flex-1 flex flex-col items-center justify-center text-center">
                {/* Photo frame */}
                <div className="w-28 h-28 rounded-2xl bg-slate-100 border-2 border-emerald-500 shadow-sm p-1 mb-3 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-emerald-100 to-teal-50 flex flex-col items-center justify-center text-emerald-800 font-bold">
                    <User className="w-12 h-12 text-emerald-600" />
                    <span className="text-[10px] mt-1 uppercase font-mono">{editForm.formationLevel}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {editForm.fullName}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {editForm.documentType} {editForm.documentNumber}
                </p>

                <div className="mt-3 w-full bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-left">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                    Programa de Formación:
                  </span>
                  <span className="text-xs font-semibold text-slate-800 leading-tight block">
                    {editForm.programName}
                  </span>
                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-emerald-200/70 text-[11px] font-mono">
                    <span className="text-slate-600">Ficha: <strong>{editForm.tokenNumber}</strong></span>
                    <span className="text-emerald-700 font-semibold">{editForm.formationLevel}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="bg-slate-900 text-white px-5 py-2.5 flex items-center justify-between text-[10px]">
                <span className="truncate max-w-[190px]">{editForm.regional}</span>
                <span className="font-mono text-emerald-400 font-bold">VIGENCIA 2026</span>
              </div>
            </div>

            {/* CARNET REVERSO */}
            <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden flex flex-col justify-between max-w-sm mx-auto w-full aspect-[1/1.55] relative p-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">
                      República de Colombia
                    </h4>
                    <span className="text-[10px] text-slate-500 block">
                      Ministerio del Trabajo · SENA
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Centro de Formación:
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-tight block">
                      {editForm.centerName}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Regional:
                    </span>
                    <span className="text-xs font-semibold text-slate-800 block">
                      {editForm.regional}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[10px] text-slate-600 leading-relaxed">
                    Este documento es personal e intransferible. Identifica al portador como aprendiz activo. En caso de pérdida, comunicarse con la Coordinación Académica del centro de formación.
                  </div>
                </div>
              </div>

              {/* QR Code and Barcode */}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 block">
                    Código de Validación
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800">
                    {verificationCode}
                  </span>
                  <span className="text-[9px] text-slate-500 block mt-0.5">
                    Línea Nacional: 018000 910270
                  </span>
                </div>

                {/* SVG QR Code Simulation */}
                <div className="w-16 h-16 bg-slate-100 p-1 rounded-lg border border-slate-300 flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: CERTIFICADO OFICIAL DE CULMINACIÓN */}
      {/* ============================================================== */}
      {activeTab === 'certificado' && (
        <div className="space-y-8">
          <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Constancia Institucional de Culminación de Inducción
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Documento oficial verificable emitido por el Centro de Formación.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-300 dark:border-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Registro Oficial Radicado</span>
              </span>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Imprimir / Guardar en PDF
              </button>
            </div>
          </div>

          {/* Printable Official Certificate */}
          <div className="bg-white border-8 border-double border-emerald-700/80 rounded-2xl p-8 sm:p-14 shadow-2xl max-w-4xl mx-auto relative overflow-hidden text-center text-slate-800">
            {/* Watermark Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-96 h-96">
                <circle cx="50" cy="18" r="10" fill="#39A900" />
                <path d="M 50 34 L 50 78 M 28 50 L 72 50 M 34 86 L 50 70 L 66 86" stroke="#39A900" strokeWidth="8" fill="none" />
              </svg>
            </div>

            {/* Header */}
            <div className="relative z-10 space-y-2 mb-8">
              <div className="inline-block px-3 py-1 bg-emerald-100/70 text-emerald-800 text-xs font-bold tracking-widest uppercase rounded-md mb-2">
                REPÚBLICA DE COLOMBIA
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-emerald-800">
                SERVICIO NACIONAL DE APRENDIZAJE · SENA
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {editForm.regional.toUpperCase()} · {editForm.centerName.toUpperCase()}
              </p>
            </div>

            {/* Title */}
            <div className="relative z-10 my-8">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
                HACE CONSTAR QUE EL APRENDIZ
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-normal my-2">
                {editForm.fullName.toUpperCase()}
              </h2>
              <p className="text-sm text-slate-600 font-mono">
                Identificado con {editForm.documentType} No. {editForm.documentNumber}
              </p>
            </div>

            {/* Certificate Body */}
            <div className="relative z-10 max-w-2xl mx-auto text-sm text-slate-700 leading-relaxed space-y-4 my-8">
              <p>
                Culminó y aprobó satisfactoriamente el proceso de <strong>Inducción Institucional</strong> para el programa de formación <strong>"{editForm.programName}"</strong> (Nivel {editForm.formationLevel}), correspondiente a la <strong>Ficha de Caracterización No. {editForm.tokenNumber}</strong>.
              </p>
              <p className="text-xs text-slate-600">
                Demostró conocimiento cabal del Acuerdo No. 0009 de 2024 (Reglamento del Aprendiz SENA), Símbolos institucionales, FPI y Plan de Bienestar con una calificación de <strong>{Math.round((correctCount / REGULATION_QUESTIONS.length) * 100) || progress.quizScore}%</strong> y una intensidad horaria de <strong>40 horas académicas</strong>.
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="relative z-10 grid grid-cols-2 gap-8 pt-10 mt-10 border-t border-slate-300">
              <div className="flex flex-col items-center">
                <div className="w-36 border-b border-slate-700 mb-2 font-serif italic text-sm text-slate-600">
                  Carlos M. Restrepo
                </div>
                <span className="text-xs font-bold text-slate-900 block">
                  Subdirector de Centro
                </span>
                <span className="text-[10px] text-slate-500">
                  {editForm.centerName}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-36 border-b border-slate-700 mb-2 font-serif italic text-sm text-slate-600">
                  Gloria E. Valderrama
                </div>
                <span className="text-xs font-bold text-slate-900 block">
                  Coordinadora Académica
                </span>
                <span className="text-[10px] text-slate-500">
                  {editForm.regional}
                </span>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="relative z-10 mt-10 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
              <div className="text-left font-mono">
                <span>Registro: <strong>{verificationCode}</strong></span>
                <span className="block text-[10px] text-slate-400">Expedición: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-slate-800" />
                <span className="text-[10px] text-slate-400 text-left leading-tight">
                  Verificable en<br />senasofiaplus.edu.co
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
