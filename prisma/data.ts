const categories = [
  {
    name: "Anéis",
    image: "https://i.im.ge/2023/02/04/aIvlPG.aneis.jpg",
  },
  {
    name: "Brincos",
    image: "https://i.im.ge/2023/02/04/aIvXqL.brincos.jpg",
  },
  {
    name: "Colares",
    image: "https://i.im.ge/2023/02/04/aIvTnc.colares.jpg",
  },
  {
    name: "Pulseiras",
    image: "https://i.im.ge/2023/02/04/aIpR9M.pulseiras.jpg",
  },
  {
    name: "Decorações",
    image: "https://i.im.ge/2023/02/04/aIpBRr.outros.jpg",
  },
];

const products = [
  {
    name: "Brinco abelhinha",
    mainImage: "https://i.im.ge/2023/02/05/aho2Kz.WhatsApp-Image-2023-02-04-at-4-38-24-PM.jpg",
    description:
      "Brinco em aço inoxidável  em resina com flores de cenoura amarela tingida com pingente abelha em metal.",
    price: 3200,
    inStock: 6,
    categoryName: "Brincos",
  },
  {
    name: "Colar arruda e gotinhas",
    mainImage: "https://i.im.ge/2023/02/05/ahlFWz.WhatsApp-Image-2023-02-04-at-5-08-25-PM.jpg",
    description: "Colar com cordinha preta e pingente em resina. Medidas: 3cm pingente.",
    price: 2250,
    inStock: 13,
    categoryName: "Colares",
  },
  {
    name: "Pulseira floral",
    mainImage: "https://i.im.ge/2023/02/05/ahoJMK.WhatsApp-Image-2023-02-04-at-4-45-30-PM.jpg",
    description:
      "Pulseira em aço inoxidável com pingentes de 10mm com resina e plantas naturais, renda portuguesa e pétalas de rosa.",
    price: 4020,
    inStock: 8,
    categoryName: "Pulseiras",
  },
  {
    name: "Argolinha flor de cenoura",
    mainImage: "https://i.im.ge/2023/02/05/ahl42h.WhatsApp-Image-2023-02-04-at-6-13-39-PM.jpg",
    description:
      "Brinco argola (p) em aço inoxidável com pingente em resina com plantas naturais, florzinhas de cenoura.",
    price: 2300,
    inStock: 9,
    categoryName: "Brincos",
  },
  {
    name: "Colar mini jardim",
    mainImage: "https://i.im.ge/2023/02/05/ahXl8C.WhatsApp-Image-2023-02-04-at-4-48-35-PM.jpg",
    description:
      "Colar em aço inoxidável de 45cm com pingente em resina com plantas naturais, samambaia, flor de morango, moranguinho ornamental e conchinha.",
    price: 3550,
    inStock: 4,
    categoryName: "Colares",
  },
  {
    name: "Brinco cobra glitter",
    mainImage: "https://i.im.ge/2023/02/05/ahlGKY.WhatsApp-Image-2023-02-04-at-6-14-47-PM.jpg",
    description: "Brinco em aço inoxidável com pingente em resina com glitter flocado rosa. Medida: 7cm.",
    price: 2620,
    inStock: 10,
    categoryName: "Brincos",
  },
  {
    name: "Quadrinho poema",
    mainImage: "https://i.im.ge/2023/02/05/ahlkcF.WhatsApp-Image-2023-02-04-at-5-17-31-PM.jpg",
    description: "Quadrinho em resina mini dentinhos de leão com frase, cordinha preta como alça.",
    price: 5700,
    inStock: 4,
    categoryName: "Decorações",
  },
  {
    name: "Chocker miçangas voar",
    mainImage: "https://i.im.ge/2023/02/05/ahlVXz.WhatsApp-Image-2023-02-04-at-5-15-18-PM.jpg",
    description:
      "Chocker de miçangas com pingente em resina com asinha de borboleta. Nenhum inseto foi morto para confecção da peça.",
    price: 2550,
    inStock: 9,
    categoryName: "Colares",
  },
  {
    name: "Colar margarida",
    mainImage: "https://i.im.ge/2023/02/05/ahX9PJ.WhatsApp-Image-2023-02-04-at-4-51-43-PM.jpg",
    description:
      "Colar em aço inoxidável com pingente em resina com plantas naturais, Margarida. Medidas: 1cm de diâmetro.",
    price: 3700,
    inStock: 15,
    categoryName: "Colares",
  },
  {
    name: "Brinco renda portuguesa",
    mainImage: "https://i.im.ge/2023/02/05/ahXwFS.WhatsApp-Image-2023-02-04-at-4-56-35-PM.jpg",
    description:
      "Brinco de aço inoxidável com pingente em resina com plantas naturais, renda portuguesa. Medidas: 12mm.",
    price: 3200,
    inStock: 6,
    categoryName: "Brincos",
  },
  {
    name: "Colar urucum",
    mainImage: "https://i.im.ge/2023/02/05/ahl5bq.WhatsApp-Image-2023-02-04-at-5-09-53-PM.jpg",
    description:
      "Colar em aço inoxidável com pingente em resina com plantas naturais, sementes de urucum. Medidas: 50cm.",
    price: 2190,
    inStock: 8,
    categoryName: "Colares",
  },
  {
    name: "Brinco borboleta cedente",
    mainImage: "https://i.im.ge/2023/02/05/ahXtTF.WhatsApp-Image-2023-02-04-at-4-58-18-PM.jpg",
    description:
      "Brinco em aço inoxidável com asas de borboleta natural e pingente de estrela de metal. Nenhum inseto foi morto para confecção da peça. Medidas: 10cm mais ou menos.",
    price: 2450,
    inStock: 8,
    categoryName: "Brincos",
  },
  {
    name: "Anel floral",
    mainImage: "https://i.im.ge/2023/02/05/ahrDDL.WhatsApp-Image-2023-02-04-at-6-15-42-PM.jpg",
    description: "Anel de metal regulável com pingente em resina com plantas naturais. Medidas: 18x25mm, regulável.",
    price: 2550,
    inStock: 9,
    categoryName: "Anéis",
  },
  {
    name: "Colar asinha",
    mainImage: "https://i.im.ge/2023/02/05/ahXC4X.WhatsApp-Image-2023-02-04-at-5-03-06-PM.jpg",
    description:
      "Colar em aço inoxidável com pingente em resina com asa de cigarra. Nenhum inseto foi morto para confecção da peça. Medidas: 45cm.",
    price: 3000,
    inStock: 6,
    categoryName: "Colares",
  },
  {
    name: "Cinzeiro botânico",
    mainImage: "https://i.im.ge/2023/02/05/ahozrz.WhatsApp-Image-2023-02-04-at-4-39-45-PM.jpg",
    description:
      "Cinzeiro em resina com folhinhas de ouro e flor de cosmos e borboleta natural. Nenhum inseto é morto para confecção da peça. Medidas: 2.7x10.6x10.6.",
    price: 6500,
    inStock: 5,
    categoryName: "Decorações",
  },
  {
    name: "Pulseira florzinha amarela",
    mainImage: "https://i.im.ge/2023/02/05/ahXcFY.WhatsApp-Image-2023-02-04-at-5-04-53-PM.jpg",
    description:
      "Pulseira regulável em aço inoxidável com pingente em resina com plantas naturais, flor de cenoura tingida de amarelo. Medidas: pingente 20mm, regulável.",
    price: 4920,
    inStock: 10,
    categoryName: "Pulseiras",
  },
  {
    name: "Brinco margarida amarela",
    mainImage: "https://i.im.ge/2023/02/05/ahXyLK.WhatsApp-Image-2023-02-04-at-5-01-58-PM.jpg",
    description:
      "Brinco em aço inoxidável com pingente em resina com plantas naturais, margaridas tingidas de amarelo. Medidas: 5cm mais ou menos",
    price: 2290,
    inStock: 14,
    categoryName: "Brincos",
  },

  {
    name: "Colar arruda",
    mainImage: "https://i.im.ge/2023/02/05/ahXHzm.WhatsApp-Image-2023-02-04-at-5-06-57-PM.jpg",
    description: "Colar em aço inoxidável com pingente em resina com plantas naturais, arruda. Medida: 45cm.",
    price: 3300,
    inStock: 11,
    categoryName: "Colares",
  },
  {
    name: "Anel flores de cenoura",
    mainImage: "https://i.im.ge/2023/02/05/ahXDRT.WhatsApp-Image-2023-02-04-at-4-50-07-PM.jpg",
    description: "Anel regulável de metal com fundo preto e flores de cenoura naturais. Medidas: 18x25mm, regulável.",
    price: 2250,
    inStock: 9,
    categoryName: "Anéis",
  },
  {
    name: "Marca páginas borboletas",
    mainImage: "https://i.im.ge/2023/02/05/ahltwr.WhatsApp-Image-2023-02-04-at-5-13-30-PM.jpg",
    description:
      "Marcador de livro com pingente em resina com asinha de borboleta. Nenhum inseto foi morto para confecção da peça.",
    price: 4000,
    inStock: 7,
    categoryName: "Decorações",
  },
];

export const data = { categories, products };
