import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Lightbulb, 
  Building2, 
  HeartHandshake, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Database,
  BookMarked,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PRODUCTIVE_STAGE_MODES } from '../data/senaData';
import { ProductiveStageMode } from '../types/induction';

interface PedagogyModuleProps {
  isCompleted: boolean;
  onMarkCompleted: () => void;
  onNextModule: () => void;
}

export const PedagogyModule: React.FC<PedagogyModuleProps> = ({
  isCompleted,
  onMarkCompleted,
  onNextModule,
}) => {
  const [selectedModeId, setSelectedModeId] = useState<string>('contrato_aprendizaje');
  const activeMode = PRODUCTIVE_STAGE_MODES.find((m) => m.id === selectedModeId) || PRODUCTIVE_STAGE_MODES[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-5 h-5 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-600" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-emerald-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-emerald-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-emerald-600" />;
      default: return <Briefcase className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Módulo 02 · Pedagogía Institucional
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Ruta de Formación Profesional Integral (FPI)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Comprende cómo se estructura tu aprendizaje por proyectos, las etapas lectiva y productiva, y las plataformas digitales institucionales.
            </p>
          </div>

          <button
            onClick={onMarkCompleted}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer shadow-xs ${
              isCompleted
                ? 'bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 shadow-emerald-500/10'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}</span>
          </button>
        </div>
      </div>

      {/* Section 1: Modelo Pedagógico y las 3 Dimensiones */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            01. Las Tres Dimensiones de la Competencia Laboral
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-base mb-4 border border-blue-100 dark:border-blue-900">
              01
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              El Saber (Cognitivo)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Apropiación de fundamentos conceptuales, científicos y tecnológicos. El aprendiz comprende el fundamento teórico de su especialidad y analiza situaciones complejas.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              Enfoque: Comprensión teórica y pensamiento crítico.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-base mb-4 border border-emerald-100 dark:border-emerald-900">
              02
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              El Saber Hacer (Procedimental)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Destrezas operativas, técnicas y aplicación práctica en talleres y laboratorios. Desarrollar proyectos formativos que resuelven retos reales de la industria.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              Enfoque: Formación por proyectos y simulación real.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-base mb-4 border border-amber-100 dark:border-amber-900">
              03
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              El Saber Ser (Actitudinal y Ético)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Valores humanos, ética profesional, trabajo colaborativo, comunicación asertiva y compromiso con la sostenibilidad ambiental y la paz de Colombia.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              Enfoque: Ciudadanía activa y liderazgo solidario.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Las Dos Etapas de la Formación SENA */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            02. Estructura Dual: Etapa Lectiva vs. Etapa Productiva
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            El camino continuo que transforma el aprendizaje en aula en desempeño productivo validado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
          <div className="lg:col-span-5 relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <img
              src="/src/assets/images/sena_tech_workshop_1791319406025.jpg"
              alt="Ambiente de formación técnica y laboratorio en taller SENA"
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent p-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Ambiente de Aprendizaje
              </span>
              <p className="text-xs text-slate-200 mt-0.5">
                Talleres de última tecnología donde se fusiona teoría y práctica.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-800/90 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Fase 1 · Etapa Lectiva
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">6 a 18 meses</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Apropiación del Conocimiento en Ambientes de Formación
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                El aprendiz asiste a sesiones presenciales o virtuales, interactúa con instructores, desarrolla guías de aprendizaje y construye el proyecto formativo de su ficha. Al aprobar el 100% de los resultados de aprendizaje, queda habilitado para iniciar su etapa práctica.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                  Fase 2 · Etapa Productiva
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">6 meses reglamentarios</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Aplicación en el Sector Real y Empresarial
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                El aprendiz demuestra sus competencias laborales directamente en una empresa, proyecto de innovación o emprendimiento. Cuenta con acompañamiento de un instructor de seguimiento y entrega de bitácoras de actividades para culminar su titulación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Las 6 Modalidades de Etapa Productiva (Interactivo) */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                03. Las Seis Modalidades de Etapa Productiva
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Elige la alternativa que mejor se adapte a tu vocación profesional y perfil laboral.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
              Acuerdo 009 de 2024 · Art. 16
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRODUCTIVE_STAGE_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedModeId(mode.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                selectedModeId === mode.id
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent dark:from-emerald-950/70 dark:via-teal-950/40 dark:to-slate-900 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/60 scale-102'
                  : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-emerald-400/50 dark:hover:border-slate-700'
              }`}
            >
              <div className="mb-2">
                {getIcon(mode.iconName)}
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {mode.title}
                </h5>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block mt-1">
                  {mode.duration}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Mode Detail Card */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                Modalidad Oficial de Certificación
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {activeMode.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {activeMode.shortDesc}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                Duración Máxima
              </span>
              <span className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-400">
                {activeMode.duration}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Requirements */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Requisitos Obligatorios
              </h5>
              <ul className="space-y-2">
                {activeMode.requirements.map((req, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl p-5 border border-emerald-100 dark:border-emerald-800/60">
              <h5 className="text-xs font-bold text-emerald-950 dark:text-emerald-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:text-emerald-400" />
                Beneficios para el Aprendiz
              </h5>
              <ul className="space-y-2">
                {activeMode.benefits.map((ben, i) => (
                  <li key={i} className="text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">★</span>
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Plataformas Digitales SENA */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            04. Ecosistema de Plataformas Digitales
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Las herramientas oficiales que usarás a diario durante toda tu formación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Monitor className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zajuna LMS</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                El entorno virtual de aprendizaje renovado del SENA. Envío de evidencias, foros, sesiones sincrónicas y calificaciones de instructores.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
              zajuna.sena.edu.co
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 flex items-center justify-center mb-3">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">SOFIA Plus</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Sistema central de gestión académica. Consulta tu ficha, estado de matrícula, certificaciones aprobadas y novedades administrativas.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-blue-700 dark:text-blue-400">
              senasofiaplus.edu.co
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 flex items-center justify-center mb-3">
                <BookMarked className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sistema de Bibliotecas</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Catálogo digital con miles de libros electrónicos, revistas científicas indexadas (IEEE, Springer, ScienceDirect) gratuitos para ti.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-purple-700 dark:text-purple-400">
              biblioteca.sena.edu.co
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Caprendizaje (SGVA)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Sistema de Gestión Virtual de Aprendices donde las empresas registradas publican vacantes y postulan contratos de aprendizaje.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-amber-700 dark:text-amber-400">
              caprendizaje.sena.edu.co
            </div>
          </div>
        </div>
      </section>

      {/* Completion CTA */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-emerald-50/60 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
        <div>
          <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
            ¿Entendiste la ruta de formación y las opciones de etapa productiva?
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
            Marca este módulo como completado para avanzar al Reglamento del Aprendiz.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onMarkCompleted}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 border-emerald-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-slate-800'
            }`}
          >
            {isCompleted ? '✓ Completado' : 'Marcar como Completado'}
          </button>
          <button
            onClick={onNextModule}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white dark:text-slate-950 shadow-xs transition-colors cursor-pointer"
          >
            Siguiente Módulo: Reglamento del Aprendiz
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
