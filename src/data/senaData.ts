import { 
  SymbolDetail, 
  RegulationItem, 
  DilemmaCase, 
  ProductiveStageMode, 
  QuizQuestion,
  ApprenticeProfile 
} from '../types/induction';

export const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'Samuel Castañeda Ramírez',
  documentType: 'C.C.',
  documentNumber: '1020839210',
  programName: 'Análisis y Desarrollo de Software (ADSO)',
  formationLevel: 'Tecnólogo',
  tokenNumber: '2824910',
  regional: 'Regional Distrito Capital',
  centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
  avatarSeed: 'aprendiz_1',
  startDate: 'Febrero 2026'
};

export const SENA_HISTORY = {
  foundationYear: '1957',
  founder: 'Rodolfo Martínez Tono',
  legalBasis: 'Decreto Ley 118 del 21 de junio de 1957',
  context: 'Nació gracias a una iniciativa visionaria respaldada por trabajadores, empresarios (ANDI) y la Organización Internacional del Trabajo (OIT), con la meta de cualificar la mano de obra nacional e impulsar la industrialización colombiana.',
  milestones: [
    { year: '1957', title: 'Creación del SENA', desc: 'Firma del Decreto 118 bajo la Junta Militar de Gobierno para capacitar integralmente a la clase obrera.' },
    { year: '1960', title: 'Consolidación de Sedes', desc: 'Expansión de centros fijos y móviles en las principales ciudades y regiones agrícolas del país.' },
    { year: '1980', title: 'Revolución Tecnológica', desc: 'Introducción de laboratorios de electrónica, automatización e informática aplicada a la industria.' },
    { year: '2000', title: 'Creación de Fondo Emprender y SENNOVA', desc: 'Impulso definitivo al emprendimiento nacional y el Sistema de Investigación, Desarrollo e Innovación.' },
    { year: '2024-Presente', title: 'Transformación Digital y CampoSENA', desc: 'Integración de IA, hubs tecnológicos de formación virtual (Zajuna LMS) y sostenibilidad ambiental.' }
  ]
};

export const SENA_MISSION_VISION = {
  mission: 'El Servicio Nacional de Aprendizaje (SENA) está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision: 'En el 2026, el SENA se consolidará como una entidad referente de formación integral para el trabajo, la innovación, la paz y la justicia social en Colombia, con altos estándares de calidad pedagógica, pertinencia territorial, inclusión y articulación con los desafíos globales de la transición energética y la transformación digital.',
  principles: [
    { title: 'Primero la Vida', desc: 'La dignidad humana, la seguridad integral y el bienestar colectivo son el eje central de toda acción pedagógica.' },
    { title: 'La Dignidad del Ser Humano', desc: 'Respeto irrestricto por las diferencias, la diversidad cultural y los derechos humanos de cada aprendiz e instructor.' },
    { title: 'La Libertad con Responsabilidad', desc: 'Autonomía en el aprendizaje combinada con el compromiso ético ante la comunidad y el país.' },
    { title: 'El Bien Común prevalece sobre el Particular', desc: 'Uso ético y solidario de los recursos públicos de formación para el progreso de Colombia.' }
  ],
  integrityValues: [
    { name: 'Honestidad', desc: 'Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud en cada ambiente de formación.' },
    { name: 'Respeto', desc: 'Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y defectos, sin discriminación alguna.' },
    { name: 'Compromiso', desc: 'Soy consciente de la importancia de mi rol como aprendiz y formador para aportar activamente al desarrollo de Colombia.' },
    { name: 'Diligencia', desc: 'Cumplo con los deberes, funciones y actividades asignadas con atención, prontitud, destreza y eficiencia.' },
    { name: 'Justicia', desc: 'Actúo con equidad, imparcialidad y sentido del debido proceso, garantizando la igualdad de oportunidades.' },
    { name: 'Solidaridad', desc: 'Apoyo desinteresadamente a mis compañeros de ficha e instructores en momentos de dificultad formativa o personal.' }
  ]
};

