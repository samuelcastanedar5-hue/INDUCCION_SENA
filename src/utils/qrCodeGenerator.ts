import QRCode from 'qrcode';

export interface QrVerificationData {
  fullName: string;
  documentType: string;
  documentNumber: string;
  tokenNumber: string;
  programName: string;
  regional: string;
  centerName: string;
  scorePercent: number | string;
  issueDate: string;
  codeRadicado: string;
}

export const generateQrDataUrl = async (
  data: QrVerificationData | string,
  options?: { darkColor?: string; lightColor?: string; width?: number }
): Promise<string> => {
  const payload = typeof data === 'string' 
    ? data 
    : JSON.stringify({
        institucion: 'SENA - Servicio Nacional de Aprendizaje',
        validacion: 'Induccion Oficial Aprobada',
        radicado: data.codeRadicado,
        aprendiz: data.fullName,
        documento: `${data.documentType} ${data.documentNumber}`,
        ficha: data.tokenNumber,
        programa: data.programName,
        regional: data.regional,
        calificacion: `${data.scorePercent}%`,
        fecha: data.issueDate,
        urlVerificacion: `https://www.sena.edu.co/verificacion?rad=${data.codeRadicado}`
      }, null, 2);

  try {
    const dataUrl = await QRCode.toDataURL(payload, {
      width: options?.width || 220,
      margin: 1,
      color: {
        dark: options?.darkColor || '#064e3b', // SENA Emerald
        light: options?.lightColor || '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
};
