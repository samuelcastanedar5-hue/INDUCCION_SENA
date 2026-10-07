import { ApprenticeProfile, InductionProgress } from '../types/induction';
import { INDUCTION_QUIZ } from '../data/senaData';

export interface QuizAnswerDetail {
  questionId: number;
  category: string;
  question: string;
  selectedOptionIndex: number;
  selectedText: string;
  correctOptionIndex: number;
  correctText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ApprenticeSubmissionRecord {
  id: string;
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  email?: string;
  programName: string;
  formationLevel: string;
  tokenNumber: string;
  regional: string;
  centerName: string;
  quizScore: number;
  quizPassed: boolean;
  status: 'Aprobado' | 'En Progreso' | 'No Aprobado';
  detailedAnswers: QuizAnswerDetail[];
  dilemmaPoints: number;
  totalTimeSeconds?: number;
  totalTimeFormatted?: string;
  gamifiedPoints?: number;
  correctAnswersCount?: number;
  totalQuestionsCount?: number;
  maxStreak?: number;
  sectionScores?: Record<string, { correct: number; total: number; title: string }>;
  modulesCompleted: {
    identity: boolean;
    pedagogy: boolean;
    regulations: boolean;
    ecosystem: boolean;
    quiz: boolean;
  };
  syncedToGoogle: boolean;
  syncedAt: string | null;
  notes?: string;
}

const STORAGE_KEY_ADMIN_PIN = 'sena_admin_pin_v1';
const STORAGE_KEY_ADMIN_SESSION = 'sena_admin_session_v1';
const STORAGE_KEY_SUBMISSIONS = 'sena_apprentice_submissions_v1';

// Default PIN (1957: Año de fundación del SENA)
const DEFAULT_PIN = '1957';

export const getStoredAdminPin = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ADMIN_PIN);
    return saved || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
};

export const verifyAdminPin = (enteredPin: string): boolean => {
  const currentPin = getStoredAdminPin();
  return enteredPin.trim() === currentPin.trim();
};

export const changeAdminPin = (oldPin: string, newPin: string): { success: boolean; message: string } => {
  if (!verifyAdminPin(oldPin)) {
    return { success: false, message: 'La contraseña o PIN actual no es correcta.' };
  }
  if (!newPin || newPin.trim().length < 4) {
    return { success: false, message: 'El nuevo PIN debe tener al menos 4 caracteres numéricos.' };
  }
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_PIN, newPin.trim());
    return { success: true, message: 'PIN de administrador actualizado exitosamente.' };
  } catch (err: any) {
    return { success: false, message: 'Error al guardar el nuevo PIN: ' + err.message };
  }
};

export const isAdminSessionActive = (): boolean => {
  try {
    return sessionStorage.getItem(STORAGE_KEY_ADMIN_SESSION) === 'true';
  } catch {
    return false;
  }
};

export const setAdminSession = (active: boolean) => {
  try {
    if (active) {
      sessionStorage.setItem(STORAGE_KEY_ADMIN_SESSION, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
    }
  } catch (err) {
    console.error('Error setting admin session', err);
  }
};

// Seed sample data if empty
const INITIAL_DEMO_SUBMISSIONS: ApprenticeSubmissionRecord[] = [
  {
    id: 'sub-demo-001',
    timestamp: '2026-10-06 09:42:15',
    fullName: 'Laura Sofía Gómez Morales',
    documentType: 'C.C.',
    documentNumber: '1014285741',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    formationLevel: 'Tecnólogo',
    tokenNumber: '2874102',
    regional: 'Regional Distrito Capital',
    centerName: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    quizScore: 100,
    quizPassed: true,
    status: 'Aprobado',
    detailedAnswers: INDUCTION_QUIZ.map((q) => ({
      questionId: q.id,
      category: q.category,
      question: q.question,
      selectedOptionIndex: q.correctAnswerIndex,
      selectedText: q.options[q.correctAnswerIndex],
      correctOptionIndex: q.correctAnswerIndex,
      correctText: q.options[q.correctAnswerIndex],
      isCorrect: true,
      explanation: q.explanation,
    })),
    dilemmaPoints: 100,
    modulesCompleted: {
      identity: true,
      pedagogy: true,
      regulations: true,
      ecosystem: true,
      quiz: true,
    },
    syncedToGoogle: true,
    syncedAt: '2026-10-06 09:45:00',
    notes: 'Completó toda la inducción satisfactoriamente con puntaje perfecto.',
  },
  {
    id: 'sub-demo-002',
    timestamp: '2026-10-06 14:18:32',
    fullName: 'Carlos Eduardo Ramírez Vargas',
    documentType: 'T.I.',
    documentNumber: '1075982143',
    programName: 'Técnico en Sistemas y Redes de Datos',
    formationLevel: 'Técnico',
    tokenNumber: '2901455',
    regional: 'Regional Antioquia',
    centerName: 'Centro de Formación en Tecnologías de la Información',
    quizScore: 90,
    quizPassed: true,
    status: 'Aprobado',
    detailedAnswers: INDUCTION_QUIZ.map((q, idx) => {
      const isAnsCorrect = idx !== 4; // falló 1 pregunta
      const chosenIdx = isAnsCorrect ? q.correctAnswerIndex : ((q.correctAnswerIndex + 1) % q.options.length);
      return {
        questionId: q.id,
        category: q.category,
        question: q.question,
        selectedOptionIndex: chosenIdx,
        selectedText: q.options[chosenIdx],
        correctOptionIndex: q.correctAnswerIndex,
        correctText: q.options[q.correctAnswerIndex],
        isCorrect: isAnsCorrect,
        explanation: q.explanation,
      };
    }),
    dilemmaPoints: 75,
    modulesCompleted: {
      identity: true,
      pedagogy: true,
      regulations: true,
      ecosystem: true,
      quiz: true,
    },
    syncedToGoogle: false,
    syncedAt: null,
    notes: 'Pendiente de sincronizar a la hoja de Google Drive del instructor.',
  },
];

export const getSubmissions = (): ApprenticeSubmissionRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
    if (!raw) {
      // Save initial demo
      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(INITIAL_DEMO_SUBMISSIONS));
      return INITIAL_DEMO_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_SUBMISSIONS;
  }
};