export const SENA_SYMBOLS: SymbolDetail[] = [
  {
    id: 'escudo',
    name: 'El Escudo del SENA',
    subtitle: 'Síntesis gráfica de los tres sectores de la economía nacional',
    description: 'El escudo del SENA representa la articulación tripartita de los sectores productivos que impulsan la economía de Colombia y en los cuales la entidad capacita a sus aprendices.',
    accentColor: '#39A900',
    meanings: [
      { title: 'Rueda Dentada (Piñón)', desc: 'Representa el sector secundario: industria, metalmecánica, manufactura, construcción y desarrollo tecnológico.' },
      { title: 'El Caduceo y Alas', desc: 'Representa el sector terciario: comercio, finanzas, servicios, hotelería, salud y logística moderna.' },
      { title: 'El Campo y los Frutos del Café', desc: 'Representa el sector primario y extractivo: agricultura, ganadería, recursos naturales y CampoSENA.' }
    ]
  },
  {
    id: 'bandera',
    name: 'La Bandera del SENA',
    subtitle: 'Emblema de paz, libertad y esperanza laboral',
    description: 'La bandera del SENA se compone de un lienzo rectangular de color blanco inmaculado, en cuyo centro se ubica el escudo institucional o el logosímbolo en verde SENA.',
    accentColor: '#00324D',
    meanings: [
      { title: 'Color Blanco', desc: 'Simboliza la paz, la tranquilidad, la libertad y la transparencia ética en la gestión pública y la convivencia ciudadana.' },
      { title: 'Color Verde SENA (#39A900)', desc: 'Simboliza la esperanza, la juventud, el crecimiento continuo de la fuerza laboral y la riqueza ecológica de Colombia.' }
    ]
  },
  {
    id: 'logosimbolo',
    name: 'El Logosímbolo',
    subtitle: 'El ser humano proyectándose hacia el futuro y la superación',
    description: 'Creado durante la administración de Fernando Navas de Brigard, representa gráficamente al aprendiz que avanza con determinación por el camino del conocimiento.',
    accentColor: '#39A900',
    meanings: [
      { title: 'La Silueta Humana', desc: 'Representa al aprendiz SENA como protagonista de su propio proceso formativo y constructor de sociedad.' },
      { title: 'El Sendero Hacia Adelante', desc: 'Simboliza el camino de superación continua, la disciplina y las metas laborales alcanzables a través del estudio.' },
      { title: 'Las Barras Horizontales', desc: 'Evocan los peldaños o escalones de superación técnica y profesional que el aprendiz escala día a día.' }
    ]
  },
  {
    id: 'himno',
    name: 'Himno del SENA',
    subtitle: 'Canto marcial a la juventud, al trabajo y a la patria',
    description: 'Con letra del insigne poeta Jesús René Castro y composición musical del maestro Daniel Marlez, convoca a los aprendices a forjar una Colombia libre y productiva.',
    accentColor: '#E65100',
    meanings: [
      { title: 'Letra', desc: 'Jesús René Castro — Resalta el valor del trabajo honrado, la técnica y el amor incondicional por Colombia.' },
      { title: 'Música', desc: 'Daniel Marlez — Marcha solemne y entusiasta que despierta el orgullo de pertenecer a la familia SENA.' }
    ]
  }
];

export const SENA_HYMN_LYRICS = {
  chorus: `Estudiantes del SENA adelante
por Colombia luchad con amor
con el ánimo noble y radiante
transformemos el mundo en mejor.`,
  verses: [
    {
      number: 'I',
      text: `De la patria el futuro destino,
en las manos del joven está,
el trabajo es seguro camino,
que la paz y el progreso nos da.`
    },
    {
      number: 'II',
      text: `En la forja del SENA se aprende,
con anhelo de superación,
la virtud que en el pecho se enciende,
por el bien de la patria y la unión.`
    },
    {
      number: 'III',
      text: `Nuestra patria florece fecunda,
con la fe, la esperanza y la paz,
y en el surco de amor que se inunda,
el trabajo es la mies que tendrás.`
    },
    {
      number: 'IV',
      text: `Avancemos con paso seguro,
aprendices del campo y ciudad,
para hacer de Colombia en futuro,
un remanso de prosperidad.`
    }
  ]
};

