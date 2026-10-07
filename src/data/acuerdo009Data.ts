import acuerdo009Json from './acuerdo_009_de_2024_reglamento_aprendiz_sena.json';

export interface CapituloAcuerdo {
  numero: string;
  titulo: string;
  descripcion: string;
  articulos: ArticuloAcuerdo[];
}

export interface ArticuloAcuerdo {
  numero: number;
  nombre: string;
  contenido: string;
  terminos?: Array<{ termino: string; definicion: string }>;
  principios?: Array<{ principio: string; descripcion: string }>;
  items?: string[];
  roles?: Array<{ rol: string; descripcion: string; requisitos?: string; funciones?: string }>;
  clasificacion?: Array<{ tipo: string; items: string[] } | { categoria: string; descripcion: string }>;
  prohibiciones?: string[];
  tipos_novedades?: Array<{ novedad: string; descripcion: string }>;
  causales?: string[];
  procedimiento?: string;
  estados_evaluacion?: Array<{ estado: string; significado: string }>;
  modalidades?: string[];
  grados_gravedad?: Array<{ nivel: string; criterio: string }>;
  atenuantes?: string[];
  agravantes?: string[];
  medidas?: Array<{ nombre: string; alcance: string }>;
  sanciones?: Array<{ sancion: string; efecto: string }>;
  etapas_debido_proceso?: string[];
}

export interface Acuerdo009Structure {
  titulo: string;
  descripcion: string;
  emisor: string;
  fecha: string;
  ciudad: string;
  vigencia: string;
  estructura_normativa: {
    total_capitulos: number;
    total_articulos: number;
    ambito_aplicacion: string;
  };
  reglamento: {
    nombre: string;
    capitulos: CapituloAcuerdo[];
  };
}

export const ACUERDO_009_2024: Acuerdo009Structure = acuerdo009Json as Acuerdo009Structure;

/**
 * Downloads the complete JSON file directly in the user's browser.
 */
export function downloadAcuerdo009Json(): void {
  const jsonString = JSON.stringify(ACUERDO_009_2024, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'acuerdo_009_de_2024_reglamento_aprendiz_sena.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Returns raw formatted JSON string for clipboard copying or code inspection.
 */
export function getAcuerdo009RawJson(): string {
  return JSON.stringify(ACUERDO_009_2024, null, 2);
}
