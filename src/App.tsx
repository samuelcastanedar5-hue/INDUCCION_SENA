import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProfileModal } from './components/ProfileModal';
import { IdentityModule } from './components/IdentityModule';
import { PedagogyModule } from './components/PedagogyModule';
import { RegulationsModule } from './components/RegulationsModule';
import { EcosystemModule } from './components/EcosystemModule';
import { EvaluationAndCredentialModule } from './components/EvaluationAndCredentialModule';
import { DriveRegistryModule } from './components/DriveRegistryModule';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { DEFAULT_PROFILE } from './data/senaData';
import { ApprenticeProfile, InductionProgress } from './types/induction';
import { isAdminSessionActive, setAdminSession } from './services/adminService';
import { 
  ShieldCheck, 
  BookOpen, 
  Scale, 
  HeartHandshake, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Clock, 
  Sparkles,
  Layers,
  GraduationCap,
  FileSpreadsheet,
  Lock
} from 'lucide-react';

const STORAGE_KEY_PROFILE = 'sena_apprentice_profile_v1';
const STORAGE_KEY_PROGRESS = 'sena_induction_progress_v1';
const STORAGE_KEY_THEME = 'sena_dark_mode_preference_v1';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved !== null) return saved === 'true';
      return false;
    } catch {
      return false;
    }
  });
  const [isBlurring, setIsBlurring] = useState<boolean>(false);

  // Load state from localStorage with fallbacks
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [progress, setProgress] = useState<InductionProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return saved
        ? JSON.parse(saved)
        : {
            identityCompleted: false,
            pedagogyCompleted: false,
            regulationsCompleted: false,
            ecosystemCompleted: false,
            quizScore: 0,
            quizCompleted: false,
            dilemmasAnswered: {},
          };
    } catch {
      return {
        identityCompleted: false,
        pedagogyCompleted: false,
        regulationsCompleted: false,
        ecosystemCompleted: false,
        quizScore: 0,
        quizCompleted: false,
        dilemmasAnswered: {},
      };
    }
  });

  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isAdminSessionActive());
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminSession(true);
    setIsAdminLoginModalOpen(false);
    setActiveTab('registro_drive');
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminSession(false);
    if (activeTab === 'registro_drive') {
      setActiveTab('inicio');
    }
  };

  const handleNavigateTab = (tabId: string) => {
    if (tabId === 'registro_drive' && !isAdminLoggedIn) {
      setIsAdminLoginModalOpen(true);
      return;
    }
    setActiveTab(tabId);
  };

  // Sync dark mode class on document element
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(STORAGE_KEY_THEME, String(darkMode));
    } catch (e) {
      console.error('Error applying dark mode', e);
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    // Trigger blur transition
    setIsBlurring(true);
    setDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsBlurring(false);
    }, 550);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress to localStorage', e);
    }
  }, [progress]);

  const handleSaveProfile = (newProfile: ApprenticeProfile) => {
    setProfile(newProfile);
  };

  const handleMarkModuleCompleted = (moduleKey: keyof Omit<InductionProgress, 'quizScore' | 'dilemmasAnswered'>) => {
    setProgress((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey],
    }));
  };

  const handleAnswerDilemma = (dilemmaId: string, points: number) => {
    setProgress((prev) => ({
      ...prev,
      dilemmasAnswered: {
        ...prev.dilemmasAnswered,
        [dilemmaId]: points,
      },
      regulationsCompleted: true,
    }));
  };

  const handleUpdateQuizResult = (
    score: number, 
    passed: boolean,
    extra?: {
      gamifiedPoints?: number;
      totalTimeSeconds?: number;
      correctAnswersCount?: number;
      maxStreak?: number;
    }
  ) => {
    setProgress((prev) => ({
      ...prev,
      quizScore: score,
      quizCompleted: passed,
      gamifiedPoints: extra?.gamifiedPoints ?? prev.gamifiedPoints,
      totalTimeSeconds: extra?.totalTimeSeconds ?? prev.totalTimeSeconds,
      correctAnswersCount: extra?.correctAnswersCount ?? prev.correctAnswersCount,
      maxStreak: extra?.maxStreak ?? prev.maxStreak,
    }));
  };

  const baseModuleCards = [
    {
      id: 'identidad',
      number: '01',
      title: 'Identidad, Mística y Símbolos',
      subtitle: 'Misión, Visión, Escudo, Bandera, Logosímbolo, Himno y Código de Integridad.',
      duration: '15 min',
      completed: progress.identityCompleted,
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      id: 'pedagogia',
      number: '02',
      title: 'Ruta de Formación (FPI)',
      subtitle: 'Modelo pedagógico SENA, Etapa Lectiva y las 6 modalidades de Etapa Productiva.',
      duration: '20 min',
      completed: progress.pedagogyCompleted,
      icon: <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 'reglamento',
      number: '03',
      title: 'Reglamento del Aprendiz',
      subtitle: 'Derechos, Deberes, Faltas, Debido Proceso y Simulador de Dilemas Éticos.',
      duration: '25 min',
      completed: progress.regulationsCompleted,
      icon: <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 'ecosistema',
      number: '04',
      title: 'Bienestar, SENNOVA y Empleo',
      subtitle: 'Salud, deporte, apoyos de sostenimiento, TecnoParques, APE y Fondo Emprender.',
      duration: '15 min',
      completed: progress.ecosystemCompleted,
      icon: <HeartHandshake className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    },
    {
      id: 'certificacion',
      number: '05',
      title: 'Evaluación y Carnet Digital',
      subtitle: 'Cuestionario interactivo de 10 preguntas, Carnet Oficial y Certificado de Inducción.',
      duration: '15 min',
      completed: progress.quizCompleted,
      icon: <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    },
  ];

  const adminModuleCard = {
    id: 'registro_drive',
    number: '06',
    title: 'Panel del Instructor & Google Drive',
    subtitle: 'Consola privada: revisión de respuestas de aprendices y sincronización de hoja de cálculo.',
    duration: 'Exclusivo Instructor',
    completed: true,
    icon: <FileSpreadsheet className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
  };

  const moduleCards = isAdminLoggedIn ? [...baseModuleCards, adminModuleCard] : baseModuleCards;

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 gradient-mesh-bg flex flex-col text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 relative overflow-x-hidden ${isBlurring ? 'theme-blur-transition' : ''}`}>
      {/* Decorative Ambient Floating Gradient Lights */}
      <div 
        aria-hidden="true" 
        className="fixed top-12 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none animate-float-slow-1 z-0" 
      />
      <div 
        aria-hidden="true" 
        className="fixed bottom-24 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-cyan-500/10 via-emerald-600/10 to-transparent blur-3xl pointer-events-none animate-float-slow-2 z-0" 
      />

      {/* Visual Blur Flash Overlay during theme transition */}
      {isBlurring && (
        <div 
          aria-hidden="true" 
          className="theme-switch-overlay fixed inset-0 z-50 pointer-events-none bg-slate-900/10 dark:bg-slate-950/30 backdrop-blur-md" 
        />
      )}

      {/* Navbar with 3-Zone contract and Theme Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        progress={progress}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* VIEW: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-10">
            {/* Hero Banner */}
            <HeroBanner
              profile={profile}
              progress={progress}
              onNavigateTab={handleNavigateTab}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />

            {/* Modules Pathway Grid */}
            <section className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Ruta Formativa Oficial
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Módulos de la Inducción Institucional
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Recorre cada etapa a tu ritmo para adquirir el conocimiento integral del SENA.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Duración estimada total: 1h 25min</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {moduleCards.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setActiveTab(m.id)}
                    className="group glass-gradient-card rounded-2xl p-6 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-400/60 dark:hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Hover ambient top glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:from-emerald-500/20 transition-all" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                          MÓDULO {m.number}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                            {m.duration}
                          </span>
                          {m.completed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              Listo
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-full font-medium">
                              Pendiente
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/25 flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all shadow-xs">
                        {m.icon}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {m.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      <span>Explorar contenido</span>
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all">
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Profile Summary Card with vibrant gradient */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-950 text-white rounded-2xl p-6 shadow-xl shadow-emerald-900/30 border border-emerald-500/30 flex flex-col justify-between group">
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-xs">
                        Ficha de Aprendiz
                      </span>
                      <User className="w-4 h-4 text-emerald-300" />
                    </div>
                    <h3 className="text-lg font-extrabold tracking-tight">
                      {profile.fullName}
                    </h3>
                    <p className="text-xs text-emerald-200 font-mono mt-0.5">
                      Ficha {profile.tokenNumber} · {profile.formationLevel}
                    </p>
                    <p className="text-xs text-slate-200 mt-2 line-clamp-2 leading-relaxed">
                      {profile.programName}
                    </p>
                    <div className="mt-3 text-[11px] text-emerald-300 font-mono">
                      {profile.centerName}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between relative z-10">
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-xs transition-colors cursor-pointer border border-white/20 shadow-xs"
                    >
                      Personalizar Ficha
                    </button>
                    <button
                      onClick={() => setActiveTab('certificacion')}
                      className="text-xs text-emerald-300 hover:text-white underline underline-offset-4 cursor-pointer font-medium"
                    >
                      Ver Carnet &gt;
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: MODULO 1 - IDENTIDAD */}
        {activeTab === 'identidad' && (
          <IdentityModule
            isCompleted={progress.identityCompleted}
            onMarkCompleted={() => handleMarkModuleCompleted('identityCompleted')}
            onNextModule={() => setActiveTab('pedagogia')}
          />
        )}

        {/* VIEW: MODULO 2 - PEDAGOGIA */}
        {activeTab === 'pedagogia' && (
          <PedagogyModule
            isCompleted={progress.pedagogyCompleted}
            onMarkCompleted={() => handleMarkModuleCompleted('pedagogyCompleted')}
            onNextModule={() => setActiveTab('reglamento')}
          />
        )}

        {/* VIEW: MODULO 3 - REGLAMENTO */}
        {activeTab === 'reglamento' && (
          <RegulationsModule
            isCompleted={progress.regulationsCompleted}
            onMarkCompleted={() => handleMarkModuleCompleted('regulationsCompleted')}
            onNextModule={() => setActiveTab('ecosistema')}
            dilemmasAnswered={progress.dilemmasAnswered}
            onAnswerDilemma={handleAnswerDilemma}
          />
        )}

        {/* VIEW: MODULO 4 - ECOSISTEMA */}
        {activeTab === 'ecosistema' && (
          <EcosystemModule
            isCompleted={progress.ecosystemCompleted}
            onMarkCompleted={() => handleMarkModuleCompleted('ecosystemCompleted')}
            onNextModule={() => setActiveTab('certificacion')}
          />
        )}

        {/* VIEW: MODULO 5 - EVALUACION Y CARNET */}
        {activeTab === 'certificacion' && (
          <EvaluationAndCredentialModule
            profile={profile}
            progress={progress}
            onUpdateQuizResult={handleUpdateQuizResult}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onUpdateProfile={handleSaveProfile}
            onNavigateToDriveRegistry={() => setActiveTab('registro_drive')}
          />
        )}

        {/* VIEW: REGISTRO GOOGLE DRIVE & SHEETS (ADMIN ONLY) */}
        {activeTab === 'registro_drive' && (
          isAdminLoggedIn ? (
            <DriveRegistryModule
              currentProfile={profile}
              progress={progress}
              onExitAdminMode={handleLogoutAdmin}
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center max-w-lg mx-auto shadow-xl space-y-4 my-12 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Área Restringida a Instructores
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Por seguridad de la información y privacidad de las calificaciones de los aprendices (Habeas Data), el acceso a la hoja de cálculo y registro de respuestas requiere autenticación del administrador.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('inicio')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  Regresar al Inicio
                </button>
                <button
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                >
                  Ingresar con PIN de Instructor
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Profile Editing Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
      />
    </div>
  );
}
