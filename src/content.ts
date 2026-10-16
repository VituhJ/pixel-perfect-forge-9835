// Todos os textos da página ficam aqui. Edite livremente.
export const CHECKOUT_URL = "[COLE AQUI O LINK DO CHECKOUT]";

export type Testimonial = { name: string; action: string; result: string; context?: "dor" | "bonus" };
// Deixe vazio até ter depoimentos reais. Use context: "dor" ou "bonus" para os blocos 7 e 9.
export const testimonials: Testimonial[] = [];

export const PRODUCT = "Influenciador de IA Pronto em 1 Dia";

export const seo = {
  title: "Influenciador de IA Pronto em 1 Dia | Kit copia e cola para iniciantes",
  description:
    "Crie seu personagem virtual com IA e publique o primeiro vídeo, sem aparecer e sem experiência. Kit em PDF com prompts, roteiros e 4 bônus.",
};

export const logoPlaceholder = "[SEU LOGO AQUI]";

export const covers = [
  "Influenciador de IA Pronto em 1 Dia",
  "Guia: do Zero ao Primeiro Vídeo",
  "30 Ideias de Vídeos",
  "15 Erros + Uso Responsável",
  "50 Personagens Prontos",
];

export const hero = {
  h1: "Seu primeiro vídeo com influenciador de IA em 1 dia, só copiando e colando: Influenciador de IA Pronto em 1 Dia.",
  subtitle:
    "Chega de gerar imagem que sai com um rosto diferente a cada vez. Você ganha o passo a passo, os prompts e os roteiros prontos para quem nunca usou IA.",
  badges: ["Kit em PDF", "Acesso imediato", "7 dias de garantia"],
  phoneTag: "Personagem criado com IA",
  phoneCaption: "Oi! Eu sou sua nova criadora de conteúdo…",
};

export const steps = {
  title: "Esses são os 5 passos para publicar o seu primeiro vídeo com um influenciador de IA",
  items: [
    ["Defina o personagem.", "Preencha uma ficha simples em 15 minutos."],
    ["Crie o rosto.", "Copie os prompts prontos e gere o seu personagem."],
    ["Escolha o roteiro e a voz.", "Troque os campos entre colchetes e pronto."],
    ["Gere o vídeo.", "Envie a imagem e o roteiro para a ferramenta de avatar falante."],
    ["Publique.", "Use a legenda pronta e coloque o primeiro vídeo no ar."],
  ],
};

export const summary = {
  title: "No Influenciador de IA Pronto em 1 Dia você vai ter acesso imediato a:",
  items: [
    "Ficha do personagem + descrição-âncora (para o rosto não mudar)",
    "20 prompts prontos de rosto e personagem",
    "10 roteiros prontos de vídeos de 30 segundos",
    "Passo a passo do vídeo + legenda pronta + lista de ferramentas na ordem de uso",
    "Bônus 1: Guia passo a passo do zero ao primeiro vídeo",
    "Bônus 2: 30 ideias de vídeos para o primeiro mês",
    "Bônus 3: Os 15 erros que deixam seu influenciador com cara de robô + regras de uso responsável",
    "Bônus 4: Banco com 50 personagens prontos por nicho",
  ],
};

export const perfectFor = [
  "Perfeito para quem quer criar vídeos com um personagem virtual, mas não sabe nem por onde começar.",
  "Serve para iniciantes em IA que querem publicar sem aparecer na câmera e sem aprender edição.",
];

export const testimonialsTitle =
  "Quem já aplicou o Influenciador de IA Pronto em 1 Dia teve esse resultado:";

export const agitation = {
  title:
    "Você perde tempo toda vez que gera uma imagem e ela sai com um rosto diferente da anterior.",
  paragraphs: [
    "Eu sei que você já cansou de assistir tutorial solto em inglês, que mistura ferramenta paga e gratuita e não diz por onde começar. Também já cansou de abrir o ChatGPT ou uma ferramenta de imagem, escrever qualquer coisa e receber um resultado genérico.",
    "Isso acontece porque, quando ninguém te entrega o caminho, é fácil achar que a IA \"não funciona\" ou que é complicada demais. O problema geralmente não é você: é não ter um passo a passo e prompts que já foram pensados para isso.",
  ],
  highlight: "E é isso que você vai encontrar no Influenciador de IA Pronto em 1 Dia.",
};

