import { RegulationSectionQuestion, GamifiedRankingEntry } from '../types/induction';

export const REGULATION_SECTIONS = [
  {
    id: 'I',
    number: 'I',
    title: 'Capítulo I · Definiciones y Principios',
    subtitle: 'Marco conceptual, alcance y principios rectores del Acuerdo 009 de 2024',
    iconName: 'Compass',
    articleRange: 'Artículos 1 al 4',
  },
  {
    id: 'II',
    number: 'II',
    title: 'Capítulo II · Derechos y Representación',
    subtitle: 'Prerrogativas, representatividad, vocería e incentivos del aprendiz',
    iconName: 'ShieldCheck',
    articleRange: 'Artículos 5 al 7',
  },
  {
    id: 'III',
    number: 'III',
    title: 'Capítulo III · Deberes y Prohibiciones',
    subtitle: 'Responsabilidades éticas, académicas, convivencia y conductas prohibidas',
    iconName: 'Scale',
    articleRange: 'Artículos 8 y 9',
  },
  {
    id: 'IV',
    number: 'IV',
    title: 'Capítulo IV · Trámites, Novedades y Evaluación',
    subtitle: 'Ingreso, novedades académicas, causales de deserción y evaluación integral',
    iconName: 'FileCheck',
    articleRange: 'Artículos 10 al 38',
  },
  {
    id: 'V',
    number: 'V',
    title: 'Capítulo V · Faltas, Medidas y Debido Proceso',
    subtitle: 'Clasificación de faltas, comité de seguimiento, sanciones y garantías legales',
    iconName: 'AlertTriangle',
    articleRange: 'Artículos 39 al 53',
  },
];