export const PRODUCTIVE_STAGE_MODES: ProductiveStageMode[] = [
  {
    id: 'contrato_aprendizaje',
    title: 'Contrato de Aprendizaje',
    shortDesc: 'Vinculación formal formativa con empresa legalmente obligada a patrocinar aprendices.',
    requirements: [
      'Registro activo en el aplicativo Caprendizaje (SGVA).',
      'Estar a paz y salvo académico de la Etapa Lectiva.',
      'Dedicación de 48 horas semanales al desarrollo de funciones afines al programa.'
    ],
    benefits: [
      'Apoyo de sostenimiento mensual equivalente al 75% o 100% de 1 SMMLV.',
      'Afiliación completa a EPS y ARL a cargo total de la empresa patrocinadora.',
      'Alta probabilidad de vinculación laboral directa al culminar el periodo.'
    ],
    duration: 'Hasta 6 meses de duración máxima.',
    iconName: 'Building2'
  },
  {
    id: 'vinculo_laboral',
    title: 'Vínculo Laboral o Contractual',
    shortDesc: 'Válido cuando el aprendiz ya labora en una empresa desempeñando tareas del programa.',
    requirements: [
      'Contrato laboral vigente (término fijo, indefinido o prestación de servicios).',
      'Certificación laboral expedida por la empresa con funciones detalladas afines.',
      'Aval del coordinador académico del centro de formación SENA.'
    ],
    benefits: [
      'El aprendiz devenga salario regular y todas las prestaciones legales de ley.',
      'No interrumpe su estabilidad laboral previa mientras certifica su programa.',
      'Acompañamiento de un instructor de seguimiento asignado.'
    ],
    duration: '6 meses con seguimiento de bitácoras quincenales.',
    iconName: 'Briefcase'
  },
  {
    id: 'proyecto_productivo',
    title: 'Proyecto Productivo (Emprendimiento)',
    shortDesc: 'Desarrollo de una idea de negocio propia o articulada a unidades del Fondo Emprender.',
    requirements: [
      'Formulación estructurada de plan de negocio con asesoría de la Unidad de Emprendimiento.',
      'Demostrar aplicación directa de las competencias adquiridas en la formación.',
      'Aprobación formal por parte del Comité de Evaluación del Centro.'
    ],
    benefits: [
      'Posibilidad de postularse a capital semilla no reembolsable del Fondo Emprender.',
      'Mentoría experta de asesores empresariales SENA.',
      'Generación de autoempleo y valor comercial propio.'
    ],
    duration: '6 meses con entregables de viabilidad técnica y financiera.',
    iconName: 'Lightbulb'
  },
  {
    id: 'pasantía',
    title: 'Pasantía (ONG, Pymes o Instituciones)',
    shortDesc: 'Práctica concertada con entidades públicas, sin ánimo de lucro o pequeñas empresas.',
    requirements: [
      'Convenio de pasantía suscrito entre el SENA y la organización receptora.',
      'Plan de concertación de actividades de aprendizaje avalado.',
      'Afiliación a ARL por parte de la empresa receptora o del SENA según el caso.'
    ],
    benefits: [
      'Impacto social directo en comunidades vulnerables o proyectos estatales.',
      'Flexibilidad horaria en organizaciones del tercer sector.',
      'Experiencia certificable en gestión comunitaria y proyectos públicos.'
    ],
    duration: '6 meses según plan de trabajo concertado.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'monitoria',
    title: 'Monitoría Institucional SENA',
    shortDesc: 'Apoyo pedagógico y técnico a instructores y ambientes de aprendizaje en el Centro.',
    requirements: [
      'Tener un rendimiento académico sobresaliente en la etapa lectiva.',
      'Haber superado convocatoria pública de monitorías del Centro de Formación.',
      'Disponibilidad para apoyar talleres, laboratorios o unidades SENNOVA.'
    ],
    benefits: [
      'Reconocimiento de estímulo económico mensual otorgado directamente por el SENA.',
      'Profundización avanzada en pedagogía técnica y manejo de equipos de alta gama.',
      'Experiencia formativa directa dentro de la entidad educativa más grande del país.'
    ],
    duration: '6 meses con asignación horaria semanal de hasta 20 horas.',
    iconName: 'GraduationCap'
  },
  {
    id: 'sennova',
    title: 'Proyectos de I+D+i (SENNOVA)',
    shortDesc: 'Investigación aplicada y desarrollo experimental en TecnoParques o grupos de investigación.',
    requirements: [
      'Vinculación activa a un semillero de investigación o proyecto SENNOVA aprobado.',
      'Cumplir con el plan de entregables científicos o prototipos funcionales.',
      'Visto bueno del líder SENNOVA del centro formativo.'
    ],
    benefits: [
      'Participación en publicaciones científicas, ponencias y patentes.',
      'Uso de laboratorios y equipos de prototipado rápido de última generación.',
      'Networking de alto nivel con universidades y clusters de innovación.'
    ],
    duration: '6 meses con entrega de prototipo o informe de investigación.',
    iconName: 'Compass'
  }
];

