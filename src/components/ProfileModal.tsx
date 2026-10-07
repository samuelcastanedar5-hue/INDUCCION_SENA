import React, { useState, useRef } from 'react';
import { X, Check, RefreshCw, Camera, Trash2, User } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSaveProfile: (profile: ApprenticeProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>({ ...profile });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 280;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL('image/jpeg', 0.85);
          setFormData((prev) => ({ ...prev, photoUrl: base64 }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photoUrl: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  const handleResetDefaults = () => {
    setFormData({
      fullName: 'Samuel Castañeda Ramírez',
      documentType: 'C.C.',
      documentNumber: '1020839210',
      programName: 'Análisis y Desarrollo de Software (ADSO)',
      formationLevel: 'Tecnólogo',
      tokenNumber: '2824910',
      regional: 'Regional Distrito Capital',
      centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
      avatarSeed: 'aprendiz_1',
      startDate: 'Febrero 2026',
      email: 'samuel.castaneda@soy.sena.edu.co',
      photoUrl: undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
        role="dialog"
        aria-labelledby="profile-title"
      >
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 id="profile-title" className="text-xl font-bold text-slate-900 dark:text-white">
              Ficha del Aprendiz SENA
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Personaliza tus datos institucionales y fotografía para tu carnet y certificado
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Photo Upload Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
            <div className="relative w-20 h-20 rounded-2xl border-2 border-emerald-500 overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm">
              {formData.photoUrl ? (
                <img 
                  src={formData.photoUrl} 
                  alt={formData.fullName} 
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <User className="w-9 h-9" />
                  <span className="text-[9px] font-mono mt-0.5 font-bold">Sin foto</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Fotografía para Carnet Digital
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Sube una foto clara tipo documento. Se plasmará en el anverso de tu carnet oficial.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-2xs"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{formData.photoUrl ? 'Cambiar Foto' : 'Subir Foto'}</span>
                </button>
                {formData.photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Quitar</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nombres y Apellidos Completos
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                placeholder="Ej. Samuel Castañeda Ramírez"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tipo de Documento
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                <option value="C.C.">Cédula de Ciudadanía (C.C.)</option>
                <option value="T.I.">Tarjeta de Identidad (T.I.)</option>
                <option value="C.E.">Cédula de Extranjería (C.E.)</option>
                <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                <option value="P.P.T.">Permiso por Protección Temporal (P.P.T.)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                placeholder="Ej. 1020839210"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correo Electrónico Institucional / Personal
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                placeholder="Ej. samuel.castaneda@soy.sena.edu.co"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Programa de Formación
              </label>
              <input
                type="text"
                required
                value={formData.programName}
                onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                placeholder="Ej. Análisis y Desarrollo de Software"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nivel de Formación
              </label>
              <select
                value={formData.formationLevel}
                onChange={(e) => setFormData({ ...formData, formationLevel: e.target.value as any })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
                <option value="Operario">Operario</option>
                <option value="Especialización Tecnológica">Especialización Tecnológica</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Número de Ficha de Caracterización
              </label>
              <input
                type="text"
                required
                value={formData.tokenNumber}
                onChange={(e) => setFormData({ ...formData, tokenNumber: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                placeholder="Ej. 2824910"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Regional SENA
              </label>
              <input
                type="text"
                required
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                placeholder="Ej. Regional Distrito Capital"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Centro de Formación
              </label>
              <input
                type="text"
                required
                value={formData.centerName}
                onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                placeholder="Ej. CEET"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restablecer valores iniciales
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
