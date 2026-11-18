import type { TextQuiz } from '../types';

const data: TextQuiz[] = [
  {
    text: 'es-3-grandmother-letter',
    q: [
      { q: '¿Dónde encontró Pablo la caja?', o: ['En la cocina', 'Debajo de la cama', 'En el jardín'] },
      { q: '¿Quién era Andrés?', o: ['El abuelo de Pablo', 'El primer amor de su abuela', 'Un vecino de Alemania'] },
      { q: '¿Por qué se fue Andrés del pueblo?', o: ['Para trabajar en Alemania', 'Para estudiar en Madrid', 'Para casarse'] },
      { q: '¿Qué dijo la madre de Pablo sobre esa decisión?', o: ['Que fue un error', 'Que sin ella, ellos no estarían allí', 'Que no sabía nada'] },
      { q: '¿Qué quiere hacer Pablo ahora?', o: ['Enviar la carta', 'Vender el piso', 'Viajar a Asturias'] },
    ],
  },
  {
    text: 'es-3-siesta',
    q: [
      {
        q: '¿Qué cree mucha gente fuera de España?',
        o: ['Que todos los españoles duermen la siesta cada día', 'Que la siesta está prohibida en España', 'Que a los españoles no les gusta dormir'],
      },
      { q: 'Según las encuestas, ¿cuántos españoles duermen la siesta de forma habitual?', o: ['Casi todos', 'Solo una minoría', 'Nadie'] },
      { q: 'Según los expertos, ¿cuánto debe durar una siesta?', o: ['Dos horas', 'Una hora', 'Veinte minutos'] },
      { q: '¿Qué puede pasar si la siesta es demasiado larga?', o: ['Puedes despertarte más cansado', 'Pierdes peso', 'Duermes mejor por la noche'] },
      { q: '¿Qué tienen ya algunas empresas de otros países?', o: ['Pausas más largas para comer', 'Salas especiales para descansar', 'Café gratis'] },
    ],
  },
  {
    text: 'es-3-wrong-train',
    q: [
      { q: '¿Por qué iba Javier a Zaragoza?', o: ['Para visitar a su familia', 'Para una entrevista de trabajo', 'Para ir de vacaciones'] },
      {
        q: '¿Por qué subió al tren equivocado?',
        o: ['Se lo dijo el revisor', 'Llegaba tarde y no miró el panel', 'El tren a Zaragoza estaba cancelado'],
      },
      { q: '¿Quién era Lucía?', o: ['Una revisora', 'La dueña del bar del pueblo', 'Una amiga de Zaragoza'] },
      { q: '¿Qué le ofreció Lucía?', o: ['Una habitación en su casa', 'Unas semanas de prueba, trabajando a distancia', 'Un billete de vuelta a casa'] },
      {
        q: '¿Qué decía el correo de Zaragoza?',
        o: ['Que tenía el trabajo', 'Que el puesto ya estaba ocupado', 'Que la entrevista era otro día'],
      },
    ],
  },
  {
    text: 'es-3-dinner-time',
    q: [
      { q: '¿Cuándo cenan normalmente los españoles?', o: ['Entre las seis y las siete', 'Entre las nueve y las diez', 'Después de medianoche'] },
      { q: '¿La hora de qué país usa España desde 1940?', o: ['La de Portugal', 'La de Alemania', 'La del Reino Unido'] },
      {
        q: '¿Qué efecto tiene la hora oficial de España?',
        o: ['El sol sale y se pone más tarde según el reloj', 'Los inviernos son más fríos', 'Las tiendas cierran antes'],
      },
      {
        q: '¿Por qué mucha gente comía tarde en los años cincuenta y sesenta?',
        o: ['No les gustaba comer pronto', 'Tenían dos trabajos', 'Los restaurantes abrían tarde'],
      },
      {
        q: '¿Qué ofrecen hoy algunas empresas?',
        o: ['Pausas más largas para comer', 'Horarios continuos, de ocho a tres', 'La cena en el trabajo'],
      },
    ],
  },
  {
    text: 'es-3-el-camino-de-santiago',
    q: [
      {
        q: '¿Dónde está Santiago de Compostela?',
        o: ['En el noreste de España', 'En Galicia, en el noroeste de España', 'En Portugal', 'Al pie de los Pirineos'],
      },
      {
        q: '¿Dónde empieza el Camino Francés?',
        o: ['En Sarria', 'En Oviedo', 'En un pequeño pueblo francés al pie de los Pirineos', 'En León'],
      },
      {
        q: '¿Por qué mucha gente empieza a caminar en Sarria?',
        o: [
          'Porque tiene los mejores albergues',
          'Porque está a poco más de 100 km de Santiago, el mínimo para conseguir la Compostela',
          'Porque allí empiezan las flechas amarillas',
          'Porque está en la costa',
        ],
      },
      {
        q: '¿Qué es la «credencial»?',
        o: ['Una especie de pasaporte que se sella durante el camino', 'El certificado que recibes en Santiago', 'Una concha de vieira', 'Un mapa de las rutas'],
      },
      {
        q: 'Según el artículo, ¿por qué es difícil dormir bien en los albergues?',
        o: ['Las camas son muy pequeñas', 'No hay agua caliente', 'Siempre hay alguien que ronca', 'La gente habla toda la noche'],
      },
      {
        q: '¿Qué consejo da el artículo?',
        o: [
          'Comprar botas nuevas justo antes del Camino',
          'Llevar una mochila de no más del diez por ciento de tu peso',
          'Caminar por la tarde',
          'Hacer siempre en bici los últimos 200 km',
        ],
      },
    ],
  },
  {
    text: 'es-3-el-cuarto-examen',
    q: [
      { q: '¿Cuántas veces se había presentado Marta al examen de conducir antes de este?', o: ['Una vez', 'Dos veces', 'Tres veces', 'Cuatro veces'] },
      {
        q: '¿Qué problema tiene Marta cuando está nerviosa?',
        o: ['Conduce demasiado rápido', 'Habla sin parar', 'Se olvida de las calles', 'Llora'],
      },
      {
        q: '¿Qué hizo Marta en su tercer examen?',
        o: ['Cantó con la radio', 'Le contó su vida al examinador', 'Le pidió perdón a una rotonda', 'Aparcó muy mal'],
      },
      {
        q: '¿Qué hace Marta cuando los patos cruzan la calle?',
        o: ['Toca el claxon', 'Los rodea con el coche', 'Para con suavidad y espera', 'Dice «qué monos»'],
      },
      {
        q: 'Según el señor Ortega, ¿por qué aprobó Marta?',
        o: [
          'Porque aparcó muy rápido',
          'Porque por una vez él pudo concentrarse en cómo conducía',
          'Porque conocía las calles',
          'Porque fue educada con los patos',
        ],
      },
      {
        q: '¿Qué pasa al final?',
        o: ['Marta se queda callada', 'Marta vuelve a hablar y el señor Ortega sonríe', 'El señor Ortega la suspende', 'Marta llama a su madre desde el coche'],
      },
    ],
  },
  {
    text: 'es-4-violin',
    q: [
      {
        q: '¿Por qué se quedó la narradora con el violín?',
        o: [
          'Su abuela se lo dejó en el testamento',
          'Era la única de la familia que había estudiado música',
          'Se lo compró a su madre',
          'Nadie más sabía tocarlo tan bien como ella',
        ],
      },
      { q: '¿Qué encontró dentro del violín?', o: ['Una fotografía', 'Unas monedas antiguas', 'Una carta doblada y escrita a mano', 'Una cuerda rota'] },
      {
        q: '¿Quién era Elena?',
        o: ['La profesora de música del abuelo', 'La primera mujer del abuelo', 'La tía abuela de la narradora', 'Una violinista famosa'],
      },
      {
        q: '¿Por qué no aprovechó el abuelo su beca?',
        o: ['Suspendió el examen de acceso', 'Tenía que mantener a su familia', 'Dejó de gustarle la música', 'Elena le aconsejó no ir'],
      },
      {
        q: '¿Qué hace ahora la narradora?',
        o: ['Ha vendido el violín', 'Busca a la familia de Elena', 'Practica con el violín todas las tardes', 'Da clases de violín'],
      },
    ],
  },
  {
    text: 'es-4-siesta',
    q: [
      {
        q: 'Según las encuestas, ¿cuántos españoles duermen la siesta con regularidad?',
        o: ['Casi todos', 'Más o menos la mitad', 'Menos de una quinta parte', 'Absolutamente nadie'],
      },
      {
        q: '¿Por qué tenía sentido la siesta en su origen?',
        o: [
          'Las tiendas abrían tarde por la noche',
          'Trabajar con el calor del mediodía en verano era agotador',
          'La comida era la única del día',
          'Lo mandaban los médicos',
        ],
      },
      {
        q: 'Según el artículo, ¿cuánto debería durar una siesta ideal?',
        o: ['Unos veinte minutos', 'Más o menos una hora', 'Por lo menos media hora', 'Dos horas'],
      },
      {
        q: '¿Qué puede pasar si la siesta dura más de media hora?',
        o: ['Recuerdas mejor las cosas', 'Te despiertas aturdido y de peor humor', 'Necesitas dormir menos por la noche', 'El corazón se fortalece'],
      },
      {
        q: '¿Qué hacen algunas empresas tecnológicas?',
        o: [
          'Prohibir la siesta en el trabajo',
          'Pagar a sus empleados para que duerman en casa',
          'Ofrecer salas de descanso a sus empleados',
          'Trasladar sus oficinas a España',
        ],
      },
    ],
  },
  {
    text: 'es-4-lost-recipe',
    q: [
      { q: '¿Cómo cocinaba la abuela?', o: ['Siempre con un libro de cocina', 'De memoria y a ojo', 'Con recetas de sus hermanas'] },
      { q: '¿Qué hizo la narradora el invierno pasado?', o: ['Abrió un restaurante', 'Intentó volver a hacer el arroz con leche', 'Escribió un libro de cocina'] },
      { q: '¿Dónde apareció el cuaderno?', o: ['En una librería', 'En una caja de lata en casa de la abuela', 'En la cocina de la narradora'] },
      {
        q: '¿Cuál era el «ingrediente» especial del cuaderno?',
        o: ['Un chorrito de anís', 'Leche de una granja cercana', 'Remover despacio pensando en quién se lo va a comer'],
      },
      {
        q: '¿Cómo reaccionó la madre al probar el arroz con leche?',
        o: ['Dijo que estaba demasiado dulce', 'Dijo que sabía al de la abuela', 'Pidió la receta'],
      },
    ],
  },
  {
    text: 'es-4-remote-villages',
    q: [
      {
        q: '¿Qué les ha pasado durante décadas a muchos pueblos del interior de España?',
        o: ['Han crecido muy deprisa', 'Han ido perdiendo habitantes', 'Se han convertido en destinos turísticos'],
      },
      {
        q: '¿Qué ha permitido a algunos profesionales irse a vivir al campo?',
        o: ['Coches más baratos', 'La extensión del teletrabajo', 'Nuevas líneas de tren'],
      },
      {
        q: '¿Qué ofrecen algunos ayuntamientos?',
        o: ['Coches gratis', 'Alquileres baratos y ayudas para rehabilitar casas', 'Trabajo en el ayuntamiento'],
      },
      { q: '¿Qué problema menciona el artículo?', o: ['Demasiadas tiendas', 'Una conexión a internet lenta o poco fiable', 'Demasiado transporte público'] },
      {
        q: 'Según el artículo, ¿qué hace falta además de la tecnología?',
        o: ['Nada más', 'Invertir en servicios y que los recién llegados se sientan parte de la comunidad', 'Más turistas'],
      },
    ],
  },
  {
    text: 'es-4-el-turno-de-noche',
    q: [
      {
        q: '¿Por qué le gusta a Lucía trabajar de noche?',
        o: [
          'Está mejor pagado',
          'Las calles están vacías y los pasajeros van tranquilos y sin prisa',
          'Puede dormir en los descansos',
          'Su familia vive lejos',
        ],
      },
      { q: '¿Qué deja Paco a veces junto a la máquina de billetes?', o: ['Un termo de café', 'Un cruasán caliente', 'Un periódico', 'Un sombrero'] },
      {
        q: '¿Qué tiene de raro el hombre del abrigo gris?',
        o: [
          'Nunca paga el billete',
          'Recorre la línea de punta a punta toda la noche',
          'Duerme en el autobús todas las noches',
          'Habla con todos los pasajeros',
        ],
      },
      {
        q: '¿Por qué no puede dormir Ernesto en casa?',
        o: ['Sus vecinos hacen ruido', 'Por el silencio del piso desde que murió su mujer', 'Trabaja de noche', 'Está enfermo'],
      },
      {
        q: '¿Qué problema tiene Paco?',
        o: [
          'Se le ha roto el horno para siempre',
          'Su ayudante se ha ido a Berlín y necesita a alguien que le ayude',
          'Va a cerrar su panadería',
          'No puede madrugar',
        ],
      },
      {
        q: '¿Qué le lleva Ernesto a Lucía al final?',
        o: ['Un cruasán', 'Una tarta', 'Una hogaza de pan de centeno hecha por él', 'Una tarjeta de visita'],
      },
    ],
  },
  {
    text: 'es-4-la-mente-del-pulpo',
    q: [
      {
        q: '¿Por qué el pulpo tiene la sangre azul?',
        o: [
          'Porque tiene tres corazones',
          'Porque usa una proteína con cobre, y no con hierro, para transportar el oxígeno',
          'Porque vive en aguas frías',
          'Por su tinta',
        ],
      },
      { q: '¿Dónde están la mayoría de las neuronas del pulpo?', o: ['En la cabeza', 'En los corazones', 'En los brazos', 'En la piel'] },
      {
        q: '¿Qué le permite al pulpo cambiar de color?',
        o: ['Su tinta', 'Unas células llamadas cromatóforos, pequeñas bolsas de pigmento', 'Su pico', 'Las algas que come'],
      },
      {
        q: '¿Cuál de estos comportamientos menciona el artículo?',
        o: [
          'Los pulpos se cantan unos a otros',
          'Algunos pulpos lanzan chorros de agua a los cuidadores que no les gustan',
          'Los pulpos construyen nidos de coral',
          'Los pulpos viven en grandes grupos',
        ],
      },
      {
        q: '¿Por qué la inteligencia del pulpo es un misterio para los biólogos?',
        o: [
          'Porque tienen el cerebro muy pequeño',
          'Porque viven solos y poco tiempo, así que no pueden transmitir lo que aprenden',
          'Porque nunca resuelven problemas en los experimentos',
          'Porque son parientes de los delfines',
        ],
      },
      {
        q: 'Según una hipótesis, ¿por qué se volvieron tan inteligentes los pulpos?',
        o: [
          'Para comunicarse con otros pulpos',
          'Para sobrevivir sin concha protectora en un mar lleno de depredadores',
          'Para cazar peces grandes',
          'Para cuidar de sus crías durante años',
        ],
      },
    ],
  },
  {
    text: 'es-5-libreria',
    q: [
      {
        q: '¿Qué anunciaba la carta del propietario?',
        o: [
          'Que iban a derribar el edificio',
          'Que el alquiler se duplicaría a partir de enero',
          'Que don Anselmo tenía que irse de inmediato',
          'Que habían vendido el local',
        ],
      },
      {
        q: '¿Cómo reaccionó don Anselmo al principio?',
        o: ['Llamó a un abogado', 'Se lo contó a todos sus clientes', 'La guardó y no le dijo nada a nadie', 'Decidió jubilarse enseguida'],
      },
      {
        q: '¿Qué hizo Lucía al enterarse de la noticia?',
        o: ['Le prestó dinero', 'Escribió un mensaje en el grupo del barrio', 'Fue sola a ver al propietario', 'Empezó a trabajar en la librería'],
      },
      {
        q: '¿Con qué condición mantuvo el propietario el mismo alquiler?',
        o: [
          'Que la librería se convirtiera en una cooperativa',
          'Que don Anselmo le vendiera algunos libros raros',
          'Que la librería abriera los domingos',
          'Que los vecinos pintaran la fachada',
        ],
      },
      {
        q: '¿Qué hizo que don Anselmo reconociera que la librería nunca había tenido tanta vida?',
        o: [
          'La gran donación',
          'Un artículo de periódico sobre la librería',
          'Ver a niños sentados en el suelo escuchando cuentos',
          'Vender más libros que nunca',
        ],
      },
    ],
  },
  {
    text: 'es-5-silbo',
    q: [
      {
        q: '¿Cómo reproduce el silbo el español hablado?',
        o: ['Con gestos de las manos', 'Con variaciones en el tono del silbido', 'Con golpes de tambor', 'Con un alfabeto escrito'],
      },
      {
        q: 'Según el artículo, ¿por qué ha sobrevivido el silbo tanto tiempo?',
        o: [
          'Porque en la isla no había escuelas',
          'Porque el terreno escarpado hace que los desplazamientos sean lentos',
          'Porque era una lengua secreta',
          'Porque se inventó hace poco',
        ],
      },
      {
        q: '¿Qué estuvo a punto de hacer desaparecer el silbo a mediados del siglo XX?',
        o: ['Una prohibición de las autoridades', 'Una erupción volcánica', 'La emigración, las nuevas carreteras y el teléfono', 'La llegada de los turistas'],
      },
      {
        q: '¿Qué ocurrió a finales de los años noventa?',
        o: [
          'El silbo pasó a ser una asignatura obligatoria en las escuelas',
          'La UNESCO reconoció el silbo',
          'Murió el último silbador experto',
          'El silbo se adaptó al español',
        ],
      },
      {
        q: '¿Qué han indicado algunos experimentos?',
        o: [
          'Que el silbo solo lo pueden aprender los niños',
          'Que los silbadores expertos procesan el silbo en las mismas zonas del cerebro que el habla',
          'Que el silbo es más antiguo que el español',
          'Que silbar daña el oído',
        ],
      },
    ],
  },
  {
    text: 'es-5-lighthouse',
    q: [
      { q: '¿Cuánto tiempo había trabajado Tomás en el faro?', o: ['Doce años', 'Treinta y dos años', 'Cuarenta años'] },
      {
        q: '¿Por qué subió Tomás al faro la última noche?',
        o: ['Tenía que revisar el nuevo sistema', 'Quería hacerlo, aunque ya no era su obligación', 'Se lo pidió el ingeniero'],
      },
      {
        q: '¿Qué vio Tomás durante la noche?',
        o: ['Un barco grande que pasaba sin problemas', 'Una pequeña barca de pesca en apuros cerca de las rocas', 'Un incendio en la costa'],
      },
      {
        q: '¿Qué certeza le dejó aquella noche?',
        o: [
          'Que el nuevo sistema no servía para nada',
          'Que las máquinas pueden mantener la luz encendida, pero no pueden vigilar',
          'Que no debía jubilarse',
        ],
      },
      {
        q: '¿Qué hacen después los dos hermanos?',
        o: ['Escriben al periódico', 'Le llevan un regalo y lo invitan a pescar con ellos', 'Le piden que trabaje en su barco a tiempo completo'],
      },
    ],
  },
  {
    text: 'es-5-olive-trees',
    q: [
      {
        q: '¿Por qué no se puede calcular la edad de un olivo contando sus anillos?',
        o: ['Los anillos son demasiado finos', 'El centro del tronco se pudre y desaparece', 'Está prohibido cortarlos'],
      },
      {
        q: '¿Qué ocurrió a finales del siglo XX?',
        o: ['Los árboles empezaron a dar más fruto', 'Se vendieron muchos olivos antiguos como elementos decorativos', 'Los agricultores plantaron nuevos olivares'],
      },
      {
        q: '¿Qué le puede pasar a un árbol que se trasplanta?',
        o: ['Crece más rápido', 'Puede morir en pocos meses', 'Da mejor aceite'],
      },
      {
        q: '¿Qué iniciativa NO menciona el artículo?',
        o: ['Aceite de árboles milenarios', 'Rutas turísticas', 'Venta de semillas en el extranjero', 'Programas de apadrinamiento'],
      },
      {
        q: 'Según los expertos, ¿qué hay que proteger?',
        o: ['Solo los árboles más espectaculares', 'Todo el paisaje y el saber de quienes lo trabajan', 'Solo los árboles de los parques públicos'],
      },
    ],
  },
  {
    text: 'es-5-la-nota-apagada',
    q: [
      {
        q: '¿Por qué llama doña Elena a Tomás al principio de la historia?',
        o: [
          'Para venderle su piano',
          'Para que le afine el piano antes de la fiesta de su 84 cumpleaños',
          'Para pedirle que toque en su fiesta',
          'Para que tase el manuscrito de su abuelo',
        ],
      },
      {
        q: '¿Qué es el «Vals del Puerto»?',
        o: [
          'Una pieza famosa y publicada que conocen todos los chilenos',
          'Un vals inédito que Federico, el abuelo de Elena, escribió en 1910 para su mujer',
          'Una canción que don Aurelio aprendió en el mar',
          'Una composición de la propia Camila',
        ],
      },
      {
        q: '¿Por qué se niega doña Elena a llamar a la policía?',
        o: [
          'Desconfía de la policía',
          'No quiere policías en su casa el día de su cumpleaños ni el nombre de su abuelo en los periódicos',
          'El teléfono no funciona por el apagón',
          'Tomás le pide que no lo haga',
        ],
      },
      {
        q: '¿Qué oyó Camila decir a Ignacio en la terraza?',
        o: [
          'Que el lunes se llevaría algo a Santiago para tasarlo y su tía no se daría cuenta',
          'Que quería comprar la casa',
          'Que Rosa era una ladrona',
          'Que el coleccionista había cancelado la venta',
        ],
      },
      {
        q: '¿Qué detalle del apagón le parece raro a don Aurelio?',
        o: [
          'Alguien abrió la puerta de la calle',
          'El gato desapareció durante una hora',
          'Rosa puso velas en los candelabros del piano, que siempre habían sido solo decorativos',
          'Camila tocaba el piano a oscuras',
        ],
      },
      {
        q: '¿Qué le hace sospechar a Tomás dónde está la partitura?',
        o: [
          'Encuentra un papel en el suelo',
          'El la bemol central del piano suena apagado',
          'El gato se sienta encima del piano',
          'Rosa se lo dice en la fiesta',
        ],
      },
      {
        q: '¿Por qué escondió Rosa la partitura en el piano?',
        o: [
          'Para venderla ella misma',
          'Porque Camila se lo pidió',
          'Para impedir que Ignacio se la llevara a Santiago, después de oírlo hablar por teléfono',
          'Porque quería estropear la fiesta',
        ],
      },
      {
        q: '¿Qué decide hacer doña Elena con el vals?',
        o: [
          'Vendérselo al coleccionista de Buenos Aires',
          'Dejar que Camila lo publique con su tesis y mandar una copia al conservatorio, guardando el original en un cajón',
          'Darle el original a Ignacio',
          'Volver a guardarlo en la vitrina',
        ],
      },
    ],
  },
  {
    text: 'es-5-un-idioma-muchas-voces',
    q: [
      { q: '¿Qué significa «guagua» en Chile?', o: ['Un autobús', 'Un bebé', 'Una fresa', 'Una piscina'] },
      { q: '¿Qué país tiene más hablantes de español?', o: ['España', 'Argentina', 'México', 'Estados Unidos'] },
      {
        q: '¿Qué es el seseo?',
        o: [
          'Pronunciar la s final de sílaba como una h',
          'Pronunciar la z y la c (ante e, i) como s, de modo que «casa» y «caza» suenan igual',
          'Usar «vos» en lugar de «tú»',
          'Distinguir «pollo» y «poyo»',
        ],
      },
      {
        q: 'Según el ensayo, ¿cómo distinguen el singular del plural los hablantes que debilitan la s final?',
        o: ['Usan más artículos', 'Abren la vocal anterior', 'Hablan más despacio', 'No los distinguen'],
      },
      { q: '¿De dónde vienen las palabras «tomate» y «chocolate»?', o: ['Del árabe', 'Del quechua', 'Del náhuatl', 'De las lenguas del Caribe'] },
      {
        q: '¿Qué consejo da el ensayo a quienes aprenden español?',
        o: [
          'Aprender solo el español de España',
          'Elegir una variedad como base y ser coherente, pero entrenar el oído con todas las demás',
          'Mezclar todas las variedades en cada frase',
          'Evitar las películas de otros países',
        ],
      },
    ],
  },
  {
    text: 'es-6-cartografo',
    q: [
      {
        q: '¿Por qué llamaban a Ernesto «el cartógrafo de nubes»?',
        o: [
          'Hacía mapas para compañías aéreas',
          'Pasaba horas cada mañana dibujando el cielo',
          'Daba el tiempo en la radio',
          'Había estudiado meteorología',
        ],
      },
      {
        q: '¿Cómo veía su costumbre la mayoría de los vecinos?',
        o: ['Como una obsesión peligrosa', 'Como un proyecto científico', 'Como una excentricidad inofensiva', 'Como una forma de ganar dinero'],
      },
      {
        q: '¿De qué avisó Ernesto al alcalde?',
        o: ['De una crecida del río', 'De una enorme tormenta la noche de las fiestas', 'De una sequía aquel verano', 'De un incendio en el cerro'],
      },
      {
        q: '¿Qué hizo finalmente el alcalde?',
        o: [
          'No hizo ningún caso del aviso',
          'Suspendió las fiestas definitivamente',
          'Trasladó las celebraciones al pabellón',
          'Subió al cerro a comprobarlo',
        ],
      },
      {
        q: '¿Dónde cree ahora el narrador que estaba el secreto de su tío?',
        o: ['En un lápiz especial', 'En un código escondido en los cuadernos', 'En su manera de mirar, no en los dibujos', 'En antiguos registros meteorológicos'],
      },
    ],
  },
  {
    text: 'es-6-aburrimiento',
    q: [
      {
        q: 'Según un número creciente de psicólogos, ¿qué señala el aburrimiento?',
        o: ['Que estamos enfermos', 'Que lo que hacemos ya no nos satisface', 'Que necesitamos dormir más', 'Que trabajamos demasiado'],
      },
      {
        q: '¿Qué tuvieron que hacer primero los voluntarios del experimento?',
        o: ['Ver una película larga', 'Copiar números de una guía telefónica', 'Sentarse en silencio con los ojos cerrados', 'Leer una novela'],
      },
      {
        q: '¿Cómo explican los resultados los investigadores?',
        o: [
          'El aburrimiento vuelve a la gente agresiva y competitiva',
          'Cuando no hay estímulos, la mente divaga y establece conexiones inesperadas',
          'Las tareas tediosas entrenan la memoria',
          'Los voluntarios ya eran muy creativos',
        ],
      },
      {
        q: 'Según los expertos, ¿cuál es el problema principal?',
        o: [
          'Nos aburrimos con demasiada frecuencia',
          'Rara vez nos permitimos momentos de vacío, porque enseguida recurrimos al móvil',
          'Las escuelas enseñan a los niños a aburrirse',
          'Los teléfonos inteligentes nos hacen más creativos',
        ],
      },
      {
        q: '¿Qué opina el autor del aburrimiento crónico?',
        o: [
          'Que conviene fomentarlo',
          'Que no hay que idealizarlo, porque puede estar ligado a la apatía o la depresión',
          'Que es el origen de todas las grandes obras',
          'Que solo afecta a los niños',
        ],
      },
    ],
  },
  {
    text: 'es-6-watchmaker',
    q: [
      {
        q: '¿Qué tenían de particular los relojes de las paredes del taller?',
        o: ['No tenían agujas', 'Nunca marcaban la misma hora', 'Estaban todos estropeados'],
      },
      {
        q: '¿Qué llevó la mujer al taller?',
        o: ['El reloj de pulsera de su madre', 'El reloj de bolsillo de plata de su padre', 'Un viejo reloj de péndulo'],
      },
      { q: '¿Qué había grabado en el interior de la tapa?', o: ['El nombre del padre', 'Una fecha y la hora: las cuatro y diez', 'El nombre del relojero'] },
      { q: '¿A qué se referían la fecha y la hora?', o: ['A la muerte del padre', 'Al nacimiento de la mujer', 'Al día en que se compró el reloj'] },
      { q: '¿Qué decidió la mujer al final?', o: ['Parar el reloj a las cuatro y diez', 'Dejar que el reloj siguiera andando', 'Vender el reloj'] },
    ],
  },
  {
    text: 'es-6-translation',
    q: [
      {
        q: '¿Qué dice el adagio italiano?',
        o: ['Que todo escritor es un traductor', 'Que todo traductor es un traidor', 'Que todo lector es un crítico'],
      },
      {
        q: '¿Por qué resulta irónico el propio adagio?',
        o: ['Lo escribió un traductor', 'Apenas sobrevive a su propia traducción', 'En realidad no es italiano'],
      },
      {
        q: '¿Qué busca una traducción que «domestica»?',
        o: ['Conservar la extrañeza del original', 'Que la obra parezca escrita en la lengua del lector', 'Traducir palabra por palabra'],
      },
      {
        q: '¿Cuál se describe como la paradoja más llamativa del oficio?',
        o: [
          'A los traductores se les paga demasiado',
          'Cuanto mejor es la traducción, menos se nota el trabajo del traductor',
          'La poesía es fácil de traducir',
        ],
      },
      {
        q: 'Según el autor, ¿dónde siguen haciendo falta los traductores humanos?',
        o: ['En los manuales técnicos', 'Donde el sentido depende del tono, de la ironía o de lo que no se dice', 'En los documentos administrativos'],
      },
    ],
  },
  {
    text: 'es-6-el-tesoro-bajo-tierra',
    q: [
      {
        q: 'Según el ensayo, ¿dónde y aproximadamente cuándo se domesticó la papa?',
        o: [
          'En México, hace unos dos mil años',
          'A orillas del lago Titicaca, entre los actuales Perú y Bolivia, hace unos ocho mil años',
          'En las islas Canarias, en el siglo XVI',
          'En el Caribe, a manos de los taínos',
        ],
      },
      {
        q: '¿Qué es el chuño?',
        o: [
          'Una especie de papa silvestre y tóxica',
          'Una palabra quechua para referirse a un almacén',
          'Papas conservadas mediante heladas, pisado y secado repetidos, que duran años',
          'Un guiso de papas típico de Lima',
        ],
      },
      {
        q: '¿De dónde viene la palabra «patata»?',
        o: [
          'Del latín',
          'De una mezcla de «papa», del quechua, y «batata», del taíno',
          'Del francés «pomme de terre»',
          'Del nombre de un botánico español',
        ],
      },
      {
        q: '¿Cuál de estas NO era una de las razones de la desconfianza europea hacia la papa?',
        o: [
          'No aparecía en los textos clásicos que consultaban los médicos',
          'Pertenecía a la misma familia que algunas plantas venenosas',
          'Crecía bajo tierra, en la oscuridad',
          'Su cultivo era demasiado caro',
        ],
      },
      {
        q: '¿Cómo llegó Parmentier a confiar en la papa?',
        o: [
          'La probó en un viaje a Perú',
          'Se alimentó de papas cuando fue prisionero de los prusianos durante la guerra de los Siete Años',
          'Federico II le regaló un campo',
          'Leyó crónicas incas',
        ],
      },
      {
        q: '¿Por qué la plaga de 1845 afectó tanto a Irlanda?',
        o: [
          'Porque los irlandeses cultivaban demasiadas variedades distintas',
          'Porque gran parte de la población rural dependía de una sola variedad, genéticamente uniforme',
          'Porque las papas acababan de llegar allí',
          'Porque el gobierno prohibió las papas',
        ],
      },
      {
        q: 'Según el ensayo, ¿por qué siguen siendo importantes hoy las papas silvestres y los campesinos andinos?',
        o: [
          'Producen la mayoría de las papas fritas de bolsa del mundo',
          'Conservan una diversidad genética y unas resistencias que las variedades comerciales han perdido',
          'Son una atracción turística',
          'Dan más alimento por hectárea que cualquier otro cultivo',
        ],
      },
    ],
  },
  {
    text: 'es-6-lo-que-se-queda',
    q: [
      {
        q: '¿Por qué va Irene a Fuentecilla al principio del verano?',
        o: [
          'Para pasar las vacaciones con su abuela',
          'Para vaciar la casa de su difunta abuela y poder venderla',
          'Para trabajar en la cosecha de la aceituna',
          'Para diseñar un hotel para una inmobiliaria',
        ],
      },
      {
        q: '¿Qué encuentra Irene bajo el doble fondo del cajón de los cubiertos?',
        o: [
          'Cartas de Alemania',
          'Una fotografía de su madre',
          'Un cuaderno donde se anotan las cosechas del olivar desde 1961',
          'La llave del desván',
        ],
      },
      {
        q: '¿Quién es Rafa?',
        o: [
          'El agente inmobiliario de Jaén',
          'Un hombre que lleva ocho años trabajando el olivar con Carmen y repartiendo con ella la cosecha',
          'El nieto de Encarna',
          'El representante de Olivares del Sur',
        ],
      },
      {
        q: '¿Qué le pide Joaquín a Carmen en la posdata de su última carta?',
        o: ['Que vaya a su boda', 'Que le venda la Hoya', 'Que no deje sola a su madre', 'Que queme sus cartas'],
      },
      {
        q: '¿Quién era «J.» en el cuaderno de Carmen y qué hacía Carmen por ella?',
        o: [
          'Joaquín, a quien mandaba dinero a Alemania',
          'Josefa, la madre de Joaquín, a quien daba dinero cada diciembre diciéndole que se lo enviaba su hijo',
          'Encarna, que ayudaba en la cosecha',
          'Una jornalera a la que pagaba cada diciembre',
        ],
      },
      {
        q: '¿Qué encuentra Pilar en la tapa trasera del cuaderno?',
        o: [
          'El testamento de Carmen',
          'Una carta que Carmen le escribió el día de su boda y nunca le envió',
          'El dinero de la cosecha',
          'Una foto de Joaquín',
        ],
      },
      {
        q: '¿Qué hacía Joaquín cada diciembre desde que recibió la última carta de Carmen?',
        o: [
          'Viajaba a Fuentecilla',
          'Mandaba dinero al pueblo',
          'Regalaba cajas de aceite de oliva de Jaén a sus vecinos y amigos',
          'Le escribía a Carmen',
        ],
      },
      {
        q: '¿Qué hace Irene al final de la historia?',
        o: ['Vende la casa', 'Se marcha a Madrid', 'Le da cuerda al reloj del salón, que vuelve a andar', 'Quema el cuaderno'],
      },
    ],
  },
];

export default data;
