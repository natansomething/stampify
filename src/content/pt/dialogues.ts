import type { Dialogue } from '../types';

const data: Dialogue[] = [
  {
    id: "pt-d1-padaria", lv: 1, title: "Na padaria", titleEn: "At the bakery",
    turns: [
      { a: { t: "Bom dia! O que você vai querer?", en: "Good morning! What would you like?" }, c: 1, o: [
        { t: "Eu moro aqui perto.", en: "I live near here." },
        { t: "Bom dia! Quatro pães franceses, por favor.", en: "Good morning! Four French rolls, please." },
        { t: "Meu nome é Pedro.", en: "My name is Pedro." },
      ] },
      { a: { t: "Mais alguma coisa?", en: "Anything else?" }, c: 0, o: [
        { t: "Sim, um café com leite.", en: "Yes, a coffee with milk." },
        { t: "Hoje é sábado.", en: "Today is Saturday." },
        { t: "Não, eu não tenho irmãos.", en: "No, I don't have any siblings." },
      ] },
      { a: { t: "O café é para levar ou para tomar aqui?", en: "Is the coffee to take away or to have here?" }, c: 2, o: [
        { t: "É muito quente.", en: "It's very hot." },
        { t: "Eu gosto de chá.", en: "I like tea." },
        { t: "Para tomar aqui, obrigado.", en: "To have here, thanks." },
      ] },
      { a: { t: "Com açúcar ou sem açúcar?", en: "With or without sugar?" }, c: 1, o: [
        { t: "Às oito horas.", en: "At eight o'clock." },
        { t: "Sem açúcar, por favor.", en: "Without sugar, please." },
        { t: "Eu sou de Brasília.", en: "I'm from Brasília." },
      ] },
      { a: { t: "São doze reais.", en: "That's twelve reais." }, c: 0, o: [
        { t: "Posso pagar com cartão?", en: "Can I pay by card?" },
        { t: "Tenho trinta anos.", en: "I'm thirty years old." },
        { t: "A padaria é grande.", en: "The bakery is big." },
      ] },
    ],
  },
  {
    id: "pt-d1-apresentacao", lv: 1, title: "Prazer em conhecer", titleEn: "Nice to meet you",
    turns: [
      { a: { t: "Oi! Tudo bem? Eu sou a Júlia.", en: "Hi! How are you? I'm Júlia." }, c: 2, o: [
        { t: "Eu tenho um cachorro.", en: "I have a dog." },
        { t: "São três horas.", en: "It's three o'clock." },
        { t: "Tudo bem! Eu sou o Mark. Prazer!", en: "Fine! I'm Mark. Nice to meet you!" },
      ] },
      { a: { t: "Prazer! De onde você é?", en: "Nice to meet you! Where are you from?" }, c: 0, o: [
        { t: "Sou dos Estados Unidos, de Chicago.", en: "I'm from the United States, from Chicago." },
        { t: "Eu gosto de futebol.", en: "I like football." },
        { t: "Sim, por favor.", en: "Yes, please." },
      ] },
      { a: { t: "Legal! E o que você faz aqui no Brasil?", en: "Cool! And what do you do here in Brazil?" }, c: 1, o: [
        { t: "Meu irmão é alto.", en: "My brother is tall." },
        { t: "Eu sou professor de inglês.", en: "I'm an English teacher." },
        { t: "Não, obrigado.", en: "No, thanks." },
      ] },
      { a: { t: "Você fala português muito bem!", en: "You speak Portuguese very well!" }, c: 2, o: [
        { t: "Eu moro com dois amigos.", en: "I live with two friends." },
        { t: "O ônibus está atrasado.", en: "The bus is late." },
        { t: "Obrigado! Eu estudo todo dia.", en: "Thanks! I study every day." },
      ] },
      { a: { t: "Bom, eu preciso ir. Tchau!", en: "Well, I need to go. Bye!" }, c: 0, o: [
        { t: "Tchau, Júlia! Até logo!", en: "Bye, Júlia! See you soon!" },
        { t: "Eu quero um suco.", en: "I want a juice." },
        { t: "Hoje está frio.", en: "It's cold today." },
      ] },
    ],
  },
  {
    id: "pt-d2-hotel", lv: 2, title: "Chegando ao hotel", titleEn: "Arriving at the hotel",
    turns: [
      { a: { t: "Boa noite! Posso ajudar?", en: "Good evening! Can I help you?" }, c: 1, o: [
        { t: "Ontem eu fui à praia.", en: "Yesterday I went to the beach." },
        { t: "Boa noite! Eu fiz uma reserva em nome de Laura Smith.", en: "Good evening! I made a booking under the name Laura Smith." },
        { t: "Não, eu prefiro o verão.", en: "No, I prefer summer." },
      ] },
      { a: { t: "Um momento... Sim, um quarto de casal por três noites. Posso ver seu passaporte?", en: "One moment... Yes, a double room for three nights. May I see your passport?" }, c: 0, o: [
        { t: "Claro, aqui está.", en: "Of course, here it is." },
        { t: "Eu comprei uma camiseta nova.", en: "I bought a new T-shirt." },
        { t: "O passaporte é muito caro.", en: "The passport is very expensive." },
      ] },
      { a: { t: "Obrigado. O café da manhã é servido das seis às dez.", en: "Thank you. Breakfast is served from six to ten." }, c: 2, o: [
        { t: "Eu não gosto de viajar de avião.", en: "I don't like travelling by plane." },
        { t: "Meu quarto é muito grande.", en: "My room is very big." },
        { t: "Ótimo. E o hotel tem wi-fi?", en: "Great. And does the hotel have wi-fi?" },
      ] },
      { a: { t: "Tem, sim. A senha está neste cartão.", en: "Yes, it does. The password is on this card." }, c: 1, o: [
        { t: "Eu cheguei às dez horas.", en: "I arrived at ten o'clock." },
        { t: "Perfeito. Qual é o número do quarto?", en: "Perfect. What's the room number?" },
        { t: "Não, eu não tenho cartão.", en: "No, I don't have a card." },
      ] },
      { a: { t: "É o quarto 305, no terceiro andar. O elevador fica à esquerda.", en: "It's room 305, on the third floor. The lift is on the left." }, c: 0, o: [
        { t: "Muito obrigada! Boa noite.", en: "Thank you very much! Good night." },
        { t: "Eu prefiro comer peixe.", en: "I prefer eating fish." },
        { t: "Fui ao cinema ontem.", en: "I went to the cinema yesterday." },
      ] },
    ],
  },
  {
    id: "pt-d2-farmacia", lv: 2, title: "Na farmácia", titleEn: "At the pharmacy",
    turns: [
      { a: { t: "Boa tarde! O que você está procurando?", en: "Good afternoon! What are you looking for?" }, c: 2, o: [
        { t: "Estou procurando um apartamento barato.", en: "I'm looking for a cheap flat." },
        { t: "Eu trabalho num banco.", en: "I work in a bank." },
        { t: "Boa tarde! Eu estou com dor de garganta.", en: "Good afternoon! I have a sore throat." },
      ] },
      { a: { t: "Desde quando você está assim?", en: "Since when have you been like this?" }, c: 0, o: [
        { t: "Desde ontem à noite.", en: "Since last night." },
        { t: "Até amanhã.", en: "See you tomorrow." },
        { t: "Com muito açúcar.", en: "With lots of sugar." },
      ] },
      { a: { t: "Você está com febre também?", en: "Do you have a fever too?" }, c: 1, o: [
        { t: "Sim, eu gosto de música.", en: "Yes, I like music." },
        { t: "Não, só dor de garganta e um pouco de tosse.", en: "No, just a sore throat and a bit of a cough." },
        { t: "Não, eu não tenho carro.", en: "No, I don't have a car." },
      ] },
      { a: { t: "Então leve essas pastilhas. Tome uma a cada quatro horas.", en: "Then take these lozenges. Have one every four hours." }, c: 2, o: [
        { t: "Eu acordei cedo hoje.", en: "I woke up early today." },
        { t: "A farmácia fica longe.", en: "The pharmacy is far away." },
        { t: "Está bem. E posso tomar chá quente?", en: "All right. And can I drink hot tea?" },
      ] },
      { a: { t: "Pode, sim. Chá com mel ajuda bastante. Se não melhorar em três dias, procure um médico.", en: "Yes, you can. Tea with honey helps a lot. If you don't get better in three days, see a doctor." }, c: 0, o: [
        { t: "Combinado. Muito obrigado!", en: "Okay. Thank you very much!" },
        { t: "Eu fui ao médico em 2019.", en: "I went to the doctor in 2019." },
        { t: "Prefiro café a chá.", en: "I prefer coffee to tea." },
      ] },
    ],
  },
  {
    id: "pt-d3-apartamento", lv: 3, title: "Visitando um apartamento", titleEn: "Viewing a flat",
    turns: [
      { a: { t: "Então, este é o apartamento. O que você achou?", en: "So, this is the flat. What do you think?" }, c: 1, o: [
        { t: "Achei que o filme era mais longo.", en: "I thought the film was longer." },
        { t: "Gostei bastante. A sala é bem iluminada.", en: "I like it a lot. The living room gets plenty of light." },
        { t: "Ainda não terminei o relatório.", en: "I haven't finished the report yet." },
      ] },
      { a: { t: "É verdade, bate sol a manhã inteira. Você tem alguma pergunta?", en: "That's right, it gets sun all morning. Do you have any questions?" }, c: 0, o: [
        { t: "Sim. O valor do condomínio está incluído no aluguel?", en: "Yes. Is the building service charge included in the rent?" },
        { t: "Sim, eu costumava jogar tênis.", en: "Yes, I used to play tennis." },
        { t: "Não, espero que chova amanhã.", en: "No, I hope it rains tomorrow." },
      ] },
      { a: { t: "Não está. O condomínio é de quatrocentos reais por mês.", en: "It isn't. The service charge is four hundred reais a month." }, c: 2, o: [
        { t: "Meu irmão se mudou para Recife.", en: "My brother moved to Recife." },
        { t: "Fiquei feliz com a notícia do seu casamento.", en: "I was happy to hear about your wedding." },
        { t: "Entendi. E é permitido ter animais? Eu tenho um gato.", en: "I see. And are pets allowed? I have a cat." },
      ] },
      { a: { t: "Pode, sim, desde que ele não incomode os vizinhos.", en: "Yes, as long as it doesn't bother the neighbours." }, c: 1, o: [
        { t: "Ele chega às sete horas.", en: "He arrives at seven." },
        { t: "Ótimo, ele é bem tranquilo. Quando eu poderia me mudar?", en: "Great, he's very calm. When could I move in?" },
        { t: "Os vizinhos estão de férias na Bahia.", en: "The neighbours are on holiday in Bahia." },
      ] },
      { a: { t: "O apartamento fica livre no dia primeiro. Mas você vai precisar de um fiador.", en: "The flat is available on the first. But you'll need a guarantor." }, c: 0, o: [
        { t: "Sem problema. Vou falar com meu pai e te dou uma resposta até sexta.", en: "No problem. I'll talk to my father and give you an answer by Friday." },
        { t: "Eu prefiro morar no centro do Rio.", en: "I prefer living in the centre of Rio." },
        { t: "O meu gato não gosta de peixe.", en: "My cat doesn't like fish." },
      ] },
    ],
  },
  {
    id: "pt-d3-restaurante", lv: 3, title: "Um problema no restaurante", titleEn: "A problem at the restaurant",
    turns: [
      { a: { t: "Com licença, está tudo certo com o prato?", en: "Excuse me, is everything all right with the dish?" }, c: 2, o: [
        { t: "Sim, eu já tinha visitado Salvador.", en: "Yes, I had already visited Salvador." },
        { t: "Está, a gente vai pegar um táxi.", en: "Yes, we're going to take a taxi." },
        { t: "Na verdade, não. Eu pedi o peixe grelhado, mas veio frito.", en: "Actually, no. I ordered the grilled fish, but it came fried." },
      ] },
      { a: { t: "Puxa, me desculpe! Quer que eu troque?", en: "Oh, I'm sorry! Would you like me to change it?" }, c: 0, o: [
        { t: "Quero, sim, por favor. Eu não posso comer fritura.", en: "Yes, please. I can't eat fried food." },
        { t: "Quero que você goste do presente.", en: "I want you to like the present." },
        { t: "Não, eu troquei de emprego em março.", en: "No, I changed jobs in March." },
      ] },
      { a: { t: "Claro. O grelhado demora uns vinte minutos. Tudo bem?", en: "Of course. The grilled one takes about twenty minutes. Is that okay?" }, c: 1, o: [
        { t: "Demorou muito para chegar ao aeroporto.", en: "It took a long time to get to the airport." },
        { t: "Tudo bem, não estou com pressa.", en: "That's fine, I'm not in a hurry." },
        { t: "Vinte reais é muito caro.", en: "Twenty reais is very expensive." },
      ] },
      { a: { t: "Enquanto isso, posso trazer alguma coisa para beber, por conta da casa?", en: "Meanwhile, can I bring you something to drink, on the house?" }, c: 2, o: [
        { t: "A casa da minha avó era enorme.", en: "My grandmother's house was huge." },
        { t: "Eu não bebo água de manhã.", en: "I don't drink water in the morning." },
        { t: "Que gentileza! Aceito um suco de maracujá.", en: "How kind! I'll have a passion fruit juice." },
      ] },
      { a: { t: "Aqui está o seu peixe. Mais uma vez, desculpe pelo engano.", en: "Here is your fish. Once again, sorry for the mistake." }, c: 0, o: [
        { t: "Imagina, acontece. Obrigada pela atenção!", en: "Don't worry, it happens. Thanks for your help!" },
        { t: "Engano meu, eu moro em Belém.", en: "My mistake, I live in Belém." },
        { t: "Eu vou ao mercado amanhã.", en: "I'm going to the market tomorrow." },
      ] },
    ],
  },
  {
    id: "pt-d4-entrevista", lv: 4, title: "A entrevista de emprego", titleEn: "The job interview",
    turns: [
      { a: { t: "Para começar, fale um pouco sobre a sua experiência profissional.", en: "To start, tell us a bit about your professional experience." }, c: 1, o: [
        { t: "Fazia anos que eu não ia à praia.", en: "I hadn't been to the beach for years." },
        { t: "Trabalho há cinco anos com logística, os últimos dois como coordenadora de equipe.", en: "I've worked in logistics for five years, the last two as a team coordinator." },
        { t: "Por mais que eu tente, não gosto de jiló.", en: "However hard I try, I don't like jiló." },
      ] },
      { a: { t: "E por que você quer sair da empresa atual?", en: "And why do you want to leave your current company?" }, c: 0, o: [
        { t: "Gosto muito de lá, mas sinto que já não tenho espaço para crescer.", en: "I like it a lot there, but I feel I no longer have room to grow." },
        { t: "Porque a empresa atual fica no décimo andar.", en: "Because my current company is on the tenth floor." },
        { t: "Saí de casa às sete e meia.", en: "I left home at half past seven." },
      ] },
      { a: { t: "Conte uma situação difícil que você teve que resolver no trabalho.", en: "Tell us about a difficult situation you had to resolve at work." }, c: 2, o: [
        { t: "Caso chova, a gente remarca o churrasco.", en: "If it rains, we'll reschedule the barbecue." },
        { t: "Eu deveria ter comprado um guarda-chuva.", en: "I should have bought an umbrella." },
        { t: "Uma vez, um fornecedor atrasou uma entrega importante, e eu tive que reorganizar toda a distribuição em dois dias.", en: "Once a supplier delayed an important delivery, and I had to reorganise all the distribution in two days." },
      ] },
      { a: { t: "Interessante. E qual é a sua pretensão salarial?", en: "Interesting. And what are your salary expectations?" }, c: 1, o: [
        { t: "Pretendo viajar para o Chile nas férias.", en: "I'm planning to travel to Chile on holiday." },
        { t: "Considerando o cargo e o mercado, algo em torno de nove mil reais.", en: "Considering the position and the market, something around nine thousand reais." },
        { t: "Meu salário favorito é o de dezembro.", en: "My favourite salary is December's." },
      ] },
      { a: { t: "Muito bem. Você tem alguma pergunta para nós?", en: "Very good. Do you have any questions for us?" }, c: 0, o: [
        { t: "Sim. Como funciona o modelo de trabalho? É híbrido?", en: "Yes. How does the working model work? Is it hybrid?" },
        { t: "Não, eu já respondi a todas as perguntas da prova.", en: "No, I've already answered all the exam questions." },
        { t: "Tenho, sim: vocês gostam de cachorro?", en: "Yes, I do: do you like dogs?" },
      ] },
    ],
  },
  {
    id: "pt-d4-vizinho", lv: 4, title: "Barulho no prédio", titleEn: "Noise in the building",
    turns: [
      { a: { t: "Oi, tudo bem? Desculpe incomodar, mas posso falar com você um minuto?", en: "Hi, how are you? Sorry to bother you, but can I talk to you for a minute?" }, c: 2, o: [
        { t: "Pode, mas eu já almocei.", en: "You can, but I've already had lunch." },
        { t: "Não, o minuto tem sessenta segundos.", en: "No, a minute has sixty seconds." },
        { t: "Claro, pode falar. Aconteceu alguma coisa?", en: "Of course, go ahead. Has something happened?" },
      ] },
      { a: { t: "É que nas últimas noites tem tido muito barulho no seu apartamento depois da meia-noite.", en: "It's just that for the last few nights there's been a lot of noise from your flat after midnight." }, c: 0, o: [
        { t: "Nossa, me desculpe! Meu filho está ensaiando com a banda dele. Eu não sabia que dava para ouvir tanto.", en: "Oh, I'm so sorry! My son has been rehearsing with his band. I didn't know you could hear it so much." },
        { t: "Que bom que você gosta de música!", en: "How nice that you like music!" },
        { t: "Meia-noite é um horário ótimo para dormir.", en: "Midnight is a great time to sleep." },
      ] },
      { a: { t: "Entendo, mas eu acordo às cinco para trabalhar e está difícil descansar.", en: "I understand, but I get up at five for work and it's hard to rest." }, c: 1, o: [
        { t: "Eu também acordo às cinco, mas da tarde.", en: "I also get up at five, but in the afternoon." },
        { t: "Com razão. Vou pedir para eles pararem até as dez da noite.", en: "You're right. I'll ask them to stop by ten at night." },
        { t: "Então você deveria mudar de emprego.", en: "Then you should change jobs." },
      ] },
      { a: { t: "Seria ótimo. Talvez eles possam usar o salão de festas durante o dia.", en: "That would be great. Maybe they could use the party room during the day." }, c: 0, o: [
        { t: "Boa ideia! Vou falar com o síndico para ver se é possível.", en: "Good idea! I'll talk to the building manager to see if it's possible." },
        { t: "O salão de beleza fecha às oito.", en: "The beauty salon closes at eight." },
        { t: "Eles não sabem dançar.", en: "They can't dance." },
      ] },
      { a: { t: "Muito obrigado pela compreensão.", en: "Thank you very much for understanding." }, c: 2, o: [
        { t: "Compreendo pouco de física.", en: "I understand little about physics." },
        { t: "Obrigado, mas não preciso de ajuda.", en: "Thanks, but I don't need help." },
        { t: "Eu que agradeço por ter vindo conversar. Qualquer coisa, é só avisar.", en: "Thank you for coming to talk. If there's anything else, just let me know." },
      ] },
    ],
  },
  {
    id: "pt-d5-prazo", lv: 5, title: "Negociando um prazo", titleEn: "Negotiating a deadline",
    turns: [
      { a: { t: "Recebi o seu e-mail. Você está mesmo pedindo mais duas semanas para entregar o relatório?", en: "I got your email. Are you really asking for two more weeks to deliver the report?" }, c: 1, o: [
        { t: "Estou, sim, mas só se o relatório for entregue amanhã.", en: "Yes, but only if the report is delivered tomorrow." },
        { t: "Estou. Os dados do fornecedor chegaram incompletos, e não quero entregar algo pela metade.", en: "I am. The supplier's data arrived incomplete, and I don't want to deliver something half-done." },
        { t: "Mal cheguei ao escritório, já fui almoçar.", en: "I'd barely got to the office when I went to lunch." },
      ] },
      { a: { t: "Entendo, mas o cliente conta com esse material para a reunião do dia vinte.", en: "I understand, but the client is counting on this material for the meeting on the twentieth." }, c: 2, o: [
        { t: "Por mais estranho que pareça, eu adoro reuniões.", en: "Strange as it may seem, I love meetings." },
        { t: "Então vamos cancelar o cliente.", en: "Then let's cancel the client." },
        { t: "E se eu enviasse uma versão preliminar até o dia dezoito, com as principais conclusões?", en: "What if I sent a preliminary version by the eighteenth, with the main conclusions?" },
      ] },
      { a: { t: "Pode ser. Mas a versão preliminar teria que estar bem fundamentada.", en: "That could work. But the preliminary version would have to be well supported." }, c: 0, o: [
        { t: "Sem dúvida. Posso incluir uma nota explicando quais dados ainda estão pendentes.", en: "Absolutely. I can include a note explaining which data are still pending." },
        { t: "Os fundamentos do prédio foram reformados.", en: "The building's foundations were renovated." },
        { t: "Convém lembrar que eu não gosto de notas.", en: "It's worth remembering that I don't like notes." },
      ] },
      { a: { t: "Certo. E quando ficaria pronta a versão final?", en: "Right. And when would the final version be ready?" }, c: 1, o: [
        { t: "Ficaria pronta para o jantar, às oito.", en: "It would be ready for dinner, at eight." },
        { t: "Desde que o fornecedor mande o restante esta semana, no máximo até o dia vinte e oito.", en: "As long as the supplier sends the rest this week, by the twenty-eighth at the latest." },
        { t: "Faltou pouco para eu perder o ônibus.", en: "I very nearly missed the bus." },
      ] },
      { a: { t: "Combinado. Mas, se houver mais algum atraso, me avise imediatamente.", en: "Agreed. But if there's any further delay, let me know immediately." }, c: 0, o: [
        { t: "Pode deixar. Vou manter você informado a cada etapa.", en: "Leave it to me. I'll keep you informed at every stage." },
        { t: "Fiz questão de chegar atrasado.", en: "I made a point of arriving late." },
        { t: "Não há atraso que sempre dure.", en: "No delay lasts forever." },
      ] },
    ],
  },
  {
    id: "pt-d5-banco", lv: 5, title: "Uma cobrança indevida", titleEn: "An incorrect charge",
    turns: [
      { a: { t: "Central de atendimento, boa tarde. Em que posso ajudar?", en: "Customer service, good afternoon. How can I help?" }, c: 2, o: [
        { t: "Boa tarde. Gostaria de abrir mão do meu carro.", en: "Good afternoon. I'd like to give up my car." },
        { t: "Ajuda é sempre bem-vinda.", en: "Help is always welcome." },
        { t: "Boa tarde. Apareceu na minha fatura uma compra que eu não reconheço.", en: "Good afternoon. A purchase I don't recognise has appeared on my statement." },
      ] },
      { a: { t: "Sinto muito pelo transtorno. Poderia me informar a data e o valor da compra?", en: "I'm sorry for the inconvenience. Could you tell me the date and amount of the purchase?" }, c: 0, o: [
        { t: "Foi no dia doze, no valor de mil e duzentos reais, numa loja online que eu nunca usei.", en: "It was on the twelfth, for one thousand two hundred reais, at an online shop I've never used." },
        { t: "Eu comprei o cartão numa loja de departamentos.", en: "I bought the card at a department store." },
        { t: "Não posso, a data já passou.", en: "I can't, the date has already passed." },
      ] },
      { a: { t: "Certo. O seu cartão está com o senhor neste momento?", en: "Right. Do you have your card with you at the moment, sir?" }, c: 1, o: [
        { t: "Está com o senhor, sim, desde ontem.", en: "Yes, it's with you, sir, since yesterday." },
        { t: "Está, sim. Nunca saiu da minha carteira, o que me deixou ainda mais desconfiado.", en: "Yes. It's never left my wallet, which made me even more suspicious." },
        { t: "Neste momento estou tomando café.", en: "At the moment I'm having coffee." },
      ] },
      { a: { t: "Nesse caso, vamos bloquear o cartão e abrir uma contestação. O prazo de análise é de até dez dias úteis.", en: "In that case, we'll block the card and open a dispute. The review takes up to ten working days." }, c: 2, o: [
        { t: "Dez dias úteis é muito tempo para uma viagem.", en: "Ten working days is a long time for a trip." },
        { t: "Prefiro que vocês desbloqueiem o cartão de vez.", en: "I'd rather you unblocked the card for good." },
        { t: "Tudo bem. E o valor será estornado caso a contestação seja aceita?", en: "All right. And will the amount be refunded if the dispute is upheld?" },
      ] },
      { a: { t: "Será, sim. E um novo cartão será enviado para o seu endereço em até sete dias.", en: "Yes, it will. And a new card will be sent to your address within seven days." }, c: 0, o: [
        { t: "Perfeito. Poderia me passar o número do protocolo, por favor?", en: "Perfect. Could you give me the reference number, please?" },
        { t: "Mal sabia eu que tinha um endereço.", en: "Little did I know I had an address." },
        { t: "Ainda que eu tivesse um cartão, não o usaria.", en: "Even if I had a card, I wouldn't use it." },
      ] },
    ],
  },
  {
    id: "pt-d6-livro", lv: 6, title: "Clube do livro", titleEn: "Book club",
    turns: [
      { a: { t: "Confesso que terminei o romance com uma sensação ambígua. E você, o que achou?", en: "I confess I finished the novel with mixed feelings. What about you, what did you think?" }, c: 1, o: [
        { t: "Achei na estante da sala, ao lado dos dicionários.", en: "I found it on the living room shelf, next to the dictionaries." },
        { t: "Achei brilhante na forma, mas um tanto previsível no enredo.", en: "I found it brilliant in form, but somewhat predictable in plot." },
        { t: "Confesso que nunca fui a um clube.", en: "I confess I've never been to a club." },
      ] },
      { a: { t: "Previsível? Eu jamais teria adivinhado aquele desfecho.", en: "Predictable? I would never have guessed that ending." }, c: 0, o: [
        { t: "Talvez, mas a autora espalha tantas pistas que, relendo, o final parece quase inevitável.", en: "Maybe, but the author scatters so many clues that, rereading it, the ending seems almost inevitable." },
        { t: "Pois é, o desfecho do campeonato foi uma surpresa.", en: "Right, the outcome of the championship was a surprise." },
        { t: "Quem dera eu tivesse lido o jornal hoje.", en: "If only I'd read the newspaper today." },
      ] },
      { a: { t: "Pode ser. Mas não acha que a narradora é uma das personagens mais bem construídas dos últimos anos?", en: "Could be. But don't you think the narrator is one of the best-drawn characters of recent years?" }, c: 2, o: [
        { t: "Construíram um prédio novo na esquina da minha rua.", en: "They built a new building on the corner of my street." },
        { t: "Não acho, porque perdi os óculos.", en: "I can't find it, because I lost my glasses." },
        { t: "Nisso concordo plenamente. A ironia dela, sempre à beira da crueldade, sustenta o livro inteiro.", en: "On that I fully agree. Her irony, always on the edge of cruelty, holds the whole book together." },
      ] },
      { a: { t: "E a tradução para o inglês? Dizem que perdeu boa parte do humor.", en: "And the English translation? People say it lost a good part of the humour." }, c: 1, o: [
        { t: "O humor dele anda péssimo desde segunda-feira.", en: "His mood has been terrible since Monday." },
        { t: "É o risco de sempre: certas piadas dependem tanto do registro coloquial que dificilmente sobrevivem à travessia.", en: "It's the usual risk: some jokes depend so much on colloquial register that they hardly survive the crossing." },
        { t: "Eu traduzo do inglês para o japonês.", en: "I translate from English into Japanese." },
      ] },
      { a: { t: "Bom, seja como for, merece a próxima discussão inteira. Que tal convidarmos a tradutora?", en: "Well, be that as it may, it deserves a whole session. How about inviting the translator?" }, c: 0, o: [
        { t: "Excelente ideia! Seria fascinante ouvir as escolhas dela de viva voz.", en: "Excellent idea! It would be fascinating to hear about her choices first-hand." },
        { t: "Seja qual for o preço, não compro esse livro.", en: "Whatever the price, I'm not buying that book." },
        { t: "A tradutora mora no terceiro andar e tem um gato.", en: "The translator lives on the third floor and has a cat." },
      ] },
    ],
  },
  {
    id: "pt-d6-carreira", lv: 6, title: "Mudança de rumo", titleEn: "A change of direction",
    turns: [
      { a: { t: "Fiquei sabendo que você está pensando em largar a advocacia. É verdade?", en: "I heard you're thinking of leaving law. Is it true?" }, c: 2, o: [
        { t: "É verdade, a advocacia fica no centro da cidade.", en: "It's true, the law firm is in the city centre." },
        { t: "Fiquei sabendo ontem que vai chover.", en: "I found out yesterday that it's going to rain." },
        { t: "É, sim. Faz tempo que essa ideia me ronda, mas só agora criei coragem.", en: "Yes, it is. The idea has been on my mind for a long time, but only now have I plucked up the courage." },
      ] },
      { a: { t: "E o que pretende fazer? Não me diga que vai abrir uma pousada na praia.", en: "And what do you plan to do? Don't tell me you're going to open a guesthouse on the beach." }, c: 0, o: [
        { t: "Quase isso! Quero me dedicar à marcenaria, que sempre foi o meu passatempo.", en: "Almost! I want to devote myself to woodworking, which has always been my hobby." },
        { t: "Não digo, porque não sei o seu nome.", en: "I won't, because I don't know your name." },
        { t: "A praia estava lotada no feriado.", en: "The beach was packed on the bank holiday." },
      ] },
      { a: { t: "Que guinada! Mas você não tem receio de abrir mão da estabilidade?", en: "What a turnaround! But aren't you afraid of giving up stability?" }, c: 1, o: [
        { t: "Não, a estabilidade do prédio foi verificada.", en: "No, the building's stability has been checked." },
        { t: "Tenho, evidentemente. Por isso juntei uma reserva que me permite passar dois anos sem grandes apertos.", en: "Of course I am. That's why I've saved up enough to get through two years without major hardship." },
        { t: "Receio que a receita leve ovos.", en: "I'm afraid the recipe has eggs in it." },
      ] },
      { a: { t: "Sensato. Ainda assim, imagino que a família tenha torcido o nariz.", en: "Sensible. Even so, I imagine your family turned their noses up at it." }, c: 2, o: [
        { t: "Torci o tornozelo jogando futebol.", en: "I twisted my ankle playing football." },
        { t: "O nariz do meu pai é bem grande.", en: "My father's nose is quite big." },
        { t: "No começo, sim. Mas, quando viram os móveis que eu fiz, a desconfiança deu lugar à curiosidade.", en: "At first, yes. But when they saw the furniture I'd made, suspicion gave way to curiosity." },
      ] },
      { a: { t: "Pois então, quando inaugurar a oficina, faço questão de ser o primeiro cliente.", en: "Well then, when you open the workshop, I insist on being the first customer." }, c: 0, o: [
        { t: "Combinado! E, para você, o cafezinho vai ser sempre por conta da casa.", en: "Deal! And for you, the coffee will always be on the house." },
        { t: "A oficina mecânica fecha às seis.", en: "The car repair shop closes at six." },
        { t: "Faço questão de não pagar a conta.", en: "I insist on not paying the bill." },
      ] },
    ],
  },
];

export default data;
