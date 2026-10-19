// Todos os textos da página ficam aqui. Edite livremente.
export const CHECKOUT_URL = "https://pay.kiwify.com.br/i50AdhF";

export type Testimonial = { name: string; action: string; result: string; context?: "dor" | "bonus"; image?: string };
// Use context: "dor" ou "bonus" para os blocos 7 e 9. image: print do depoimento (opcional).
import amandaImg from "@/assets/depoimento-amanda.jpg.asset.json";
import luanaImg from "@/assets/depoimento-luana.jpg.asset.json";
import jonathanImg from "@/assets/depoimento-jonathan.jpg.asset.json";

export const testimonials: Testimonial[] = [
  {
    name: "Amanda S.",
    action: "Não fazia nem um mês que ela tinha aplicado o método para criar a influencer de IA.",
    result: "Já passou de 12 mil seguidores e as parcerias começaram a chegar no direct. \"O segredo foi a constância e a personalidade dela. Vale cada centavo.\"",
    image: amandaImg.url,
  },
  {
    name: "Luana A.",
    action: "Vivia gerando imagens em que o rosto da personagem saía diferente a cada foto.",
    result: "Seguiu o passo a passo das ferramentas e o personagem ficou parecendo pessoa de verdade. \"Até meu irmão achou que era uma modelo real. Superou minhas expectativas!\"",
    context: "dor",
    image: luanaImg.url,
  },
  {
    name: "Jonathan A.",
    action: "Achou que, por causa da idade, seria muito difícil mexer com inteligência artificial.",
    result: "Criou o personagem com o passo a passo e já conquistou seguidores em poucos dias. \"As pessoas comentam achando que é de verdade. Esse método nos ajuda de verdade.\"",
    context: "dor",
    image: jonathanImg.url,
  },
];

export const PRODUCT = "Influenciador de IA Pronto em 1 Dia";

export const seo = {
  title: "Influenciador de IA Pronto em 1 Dia | Kit copia e cola para iniciantes",
  description:
    "Crie seu personagem virtual com IA e publique o primeiro vídeo, sem aparecer e sem experiência. Kit em PDF com prompts, roteiros e 4 bônus.",
};

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
  cta: "Quero começar agora!",
  badges: ["Acesso imediato", "7 dias de garantia"],
  phoneTag: "Personagem criado com IA",
  phoneCaption: "Oi! Eu sou sua nova criadora de conteúdo…",
};

export const learn = {
  title: "O que você vai aprender a criar com este método",
  subtitle:
    "Você vai aprender a montar cada etapa do seu influenciador de IA, mesmo começando do zero.",
  items: [
    {
      title: "Um personagem virtual único",
      text: "Defina nome, aparência, personalidade e estilo de comunicação.",
    },
    {
      title: "Imagens com o mesmo rosto",
      text: "Use uma descrição-âncora para manter a identidade visual do personagem.",
    },
    {
      title: "Vídeos curtos com roteiro e voz",
      text: "Transforme a imagem em um vídeo falado com roteiro pronto para adaptar.",
    },
    {
      title: "Conteúdo pronto para publicar",
      text: "Finalize o vídeo com legenda e uma ideia clara para postar nas redes sociais.",
    },
  ],
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
    { label: "Entregável completo", cover: 0, title: "Kit completo para criar e publicar seu influenciador de IA", text: "Você recebe a ficha do personagem com descrição-âncora, 20 prompts prontos, 10 roteiros de 30 segundos e o passo a passo para transformar a imagem em vídeo, com legenda pronta e lista de ferramentas." },
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
  value: "R$ 15",
  suffix: "À VISTA",
  cta: "Sim, quero garantir por R$ 15",
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
  copyright: "© 2026 Influenciador de IA Pronto em 1 Dia. Todos os direitos reservados.",
};

export const stickyBar = { price: "R$ 15 à vista", cta: "Quero começar agora!" };
