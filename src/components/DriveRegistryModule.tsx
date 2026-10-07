import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  Search, 
  Download, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  FolderSync, 
  Calendar,
  Layers,
  GraduationCap,
  Award,
  ChevronRight,
  Database,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  FileText,
  X,
  HelpCircle,
  Clock,
  Trash2,
  Check,
  Send,
  User,
  BookOpen
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { ApprenticeProfile, InductionProgress } from '../types/induction';
import { 
  initAuth, 
  googleSignIn, 
  googleLogout, 
  createInductionSpreadsheet, 
  appendApprenticeRecord, 
  fetchApprenticeRecords, 
  getSavedSpreadsheetId, 
  saveSpreadsheetId,
  ApprenticeRecordRow,
  findExistingSpreadsheet,
  getOrSetupSpreadsheet
} from '../services/googleWorkspace';
import {
  getSubmissions,
  saveApprenticeSubmission,
  markSubmissionAsSynced,
  markAllAsSynced,
  deleteSubmission,
  clearAllSubmissions,
  exportSubmissionsToCSV,
  changeAdminPin,
  ApprenticeSubmissionRecord,
  QuizAnswerDetail
} from '../services/adminService';

interface DriveRegistryModuleProps {
  currentProfile: ApprenticeProfile;
  progress: InductionProgress;
  onExitAdminMode: () => void;
}

