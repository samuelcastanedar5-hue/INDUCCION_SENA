import React from 'react';
import { ShieldCheck, Phone, MapPin, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenAdminLogin }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                SENA Colombia
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Servicio Nacional de Aprendizaje. Entidad pública de orden nacional adscrita al Ministerio del Trabajo de Colombia.
            </p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
              Formación Profesional Integral Gratuita
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Ruta de Inducción
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('identidad')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Identidad y Símbolos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('pedagogia')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Ruta de Formación (FPI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('reglamento')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Reglamento del Aprendiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('ecosistema')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Bienestar y SENNOVA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('certificacion')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Evaluación y Carnet Digital
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdminLogin || (() => onNavigateTab('registro_drive'))}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer font-medium text-slate-500 dark:text-slate-400 inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Portal Instructor / Administrador</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Channels */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Canales de Atención
            </h4>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Línea Gratuita Nacional: <strong className="text-slate-800 dark:text-slate-200">018000 910270</strong><br />
                  Bogotá D.C.: (601) 343 0111
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Dirección General: Calle 57 No. 8 - 69, Bogotá D.C.</span>
              </div>
            </div>
          </div>

          {/* Col 4: Portales Oficiales */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Portales del Aprendiz
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <a
                  href="https://www.sena.edu.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  Portal Web Oficial <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://senasofiaplus.edu.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  SOFIA Plus Académico <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://zajuna.sena.edu.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  Zajuna LMS <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ape.sena.edu.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  Agencia Pública de Empleo <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} Servicio Nacional de Aprendizaje - SENA. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>República de Colombia</span>
            <span aria-hidden="true">·</span>
            <span>Ministerio del Trabajo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
