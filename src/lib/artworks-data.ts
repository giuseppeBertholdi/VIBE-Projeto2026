import { Artwork } from "@/types";

export const ARTWORKS: Artwork[] = [
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    slug: "mona-lisa",
    artistId: "leonardo-da-vinci",
    year: 1503,
    medium: "Óleo sobre madeira de álamo",
    dimensions: "77 cm × 53 cm",
    location: "Museu do Louvre, Paris, França",
    locationLat: 48.8606,
    locationLng: 2.3376,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1920px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/500px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    description: "A Mona Lisa é a obra de arte mais famosa do mundo, pintada por Leonardo da Vinci entre 1503 e 1519. Representa uma mulher com um sorriso enigmático que fascinou gerações.",
    historicalCtx: "Pintada durante o Alto Renascimento italiano, período de extraordinária efervescência cultural, científica e artística na Itália.",
    politicalCtx: "A Itália estava fragmentada em cidades-estado rivais. Leonardo pintou a obra em Florença, sob o patronato de Francisco I da França, para quem a obra foi eventualmente vendida.",
    artisticCtx: "Leonardo usou a técnica sfumato — transições sutis de luz e sombra sem contornos definidos — revolucionando a pintura ocidental.",
    hiddenDetails: [
      { id: "1", title: "O sorriso ilusório", description: "O sorriso da Mona Lisa desaparece quando você olha diretamente para a boca. Isso ocorre porque Leonardo usou sfumato para criar ambiguidade visual." },
      { id: "2", title: "Sobrancelhas ausentes", description: "Pesquisas com scanner revelaram que a Mona Lisa originalmente tinha sobrancelhas e cílios, que foram removidos ao longo de restaurações." },
      { id: "3", title: "Ponte no fundo", description: "A ponte ao fundo à direita foi identificada como a Ponte Buriano, na Toscana italiana, confirmada em 2011." },
      { id: "4", title: "Números e letras", description: "Em 2010, especialistas descobriram com lupas de alta resolução os números 72 nos olhos da obra." }
    ],
    symbolism: [
      { symbol: "Paisagem assimétrica", meaning: "Representa a dualidade da natureza humana: racional e emocional", location: "Fundo" },
      { symbol: "Mãos cruzadas", meaning: "Simbolizam virtude e castidade na iconografia renascentista", location: "Mãos" },
      { symbol: "Véu transparente", meaning: "Indica luto ou gravidez na época", location: "Cabeça" }
    ],
    theories: [
      { title: "Lisa Gherardini", description: "A teoria mais aceita: ela seria Lisa Gherardini, esposa do comerciante Francesco del Giocondo.", credibility: "ACCEPTED" },
      { title: "Autorretrato feminino", description: "Alguns historiadores sugerem que é um autorretrato de Leonardo como mulher.", credibility: "DEBATED" },
      { title: "Isabella d'Este", description: "Outros acreditam ser Isabella d'Este, marquesa de Mântua.", credibility: "SPECULATIVE" }
    ],
    movements: ["Renascimento", "Alto Renascimento"],
    tags: ["retrato", "sfumato", "Florença", "Leonardo"],
    theme: {
      primaryColor: "#8B6914",
      secondaryColor: "#D4AF37",
      accentColor: "#F5DEB3",
      bgGradient: "from-amber-950 via-amber-900 to-stone-900",
      textColor: "#FDF6E3",
      particleEffect: "dust",
      animationStyle: "smooth"
    },
    aiSystemPrompt: "Você é um especialista mundial em Leonardo da Vinci e na Mona Lisa. Explique a obra com profundidade histórica, técnica e filosófica. Adapte sua linguagem ao nível do usuário.",
    artist: {
      id: "leonardo-da-vinci",
      name: "Leonardo da Vinci",
      nationality: "Italiano",
      birthYear: 1452,
      deathYear: 1519,
      bio: "Pintor, escultor, arquiteto, músico, matemático, engenheiro, inventor, anatomista, geólogo, botânico e escritor italiano do Renascimento.",
      movements: ["Renascimento", "Alto Renascimento"],
      slug: "leonardo-da-vinci"
    }
  },
  {
    id: "the-scream",
    title: "O Grito",
    slug: "o-grito",
    artistId: "edvard-munch",
    year: 1893,
    medium: "Têmpera sobre cartão",
    dimensions: "91 cm × 73,5 cm",
    location: "Galeria Nacional, Oslo, Noruega",
    locationLat: 59.9139,
    locationLng: 10.7522,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1920px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/500px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    description: "O Grito é a obra mais famosa do expressionismo, representando a angústia existencial humana com um céu em chamas e uma figura com expressão de horror.",
    historicalCtx: "Criada no fim do século XIX, período de grande ansiedade social e filosófica na Europa, marcado pelo niilismo de Nietzsche e o nascimento da psicanálise de Freud.",
    politicalCtx: "A Noruega buscava independência da Suécia. O clima político e social era de tensão e transformação.",
    artisticCtx: "Munch foi pioneiro do Expressionismo, movimento que privilegia a expressão emocional sobre a representação realista.",
    hiddenDetails: [
      { id: "1", title: "Céu vermelho real", description: "Em 1883, a erupção do vulcão Krakatoa causou pores do sol vermelhos intensos ao redor do mundo, que Munch pode ter testemunhado." },
      { id: "2", title: "Inscrição secreta", description: "Por décadas, uma inscrição no quadro — 'Só poderia ter sido pintado por um louco' — foi atribuída a vândalos, mas em 2021 confirmou-se ser da própria mão de Munch." },
      { id: "3", title: "Múltiplas versões", description: "Munch criou 4 versões de O Grito: duas em pintura, uma em pastel e uma em litografia." }
    ],
    symbolism: [
      { symbol: "Figura sem gênero", meaning: "Representa a humanidade universal em angústia, não um indivíduo", location: "Centro" },
      { symbol: "Céu ondulante", meaning: "Manifesta o estado interior do artista — o mundo externo reflete o caos interno", location: "Céu" },
      { symbol: "Duas figuras ao fundo", meaning: "Representam amigos de Munch, indiferentes à sua angústia", location: "Fundo" }
    ],
    theories: [
      { title: "Crise de ansiedade pessoal", description: "Munch descreveu em seu diário uma crise de ansiedade durante um passeio que inspirou a obra.", credibility: "ACCEPTED" },
      { title: "Erupção vulcânica", description: "O céu vermelho seria inspirado pelos crepúsculos anormais causados pela erupção do Krakatoa.", credibility: "DEBATED" }
    ],
    movements: ["Expressionismo", "Simbolismo"],
    tags: ["angústia", "existencialismo", "Noruega", "expressionismo"],
    theme: {
      primaryColor: "#CC4400",
      secondaryColor: "#FF6B35",
      accentColor: "#FFD700",
      bgGradient: "from-orange-950 via-red-900 to-yellow-950",
      textColor: "#FFF8F0",
      particleEffect: "waves",
      animationStyle: "dramatic"
    },
    aiSystemPrompt: "Você é um especialista em Edvard Munch e no Expressionismo. Explique O Grito com profundidade psicológica, histórica e artística.",
    artist: {
      id: "edvard-munch",
      name: "Edvard Munch",
      nationality: "Norueguês",
      birthYear: 1863,
      deathYear: 1944,
      bio: "Pintor expressionista norueguês famoso por suas obras introspectivas sobre a condição humana e a ansiedade existencial.",
      movements: ["Expressionismo", "Simbolismo"],
      slug: "edvard-munch"
    }
  },
  {
    id: "guernica",
    title: "Guernica",
    slug: "guernica",
    artistId: "pablo-picasso",
    year: 1937,
    medium: "Óleo sobre tela",
    dimensions: "349 cm × 776 cm",
    location: "Museo Reina Sofía, Madri, Espanha",
    locationLat: 40.4088,
    locationLng: -3.6942,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
    description: "Guernica é o grito de Picasso contra a brutalidade da guerra. Pintada em resposta ao bombardeio da cidade basca de Guernica pela Alemanha nazista durante a Guerra Civil Espanhola.",
    historicalCtx: "Em 26 de abril de 1937, aviões nazistas e fascistas italianos bombardearam a cidade basca de Guernica, matando centenas de civis inocentes.",
    politicalCtx: "A Espanha vivia a Guerra Civil (1936-1939) entre as forças republicanas e os fascistas de Franco, apoiados por Hitler e Mussolini.",
    artisticCtx: "Picasso usou o Cubismo para fragmentar a realidade — mostrando múltiplas perspectivas simultaneamente — ampliando o horror do bombardeio.",
    hiddenDetails: [
      { id: "1", title: "Olho de Deus", description: "A lâmpada elétrica no topo da obra tem a forma de um olho, representando o olho vigilante de Deus — ou a sua ausência — durante o horror." },
      { id: "2", title: "Crânios escondidos", description: "Pesquisadores identificaram crânios humanos escondidos nas formas do cavalo e do touro." },
      { id: "3", title: "Picasso se recusou", description: "Picasso se recusou a deixar a obra ir para a Espanha enquanto Franco estivesse no poder. Ela só voltou em 1981." }
    ],
    symbolism: [
      { symbol: "Touro", meaning: "Simboliza a brutalidade e o fascismo espanhol", location: "Esquerda" },
      { symbol: "Cavalo ferido", meaning: "Representa o povo espanhol sofrendo", location: "Centro" },
      { symbol: "Flor entre escombros", meaning: "A esperança que persiste mesmo diante do horror", location: "Centro-baixo" },
      { symbol: "Paleta monocromática", meaning: "A escolha de apenas preto, branco e cinza evoca a morte, fotos de jornais e a frieza da guerra", location: "Todo o quadro" }
    ],
    theories: [
      { title: "Manifesto pacifista", description: "A obra foi criada como um protesto político explícito contra a guerra e o fascismo.", credibility: "ACCEPTED" }
    ],
    movements: ["Cubismo", "Arte Moderna", "Expressionismo"],
    tags: ["guerra", "cubismo", "política", "Espanha", "fascismo"],
    theme: {
      primaryColor: "#1a1a1a",
      secondaryColor: "#4a4a4a",
      accentColor: "#e0e0e0",
      bgGradient: "from-gray-950 via-zinc-900 to-neutral-900",
      textColor: "#F5F5F5",
      particleEffect: "fragments",
      animationStyle: "fragmented"
    },
    aiSystemPrompt: "Você é um especialista em Pablo Picasso, no Cubismo e na Guerra Civil Espanhola. Explique Guernica com profundidade política, histórica e artística.",
    artist: {
      id: "pablo-picasso",
      name: "Pablo Picasso",
      nationality: "Espanhol",
      birthYear: 1881,
      deathYear: 1973,
      bio: "Co-fundador do Cubismo, um dos artistas mais influentes do século XX, com uma produção vastíssima e revolucionária.",
      movements: ["Cubismo", "Surrealismo", "Arte Moderna"],
      slug: "pablo-picasso"
    }
  },
  {
    id: "starry-night",
    title: "A Noite Estrelada",
    slug: "noite-estrelada",
    artistId: "vincent-van-gogh",
    year: 1889,
    medium: "Óleo sobre tela",
    dimensions: "73,7 cm × 92,1 cm",
    location: "MoMA, Nova York, EUA",
    locationLat: 40.7614,
    locationLng: -73.9776,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1920px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/500px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    description: "A Noite Estrelada retrata o céu noturno sobre Saint-Rémy-de-Provence, pintada por Van Gogh durante sua internação em um asilo. É uma das obras mais reconhecidas da história da arte.",
    historicalCtx: "Van Gogh pintou a obra em junho de 1889, durante sua internação voluntária no asilo Saint-Paul-de-Mausole, após cortar sua própria orelha.",
    politicalCtx: "A França da Belle Époque vivia um período de industrialização acelerada e tensões sociais, contrastando com a busca espiritual de Van Gogh.",
    artisticCtx: "Van Gogh usa pinceladas vigorosas e cores vivas para transmitir emoção — técnica que influenciou profundamente o Expressionismo.",
    hiddenDetails: [
      { id: "1", title: "Turbulência científica", description: "Físicos descobriram que os redemoinhos de Van Gogh representam com precisão matemática a turbulência de Kolmogorov — fenômeno descrito pela física moderna." },
      { id: "2", title: "A vila não é real", description: "A vila ao fundo foi inventada por Van Gogh — ela não existe em Saint-Rémy. Era uma composição mental." },
      { id: "3", title: "Cipreste guardião", description: "O cipreste à esquerda era símbolo de morte e eternidade na cultura mediterrânea — Van Gogh o via como 'uma chama preta'." }
    ],
    symbolism: [
      { symbol: "Cipreste", meaning: "Ligação entre a terra e o céu, vida e morte", location: "Esquerda" },
      { symbol: "Lua crescente", meaning: "Renovação e ciclos da natureza", location: "Direita" },
      { symbol: "Redemoinho de luz", meaning: "A energia divina que permeia o universo — influência do Japão e do misticismo", location: "Céu" }
    ],
    theories: [
      { title: "Representação do Éden", description: "A vila iluminada representaria esperança e civilização humana em contraste com o cosmos indiferente.", credibility: "DEBATED" },
      { title: "Visão de um manicômio", description: "A obra seria literalmente a vista da janela do quarto de Van Gogh, com elementos imaginados.", credibility: "ACCEPTED" }
    ],
    movements: ["Pós-Impressionismo"],
    tags: ["pós-impressionismo", "céu", "Van Gogh", "emoção"],
    theme: {
      primaryColor: "#1B3A6B",
      secondaryColor: "#2E5090",
      accentColor: "#F5C842",
      bgGradient: "from-blue-950 via-indigo-900 to-violet-950",
      textColor: "#E8F4FD",
      particleEffect: "stars",
      animationStyle: "fluid"
    },
    aiSystemPrompt: "Você é um especialista em Vincent van Gogh e no Pós-Impressionismo. Explique A Noite Estrelada com profundidade psicológica, científica e artística.",
    artist: {
      id: "vincent-van-gogh",
      name: "Vincent van Gogh",
      nationality: "Holandês",
      birthYear: 1853,
      deathYear: 1890,
      bio: "Pintor pós-impressionista holandês cujas obras expressivas e coloridas influenciaram profundamente a arte ocidental.",
      movements: ["Pós-Impressionismo"],
      slug: "vincent-van-gogh"
    }
  },
  {
    id: "girl-pearl-earring",
    title: "Moça com Brinco de Pérola",
    slug: "moca-brinco-perola",
    artistId: "johannes-vermeer",
    year: 1665,
    medium: "Óleo sobre tela",
    dimensions: "44,5 cm × 39 cm",
    location: "Mauritshuis, Haia, Holanda",
    locationLat: 52.0799,
    locationLng: 4.3144,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1920px-1665_Girl_with_a_Pearl_Earring.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/500px-1665_Girl_with_a_Pearl_Earring.jpg",
    description: "Conhecida como a 'Mona Lisa do Norte', esta obra de Vermeer retrata uma jovem de identidade desconhecida, cujo olhar e brinco de pérola fascinam há séculos.",
    historicalCtx: "Pintada durante a Era de Ouro holandesa, período de expansão colonial e enriquecimento sem precedentes da Holanda.",
    politicalCtx: "A República das Províncias Unidas era a potência econômica mundial, com a VOC dominando o comércio global.",
    artisticCtx: "Vermeer era mestre no uso da luz natural — provavelmente usando uma câmara obscura para capturar detalhes com precisão fotográfica.",
    hiddenDetails: [
      { id: "1", title: "Câmara Obscura", description: "Pesquisadores acreditam que Vermeer usava uma câmara obscura — precursora da câmera fotográfica — para projetar imagens que depois pintava." },
      { id: "2", title: "Pérola inexistente", description: "Análises revelaram que o 'brinco' provavelmente não era uma pérola, mas vidro ou estanho pintado — pérolas reais não teriam esse brilho." },
      { id: "3", title: "Identidade desconhecida", description: "Nunca se descobriu quem era a jovem. Pode ser a filha de Vermeer, Maria, ou uma modelo profissional." }
    ],
    symbolism: [
      { symbol: "Brinco de pérola", meaning: "A pérola simbolizava pureza, mas também riqueza e sedução no século XVII", location: "Orelha" },
      { symbol: "Fundo escuro", meaning: "O contraste radical entre o rosto iluminado e o fundo negro cria mistério e intimidade", location: "Fundo" },
      { symbol: "Lábios entreabertos", meaning: "Sugerem um momento capturado — como se a jovem fosse dizer algo", location: "Boca" }
    ],
    theories: [
      { title: "Tronie, não retrato", description: "A obra seria uma 'tronie' — estudo de expressão facial — não um retrato encomendado.", credibility: "ACCEPTED" }
    ],
    movements: ["Época de Ouro Holandesa", "Barroco"],
    tags: ["retrato", "Holanda", "Barroco", "luz"],
    theme: {
      primaryColor: "#1C3A52",
      secondaryColor: "#2D6A8A",
      accentColor: "#E8C870",
      bgGradient: "from-slate-950 via-blue-950 to-indigo-950",
      textColor: "#F0E8D8",
      particleEffect: "dust",
      animationStyle: "smooth"
    },
    aiSystemPrompt: "Você é um especialista em Johannes Vermeer e na Era de Ouro Holandesa. Explique a Moça com Brinco de Pérola com profundidade histórica, técnica e artística.",
    artist: {
      id: "johannes-vermeer",
      name: "Johannes Vermeer",
      nationality: "Holandês",
      birthYear: 1632,
      deathYear: 1675,
      bio: "Pintor barroco holandês famoso por suas representações íntimas de interiores domésticos e seu domínio da luz.",
      movements: ["Barroco", "Época de Ouro Holandesa"],
      slug: "johannes-vermeer"
    }
  },
  {
    id: "birth-of-venus",
    title: "O Nascimento de Vênus",
    slug: "nascimento-venus",
    artistId: "sandro-botticelli",
    year: 1485,
    medium: "Têmpera sobre tela",
    dimensions: "172,5 cm × 278,9 cm",
    location: "Galleria degli Uffizi, Florença, Itália",
    locationLat: 43.7687,
    locationLng: 11.2551,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1920px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/500px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    description: "O Nascimento de Vênus é uma das obras mais icônicas do Renascimento, retratando a deusa do amor emergindo do mar já adulta, numa concha.",
    historicalCtx: "Pintada sob encomenda da família Médici, os mecenas mais poderosos do Renascimento florentino.",
    politicalCtx: "Florença vivia seu auge cultural e econômico sob o patrocínio de Lorenzo de' Medici, 'O Magnífico'.",
    artisticCtx: "A obra marcou o retorno dos temas da mitologia greco-romana na arte cristã ocidental, uma revolução cultural enorme.",
    hiddenDetails: [
      { id: "1", title: "Modelo real", description: "Acredita-se que o modelo para Vênus foi Simonetta Vespucci, amante platônica de Giuliano de' Medici, que morreu aos 22 anos." },
      { id: "2", title: "Tamanho real", description: "A obra mede quase 3 metros de largura — uma das maiores pinturas de mitologia clássica do Renascimento." },
      { id: "3", title: "Técnica incomum", description: "Botticelli usou têmpera sobre tela (não madeira), incomum para a época, o que contribuiu para a delicadeza das cores." }
    ],
    symbolism: [
      { symbol: "Concha", meaning: "Na mitologia, Vênus nasceu da espuma do mar sobre uma concha — símbolo de fertilidade e nascimento", location: "Centro" },
      { symbol: "Zéfiro e Clóris", meaning: "O vento do oeste trazendo Vênus para a terra — a união do céu com a terra gerando beleza", location: "Esquerda" },
      { symbol: "Manto florido", meaning: "A ninfa Hora oferece um manto com flores de laranjeira — símbolo de casamento e fertilidade", location: "Direita" }
    ],
    theories: [
      { title: "Síntese pagão-cristã", description: "A obra reconcilia temas pagãos com a filosofia neoplatônica, mostrando a beleza como reflexo do divino.", credibility: "ACCEPTED" }
    ],
    movements: ["Renascimento", "Quattrocento"],
    tags: ["mitologia", "Renascimento", "beleza", "Florença"],
    theme: {
      primaryColor: "#1A4A5A",
      secondaryColor: "#2E8B6A",
      accentColor: "#F5E6C8",
      bgGradient: "from-teal-950 via-cyan-900 to-emerald-950",
      textColor: "#F5EFE6",
      particleEffect: "waves",
      animationStyle: "fluid"
    },
    aiSystemPrompt: "Você é um especialista em Sandro Botticelli e no Renascimento florentino. Explique O Nascimento de Vênus com profundidade mitológica, histórica e artística.",
    artist: {
      id: "sandro-botticelli",
      name: "Sandro Botticelli",
      nationality: "Italiano",
      birthYear: 1445,
      deathYear: 1510,
      bio: "Pintor florentino do Renascimento, conhecido por seu estilo linear elegante e obras de tema mitológico e religioso.",
      movements: ["Renascimento", "Quattrocento"],
      slug: "sandro-botticelli"
    }
  },
  {
    id: "persistence-of-memory",
    title: "A Persistência da Memória",
    slug: "persistencia-da-memoria",
    artistId: "salvador-dali",
    year: 1931,
    medium: "Óleo sobre tela",
    dimensions: "24 cm × 33 cm",
    location: "MoMA, Nova York, EUA",
    locationLat: 40.7614,
    locationLng: -73.9776,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    description: "Com seus relógios derretidos numa paisagem desértica surreal, A Persistência da Memória é a obra mais famosa do Surrealismo e uma meditação sobre o tempo e a memória.",
    historicalCtx: "Pintada em 1931, durante a Grande Depressão e a ascensão do fascismo na Europa, o Surrealismo era uma resposta artística ao caos do mundo moderno.",
    politicalCtx: "A Espanha de Dalí vivia tensões que levariam à Guerra Civil em 1936. O Surrealismo rejeitava a razão que havia levado ao horror da Primeira Guerra Mundial.",
    artisticCtx: "Dalí usou o 'método paranóico-crítico' — uma técnica para acessar o inconsciente através de estados alucinatórios autoinduzidos.",
    hiddenDetails: [
      { id: "1", title: "Inspiração no queijo", description: "Dalí afirmou ter sido inspirado por um queijo camembert derretendo na mesa enquanto Gala saía para o cinema." },
      { id: "2", title: "Tamanho pequeno", description: "A obra mede apenas 24×33 cm — menor que uma folha A4. Sua fama contrasta com seu tamanho diminuto." },
      { id: "3", title: "A figura estranha", description: "A forma mole no centro é um autorretrato distorcido de Dalí, baseado em uma figura que ele via nos sonhos." }
    ],
    symbolism: [
      { symbol: "Relógios derretendo", meaning: "O tempo é relativo e maleável — influência da teoria da relatividade de Einstein", location: "Todo o quadro" },
      { symbol: "Moscas no relógio laranja", meaning: "A decomposição e a inevitabilidade da morte", location: "Esquerda" },
      { symbol: "Paisagem de Cap de Creus", meaning: "A formação rochosa é a Costa Brava catalã, terra natal de Dalí", location: "Fundo" }
    ],
    theories: [
      { title: "Relatividade do tempo", description: "Os relógios derretidos seriam uma interpretação visual da relatividade do tempo de Einstein.", credibility: "DEBATED" },
      { title: "Sonho e inconsciente", description: "A paisagem represetaria um estado onírico, explorando o inconsciente freudiano.", credibility: "ACCEPTED" }
    ],
    movements: ["Surrealismo"],
    tags: ["surrealismo", "tempo", "sonho", "Dalí"],
    theme: {
      primaryColor: "#8B4513",
      secondaryColor: "#DAA520",
      accentColor: "#87CEEB",
      bgGradient: "from-amber-950 via-orange-900 to-sky-950",
      textColor: "#FFF8DC",
      particleEffect: "dust",
      animationStyle: "dramatic"
    },
    aiSystemPrompt: "Você é um especialista em Salvador Dalí e no Surrealismo. Explique A Persistência da Memória com profundidade psicológica, filosófica e artística.",
    artist: {
      id: "salvador-dali",
      name: "Salvador Dalí",
      nationality: "Espanhol",
      birthYear: 1904,
      deathYear: 1989,
      bio: "Artista surrealista espanhol conhecido por suas imagens oníricas e técnica realista aplicada a conceitos absurdos.",
      movements: ["Surrealismo"],
      slug: "salvador-dali"
    }
  },
  {
    id: "american-gothic",
    title: "American Gothic",
    slug: "american-gothic",
    artistId: "grant-wood",
    year: 1930,
    medium: "Óleo sobre papel de cedro",
    dimensions: "74 cm × 62 cm",
    location: "Art Institute of Chicago, EUA",
    locationLat: 41.8796,
    locationLng: -87.6237,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/1920px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/500px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
    description: "American Gothic é um dos símbolos mais icônicos da arte americana, retratando um homem com forcado e uma mulher em frente a uma casa de estilo Carpenter Gothic.",
    historicalCtx: "Pintada em 1930, durante o início da Grande Depressão, quando milhões de americanos perderam tudo e o Meio-Oeste era o epicentro de uma crise agrária.",
    politicalCtx: "Os EUA de Herbert Hoover lidavam com o crash de 1929 e o início da Grande Depressão. Os valores do interior americano eram exaltados como resistência.",
    artisticCtx: "Wood era parte do Regionalismo Americano, movimento que valorizava a vida rural americana em contraste com as vanguardas europeias.",
    hiddenDetails: [
      { id: "1", title: "Não são marido e mulher", description: "Wood disse que os dois são pai e filha, não um casal — embora a leitura popular seja de esposos." },
      { id: "2", title: "Modelos reais", description: "Os modelos foram a irmã de Wood, Nan, e o dentista da cidade, Byron McKeeby." },
      { id: "3", title: "Casa real", description: "A casa existe até hoje em Eldon, Iowa, e se tornou atração turística." }
    ],
    symbolism: [
      { symbol: "Forcado de três dentes", meaning: "Trabalho duro, determinação e os valores puritanos do camponês americano", location: "Centro" },
      { symbol: "Casa Gothic", meaning: "Aspirações acima da posição social — uma casa elaborada para pessoas simples", location: "Fundo" }
    ],
    theories: [
      { title: "Crítica ou homenagem?", description: "Historians debate: Wood estava satirizando o provincianismo americano ou homenageando sua resiliência?", credibility: "DEBATED" }
    ],
    movements: ["Regionalismo Americano"],
    tags: ["América", "rural", "depressão", "regionalismo"],
    theme: {
      primaryColor: "#4A6741",
      secondaryColor: "#8B7355",
      accentColor: "#D4C5A0",
      bgGradient: "from-green-950 via-stone-900 to-amber-950",
      textColor: "#F5F0E8",
      particleEffect: "none",
      animationStyle: "smooth"
    },
    aiSystemPrompt: "Você é um especialista em Grant Wood e no Regionalismo Americano. Explique American Gothic com profundidade histórica, social e artística.",
    artist: {
      id: "grant-wood",
      name: "Grant Wood",
      nationality: "Americano",
      birthYear: 1891,
      deathYear: 1942,
      bio: "Pintor regionalista americano, famoso por retratar a vida rural do Meio-Oeste americano.",
      movements: ["Regionalismo Americano"],
      slug: "grant-wood"
    }
  },
  {
    id: "liberty-leading-the-people",
    title: "A Liberdade Guiando o Povo",
    slug: "liberdade-guiando-povo",
    artistId: "eugene-delacroix",
    year: 1830,
    medium: "Óleo sobre tela",
    dimensions: "260 cm × 325 cm",
    location: "Museu do Louvre, Paris, França",
    locationLat: 48.8606,
    locationLng: 2.3376,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/1920px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/500px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
    description: "Uma das obras políticas mais poderosas da história, retrata a Revolução de Julho de 1830 na França, com a figura alegórica da Liberdade liderando o povo.",
    historicalCtx: "Pintada em resposta às Três Gloriosas — a revolução de julho de 1830 que derrubou Carlos X e instalou a Monarquia de Julho de Luís Filipe.",
    politicalCtx: "A França pós-napoleônica oscilava entre monarquia e república. A revolução de 1830 foi um marco na luta pelos ideais de 1789.",
    artisticCtx: "Delacroix foi o líder do Romantismo francês, usando cores vibrantes, movimento e emoção em contraste com o Neoclassicismo frio de David.",
    hiddenDetails: [
      { id: "1", title: "Delacroix não lutou", description: "Delacroix não participou das barricadas — ele os observou das janelas de um apartamento seguro." },
      { id: "2", title: "O menino com pistolas", description: "O menino à esquerda inspirou o personagem Gavroche em Os Miseráveis, de Victor Hugo." },
      { id: "3", title: "Seios descobertos", description: "Os seios expostos da Liberdade eram escandalizantes na época mas representam a natureza pura e não-subjugada da liberdade." }
    ],
    symbolism: [
      { symbol: "Tricolor francesa", meaning: "A bandeira representa os ideais de Liberdade, Igualdade e Fraternidade", location: "Topo" },
      { symbol: "Barrete frígio", meaning: "Símbolo da liberdade desde a Roma Antiga, usado por escravos libertos", location: "Cabeça da Liberdade" },
      { symbol: "Pirâmide de corpos", meaning: "As classes sociais unidas em morte pela liberdade — operário, estudante, burguês", location: "Primeiro plano" }
    ],
    theories: [
      { title: "Liberdade como deusa pagã", description: "A figura seria uma reinterpretação da deusa Atena ou Nike, adaptada para o contexto republicano.", credibility: "ACCEPTED" }
    ],
    movements: ["Romantismo"],
    tags: ["revolução", "França", "Romantismo", "política"],
    theme: {
      primaryColor: "#1B3A8C",
      secondaryColor: "#C0392B",
      accentColor: "#F5F5DC",
      bgGradient: "from-blue-950 via-red-950 to-stone-900",
      textColor: "#F8F8FF",
      particleEffect: "fragments",
      animationStyle: "dramatic"
    },
    aiSystemPrompt: "Você é um especialista em Eugène Delacroix e no Romantismo francês. Explique A Liberdade Guiando o Povo com profundidade histórica, política e artística.",
    artist: {
      id: "eugene-delacroix",
      name: "Eugène Delacroix",
      nationality: "Francês",
      birthYear: 1798,
      deathYear: 1863,
      bio: "Líder do Romantismo francês, conhecido por composições dramáticas, uso expressivo da cor e temas históricos e literários.",
      movements: ["Romantismo"],
      slug: "eugene-delacroix"
    }
  },
  {
    id: "las-meninas",
    title: "Las Meninas",
    slug: "las-meninas",
    artistId: "diego-velazquez",
    year: 1656,
    medium: "Óleo sobre tela",
    dimensions: "318 cm × 276 cm",
    location: "Museo del Prado, Madri, Espanha",
    locationLat: 40.4138,
    locationLng: -3.6921,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/1920px-Las_Meninas_01.jpg",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/500px-Las_Meninas_01.jpg",
    description: "Las Meninas é considerada por muitos a maior pintura já feita. Uma obra de complexidade filosófica extraordinária que questiona a natureza da representação e do olhar.",
    historicalCtx: "Pintada na corte de Filipe IV da Espanha, no auge e ao mesmo tempo no declínio do Império Espanhol.",
    politicalCtx: "A Espanha perdia gradualmente sua hegemonia europeia para a França e a Holanda, mas ainda mantinha um dos maiores impérios coloniais do mundo.",
    artisticCtx: "Velázquez usou uma perspectiva e composição radicais: o artista se retrata pintando, os reis aparecem apenas num espelho ao fundo.",
    hiddenDetails: [
      { id: "1", title: "O que Velázquez está pintando?", description: "Nunca saberemos com certeza o que está na tela que Velázquez pinta. Provavelmente, o próprio quadro Las Meninas." },
      { id: "2", title: "Espelho mágico", description: "O espelho ao fundo reflete o rei Filipe IV e a rainha Mariana — os verdadeiros sujeitos da pintura. Mas seriam o reflexo do quadro de Velázquez?" },
      { id: "3", title: "Autorretrato com Cruz", description: "A Cruz de Santiago na roupa de Velázquez foi adicionada anos depois por ordem do rei, que concedeu ao artista a honraria post-mortem." }
    ],
    symbolism: [
      { symbol: "Espelho ao fundo", meaning: "Questiona o que é representação e o que é realidade — influência direta na Filosofia do século XX", location: "Fundo" },
      { symbol: "Velázquez se autorretratando", meaning: "O artista reivindica seu status social igual ao da nobreza que retrata", location: "Esquerda" },
      { symbol: "Infanta Margarida no centro", meaning: "A verdadeira herdeira do poder real, colocada como pivot de toda a composição", location: "Centro" }
    ],
    theories: [
      { title: "Jogo de espelhos filosófico", description: "Michel Foucault dedicou o primeiro capítulo de 'As Palavras e as Coisas' a analisar Las Meninas como paradigma da representação.", credibility: "ACCEPTED" }
    ],
    movements: ["Barroco", "Século de Ouro Espanhol"],
    tags: ["Barroco", "Espanha", "realeza", "Velázquez"],
    theme: {
      primaryColor: "#3D2B1F",
      secondaryColor: "#6B4423",
      accentColor: "#D4B896",
      bgGradient: "from-stone-950 via-amber-950 to-zinc-900",
      textColor: "#F5EFEA",
      particleEffect: "dust",
      animationStyle: "smooth"
    },
    aiSystemPrompt: "Você é um especialista em Diego Velázquez e no Barroco espanhol. Explique Las Meninas com profundidade filosófica, histórica e artística.",
    artist: {
      id: "diego-velazquez",
      name: "Diego Velázquez",
      nationality: "Espanhol",
      birthYear: 1599,
      deathYear: 1660,
      bio: "Pintor barroco espanhol, pintor da corte de Filipe IV, considerado um dos maiores mestres da história da pintura.",
      movements: ["Barroco", "Século de Ouro Espanhol"],
      slug: "diego-velazquez"
    }
  }
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return ARTWORKS.find(a => a.slug === slug);
}

export function getArtworkById(id: string): Artwork | undefined {
  return ARTWORKS.find(a => a.id === id);
}