export const REGULATIONS_LIST: RegulationItem[] = [
  {
    id: 'reg-der-1',
    type: 'derecho',
    title: 'Recibir Formación Profesional Integral Gratuita',
    description: 'Acceder a procesos pedagógicos de alta calidad acordes con el diseño curricular, orientados al desarrollo de competencias del ser, convivir y saber hacer.',
    articleRef: 'Acuerdo 009/2024 · Cap. II, Art. 5',
    category: 'académica'
  },
  {
    id: 'reg-der-2',
    type: 'derecho',
    title: 'Uso de Ambientes, LMS Zajuna e Infraestructura',
    description: 'Hacer uso responsable de las instalaciones físicas, laboratorios, bibliotecas, talleres, conectividad, plataforma Zajuna y software especializado.',
    articleRef: 'Acuerdo 009/2024 · Cap. II, Art. 5',
    category: 'general'
  },
  {
    id: 'reg-der-3',
    type: 'derecho',
    title: 'Garantía del Debido Proceso y Ser Escuchado',
    description: 'Ser escuchado en descargos, presentar recursos y contar con todas las garantías de defensa antes de la imposición de cualquier medida sancionatoria.',
    articleRef: 'Acuerdo 009/2024 · Cap. V, Art. 23',
    category: 'disciplinaria'
  },
  {
    id: 'reg-der-4',
    type: 'derecho',
    title: 'Beneficiarse de los Programas de Bienestar al Aprendiz',
    description: 'Acceder a servicios de salud ocupacional, orientación psicosocial, actividades deportivas, culturales, y postulaciones a apoyos de sostenimiento.',
    articleRef: 'Acuerdo 009/2024 · Cap. II, Art. 5',
    category: 'general'
  },
  {
    id: 'reg-deb-1',
    type: 'deber',
    title: 'Portar el Carnet Institucional Visible',
    description: 'Portar obligatoriamente y en lugar visible el documento físico o credencial digital que lo identifica como aprendiz SENA en todas las dependencias y eventos.',
    articleRef: 'Acuerdo 009/2024 · Cap. III, Art. 8',
    category: 'general'
  },
  {
    id: 'reg-deb-2',
    type: 'deber',
    title: 'Asistencia y Puntualidad en Ambientes de Aprendizaje',
    description: 'Cumplir con el horario establecido y justificar oportunamente dentro de los 3 días hábiles cualquier inasistencia ante el instructor o coordinación.',
    articleRef: 'Acuerdo 009/2024 · Cap. III, Art. 8',
    category: 'académica'
  },
  {
    id: 'reg-deb-3',
    type: 'deber',
    title: 'Cuidado de Bienes, Maquinaria y Equipos (EPP)',
    description: 'Preservar los recursos físicos, tecnológicos y herramientas asignadas, empleando los elementos de protección personal (EPP) obligatorios.',
    articleRef: 'Acuerdo 009/2024 · Cap. III, Art. 8',
    category: 'disciplinaria'
  },
  {
    id: 'reg-deb-4',
    type: 'deber',
    title: 'Honestidad Intelectual y Respeto a Derechos de Autor',
    description: 'Presentar evidencias originales creadas por el aprendiz, citando debidamente las fuentes y absteniéndose de cometer plagio o suplantación.',
    articleRef: 'Acuerdo 009/2024 · Cap. III, Art. 8',
    category: 'académica'
  },
  {
    id: 'reg-fal-1',
    type: 'falta',
    title: 'Plagio y Fraude en Evidencias de Aprendizaje',
    description: 'Copiar evidencias de otros compañeros, internet o cometer suplantación en evaluaciones o plataformas institucionales.',
    articleRef: 'Acuerdo 009/2024 · Cap. III, Art. 9 & Cap. V, Art. 18',
    category: 'académica',
    severity: 'grave'
  },
  {
    id: 'reg-fal-2',
    type: 'falta',
    title: 'Inasistencia Injustificada Reiterada / Deserción',
    description: 'Dejar de asistir por 3 días hábiles consecutivos en presencial o 15 días calendario sin actividad en LMS Zajuna sin justificación demostrada.',
    articleRef: 'Acuerdo 009/2024 · Cap. IV, Art. 13',
    category: 'académica',
    severity: 'grave'
  },
  {
    id: 'reg-fal-3',
    type: 'falta',
    title: 'Agresión Física o Verbal en la Comunidad Educativa',
    description: 'Incurrir en actos de violencia, acoso, intimidación o discriminación hacia instructores, compañeros, personal administrativo o vigilancia.',
    articleRef: 'Acuerdo 009/2024 · Cap. III, Art. 9 & Cap. V, Art. 18',
    category: 'disciplinaria',
    severity: 'gravísima'
  },
  {
    id: 'reg-fal-4',
    type: 'falta',
    title: 'Ingreso de Sustancias Psicoactivas o Armas',
    description: 'Portar, comercializar o consumir bebidas alcohólicas, drogas o sustancias prohibidas dentro de las instalaciones del SENA.',
    articleRef: 'Acuerdo 009/2024 · Cap. III, Art. 9 & Cap. V, Art. 18',
    category: 'disciplinaria',
    severity: 'gravísima'
  },
  {
    id: 'reg-san-1',
    type: 'sancion',
    title: 'Llamado de Atención Escrito con Plan de Mejoramiento',
    description: 'Medida formativa que compromete al aprendiz a superar deficiencias académicas o conductuales en un plazo de hasta 30 días concertado.',
    articleRef: 'Acuerdo 009/2024 · Cap. V, Art. 20',
    category: 'general'
  },
  {
    id: 'reg-san-2',
    type: 'sancion',
    title: 'Condicionamiento de Matrícula',
    description: 'Sanción disciplinaria o académica impuesta por el Subdirector tras concepto del Comité, que pone en alerta la continuidad del aprendiz ante cualquier reincidencia.',
    articleRef: 'Acuerdo 009/2024 · Cap. V, Art. 21',
    category: 'general'
  },
  {
    id: 'reg-san-3',
    type: 'sancion',
    title: 'Cancelación de Matrícula',
    description: 'Sanción máxima que retira la calidad de aprendiz SENA y genera inhabilidad para inscribirse en programas de formación de 6 meses a 2 años.',
    articleRef: 'Acuerdo 009/2024 · Cap. V, Art. 21',
    category: 'disciplinaria'
  }
];

