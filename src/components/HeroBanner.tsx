import React from 'react';
import { Sparkles, ArrowRight, BookOpen, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { ApprenticeProfile, InductionProgress } from '../types/induction';

interface HeroBannerProps {
  profile: ApprenticeProfile;
  progress: InductionProgress;
  onNavigateTab: (tab: string) => void;
  onOpenProfile: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  profile,
  progress,
  onNavigateTab,
  onOpenProfile,
}) => {
  const completedSteps = [
    progress.identityCompleted,
    progress.pedagogyCompleted,
    progress.regulationsCompleted,
    progress.ecosystemCompleted,
    progress.quizCompleted,
  ].filter(Boolean).length;

  const percent = Math.round((completedSteps / 5) * 100);

  return (
    <div className="relative overflow-hidden bg-slate-950 rounded-3xl text-white shadow-2xl mb-10 border border-emerald-500/20">
      {/* Decorative Gradient Glow Orbs */}
      <div 
        aria-hidden="true" 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tl from-cyan-500/20 via-emerald-600/25 to-transparent blur-3xl pointer-events-none" 
      />

      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_sena_induction_1791319384661.jpg"
          alt="Aprendices SENA colaborando en ambiente de formación tecnológica"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter brightness-90 scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 max-w-4xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider">Bienvenido a la Familia SENA</span>
          <span aria-hidden="true">·</span>
          <span>Ficha {profile.tokenNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.regional}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
          El Valor Institucional de ser un{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent filter drop-shadow-xs">
            Aprendiz SENA
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
          Hola, <strong className="text-white font-semibold">{profile.fullName}</strong>. Inicias tu etapa formativa en <span className="text-emerald-300 font-semibold">{profile.programName}</span>. Este proceso de inducción interactivo te guiará por nuestra historia, símbolos sagrados, reglamento, deberes y el inmenso orgullo de transformar a Colombia.
        </p>

        {/* Progress & Quick Actions Glass Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-8 max-w-2xl shadow-xl shadow-emerald-950/50">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Tu Ruta de Inducción
              </span>
              <span className="text-xs text-emerald-300 font-mono font-medium">
                ({completedSteps} de 5 módulos)
              </span>
            </div>
            <span className="text-sm font-bold font-mono text-emerald-300 tabular-nums">
              {percent}% completado
            </span>
          </div>

          {/* Glowing Multi-Stop Gradient Progress bar */}
          <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden border border-slate-700/60 p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full transition-all duration-700 ease-out rounded-full shadow-sm shadow-emerald-400/50"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => onNavigateTab('identidad')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              Comenzar Inducción
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('certificacion')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-emerald-500/40 transition-all cursor-pointer shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Carnet Digital & Certificado
            </button>
            <button
              onClick={onOpenProfile}
              className="text-xs text-slate-400 hover:text-emerald-300 underline underline-offset-4 ml-auto transition-colors cursor-pointer"
            >
              Editar datos de la ficha
            </button>
          </div>
        </div>

        {/* Institutional Pillars Proof */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-left">
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/5">
            <div className="text-xl sm:text-2xl font-black font-mono bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent tabular-nums">1957</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Fundación por Martínez Tono</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/5">
            <div className="text-xl sm:text-2xl font-black font-mono bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent tabular-nums">117</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Centros de Formación en el País</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/5">
            <div className="text-xl sm:text-2xl font-black font-mono bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent tabular-nums">33</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Regionales en todo el Territorio</div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-500/10 backdrop-blur-xs border border-emerald-500/20">
            <div className="text-xl sm:text-2xl font-black font-mono bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">100%</div>
            <div className="text-[11px] text-emerald-300/80 mt-0.5 font-medium">Formación Gratuita</div>
          </div>
        </div>
      </div>
    </div>
  );
};