export interface SaveSubmissionExtraOptions {
  notes?: string;
  totalTimeSeconds?: number;
  totalTimeFormatted?: string;
  gamifiedPoints?: number;
  correctAnswersCount?: number;
  totalQuestionsCount?: number;
  maxStreak?: number;
  sectionScores?: Record<string, { correct: number; total: number; title: string }>;
  detailedAnswers?: QuizAnswerDetail[];
}

export const saveApprenticeSubmission = (
  profile: ApprenticeProfile,
  progress: InductionProgress,
  selectedAnswers: Record<number, number>,
  score: number,
  extra?: string | SaveSubmissionExtraOptions
): ApprenticeSubmissionRecord => {
  const currentSubmissions = getSubmissions();
  
  const options: SaveSubmissionExtraOptions = typeof extra === 'string'
    ? { notes: extra }
    : (extra || {});
  
  // Format now
  const now = new Date();
  const timestampStr = now.toISOString().replace('T', ' ').substring(0, 19);

  // Build detailed answers breakdown
  let detailedAnswers: QuizAnswerDetail[] = options.detailedAnswers || [];
  if (!detailedAnswers.length) {
    detailedAnswers = INDUCTION_QUIZ.map((q) => {
      const chosenIdx = selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1;
      const isCorrect = chosenIdx === q.correctAnswerIndex;
      return {
        questionId: q.id,
        category: q.category,
        question: q.question,
        selectedOptionIndex: chosenIdx,
        selectedText: chosenIdx >= 0 ? q.options[chosenIdx] : 'No respondió',
        correctOptionIndex: q.correctAnswerIndex,
        correctText: q.options[q.correctAnswerIndex],
        isCorrect,
        explanation: q.explanation,
      };
    });
  }

  const dilemmaTotal = Object.values(progress.dilemmasAnswered || {}).reduce((acc, p) => acc + (p || 0), 0);

  const newRecord: ApprenticeSubmissionRecord = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: timestampStr,
    fullName: profile.fullName || 'Aprendiz SENA',
    documentType: profile.documentType || 'C.C.',
    documentNumber: profile.documentNumber || '0000000000',
    email: profile.email || '',
    programName: profile.programName || 'Programa de Formación SENA',
    formationLevel: profile.formationLevel || 'Tecnólogo',
    tokenNumber: profile.tokenNumber || '2874102',
    regional: profile.regional || 'Regional Distrito Capital',
    centerName: profile.centerName || 'Centro de Formación SENA',
    quizScore: score,
    quizPassed: score >= 70,
    status: score >= 70 ? 'Aprobado' : 'No Aprobado',
    detailedAnswers,
    dilemmaPoints: dilemmaTotal,
    totalTimeSeconds: options.totalTimeSeconds ?? progress.totalTimeSeconds ?? 0,
    totalTimeFormatted: options.totalTimeFormatted ?? '00:00',
    gamifiedPoints: options.gamifiedPoints ?? progress.gamifiedPoints ?? (score * 30),
    correctAnswersCount: options.correctAnswersCount ?? progress.correctAnswersCount ?? Math.round((score / 100) * (options.totalQuestionsCount || 25)),
    totalQuestionsCount: options.totalQuestionsCount ?? 25,
    maxStreak: options.maxStreak ?? progress.maxStreak ?? 0,
    sectionScores: options.sectionScores,
    modulesCompleted: {
      identity: progress.identityCompleted,
      pedagogy: progress.pedagogyCompleted,
      regulations: progress.regulationsCompleted,
      ecosystem: progress.ecosystemCompleted,
      quiz: progress.quizCompleted || score >= 70,
    },
    syncedToGoogle: false,
    syncedAt: null,
    notes: options.notes || 'Evaluación unificada registrada automáticamente con Acuerdo 009 de 2024',
  };

  // Check if there is an existing submission for this document and token to update or prepend
  const existingIdx = currentSubmissions.findIndex(
    (s) => s.documentNumber === newRecord.documentNumber && s.tokenNumber === newRecord.tokenNumber
  );

  let updatedList: ApprenticeSubmissionRecord[];
  if (existingIdx >= 0) {
    // Preserve synced status if already synced and score didn't change, or mark unsynced if new attempt
    updatedList = [...currentSubmissions];
    updatedList[existingIdx] = {
      ...newRecord,
      id: currentSubmissions[existingIdx].id,
      syncedToGoogle: false, // need to update in sheet
    };
  } else {
    updatedList = [newRecord, ...currentSubmissions];
  }

  try {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updatedList));
  } catch (err) {
    console.error('Error saving apprentice submission locally', err);
  }

  return newRecord;
};