export const DILEMMA_CASES: DilemmaCase[] = [
  {
    id: 'dilema-1',
    title: 'Dilema 1: El Trabajo Final en Equipo y el Plagio',
    context: 'Estás en la semana de cierre de trimestre. Tu equipo debe entregar un proyecto de software clave, pero uno de los integrantes copió textualmente un código y documentación comercial protegida sin citar la fuente.',
    situation: '¿Cómo debes proceder éticamente según el Reglamento del Aprendiz y el Código de Integridad?',
    options: [
      {
        text: 'Entregar el proyecto así para no retrasarse, confiando en que el instructor no notará la copia.',
        isCorrect: false,
        explanation: 'Incorrecto. El plagio es una falta grave en el SENA y puede acarrear apertura de proceso disciplinario para todo el equipo por corresponsabilidad.',
        points: 0
      },
      {
        text: 'Dialogar inmediatamente con el equipo, explicar la gravedad del plagio, retirar el contenido copiado y reelaborar la evidencia citando fuentes.',
        isCorrect: true,
        explanation: '¡Excelente decisión! Demuestras el valor institucional de la Honestidad Intelectual, evitas sanciones disciplinarias y garantizas un aprendizaje genuino.',
        points: 25
      },
      {
        text: 'Eliminar en silencio al compañero del trabajo sin avisarle ni solucionar la evidencia.',
        isCorrect: false,
        explanation: 'Inadecuado. No fomenta la resolución constructiva de conflictos ni el valor del respeto y trabajo colaborativo.',
        points: 5
      }
    ]
  },
  {
    id: 'dilema-2',
    title: 'Dilema 2: Inasistencia por Calamidad de Salud',
    context: 'Presentas una fuerte afección de salud y el médico te prescribe 4 días de incapacidad laboral. No puedes asistir a las sesiones presenciales del taller.',
    situation: '¿Cuál es el conducto regular exacto estipulado en el Reglamento del Aprendiz?',
    options: [
      {
        text: 'Regresar cuando te sientas bien sin avisar a nadie y decirle al instructor que estabas enfermo de palabra.',
        isCorrect: false,
        explanation: 'Incorrecto. Pasados 3 días hábiles sin soporte radicado, el sistema puede reportar deserción del programa según el Art. 22 del reglamento.',
        points: 0
      },
      {
        text: 'Enviar la incapacidad médica formal dentro de los 3 días hábiles siguientes al instructor y coordinador, solicitando plan de nivelación.',
        isCorrect: true,
        explanation: '¡Correcto! Cumples con el debido proceso estipulado en el Art. 8 numeral 2, protegiendo tu cupo y concertando la entrega extemporánea de evidencias.',
        points: 25
      },
      {
        text: 'Pedirle a un compañero que firme la lista de asistencia por ti para que no figure la falta.',
        isCorrect: false,
        explanation: 'Grave falta. La suplantación de identidad en listas oficiales es una falta disciplinaria sancionable.',
        points: 0
      }
    ]
  },
  {
    id: 'dilema-3',
    title: 'Dilema 3: Uso y Cuidado de Equipos en Talleres',
    context: 'En el ambiente de aprendizaje de redes y servidores, notas que una herramienta costosa presenta una falla menor que tú mismo podrías forzar para terminar rápido.',
    situation: '¿Qué acción preserva la seguridad y los bienes del SENA?',
    options: [
      {
        text: 'Forzar el conector de todas formas para terminar antes tu prueba de conectividad.',
        isCorrect: false,
        explanation: 'Incorrecto. Puedes dañar permanentemente el equipo del centro y exponerte a reponer el bien o a un proceso sancionatorio.',
        points: 0
      },
      {
        text: 'Suspender el uso del equipo, notificar de inmediato al instructor o monitor de ambiente para su revisión técnica especializada.',
        isCorrect: true,
        explanation: '¡Excelente! Priorizas el principio institucional de "Primero la Vida", cuidas los bienes públicos y previenes accidentes en el taller.',
        points: 25
      },
      {
        text: 'Guardar la herramienta averiada en el estante para que otro aprendiz se dé cuenta más tarde.',
        isCorrect: false,
        explanation: 'Falta de solidaridad y compromiso ético con los recursos de formación compartidos.',
        points: 0
      }
    ]
  },
  {
    id: 'dilema-4',
    title: 'Dilema 4: Dificultad Económica para Transporte y Alimentación',
    context: 'Un aprendiz de tu ficha está considerando desertar de su tecnólogo porque no cuenta con recursos económicos para el transporte diario al centro de formación.',
    situation: '¿Qué área del SENA brinda alternativas institucionales concretas en este caso?',
    options: [
      {
        text: 'Aconsejarle que se retire de inmediato y vuelva cuando tenga dinero.',
        isCorrect: false,
        explanation: 'Inadecuado. Desconoce las amplias rutas de apoyo que el SENA dispone precisamente para evitar la deserción de aprendices vulnerables.',
        points: 0
      },
      {
        text: 'Acompañarlo a la Oficina de Bienestar al Aprendiz para postularse a Apoyos de Sostenimiento (regular o FIC) o convenios de transporte.',
        isCorrect: true,
        explanation: '¡Respuesta ejemplar! Bienestar al Aprendiz gestiona apoyos económicos, bonos de alimentación y auxilios para garantizar la permanencia educativa.',
        points: 25
      },
      {
        text: 'Decirle que hable directamente con el Director General en Bogotá sin pasar por el centro.',
        isCorrect: false,
        explanation: 'No sigue el conducto regular del Centro de Formación ni el protocolo de Bienestar al Aprendiz.',
        points: 5
      }
    ]
  }
];