export const deliverables = {
  title: "O que você vai encontrar dentro do Influenciador de IA Pronto em 1 Dia",
  cta: "Quero acesso ao kit completo e aos 4 bônus",
  favoriteTag: "Bônus favorito",
  items: [
    { label: "Entregável 01", cover: 0, title: "Ficha do personagem + descrição-âncora", text: "Um modelo para definir nome, aparência, voz e jeito de falar. Você termina com um parágrafo fixo que ajuda a manter o mesmo rosto em todas as imagens." },
    { label: "Entregável 02", cover: 0, title: "20 prompts prontos de rosto e personagem", text: "Prompts para criar o rosto-base, a folha de personagem, cenas diferentes e capas. É só trocar os campos entre colchetes e colar." },
    { label: "Entregável 03", cover: 0, title: "10 roteiros prontos de 30 segundos", text: "Apresentação, três erros, mito ou verdade, passo a passo e mais. Você escolhe, troca os campos e o personagem tem o que falar." },
    { label: "Entregável 04", cover: 0, title: "Passo a passo do vídeo, legenda pronta e lista de ferramentas", text: "Da imagem ao vídeo publicado, com a legenda pronta e as ferramentas na ordem de uso." },
    { label: "Bônus 01", cover: 1, title: "Guia passo a passo do zero ao primeiro vídeo", text: "Elimina a dificuldade: \"Mas e se eu nunca usei nenhuma ferramenta de IA?\" Inclui glossário, cronograma e solução para os 15 problemas mais comuns." },
    { label: "Bônus 02", cover: 2, title: "30 ideias de vídeos para o primeiro mês", text: "Economiza tempo: \"Mas e se eu não souber o que postar depois do primeiro vídeo?\" Cada ideia vem com gancho pronto." },
    { label: "Bônus 03", cover: 3, title: "Os 15 erros que deixam seu influenciador com cara de robô", text: "Evita o erro: \"Mas e se ficar artificial?\" Com as regras de uso responsável para você criar com segurança." },
    { label: "Bônus 04", cover: 4, favorite: true, title: "Banco com 50 personagens prontos por nicho", text: "O bônus irresistível: \"Mas e se eu não souber que personagem criar?\" Você escolhe um, copia o prompt pronto e gera o rosto em minutos." },
  ],
};

export const forWho = {
  title: "Para quem é o Influenciador de IA Pronto em 1 Dia",
  items: [
    "Para quem quer postar vídeos mas não quer aparecer na câmera: o personagem fala por você.",
    "Para quem nunca usou IA: tudo vem em passo a passo, sem termos técnicos.",
    "Para quem quer um resultado concreto hoje: o primeiro vídeo gerado em poucas horas.",
    "Para quem trava na hora de criar: prompts, roteiros e personagens já vêm prontos.",
  ],
};

export const recap = {
  title: "Veja tudo que você vai levar…",
  items: [
    { cover: 0, name: "Ficha do personagem + descrição-âncora", value: "R$ 27" },
    { cover: 0, name: "20 prompts prontos de rosto e personagem", value: "R$ 67" },
    { cover: 0, name: "10 roteiros prontos de 30 segundos", value: "R$ 47" },
    { cover: 0, name: "Passo a passo do vídeo + legenda + ferramentas", value: "R$ 37" },
    { cover: 1, name: "Bônus 1: Guia do zero ao primeiro vídeo", value: "R$ 27" },
    { cover: 2, name: "Bônus 2: 30 ideias de vídeos", value: "R$ 27" },
    { cover: 3, name: "Bônus 3: 15 erros + uso responsável", value: "R$ 17" },
    { cover: 4, name: "Bônus 4: 50 personagens prontos", value: "R$ 48" },
  ],
  totalLabel: "No total, tudo isso deveria custar:",
  total: "R$ 297",
};

