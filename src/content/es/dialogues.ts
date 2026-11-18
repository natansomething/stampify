import type { Dialogue } from '../types';

const data: Dialogue[] = [
  {
    id: "es-d1-cafe", lv: 1, title: "En la cafetería", titleEn: "At the café",
    turns: [
      { a: { t: "Hola, buenos días. ¿Qué quiere tomar?", en: "Hello, good morning. What would you like?" }, c: 0, o: [
        { t: "Un café con leche, por favor.", en: "A white coffee, please." },
        { t: "Me llamo Carmen.", en: "My name is Carmen." },
        { t: "Vivo en un piso pequeño.", en: "I live in a small flat." },
      ] },
      { a: { t: "¿Grande o pequeño?", en: "Large or small?" }, c: 2, o: [
        { t: "Sí, soy de aquí.", en: "Yes, I'm from here." },
        { t: "Hoy es martes.", en: "Today is Tuesday." },
        { t: "Pequeño, gracias.", en: "Small, thanks." },
      ] },
      { a: { t: "¿Algo más? Tenemos tostadas y croissants.", en: "Anything else? We have toast and croissants." }, c: 1, o: [
        { t: "No, no tengo hermanos.", en: "No, I don't have any siblings." },
        { t: "Sí, un croissant, por favor.", en: "Yes, a croissant, please." },
        { t: "Mi casa está cerca.", en: "My house is nearby." },
      ] },
      { a: { t: "¿Para tomar aquí o para llevar?", en: "To have here or to take away?" }, c: 1, o: [
        { t: "A las ocho de la mañana.", en: "At eight in the morning." },
        { t: "Para tomar aquí.", en: "To have here." },
        { t: "Me gusta mucho el fútbol.", en: "I really like football." },
      ] },
      { a: { t: "Son cuatro euros con cincuenta.", en: "That's four euros fifty." }, c: 2, o: [
        { t: "Tengo veinte años.", en: "I'm twenty years old." },
        { t: "Es muy simpático.", en: "He's very nice." },
        { t: "Aquí tiene. ¿Puedo pagar con tarjeta?", en: "Here you are. Can I pay by card?" },
      ] },
    ],
  },
  {
    id: "es-d1-mercado", lv: 1, title: "En el mercado", titleEn: "At the market",
    turns: [
      { a: { t: "Buenos días, ¿qué le pongo?", en: "Good morning, what can I get you?" }, c: 1, o: [
        { t: "Estoy bien, gracias.", en: "I'm fine, thanks." },
        { t: "Un kilo de tomates, por favor.", en: "A kilo of tomatoes, please." },
        { t: "Mañana voy a la playa.", en: "Tomorrow I'm going to the beach." },
      ] },
      { a: { t: "Muy bien. ¿Algo más?", en: "Very good. Anything else?" }, c: 0, o: [
        { t: "Sí, también quiero unas naranjas.", en: "Yes, I'd also like some oranges." },
        { t: "No, el museo está cerrado.", en: "No, the museum is closed." },
        { t: "Mi hermana es profesora.", en: "My sister is a teacher." },
      ] },
      { a: { t: "¿Cuántas naranjas quiere?", en: "How many oranges would you like?" }, c: 2, o: [
        { t: "Son las tres.", en: "It's three o'clock." },
        { t: "Me duele la cabeza.", en: "I have a headache." },
        { t: "Seis, por favor.", en: "Six, please." },
      ] },
      { a: { t: "Aquí tiene. ¿Quiere una bolsa?", en: "Here you are. Would you like a bag?" }, c: 2, o: [
        { t: "Sí, hablo un poco de inglés.", en: "Yes, I speak a little English." },
        { t: "Es mi primer día aquí.", en: "It's my first day here." },
        { t: "No, gracias, tengo una.", en: "No thanks, I have one." },
      ] },
      { a: { t: "Pues son seis euros en total.", en: "So that's six euros in total." }, c: 0, o: [
        { t: "Aquí tiene. ¡Hasta luego!", en: "Here you are. See you!" },
        { t: "Vivo con mis padres.", en: "I live with my parents." },
        { t: "No me gusta el té.", en: "I don't like tea." },
      ] },
    ],
  },
  {
    id: "es-d2-hotel", lv: 2, title: "En la recepción del hotel", titleEn: "At the hotel reception",
    turns: [
      { a: { t: "Buenas tardes. ¿En qué puedo ayudarle?", en: "Good afternoon. How can I help you?" }, c: 2, o: [
        { t: "Ayer comí paella en la playa.", en: "Yesterday I ate paella on the beach." },
        { t: "Mi hermano es más alto que yo.", en: "My brother is taller than me." },
        { t: "Tengo una reserva a nombre de Luis Ortega.", en: "I have a booking under the name Luis Ortega." },
      ] },
      { a: { t: "Sí, aquí está. Una habitación doble para tres noches, ¿verdad?", en: "Yes, here it is. A double room for three nights, right?" }, c: 0, o: [
        { t: "Exacto. ¿El desayuno está incluido?", en: "Exactly. Is breakfast included?" },
        { t: "No, nunca he estado en Italia.", en: "No, I've never been to Italy." },
        { t: "Prefiero el autobús.", en: "I prefer the bus." },
      ] },
      { a: { t: "Sí, se sirve de siete a diez en el comedor.", en: "Yes, it's served from seven to ten in the dining room." }, c: 1, o: [
        { t: "Me levanto a las siete todos los días.", en: "I get up at seven every day." },
        { t: "Perfecto. ¿Y hay wifi en la habitación?", en: "Perfect. And is there wifi in the room?" },
        { t: "La película fue muy aburrida.", en: "The film was very boring." },
      ] },
      { a: { t: "Sí, la contraseña está en esta tarjeta. Su habitación es la 214.", en: "Yes, the password is on this card. Your room is 214." }, c: 0, o: [
        { t: "Muchas gracias. ¿Dónde está el ascensor?", en: "Thank you very much. Where is the lift?" },
        { t: "Cuando era niño, tenía un perro.", en: "When I was a child, I had a dog." },
        { t: "Voy a estudiar medicina.", en: "I'm going to study medicine." },
      ] },
      { a: { t: "Al fondo, a la derecha. ¡Que disfrute de su estancia!", en: "At the end, on the right. Enjoy your stay!" }, c: 1, o: [
        { t: "Hace dos años que vivo aquí.", en: "I've lived here for two years." },
        { t: "Gracias, muy amable.", en: "Thanks, that's very kind." },
        { t: "No, la tienda está cerrada.", en: "No, the shop is closed." },
      ] },
    ],
  },
  {
    id: "es-d2-ropa", lv: 2, title: "En una tienda de ropa", titleEn: "In a clothes shop",
    turns: [
      { a: { t: "Hola, ¿te puedo ayudar en algo?", en: "Hi, can I help you with anything?" }, c: 0, o: [
        { t: "Sí, estoy buscando una chaqueta para el invierno.", en: "Yes, I'm looking for a jacket for the winter." },
        { t: "No, ayer llovió mucho.", en: "No, it rained a lot yesterday." },
        { t: "Mi abuela cocina muy bien.", en: "My grandmother cooks very well." },
      ] },
      { a: { t: "¿Qué talla usas?", en: "What size are you?" }, c: 1, o: [
        { t: "Nunca he comido sushi.", en: "I've never had sushi." },
        { t: "Normalmente la M.", en: "Usually a medium." },
        { t: "El tren sale a las nueve.", en: "The train leaves at nine." },
      ] },
      { a: { t: "Tenemos esta en negro y en azul. ¿Cuál te gusta más?", en: "We have this one in black and blue. Which do you like better?" }, c: 2, o: [
        { t: "Fuimos al cine con unos amigos.", en: "We went to the cinema with some friends." },
        { t: "Mis vecinos son muy simpáticos.", en: "My neighbours are very nice." },
        { t: "La azul. ¿Me la puedo probar?", en: "The blue one. Can I try it on?" },
      ] },
      { a: { t: "Claro, los probadores están allí. ¿Qué tal te queda?", en: "Of course, the fitting rooms are over there. How does it fit?" }, c: 1, o: [
        { t: "Me gusta más el verano.", en: "I like summer better." },
        { t: "Me queda un poco grande. ¿Tienes una talla menos?", en: "It's a bit big. Do you have a size smaller?" },
        { t: "Hace sol todo el día.", en: "It's sunny all day." },
      ] },
      { a: { t: "Sí, aquí tienes la S. Está rebajada un veinte por ciento.", en: "Yes, here's the small. It's twenty percent off." }, c: 1, o: [
        { t: "Mi padre trabaja en un banco.", en: "My father works in a bank." },
        { t: "¡Qué bien! Me la llevo.", en: "Great! I'll take it." },
        { t: "Mañana voy a visitar a mis abuelos.", en: "Tomorrow I'm going to visit my grandparents." },
      ] },
    ],
  },
  {
    id: "es-d3-medico", lv: 3, title: "En la consulta del médico", titleEn: "At the doctor's",
    turns: [
      { a: { t: "Buenos días. Siéntese, por favor. ¿Qué le pasa?", en: "Good morning. Please sit down. What seems to be the problem?" }, c: 0, o: [
        { t: "Llevo tres días con fiebre y me duele mucho la garganta.", en: "I've had a fever for three days and my throat really hurts." },
        { t: "Espero que tenga un buen viaje.", en: "I hope you have a good trip." },
        { t: "El libro que me recomendó es muy bueno.", en: "The book you recommended me is very good." },
      ] },
      { a: { t: "¿Ha tomado algún medicamento?", en: "Have you taken any medicine?" }, c: 2, o: [
        { t: "Sí, el museo abre los lunes.", en: "Yes, the museum opens on Mondays." },
        { t: "No, prefiero ir en coche.", en: "No, I prefer to go by car." },
        { t: "Solo paracetamol, pero no me ha hecho mucho efecto.", en: "Only paracetamol, but it hasn't helped much." },
      ] },
      { a: { t: "Abra la boca, por favor... Tiene la garganta muy inflamada.", en: "Open your mouth, please... Your throat is very inflamed." }, c: 0, o: [
        { t: "¿Es algo grave?", en: "Is it anything serious?" },
        { t: "Ojalá haga buen tiempo mañana.", en: "I hope the weather is nice tomorrow." },
        { t: "Me encanta cocinar los domingos.", en: "I love cooking on Sundays." },
      ] },
      { a: { t: "No se preocupe, es una infección. Le voy a recetar un antibiótico.", en: "Don't worry, it's an infection. I'm going to prescribe you an antibiotic." }, c: 2, o: [
        { t: "Ayer perdí las llaves de casa.", en: "Yesterday I lost my house keys." },
        { t: "Mi jefa me pidió el informe.", en: "My boss asked me for the report." },
        { t: "¿Cuántas veces al día tengo que tomarlo?", en: "How many times a day do I have to take it?" },
      ] },
      { a: { t: "Tres veces al día durante una semana. Y beba mucha agua.", en: "Three times a day for a week. And drink lots of water." }, c: 0, o: [
        { t: "De acuerdo, muchas gracias, doctora.", en: "All right, thank you very much, doctor." },
        { t: "Si tuviera dinero, compraría una casa.", en: "If I had money, I would buy a house." },
        { t: "No creo que llueva esta tarde.", en: "I don't think it will rain this afternoon." },
      ] },
    ],
  },
  {
    id: "es-d3-alquiler", lv: 3, title: "Alquilar un piso", titleEn: "Renting a flat",
    turns: [
      { a: { t: "¿Diga?", en: "Hello?" }, c: 0, o: [
        { t: "Hola, llamo por el anuncio del piso en la calle Mayor. ¿Sigue disponible?", en: "Hi, I'm calling about the ad for the flat on Calle Mayor. Is it still available?" },
        { t: "Hola, hace mucho calor hoy, ¿verdad?", en: "Hi, it's very hot today, isn't it?" },
        { t: "Hola, ¿a qué hora sale el tren?", en: "Hi, what time does the train leave?" },
      ] },
      { a: { t: "Sí, todavía está libre. Tiene dos habitaciones y un balcón.", en: "Yes, it's still free. It has two bedrooms and a balcony." }, c: 1, o: [
        { t: "¡Qué bien! Me encanta la música clásica.", en: "Great! I love classical music." },
        { t: "¿Y cuánto es el alquiler al mes?", en: "And how much is the rent per month?" },
        { t: "¿Sabes si hay una farmacia por aquí?", en: "Do you know if there's a pharmacy around here?" },
      ] },
      { a: { t: "Son ochocientos euros, gastos de comunidad incluidos.", en: "It's eight hundred euros, building fees included." }, c: 2, o: [
        { t: "Mientras cocinaba, escuchaba la radio.", en: "While I was cooking, I was listening to the radio." },
        { t: "Gracias por ayudarme con la mudanza.", en: "Thanks for helping me with the move." },
        { t: "¿Hay que pagar fianza?", en: "Do I have to pay a deposit?" },
      ] },
      { a: { t: "Sí, dos meses de fianza. ¿Quiere venir a verlo?", en: "Yes, two months' deposit. Would you like to come and see it?" }, c: 0, o: [
        { t: "Me encantaría. ¿Le viene bien mañana por la tarde?", en: "I'd love to. Would tomorrow afternoon suit you?" },
        { t: "Llevo tres meses aprendiendo a nadar.", en: "I've been learning to swim for three months." },
        { t: "No, gracias, ya he comido.", en: "No thanks, I've already eaten." },
      ] },
      { a: { t: "Perfecto, a las seis. Cuando llegue, llame al timbre del primero.", en: "Perfect, at six. When you arrive, ring the bell for the first floor." }, c: 2, o: [
        { t: "Deberías ir al médico.", en: "You should go to the doctor." },
        { t: "Es importante que todos lleguen puntuales.", en: "It's important that everyone arrives on time." },
        { t: "Muy bien, allí estaré. Hasta mañana.", en: "Very good, I'll be there. See you tomorrow." },
      ] },
    ],
  },
  {
    id: "es-d4-entrevista", lv: 4, title: "Una entrevista de trabajo", titleEn: "A job interview",
    turns: [
      { a: { t: "Gracias por venir. Para empezar, háblenos un poco de su experiencia.", en: "Thanks for coming. To begin with, tell us a little about your experience." }, c: 1, o: [
        { t: "Si hubiera sabido que llovía, habría traído paraguas.", en: "If I'd known it was raining, I'd have brought an umbrella." },
        { t: "Llevo cinco años trabajando en marketing digital, los dos últimos como coordinadora de equipo.", en: "I've been working in digital marketing for five years, the last two as a team coordinator." },
        { t: "Me alegro de que hayas venido a la fiesta.", en: "I'm glad you came to the party." },
      ] },
      { a: { t: "¿Y por qué le interesa este puesto en concreto?", en: "And why are you interested in this particular position?" }, c: 0, o: [
        { t: "Porque busco un proyecto en el que pueda asumir más responsabilidades y seguir aprendiendo.", en: "Because I'm looking for a project where I can take on more responsibility and keep learning." },
        { t: "Porque el puente fue construido el siglo pasado.", en: "Because the bridge was built last century." },
        { t: "Porque no hay nadie que hable japonés.", en: "Because there's nobody who speaks Japanese." },
      ] },
      { a: { t: "¿Cuál diría que es su mayor punto débil?", en: "What would you say is your greatest weakness?" }, c: 2, o: [
        { t: "Ya habíamos cenado cuando llegaron.", en: "We had already had dinner when they arrived." },
        { t: "Dudo que queden entradas para esta noche.", en: "I doubt there are tickets left for tonight." },
        { t: "A veces me cuesta delegar, aunque he aprendido a confiar más en mi equipo.", en: "Sometimes I find it hard to delegate, although I've learned to trust my team more." },
      ] },
      { a: { t: "Entiendo. ¿Tiene alguna pregunta para nosotros?", en: "I see. Do you have any questions for us?" }, c: 1, o: [
        { t: "Sí, se me olvidó llamar al fontanero.", en: "Yes, I forgot to call the plumber." },
        { t: "Sí, me gustaría saber cómo está organizado el equipo y qué posibilidades de formación ofrecen.", en: "Yes, I'd like to know how the team is organised and what training opportunities you offer." },
        { t: "No, es que no me gusta el tráfico.", en: "No, it's just that I don't like traffic." },
      ] },
      { a: { t: "Muy bien. Le comunicaremos nuestra decisión antes del viernes.", en: "Very good. We'll let you know our decision before Friday." }, c: 1, o: [
        { t: "Tendrías que haberme avisado antes.", en: "You should have told me earlier." },
        { t: "Perfecto, quedo a la espera. Muchas gracias por su tiempo.", en: "Perfect, I look forward to hearing from you. Thank you very much for your time." },
        { t: "Cuanto más practico, mejor hablo.", en: "The more I practise, the better I speak." },
      ] },
    ],
  },
  {
    id: "es-d4-reclamacion", lv: 4, title: "Una reclamación", titleEn: "Making a complaint",
    turns: [
      { a: { t: "Atención al cliente, le atiende Marta. ¿En qué puedo ayudarle?", en: "Customer service, Marta speaking. How can I help you?" }, c: 2, o: [
        { t: "Me encanta que haga sol los fines de semana.", en: "I love it when it's sunny at the weekend." },
        { t: "Lo siento, me he equivocado de número. Quería pedir una pizza.", en: "Sorry, I've got the wrong number. I wanted to order a pizza." },
        { t: "Llamo porque la lavadora que compré hace dos semanas ha dejado de funcionar.", en: "I'm calling because the washing machine I bought two weeks ago has stopped working." },
      ] },
      { a: { t: "Vaya, lo siento. ¿Me podría dar el número de pedido?", en: "Oh, I'm sorry. Could you give me the order number?" }, c: 0, o: [
        { t: "Sí, es el 4587-B.", en: "Yes, it's 4587-B." },
        { t: "Sí, se venden pisos en esta zona.", en: "Yes, flats are for sale in this area." },
        { t: "No, nunca he viajado a Argentina.", en: "No, I've never travelled to Argentina." },
      ] },
      { a: { t: "Gracias. Como está en garantía, podemos enviarle un técnico o cambiarle el aparato.", en: "Thank you. As it's under warranty, we can send you a technician or replace the appliance." }, c: 1, o: [
        { t: "Habría preferido quedarme en casa.", en: "I would have preferred to stay at home." },
        { t: "Prefiero que me la cambien, porque ya ha fallado dos veces.", en: "I'd rather you replaced it, because it's already broken down twice." },
        { t: "Busco un piso que tenga balcón.", en: "I'm looking for a flat with a balcony." },
      ] },
      { a: { t: "De acuerdo. Un repartidor pasará a recoger la vieja y a llevarle una nueva.", en: "All right. A delivery driver will come to collect the old one and bring you a new one." }, c: 2, o: [
        { t: "¿Sabe si el vuelo sale con retraso?", en: "Do you know if the flight is delayed?" },
        { t: "No es que no quiera ayudarte.", en: "It's not that I don't want to help you." },
        { t: "¿Sabe más o menos cuándo vendrá? Es que trabajo por las mañanas.", en: "Do you know roughly when they'll come? I work in the mornings." },
      ] },
      { a: { t: "Podemos programarlo para el jueves por la tarde, entre las cuatro y las seis.", en: "We can schedule it for Thursday afternoon, between four and six." }, c: 1, o: [
        { t: "Los resultados se publicarán el mes que viene.", en: "The results will be published next month." },
        { t: "Me parece bien. Muchas gracias por su ayuda.", en: "That suits me. Thank you very much for your help." },
        { t: "Como no contestaba, fuimos a su casa.", en: "As he wasn't answering, we went to his house." },
      ] },
    ],
  },
  {
    id: "es-d5-plazos", lv: 5, title: "Negociar un plazo", titleEn: "Negotiating a deadline",
    turns: [
      { a: { t: "Necesitaríamos tener el informe terminado el lunes. ¿Lo ves factible?", en: "We'd need the report finished on Monday. Do you think that's feasible?" }, c: 0, o: [
        { t: "Siendo sincera, lo veo complicado; aún faltan los datos del departamento financiero.", en: "To be honest, I think it'll be difficult; we're still missing the figures from the finance department." },
        { t: "Por lo visto, mañana va a hacer un tiempo estupendo.", en: "Apparently the weather's going to be great tomorrow." },
        { t: "Me extraña que no haya llamado tu hermana.", en: "I'm surprised your sister hasn't called." },
      ] },
      { a: { t: "Ya, pero el cliente está presionando bastante. ¿Qué propones?", en: "I know, but the client is putting on quite a lot of pressure. What do you suggest?" }, c: 2, o: [
        { t: "Lejos de mejorar, el tráfico ha empeorado.", en: "Far from improving, the traffic has got worse." },
        { t: "Quienquiera que haya dejado la puerta abierta, que la cierre.", en: "Whoever left the door open should close it." },
        { t: "Podríamos entregar un avance el lunes y la versión definitiva el miércoles.", en: "We could hand in a preview on Monday and the final version on Wednesday." },
      ] },
      { a: { t: "No es mala idea, siempre y cuando el avance incluya las conclusiones principales.", en: "That's not a bad idea, as long as the preview includes the main conclusions." }, c: 1, o: [
        { t: "Sea como sea, el concierto empieza a las nueve.", en: "Be that as it may, the concert starts at nine." },
        { t: "Eso no es problema. Las conclusiones ya están redactadas.", en: "That's not a problem. The conclusions are already written." },
        { t: "De haberlo sabido, no habría comprado el billete.", en: "Had I known, I wouldn't have bought the ticket." },
      ] },
      { a: { t: "Perfecto. ¿Necesitas que hable yo con finanzas para agilizar las cosas?", en: "Perfect. Do you need me to talk to finance to speed things up?" }, c: 0, o: [
        { t: "Te lo agradecería, porque llevo días esperando su respuesta.", en: "I'd appreciate it, because I've been waiting for their reply for days." },
        { t: "Nada más terminar la película, nos fuimos a cenar.", en: "As soon as the film was over, we went for dinner." },
        { t: "No me cabe duda de que será una gran investigadora.", en: "I have no doubt she'll be a great researcher." },
      ] },
      { a: { t: "Hecho. Les escribo ahora mismo y te pongo en copia.", en: "Done. I'll write to them right now and copy you in." }, c: 2, o: [
        { t: "Mal que le pese, tendrá que reconocerlo.", en: "Whether he likes it or not, he'll have to admit it." },
        { t: "A medida que avanzaba la tarde, hacía más frío.", en: "As the afternoon went on, it got colder." },
        { t: "Genial. En cuanto me lleguen los datos, me pongo con ello.", en: "Great. As soon as I get the figures, I'll get on with it." },
      ] },
    ],
  },
  {
    id: "es-d5-vecinos", lv: 5, title: "La junta de vecinos", titleEn: "The residents' meeting",
    turns: [
      { a: { t: "Pasamos al siguiente punto: varios vecinos se han quejado del ruido de la terraza del bar.", en: "Let's move on to the next item: several residents have complained about the noise from the bar's terrace." }, c: 0, o: [
        { t: "Por lo visto, el bar abre ahora hasta las dos de la madrugada, y entre semana es insoportable.", en: "Apparently the bar now stays open until two in the morning, and on weekdays it's unbearable." },
        { t: "Conviene que consultes a un abogado antes de casarte.", en: "You should consult a lawyer before getting married." },
        { t: "La empresa se vio obligada a cerrar una fábrica.", en: "The company was forced to close a factory." },
      ] },
      { a: { t: "¿Alguien ha hablado ya con el dueño?", en: "Has anyone spoken to the owner yet?" }, c: 1, o: [
        { t: "Se trata de una novela de mucho éxito.", en: "It's a very successful novel." },
        { t: "Sí, yo hablé con él la semana pasada, pero me dijo que cumple con la normativa.", en: "Yes, I spoke to him last week, but he said he's complying with the regulations." },
        { t: "Cuanto antes empecemos el viaje, mejor.", en: "The sooner we start the trip, the better." },
      ] },
      { a: { t: "Pues habría que comprobarlo. ¿Proponen presentar una queja al ayuntamiento?", en: "Well, that should be checked. Do you propose filing a complaint with the council?" }, c: 2, o: [
        { t: "Por más que insistas, no pienso ir a la playa.", en: "However much you insist, I'm not going to the beach." },
        { t: "Nada más llegar, se fue a dormir.", en: "As soon as he arrived, he went to sleep." },
        { t: "Yo intentaría primero llegar a un acuerdo; un conflicto abierto no nos conviene a nadie.", en: "I'd try to reach an agreement first; an open conflict isn't in anyone's interest." },
      ] },
      { a: { t: "Estoy de acuerdo. Podríamos pedirle que cierre la terraza a medianoche entre semana.", en: "I agree. We could ask him to close the terrace at midnight on weekdays." }, c: 1, o: [
        { t: "El hecho de que no conteste no significa nada.", en: "The fact that he doesn't answer means nothing." },
        { t: "Me parece razonable, y si no acepta, siempre podemos recurrir al ayuntamiento.", en: "That seems reasonable, and if he doesn't agree we can always go to the council." },
        { t: "Lejos de mejorar, mi español ha empeorado.", en: "Far from improving, my Spanish has got worse." },
      ] },
      { a: { t: "Bien. ¿Quién se encarga de redactar la carta?", en: "Good. Who will take care of drafting the letter?" }, c: 1, o: [
        { t: "Me extraña que no haya llovido este mes.", en: "I'm surprised it hasn't rained this month." },
        { t: "Si les parece, la redacto yo y se la paso antes de enviarla.", en: "If you like, I'll draft it and send it to you before it goes out." },
        { t: "Siempre y cuando haga sol, iremos de excursión.", en: "As long as it's sunny, we'll go on a trip." },
      ] },
    ],
  },
  {
    id: "es-d6-debate", lv: 6, title: "Un debate sobre el turismo", titleEn: "A debate on tourism",
    turns: [
      { a: { t: "En su opinión, ¿el turismo masivo ha hecho más bien que mal a las ciudades?", en: "In your opinion, has mass tourism done cities more good than harm?" }, c: 0, o: [
        { t: "Sería simplista responder con un sí o un no: ha traído riqueza, pero a un coste social que no se puede pasar por alto.", en: "It would be simplistic to answer yes or no: it has brought wealth, but at a social cost that can't be overlooked." },
        { t: "Huelga decir que la película me encantó de principio a fin.", en: "Needless to say, I loved the film from start to finish." },
        { t: "A falta de pan, buenas son tortas.", en: "Beggars can't be choosers." },
      ] },
      { a: { t: "¿A qué coste se refiere exactamente?", en: "What cost are you referring to exactly?" }, c: 2, o: [
        { t: "Por si fuera poco, se me ha estropeado el coche.", en: "To top it all, my car has broken down." },
        { t: "Ni que decir tiene que la cena estaba exquisita.", en: "It goes without saying that dinner was exquisite." },
        { t: "Sobre todo a la subida de los alquileres, que ha expulsado a muchos vecinos de los barrios céntricos.", en: "Above all to rising rents, which have driven many residents out of central neighbourhoods." },
      ] },
      { a: { t: "Pero cabe argumentar que esos barrios estaban degradados y el turismo los ha revitalizado.", en: "But one could argue that those neighbourhoods were run-down and tourism has revitalised them." }, c: 2, o: [
        { t: "Se mire por donde se mire, el verano es la mejor estación.", en: "Whichever way you look at it, summer is the best season." },
        { t: "Dicho sea de paso, nunca he sabido cocinar.", en: "Incidentally, I've never known how to cook." },
        { t: "No lo niego, pero revitalizar un barrio no debería implicar vaciarlo de quienes lo habitan.", en: "I don't deny it, but revitalising a neighbourhood shouldn't mean emptying it of the people who live there." },
      ] },
      { a: { t: "Entonces, ¿qué medidas propondría usted?", en: "So what measures would you propose?" }, c: 2, o: [
        { t: "Más vale que te lo pienses dos veces antes de comprarlo.", en: "You'd better think twice before buying it." },
        { t: "Tan pronto como se marcharon los invitados, me acosté.", en: "As soon as the guests left, I went to bed." },
        { t: "Limitar las viviendas de uso turístico y destinar parte de la tasa turística a vivienda asequible.", en: "Limiting holiday rentals and putting part of the tourist tax towards affordable housing." },
      ] },
      { a: { t: "Hay quien diría que eso ahuyentaría la inversión.", en: "Some would say that would scare off investment." }, c: 1, o: [
        { t: "Fuera cual fuera el motivo, no vino a la boda.", en: "Whatever the reason, he didn't come to the wedding." },
        { t: "Es un riesgo, desde luego, pero una ciudad que deja de ser habitable acaba perdiendo también su atractivo turístico.", en: "It's a risk, certainly, but a city that stops being liveable ends up losing its appeal to tourists too." },
        { t: "Cualquiera diría que has vivido aquí toda la vida.", en: "Anyone would think you'd lived here all your life." },
      ] },
    ],
  },
  {
    id: "es-d6-tertulia", lv: 6, title: "Una tertulia literaria", titleEn: "A book club discussion",
    turns: [
      { a: { t: "¿Qué les ha parecido la novela? A mí, sinceramente, se me hizo cuesta arriba.", en: "What did you think of the novel? Honestly, I found it hard going." }, c: 1, o: [
        { t: "Por si fuera poco, el tren se averió a mitad de camino.", en: "To top it all, the train broke down halfway." },
        { t: "Te entiendo; el primer tercio es denso, pero a partir de ahí me atrapó por completo.", en: "I see what you mean; the first third is dense, but from then on it completely hooked me." },
        { t: "Hizo caso omiso de las advertencias del médico.", en: "He ignored the doctor's warnings." },
      ] },
      { a: { t: "A mí lo que me chirría es el narrador: peca de omnisciente y no deja nada a la imaginación.", en: "What grates on me is the narrator: he's too omniscient and leaves nothing to the imagination." }, c: 2, o: [
        { t: "Ni que decir tiene que mañana iremos a la playa.", en: "It goes without saying that we'll go to the beach tomorrow." },
        { t: "Por mucho que se empeñe, no aprobará el examen.", en: "However hard he tries, he won't pass the exam." },
        { t: "Puede ser, aunque yo lo interpreté como una ironía deliberada del autor sobre la novela decimonónica.", en: "Maybe, although I read it as the author's deliberate irony about the nineteenth-century novel." },
      ] },
      { a: { t: "Interesante lectura. ¿Y el final? Me dejó con un regusto agridulce.", en: "Interesting reading. And the ending? It left me with a bittersweet aftertaste." }, c: 1, o: [
        { t: "Huelga decir que el hotel estaba lleno.", en: "Needless to say, the hotel was full." },
        { t: "A mí también, pero creo que un desenlace cerrado habría traicionado el tono del libro.", en: "Me too, but I think a neat ending would have betrayed the tone of the book." },
        { t: "Más vale que lleves paraguas por si acaso.", en: "You'd better take an umbrella just in case." },
      ] },
      { a: { t: "Puede que tengas razón. ¿La recomendarían a alguien que no lea mucho?", en: "You may be right. Would you recommend it to someone who doesn't read much?" }, c: 0, o: [
        { t: "Yo no la pondría como primera lectura; requiere cierta paciencia que no todo el mundo tiene.", en: "I wouldn't give it as a first read; it requires a certain patience that not everyone has." },
        { t: "A juzgar por las nubes, va a llover esta tarde.", en: "Judging by the clouds, it's going to rain this afternoon." },
        { t: "Dicho sea de paso, el autobús llegó con retraso.", en: "Incidentally, the bus arrived late." },
      ] },
      { a: { t: "De acuerdo. ¿Qué les parece si para el mes que viene elegimos algo más ligero?", en: "All right. How about choosing something lighter for next month?" }, c: 2, o: [
        { t: "Lo que en un principio parecía fácil acabó siendo un lío.", en: "What seemed easy at first turned out to be a mess." },
        { t: "Si bien es cierto que ha crecido la economía, también lo ha hecho la desigualdad.", en: "While it's true that the economy has grown, so has inequality." },
        { t: "Me parece bien; podríamos alternar, un clásico exigente y luego algo más ameno.", en: "Sounds good; we could alternate, a demanding classic and then something more light-hearted." },
      ] },
    ],
  },
  {
    id: "es-d1-taxi", lv: 1, title: "En el taxi", titleEn: "In a taxi",
    turns: [
      { a: { t: "Buenas tardes. ¿Adónde vamos?", en: "Good afternoon. Where are we going?" }, c: 2, o: [
        { t: "Tengo dos hijos.", en: "I have two children." },
        { t: "Me gusta el verde.", en: "I like green." },
        { t: "Al hotel Sol, en la calle Mayor, por favor.", en: "To the Hotel Sol, on Calle Mayor, please." },
      ] },
      { a: { t: "Muy bien. ¿Es su primera vez en la ciudad?", en: "Very good. Is it your first time in the city?" }, c: 0, o: [
        { t: "Sí, llego hoy de Londres.", en: "Yes, I've arrived from London today." },
        { t: "No, no quiero agua.", en: "No, I don't want any water." },
        { t: "Son las cinco y media.", en: "It's half past five." },
      ] },
      { a: { t: "¿Le molesta la música?", en: "Does the music bother you?" }, c: 1, o: [
        { t: "Mi padre es médico.", en: "My father is a doctor." },
        { t: "No, no me molesta. Es bonita.", en: "No, it doesn't bother me. It's nice." },
        { t: "Quiero un kilo de patatas.", en: "I'd like a kilo of potatoes." },
      ] },
      { a: { t: "Ya estamos. Es aquí, a la derecha.", en: "Here we are. It's here, on the right." }, c: 2, o: [
        { t: "Mañana tengo clase de inglés.", en: "Tomorrow I have an English class." },
        { t: "No, mi casa es grande.", en: "No, my house is big." },
        { t: "Perfecto. ¿Cuánto es?", en: "Perfect. How much is it?" },
      ] },
      { a: { t: "Son doce euros.", en: "That's twelve euros." }, c: 0, o: [
        { t: "Aquí tiene quince. Quédese con el cambio.", en: "Here's fifteen. Keep the change." },
        { t: "Me llamo Pedro, ¿y usted?", en: "My name is Pedro, and you?" },
        { t: "Hace mucho frío en invierno.", en: "It's very cold in winter." },
      ] },
    ],
  },
  {
    id: "es-d1-fiesta", lv: 1, title: "En una fiesta", titleEn: "At a party",
    turns: [
      { a: { t: "¡Hola! Soy Marta, la hermana de Luis. ¿Y tú?", en: "Hi! I'm Marta, Luis's sister. And you?" }, c: 1, o: [
        { t: "Un café solo, por favor.", en: "An espresso, please." },
        { t: "Hola, Marta. Yo soy Tom, un compañero de trabajo de Luis.", en: "Hi, Marta. I'm Tom, a colleague of Luis's." },
        { t: "El baño está a la izquierda.", en: "The bathroom is on the left." },
      ] },
      { a: { t: "Encantada. ¿De dónde eres?", en: "Nice to meet you. Where are you from?" }, c: 2, o: [
        { t: "Tengo treinta años.", en: "I'm thirty." },
        { t: "Es a las nueve.", en: "It's at nine." },
        { t: "Soy de Irlanda, pero vivo aquí.", en: "I'm from Ireland, but I live here." },
      ] },
      { a: { t: "¡Hablas muy bien español!", en: "You speak Spanish very well!" }, c: 0, o: [
        { t: "Gracias, estudio español en una academia.", en: "Thanks, I study Spanish at a language school." },
        { t: "No, no tengo coche.", en: "No, I don't have a car." },
        { t: "Sí, el tren es rápido.", en: "Yes, the train is fast." },
      ] },
      { a: { t: "¿Quieres algo de beber?", en: "Would you like something to drink?" }, c: 1, o: [
        { t: "Vivo en el centro.", en: "I live in the centre." },
        { t: "Sí, un zumo de naranja, por favor.", en: "Yes, an orange juice, please." },
        { t: "Mi hermana es alta.", en: "My sister is tall." },
      ] },
      { a: { t: "Aquí tienes. Ven, te presento a mis amigos.", en: "Here you are. Come, I'll introduce you to my friends." }, c: 2, o: [
        { t: "No, hoy es domingo.", en: "No, today is Sunday." },
        { t: "Cuesta tres euros.", en: "It costs three euros." },
        { t: "¡Gracias! Vamos.", en: "Thanks! Let's go." },
      ] },
    ],
  },
  {
    id: "es-d2-farmacia", lv: 2, title: "En la farmacia", titleEn: "At the chemist's",
    turns: [
      { a: { t: "Buenos días, ¿en qué puedo ayudarle?", en: "Good morning, how can I help you?" }, c: 0, o: [
        { t: "Buenos días. Tengo dolor de garganta desde ayer.", en: "Good morning. I've had a sore throat since yesterday." },
        { t: "Quiero una habitación doble.", en: "I'd like a double room." },
        { t: "Fui a la playa con mis primos.", en: "I went to the beach with my cousins." },
      ] },
      { a: { t: "¿Tiene fiebre también?", en: "Do you have a temperature as well?" }, c: 2, o: [
        { t: "Sí, me gustan mucho los perros.", en: "Yes, I really like dogs." },
        { t: "No, el autobús no para aquí.", en: "No, the bus doesn't stop here." },
        { t: "Un poco. Anoche tenía treinta y ocho.", en: "A little. Last night I had thirty-eight." },
      ] },
      { a: { t: "¿Es alérgico a algún medicamento?", en: "Are you allergic to any medicine?" }, c: 1, o: [
        { t: "Sí, la talla mediana, por favor.", en: "Yes, the medium size, please." },
        { t: "No, que yo sepa, no.", en: "No, not as far as I know." },
        { t: "Prefiero el pescado a la carne.", en: "I prefer fish to meat." },
      ] },
      { a: { t: "Entonces le recomiendo estas pastillas. Una cada ocho horas, después de comer.", en: "Then I recommend these tablets. One every eight hours, after eating." }, c: 0, o: [
        { t: "De acuerdo. ¿Y si mañana no estoy mejor?", en: "All right. And if I'm not better tomorrow?" },
        { t: "El museo cierra los lunes.", en: "The museum closes on Mondays." },
        { t: "Ayer comí paella con mis amigos.", en: "Yesterday I had paella with my friends." },
      ] },
      { a: { t: "Si en tres días sigue igual, vaya al médico.", en: "If you're still the same in three days, go to the doctor." }, c: 2, o: [
        { t: "Es la primera vez que visito Madrid.", en: "It's the first time I've visited Madrid." },
        { t: "Mi hermano trabaja en un banco.", en: "My brother works in a bank." },
        { t: "Muy bien, muchas gracias. ¿Cuánto le debo?", en: "Very good, thank you very much. How much do I owe you?" },
      ] },
    ],
  },
  {
    id: "es-d2-estacion", lv: 2, title: "En la estación de tren", titleEn: "At the train station",
    turns: [
      { a: { t: "Hola, ¿qué desea?", en: "Hello, what would you like?" }, c: 1, o: [
        { t: "Estuve allí el verano pasado.", en: "I was there last summer." },
        { t: "Un billete para Toledo para mañana por la mañana, por favor.", en: "A ticket to Toledo for tomorrow morning, please." },
        { t: "No me gusta nada el frío.", en: "I don't like the cold at all." },
      ] },
      { a: { t: "¿Solo de ida o de ida y vuelta?", en: "One way or return?" }, c: 2, o: [
        { t: "Con leche y sin azúcar.", en: "With milk and no sugar." },
        { t: "Llegué ayer por la noche.", en: "I arrived last night." },
        { t: "De ida y vuelta. Vuelvo el domingo por la tarde.", en: "Return. I'm coming back on Sunday afternoon." },
      ] },
      { a: { t: "Hay un tren a las ocho y diez y otro a las nueve y media.", en: "There's a train at ten past eight and another at half past nine." }, c: 0, o: [
        { t: "El de las nueve y media, por favor. No quiero madrugar mucho.", en: "The half past nine one, please. I don't want to get up too early." },
        { t: "Mi madre cocina muy bien.", en: "My mother is a very good cook." },
        { t: "Sí, hay un supermercado cerca.", en: "Yes, there's a supermarket nearby." },
      ] },
      { a: { t: "¿Prefiere ventanilla o pasillo?", en: "Would you prefer a window or aisle seat?" }, c: 1, o: [
        { t: "Prefiero la camisa azul.", en: "I prefer the blue shirt." },
        { t: "Ventanilla, si es posible.", en: "Window, if possible." },
        { t: "Fuimos al cine el sábado.", en: "We went to the cinema on Saturday." },
      ] },
      { a: { t: "Son treinta y dos euros. El tren sale del andén cuatro.", en: "That's thirty-two euros. The train leaves from platform four." }, c: 2, o: [
        { t: "No, no tengo hambre.", en: "No, I'm not hungry." },
        { t: "Mi piso tiene dos habitaciones.", en: "My flat has two bedrooms." },
        { t: "Perfecto. ¿Puedo pagar con tarjeta?", en: "Perfect. Can I pay by card?" },
      ] },
    ],
  },
  {
    id: "es-d3-reserva", lv: 3, title: "Reservar mesa por teléfono", titleEn: "Booking a table by phone",
    turns: [
      { a: { t: "Restaurante La Higuera, dígame.", en: "La Higuera restaurant, how can I help?" }, c: 2, o: [
        { t: "Me encanta viajar en tren.", en: "I love travelling by train." },
        { t: "Lo siento, no tengo cambio.", en: "Sorry, I don't have any change." },
        { t: "Hola, quería reservar una mesa para el sábado por la noche.", en: "Hello, I'd like to book a table for Saturday night." },
      ] },
      { a: { t: "¿Para cuántas personas y a qué hora?", en: "For how many people and at what time?" }, c: 0, o: [
        { t: "Para seis personas, a las nueve y media, si puede ser.", en: "For six people, at half past nine, if possible." },
        { t: "Lo compré en las rebajas.", en: "I bought it in the sales." },
        { t: "Llevo tres años estudiando español.", en: "I've been studying Spanish for three years." },
      ] },
      { a: { t: "A las nueve y media lo tenemos todo completo. Les puedo dar mesa a las diez.", en: "We're fully booked at half past nine. I can give you a table at ten." }, c: 1, o: [
        { t: "Ya he estado en ese museo.", en: "I've already been to that museum." },
        { t: "Vale, a las diez nos viene bien.", en: "OK, ten suits us fine." },
        { t: "No me queda bien la chaqueta.", en: "The jacket doesn't fit me well." },
      ] },
      { a: { t: "¿Alguno de ustedes tiene alguna alergia o intolerancia?", en: "Do any of you have an allergy or intolerance?" }, c: 2, o: [
        { t: "Sí, hemos alquilado un piso en la playa.", en: "Yes, we've rented a flat at the beach." },
        { t: "No, el vuelo salió puntual.", en: "No, the flight left on time." },
        { t: "Sí, una amiga es celíaca. ¿Tienen platos sin gluten?", en: "Yes, a friend of mine is coeliac. Do you have gluten-free dishes?" },
      ] },
      { a: { t: "Sí, varios. ¿A nombre de quién hago la reserva?", en: "Yes, several. Whose name shall I put the booking under?" }, c: 0, o: [
        { t: "A nombre de Clara Ortiz. Muchas gracias.", en: "Under the name Clara Ortiz. Thank you very much." },
        { t: "Me duelen mucho los pies.", en: "My feet really hurt." },
        { t: "Prefiero quedarme en casa.", en: "I'd rather stay at home." },
      ] },
    ],
  },
  {
    id: "es-d3-maleta", lv: 3, title: "La maleta perdida", titleEn: "The lost suitcase",
    turns: [
      { a: { t: "Buenas tardes. ¿Qué le ha pasado?", en: "Good afternoon. What's happened?" }, c: 1, o: [
        { t: "Quería dos entradas para la sesión de las ocho.", en: "I'd like two tickets for the eight o'clock showing." },
        { t: "Acabo de llegar de Lisboa y mi maleta no ha salido.", en: "I've just arrived from Lisbon and my suitcase hasn't come out." },
        { t: "Me gustaría cambiar de peinado.", en: "I'd like to change my hairstyle." },
      ] },
      { a: { t: "¿Me enseña la tarjeta de embarque y la etiqueta de la maleta?", en: "Could you show me your boarding pass and the luggage tag?" }, c: 0, o: [
        { t: "Sí, aquí las tiene.", en: "Yes, here they are." },
        { t: "No, nunca he estado en Lisboa.", en: "No, I've never been to Lisbon." },
        { t: "Prefiero el asiento de la ventanilla.", en: "I'd prefer the window seat." },
      ] },
      { a: { t: "¿Cómo es la maleta?", en: "What does the suitcase look like?" }, c: 2, o: [
        { t: "La compré hace dos años, pero ya no funciona.", en: "I bought it two years ago, but it doesn't work any more." },
        { t: "Es bastante cara, la verdad.", en: "It's quite expensive, to be honest." },
        { t: "Es grande, de color rojo, y tiene una cinta amarilla en el asa.", en: "It's big, red, and it has a yellow ribbon on the handle." },
      ] },
      { a: { t: "Según el sistema, se quedó en Lisboa. Llegará en el próximo vuelo, mañana por la mañana.", en: "According to the system, it stayed in Lisbon. It will arrive on the next flight, tomorrow morning." }, c: 1, o: [
        { t: "¡Qué bien! Me encanta la comida portuguesa.", en: "Great! I love Portuguese food." },
        { t: "¿Me la pueden enviar al hotel? No tengo coche.", en: "Can you send it to my hotel? I don't have a car." },
        { t: "Mañana voy a cortarme el pelo.", en: "Tomorrow I'm going to get my hair cut." },
      ] },
      { a: { t: "Por supuesto. Rellene este formulario con la dirección del hotel y un teléfono de contacto.", en: "Of course. Fill in this form with the hotel's address and a contact number." }, c: 0, o: [
        { t: "De acuerdo. ¿Y puedo comprar lo que necesite esta noche y luego reclamar el dinero?", en: "All right. And can I buy what I need tonight and claim the money back later?" },
        { t: "No, gracias, ya he comido.", en: "No thanks, I've already eaten." },
        { t: "Es que no me gusta el color.", en: "It's just that I don't like the colour." },
      ] },
    ],
  },
  {
    id: "es-d4-banco", lv: 4, title: "Abrir una cuenta en el banco", titleEn: "Opening a bank account",
    turns: [
      { a: { t: "Buenos días. ¿En qué le puedo ayudar?", en: "Good morning. How can I help you?" }, c: 2, o: [
        { t: "Ojalá haga buen tiempo este fin de semana.", en: "I hope the weather is good this weekend." },
        { t: "Si hubiera sabido que llovía, me habría quedado en casa.", en: "If I'd known it was raining, I'd have stayed at home." },
        { t: "Me acabo de mudar aquí por trabajo y necesito abrir una cuenta para cobrar la nómina.", en: "I've just moved here for work and I need to open an account to receive my salary." },
      ] },
      { a: { t: "Muy bien. ¿Tiene ya el NIE o algún documento de identidad?", en: "Very good. Do you already have your foreigner ID number or some identity document?" }, c: 1, o: [
        { t: "No creo que el partido termine tan pronto.", en: "I don't think the match will finish so early." },
        { t: "Tengo el pasaporte y el NIE; me lo dieron la semana pasada.", en: "I have my passport and my NIE, which they gave me last week." },
        { t: "Me lo recomendó una amiga que es cocinera.", en: "A friend of mine who is a cook recommended it." },
      ] },
      { a: { t: "Perfecto. Tenemos una cuenta sin comisiones, siempre que domicilie la nómina.", en: "Perfect. We have an account with no fees, as long as you have your salary paid into it." }, c: 0, o: [
        { t: "Me parece bien. ¿Y la tarjeta de débito también es gratuita?", en: "Sounds good. And is the debit card free as well?" },
        { t: "Es que se me ha olvidado el paraguas en el tren.", en: "It's just that I left my umbrella on the train." },
        { t: "Antes jugaba al tenis, pero lo dejé.", en: "I used to play tennis, but I gave it up." },
      ] },
      { a: { t: "Sí, el primer año no paga nada. Después, depende de cuánto la use.", en: "Yes, the first year you pay nothing. After that, it depends on how much you use it." }, c: 2, o: [
        { t: "Cuando era pequeño, vivía en el campo.", en: "When I was little, I lived in the countryside." },
        { t: "En cuanto llegue a casa, me ducho.", en: "As soon as I get home, I'll have a shower." },
        { t: "Entendido. ¿Podría darme las condiciones por escrito para leerlas con calma?", en: "Understood. Could you give me the terms in writing so I can read them carefully?" },
      ] },
      { a: { t: "Claro, aquí las tiene. Si está de acuerdo, firmamos y en unos días le llega la tarjeta a casa.", en: "Of course, here they are. If you agree, we'll sign and the card will reach your home in a few days." }, c: 1, o: [
        { t: "Me habría encantado ir, pero tenía mucho trabajo.", en: "I'd have loved to go, but I had a lot of work." },
        { t: "Las leo esta noche y vuelvo mañana a firmar, si no le importa.", en: "I'll read them tonight and come back tomorrow to sign, if you don't mind." },
        { t: "Dudo que el restaurante siga abierto.", en: "I doubt the restaurant is still open." },
      ] },
    ],
  },
  {
    id: "es-d4-taller", lv: 4, title: "En el taller mecánico", titleEn: "At the car repair shop",
    turns: [
      { a: { t: "Buenas. ¿Qué le pasa al coche?", en: "Hello. What's wrong with the car?" }, c: 0, o: [
        { t: "Desde hace unos días hace un ruido raro cuando freno.", en: "For a few days now it's been making a strange noise when I brake." },
        { t: "Me pondré el vestido azul para la boda.", en: "I'll wear the blue dress to the wedding." },
        { t: "Le aconsejo que pruebe la tarta de queso.", en: "I'd advise you to try the cheesecake." },
      ] },
      { a: { t: "Puede que sean las pastillas de freno. ¿Cuándo las cambió por última vez?", en: "It might be the brake pads. When did you last change them?" }, c: 2, o: [
        { t: "Si tuviera más tiempo, aprendería a tocar la guitarra.", en: "If I had more time, I'd learn to play the guitar." },
        { t: "Lo leí en un artículo de una revista.", en: "I read it in a magazine article." },
        { t: "Pues no lo sé. Compré el coche de segunda mano hace un año y nunca las he revisado.", en: "Well, I don't know. I bought the car second-hand a year ago and I've never had them checked." },
      ] },
      { a: { t: "Tendríamos que echarle un vistazo. ¿Puede dejárnoslo hasta mañana?", en: "We'd need to take a look. Can you leave it with us until tomorrow?" }, c: 1, o: [
        { t: "Ya me he acostumbrado a madrugar.", en: "I've already got used to getting up early." },
        { t: "Sí, pero lo necesito para el viernes sin falta, que me voy de viaje.", en: "Yes, but I absolutely need it by Friday, because I'm going away." },
        { t: "Me sorprende que no hayas oído hablar de él.", en: "I'm surprised you haven't heard of him." },
      ] },
      { a: { t: "No hay problema. Antes de hacer nada, le llamo y le doy un presupuesto.", en: "No problem. Before doing anything, I'll call you and give you an estimate." }, c: 2, o: [
        { t: "Siempre he querido visitar Japón.", en: "I've always wanted to visit Japan." },
        { t: "No me extraña que esté cansada.", en: "No wonder she's tired." },
        { t: "Se lo agradezco. Y si encuentra algo más, prefiero que me lo consulte primero.", en: "I appreciate it. And if you find anything else, I'd rather you checked with me first." },
      ] },
      { a: { t: "Por supuesto. Déjeme las llaves y un número de teléfono.", en: "Of course. Leave me the keys and a phone number." }, c: 0, o: [
        { t: "Aquí tiene. Mi número es el que aparece en esta tarjeta.", en: "Here you are. My number is the one on this card." },
        { t: "Habría preferido un hotel más céntrico.", en: "I'd have preferred a more central hotel." },
        { t: "Nos conocimos en la universidad.", en: "We met at university." },
      ] },
    ],
  },
  {
    id: "es-d5-informe", lv: 5, title: "Comentarios sobre un informe", titleEn: "Feedback on a report",
    turns: [
      { a: { t: "¿Tienes un momento? Quería saber qué te ha parecido el borrador del informe que te mandé.", en: "Have you got a moment? I wanted to know what you thought of the draft report I sent you." }, c: 1, o: [
        { t: "De haberlo sabido, habría reservado mesa con antelación.", en: "Had I known, I'd have booked a table in advance." },
        { t: "Claro. En general está muy bien, aunque tengo un par de sugerencias, si te parece.", en: "Sure. On the whole it's very good, although I have a couple of suggestions, if that's OK." },
        { t: "Por más que lo intento, no consigo que me crezcan los tomates.", en: "However hard I try, I can't get my tomatoes to grow." },
      ] },
      { a: { t: "Adelante, para eso te lo pasé. Dime con toda franqueza.", en: "Go ahead, that's why I sent it to you. Be completely frank." }, c: 0, o: [
        { t: "Pues lo primero es que la introducción se alarga demasiado; tardas tres páginas en ir al grano.", en: "Well, the first thing is that the introduction drags on too long; it takes you three pages to get to the point." },
        { t: "A no ser que llueva, saldremos a navegar el domingo.", en: "Unless it rains, we'll go sailing on Sunday." },
        { t: "Me consta que el museo abre los festivos.", en: "I know for a fact the museum opens on public holidays." },
      ] },
      { a: { t: "Ya me lo temía. Quería contextualizar bien, pero igual me he pasado.", en: "I was afraid of that. I wanted to give proper context, but maybe I overdid it." }, c: 2, o: [
        { t: "Con lo tarde que es, dudo que quede pan en la panadería.", en: "Given how late it is, I doubt there's any bread left at the bakery." },
        { t: "No es que no me guste el cine, es que prefiero el teatro.", en: "It's not that I don't like cinema, it's that I prefer theatre." },
        { t: "El contexto es necesario, pero podrías resumirlo en un párrafo y llevar el resto a un anexo.", en: "The context is necessary, but you could summarise it in a paragraph and move the rest to an appendix." },
      ] },
      { a: { t: "Buena idea. ¿Y los datos? ¿Se entienden bien las tablas?", en: "Good idea. And the data? Are the tables clear?" }, c: 1, o: [
        { t: "Ni se me había pasado por la cabeza mudarme al extranjero.", en: "Moving abroad hadn't even crossed my mind." },
        { t: "Sí, aunque yo convertiría alguna en gráfico; a la dirección le cuesta leer tantas cifras seguidas.", en: "Yes, although I'd turn some into charts; management struggles to read so many figures in a row." },
        { t: "Siempre que viajo en avión me mareo un poco.", en: "Whenever I fly I get a bit queasy." },
      ] },
      { a: { t: "Tienes razón. Te agradezco mucho que te hayas tomado la molestia de leerlo con tanto detalle.", en: "You're right. I really appreciate you taking the trouble to read it so carefully." }, c: 0, o: [
        { t: "No hay de qué. Cuando tengas la versión definitiva, si quieres, le echo otro vistazo.", en: "Not at all. When you have the final version, I'll take another look if you like." },
        { t: "Por lo visto, van a cerrar la carretera durante las obras.", en: "Apparently, they're going to close the road during the works." },
        { t: "Más vale tarde que nunca, como decía mi abuelo.", en: "Better late than never, as my grandfather used to say." },
      ] },
    ],
  },
  {
    id: "es-d5-cancelar", lv: 5, title: "Cancelar un plan", titleEn: "Calling off a plan",
    turns: [
      { a: { t: "¡Hola! ¿Todo listo para el concierto de esta noche? Ya tengo las entradas en el teléfono.", en: "Hi! All set for tonight's concert? I've already got the tickets on my phone." }, c: 2, o: [
        { t: "Por mucho que insistas, no pienso cortarme el pelo.", en: "However much you insist, I'm not going to cut my hair." },
        { t: "Siempre y cuando haya plazas, nos apuntaremos al curso.", en: "As long as there are places, we'll sign up for the course." },
        { t: "Precisamente te llamaba por eso. Lo siento muchísimo, pero no voy a poder ir.", en: "That's exactly why I was calling. I feel awful, but I won't be able to make it." },
      ] },
      { a: { t: "¿En serio? ¿Ha pasado algo?", en: "Seriously? Has something happened?" }, c: 0, o: [
        { t: "A mi madre la operan mañana temprano y prefiero quedarme con ella esta noche.", en: "My mother is having an operation early tomorrow and I'd rather stay with her tonight." },
        { t: "Lo que más me gusta del verano son las noches largas.", en: "What I like most about summer is the long evenings." },
        { t: "Como no estudies, vas a suspender.", en: "If you don't study, you're going to fail." },
      ] },
      { a: { t: "Vaya, lo siento. No te preocupes, eso es lo primero. ¿Es algo grave?", en: "Oh, I'm sorry. Don't worry, that comes first. Is it something serious?" }, c: 1, o: [
        { t: "Me temo que el vestido no me queda tan bien como pensaba.", en: "I'm afraid the dress doesn't suit me as well as I thought." },
        { t: "No, es una operación sencilla, pero está nerviosa y no quiero que pase la noche sola.", en: "No, it's a simple operation, but she's nervous and I don't want her to spend the night alone." },
        { t: "Dicen que el nuevo director es bastante exigente.", en: "They say the new manager is quite demanding." },
      ] },
      { a: { t: "Lo entiendo perfectamente. ¿Y qué hago con tu entrada?", en: "I completely understand. And what shall I do with your ticket?" }, c: 2, o: [
        { t: "Si llego a saber que hacía tanto calor, no vengo.", en: "If I'd known it was so hot, I wouldn't have come." },
        { t: "Lleva lloviendo toda la semana sin parar.", en: "It's been raining non-stop all week." },
        { t: "Ofrécesela a Nuria, que se quedó sin ella. Y, por supuesto, te la pago.", en: "Offer it to Nuria, she didn't manage to get one. And of course, I'll pay you for it." },
      ] },
      { a: { t: "¡Ni hablar! Ya me invitarás tú la próxima vez. Dale un abrazo a tu madre.", en: "No way! You can treat me next time. Give your mother a hug from me." }, c: 0, o: [
        { t: "Te lo prometo. Y luego me cuentas qué tal ha estado el concierto.", en: "I promise. And then you'll tell me how the concert went." },
        { t: "Es probable que suban los precios de la gasolina.", en: "Petrol prices will probably go up." },
        { t: "Dudo mucho que el tren llegue a su hora.", en: "I very much doubt the train will arrive on time." },
      ] },
    ],
  },
  {
    id: "es-d6-conferencia", lv: 6, title: "Turno de preguntas", titleEn: "Question time after a lecture",
    turns: [
      { a: { t: "Con esto concluyo. Si alguien desea plantear alguna pregunta, estaré encantada de responderla.", en: "With that I conclude. If anyone wishes to ask a question, I'll be delighted to answer it." }, c: 1, o: [
        { t: "Erre que erre, se empeñó en pintar la cocina de morado.", en: "Stubborn as a mule, he insisted on painting the kitchen purple." },
        { t: "Gracias por la exposición. Ha mencionado que las ciudades compactas son más sostenibles; ¿no corren el riesgo de encarecer aún más la vivienda?", en: "Thank you for the talk. You mentioned that compact cities are more sustainable; don't they run the risk of making housing even more expensive?" },
        { t: "A buenas horas mangas verdes: el autobús ya se había ido.", en: "Too little, too late: the bus had already left." },
      ] },
      { a: { t: "Es una objeción pertinente. La densidad, por sí sola, no garantiza nada si no va acompañada de políticas de vivienda asequible.", en: "That's a pertinent objection. Density alone guarantees nothing unless it goes hand in hand with affordable housing policies." }, c: 0, o: [
        { t: "Entonces, ¿diría que el problema no reside en el modelo urbano en sí, sino en cómo se regula el mercado?", en: "So would you say the problem lies not in the urban model itself, but in how the market is regulated?" },
        { t: "Más vale pájaro en mano que ciento volando, dijo mi tío al rechazar la oferta.", en: "A bird in the hand is worth two in the bush, said my uncle as he turned down the offer." },
        { t: "Por si las moscas, me llevaré un jersey a la excursión.", en: "Just in case, I'll take a jumper on the trip." },
      ] },
      { a: { t: "En buena medida, sí. Aunque tampoco conviene subestimar la inercia de las infraestructuras: lo que se construye hoy condiciona décadas.", en: "To a large extent, yes. Although one shouldn't underestimate the inertia of infrastructure either: what is built today shapes decades." }, c: 2, o: [
        { t: "No hay mal que por bien no venga, y el retraso nos permitió ver el atardecer.", en: "Every cloud has a silver lining, and the delay let us see the sunset." },
        { t: "Se le subieron los humos en cuanto lo ascendieron.", en: "It went to his head as soon as he was promoted." },
        { t: "Precisamente por eso me pregunto si no deberíamos priorizar la rehabilitación frente a la obra nueva.", en: "That's exactly why I wonder whether we shouldn't prioritise refurbishment over new construction." },
      ] },
      { a: { t: "Coincido plenamente. De hecho, rehabilitar suele generar menos emisiones que demoler y volver a construir.", en: "I fully agree. In fact, refurbishing usually generates fewer emissions than demolishing and rebuilding." }, c: 1, o: [
        { t: "Le tomaron el pelo con aquel coche de segunda mano.", en: "They ripped him off with that second-hand car." },
        { t: "¿Y cuenta con algún dato que permita cuantificar esa diferencia? Me interesaría citarlo.", en: "And do you have any data that would quantify that difference? I'd be interested in citing it." },
        { t: "Aunque la mona se vista de seda, mona se queda.", en: "You can't make a silk purse out of a sow's ear." },
      ] },
      { a: { t: "Los tengo en el anexo de la presentación, que se compartirá con todos los asistentes al término de la sesión.", en: "I have them in the appendix of the presentation, which will be shared with all attendees at the end of the session." }, c: 0, o: [
        { t: "Estupendo, se lo agradezco. Lo consultaré con detenimiento.", en: "Excellent, thank you. I'll look at it closely." },
        { t: "Le salió el tiro por la culata cuando intentó impresionar al jefe.", en: "It backfired on him when he tried to impress the boss." },
        { t: "Llovía a cántaros cuando salimos del teatro.", en: "It was pouring down when we left the theatre." },
      ] },
    ],
  },
  {
    id: "es-d6-sobremesa", lv: 6, title: "Una larga sobremesa", titleEn: "Lingering at the table",
    turns: [
      { a: { t: "¿Se acuerdan de los veranos en casa de los abuelos? Hoy en día me parecen de otro siglo.", en: "Do you remember the summers at our grandparents' house? Nowadays they seem like another century." }, c: 2, o: [
        { t: "Se nota que el ponente no se había preparado la charla.", en: "You can tell the speaker hadn't prepared the talk." },
        { t: "Tras arduas negociaciones, ambas partes firmaron el acuerdo.", en: "After arduous negotiations, both parties signed the agreement." },
        { t: "¡Cómo no! Nos pasábamos el día en el río y nadie se preocupaba de dónde andábamos.", en: "Of course! We'd spend all day at the river and nobody worried about where we were." },
      ] },
      { a: { t: "Sí, pero tampoco lo idealicemos: nos aburríamos como ostras durante la hora de la siesta.", en: "Yes, but let's not idealise it either: we were bored stiff during siesta time." }, c: 0, o: [
        { t: "Es verdad, aunque quizá ese aburrimiento era justo lo que nos obligaba a inventar juegos.", en: "That's true, although perhaps that boredom was exactly what forced us to invent games." },
        { t: "El informe adolece de una falta de rigor alarmante.", en: "The report suffers from an alarming lack of rigour." },
        { t: "En cuanto a los plazos, nos ceñiremos a lo acordado.", en: "As for deadlines, we'll stick to what was agreed." },
      ] },
      { a: { t: "Puede ser. A veces pienso que la nostalgia no es tanto echar de menos un lugar como echar de menos a quien éramos.", en: "Could be. Sometimes I think nostalgia isn't so much missing a place as missing who we used to be." }, c: 1, o: [
        { t: "A juzgar por el atasco, llegaremos tarde a la boda.", en: "Judging by the traffic jam, we'll be late for the wedding." },
        { t: "Qué bien lo has dicho. Por eso, cuando volví al pueblo el año pasado, me pareció mucho más pequeño.", en: "Beautifully put. That's why, when I went back to the village last year, it seemed so much smaller." },
        { t: "Dicho lo cual, se levanta la sesión.", en: "That said, the meeting is adjourned." },
      ] },
      { a: { t: "A mí me pasó lo mismo con el colegio. Recordaba un patio inmenso y resulta que es poco más que una pista de baloncesto.", en: "The same happened to me with my school. I remembered a huge playground and it turns out it's little more than a basketball court." }, c: 2, o: [
        { t: "Habida cuenta de los resultados, conviene revisar la estrategia.", en: "In view of the results, the strategy should be reviewed." },
        { t: "Por lo que respecta al presupuesto, aún no hay nada decidido.", en: "As far as the budget is concerned, nothing has been decided yet." },
        { t: "Será que crecimos nosotros y no ellos. La memoria agranda lo que fue importante.", en: "It must be that we grew, not them. Memory enlarges what mattered." },
      ] },
      { a: { t: "Bueno, ¿y si el verano que viene alquilamos la casa una semana y lo comprobamos todos juntos?", en: "Well, what if next summer we rent the house for a week and check it out all together?" }, c: 0, o: [
        { t: "Me apunto, aunque me temo que la realidad no estará a la altura de nuestros recuerdos.", en: "Count me in, though I'm afraid reality won't live up to our memories." },
        { t: "Cabe señalar que el estudio se limitó a una muestra reducida.", en: "It should be noted that the study was limited to a small sample." },
        { t: "En lo sucesivo, rogamos que se abstengan de fumar en el recinto.", en: "From now on, we ask you to refrain from smoking on the premises." },
      ] },
    ],
  },
];

export default data;
