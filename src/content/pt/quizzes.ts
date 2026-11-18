import type { TextQuiz } from '../types';

const data: TextQuiz[] = [
  {
    text: "pt-3-vizinha",
    q: [
      { q: "Por que o Rafael se mudou para Belo Horizonte?", o: ["Para estudar", "Por causa de um emprego numa empresa de tecnologia", "Para morar perto da família"] },
      { q: "Quem era a Dona Célia?", o: ["Uma professora aposentada", "A chefe dele", "Uma médica"] },
      { q: "O que a Dona Célia levou quando o Rafael ficou doente?", o: ["Remédio e frutas", "Pão de queijo", "Sopa e chá de gengibre"] },
      { q: "O que eles fazem aos domingos agora?", o: ["Vão à feira", "Cozinham juntos", "Assistem futebol"] },
    ],
  },
  {
    text: "pt-3-sono",
    q: [
      { q: "Segundo os especialistas, quantas horas de sono um adulto precisa?", o: ["De cinco a seis horas", "De sete a nove horas", "Dez horas"] },
      { q: "Por que a luz do celular é um problema?", o: ["Faz o cérebro pensar que ainda é dia", "Machuca os olhos", "Dá fome"] },
      { q: "Quando o café atrapalha mais o sono?", o: ["De manhã", "Com leite", "À tarde"] },
      { q: "Como o quarto deve ser?", o: ["Claro e quente", "Escuro, silencioso e não muito quente", "Frio e barulhento"] },
      { q: "Quando as pessoas costumam notar a diferença?", o: ["Depois de uma noite", "Em poucas semanas", "Depois de um ano"] },
    ],
  },
  {
    text: "pt-3-bolo-cenoura",
    q: [
      { q: "Por que o Lucas decidiu fazer um bolo?", o: ["Queria vender o bolo", "Queria dar um presente especial para a mãe, mas não tinha muito dinheiro", "A avó pediu", "Tinha perdido uma aposta"] },
      { q: "Qual era o problema da receita?", o: ["Estava em outra língua", "Faltavam os ovos", "Algumas quantidades eram vagas, como “farinha até dar o ponto”", "Era de outro bolo"] },
      { q: "Onde estava a avó Dirce quando o Lucas ligou para ela?", o: ["No supermercado", "Na aula de dança", "No cabeleireiro", "Em casa, dormindo"] },
      { q: "O que aconteceu com o liquidificador?", o: ["Quebrou", "A tampa não estava fechada e o suco de cenoura voou para todo lado", "Fez barulho demais para os vizinhos", "O Lucas esqueceu de ligar"] },
      { q: "O que aconteceu com o bolo no forno?", o: ["Queimou", "Não cresceu nada", "Cresceu bem e depois afundou no meio", "Caiu no chão"] },
      { q: "Que segredo a avó Dirce contou?", o: ["Ela comprava o bolo na padaria", "O bolo dela também sempre afundava, por isso ela colocava muita cobertura", "Ela nunca usava cenoura", "A receita era da vizinha"] },
    ],
  },
  {
    text: "pt-3-noronha",
    q: [
      { q: "A que estado pertence Fernando de Noronha?", o: ["Bahia", "Rio Grande do Norte", "Pernambuco", "Ceará"] },
      { q: "Para que a ilha foi usada durante muitos anos no passado?", o: ["Como aeroporto militar", "Como prisão", "Como porto de pesca de Lisboa", "Como plantação de cana-de-açúcar"] },
      { q: "O que todo visitante precisa pagar?", o: ["Uma taxa de preservação ambiental por dia na ilha", "Uma taxa só no dia da chegada", "Uma taxa para usar o ônibus", "Nada, a ilha é de graça"] },
      { q: "Por que os golfinhos-rotadores entram na baía todas as manhãs?", o: ["Para procurar comida", "Para ter filhotes", "Para descansar depois de uma noite de pesca em alto-mar", "Para seguir os barcos de turistas"] },
      { q: "Como se desce até a Baía do Sancho?", o: ["Só de barco", "De teleférico", "Por escadas de ferro dentro de uma fenda na rocha", "Por um longo caminho de areia"] },
      { q: "Por que a comida e os hotéis são caros na ilha?", o: ["Por causa da taxa ambiental", "Porque quase tudo chega de avião ou de navio", "Porque só há hotéis de luxo", "Porque a ilha não tem restaurantes"] },
    ],
  },
  {
    text: "pt-4-discos",
    q: [
      { q: "O que o Thiago herdou?", o: ["Uma casa no Recife", "Uma pequena loja de discos", "Um café"] },
      { q: "O que ele encontrou nas caixas?", o: ["Fotos antigas", "Dinheiro", "Cadernos com a história de cada disco"] },
      { q: "Além dos velhos amigos do tio, quem começou a aparecer na loja?", o: ["Muitos jovens", "Turistas estrangeiros", "Jornalistas"] },
      { q: "O que o Thiago fez no final?", o: ["Vendeu a loja", "Pediu demissão e transformou a loja num café", "Voltou para São Paulo"] },
    ],
  },
  {
    text: "pt-4-trabalho-remoto",
    q: [
      { q: "Que fenômeno o artigo descreve?", o: ["Famílias que saem das capitais para cidades menores", "Jovens que vão morar no exterior", "Empresas que fecham seus escritórios"] },
      { q: "Qual vantagem NÃO é mencionada?", o: ["Aluguel mais barato", "Menos trânsito", "Salários mais altos"] },
      { q: "Que problema uma internet instável pode causar?", o: ["Contas mais altas", "Reuniões interrompidas", "Solidão"] },
      { q: "Que efeito os novos moradores podem ter nas cidades?", o: ["Os preços dos imóveis tendem a subir", "As lojas fecham", "O trânsito desaparece"] },
      { q: "Que modelo os especialistas acham que vai ser o mais comum?", o: ["Totalmente remoto", "Totalmente presencial", "Híbrido"] },
    ],
  },
  {
    text: "pt-4-boia",
    q: [
      { q: "O que Seu Osvaldo fazia antes de se aposentar?", o: ["Era professor de natação", "Dirigia ônibus em Belo Horizonte", "Era pescador", "Trabalhava num banco"] },
      { q: "Por que o Osvaldo nunca tinha aprendido a nadar?", o: ["Morava longe de qualquer água", "Os pais não deixavam", "Quando era menino, afundou num rio e nunca esqueceu a vergonha", "Era alérgico a cloro"] },
      { q: "O que o Osvaldo disse à Marlene que fazia nas manhãs de terça e quinta?", o: ["Levava a neta para a escola", "Fisioterapia para o joelho", "Trabalhava meio período como motorista", "Jogava futebol"] },
      { q: "O que foi mais difícil para o Osvaldo aprender?", o: ["Soltar o ar debaixo d'água", "Bater as pernas com a prancha", "Boiar de costas", "Mergulhar"] },
      { q: "Como a Marlene descobriu o segredo dele?", o: ["A Zuleica ligou para ela", "Encontrou uma sunga molhada e uma toalha com cheiro de cloro", "A Camila contou", "Seguiu o marido até a piscina"] },
      { q: "O que a Dona Zuleica respondeu à foto?", o: ["Que ia largar as aulas", "Que no ano seguinte quem ia nadar até a boia era ela", "Que ia para Guarapari", "Que o mar era perigoso demais"] },
    ],
  },
  {
    text: "pt-4-cafe",
    q: [
      { q: "De onde vem originalmente a planta do café arábica?", o: ["Do Iêmen", "Do Brasil", "Das montanhas da Etiópia", "Da Guiana Francesa"] },
      { q: "Segundo a história mais famosa, como as sementes de café chegaram ao Brasil em 1727?", o: ["Foram compradas legalmente em Lisboa", "Estavam escondidas num buquê dado a Francisco de Melo Palheta", "Um imigrante italiano trouxe", "Chegaram por acaso num navio de carga"] },
      { q: "Por que o café saiu do Pará e foi para o sul?", o: ["O clima quente e úmido da Amazônia não era ideal", "O governador do Pará proibiu o café", "Insetos destruíram as plantações", "Não havia porto no Pará"] },
      { q: "Como a cafeína diminui o cansaço?", o: ["Produz mais adenosina", "Dá energia extra ao cérebro", "Ocupa os receptores da adenosina sem ativá-los", "Ajuda o fígado a trabalhar mais rápido"] },
      { q: "O que acontece com quem toma café todos os dias?", o: ["Elimina a cafeína mais rápido", "O cérebro cria mais receptores, e a mesma dose faz menos efeito", "Deixa de sentir qualquer efeito", "Dorme melhor"] },
      { q: "O que as pesquisas mostraram sobre as abelhas e a cafeína no néctar?", o: ["A cafeína mata as abelhas", "As abelhas evitam as flores do café", "As abelhas lembram melhor o cheiro das flores e voltam mais vezes", "As próprias abelhas produzem cafeína"] },
    ],
  },
  {
    text: "pt-5-carta",
    q: [
      { q: "Quando a Helena abriu a cômoda?", o: ["No aniversário da avó", "Depois do enterro da avó", "Quando se mudou de casa"] },
      { q: "O que a carta tinha de estranho?", o: ["Nunca tinha sido enviada", "Não tinha selo", "Estava escrita em inglês"] },
      { q: "Por que a avó tinha saído de Portugal às pressas?", o: ["Ia estudar", "Ia se casar", "O pai dela tinha arranjado trabalho em Santos"] },
      { q: "O que a Helena ficou sabendo pela neta da amiga?", o: ["A amiga ainda estava viva", "A amiga também falava da amiga que tinha perdido", "A amiga também tinha se mudado para o Brasil"] },
      { q: "O que a Helena fez com a carta no final?", o: ["Guardou na gaveta", "Mandou pelo correio", "Entregou pessoalmente"] },
    ],
  },
  {
    text: "pt-5-rios-voadores",
    q: [
      { q: "O que são os “rios voadores”?", o: ["Rios que transbordam todo ano", "Fluxos de vapor d'água levados pelo ar", "Cachoeiras nos Andes"] },
      { q: "Qual é o papel das árvores?", o: ["Bloqueiam o vento", "Bombeiam a água do solo para o ar", "Absorvem a chuva"] },
      { q: "O que acontece quando o vapor encontra os Andes?", o: ["Vira neve", "É desviado para o sul", "Volta para o oceano"] },
      { q: "Segundo o texto, qual é uma possível consequência do desmatamento?", o: ["Mais chuva no Sul", "Invernos mais frios", "Um risco maior de secas prolongadas"] },
    ],
  },
  {
    text: "pt-5-diminutivo",
    q: [
      { q: "Segundo o ensaio, o que costuma ser, na prática, o “cafezinho rapidinho”?", o: ["Uma pausa de cinco minutos", "Uma hora de conversa na padaria da esquina", "Um café da máquina", "Uma reunião de trabalho"] },
      { q: "O que o autor diz sobre a maneira como os livros didáticos apresentam o diminutivo?", o: ["Ignoram o diminutivo completamente", "Tratam o diminutivo sobretudo como forma de diminuir as coisas, o que pouco ajuda quem aprende", "Explicam a ironia dele em detalhe", "Dizem que só se usa com crianças"] },
      { q: "Por que “Você me dá uma ajudinha?” soa melhor do que “Você me ajuda?”?", o: ["É mais correto gramaticalmente", "Pede menos ajuda", "O diminutivo suaviza o pedido e o torna mais fácil de aceitar", "É mais formal"] },
      { q: "Em que exemplo o sufixo intensifica em vez de diminuir?", o: ["casinha", "cedinho, que quer dizer “muito cedo”", "livrinho", "cachorrinho"] },
      { q: "O que Sérgio Buarque de Holanda queria dizer com “cordial”?", o: ["Educado e de boas maneiras", "Que vem do coração, o que pode incluir a raiva além do carinho", "Simpático com os estrangeiros", "Trabalhador"] },
      { q: "Qual é a conclusão mais modesta do autor?", o: ["O diminutivo prova que os brasileiros são mais gentis que os outros", "Só os brasileiros usam o diminutivo desse jeito", "O diminutivo virou uma ferramenta essencial para administrar a vida social no português do Brasil", "Quem aprende deve evitar o diminutivo"] },
    ],
  },
  {
    text: "pt-5-garfo",
    q: [
      { q: "Por que a Dona Lurdes dá ao Otávio a suíte da lareira?", o: ["Ele pagou a mais por ela", "Ela acha que ele é o crítico anônimo conhecido como o Garfo", "É o único quarto livre", "A irmã dele fez a reserva"] },
      { q: "O que o Otávio escreve de fato no caderno depois do menu-degustação?", o: ["Uma crítica dura sobre a espuma", "O nome dos nove pratos", "“Jantar: R$ 0,00”, sublinhado, com pontos de interrogação", "Um lembrete para ligar para a irmã"] },
      { q: "Que comentário o Otávio faz sobre o frango com quiabo da Cláudia?", o: ["Que é caro demais", "Que tem uns dois por cento de sal a mais", "Que precisa de mais quiabo", "Que é melhor do que a comida do Ramiro"] },
      { q: "Como o Ramiro reage no trem quando o Otávio diz que é contador?", o: ["Pede desculpas e vai embora", "Diz que é exatamente o que o Garfo diria", "Pede para ver a carteira profissional dele", "Ri e concorda"] },
      { q: "Onde a Cláudia encontra o caderno perdido?", o: ["Debaixo de um banco na praça principal", "No trem", "Perto da porta de uma pequena mercearia", "Na recepção da pousada"] },
      { q: "Por que o Otávio se levanta no banquete antes do primeiro prato?", o: ["Para fazer um brinde ao Ramiro", "Para contar a todos que é contador de verdade e se oferecer para pagar", "Para ler a nova coluna do Garfo", "Para reclamar do vinho"] },
      { q: "Segundo a coluna, qual foi a melhor refeição da semana do crítico?", o: ["O banquete no Tempero da Serra", "O café da manhã de uma pequena pousada", "O pastel no trem", "O pão de queijo na praça"] },
      { q: "O que a Dona Celeste deixa para o Otávio na recepção?", o: ["Uma garrafa de cachaça", "Uma capa de tricô para o caderno, com um garfo bordado", "A conta do quarto dela", "Um exemplar da coluna dela"] },
    ],
  },
  {
    text: "pt-6-farol",
    q: [
      { q: "O que o Orlando fez durante quarenta anos?", o: ["Pescou em volta da ilha", "Cuidou do farol", "Consertou geradores"] },
      { q: "Como ele reagiu quando perdeu o emprego?", o: ["Foi embora da ilha na mesma hora", "Protestou com raiva", "Assinou sem discutir, mas ficou na ilha"] },
      { q: "O que deu errado na noite da tempestade?", o: ["A luz acabou e o gerador não funcionou", "O farol pegou fogo", "Um barco bateu nas pedras"] },
      { q: "Como o Orlando ajudou o barco de pesca?", o: ["Chamou a guarda costeira", "Acendeu a velha lanterna no alto do farol", "Remou até lá para guiá-lo"] },
      { q: "O que ele fez com a carta da empresa?", o: ["Colocou num quadro", "Jogou fora", "Guardou numa gaveta sem terminar de ler"] },
    ],
  },
  {
    text: "pt-6-saudade",
    q: [
      { q: "Que afirmação comum sobre a “saudade” o autor questiona?", o: ["Que é uma palavra antiga", "Que é intraduzível e exclusiva do português", "Que só se usa na poesia"] },
      { q: "Segundo o autor, por que essa afirmação é fraca?", o: ["Nenhuma palavra de nenhuma língua se traduz com perfeição, e outras culturas conhecem esse sentimento", "Saudade tem um equivalente exato em inglês", "Poucos brasileiros usam a palavra"] },
      { q: "Segundo o texto, o que torna a saudade especial?", o: ["A grafia", "O lugar que ocupa na cultura e na fala do dia a dia", "A origem latina"] },
      { q: "Em que a saudade se diferencia da tristeza?", o: ["É sempre alegre", "Só diz respeito a lugares", "Pode ser dolorosa e doce ao mesmo tempo e supõe um vínculo que continua"] },
      { q: "O que o autor sugere nas últimas frases?", o: ["O desejo de possuir algo único é, ele mesmo, universal", "A saudade vai desaparecer", "Só os brasileiros sentem saudade"] },
    ],
  },
  {
    text: "pt-6-deriva",
    q: [
      { q: "Segundo o autor, por que o simples encaixe dos litorais não prova nada?", o: ["Porque os mapas do século XVI eram imprecisos", "Porque uma coincidência de formas não diz nada por si só, e os litorais mudam com o tempo", "Porque a África e a América do Sul nunca estiveram unidas", "Porque Ortelius já tinha refutado a ideia"] },
      { q: "Que linha de referência o estudo de computador de 1965 usou para encaixar os continentes?", o: ["As praias de hoje", "A foz dos grandes rios", "Uma linha a cerca de mil metros de profundidade, na borda da plataforma continental", "A Dorsal Mesoatlântica"] },
      { q: "Por que o mesossauro é uma prova importante da deriva continental?", o: ["Era um réptil grande, capaz de atravessar oceanos a nado", "Seus fósseis só aparecem no Brasil e no sul da África, e ele não poderia ter atravessado um oceano", "É encontrado em todos os continentes", "Vivia em geleiras perto do equador"] },
      { q: "Qual foi a principal objeção científica à teoria de Wegener?", o: ["Não havia provas fósseis", "Ele não conseguia explicar que força movia os continentes", "Os mapas dele dos litorais estavam errados", "Ele era um geólogo trabalhando fora da sua área"] },
      { q: "Como Wegener morreu?", o: ["Num naufrágio no Atlântico", "No gelo da Groenlândia, durante uma expedição em 1930", "De velhice, em Berlim", "Num acidente durante um congresso em Nova York"] },
      { q: "O que as “listras de zebra” magnéticas do fundo do oceano mostraram?", o: ["Que os continentes avançam rasgando o fundo do oceano", "Que o campo magnético da Terra nunca muda", "Que nova crosta se forma na dorsal e se espalha de forma simétrica para os dois lados", "Que pontes de terra já ligaram os continentes"] },
      { q: "Por que o Brasil quase não tem terremotos fortes nem vulcões?", o: ["Porque fica no meio da placa Sul-Americana, longe das bordas", "Porque o Atlântico está se fechando", "Porque as rochas são velhas demais", "Porque fica sobre a Dorsal Mesoatlântica"] },
      { q: "Que lição o autor tira desse episódio?", o: ["Os especialistas sempre erram sobre ideias novas", "Quem é de fora não deve propor teorias científicas", "A ciência avança quando as perguntas certas encontram as ferramentas capazes de respondê-las", "Uma teoria só precisa de provas visuais"] },
    ],
  },
  {
    text: "pt-6-discos-mare",
    q: [
      { q: "Como a Helena ganha a vida em São Paulo no começo da história?", o: ["Dá aulas num conservatório", "Toca teclado em jingles e em gravações de outras pessoas", "Vende discos usados", "Trabalha como técnica de som"] },
      { q: "Como a Cecília reage quando a Helena conta da herança?", o: ["Fica contente e quer visitar Salvador", "Diz para a Helena vender logo e não se meter", "Oferece ajuda para tocar a loja", "Diz que já sabia do testamento"] },
      { q: "O que está escrito na etiqueta da fita que a Helena encontra no quartinho?", o: ["“Coisas que não deram certo”", "“Para Lena — março de 1989”", "“Maré Alta — lado A”", "“Dona Zezé, 91 anos”"] },
      { q: "Como o tio pagou o piano que mandou para a Helena quando ela tinha doze anos?", o: ["Fez um empréstimo para um telhado novo", "Vendeu sua coleção de primeiras edições da Tropicália", "Vendeu o disco de teste do Maré Alta", "A Nalva emprestou o dinheiro"] },
      { q: "De onde vem o nome da loja?", o: ["Da maré da Baía de Todos-os-Santos", "De uma música da Dona Zezé", "Da banda em que o Dorival tocava antes de sair de São Paulo", "Da rua onde fica a loja"] },
      { q: "O que surpreende a Helena na roda de março?", o: ["Ninguém aparece", "A loja inteira conhece a música do tio e canta para ela", "O Fábio Linhares toca clarinete", "A mãe dela chega sem avisar"] },
      { q: "Por que o Dorival não foi ao enterro da mãe?", o: ["Recusou-se a ir por causa de uma briga com o pai", "Estava em turnê com a banda", "O telegrama ficou numa gaveta da pensão enquanto ele gravava em Sergipe", "Estava no hospital"] },
      { q: "Como a Helena termina “Maré de março” na última roda?", o: ["Em mi maior, como o tio sempre fazia", "Para no meio do refrão", "Deixa o acorde resolver em dó pela primeira vez", "A mãe dela toca o último acorde"] },
    ],
  },
];

export default data;