export const REGULATION_QUESTIONS: RegulationSectionQuestion[] = [
  // ==========================================
  // SECCIÓN I: DEFINICIONES Y PRINCIPIOS (5 Preguntas)
  // ==========================================
  {
    id: 1,
    sectionNumber: 'I',
    sectionTitle: 'Capítulo I · Definiciones y Principios',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 1º, Numeral 1',
    question: 'De acuerdo con el Artículo 1º del Acuerdo 009 de 2024, ¿cómo define el SENA la Formación Profesional Integral (FPI)?',
    options: [
      'Un adiestramiento mecánico enfocado exclusivamente en operar maquinaria pesada e industrial.',
      'Un proceso educativo teórico-práctico integral orientado al desarrollo de conocimientos técnicos, humanistas, actitudes y valores para el crecimiento personal y el mundo del trabajo.',
      'Un programa universitario tradicional de investigación pura sin aplicación laboral directa.',
      'Una instrucción básica obligatoria únicamente para personas desempleadas sin aspiración laboral.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Extraordinario! Comprendes el corazón pedagógico del SENA: la Formación Profesional Integral (FPI) une técnica, humanismo y convivencia social para transformar proyectos de vida.',
    errorDiagnosis: 'La opción seleccionada reduce o distorsiona el sentido institucional del SENA. El Acuerdo 009 de 2024 (Art. 1, Num. 1) establece expresamente que la FPI es un proceso integral (teórico-práctico y socioemocional), no un mero adiestramiento aislado ni un modelo universitario tradicional.',
    optionExplanations: [
      'Incorrecto: El SENA no es adiestramiento mecánico ni unilateral; promueve el desarrollo humano integral.',
      'Correcto: Es la definición literal y conceptual del Artículo 1, Numeral 1 del Acuerdo 009 de 2024.',
      'Incorrecto: El SENA no se enfoca en teoría desconectada; su pilar es la pertinencia y articulación con el sector real.',
      'Incorrecto: La FPI no es exclusiva para desempleados; abarca formación continua en múltiples modalidades y niveles.'
    ]
  },
  {
    id: 2,
    sectionNumber: 'I',
    sectionTitle: 'Capítulo I · Definiciones y Principios',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 1º, Numeral 4',
    question: 'Según el nuevo reglamento, ¿cuál es el rol fundamental que asume la persona reconocida como "Aprendiz SENA"?',
    options: [
      'Un receptor pasivo que únicamente escucha instrucciones sin emitir opiniones en el aula.',
      'Un trabajador asalariado subordinado desde el primer día de clase en el Centro de Formación.',
      'El protagonista y agente corresponsable de su propio proceso formativo y desarrollo autónomo.',
      'Un cliente comercial transitorio que compra cursos independientes sin compromiso de permanencia.'
    ],
    correctAnswerIndex: 2,
    positiveFeedback: '¡Excelente acierto! En el SENA el aprendiz es el eje central y protagonista activo: tú lideras tu aprendizaje con autonomía, ética y disciplina.',
    errorDiagnosis: 'El concepto de Aprendiz en el SENA difiere de esquemas pasivos o puramente comerciales. El Artículo 1º, Numeral 4 y el Principio de Autonomía sitúan al aprendiz como protagonista corresponsable de su ruta formativa.',
    optionExplanations: [
      'Incorrecto: En el modelo constructivista del SENA, el aprendiz participa activamente y construye conocimiento colaborativo.',
      'Incorrecto: Durante la inducción o etapa lectiva el estatus es de aprendiz formativo, no de trabajador asalariado subordinado.',
      'Correcto: El Artículo 1, Numeral 4 define al aprendiz como quien asume el protagonismo de su propio aprendizaje con autonomía.',
      'Incorrecto: La formación en el SENA es un bien público gratuito, no una transacción comercial de cliente.'
    ]
  },
  {
    id: 3,
    sectionNumber: 'I',
    sectionTitle: 'Capítulo I · Definiciones y Principios',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 3º',
    question: '¿Qué principio orientador del Acuerdo 009 de 2024 garantiza que los aprendices sean reconocidos según sus condiciones sociales, físicas, territoriales y de diversidad sexual para asegurar la igualdad de oportunidades?',
    options: [
      'El principio de Inclusión y Enfoque Diferencial.',
      'El principio de Competitividad Mercantil Estricta.',
      'El principio de Jerarquía Administrativa Centralizada.',
      'El principio de Uniformidad Académica Estándar sin Excepciones.'
    ],
    correctAnswerIndex: 0,
    positiveFeedback: '¡Perfecto! El SENA es patrimonio de todos los colombianos: la inclusión y el enfoque diferencial protegen la pluriculturalidad, etnias, género y capacidades diversas.',
    errorDiagnosis: 'El principio aplicado es la Inclusión y Enfoque Diferencial (Art. 3º). Este principio obliga a adaptar el ambiente y las prácticas pedagógicas a las particularidades territoriales, étnicas y biopsicosociales de cada individuo.',
    optionExplanations: [
      'Correcto: Es el principio consagrado en el Artículo 3º que reconoce la diversidad humana y garantiza igualdad sustantiva.',
      'Incorrecto: La competitividad mercantil no es un principio orientador de convivencia ni de formación humana en el reglamento.',
      'Incorrecto: El SENA promueve la descentralización comunitaria y la autonomía, no una imposición jerárquica excluyente.',
      'Incorrecto: La uniformidad desconoce las necesidades particulares; por el contrario, prima la diferenciación equitativa.'
    ]
  },
  {
    id: 4,
    sectionNumber: 'I',
    sectionTitle: 'Capítulo I · Definiciones y Principios',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 2º',
    question: 'Respecto al alcance territorial y normativo del Acuerdo 009 de 2024, ¿cuál de las siguientes afirmaciones es correcta?',
    options: [
      'Aplica únicamente a los Centros de Formación ubicados en la ciudad de Bogotá D.C.',
      'Aplica exclusivamente para aprendices en modalidad virtual, excluyendo sedes presenciales.',
      'Aplica a todos los aspirantes en proceso de ingreso y a los aprendices en todas las sedes, jornadas, niveles y modalidades presenciales, virtuales o combinadas, dentro o fuera de la entidad.',
      'Solo aplica durante el primer mes de inducción y luego pierde su vigencia legal.'
    ],
    correctAnswerIndex: 2,
    positiveFeedback: '¡Muy bien contestado! El reglamento tiene vigencia nacional total y cobija tanto la etapa lectiva como la productiva, presencial o virtual, dentro y fuera de la institución.',
    errorDiagnosis: 'El Artículo 2º estipula el alcance integral del reglamento: aplica a aspirantes durante el ingreso y a aprendices durante toda su formación y certificación, en cualquier sede del país, jornadas y modalidades.',
    optionExplanations: [
      'Incorrecto: El reglamento rige a nivel nacional en las 33 regionales de Colombia, no solo en la capital.',
      'Incorrecto: Cobija transversalmente todas las modalidades: presencial, virtual, a distancia y combinada.',
      'Correcto: Es el alcance integral fijado en el Artículo 2º del Acuerdo 009 de 2024.',
      'Incorrecto: El reglamento permanece vigente durante todo el ciclo formativo hasta la obtención del título o certificado.'
    ]
  },
  {
    id: 5,
    sectionNumber: 'I',
    sectionTitle: 'Capítulo I · Definiciones y Principios',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 1º, Numeral 2',
    question: '¿Quiénes integran la "Comunidad Educativa SENA" según el Artículo 1º, Numeral 2 del Acuerdo 009 de 2024?',
    options: [
      'Únicamente el Director General y los subdirectores de los Centros.',
      'Solo los instructores que tengan contrato de planta indefinido.',
      'Los aprendices, instructores, personal administrativo y de apoyo, directivos, egresados, familias, empresarios y organizaciones de las economías popular, campesina y sectores sociales.',
      'Exclusivamente los aprendices matriculados en carreras tecnológicas.'
    ],
    correctAnswerIndex: 2,
    positiveFeedback: '¡Respuesta impecable! La Comunidad Educativa SENA es amplia y diversa; integra a todos los actores sociales, campesinos, productivos y familiares que apoyan tu crecimiento.',
    errorDiagnosis: 'La Comunidad Educativa SENA es un ecosistema interconectado. El Artículo 1º, Numeral 2 incluye a aprendices, docentes, directivos, egresados, familias, sectores campesinos y economía popular.',
    optionExplanations: [
      'Incorrecto: No se limita a directivos; la comunidad abarca a todos los estamentos de base.',
      'Incorrecto: No discrimina por tipo de contrato ni excluye a los aprendices ni a la sociedad civil.',
      'Correcto: Define la amplia comunidad educativa integral del Artículo 1º, Numeral 2.',
      'Incorrecto: Abarca todos los niveles: operario, auxiliar, técnico, tecnólogo y especializaciones.'
    ]
  },

  // ==========================================
  // SECCIÓN II: DERECHOS Y REPRESENTACIÓN (5 Preguntas)
  // ==========================================
  {
    id: 6,
    sectionNumber: 'II',
    sectionTitle: 'Capítulo II · Derechos y Representación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 5º',
    question: '¿Cuál de los siguientes enunciados constituye un DERECHO fundamental del aprendiz SENA consagrado en el Artículo 5º?',
    options: [
      'Modificar arbitrariamente el cronograma institucional sin previa autorización de la coordinación.',
      'Recibir inducción integral, formación profesional de calidad con instructores calificados y disponer de recursos didácticos y tecnológicos idóneos.',
      'Imponer sus propias normas de seguridad y desobedecer las instrucciones de salud ocupacional.',
      'Cobrar por asesorar académicamente a los compañeros de su misma ficha formativa.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Excelente! Tienes derecho inalienable a recibir educación pertinente, de alta calidad tecnológica y pedagógica con ambientes idóneos y trato digno.',
    errorDiagnosis: 'El Artículo 5º consagra los derechos de los aprendices: derecho a la formación de calidad, recursos didácticos, inducción, uso de biblioteca, bienestar y debido proceso.',
    optionExplanations: [
      'Incorrecto: El aprendiz no puede alterar cronogramas institucionales a voluntad; la planeación es concertada.',
      'Correcto: Es uno de los derechos primordiales consagrados en el Artículo 5º del reglamento.',
      'Incorrecto: El cumplimiento de las normas de bioseguridad y SST es un deber obligatorio, no un derecho negociable.',
      'Incorrecto: La solidaridad y el trabajo colaborativo son principios formativos; no se permite lucro con compañeros.'
    ]
  },
  {
    id: 7,
    sectionNumber: 'II',
    sectionTitle: 'Capítulo II · Derechos y Representación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 6º',
    question: 'En el SENA, ¿cuál es el mecanismo democrático mediante el cual se elige al "Vocero de Ficha o Grupo"?',
    options: [
      'Es nombrado a dedo por el Subdirector de Centro sin consultar a los aprendices.',
      'Es elegido por votación democrática entre los aprendices de la ficha durante el primer mes de formación.',
      'Es la persona con la matrícula más antigua en el sistema SOFIA Plus / Zajuna.',
      'Se designa por sorteo al azar mediante balotas numeradas en coordinación.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Muy bien! La democracia participativa inicia en el aula: los aprendices eligen libremente a su vocero para canalizar propuestas y fortalecer la comunicación.',
    errorDiagnosis: 'El Artículo 6º establece que el vocero de grupo es elegido democráticamente por mayoría simple por los propios aprendices de la ficha durante las primeras semanas de formación.',
    optionExplanations: [
      'Incorrecto: Las directivas no imponen voceros; la elección es autónoma y participativa.',
      'Correcto: Corresponde al procedimiento democrático estipulado en el Artículo 6º del Acuerdo 009 de 2024.',
      'Incorrecto: La antigüedad no otorga representatividad; se fundamenta en el voto libre de los compañeros.',
      'Incorrecto: No se realiza por azar; se postulan aprendices y se vota de manera informada.'
    ]
  },
  {
    id: 8,
    sectionNumber: 'II',
    sectionTitle: 'Capítulo II · Derechos y Representación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 7º',
    question: '¿Qué función principal cumple el "Representante de los Aprendices" del Centro de Formación según el Artículo 7º?',
    options: [
      'Firmar resoluciones sancionatorias y expulsar a aprendices del Centro.',
      'Actuar como canal formal de interlocución ante la Subdirección y Comité de Centro representando las necesidades e iniciativas del colectivo de aprendices.',
      'Administrar la caja menor y el presupuesto financiero general del Centro.',
      'Asignar las calificaciones cuantitativas en las evidencias de aprendizaje.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Brillante respuesta! El Representante de Centro es el líder que eleva la voz colectiva de los aprendices, promueve derechos y gestiona iniciativas de bienestar.',
    errorDiagnosis: 'El Representante de Aprendices (Art. 7º) no tiene funciones punitivas ni financieras; es un líder estudiantil que representa al estamento estudiantil ante los comités de Centro y la Dirección.',
    optionExplanations: [
      'Incorrecto: La facultad disciplinaria recae en el Subdirector y el Comité de Evaluación, no en el representante.',
      'Correcto: Es la función medular de interlocución y liderazgo estudiantil según el Artículo 7º.',
      'Incorrecto: La administración de recursos fiscales es competencia exclusiva del personal administrativo del SENA.',
      'Incorrecto: La evaluación del aprendizaje es potestad técnica y pedagógica exclusiva de los instructores.'
    ]
  },
  {
    id: 9,
    sectionNumber: 'II',
    sectionTitle: 'Capítulo II · Derechos y Representación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 5º',
    question: 'Si un aprendiz tiene observaciones o desacuerdos sobre la evaluación de una evidencia de aprendizaje, ¿a qué derecho reglamentario puede apelar?',
    options: [
      'Al derecho a solicitar revisión pedagógica y retroalimentación oportuna en los términos reglamentarios con respeto.',
      'Al derecho a bloquear el acceso al aula de clase hasta que le otorguen la máxima calificación.',
      'A demandar de inmediato ante un juzgado penal al instructor sin agotar el trámite interno.',
      'Al derecho a no volver a presentar evidencias formativas durante el trimestre.'
    ],
    correctAnswerIndex: 0,
    positiveFeedback: '¡Excelente! El debido proceso pedagógico te da el derecho a pedir revisión argumentada, conocer criterios de evaluación y concertar planes de mejoramiento.',
    errorDiagnosis: 'El Artículo 5º otorga el derecho a conocer oportunamente las evaluaciones y solicitar revisión motivada al instructor, agotando las instancias regulares de diálogo formativo.',
    optionExplanations: [
      'Correcto: El derecho a la retroalimentación y a la revisión pedagógica está amparado por el Artículo 5º.',
      'Incorrecto: Las vías de hecho y bloqueos violan el reglamento y constituyen falta disciplinaria gravísima.',
      'Incorrecto: Primero debe agotarse el conducto regular formativo institucional antes de cualquier otra vía externa.',
      'Incorrecto: La evaluación continua es un requisito indispensable para alcanzar los resultados de aprendizaje.'
    ]
  },
  {
    id: 10,
    sectionNumber: 'II',
    sectionTitle: 'Capítulo II · Derechos y Representación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 5º y 7º',
    question: '¿Qué tipo de estímulos o incentivos puede recibir un aprendiz SENA por su rendimiento académico, liderazgo o innovación destacada?',
    options: [
      'Exención de por vida del pago de impuestos nacionales en Colombia.',
      'Monitorías formativas, apoyos de sostenimiento, representación institucional en eventos científicos/deportivos y menciones de honor.',
      'Un contrato laboral directo como Subdirector del Centro de Formación.',
      'La facultad de calificar las evaluaciones de sus propios instructores.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Así se responde! El SENA premia el esfuerzo, la investigación y la excelencia mediante monitorías, apoyos institucionales y oportunidades internacionales (WorldSkills/SENNOVA).',
    errorDiagnosis: 'Los incentivos y reconocimientos formativos incluyen monitorías en áreas técnicas, apoyos de sostenimiento, comisiones para representar al SENA y menciones en la hoja de vida académica.',
    optionExplanations: [
      'Incorrecto: El SENA no tiene facultades tributarias para exonerar impuestos estatales.',
      'Correcto: Son los estímulos reales y vigentes contemplados en el reglamento del aprendiz y políticas de bienestar.',
      'Incorrecto: Para cargos directivos se requiere cumplir requisitos de ley y carrera administrativa pública.',
      'Incorrecto: Los aprendices evalúan la gestión pedagógica mediante encuestas institucionales, pero no asignan notas laborales.'
    ]
  },

  // ==========================================
  // SECCIÓN III: DEBERES Y PROHIBICIONES (5 Preguntas)
  // ==========================================
  {
    id: 11,
    sectionNumber: 'III',
    sectionTitle: 'Capítulo III · Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 8º',
    question: 'En materia de seguridad, identificación y convivencia, ¿cuál de los siguientes es un DEBER obligatorio del aprendiz (Artículo 8º)?',
    options: [
      'Prestar el carnet institucional a amigos externos para que ingresen a las instalaciones.',
      'Portar visiblemente el carnet institucional de identificación y usar los elementos de protección personal (EPP) según el área técnica.',
      'Ingresar al Centro de Formación en horarios no autorizados saltando las vallas de seguridad.',
      'Fotocopiar el carnet institucional con foto falsa para uso personal.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Muy bien! Portar el carnet y los elementos de protección personal (EPP) no solo es una norma de convivencia, sino una medida vital de seguridad laboral y salud ocupacional.',
    errorDiagnosis: 'El Artículo 8º establece como deber ineludible portar permanentemente el carnet institucional visible en el Centro y portar la indumentaria y EPP requeridos en los talleres y ambientes de aprendizaje.',
    optionExplanations: [
      'Incorrecto: El carnet es un documento personal e intransferible; prestarlo constituye una falta grave.',
      'Correcto: Es un deber legal explícito en el Artículo 8º del Acuerdo 009 de 2024.',
      'Incorrecto: Ingresar por accesos no autorizados vulnera las normas de seguridad institucional.',
      'Incorrecto: La falsedad o adulteración de documentos institucionales es falta gravísima con consecuencias legales.'
    ]
  },
  {
    id: 12,
    sectionNumber: 'III',
    sectionTitle: 'Capítulo III · Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 8º',
    question: 'Si un aprendiz no puede asistir a una sesión de formación o entrega de evidencias por fuerza mayor o salud, ¿cuál es el plazo reglamentario para radicar la justificación?',
    options: [
      'Hasta tres (3) días hábiles siguientes al hecho, adjuntando los soportes médicos o legales válidos.',
      'Un mes después cuando se reúna el Comité de Evaluación.',
      'El mismo día en el primer minuto o de lo contrario queda cancelada la matrícula automáticamente.',
      'No existe plazo porque la inasistencia nunca requiere justificación en el SENA.'
    ],
    correctAnswerIndex: 0,
    positiveFeedback: '¡Correcto y preciso! El término legal para radicar justificaciones válidas es de 3 días hábiles. La responsabilidad a tiempo previene reportes de deserción.',
    errorDiagnosis: 'El Artículo 8º señala que la inasistencia debe justificarse formalmente dentro de los tres (3) días hábiles siguientes a su ocurrencia ante el instructor y coordinación correspondiente.',
    optionExplanations: [
      'Correcto: Plazo perentorio de 3 días hábiles con sus respectivos soportes documentales según el Artículo 8º.',
      'Incorrecto: Un mes es extemporáneo y da lugar a inicio de procedimiento por posible deserción formativa.',
      'Incorrecto: Aunque es prudente avisar pronto, el reglamento otorga 3 días hábiles de margen para radicar el soporte.',
      'Incorrecto: La formación presencial y virtual exige asistencia y participación activa obligatoria.'
    ]
  },
  {
    id: 13,
    sectionNumber: 'III',
    sectionTitle: 'Capítulo III · Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 9º',
    question: 'Según el Artículo 9º de PROHIBICIONES, ¿cuál de las siguientes conductas es una prohibición expresa de carácter gravísimo en el SENA?',
    options: [
      'Pedir la palabra levantando la mano en una sesión en línea.',
      'Ingresar, portar, consumir o comercializar armas, estupefacientes, bebidas alcohólicas o sustancias psicoactivas en el Centro o ambientes de formación.',
      'Consultar libros y recursos en la biblioteca virtual Zajuna en horario nocturno.',
      'Proponer proyectos comunitarios en beneficio de la región.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Exacto! El consumo o porte de sustancias psicoactivas, alcohol o armas atenta directamente contra la integridad de la comunidad y acarrea cancelación de matrícula.',
    errorDiagnosis: 'El Artículo 9º prohíbe taxativamente ingresar o consumir sustancias psicoactivas, bebidas embriagantes o armas en cualquier sede física o eventos formativos de la entidad.',
    optionExplanations: [
      'Incorrecto: Participar con orden y respeto es una práctica deseable en el proceso pedagógico.',
      'Correcto: Es una prohibición taxativa de máxima gravedad en el Artículo 9º del Acuerdo 009 de 2024.',
      'Incorrecto: El acceso a plataformas educativas 24/7 es un derecho y recurso abierto para los aprendices.',
      'Incorrecto: El desarrollo de iniciativas comunitarias es altamente incentivado en la formación integral.'
    ]
  },
  {
    id: 14,
    sectionNumber: 'III',
    sectionTitle: 'Capítulo III · Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 9º',
    question: 'En relación con la integridad y honestidad académica, ¿qué conducta prohíbe terminantemente el reglamento?',
    options: [
      'Citar fuentes bibliográficas en formato APA e investigar en internet.',
      'Cometer fraude, suplantación de identidad, plagio o comprar/vender evidencias de aprendizaje para presentarlas como propias.',
      'Formar grupos de estudio con compañeros de la misma ficha.',
      'Preguntarle al instructor dudas metodológicas sobre una guía de trabajo.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Muy bien aprendido! La ética profesional es innegociable: el plagio y la suplantación vulneran los principios de integridad del SENA y tienen graves consecuencias disciplinarias.',
    errorDiagnosis: 'El Artículo 9º prohíbe el plagio total o parcial, la compra/venta de evidencias, el uso deshonesto de tecnologías o la suplantación en pruebas y sistemas institucionales.',
    optionExplanations: [
      'Incorrecto: Citar correctamente y consultar fuentes académicas es un deber de rigor investigativo.',
      'Correcto: El fraude académico y el plagio están catalogados como prohibiciones directas en el Artículo 9º.',
      'Incorrecto: El aprendizaje colaborativo y el trabajo en equipo son metodologías promovidas activamente.',
      'Incorrecto: Resolver dudas pedagógicas con el instructor es un derecho fundamental del aprendiz.'
    ]
  },
  {
    id: 15,
    sectionNumber: 'III',
    sectionTitle: 'Capítulo III · Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 8º',
    question: '¿Cuál es el deber del aprendiz respecto a sus datos personales en el sistema de información institucional (SOFIA Plus / Zajuna)?',
    options: [
      'Mantener actualizados permanentemente sus datos de contacto (teléfono, correo, documento de identidad y domicilio).',
      'Registrar datos ficticios o números de teléfono que no le pertenezcan para evitar ser contactado.',
      'Cambiar el tipo de documento sin presentar el soporte legal ante la oficina de Administración Educativa.',
      'Eliminar periódicamente su correo institucional para no recibir circulares.'
    ],
    correctAnswerIndex: 0,
    positiveFeedback: '¡Perfecto! Mantener actualizados tus datos en el aplicativo institucional garantiza que recibas citaciones, oportunidades de empleo, apoyos de sostenimiento y certificados a tiempo.',
    errorDiagnosis: 'El Artículo 8º consagra el deber de registrar y mantener al día la información personal verídica y el correo activo en los aplicativos de administración académica del SENA.',
    optionExplanations: [
      'Correcto: Es un deber indispensable para la trazabilidad y certificación oficial según el Artículo 8º.',
      'Incorrecto: Registrar datos falsos impide notificaciones legales y puede acarrear sanciones disciplinarias.',
      'Incorrecto: Cualquier modificación de documento exige validación con soporte original ante la oficina correspondiente.',
      'Incorrecto: El correo institucional es el medio oficial de notificación; su descuido no exime de responsabilidades.'
    ]
  },

  // ==========================================
  // SECCIÓN IV: TRÁMITES, NOVEDADES Y EVALUACIÓN (5 Preguntas)
  // ==========================================
  {
    id: 16,
    sectionNumber: 'IV',
    sectionTitle: 'Capítulo IV · Trámites, Novedades y Evaluación',
    articleRef: 'Acuerdo 009 de 2024 - Artículos 21 al 24',
    question: '¿Qué es el "Aplazamiento" dentro del trámite de novedades del aprendiz (Artículo 22)?',
    options: [
      'La expulsión irrevocable del aprendiz del Centro de Formación con pérdida de derechos.',
      'La solicitud justificada que hace el aprendiz para desvincularse temporalmente de su programa por fuerza mayor, reservando su cupo hasta por un tiempo máximo determinado.',
      'Un permiso para llegar tarde a clases todos los viernes.',
      'Un cambio definitivo de ciudad sin conservar el programa formativo.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Excelente! El aplazamiento protege tu cupo formativo ante emergencias de salud, laborales o calamidades, permitiendo reintegrarte cuando superes la situación.',
    errorDiagnosis: 'El Artículo 22 define el Aplazamiento como la desvinculación transitoria solicitada por el aprendiz por causa justificada (máximo hasta 6 meses o término fijado por la entidad), preservando la posibilidad de reintegro.',
    optionExplanations: [
      'Incorrecto: La expulsión corresponde a la sanción de cancelación de matrícula, no al aplazamiento voluntario.',
      'Correcto: Es la definición técnica y legal del trámite de aplazamiento en el Artículo 22.',
      'Incorrecto: Las llegadas tardías reiteradas son incumplimientos de horario, no un aplazamiento.',
      'Incorrecto: El cambio de ciudad entre Centros corresponde a la novedad de Traslado de Centro.'
    ]
  },
  {
    id: 17,
    sectionNumber: 'IV',
    sectionTitle: 'Capítulo IV · Trámites, Novedades y Evaluación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 27',
    question: '¿Cuál de las siguientes situaciones se considera causal para declarar la "Deserción" del proceso de formación según el Artículo 27?',
    options: [
      'Hacer preguntas difíciles al instructor en el taller.',
      'Injustificar la inasistencia durante tres (3) días consecutivos a las actividades de formación presencial o no ingresar a la plataforma virtual durante un periodo continuo estipulado sin aviso.',
      'Solicitar cambio de vocero de grupo mediante votación.',
      'Participar en un semillero de investigación tecnológica de SENNOVA.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Muy bien identificado! La inasistencia continuada e injustificada por 3 días o la ausencia en la plataforma LMS activa el protocolo de presunción de deserción.',
    errorDiagnosis: 'El Artículo 27 tipifica la deserción cuando el aprendiz acumula 3 días consecutivos de inasistencia injustificada o cuando en formación virtual no reporta evidencias ni interactúa en la plataforma durante el tiempo límite fijado.',
    optionExplanations: [
      'Incorrecto: El cuestionamiento crítico y la formulación de preguntas son el núcleo del pensamiento reflexivo.',
      'Correcto: Es la causal normativa de deserción tipificada en el Artículo 27 del Acuerdo 009 de 2024.',
      'Incorrecto: Cambiar de vocero es un ejercicio de la autonomía de grupo amparado en el reglamento.',
      'Incorrecto: Vincularse a semilleros es un mérito de investigación formativa destacado.'
    ]
  },
  {
    id: 18,
    sectionNumber: 'IV',
    sectionTitle: 'Capítulo IV · Trámites, Novedades y Evaluación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 28',
    question: 'En el procedimiento de deserción, una vez vencido el término sin justificación válida, ¿qué garantía del debido proceso debe brindar el Subdirector de Centro (Artículo 28)?',
    options: [
      'Publicar los nombres en redes sociales públicas con multas monetarias.',
      'Enviar una comunicación oficial (citación) requiriendo al aprendiz para que presente sus descargos o justificaciones en un plazo prudente antes de expedir el acto administrativo de deserción.',
      'Borrar inmediatamente todos los registros del aprendiz sin ninguna notificación.',
      'Retener los documentos de identidad originales del aprendiz.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Totalmente cierto! En el Estado de Derecho y en el SENA el debido proceso es sagrado: siempre se cita formalmente al aprendiz antes de tomar cualquier decisión de retiro.',
    errorDiagnosis: 'El Artículo 28 exige que la coordinación o subdirección emita una citación formal otorgando al aprendiz un plazo (generalmente 5 días hábiles) para sustentar la inasistencia antes de formalizar la deserción.',
    optionExplanations: [
      'Incorrecto: El SENA respeta el derecho a la intimidad y protección de datos (Habeas Data) y no impone multas civiles.',
      'Correcto: Es el procedimiento obligatorio de citación previa que garantiza el debido proceso (Artículo 28).',
      'Incorrecto: Las decisiones unilaterales sin previo aviso violan el derecho fundamental a la defensa.',
      'Incorrecto: La retención de documentos personales es una conducta contraria a la ley.'
    ]
  },
  {
    id: 19,
    sectionNumber: 'IV',
    sectionTitle: 'Capítulo IV · Trámites, Novedades y Evaluación',
    articleRef: 'Acuerdo 009 de 2024 - Artículos 32 y 33',
    question: '¿Cuál es la escala de juicio evaluativo oficial empleada en el SENA para calificar los Resultados de Aprendizaje?',
    options: [
      'Escala numérica de 1 a 10 con decimales.',
      'Letras del alfabeto de la A a la F como en el sistema anglosajón.',
      'Juicio cualitativo binario: "Aprobado" (A) o "No Aprobado" (D - Deficiente / Por Mejorar).',
      'Estrellas doradas y medallas virtuales exclusivamente.'
    ],
    correctAnswerIndex: 2,
    positiveFeedback: '¡Perfecto! En el SENA se evalúa por competencias laborales: o alcanzas el resultado de aprendizaje ("Aprobado") o se concierta un plan de mejoramiento para lograrlo.',
    errorDiagnosis: 'El Artículo 32 establece que la evaluación del aprendizaje es cualitativa e integral basada en normas de competencia laboral, emitiéndose el juicio de "Aprobado" o "No Aprobado".',
    optionExplanations: [
      'Incorrecto: El SENA no utiliza calificaciones numéricas cuantitativas tradicionales en su emisión final de resultados.',
      'Incorrecto: El sistema de letras anglosajón (A, B, C, D, F) no rige en los programas de formación profesional integral.',
      'Correcto: Es la escala institucional consagrada en el Artículo 32 del Acuerdo 009 de 2024.',
      'Incorrecto: Aunque se use gamificación didáctica en clase, el registro académico oficial se basa en juicios evaluativos.'
    ]
  },
  {
    id: 20,
    sectionNumber: 'IV',
    sectionTitle: 'Capítulo IV · Trámites, Novedades y Evaluación',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 35',
    question: 'Cuando un aprendiz obtiene un juicio de "No Aprobado" en una evidencia formativa, ¿qué acción pedagógica debe concertar el instructor con él (Artículo 35)?',
    options: [
      'Expulsarlo inmediatamente del programa sin opción de recuperación.',
      'Un Plan de Mejoramiento pedagógico con nuevas actividades, plazos y evidencias concertadas para alcanzar el resultado de aprendizaje.',
      'Cobrarle un cargo económico por el tiempo extra de tutoría.',
      'Obligarlo a reiniciar el programa de formación desde el primer trimestre.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Excelente visión pedagógica! El error es una oportunidad de superación: el Plan de Mejoramiento permite reforzar competencias y alcanzar el resultado esperado.',
    errorDiagnosis: 'El Artículo 35 estipula que ante evidencias deficientes se debe formular un Plan de Mejoramiento pedagógico concertado con el aprendiz para acompañarlo a alcanzar el logro.',
    optionExplanations: [
      'Incorrecto: El modelo pedagógico del SENA es formativo, no punitivo inmediato.',
      'Correcto: Es la herramienta pedagógica de recuperación formativa estipulada en el Artículo 35.',
      'Incorrecto: La educación y asesorías en el SENA son 100% gratuitas; no se permite ningún cobro.',
      'Incorrecto: El plan de mejoramiento se focaliza en la competencia pendiente sin reiniciar todo el programa.'
    ]
  },

  // ==========================================
  // SECCIÓN V: FALTAS, MEDIDAS Y DEBIDO PROCESO (5 Preguntas)
  // ==========================================
  {
    id: 21,
    sectionNumber: 'V',
    sectionTitle: 'Capítulo V · Faltas, Medidas y Debido Proceso',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 41',
    question: 'De acuerdo con el Artículo 41, ¿cómo se clasifican formalmente las faltas disciplinarias o académicas en el SENA?',
    options: [
      'Faltas infantiles, juveniles y de adultos.',
      'Faltas Leves, Graves y Gravísimas.',
      'Faltas teóricas y faltas prácticas.',
      'Faltas perdonables e imperdonables.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Acertaste! La tipificación legal en el Acuerdo 009 clasifica las faltas en Leves, Graves y Gravísimas según su intencionalidad, reincidencia e impacto en la comunidad.',
    errorDiagnosis: 'El Artículo 41 clasifica taxativamente las faltas en: Faltas Leves, Faltas Graves y Faltas Gravísimas, estableciendo parámetros claros para su calificación.',
    optionExplanations: [
      'Incorrecto: La clasificación no depende de la edad, sino de la gravedad de la conducta.',
      'Correcto: Es la clasificación tripartita oficial consagrada en el Artículo 41 del Acuerdo 009 de 2024.',
      'Incorrecto: No se subdividen por teoría o práctica; pueden ser de orden académico o disciplinario.',
      'Incorrecto: Todas las faltas están sujetas al debido proceso y valoración reglamentaria objetiva.'
    ]
  },
  {
    id: 22,
    sectionNumber: 'V',
    sectionTitle: 'Capítulo V · Faltas, Medidas y Debido Proceso',
    articleRef: 'Acuerdo 009 de 2024 - Artículos 42 al 44',
    question: '¿Cuál de las siguientes circunstancias actúa como un "Atenuante" al momento de calificar la falta cometida por un aprendiz?',
    options: [
      'Ocultar la falta o culpar deliberadamente a un compañero inocente.',
      'Haber cometido la falta de manera premeditada y en complicidad con extraños.',
      'Haber actuado con confesión espontánea, manifestando arrepentimiento y procurando reparar el daño antes del comité.',
      'Ser reincidente en la misma falta varias veces en el trimestre.'
    ],
    correctAnswerIndex: 2,
    positiveFeedback: '¡Muy bien analizado! La honestidad y el deseo genuino de reparar el perjuicio demuestran madurez ética y operan legalmente como circunstancias atenuantes.',
    errorDiagnosis: 'Los Artículos 42 y 43 señalan como atenuantes: confesión espontánea, procurar evitar o reparar voluntariamente los efectos del daño y no tener antecedentes disciplinarios.',
    optionExplanations: [
      'Incorrecto: Culpar a otros con falsedad es un agravante disciplinario.',
      'Incorrecto: La premeditación y la complicidad son causales agravantes de la conducta.',
      'Correcto: Es una circunstancia atenuante reconocida expresamente en el Artículo 43.',
      'Incorrecto: La reincidencia es uno de los principales agravantes en la calificación de faltas.'
    ]
  },
  {
    id: 23,
    sectionNumber: 'V',
    sectionTitle: 'Capítulo V · Faltas, Medidas y Debido Proceso',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 45',
    question: 'Antes de aplicar sanciones disciplinarias drásticas, ¿qué medidas de carácter formativo contempla el reglamento para faltas menores?',
    options: [
      'El llamado de atención verbal pedagógico y la concertación de un plan de mejoramiento personal o comunitario.',
      'El arresto policial inmediato en la celda del Centro de Formación.',
      'La pérdida de la cédula de ciudadanía por un periodo de un año.',
      'El trabajo forzado no remunerado en obras públicas.'
    ],
    correctAnswerIndex: 0,
    positiveFeedback: '¡Exacto! El enfoque del SENA es ante todo formativo y restaurativo: el diálogo, el llamado de atención pedagógico y las acciones reflexivas orientan la conducta.',
    errorDiagnosis: 'El Artículo 45 contempla las "Medidas Formativas", tales como el llamado de atención verbal formativo y la suscripción de compromisos pedagógicos o comunitarios restaurativos.',
    optionExplanations: [
      'Correcto: Son las medidas formativas pedagógicas descritas en el Artículo 45 del nuevo reglamento.',
      'Incorrecto: El SENA es una entidad educativa civil; carece de recintos carcelarios o arrestos.',
      'Incorrecto: Ninguna institución formativa puede suspender derechos civiles como el documento de identidad.',
      'Incorrecto: La Constitución Política de Colombia prohíbe el trabajo forzado; se concuerdan compromisos pedagógicos.'
    ]
  },
  {
    id: 24,
    sectionNumber: 'V',
    sectionTitle: 'Capítulo V · Faltas, Medidas y Debido Proceso',
    articleRef: 'Acuerdo 009 de 2024 - Artículo 46',
    question: '¿Qué es la "Cancelación de Matrícula" en el régimen sancionatorio del SENA (Artículo 46)?',
    options: [
      'Una felicitación formal enviada al correo del aprendiz.',
      'La máxima sanción disciplinaria impuesta por faltas gravísimas que desvincula al aprendiz del programa e inhabilita su ingreso al SENA por un periodo determinado.',
      'El trámite para cambiar de jornada nocturna a diurna.',
      'El pago de los derechos de grado al finalizar el año formativo.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Respuesta correcta! La cancelación de matrícula es la sanción más severa impuesta por la Subdirección tras agotar el debido proceso ante faltas gravísimas.',
    errorDiagnosis: 'El Artículo 46 define la Cancelación de Matrícula como la sanción definitiva que da por terminado el contrato formativo y genera inhabilidad para matricularse en el SENA entre 6 meses y 2 años según la gravedad.',
    optionExplanations: [
      'Incorrecto: La felicitación es un estímulo o reconocimiento, no una sanción disciplinaria.',
      'Correcto: Es la definición reglamentaria de la sanción máxima consagrada en el Artículo 46.',
      'Incorrecto: El cambio de jornada es una solicitud académica de traslado interno, no una sanción.',
      'Incorrecto: En el SENA no existen costos por derechos de grado; la formación pública es gratuita.'
    ]
  },
  {
    id: 25,
    sectionNumber: 'V',
    sectionTitle: 'Capítulo V · Faltas, Medidas y Debido Proceso',
    articleRef: 'Acuerdo 009 de 2024 - Artículos 48 al 52',
    question: 'En el procedimiento disciplinario institucional, ¿qué derecho tiene el aprendiz si no está de acuerdo con la sanción expedida por el Subdirector de Centro?',
    options: [
      'Debe acatarla sin derecho a refutar ni defenderse.',
      'Interponer el Recurso de Reposición dentro del término legal para que la decisión sea reconsiderada formalmente.',
      'Eliminar los expedientes de la oficina de coordinación.',
      'Contratar guardaespaldas para no permitir el ingreso de los instructores.'
    ],
    correctAnswerIndex: 1,
    positiveFeedback: '¡Magistral! El derecho a la defensa y la doble vía jurídica garantizan la interposición del Recurso de Reposición para que el aprendiz sea escuchado con plenas garantías.',
    errorDiagnosis: 'Los Artículos 51 y 52 consagran expresamente los recursos de ley: contra la resolución que imponga sanciones procede el Recurso de Reposición dentro del término legal fijado en el acto administrativo.',
    optionExplanations: [
      'Incorrecto: Todo acto sancionatorio en Colombia debe garantizar el derecho constitucional a controvertir la decisión.',
      'Correcto: Es el recurso ordinario amparado por el debido proceso en los Artículos 51 y 52 del Acuerdo 009 de 2024.',
      'Incorrecto: Destruir expedientes públicos constituye delito penal y falta gravísima de máxima categoría.',
      'Incorrecto: Las acciones hostiles son contrarias a la ley y conllevan intervención de autoridades competentes.'
    ]
  }
];

export const BENCHMARK_LEADERBOARD: GamifiedRankingEntry[] = [
  {
    rank: 1,
    apprenticeName: 'Valentina Restrepo Henao',
    tokenNumber: '2874102',
    scorePercent: 100,
    totalPoints: 3920,
    correctAnswers: 25,
    totalQuestions: 25,
    timeSeconds: 154,
    timeFormatted: '02:34',
    maxStreak: 25,
    badges: ['Rayo Normativo', 'Precisión Total', 'Racha de Oro'],
    date: '2026-10-06'
  },
  {
    rank: 2,
    apprenticeName: 'Mateo Andrés Beltrán Silva',
    tokenNumber: '2874102',
    scorePercent: 96,
    totalPoints: 3680,
    correctAnswers: 24,
    totalQuestions: 25,
    timeSeconds: 178,
    timeFormatted: '02:58',
    maxStreak: 18,
    badges: ['Precisión Impecable', 'Racha de Oro'],
    date: '2026-10-06'
  },
  {
    rank: 3,
    apprenticeName: 'Diana Marcela Castro Rojas',
    tokenNumber: '2874102',
    scorePercent: 92,
    totalPoints: 3410,
    correctAnswers: 23,
    totalQuestions: 25,
    timeSeconds: 202,
    timeFormatted: '03:22',
    maxStreak: 14,
    badges: ['Guardián del Reglamento'],
    date: '2026-10-05'
  },
  {
    rank: 4,
    apprenticeName: 'Julián David Morales Pinzón',
    tokenNumber: '2874102',
    scorePercent: 88,
    totalPoints: 3120,
    correctAnswers: 22,
    totalQuestions: 25,
    timeSeconds: 235,
    timeFormatted: '03:55',
    maxStreak: 11,
    badges: ['Buen Ritmo'],
    date: '2026-10-05'
  },
  {
    rank: 5,
    apprenticeName: 'Camila Andrea Ospina Ortiz',
    tokenNumber: '2874102',
    scorePercent: 84,
    totalPoints: 2890,
    correctAnswers: 21,
    totalQuestions: 25,
    timeSeconds: 260,
    timeFormatted: '04:20',
    maxStreak: 9,
    badges: ['Aprobado Destacado'],
    date: '2026-10-05'
  }
];
