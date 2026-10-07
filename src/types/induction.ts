export interface ApprenticeProfile {
  fullName: string;
  documentType: string;
  documentNumber: string;
  programName: string;
  formationLevel: 'Técnico' | 'Tecnólogo' | 'Operario' | 'Especialización Tecnológica';
  tokenNumber: string; // Número de Ficha
  regional: string;
  centerName: string;
  avatarSeed: string;
  startDate: string;
  email?: string;
  photoUrl?: string;
}

export interface SymbolDetail {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  meanings: { title: string; desc: string }[];
  accentColor: string;
}

export interface RegulationItem {
  id: string;
  type: 'derecho' | 'deber' | 'falta' | 'sancion' | 'principio' | 'novedad';
  title: string;
  description: string;
  articleRef: string;
  articleNumber?: number;
  chapterRef?: string;
  category?: 'académica' | 'disciplinaria' | 'general' | 'administrativa';
  severity?: 'leve' | 'grave' | 'gravísima';
}

export interface RegulationPrinciple {
  principio: string;
  descripcion: string;
}

export interface RegulationArticle {
  numero: number;
  nombre: string;
  contenido?: any;
}

export interface RegulationChapter {
  capitulo: string;
  articulos: RegulationArticle[];
}

export interface Acuerdo0009Document {
  titulo: string;
  descripcion: string;
  emisor: string;
  fecha: string;
  reglamento: {
    nombre: string;
    capitulos: RegulationChapter[];
  };
}

export interface DilemmaCase {
  id: string;
  title: string;
  context: string;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
    points: number;
  }[];
}

export interface ProductiveStageMode {
  id: string;
  title: string;
  shortDesc: string;
  requirements: string[];
  benefits: string[];
  duration: string;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface InductionProgress {
  identityCompleted: boolean;
  pedagogyCompleted: boolean;
  regulationsCompleted: boolean;
  ecosystemCompleted: boolean;
  quizScore: number;
  quizCompleted: boolean;
  dilemmasAnswered: Record<string, number>; // dilemmaId: points
  gamifiedPoints?: number;
  totalTimeSeconds?: number;
  correctAnswersCount?: number;
  maxStreak?: number;
}

export interface RegulationSectionQuestion {
  id: number;
  sectionNumber: string; // 'I', 'II', 'III', 'IV', 'V'
  sectionTitle: string;
  articleRef: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  positiveFeedback: string;
  errorDiagnosis: string;
  optionExplanations: string[];
}

export interface GamifiedRankingEntry {
  rank: number;
  apprenticeName: string;
  tokenNumber: string;
  scorePercent: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSeconds: number;
  timeFormatted: string;
  maxStreak: number;
  isCurrentApprentice?: boolean;
  badges: string[];
  date: string;
}

