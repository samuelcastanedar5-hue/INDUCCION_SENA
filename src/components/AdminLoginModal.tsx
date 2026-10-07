import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { verifyAdminPin } from '../services/adminService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Por favor digita el PIN de acceso.');
      return;
    }

    if (verifyAdminPin(pin)) {
      setError(null);
      setPin('');
      onLoginSuccess();
    } else {
      setError('PIN incorrecto. Verifica la clave de acceso del instructor.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeyPress = (digit: string) => {
    if (pin.length < 8) {
      setPin((prev) => prev + digit);
      setError(null);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  const handleClear = () => {
    setPin('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div 
        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Decorative Top Accent Glow */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Área Protegida
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Acceso de Administrador
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Security Banner */}
        <div className="px-6 py-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-white block mb-1">
              Privacidad y Seguridad de la Información
            </span>
            La hoja de cálculo de Google Drive y las respuestas detalladas de los aprendices están resguardadas para proteger el Habeas Data y evitar alteraciones externas.
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              PIN / Clave Maestra del Instructor
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
                maxLength={8}
                placeholder="Ingresa el PIN de seguridad"
                autoFocus
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center text-lg tracking-widest focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick PIN Keypad */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleKeyPress(digit)}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-base hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="py-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-500 dark:text-slate-400 hover:text-red-600 text-xs font-semibold border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer"
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-base hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer"
            >
              ⌫
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Tip info for instructor */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 pt-1">
            <span>PIN predeterminado: <strong className="font-mono text-emerald-600 dark:text-emerald-400">1957</strong></span>
            <span className="text-[10px] text-slate-400">(Año Fundación SENA)</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Regresar como Aprendiz
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <span>Acceder al Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
