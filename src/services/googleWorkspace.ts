import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Define the scopes required
export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach(scope => provider.addScope(scope));

const TOKEN_STORAGE_KEY = 'sena_google_workspace_token_v1';

let isSigningIn = false;
let cachedAccessToken: string | null = (() => {
  try {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
})();

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (!cachedAccessToken) {
        try {
          cachedAccessToken = sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY);
        } catch {
          // ignore
        }
      }
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      try {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      } catch {
        // ignore
      }
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }

    cachedAccessToken = credential.accessToken;
    try {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, credential.accessToken);
      localStorage.setItem(TOKEN_STORAGE_KEY, credential.accessToken);
    } catch {
      // ignore
    }
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    if (error?.code !== 'auth/popup-closed-by-user') {
      console.error('Error al iniciar sesión con Google:', error);
    }
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (!cachedAccessToken) {
    try {
      cachedAccessToken = sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
};

export const googleLogout = async () => {
  try {
    await signOut(auth);
  } finally {
    cachedAccessToken = null;
    try {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
};

export interface ApprenticeRecordRow {
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  programName: string;
  tokenNumber: string;
  regional: string;
  centerName: string;
  inductionStatus: string;
  quizScore: string;
  certificateGenerated: string;
  notes?: string;
}

const DEFAULT_SPREADSHEET_TITLE = 'Registro Inducción SENA - Aprendices';
const SHEET_TAB_NAME = 'Registro Aprendices';
const SPREADSHEET_ID_STORAGE_KEY = 'sena_induction_spreadsheet_id_v1';

export const getSavedSpreadsheetId = (): string | null => {
  try {
    return localStorage.getItem(SPREADSHEET_ID_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const saveSpreadsheetId = (id: string) => {
  try {
    localStorage.setItem(SPREADSHEET_ID_STORAGE_KEY, id);
  } catch (e) {
    console.error('Error saving spreadsheet id', e);
  }
};

/**
 * Searches in Google Drive for an existing spreadsheet created for this app
 */
export const findExistingSpreadsheet = async (token: string): Promise<{ id: string; name: string } | null> => {
  try {
    const q = encodeURIComponent(`name = '${DEFAULT_SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,webViewLink)`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.files && data.files.length > 0) {
      return { id: data.files[0].id, name: data.files[0].name };
    }
    return null;
  } catch (err) {
    console.error('Error finding spreadsheet in Drive', err);
    return null;
  }
};

/**
 * Ensures a spreadsheet is linked, or creates it automatically if it does not exist yet in Google Drive.
 */
export const getOrSetupSpreadsheet = async (token: string): Promise<{ id: string; url: string }> => {
  const savedId = getSavedSpreadsheetId();
  if (savedId) {
    try {
      const checkRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${savedId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (checkRes.ok) {
        return {
          id: savedId,
          url: `https://docs.google.com/spreadsheets/d/${savedId}/edit`,
        };
      }
    } catch {
      // ignore
    }
  }

  const existing = await findExistingSpreadsheet(token);
  if (existing) {
    saveSpreadsheetId(existing.id);
    return {
      id: existing.id,
      url: `https://docs.google.com/spreadsheets/d/${existing.id}/edit`,
    };
  }

  const created = await createInductionSpreadsheet(token);
  saveSpreadsheetId(created.id);
  return created;
};

/**
 * Creates a formatted Google Sheet in Google Drive with SENA styling
 */
export const createInductionSpreadsheet = async (token: string): Promise<{ id: string; url: string }> => {
  const payload = {
    properties: {
      title: DEFAULT_SPREADSHEET_TITLE,
    },
    sheets: [
      {
        properties: {
          title: SHEET_TAB_NAME,
          gridProperties: {
            frozenRowCount: 1,
            rowCount: 100,
            columnCount: 12,
          },
        },
      },
    ],
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Error al crear la hoja en Google Drive: ${errText}`);
  }

  const created = await createRes.json();
  const spreadsheetId = created.spreadsheetId;

  // Insert stylized Header Row
  const headers = [
    'Marca Temporal',
    'Nombre Completo del Aprendiz',
    'Tipo Documento',
    'Número de Documento',
    'Programa de Formación',
    'Ficha de Caracterización',
    'Regional SENA',
    'Centro de Formación',
    'Estado de Inducción',
    'Puntaje Evaluación (%)',
    'Certificado Oficial',
    'Observaciones Institucionales'
  ];

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${SHEET_TAB_NAME}'!A1:L1?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: `'${SHEET_TAB_NAME}'!A1:L1`,
      majorDimension: 'ROWS',
      values: [headers],
    }),
  });

  // Apply styling (Verde SENA #39A900 background for headers, bold, white text)
  const formatPayload = {
    requests: [
      {
        repeatCell: {
          range: {
            sheetId: created.sheets[0].properties.sheetId,
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: 12,
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: {
                red: 57 / 255,
                green: 169 / 255,
                blue: 0 / 255,
              },
              textFormat: {
                foregroundColor: { red: 1, green: 1, blue: 1 },
                bold: true,
                fontSize: 10,
              },
              horizontalAlignment: 'CENTER',
              verticalAlignment: 'MIDDLE',
            },
          },
          fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
        },
      },
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: created.sheets[0].properties.sheetId,
            dimension: 'COLUMNS',
            startIndex: 0,
            endIndex: 12,
          },
        },
      },
    ],
  };

  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatPayload),
    });
  } catch (styleErr) {
    console.warn('Could not apply header styling, file still created', styleErr);
  }

  saveSpreadsheetId(spreadsheetId);
  return {
    id: spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
};

/**
 * Appends an apprentice record to the Google Sheet
 */
export const appendApprenticeRecord = async (
  token: string, 
  spreadsheetId: string, 
  record: ApprenticeRecordRow
): Promise<void> => {
  const rowValues = [
    record.timestamp,
    record.fullName,
    record.documentType,
    record.documentNumber,
    record.programName,
    record.tokenNumber,
    record.regional,
    record.centerName,
    record.inductionStatus,
    record.quizScore,
    record.certificateGenerated,
    record.notes || 'Registro automatizado desde plataforma de Inducción SENA',
  ];

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${SHEET_TAB_NAME}'!A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      majorDimension: 'ROWS',
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al registrar en Google Sheets: ${errorText}`);
  }
};

/**
 * Fetches all apprentice rows from the Google Sheet
 */
export const fetchApprenticeRecords = async (
  token: string,
  spreadsheetId: string
): Promise<ApprenticeRecordRow[]> => {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${SHEET_TAB_NAME}'!A2:L2000`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('No se pudo leer la información de la hoja');
  }

  const data = await res.json();
  const rows = data.values || [];

  return rows.map((row: string[]) => ({
    timestamp: row[0] || '',
    fullName: row[1] || '',
    documentType: row[2] || '',
    documentNumber: row[3] || '',
    programName: row[4] || '',
    tokenNumber: row[5] || '',
    regional: row[6] || '',
    centerName: row[7] || '',
    inductionStatus: row[8] || '',
    quizScore: row[9] || '',
    certificateGenerated: row[10] || '',
    notes: row[11] || '',
  }));
};