export const INDUCTION_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    category: 'Historia e Identidad',
    question: '¿En qué año y bajo el liderazgo de qué insigne colombiano fue fundado el SENA?',
    options: [
      '1957, fundado por Rodolfo Martínez Tono.',
      '1965, fundado por Alberto Lleras Camargo.',
      '1948, fundado por Jorge Eliécer Gaitán.',
      '1972, fundado por Alfonso López Michelsen.'
    ],
    correctAnswerIndex: 0,
    explanation: 'El SENA fue creado el 21 de junio de 1957 mediante el Decreto Ley 118, concebido por el economista Rodolfo Martínez Tono.'
  },
  {
    id: 2,
    category: 'Símbolos SENA',
    question: '¿Qué representa la silueta humana avanzando en el logosímbolo oficial del SENA?',
    options: [
      'Una meta deportiva nacional.',
      'Al aprendiz que camina con determinación superando peldaños hacia su autorrealización y futuro.',
      'La maquinaria industrial de exportación.',
      'Un mapa territorial de Colombia.'
    ],
    correctAnswerIndex: 1,
    explanation: 'El logosímbolo sintetiza al ser humano (aprendiz) como centro del proceso, superando obstáculos a lo largo de un sendero de progreso.'
  },
  {
    id: 3,
    category: 'Símbolos SENA',
    question: 'En el escudo del SENA, ¿qué sectores económicos están representados por la rueda dentada y el caduceo respectivamente?',
    options: [
      'Sector agropecuario y sector minero.',
      'Sector industria/manufactura y sector comercio/servicios.',
      'Sector transporte y sector financiero.',
      'Sector militar y sector judicial.'
    ],
    correctAnswerIndex: 1,
    explanation: 'La rueda dentada representa la industria (sector secundario) y el caduceo con alas representa el comercio y los servicios (sector terciario).'
  },
  {
    id: 4,
    category: 'Modelo Pedagógico',
    question: '¿Cuáles son las dos grandes etapas secuenciales de la Formación Profesional Integral en el SENA?',
    options: [
      'Etapa Teórica y Etapa de Grado.',
      'Etapa Lectiva y Etapa Productiva.',
      'Etapa Vocacional y Etapa Universitaria.',
      'Etapa Virtual y Etapa Presencial.'
    ],
    correctAnswerIndex: 1,
    explanation: 'La formación SENA se compone de la Etapa Lectiva (adquisición de competencias en ambientes de aprendizaje) y la Etapa Productiva (aplicación real en el sector empresarial).'
  },
  {
    id: 5,
    category: 'Etapa Productiva',
    question: '¿Cuál de las siguientes NO es una modalidad válida para certificar la Etapa Productiva?',
    options: [
      'Contrato de Aprendizaje empresarial.',
      'Proyecto Productivo o Emprendimiento.',
      'Descanso vacacional remunerado sin vinculación académica.',
      'Monitoría en el Centro de Formación SENA.'
    ],
    correctAnswerIndex: 2,
    explanation: 'La etapa productiva requiere de actividades formativas prácticas debidamente concertadas y supervisadas; el descanso vacacional no constituye modalidad de etapa productiva.'
  },
  {
    id: 6,
    category: 'Reglamento del Aprendiz',
    question: 'Si un aprendiz presenta una justificación por inasistencia debida a fuerza mayor o salud, ¿cuál es el plazo máximo legal para radicarla?',
    options: [
      'El mismo día en un lapso de 1 hora.',
      'Hasta 3 días hábiles siguientes al hecho ante el instructor y coordinación.',
      'Un mes después al finalizar el trimestre formativo.',
      'No es necesario presentar ninguna justificación.'
    ],
    correctAnswerIndex: 1,
    explanation: 'El Reglamento del Aprendiz establece un término de 3 días hábiles para radicar formalmente los soportes de inasistencia.'
  },
  {
    id: 7,
    category: 'Reglamento del Aprendiz',
    question: '¿Qué órgano institucional del Centro de Formación analiza las faltas graves y recomienda medidas disciplinarias garantizando el debido proceso?',
    options: [
      'La Policía Nacional.',
      'El Comité de Evaluación y Seguimiento.',
      'El Consejo Gremial Nacional.',
      'La Agencia Pública de Empleo.'
    ],
    correctAnswerIndex: 1,
    explanation: 'El Comité de Evaluación y Seguimiento es la instancia que estudia los casos, escucha descargos y recomienda medidas formativas o sancionatorias al Subdirector.'
  },
  {
    id: 8,
    category: 'Bienestar al Aprendiz',
    question: '¿Cuál es el objetivo principal del área de Bienestar al Aprendiz en los Centros de Formación?',
    options: [
      'Cobrar matrículas extraordinarias.',
      'Fomentar el desarrollo integral humano, la permanencia formativa mediante salud, cultura, deportes y apoyos socioeconómicos.',
      'Sancionar económicamente a los aprendices.',
      'Auditar los contratos de infraestructura del SENA.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Bienestar al Aprendiz ejecuta planes para la salud, deporte, liderazgo, arte y entrega de apoyos de sostenimiento que evitan la deserción estudiantil.'
  },
  {
    id: 9,
    category: 'Ecosistema de Innovación',
    question: '¿Cómo se denomina el sistema del SENA encargado de la investigación aplicada, el desarrollo tecnológico y la innovación en el que participan los aprendices?',
    options: [
      'SENNOVA (Sistema de Investigación, Desarrollo Tecnológico e Innovación).',
      'SOFIA Plus.',
      'Fondo Emprender.',
      'Zajuna LMS.'
    ],
    correctAnswerIndex: 0,
    explanation: 'SENNOVA articula la investigación aplicada en el SENA a través de semilleros, TecnoParques, TecnoAcademias y grupos científicos.'
  },
  {
    id: 10,
    category: 'Valores Institucionales',
    question: '¿Cuál de los siguientes postulados forma parte de los Principios Éticos Institucionales del SENA?',
    options: [
      'El beneficio individual está por encima del bien colectivo.',
      'Primero la vida, la dignidad del ser humano y la libertad con responsabilidad.',
      'La competencia desleal como motor de crecimiento.',
      'La exclusividad educativa solo para personas con recursos.'
    ],
    correctAnswerIndex: 1,
    explanation: 'El Código de Integridad SENA destaca como principios rectores: Primero la Vida, La Dignidad Humana, La Libertad con Responsabilidad y El Bien Común.'
  }
];
