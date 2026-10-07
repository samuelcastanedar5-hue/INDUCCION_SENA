import React from 'react';
import { User, CheckCircle2, Menu, X, Award, Moon, Sun, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { ApprenticeProfile, InductionProgress } from '../types/induction';

const SENA_LOGO_SVG = "data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: ApprenticeProfile;
  onOpenProfile: () => void;
  progress: InductionProgress;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfile,
  progress,
  darkMode,
  onToggleDarkMode,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onLogoutAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Compute total completion percentage
  const totalCompletedCount = 
    (progress.identityCompleted ? 1 : 0) +
    (progress.pedagogyCompleted ? 1 : 0) +
    (progress.regulationsCompleted ? 1 : 0) +
    (progress.ecosystemCompleted ? 1 : 0) +
    (progress.quizCompleted ? 1 : 0);
  const completionPercent = Math.round((totalCompletedCount / 5) * 100);

  // Clean learner navigation items (Drive spreadsheet is protected)
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'identidad', label: 'Identidad y Símbolos' },
    { id: 'pedagogia', label: 'Ruta de Formación' },
    { id: 'reglamento', label: 'Reglamento del Aprendiz' },
    { id: 'ecosistema', label: 'Bienestar y SENNOVA' },
    { id: 'certificacion', label: 'Evaluación y Carnet' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element Brand wordmark with gradient accent */}
          <button
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-3 text-left transition-transform hover:scale-[1.02] cursor-pointer group shrink-0"
          >
            <div className="w-[47px] h-[47px] flex items-center justify-center shrink-0 p-1 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-emerald-500/20 shadow-xs group-hover:border-emerald-500/50 transition-colors">
              <img 
                src={SENA_LOGO_SVG} 
                alt="Logo SENA" 
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-900 via-emerald-700 to-teal-700 dark:from-white dark:via-emerald-300 dark:to-teal-200 bg-clip-text text-transparent block leading-tight">
                SENA
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block -mt-0.5 tracking-wide">
                Inducción Institucional
              </span>
            </div>
          </button>

          {/* Zone 2: Nav links with gradient pill active state */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md text-xs font-semibold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25 font-bold scale-102'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* If Admin is logged in, show Instructor Panel tab */}
            {isAdminLoggedIn && (
              <button
                onClick={() => setActiveTab('registro_drive')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'registro_drive'
                    ? 'bg-gradient-to-r from-amber-600 to-emerald-600 text-white shadow-md font-bold scale-102'
                    : 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Panel Instructor</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Primary action & Progress pill & Dark Mode & Admin Lock */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Admin Status / Trigger Button */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 p-1 rounded-full border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                <button
                  onClick={() => setActiveTab('registro_drive')}
                  className="px-2.5 py-1 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  title="Ir al Panel del Instructor"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">Admin Activo</span>
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="p-1 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900 text-slate-500 hover:text-slate-800 cursor-pointer"
                  title="Cerrar Sesión de Administrador"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-slate-100/60 dark:bg-slate-900/60 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                title="Acceso exclusivo para Instructores / Administradores"
              >
                <Lock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                <span className="hidden xl:inline text-[11px]">Instructor</span>
              </button>
            )}

            {/* Learner Progress Badge */}
            <button
              onClick={() => setActiveTab('certificacion')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer shadow-xs hover:shadow-emerald-500/15"
              title="Progreso de Inducción"
            >
              {completionPercent === 100 ? (
                <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 animate-pulse" />
              )}
              <span className="font-mono tabular-nums">{completionPercent}%</span>
              <span className="hidden md:inline font-normal text-slate-500 dark:text-slate-400">avance</span>
            </button>

            {/* Profile trigger */}
            <button
              onClick={onOpenProfile}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer max-w-[150px] shadow-2xs"
            >
              <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{profile.fullName.split(' ')[0]}</span>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer border bg-white/80 dark:bg-slate-800/90 text-slate-700 dark:text-emerald-300 border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md hover:border-emerald-500/40 dark:hover:border-emerald-500/50 hover:scale-105 active:scale-95"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden sm:inline">Oscuro</span>
                </>
              )}
            </button>

            {/* Mobile hamburger */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-md font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}

          {isAdminLoggedIn ? (
            <button
              onClick={() => {
                setActiveTab('registro_drive');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm rounded-md font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Panel de Control Instructor
              </span>
              <span className="text-xs bg-amber-200 dark:bg-amber-900 px-2 py-0.5 rounded-full">Activo</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Administrativo / Instructor (PIN)</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