export const DriveRegistryModule: React.FC<DriveRegistryModuleProps> = ({
  currentProfile,
  progress,
  onExitAdminMode,
}) => {
  // Navigation inside Admin Module
  const [adminTab, setAdminTab] = useState<'respuestas' | 'drive' | 'seguridad'>('respuestas');

  // Google Workspace state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(getSavedSpreadsheetId());
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null);
  const [sheetRecords, setSheetRecords] = useState<ApprenticeRecordRow[]>([]);
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);

  // Submissions state (Local submission queue)
  const [submissions, setSubmissions] = useState<ApprenticeSubmissionRecord[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aprobado' | 'reprobado' | 'pending_sync'>('all');
  const [selectedSubmissionForDetails, setSelectedSubmissionForDetails] = useState<ApprenticeSubmissionRecord | null>(null);
  
  // Syncing state
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [statusNotification, setStatusNotification] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // One-click Auto Connect & Sync Wizard
  const [showSyncWizard, setShowSyncWizard] = useState(false);
  const [targetSyncSub, setTargetSyncSub] = useState<ApprenticeSubmissionRecord | null>(null);
  const [wizardStep, setWizardStep] = useState<'idle' | 'logging_in' | 'creating_sheet' | 'syncing' | 'completed'>('idle');
  const [wizardError, setWizardError] = useState<string | null>(null);
  const [syncedCountInWizard, setSyncedCountInWizard] = useState(0);

  // Security / PIN state
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Show/Hide spreadsheet ID
  const [showSheetDetails, setShowSheetDetails] = useState(false);

  // Load submissions
  const reloadSubmissions = () => {
    setSubmissions(getSubmissions());
  };

  useEffect(() => {
    reloadSubmissions();
  }, []);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Discover spreadsheet when user logged in
  useEffect(() => {
    if (accessToken && currentUser) {
      handleAutoDiscoverSpreadsheet(accessToken);
    }
  }, [accessToken, currentUser]);

  const handleAutoDiscoverSpreadsheet = async (token: string) => {
    setIsLoadingSheet(true);
    try {
      const savedId = getSavedSpreadsheetId();
      if (savedId) {
        setSpreadsheetId(savedId);
        setSpreadsheetUrl(`https://docs.google.com/spreadsheets/d/${savedId}/edit`);
        await loadSheetRecords(token, savedId);
      } else {
        const found = await findExistingSpreadsheet(token);
        if (found) {
          setSpreadsheetId(found.id);
          saveSpreadsheetId(found.id);
          setSpreadsheetUrl(`https://docs.google.com/spreadsheets/d/${found.id}/edit`);
          await loadSheetRecords(token, found.id);
        }
      }
    } catch (e: any) {
      console.error('Error discovering spreadsheet:', e);
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const loadSheetRecords = async (token: string, sheetId: string) => {
    setIsLoadingSheet(true);
    try {
      const rows = await fetchApprenticeRecords(token, sheetId);
      setSheetRecords(rows);
    } catch (err: any) {
      console.error('Error loading rows:', err);
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setStatusNotification(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        setStatusNotification({
          type: 'success',
          text: `Conectado exitosamente como instructor: ${result.user.email}`,
        });
      }
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setStatusNotification({
          type: 'info',
          text: 'La ventana de inicio de sesión con Google fue cerrada antes de completar la autorización. Puedes volver a intentarlo cuando lo requieras.',
        });
      } else {
        setStatusNotification({
          type: 'error',
          text: `Error de autenticación con Google: ${err.message || 'Verifica la ventana emergente'}`,
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await googleLogout();
    setCurrentUser(null);
    setAccessToken(null);
    setSheetRecords([]);
    setStatusNotification({
      type: 'info',
      text: 'Sesión de Google cerrada de forma segura.',
    });
  };

  const handleCreateNewSheet = async () => {
    if (!accessToken) {
      setStatusNotification({ type: 'error', text: 'Debes iniciar sesión con Google primero.' });
      return;
    }
    setIsCreatingSheet(true);
    setStatusNotification(null);
    try {
      const created = await createInductionSpreadsheet(accessToken);
      setSpreadsheetId(created.id);
      saveSpreadsheetId(created.id);
      setSpreadsheetUrl(created.url);
      setStatusNotification({
        type: 'success',
        text: '¡Hoja oficial creada exitosamente en tu Google Drive personal!',
      });
      await loadSheetRecords(accessToken, created.id);
    } catch (err: any) {
      setStatusNotification({
        type: 'error',
        text: `Error al crear hoja: ${err.message}`,
      });
    } finally {
      setIsCreatingSheet(false);
    }
  };

  // Launch the smart sync wizard
  const handleStartSyncWizard = (specificSub?: ApprenticeSubmissionRecord | null) => {
    setTargetSyncSub(specificSub || null);
    setShowSyncWizard(true);
    setWizardStep('idle');
    setWizardError(null);
  };

  // Execute one-click smart sync
  const executeOneClickSync = async (specificSub?: ApprenticeSubmissionRecord | null) => {
    setWizardError(null);
    let activeToken = accessToken;
    let activeUser = currentUser;

    try {
      // Step 1: Authenticate if not connected
      if (!activeToken || !activeUser) {
        setWizardStep('logging_in');
        const loginResult = await googleSignIn();
        if (!loginResult) {
          throw new Error('No se pudo completar el inicio de sesión con Google');
        }
        activeToken = loginResult.accessToken;
        activeUser = loginResult.user;
        setCurrentUser(activeUser);
        setAccessToken(activeToken);
      }

      // Step 2: Ensure spreadsheet exists
      setWizardStep('creating_sheet');
      let currentSheetId = spreadsheetId;
      if (!currentSheetId) {
        const sheetRes = await getOrSetupSpreadsheet(activeToken);
        currentSheetId = sheetRes.id;
        setSpreadsheetId(sheetRes.id);
        saveSpreadsheetId(sheetRes.id);
        setSpreadsheetUrl(sheetRes.url);
      }

      // Step 3: Sync records
      setWizardStep('syncing');
      const itemsToSync = specificSub 
        ? [specificSub] 
        : submissions.filter((s) => !s.syncedToGoogle);

      if (itemsToSync.length === 0) {
        setSyncedCountInWizard(0);
        setWizardStep('completed');
        return;
      }

      let count = 0;
      for (const sub of itemsToSync) {
        const row: ApprenticeRecordRow = {
          timestamp: sub.timestamp,
          fullName: sub.fullName,
          documentType: sub.documentType,
          documentNumber: sub.documentNumber,
          programName: sub.programName,
          tokenNumber: sub.tokenNumber,
          regional: sub.regional,
          centerName: sub.centerName,
          inductionStatus: sub.status === 'Aprobado' ? 'Aprobado (100% Inducción)' : `No aprobado (${sub.quizScore}%)`,
          quizScore: `${sub.quizScore}%`,
          certificateGenerated: sub.quizPassed ? 'Sí, expedido' : 'No expedido',
          notes: sub.notes || 'Registro sincronizado desde portal de evaluación',
        };
        await appendApprenticeRecord(activeToken, currentSheetId, row);
        markSubmissionAsSynced(sub.id);
        count++;
      }

      setSyncedCountInWizard(count);
      reloadSubmissions();
      await loadSheetRecords(activeToken, currentSheetId);
      setWizardStep('completed');
      setStatusNotification({
        type: 'success',
        text: `¡${count} registro(s) sincronizado(s) exitosamente en tu Google Sheets de Drive!`,
      });
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setWizardError('La ventana de Google fue cerrada antes de autorizar. Por favor, reintenta y asegúrate de permitir las ventanas emergentes en tu navegador.');
      } else {
        setWizardError(err.message || 'Error durante la sincronización');
      }
      setWizardStep('idle');
    }
  };

  // Sync a single submission to Google Sheets
  const handleSyncSingleSubmission = async (sub: ApprenticeSubmissionRecord) => {
    if (!accessToken || !spreadsheetId) {
      handleStartSyncWizard(sub);
      return;
    }

    setSyncingId(sub.id);
    try {
      const row: ApprenticeRecordRow = {
        timestamp: sub.timestamp,
        fullName: sub.fullName,
        documentType: sub.documentType,
        documentNumber: sub.documentNumber,
        programName: sub.programName,
        tokenNumber: sub.tokenNumber,
        regional: sub.regional,
        centerName: sub.centerName,
        inductionStatus: sub.status === 'Aprobado' ? 'Aprobado (100% Inducción)' : `No aprobado (${sub.quizScore}%)`,
        quizScore: `${sub.quizScore}%`,
        certificateGenerated: sub.quizPassed ? 'Sí, expedido' : 'No expedido',
        notes: sub.notes || 'Registro sincronizado desde portal de evaluación',
      };

      await appendApprenticeRecord(accessToken, spreadsheetId, row);
      markSubmissionAsSynced(sub.id);
      reloadSubmissions();
      await loadSheetRecords(accessToken, spreadsheetId);
      setStatusNotification({
        type: 'success',
        text: `Aprendiz ${sub.fullName} sincronizado exitosamente en Google Sheets.`,
      });
    } catch (err: any) {
      setStatusNotification({
        type: 'error',
        text: `Error al sincronizar aprendiz: ${err.message}`,
      });
    } finally {
      setSyncingId(null);
    }
  };

  // Sync all pending submissions
  const handleSyncAllPending = async () => {
    if (!accessToken || !spreadsheetId) {
      handleStartSyncWizard(null);
      return;
    }

    const pending = submissions.filter((s) => !s.syncedToGoogle);
    if (pending.length === 0) {
      setStatusNotification({
        type: 'info',
        text: 'No hay registros pendientes por sincronizar.',
      });
      return;
    }

    setIsSyncingAll(true);
    setStatusNotification(null);
    let successCount = 0;
    try {
      for (const sub of pending) {
        const row: ApprenticeRecordRow = {
          timestamp: sub.timestamp,
          fullName: sub.fullName,
          documentType: sub.documentType,
          documentNumber: sub.documentNumber,
          programName: sub.programName,
          tokenNumber: sub.tokenNumber,
          regional: sub.regional,
          centerName: sub.centerName,
          inductionStatus: sub.status === 'Aprobado' ? 'Aprobado (100% Inducción)' : `No aprobado (${sub.quizScore}%)`,
          quizScore: `${sub.quizScore}%`,
          certificateGenerated: sub.quizPassed ? 'Sí, expedido' : 'No expedido',
          notes: sub.notes || 'Registro sincronizado desde portal',
        };
        await appendApprenticeRecord(accessToken, spreadsheetId, row);
        markSubmissionAsSynced(sub.id);
        successCount++;
      }
      reloadSubmissions();
      await loadSheetRecords(accessToken, spreadsheetId);
      setStatusNotification({
        type: 'success',
        text: `¡${successCount} registros de aprendices sincronizados satisfactoriamente en tu hoja de Google Drive!`,
      });
    } catch (err: any) {
      setStatusNotification({
        type: 'error',
        text: `Error durante la sincronización masiva: ${err.message}`,
      });
    } finally {
      setIsSyncingAll(false);
    }
  };

  // Handle PIN change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = changeAdminPin(oldPin, newPin);
    setPinChangeMsg({ success: result.success, text: result.message });
    if (result.success) {
      setOldPin('');
      setNewPin('');
    }
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((s) => {
    const q = searchFilter.toLowerCase();
    const matchSearch =
      s.fullName.toLowerCase().includes(q) ||
      s.documentNumber.toLowerCase().includes(q) ||
      s.tokenNumber.toLowerCase().includes(q) ||
      s.programName.toLowerCase().includes(q);

    if (!matchSearch) return false;

    if (statusFilter === 'aprobado') return s.quizPassed;
    if (statusFilter === 'reprobado') return !s.quizPassed;
    if (statusFilter === 'pending_sync') return !s.syncedToGoogle;
    return true;
  });

  const totalLearners = submissions.length;
  const passedCount = submissions.filter((s) => s.quizPassed).length;
  const pendingSyncCount = submissions.filter((s) => !s.syncedToGoogle).length;
  const avgScore = totalLearners > 0
    ? Math.round(submissions.reduce((acc, s) => acc + s.quizScore, 0) / totalLearners)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Admin Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Sesión Administrativa Activa
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentUser ? `Conectado: ${currentUser.email}` : 'Google Drive Desconectado'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 text-white">
                Panel de Control del Instructor & Registro Seguro
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdminMode}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <LogOut className="w-4 h-4 text-emerald-400" />
              <span>Cerrar Modo Administrador</span>
            </button>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-200/90">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Privacidad Garantizada:</strong> Los aprendices NO pueden ver esta sección ni tienen acceso a la URL de tu hoja de cálculo. Puedes compartir el prototipo con tranquilidad.
          </span>
        </div>
      </div>

      {/* Quick KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-gradient-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span>Pruebas Presentadas</span>
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalLearners}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            Aprendices registrados en base de datos
          </p>
        </div>

        <div className="glass-gradient-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span>Tasa de Aprobación</span>
            <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalLearners > 0 ? Math.round((passedCount / totalLearners) * 100) : 0}%
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            {passedCount} de {totalLearners} aprendices (≥70 pts)
          </p>
        </div>

        <div className="glass-gradient-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span>Promedio Calificaciones</span>
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {avgScore} / 100
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            Puntaje medio de inducción
          </p>
        </div>

        <div className="glass-gradient-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span>Por Sincronizar en Drive</span>
            <FolderSync className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {pendingSyncCount}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {pendingSyncCount === 0 ? 'Al día con Google Sheets' : 'Listos para enviar a la hoja'}
          </p>
        </div>
      </div>

      {/* Status Notification Toast */}
      {statusNotification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 border transition-all ${
            statusNotification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : statusNotification.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200'
              : 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200'
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            {statusNotification.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />}
            {statusNotification.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />}
            {statusNotification.type === 'info' && <HelpCircle className="w-4 h-4 shrink-0 text-blue-600" />}
            <span>{statusNotification.text}</span>
          </div>
          <button
            onClick={() => setStatusNotification(null)}
            className="p-1 hover:bg-black/10 rounded-full cursor-pointer text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Admin Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
        <button
          onClick={() => setAdminTab('respuestas')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            adminTab === 'respuestas'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>1. Respuestas de Aprendices ({submissions.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('drive')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            adminTab === 'drive'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>2. Sincronización Google Drive & Hoja</span>
          {pendingSyncCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-mono flex items-center justify-center">
              {pendingSyncCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('seguridad')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            adminTab === 'seguridad'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>3. Seguridad & Contraseña</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: RESPUESTAS DE APRENDICES */}
      {/* ========================================================================= */}
      {adminTab === 'respuestas' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar por aprendiz, cédula, ficha o programa..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Todos ({submissions.length})
                </button>
                <button
                  onClick={() => setStatusFilter('aprobado')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'aprobado'
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Aprobados ({passedCount})
                </button>
                <button
                  onClick={() => setStatusFilter('pending_sync')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'pending_sync'
                      ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Por Sincronizar ({pendingSyncCount})
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => exportSubmissionsToCSV(submissions)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Descargar archivo Excel / CSV con todas las respuestas"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Exportar CSV / Excel</span>
              </button>

              <button
                onClick={handleSyncAllPending}
                disabled={isSyncingAll || pendingSyncCount === 0}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {isSyncingAll ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sincronizando...</span>
                  </>
                ) : (
                  <>
                    <FolderSync className="w-3.5 h-3.5" />
                    <span>Sincronizar a Drive ({pendingSyncCount})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Helpful 1-Click Sync Callout */}
          {pendingSyncCount > 0 && (!accessToken || !spreadsheetId) && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <FolderSync className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-emerald-950 dark:text-emerald-100">
                    Sincronización con Google Sheets disponible
                  </h5>
                  <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                    Hay <strong>{pendingSyncCount}</strong> prueba(s) completada(s) seguras en este dispositivo. Puedes vincular tu Google Drive en 1 solo clic o descargar el consolidado en Excel.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportSubmissionsToCSV(submissions)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Excel (CSV)</span>
                </button>
                <button
                  onClick={() => handleStartSyncWizard(null)}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <FolderSync className="w-3.5 h-3.5" />
                  <span>Conectar y Sincronizar en 1 Clic</span>
                </button>
              </div>
            </div>
          )}

          {/* Submissions Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                    <th className="p-4 pl-6">Aprendiz / Identificación</th>
                    <th className="p-4">Ficha & Programa</th>
                    <th className="p-4 text-center">Calificación</th>
                    <th className="p-4 text-center">Estado</th>
                    <th className="p-4 text-center">Drive Sync</th>
                    <th className="p-4 text-center">Fecha Presentación</th>
                    <th className="p-4 pr-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-500 dark:text-slate-400">
                        <User className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                        <p className="font-semibold">No se encontraron registros de aprendices</p>
                        <p className="text-[11px] mt-1 text-slate-400">
                          Cuando los aprendices realicen la prueba en el módulo de certificación, sus resultados aparecerán aquí automáticamente.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => (
                      <tr 
                        key={sub.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        {/* Name and Doc */}
                        <td className="p-4 pl-6">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {sub.fullName}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {sub.documentType} {sub.documentNumber}
                          </div>
                        </td>

                        {/* Token & Program */}
                        <td className="p-4 max-w-xs">
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800 text-[11px]">
                            Ficha {sub.tokenNumber}
                          </span>
                          <div className="text-slate-700 dark:text-slate-300 font-medium truncate mt-1" title={sub.programName}>
                            {sub.programName}
                          </div>
                        </td>

                        {/* Score */}
                        <td className="p-4 text-center">
                          <span className={`inline-block font-mono font-extrabold text-sm px-2.5 py-1 rounded-lg border ${
                            sub.quizScore >= 70
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                              : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
                          }`}>
                            {sub.quizScore}%
                          </span>
                        </td>

                        {/* Status */}
                        <td className="p-4 text-center">
                          {sub.quizPassed ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                              <CheckCircle2 className="w-3 h-3" /> Aprobado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-700">
                              <AlertCircle className="w-3 h-3" /> No Aprobado
                            </span>
                          )}
                        </td>

                        {/* Sync status */}
                        <td className="p-4 text-center">
                          {sub.syncedToGoogle ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold" title={`Sincronizado: ${sub.syncedAt}`}>
                              <Check className="w-3.5 h-3.5" /> En Drive
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSyncSingleSubmission(sub)}
                              disabled={syncingId === sub.id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 transition-colors cursor-pointer"
                              title="Sincronizar a tu hoja de cálculo"
                            >
                              {syncingId === sub.id ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              <span>Enviar a Drive</span>
                            </button>
                          )}
                        </td>

                        {/* Timestamp */}
                        <td className="p-4 text-center text-slate-500 font-mono text-[11px]">
                          {sub.timestamp}
                        </td>

                        {/* Actions */}
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedSubmissionForDetails(sub)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Ver Respuestas</span>
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`¿Eliminar registro de ${sub.fullName}?`)) {
                                  deleteSubmission(sub.id);
                                  reloadSubmissions();
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Eliminar registro"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GOOGLE DRIVE & SHEETS */}
      {/* ========================================================================= */}
      {adminTab === 'drive' && (
        <div className="space-y-6">
          {/* Architecture / Security Card */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Hoja de Cálculo en tu Google Drive Institucional
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Esta hoja se almacena de forma 100% privada bajo tu cuenta de Google. Los aprendices que presenten la inducción no conocen el enlace ni tienen permisos sobre tu Drive. Solo tú como instructor autenticado puedes consultar o editar el archivo.
                </p>
              </div>
            </div>
          </div>

          {/* 1-Click Quick Setup Assistant Banner */}
          {(!currentUser || !spreadsheetId || pendingSyncCount > 0) && (
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4 border border-emerald-400/30 animate-fade-in">
              <div className="space-y-1 max-w-xl">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
                  Solución en 1 Clic
                </span>
                <h4 className="text-base font-extrabold text-white">
                  Asistente Automatizado de Conexión & Hoja de Drive
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Inicia sesión con tu cuenta de Google, detecta o crea automáticamente la hoja con formato SENA, y sube todos los registros de los aprendices con un solo clic.
                </p>
              </div>
              <button
                onClick={() => handleStartSyncWizard(null)}
                className="px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <FolderSync className="w-4 h-4 text-emerald-600" />
                <span>Ejecutar Asistente en 1 Clic</span>
              </button>
            </div>
          )}

          {/* Google Auth Status Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Paso 1: Conexión OAuth con Google
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Cuenta de Google del Administrador
                </h4>
              </div>

              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {currentUser.displayName || 'Instructor SENA'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {currentUser.email}
                    </span>
                  </div>
                  <button
                    onClick={handleGoogleLogout}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Desconectar</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Conectando con Google...</span>
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Conectar mi Cuenta de Google</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Step 2: Spreadsheet Connection */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Paso 2: Archivo en Google Drive
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Hoja de Cálculo: "Registro Inducción SENA - Aprendices"
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  {currentUser && (
                    <button
                      onClick={handleCreateNewSheet}
                      disabled={isCreatingSheet}
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCreatingSheet ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                      <span>Crear Nueva Hoja en Drive</span>
                    </button>
                  )}

                  {spreadsheetUrl && (
                    <a
                      href={spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir Hoja en Google Drive</span>
                    </a>
                  )}
                </div>
              </div>

              {spreadsheetId ? (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      ID del Archivo en Drive:
                    </span>
                    <button
                      onClick={() => setShowSheetDetails(!showSheetDetails)}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {showSheetDetails ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showSheetDetails ? 'Ocultar ID' : 'Mostrar ID'}</span>
                    </button>
                  </div>
                  {showSheetDetails ? (
                    <div className="font-mono text-xs bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 break-all select-all text-slate-700 dark:text-slate-300">
                      {spreadsheetId}
                    </div>
                  ) : (
                    <div className="font-mono text-xs text-slate-400">
                      •••••••••••••••••••••••••••••••••••••••• (Protegido contra exposición)
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-600" />
                      <span>Filas en la Hoja de Google: <strong>{sheetRecords.length}</strong></span>
                    </div>

                    {accessToken && (
                      <button
                        onClick={() => loadSheetRecords(accessToken, spreadsheetId)}
                        disabled={isLoadingSheet}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheet ? 'animate-spin' : ''}`} />
                        <span>Actualizar datos de la hoja</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500">
                  <p className="text-xs">
                    {currentUser 
                      ? 'No hay una hoja vinculada aún. Haz clic en "Crear Nueva Hoja en Drive" para generar el formato oficial institucional con encabezados estilizados.'
                      : 'Conecta tu cuenta de Google arriba para crear o vincular tu hoja de cálculo privada.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SEGURIDAD & CLAVE */}
      {/* ========================================================================= */}
      {adminTab === 'seguridad' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Change Admin PIN */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Cambiar Clave / PIN del Administrador
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Personaliza tu código numérico de acceso exclusivo.
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePin} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  PIN Actual:
                </label>
                <input
                  type="password"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="Ej. 1957"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nuevo PIN (Mínimo 4 dígitos):
                </label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Digita tu nuevo código secreto"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                  required
                />
              </div>

              {pinChangeMsg && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    pinChangeMsg.success
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200'
                      : 'bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-200'
                  }`}
                >
                  {pinChangeMsg.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Actualizar PIN de Administrador
              </button>
            </form>
          </div>

          {/* Card: Legal & Habeas Data Compliance */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Directrices de Seguridad de la Información
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ley 1581 de 2012 (Habeas Data) y Políticas SENA
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc pl-5">
                <li>
                  <strong>No divulgación del enlace:</strong> La hoja de Google Sheets en Drive contiene nombres, cédulas y calificaciones que no deben circular entre aprendices.
                </li>
                <li>
                  <strong>Cierre de sesión:</strong> Al terminar tu revisión, haz clic en <em>"Cerrar Modo Administrador"</em> para que los aprendices solo vean el módulo formativo.
                </li>
                <li>
                  <strong>Respaldo local:</strong> Todas las pruebas se conservan en la cola del prototipo hasta que las sincronices o las exportes en archivo CSV.
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que deseas limpiar la base de datos de pruebas locales?')) {
                    clearAllSubmissions();
                    reloadSubmissions();
                  }
                }}
                className="text-xs text-red-600 dark:text-red-400 hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar registros locales de prueba</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VISOR DETALLADO DE RESPUESTAS DEL APRENDIZ */}
      {/* ========================================================================= */}
      {selectedSubmissionForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center font-bold">
                  {selectedSubmissionForDetails.quizScore}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Detalle de Examen
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedSubmissionForDetails.quizPassed
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {selectedSubmissionForDetails.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedSubmissionForDetails.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedSubmissionForDetails.documentType} {selectedSubmissionForDetails.documentNumber} · Ficha {selectedSubmissionForDetails.tokenNumber}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSubmissionForDetails(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Questions Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pb-3 border-b border-slate-100 dark:border-slate-800 font-mono">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Puntaje Gamificado</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedSubmissionForDetails.gamifiedPoints ? `${selectedSubmissionForDetails.gamifiedPoints.toLocaleString()} pts` : `${selectedSubmissionForDetails.quizScore * 30} pts`}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Tiempo Empleado</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {selectedSubmissionForDetails.totalTimeFormatted || '03:15 min'}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Aciertos Totales</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {selectedSubmissionForDetails.correctAnswersCount !== undefined 
                      ? `${selectedSubmissionForDetails.correctAnswersCount}/${selectedSubmissionForDetails.totalQuestionsCount || 25}` 
                      : `${Math.round(selectedSubmissionForDetails.quizScore / 10)}/10`}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Racha Máxima</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    🔥 {selectedSubmissionForDetails.maxStreak || 0} seguidas
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                <span>Fecha: <strong>{selectedSubmissionForDetails.timestamp}</strong></span>
                {selectedSubmissionForDetails.email && (
                  <span>Correo: <strong className="font-mono">{selectedSubmissionForDetails.email}</strong></span>
                )}
              </div>

              <div className="space-y-4">
                {selectedSubmissionForDetails.detailedAnswers.map((ans, idx) => (
                  <div
                    key={ans.questionId}
                    className={`p-4 rounded-2xl border transition-all ${
                      ans.isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">
                          {ans.category}
                        </span>
                      </div>

                      {ans.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Correcto
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 dark:text-red-400">
                          <AlertCircle className="w-4 h-4" /> Incorrecto
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-2 leading-relaxed">
                      {ans.question}
                    </p>

                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80">
                        <span className="text-[11px] font-bold text-slate-500 block mb-0.5">
                          Respuesta elegida por el aprendiz:
                        </span>
                        <span className={ans.isCorrect ? 'text-emerald-800 dark:text-emerald-300 font-semibold' : 'text-red-700 dark:text-red-300 font-semibold'}>
                          {ans.selectedText}
                        </span>
                      </div>

                      {!ans.isCorrect && (
                        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                            Respuesta correcta oficial:
                          </span>
                          <span>{ans.correctText}</span>
                        </div>
                      )}

                      <div className="p-2 text-[11px] text-slate-500 dark:text-slate-400 italic">
                        <strong>Explicación:</strong> {ans.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                {selectedSubmissionForDetails.syncedToGoogle 
                  ? `Sincronizado a Drive: ${selectedSubmissionForDetails.syncedAt}`
                  : 'Pendiente de sincronizar a Google Drive'}
              </span>
              <button
                onClick={() => setSelectedSubmissionForDetails(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Sync Assistant Modal */}
      {showSyncWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0 text-slate-900 dark:text-white">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <FolderSync className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                      Google Drive & Google Sheets
                    </span>
                    <h3 className="text-lg font-extrabold text-white">
                      Asistente de Sincronización
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowSyncWizard(false)}
                  disabled={wizardStep === 'logging_in' || wizardStep === 'creating_sheet' || wizardStep === 'syncing'}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5 text-xs">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Para enviar las respuestas de los aprendices a tu hoja de cálculo privada en Google Drive con formato institucional SENA, realizamos la vinculación segura de tu cuenta con un solo clic.
              </p>

              {/* Progress Checklist */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                {/* Step 1: Account */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentUser 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {currentUser ? <Check className="w-3.5 h-3.5" /> : '1'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Cuenta de Google del Instructor
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {currentUser ? currentUser.email : 'No conectada aún'}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    currentUser 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                  }`}>
                    {currentUser ? 'Listo ✓' : 'Pendiente'}
                  </span>
                </div>

                {/* Step 2: Spreadsheet */}
                <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 pt-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      spreadsheetId 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {spreadsheetId ? <Check className="w-3.5 h-3.5" /> : '2'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Hoja Oficial en Google Drive
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {spreadsheetId ? 'Vinculada ("Registro Inducción SENA")' : 'Se creará automáticamente en tu Drive'}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    spreadsheetId 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' 
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {spreadsheetId ? 'Lista ✓' : 'Automática'}
                  </span>
                </div>

                {/* Step 3: Pending records */}
                <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 pt-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <FolderSync className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Registros por Enviar
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {targetSyncSub 
                          ? `1 registro seleccionado (${targetSyncSub.fullName})` 
                          : `${pendingSyncCount} aprendices listos para sincronizar`}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                    {targetSyncSub ? '1 aprendiz' : `${pendingSyncCount} listos`}
                  </span>
                </div>
              </div>

              {/* Real-time status / spinner */}
              {wizardStep === 'logging_in' && (
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                  <span>Abriendo ventana de inicio de sesión con Google... Completa el permiso en la ventana emergente.</span>
                </div>
              )}

              {wizardStep === 'creating_sheet' && (
                <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-600 shrink-0" />
                  <span>Configurando o creando hoja de cálculo institucional con diseño SENA en tu Drive...</span>
                </div>
              )}

              {wizardStep === 'syncing' && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600 shrink-0" />
                  <span>Sincronizando registros en Google Sheets...</span>
                </div>
              )}

              {wizardStep === 'completed' && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>¡Sincronización Completada con Éxito!</span>
                  </div>
                  <p className="text-xs">
                    Se han enviado <strong>{syncedCountInWizard}</strong> registro(s) de aprendices a tu hoja de Google Sheets en Drive.
                  </p>
                  {spreadsheetUrl && (
                    <a
                      href={spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-bold hover:underline pt-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir y verificar la hoja en Google Drive</span>
                    </a>
                  )}
                </div>
              )}

              {/* Error display */}
              {wizardError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Atención</span>
                  </div>
                  <p className="text-[11px]">{wizardError}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  exportSubmissionsToCSV(submissions);
                  setShowSyncWizard(false);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Descargar directamente sin requerir cuenta Google"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Exportar Excel (Sin Google)</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {wizardStep === 'completed' ? (
                  <button
                    onClick={() => setShowSyncWizard(false)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Entendido, Cerrar
                  </button>
                ) : (
                  <button
                    onClick={() => executeOneClickSync(targetSyncSub)}
                    disabled={wizardStep === 'logging_in' || wizardStep === 'creating_sheet' || wizardStep === 'syncing'}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                  >
                    {wizardStep !== 'idle' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Procesando...</span>
                      </>
                    ) : !currentUser ? (
                      <>
                        <FolderSync className="w-4 h-4" />
                        <span>Conectar con Google y Sincronizar en 1 Clic</span>
                      </>
                    ) : !spreadsheetId ? (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Crear Hoja en Drive y Sincronizar</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Sincronizar {targetSyncSub ? 'Aprendiz' : `${pendingSyncCount} Pendientes`} Ahora</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
