import React from 'react';
import { 
  Heart, 
  Activity, 
  Sparkles, 
  Compass, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Smile,
  Shield,
  Zap,
  Layers,
  Users
} from 'lucide-react';

interface EcosystemModuleProps {
  isCompleted: boolean;
  onMarkCompleted: () => void;
  onNextModule: () => void;
}

export const EcosystemModule: React.FC<EcosystemModuleProps> = ({
  isCompleted,
  onMarkCompleted,
  onNextModule,
}) => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Módulo 04 · Oportunidades y Apoyo Integral
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Bienestar al Aprendiz, SENNOVA y Empleabilidad
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Descubre todos los servicios de apoyo humano, psicológico, socioeconómico, investigación aplicada y vinculación laboral que el SENA pone a tu alcance.
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

      {/* Section 1: Bienestar al Aprendiz */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              01. Plan Nacional Integral de Bienestar al Aprendiz
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Tu salud física, mental y estabilidad socioeconómica son prioridad para garantizar tu permanencia y graduación exitosa.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
            Resolución 1228
          </span>
        </div>

        {/* Campus Ambience Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <img
            src="/src/assets/images/sena_campus_ambience_1791319395479.jpg"
            alt="Campus moderno del SENA con áreas verdes y zonas de bienestar"
            referrerPolicy="no-referrer"
            className="w-full h-56 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Entornos de Convivencia y Desarrollo Humano
            </span>
            <h4 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              Centros de Formación diseñados para tu Crecimiento
            </h4>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Espacios de recreación, cafeterías con auxilios alimentarios, canchas polideportivas y salas de orientación psicológica a tu servicio.
            </p>
          </div>
        </div>

        {/* Bienestar Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3 border border-rose-100 dark:border-rose-900">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Salud y Prevención</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Jornadas de salud oral, vacunación, prevención de adicciones, salud sexual y reproductiva, y primeros auxilios en enfermería del centro.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-100 dark:border-emerald-900">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Deporte y Recreación</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Torneos intercentros de fútbol, voleibol, baloncesto, ajedrez, tenis de mesa y participación en los Juegos Nacionales de Aprendices SENA.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 border border-purple-100 dark:border-purple-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Arte y Cultura</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Talleres de danza folclórica, música instrumental, teatro, pintura y festivales de talento artístico regional y nacional.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 border border-blue-100 dark:border-blue-900">
              <Smile className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Consejería y Orientación</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Acompañamiento psicopedagógico individual y grupal para manejo de estrés académico, resolución de conflictos y orientación vocacional.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3 border border-amber-100 dark:border-amber-900">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Liderazgo y Representación</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Elección democrática de representantes de aprendices y voceros de ficha ante los comités de centro y la Dirección General.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-3 border border-teal-100 dark:border-teal-900">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Apoyos de Sostenimiento</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Convocatorias para apoyos económicos mensuales (FIC para el sector construcción y Apoyo Regular) destinados a transporte y alimentación de aprendices de estratos 1 y 2.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: SENNOVA & Innovación */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            02. Ecosistema de Ciencia, Tecnología e Innovación (SENNOVA)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Participa en investigación aplicada y prototipado tecnológico de vanguardia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 dark:bg-slate-900/90 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="text-xs font-mono font-bold text-emerald-400 mb-2">
              LÍNEA 01
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              TecnoParques SENA
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Laboratorios abiertos de aceleración tecnológica con 4 líneas: Biotecnología y Nanotecnología, Electrónica y Telecomunicaciones, Tecnologías Virtuales e Ingeniería y Diseño.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400">
              Prototipado rápido y patentes para aprendices.
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-900/90 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="text-xs font-mono font-bold text-teal-400 mb-2">
              LÍNEA 02
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              TecnoAcademias
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Espacios STEM para el desarrollo de competencias científicas y tecnológicas tempranas, robótica, inteligencia artificial y biotecnología aplicada.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-teal-400">
              Articulación con educación media y proyectos de ciencia.
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-900/90 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="text-xs font-mono font-bold text-blue-400 mb-2">
              LÍNEA 03
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Semilleros de Investigación
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Grupos avalados por MinCiencias donde los aprendices investigan junto a instructores investigadores en proyectos aplicados a los sectores productivos regionales.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-400">
              Valida tu etapa productiva investigando.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: APE y Fondo Emprender */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            03. Agencia Pública de Empleo (APE) & Fondo Emprender
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Puentes directos para tu inserción en el mercado laboral y la creación de tu propia empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Intermediación Laboral Gratuita
                </span>
                <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Agencia Pública de Empleo (APE)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El primer servicio público de empleo en Colombia, 100% público, gratuito e indiscriminado. Registra tu hoja de vida, accede a microrruedas de empleo exclusivas y postúlate a miles de vacantes nacionales e internacionales autorizadas.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              <span>ape.sena.edu.co</span>
              <span>Sin intermediarios</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Capital Semilla No Reembolsable
                </span>
                <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Fondo Emprender del SENA
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Fondo creado por el Gobierno Nacional para financiar iniciativas empresariales de aprendices y egresados SENA. Recibe asesoría metodológica para tu plan de negocio y accede a hasta cientos de millones de pesos en capital condonable.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300 font-semibold">
              <span>fondoemprender.com</span>
              <span>Emprendimiento de alto impacto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Completion CTA */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-emerald-50/60 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
        <div>
          <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
            ¿Conoces ya el ecosistema de bienestar, SENNOVA y empleo?
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
            ¡Estás listo para la Evaluación Final de Inducción y la obtención de tu Carnet Digital!
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
            Siguiente Módulo: Evaluación y Carnet
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
