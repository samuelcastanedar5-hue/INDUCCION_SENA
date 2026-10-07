import React, { useState } from 'react';
import { 
  Shield, 
  Flag, 
  UserCheck, 
  Music, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  BookOpen, 
  History, 
  HeartHandshake, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  SENA_HISTORY, 
  SENA_MISSION_VISION, 
  SENA_SYMBOLS, 
  SENA_HYMN_LYRICS 
} from '../data/senaData';
import { hymnPlayer } from '../utils/audioHymn';

const SENA_LOGO_SVG = "data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e";

interface IdentityModuleProps {
  isCompleted: boolean;
  onMarkCompleted: () => void;
  onNextModule: () => void;
}

export const IdentityModule: React.FC<IdentityModuleProps> = ({
  isCompleted,
  onMarkCompleted,
  onNextModule,
}) => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [isPlayingHymn, setIsPlayingHymn] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [activeVerse, setActiveVerse] = useState<number>(0);
  const [selectedSector, setSelectedSector] = useState<'primario' | 'secundario' | 'terciario'>('secundario');

  const activeSymbol = SENA_SYMBOLS.find((s) => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  const handleToggleHymn = () => {
    if (isPlayingHymn) {
      hymnPlayer.stop();
      setIsPlayingHymn(false);
      setCurrentNoteIndex(-1);
    } else {
      setIsPlayingHymn(true);
      hymnPlayer.play((noteIdx) => {
        setCurrentNoteIndex(noteIdx);
        if (noteIdx === -1) {
          setIsPlayingHymn(false);
        }
      });
    }
  };

  const handleStopHymn = () => {
    hymnPlayer.stop();
    setIsPlayingHymn(false);
    setCurrentNoteIndex(-1);
  };

  return (
    <div className="space-y-12">
      {/* Module Title Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Módulo 01 · Fundamento Institucional
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Identidad, Mística y Símbolos del SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Descubre los orígenes del SENA, el significado profundo de nuestros símbolos patrios y el Código de Integridad que forja el carácter de cada aprendiz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkCompleted}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span>{isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Misión y Visión Institucional */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            01. Misión, Visión y Principios Rectores
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Misión Card */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Nuestra Razón de Ser
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Ley 119 de 1994</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Misión Institucional
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {SENA_MISSION_VISION.mission}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Propósito:</span>
              <span>Inversión del Estado en el desarrollo social y técnico del pueblo colombiano.</span>
            </div>
          </div>

          {/* Visión Card */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Hacia Dónde Vamos
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Horizonte 2026</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Visión Prospectiva
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {SENA_MISSION_VISION.vision}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-teal-700 dark:text-teal-400">Pilares:</span>
              <span>Innovación tecnológica, justicia social, paz y transformación productiva.</span>
            </div>
          </div>
        </div>

        {/* 4 Principios Fundamentales */}
        <div className="bg-slate-100/70 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">
            Los Cuatro Principios Éticos Rectores
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SENA_MISSION_VISION.principles.map((pr, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  Principio 0{idx + 1}
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{pr.title}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Explorador Interactivo de Símbolos SENA */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            02. Explorador Interactivo de Símbolos Institucionales
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Selecciona cada símbolo para conocer su historia, significado y valor heráldico.
          </p>
        </div>

        {/* Symbol Selector Bar */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
          {SENA_SYMBOLS.map((sym) => (
            <button
              key={sym.id}
              onClick={() => setSelectedSymbolId(sym.id)}
              className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
                selectedSymbolId === sym.id
                  ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
              }`}
            >
              {sym.name}
            </button>
          ))}
        </div>

        {/* Selected Symbol Showcase */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          {selectedSymbolId === 'escudo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Graphic representation */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="w-48 h-48 relative flex items-center justify-center mb-4">
                  {/* Stylized Escudo SVG */}
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                    <circle cx="100" cy="100" r="92" fill="#FFFFFF" stroke="#39A900" strokeWidth="6" />
                    {/* Upper Industry Gear */}
                    <path
                      d="M 100 20 L 108 35 L 125 32 L 128 48 L 145 52 L 142 68 L 157 78 L 148 92 L 158 108 L 144 118 L 148 135 L 132 140 L 128 156 L 112 154 L 100 168 L 88 154 L 72 156 L 68 140 L 52 135 L 56 118 L 42 108 L 52 92 L 43 78 L 58 68 L 55 52 L 72 48 L 75 32 L 92 35 Z"
                      fill={selectedSector === 'secundario' ? '#39A900' : '#E2E8F0'}
                      stroke="#0F172A"
                      strokeWidth="3"
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedSector('secundario')}
                    />
                    <circle cx="100" cy="100" r="40" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                    
                    {/* Center Caduceus */}
                    <g 
                      transform="translate(100, 100) scale(0.65) translate(-100, -100)" 
                      className="cursor-pointer"
                      onClick={() => setSelectedSector('terciario')}
                    >
                      <path d="M 100 40 L 100 160" stroke={selectedSector === 'terciario' ? '#0284C7' : '#475569'} strokeWidth="5" strokeLinecap="round" />
                      <circle cx="100" cy="40" r="10" fill={selectedSector === 'terciario' ? '#0284C7' : '#475569'} />
                      <path d="M 80 75 Q 100 95 120 75 Q 100 115 80 135" fill="none" stroke={selectedSector === 'terciario' ? '#0284C7' : '#64748B'} strokeWidth="4" />
                      <path d="M 120 75 Q 100 95 80 75 Q 100 115 120 135" fill="none" stroke={selectedSector === 'terciario' ? '#0284C7' : '#64748B'} strokeWidth="4" />
                    </g>

                    {/* Bottom Coffee / Agriculture */}
                    <g 
                      transform="translate(50, 140)" 
                      className="cursor-pointer"
                      onClick={() => setSelectedSector('primario')}
                    >
                      <ellipse cx="50" cy="20" rx="20" ry="10" fill={selectedSector === 'primario' ? '#EAB308' : '#CBD5E1'} stroke="#0F172A" strokeWidth="2" />
                      <path d="M 30 20 Q 50 10 70 20" stroke="#0F172A" strokeWidth="2" />
                    </g>
                  </svg>
                </div>

                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Interactúa con los sectores
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedSector('primario')}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                        selectedSector === 'primario' ? 'bg-amber-100 text-amber-900 font-bold dark:bg-amber-950 dark:text-amber-200' : 'text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Primario
                    </button>
                    <button
                      onClick={() => setSelectedSector('secundario')}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                        selectedSector === 'secundario' ? 'bg-emerald-100 text-emerald-900 font-bold dark:bg-emerald-950 dark:text-emerald-200' : 'text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Secundario
                    </button>
                    <button
                      onClick={() => setSelectedSector('terciario')}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                        selectedSector === 'terciario' ? 'bg-sky-100 text-sky-900 font-bold dark:bg-sky-950 dark:text-sky-200' : 'text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Terciario
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Explanatory breakdown */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                    {activeSymbol.subtitle}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeSymbol.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {activeSymbol.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {activeSymbol.meanings.map((m, i) => (
                    <div 
                      key={i} 
                      className={`p-3.5 rounded-xl border transition-all ${
                        (i === 0 && selectedSector === 'secundario') ||
                        (i === 1 && selectedSector === 'terciario') ||
                        (i === 2 && selectedSector === 'primario')
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                      }`}
                    >
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                        {m.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 pl-4 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSymbolId === 'bandera' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                {/* Bandera Canvas representation */}
                <div className="w-64 h-40 bg-white border-2 border-slate-300 dark:border-slate-600 rounded-lg shadow-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white" />
                  {/* Central Logosimbolo */}
                  <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <circle cx="50" cy="18" r="10" fill="#39A900" />
                      <path d="M 50 34 L 50 78 M 28 50 L 72 50 M 34 86 L 50 70 L 66 86" stroke="#39A900" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
                  Pabellón Institucional del SENA
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                  {activeSymbol.subtitle}
                </span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeSymbol.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeSymbol.description}
                </p>

                <div className="space-y-3 pt-2">
                  {activeSymbol.meanings.map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                        {m.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 pl-4 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSymbolId === 'logosimbolo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="w-52 h-52 flex items-center justify-center bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-emerald-500/30 p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />
                  <img 
                    src={SENA_LOGO_SVG} 
                    alt="Logosímbolo Oficial SENA" 
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
                  El Aprendiz en Proyección de Futuro
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                  {activeSymbol.subtitle}
                </span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeSymbol.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeSymbol.description}
                </p>

                <div className="space-y-3 pt-2">
                  {activeSymbol.meanings.map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                        {m.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 pl-4 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSymbolId === 'himno' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                    {activeSymbol.subtitle}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Himno Institucional del SENA
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Letra: Jesús René Castro · Música: Daniel Marlez
                  </p>
                </div>

                {/* Hymn Audio Player Controls */}
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleToggleHymn}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/25 transition-all cursor-pointer hover:scale-102 active:scale-98"
                  >
                    {isPlayingHymn ? (
                      <>
                        <Pause className="w-4 h-4" /> Pausar Melodía
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Escuchar Melodía
                      </>
                    )}
                  </button>

                  {isPlayingHymn && (
                    <button
                      onClick={handleStopHymn}
                      className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Detener"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}

                  {isPlayingHymn && (
                    <div className="flex items-center gap-1 px-2">
                      <span className="w-1.5 h-4 bg-emerald-500 animate-pulse rounded-full" />
                      <span className="w-1.5 h-6 bg-emerald-600 animate-pulse delay-75 rounded-full" />
                      <span className="w-1.5 h-3 bg-emerald-400 animate-pulse delay-150 rounded-full" />
                    </div>
                  )}
                </div>
              </div>

              {/* Chorus highlight */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300 block mb-2">
                  Coro Principal
                </span>
                <p className="text-base sm:text-lg font-serif italic text-emerald-950 dark:text-emerald-200 whitespace-pre-line leading-relaxed font-medium">
                  {SENA_HYMN_LYRICS.chorus}
                </p>
              </div>

              {/* Interactive Verse Selector */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Estrofas Oficiales:
                  </span>
                  <div className="flex gap-1.5">
                    {SENA_HYMN_LYRICS.verses.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveVerse(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeVerse === idx
                            ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {v.number}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                  <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-1">
                    Estrofa {SENA_HYMN_LYRICS.verses[activeVerse].number}
                  </div>
                  <p className="text-sm font-serif italic text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                    {SENA_HYMN_LYRICS.verses[activeVerse].text}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Código de Integridad (Valores Institucionales) */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            03. Código de Integridad SENA
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Los valores que norman la convivencia, el rigor formativo y la ética profesional del aprendiz en Colombia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENA_MISSION_VISION.integrityValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    Valor 0{idx + 1}
                  </span>
                  <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {val.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
                Aplicación obligatoria en aula y entorno productivo.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Línea de Tiempo Histórica */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              04. Raíces y Memoria: Historia del SENA
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Desde su fundación en 1957 hasta la actual revolución pedagógica y tecnológica.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
            Fundador: {SENA_HISTORY.founder}
          </span>
        </div>

        <div className="relative border-l-2 border-emerald-200 dark:border-emerald-800/80 ml-4 pl-6 space-y-6">
          {SENA_HISTORY.milestones.map((ms, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-emerald-600 dark:border-emerald-400" />
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  {ms.year}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {ms.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {ms.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completion & Next Module CTA */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-emerald-50/60 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
        <div>
          <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
            ¿Has interiorizado el valor y los símbolos institucionales?
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
            Asegúrate de marcar este módulo para registrar tu avance en la inducción.
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
            Siguiente Módulo: Ruta de Formación
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
