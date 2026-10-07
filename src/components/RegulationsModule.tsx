import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Filter,
  Download,
  Copy,
  Check,
  FileCode,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Calendar,
  Building,
  GraduationCap
} from 'lucide-react';
import { REGULATIONS_LIST, DILEMMA_CASES } from '../data/senaData';
import { ACUERDO_009_2024, downloadAcuerdo009Json, getAcuerdo009RawJson, CapituloAcuerdo } from '../data/acuerdo009Data';

interface RegulationsModuleProps {
  isCompleted: boolean;
  onMarkCompleted: () => void;
  onNextModule: () => void;
  dilemmasAnswered: Record<string, number>;
  onAnswerDilemma: (dilemmaId: string, points: number) => void;
}

type ModuleTab = 'explorador' | 'dilemas' | 'capitulos' | 'json' | 'novedades';

export const RegulationsModule: React.FC<RegulationsModuleProps> = ({
  isCompleted,
  onMarkCompleted,
  onNextModule,
  dilemmasAnswered,
  onAnswerDilemma,
}) => {
  const [activeTab, setActiveTab] = useState<ModuleTab>('capitulos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'derecho' | 'deber' | 'falta' | 'sancion'>('all');
  const [activeDilemmaIndex, setActiveDilemmaIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string>('todos');
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({ 1: true, 5: true, 8: true, 13: true, 18: true });
  const [copiedJson, setCopiedJson] = useState(false);
  const [jsonChapterFilter, setJsonChapterFilter] = useState<string>('full');

  const filteredRegulations = REGULATIONS_LIST.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.articleRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const currentDilemma = DILEMMA_CASES[activeDilemmaIndex];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
    setShowFeedback(true);
    const chosen = currentDilemma.options[idx];
    onAnswerDilemma(currentDilemma.id, chosen.points);
  };

  const handleNextDilemma = () => {
    setSelectedOptionIndex(null);
    setShowFeedback(false);
    if (activeDilemmaIndex < DILEMMA_CASES.length - 1) {
      setActiveDilemmaIndex(activeDilemmaIndex + 1);
    }
  };

  const toggleArticle = (artNum: number) => {
    setExpandedArticles(prev => ({
      ...prev,
      [artNum]: !prev[artNum]
    }));
  };

  const handleCopyJson = () => {
    let contentToCopy = '';
    if (jsonChapterFilter === 'full') {
      contentToCopy = getAcuerdo009RawJson();
    } else {
      const cap = ACUERDO_009_2024.reglamento.capitulos.find(c => c.numero === jsonChapterFilter);
      contentToCopy = JSON.stringify(cap || ACUERDO_009_2024, null, 2);
    }
    navigator.clipboard.writeText(contentToCopy);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const totalDilemmaPoints = Object.values(dilemmasAnswered).reduce((a, b) => a + b, 0);

  const displayedChapters = selectedChapter === 'todos' 
    ? ACUERDO_009_2024.reglamento.capitulos 
    : ACUERDO_009_2024.reglamento.capitulos.filter(c => c.numero === selectedChapter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                Módulo 03 · Marco Normativo Institucional
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Vigente: 05 Noviembre 2024
              </span>
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                Deroga Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Reglamento del Aprendiz SENA (Acuerdo No. 0009 de 2024)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Adopción oficial del nuevo Reglamento del Aprendiz por el Consejo Directivo Nacional. Estructurado íntegramente en formato digital y JSON para garantizar la transparencia pedagógica, convivencia pacífica, inclusión diferencial y debido proceso.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={downloadAcuerdo009Json}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:scale-102 active:scale-98"
              title="Descargar archivo acuerdo_009_de_2024_reglamento_aprendiz_sena.json"
            >
              <Download className="w-4 h-4" />
              <span>Descargar JSON</span>
            </button>

            <button
              onClick={onMarkCompleted}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
                isCompleted
                  ? 'bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 shadow-emerald-500/10'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span>{isCompleted ? 'Completado' : 'Marcar'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-6 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('capitulos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 font-semibold ${
              activeTab === 'capitulos'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Capítulos del Acuerdo 009 (5)</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 font-semibold ${
              activeTab === 'json'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Archivo JSON Oficial</span>
            <span className="bg-emerald-600 text-white dark:bg-emerald-400 dark:text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              .json
            </span>
          </button>

          <button
            onClick={() => setActiveTab('explorador')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 font-semibold ${
              activeTab === 'explorador'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Buscador de Normas</span>
          </button>

          <button
            onClick={() => setActiveTab('dilemas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 font-semibold ${
              activeTab === 'dilemas'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Simulador de Casos Éticos</span>
          </button>

          <button
            onClick={() => setActiveTab('novedades')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 font-semibold ${
              activeTab === 'novedades'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Novedades 2024 vs 2012</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CAPÍTULOS COMPLETOS DEL ACUERDO 009 DE 2024 */}
      {activeTab === 'capitulos' && (
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {ACUERDO_009_2024.titulo}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {ACUERDO_009_2024.reglamento.nombre}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                  {ACUERDO_009_2024.descripcion}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={downloadAcuerdo009Json}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar archivo JSON
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  Ver JSON
                </button>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-emerald-200/60 dark:border-emerald-800/60 text-xs">
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Capítulos</span>
                <span className="font-bold text-slate-900 dark:text-white text-base">5 Capítulos</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Artículos Regulados</span>
                <span className="font-bold text-slate-900 dark:text-white text-base">53 Artículos</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Emisor Normativo</span>
                <span className="font-bold text-slate-900 dark:text-white">Consejo Directivo Nacional</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Ámbito</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">Nacional e Integral</span>
              </div>
            </div>
          </div>

          {/* Chapter Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
              Filtrar Capítulo:
            </span>
            <button
              onClick={() => setSelectedChapter('todos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedChapter === 'todos'
                  ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Todos los Capítulos
            </button>
            {ACUERDO_009_2024.reglamento.capitulos.map((cap) => (
              <button
                key={cap.numero}
                onClick={() => setSelectedChapter(cap.numero)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedChapter === cap.numero
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Capítulo {cap.numero}
              </button>
            ))}
          </div>

          {/* Chapters Accordion / Display */}
          <div className="space-y-6">
            {displayedChapters.map((cap) => (
              <div
                key={cap.numero}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
              >
                {/* Chapter Banner */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                      Capítulo {cap.numero}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {cap.titulo}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {cap.descripcion}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    {cap.articulos.length} {cap.articulos.length === 1 ? 'artículo' : 'artículos'}
                  </span>
                </div>

                {/* Articles in Chapter */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {cap.articulos.map((art) => {
                    const isExpanded = !!expandedArticles[art.numero];
                    return (
                      <div key={art.numero} className="p-4 sm:p-5">
                        <div 
                          onClick={() => toggleArticle(art.numero)}
                          className="flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              Art.{art.numero}
                            </span>
                            <div>
                              <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                {art.nombre}
                              </h5>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                {art.contenido}
                              </p>
                            </div>
                          </div>

                          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Article Expanded Details */}
                        {isExpanded && (
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-3">
                            <p className="leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                              {art.contenido}
                            </p>

                            {/* Terms */}
                            {art.terminos && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
                                {art.terminos.map((t, tidx) => (
                                  <div key={tidx} className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                                    <strong className="text-emerald-800 dark:text-emerald-400 block mb-0.5">
                                      {t.termino}
                                    </strong>
                                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                                      {t.definicion}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Principles */}
                            {art.principios && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-2">
                                {art.principios.map((p, pidx) => (
                                  <div key={pidx} className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                                    <span className="font-bold text-slate-900 dark:text-white block mb-1">
                                      {p.principio}
                                    </span>
                                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                                      {p.descripcion}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Items / Rights list */}
                            {art.items && (
                              <ul className="space-y-1.5 pl-2 mt-2">
                                {art.items.map((it, itidx) => (
                                  <li key={itidx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">{it}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Classification of duties */}
                            {art.clasificacion && (
                              <div className="space-y-2 mt-2">
                                {art.clasificacion.map((cl: any, clidx) => (
                                  <div key={clidx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                                    <h6 className="font-bold text-slate-900 dark:text-white mb-1.5">
                                      {cl.tipo || cl.categoria}
                                    </h6>
                                    {cl.items && (
                                      <ul className="space-y-1 pl-2">
                                        {cl.items.map((cit: string, citidx: number) => (
                                          <li key={citidx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                                            <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                            <span>{cit}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                    {cl.descripcion && (
                                      <p className="text-[11px] text-slate-600 dark:text-slate-400">{cl.descripcion}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Prohibiciones */}
                            {art.prohibiciones && (
                              <div className="mt-2 space-y-1.5">
                                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
                                  Conductas Prohibidas:
                                </span>
                                {art.prohibiciones.map((proh, prohidx) => (
                                  <div key={prohidx} className="flex items-start gap-2 p-2 rounded-lg bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-[11px] text-rose-900 dark:text-rose-300">
                                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                                    <span>{proh}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Novedades */}
                            {art.tipos_novedades && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {art.tipos_novedades.map((nov, novidx) => (
                                  <div key={novidx} className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                                    <strong className="text-blue-900 dark:text-blue-300 block mb-0.5 text-xs">
                                      {nov.novedad}
                                    </strong>
                                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                                      {nov.descripcion}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Deserción */}
                            {art.causales && (
                              <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                                <span className="font-bold text-amber-900 dark:text-amber-300 block text-xs">
                                  Causales de Deserción:
                                </span>
                                <ul className="space-y-1 pl-2">
                                  {art.causales.map((cau, cauidx) => (
                                    <li key={cauidx} className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1" />
                                      <span>{cau}</span>
                                    </li>
                                  ))}
                                </ul>
                                {art.procedimiento && (
                                  <p className="mt-2 text-[11px] text-amber-900 dark:text-amber-200 pt-2 border-t border-amber-200 dark:border-amber-900/60 font-medium">
                                    <strong>Procedimiento de Notificación:</strong> {art.procedimiento}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Evaluaciones */}
                            {art.estados_evaluacion && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {art.estados_evaluacion.map((est, estidx) => (
                                  <div key={estidx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                                    <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">
                                      {est.estado}
                                    </strong>
                                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                                      {est.significado}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Sanciones */}
                            {art.sanciones && (
                              <div className="space-y-2 mt-2">
                                {art.sanciones.map((sanc, sancidx) => (
                                  <div key={sancidx} className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                                    <strong className="text-rose-900 dark:text-rose-300 block mb-0.5">
                                      {sanc.sancion}
                                    </strong>
                                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                                      {sanc.efecto}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Debido proceso */}
                            {art.etapas_debido_proceso && (
                              <div className="mt-2 space-y-1.5">
                                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                                  Etapas y Garantías del Debido Proceso:
                                </span>
                                {art.etapas_debido_proceso.map((et, etidx) => (
                                  <div key={etidx} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-[11px] text-slate-700 dark:text-slate-300">
                                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                      {etidx + 1}
                                    </span>
                                    <span className="leading-relaxed">{et}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ARCHIVO JSON OFICIAL & DESCARGA */}
      {activeTab === 'json' && (
        <div className="space-y-6">
          <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <FileCode className="w-4 h-4" />
                  <span>Estructura JSON Oficial y Descargable</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  acuerdo_009_de_2024_reglamento_aprendiz_sena.json
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Archivo JSON validado sintácticamente que contiene el 100% de la jerarquía normativa: Metadatos, Capítulos I a V, Definiciones, Derechos, Deberes, Prohibiciones, Novedades, Faltas y Debido Proceso.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado al Portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar JSON</span>
                    </>
                  )}
                </button>

                <button
                  onClick={downloadAcuerdo009Json}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-102"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Archivo .json</span>
                </button>
              </div>
            </div>

            {/* Selector de visualización */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Visualizar:</span>
                <select
                  value={jsonChapterFilter}
                  onChange={(e) => setJsonChapterFilter(e.target.value)}
                  className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="full">JSON Completo (Acuerdo 009 de 2024)</option>
                  <option value="I">Solo Capítulo I (Definiciones y Principios)</option>
                  <option value="II">Solo Capítulo II (Derechos y Representatividad)</option>
                  <option value="III">Solo Capítulo III (Deberes y Prohibiciones)</option>
                  <option value="IV">Solo Capítulo IV (Ingreso, Novedades y Deserción)</option>
                  <option value="V">Solo Capítulo V (Régimen Disciplinario y Sanciones)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Formato UTF-8
                </span>
                <span>•</span>
                <span>Indented 2 spaces</span>
              </div>
            </div>

            {/* Code Block Container */}
            <div className="mt-4 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px] font-mono">
                <span>src/data/acuerdo_009_de_2024_reglamento_aprendiz_sena.json</span>
                <span>{jsonChapterFilter === 'full' ? '53 Artículos' : 'Capítulo ' + jsonChapterFilter}</span>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-400/90 overflow-x-auto max-h-[460px] overflow-y-auto leading-relaxed select-all">
                {jsonChapterFilter === 'full' 
                  ? getAcuerdo009RawJson() 
                  : JSON.stringify(ACUERDO_009_2024.reglamento.capitulos.find(c => c.numero === jsonChapterFilter), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EXPLORADOR RÁPIDO DE NORMAS (DERECHOS, DEBERES, FALTAS, SANCIONES) */}
      {activeTab === 'explorador' && (
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Buscador Dinámico de Deberes, Derechos, Faltas y Sanciones
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Acceso indexado por palabra clave con referencias directas al Acuerdo No. 0009 de 2024.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por palabra clave (ej. deserción, plagio, debido proceso, Zajuna, carné)..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            {/* Category Filter segmented control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todos ({REGULATIONS_LIST.length})
              </button>
              <button
                onClick={() => setFilterType('derecho')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'derecho'
                    ? 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Derechos
              </button>
              <button
                onClick={() => setFilterType('deber')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'deber'
                    ? 'bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Deberes
              </button>
              <button
                onClick={() => setFilterType('falta')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'falta'
                    ? 'bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Faltas
              </button>
              <button
                onClick={() => setFilterType('sancion')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'sancion'
                    ? 'bg-white dark:bg-slate-800 text-rose-800 dark:text-rose-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sanciones
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRegulations.map((item) => {
              let badgeBg = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
              if (item.type === 'derecho') badgeBg = 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
              if (item.type === 'deber') badgeBg = 'bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
              if (item.type === 'falta') badgeBg = 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
              if (item.type === 'sancion') badgeBg = 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${badgeBg}`}>
                        {item.type}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                        {item.articleRef}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>Ámbito: {item.category || 'general'}</span>
                    {item.severity && (
                      <span className="font-semibold text-amber-700 dark:text-amber-400 capitalize">
                        Severidad: {item.severity}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRegulations.length === 0 && (
            <div className="text-center py-10 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No se encontraron artículos que coincidan con "{searchQuery}". Intenta con otros términos como "inasistencia", "falta", "plagio" o "Zajuna".
              </p>
            </div>
          )}
        </section>
      )}

      {/* TAB 4: SIMULADOR DE DILEMAS ÉTICOS */}
      {activeTab === 'dilemas' && (
        <section className="bg-slate-900 dark:bg-slate-900/90 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Scale className="w-4 h-4" />
                <span>Simulador Interactivo de Ética y Reglamento</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Dilemas Cotidianos del Aprendiz SENA
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ponte en situaciones reales y evalúa tus decisiones frente al Código de Integridad y el Acuerdo 009 de 2024.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300">
                Puntos de Mérito acumulados:
              </span>
              <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
                {totalDilemmaPoints} / 100 pts
              </span>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-between mt-6 mb-4">
            <span className="text-xs font-semibold text-emerald-400">
              Caso {activeDilemmaIndex + 1} de {DILEMMA_CASES.length}
            </span>
            <div className="flex gap-1.5">
              {DILEMMA_CASES.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setActiveDilemmaIndex(i);
                    setSelectedOptionIndex(null);
                    setShowFeedback(false);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeDilemmaIndex === i
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : dilemmasAnswered[d.id] !== undefined
                      ? 'bg-emerald-900 text-emerald-300'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Case Presentation */}
          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700">
            <h4 className="text-base font-bold text-white mb-2">
              {currentDilemma.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {currentDilemma.context}
            </p>
            <div className="text-xs font-semibold text-emerald-300 bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/60">
              Pregunta: {currentDilemma.situation}
            </div>

            {/* Options */}
            <div className="mt-4 space-y-2.5">
              {currentDilemma.options.map((opt, optIdx) => {
                const isSelected = selectedOptionIndex === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs transition-all cursor-pointer border flex items-start gap-3 ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-900/50 border-emerald-500 text-white'
                          : 'bg-rose-950/40 border-rose-600 text-white'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/60 hover:text-white'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback section */}
            {showFeedback && selectedOptionIndex !== null && (
              <div
                className={`mt-4 p-4 rounded-xl text-xs leading-relaxed border ${
                  currentDilemma.options[selectedOptionIndex].isCorrect
                    ? 'bg-emerald-900/30 border-emerald-600/80 text-emerald-200'
                    : 'bg-amber-950/30 border-amber-600/80 text-amber-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  {currentDilemma.options[selectedOptionIndex].isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>¡Conducta Institucional Acertada! (+{currentDilemma.options[selectedOptionIndex].points} pts)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Recomendación Formativa del Reglamento</span>
                    </>
                  )}
                </div>
                <p>{currentDilemma.options[selectedOptionIndex].explanation}</p>

                {activeDilemmaIndex < DILEMMA_CASES.length - 1 && (
                  <div className="mt-3 text-right">
                    <button
                      onClick={handleNextDilemma}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/25 transition-all cursor-pointer hover:scale-102 active:scale-98"
                    >
                      Siguiente Caso <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 5: NOVEDADES 2024 VS 2012 */}
      {activeTab === 'novedades' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              ¿Por qué cambió el Reglamento? Claves del Acuerdo 009 de 2024 vs. Acuerdo 007 de 2012
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 max-w-3xl leading-relaxed">
              El Consejo Directivo Nacional expidió el Acuerdo 0009 el 05 de noviembre de 2024 con el objetivo de modernizar la normativa estudiantil, incorporar la formación digital y las plataformas virtuales (Zajuna), robustecer las garantías del debido proceso y adoptar un enfoque de justicia restaurativa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm mb-3">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Novedades del Acuerdo No. 0009 de 2024</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">✓</span>
                    <span><strong>Entornos Virtuales (LMS Zajuna):</strong> Reconocimiento pleno de la formación virtual con reglas específicas de permanencia (15 días de inactividad causal de deserción).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">✓</span>
                    <span><strong>Enfoque Diferencial y Territorial:</strong> Inclusión pedagógica activa para poblaciones vulnerables y campesinas (CampoSENA).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">✓</span>
                    <span><strong>Justicia Restaurativa:</strong> Prioridad del diálogo, la concertación de planes formativos y la reparación sobre el castigo punitivo directo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">✓</span>
                    <span><strong>Credencial y Carnet Digital:</strong> Reconocimiento normativo del carné digital en dispositivos móviles para el acceso y servicios.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">✓</span>
                    <span><strong>Garantías Procesales:</strong> Notificaciones electrónicas formales, 5 días hábiles para citación previa y derecho expreso a recursos de ley (reposición y apelación).</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm mb-3">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>Régimen Derogado (Acuerdo 007 de 2012)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Enfocado principalmente en la presencialidad física en aulas y talleres.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>No regulaba con exactitud los plazos de inactividad en plataformas virtuales modernas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Esquema disciplinario más rígido y menor énfasis en mecanismos restaurativos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Carnet físico tradicional como único medio previsto de identificación.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Derogado formalmente por el Artículo de vigencia del Acuerdo 009 de 2024.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion CTA */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-emerald-50/60 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
        <div>
          <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
            ¿Comprendes la normativa del Acuerdo 009 de 2024 y el debido proceso?
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
            Marca el módulo completado para continuar hacia Bienestar al Aprendiz y el Ecosistema SENNOVA.
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
            Siguiente Módulo: Bienestar y SENNOVA
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