export const markSubmissionAsSynced = (id: string, syncedAt?: string) => {
  const currentSubmissions = getSubmissions();
  const timestamp = syncedAt || new Date().toISOString().replace('T', ' ').substring(0, 19);
  const updated = currentSubmissions.map((s) => 
    s.id === id ? { ...s, syncedToGoogle: true, syncedAt: timestamp } : s
  );
  try {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating sync state', err);
  }
};

export const markAllAsSynced = () => {
  const currentSubmissions = getSubmissions();
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const updated = currentSubmissions.map((s) => ({ ...s, syncedToGoogle: true, syncedAt: timestamp }));
  try {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error marking all as synced', err);
  }
};

export const deleteSubmission = (id: string) => {
  const currentSubmissions = getSubmissions();
  const updated = currentSubmissions.filter((s) => s.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting submission', err);
  }
};

export const clearAllSubmissions = () => {
  try {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify([]));
  } catch (err) {
    console.error('Error clearing submissions', err);
  }
};

export const exportSubmissionsToCSV = (submissions: ApprenticeSubmissionRecord[]) => {
  if (!submissions.length) return;

  const headers = [
    'Marca Temporal',
    'Nombre Completo',
    'Tipo Documento',
    'Número Documento',
    'Correo Electrónico',
    'Programa',
    'Ficha',
    'Regional',
    'Centro',
    'Calificación (%)',
    'Puntaje Gamificado',
    'Aciertos',
    'Tiempo Empleado',
    'Racha Máxima',
    'Estado',
    'Puntos Dilemas',
    'Sincronizado Drive',
    'Observaciones'
  ];

  const rows = submissions.map((s) => [
    `"${s.timestamp}"`,
    `"${s.fullName.replace(/"/g, '""')}"`,
    `"${s.documentType}"`,
    `"${s.documentNumber}"`,
    `"${s.email || ''}"`,
    `"${s.programName.replace(/"/g, '""')}"`,
    `"${s.tokenNumber}"`,
    `"${s.regional.replace(/"/g, '""')}"`,
    `"${s.centerName.replace(/"/g, '""')}"`,
    `"${s.quizScore}%"`,
    `"${s.gamifiedPoints || 0} pts"`,
    `"${s.correctAnswersCount !== undefined ? `${s.correctAnswersCount}/${s.totalQuestionsCount || 25}` : '-'}"`,
    `"${s.totalTimeFormatted || '-'}"`,
    `"${s.maxStreak ? `${s.maxStreak} seguidos` : '-'}"`,
    `"${s.status}"`,
    `"${s.dilemmaPoints} pts"`,
    `"${s.syncedToGoogle ? 'Sí (' + (s.syncedAt || '') + ')' : 'Pendiente'}"`,
    `"${(s.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SENA_Induccion_Evaluacion_Gamificada_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