export const price = {
  paragraphs: [
    "Esse seria o valor total de cada item vendido separadamente, e que facilmente poderia custar mais, já que é um kit completo para criar e publicar um influenciador de IA.",
    "Mas hoje eu quero firmar um compromisso com você, e te provar que sim, é possível ter o seu primeiro vídeo com um personagem virtual sem aparecer e sem experiência.",
  ],
  from: "DE R$ 297",
  forLabel: "POR APENAS",
  value: "R$ 37",
  suffix: "À VISTA",
  cta: "Sim, quero garantir por R$ 37",
};

export const access = {
  title: "Compre agora e receba seu acesso na hora!",
  items: [
    ["FAÇA SUA COMPRA", "assim que finalizar, você recebe o acesso no e-mail."],
    ["ACESSE TUDO", "o kit e os 4 bônus liberados de uma vez, em PDF."],
    ["TUDO PRONTO", "agora é só abrir o passo 1 e começar o seu influenciador de IA."],
  ],
};

export const guarantee = {
  seal: "7 dias",
  title: "7 dias de garantia incondicional",
  paragraphs: [
    "Eis aqui o nosso acordo: você tem 7 dias para experimentar o conteúdo e, se achar que ele não faz sentido para você, basta enviar um pedido para a minha equipe e nós reembolsaremos 100% do valor pago.",
    "Preto no branco. Não estamos de brincadeira e queremos que você tenha bons resultados!",
  ],
  cta: "Quero testar sem risco",
};

export const mentor = {
  title: "Conheça seu mentor(a)",
  name: "[SEU NOME]",
  text: "[ESCREVA 3 A 4 LINHAS REAIS SOBRE VOCÊ]",
};

export const choice = {
  title: "Agora você tem duas opções:",
  options: [
    ["Opção 1", "Continuar com vontade de postar vídeos, sem aparecer, e sem saber por onde começar."],
    ["Opção 2", "Ter acesso ao Influenciador de IA Pronto em 1 Dia e finalmente publicar o seu primeiro vídeo com um personagem virtual."],
  ],
  paragraphs: [
    "Eu sei (e você também sabe): a opção 2 é a mais inteligente.",
    "Então clica no botão abaixo e garante o seu Influenciador de IA Pronto em 1 Dia agora.",
  ],
  cta: "Escolho a opção 2: quero meu influenciador de IA pronto",
};

export const faq = {
  title: "Perguntas frequentes",
  items: [
    ["Qual a diferença entre um curso de IA e o Influenciador de IA Pronto em 1 Dia?", "Um curso costuma ensinar teoria. Aqui você recebe um kit de copiar e colar: ficha, prompts, roteiros e passo a passo para chegar ao primeiro vídeo."],
    ["Preciso pagar alguma ferramenta?", "As ferramentas de IA são de terceiros e não estão incluídas. Muitas têm plano gratuito com limites (créditos, marca d'água, uso comercial). Confira o plano atual no site oficial de cada uma. O kit mostra em que ordem usar cada ferramenta."],
    ["Posso usar o rosto ou a voz de uma pessoa famosa?", "Não. O kit ensina a criar um personagem 100% fictício e traz as regras de uso responsável. Nunca use rosto, voz ou nome de pessoa real sem autorização."],
    ["Isso garante seguidores ou dinheiro?", "Não. O kit entrega o caminho para você publicar o seu primeiro vídeo. Os resultados dependem do seu nicho, da sua constância e de outros fatores."],
    ["Como posso tirar dúvidas?", "[COLOQUE AQUI O SEU E-MAIL OU WHATSAPP DE SUPORTE]"],
    ["Por quanto tempo terei acesso?", "[CONFIRME NA PLATAFORMA DE VENDAS]"],
    ["Terei acesso a você?", "[RESPONDA DE ACORDO COM O QUE VOCÊ REALMENTE OFERECE]"],
  ],
};

export const footer = {
  lines: [
    "Este material é educativo e não garante resultados financeiros. Ferramentas, planos e regras das plataformas mudam; confira sempre as informações atuais nos sites oficiais.",
    "Os personagens mostrados são ilustrações fictícias criadas com IA.",
  ],
  links: [
    { label: "[Termos de uso]", href: "#" },
    { label: "[Política de privacidade]", href: "#" },
  ],
  copyright: "© [ANO] [SEU NOME OU EMPRESA]. Todos os direitos reservados.",
};

export const stickyBar = { price: "R$ 37 à vista", cta: "Quero meu kit" };
