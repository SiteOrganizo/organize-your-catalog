// Dados mockados expandidos - 20 produtos, 4 para cada vendedor

// Lista de categorias disponíveis
export const mockCategories = [
  "Technology",
  "Audio", 
  "Photography",
  "Automotive",
  "Tablets",
  "Smartphones",
  "Imóveis"
];

export const mockProducts = [
  // Apple Premium (4 produtos)
  {
    id: "1",
    code: "APL001",
    name: "MacBook Pro M3",
    price: 12999.99,
    description: "Performance revolucionária com chip M3 e design premium em alumínio",
    fullDescription: "O MacBook Pro M3 oferece performance excepcional para profissionais criativos. Com o revolucionário chip M3, você tem poder computacional incomparável para edição de vídeo, desenvolvimento e design. A tela Liquid Retina XDR de 14 polegadas oferece cores vibrantes e contraste infinito. Bateria que dura o dia todo e conectividade Thunderbolt 4 para todos os seus periféricos.",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
    ],
    category: "Technology",
    seller: "Apple Premium",
    sellerId: "apple-premium",
    sellerRating: 4.9,
    sellerReviews: 1250,
    location: "São Paulo, SP",
    postedAt: "2024-01-15",
    views: 2847,
    likes: 156,
    specifications: {
      "Processador": "Apple M3 Pro 12-core",
      "Memória": "18GB RAM unificada",
      "Armazenamento": "512GB SSD",
      "Tela": "14\" Liquid Retina XDR",
      "Gráficos": "GPU 18-core",
      "Conectividade": "3x Thunderbolt 4, HDMI, MagSafe 3"
    },
    condition: "Novo",
    warranty: "12 meses Apple",
    featured: true
  },
  {
    id: "2",
    code: "APL002",
    name: "iPad Pro 12.9\" M2",
    price: 6499.99,
    description: "Liquid Retina XDR display com chip M2 e Apple Pencil compatível",
    fullDescription: "O iPad Pro com chip M2 oferece performance de notebook em um tablet ultrafino. A tela Liquid Retina XDR de 12.9 polegadas com ProMotion oferece experiência visual impressionante. Compatível com Apple Pencil e Magic Keyboard para máxima produtividade.",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=600&fit=crop&q=80"
    ],
    category: "Tablets",
    seller: "Apple Premium",
    sellerId: "apple-premium",
    sellerRating: 4.9,
    sellerReviews: 1250,
    location: "São Paulo, SP",
    postedAt: "2024-01-14",
    views: 1923,
    likes: 89,
    specifications: {
      "Processador": "Apple M2 8-core",
      "Memória": "8GB RAM",
      "Armazenamento": "256GB",
      "Tela": "12.9\" Liquid Retina XDR",
      "Câmera": "12MP Wide, 10MP Ultra Wide",
      "Conectividade": "Wi-Fi 6E, 5G, USB-C"
    },
    condition: "Novo",
    warranty: "12 meses Apple",
    featured: false
  },
  {
    id: "3",
    code: "APL003",
    name: "AirPods Pro 2ª Geração",
    price: 1499.99,
    description: "Cancelamento de ruído ativo aprimorado e áudio espacial personalizado",
    fullDescription: "Os AirPods Pro de 2ª geração oferecem cancelamento de ruído ativo até 2x mais eficaz. O novo chip H2 proporciona áudio espacial personalizado e bateria que dura o dia todo. Case com MagSafe e speaker integrado.",
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=600&fit=crop&q=80"
    ],
    category: "Audio",
    seller: "Apple Premium",
    sellerId: "apple-premium",
    sellerRating: 4.9,
    sellerReviews: 1250,
    location: "São Paulo, SP",
    postedAt: "2024-01-13",
    views: 1456,
    likes: 67,
    specifications: {
      "Chip": "Apple H2",
      "Bateria": "6h + 24h com case",
      "Conectividade": "Bluetooth 5.3",
      "Recursos": "Cancelamento ativo de ruído",
      "Resistência": "IPX4",
      "Carregamento": "MagSafe, Lightning, Qi"
    },
    condition: "Novo lacrado",
    warranty: "12 meses Apple",
    featured: false
  },
  {
    id: "4",
    code: "APL004",
    name: "Apple Watch Ultra 2",
    price: 4999.99,
    description: "Smartwatch mais resistente da Apple com GPS de precisão dupla",
    fullDescription: "O Apple Watch Ultra 2 foi projetado para atletas e aventureiros. Com caixa de titânio, tela sempre ativa mais brilhante, GPS de precisão dupla e bateria de até 36 horas. Resistente à água até 100 metros.",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop&q=80"
    ],
    category: "Wearables",
    seller: "Apple Premium",
    sellerId: "apple-premium",
    sellerRating: 4.9,
    sellerReviews: 1250,
    location: "São Paulo, SP",
    postedAt: "2024-01-12",
    views: 987,
    likes: 45,
    specifications: {
      "Tela": "49mm Always-On Retina",
      "Material": "Titânio",
      "Bateria": "Até 36 horas",
      "GPS": "Precisão dupla L1 e L5",
      "Resistência": "100m à prova d'água",
      "Conectividade": "Wi-Fi, Bluetooth, Cellular"
    },
    condition: "Novo",
    warranty: "12 meses Apple",
    featured: false
  },

  // TechLux (4 produtos)
  {
    id: "5",
    code: "TLX001",
    name: "iPhone 15 Pro Max",
    price: 8999.99,
    description: "Câmera profissional 48MP, titanium design e A17 Pro chip",
    fullDescription: "O iPhone 15 Pro Max redefine o que um smartphone pode fazer. Construído em titânio aeroespacial, é incrivelmente leve e resistente. O sistema de câmera Pro com lente telefoto 5x permite fotos e vídeos profissionais. O chip A17 Pro oferece performance de console em suas mãos.",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop&q=80"
    ],
    category: "Mobile",
    seller: "TechLux",
    sellerId: "techlux",
    sellerRating: 4.8,
    sellerReviews: 890,
    location: "Rio de Janeiro, RJ",
    postedAt: "2024-01-10",
    views: 3241,
    likes: 203,
    specifications: {
      "Tela": "6.7\" Super Retina XDR",
      "Chip": "A17 Pro",
      "Câmera": "48MP Principal + 12MP Ultra Wide + 12MP Telefoto",
      "Armazenamento": "256GB",
      "Material": "Titânio",
      "Resistência": "IP68"
    },
    condition: "Novo lacrado",
    warranty: "12 meses Apple",
    featured: true
  },
  {
    id: "6",
    code: "TLX002",
    name: "Samsung Galaxy S24 Ultra",
    price: 7299.99,
    description: "S Pen integrada, câmera de 200MP e tela Dynamic AMOLED 2X",
    fullDescription: "O Galaxy S24 Ultra oferece o máximo em produtividade mobile. Com S Pen integrada, tela de 6.8 polegadas Dynamic AMOLED 2X, câmera principal de 200MP e processador Snapdragon 8 Gen 3. IA integrada para fotos e produtividade.",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop&q=80"
    ],
    category: "Mobile",
    seller: "TechLux",
    sellerId: "techlux",
    sellerRating: 4.8,
    sellerReviews: 890,
    location: "Rio de Janeiro, RJ",
    postedAt: "2024-01-09",
    views: 2156,
    likes: 134,
    specifications: {
      "Tela": "6.8\" Dynamic AMOLED 2X",
      "Processador": "Snapdragon 8 Gen 3",
      "Câmera": "200MP + 50MP + 12MP + 12MP",
      "Memória": "12GB RAM",
      "Armazenamento": "512GB",
      "S Pen": "Integrada"
    },
    condition: "Novo",
    warranty: "12 meses Samsung",
    featured: false
  },
  {
    id: "7",
    code: "TLX003",
    name: "Google Pixel 8 Pro",
    price: 5499.99,
    description: "IA avançada do Google, câmera computacional e Android puro",
    fullDescription: "O Pixel 8 Pro combina hardware premium com a melhor IA do Google. Câmera com recursos computacionais avançados, tela LTPO OLED de 6.7 polegadas e chip Google Tensor G3. Android puro com 7 anos de atualizações garantidas.",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop&q=80"
    ],
    category: "Mobile",
    seller: "TechLux",
    sellerId: "techlux",
    sellerRating: 4.8,
    sellerReviews: 890,
    location: "Rio de Janeiro, RJ",
    postedAt: "2024-01-08",
    views: 1789,
    likes: 98,
    specifications: {
      "Tela": "6.7\" LTPO OLED",
      "Chip": "Google Tensor G3",
      "Câmera": "50MP + 48MP + 48MP",
      "Memória": "12GB RAM",
      "Armazenamento": "256GB",
      "Sistema": "Android 14"
    },
    condition: "Novo",
    warranty: "12 meses Google",
    featured: false
  },
  {
    id: "8",
    code: "TLX004",
    name: "OnePlus 12",
    price: 4299.99,
    description: "Snapdragon 8 Gen 3, carregamento ultra-rápido de 100W",
    fullDescription: "O OnePlus 12 oferece performance flagship com carregamento SuperVOOC de 100W. Tela AMOLED de 6.82 polegadas com 120Hz, sistema de câmera Hasselblad e OxygenOS baseado em Android 14. Design premium em vidro e metal.",
    images: [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&h=600&fit=crop&q=80"
    ],
    category: "Mobile",
    seller: "TechLux",
    sellerId: "techlux",
    sellerRating: 4.8,
    sellerReviews: 890,
    location: "Rio de Janeiro, RJ",
    postedAt: "2024-01-07",
    views: 1234,
    likes: 76,
    specifications: {
      "Tela": "6.82\" AMOLED 120Hz",
      "Processador": "Snapdragon 8 Gen 3",
      "Câmera": "50MP Hasselblad + 64MP + 48MP",
      "Memória": "16GB RAM",
      "Armazenamento": "512GB",
      "Carregamento": "100W SuperVOOC"
    },
    condition: "Novo",
    warranty: "12 meses OnePlus",
    featured: false
  },

  // SoundMaster (4 produtos)
  {
    id: "9",
    code: "SND001",
    name: "Sony WH-1000XM5",
    price: 1899.99,
    description: "Cancelamento de ruído líder da indústria com qualidade Hi-Res",
    fullDescription: "Os Sony WH-1000XM5 oferecem a melhor experiência de áudio sem fio. Com cancelamento de ruído adaptativo e qualidade de som Hi-Res, você experimenta cada detalhe da sua música. Bateria de 30 horas e carregamento rápido para uso o dia todo.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80"
    ],
    category: "Audio",
    seller: "SoundMaster",
    sellerId: "soundmaster",
    sellerRating: 4.7,
    sellerReviews: 445,
    location: "Belo Horizonte, MG",
    postedAt: "2024-01-08",
    views: 1523,
    likes: 89,
    specifications: {
      "Driver": "30mm",
      "Cancelamento": "Dual Noise Sensor",
      "Bateria": "30 horas",
      "Conectividade": "Bluetooth 5.2, NFC",
      "Codecs": "LDAC, AAC, SBC",
      "Peso": "250g"
    },
    condition: "Novo",
    warranty: "12 meses Sony",
    featured: true
  },
  {
    id: "10",
    code: "SND002",
    name: "Bose QuietComfort Ultra",
    price: 2299.99,
    description: "Áudio espacial imersivo e cancelamento de ruído premium",
    fullDescription: "O Bose QuietComfort Ultra oferece a melhor experiência de cancelamento de ruído da Bose. Com áudio espacial imersivo, qualidade de construção premium e conforto excepcional para uso prolongado. Controles touch intuitivos e assistente de voz integrado.",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&q=80"
    ],
    category: "Audio",
    seller: "SoundMaster",
    sellerId: "soundmaster",
    sellerRating: 4.7,
    sellerReviews: 445,
    location: "Belo Horizonte, MG",
    postedAt: "2024-01-07",
    views: 1234,
    likes: 67,
    specifications: {
      "Driver": "40mm TriPort",
      "Cancelamento": "QuietComfort",
      "Bateria": "24 horas",
      "Conectividade": "Bluetooth 5.3",
      "Áudio": "Espacial imersivo",
      "Peso": "254g"
    },
    condition: "Novo",
    warranty: "12 meses Bose",
    featured: false
  },
  {
    id: "11",
    code: "SND003",
    name: "Sennheiser Momentum 4",
    price: 1699.99,
    description: "Som audiófilo com 60 horas de bateria e design elegante",
    fullDescription: "O Sennheiser Momentum 4 combina qualidade de som audiófilo com praticidade moderna. Drivers dinâmicos de 42mm, bateria de 60 horas, cancelamento de ruído adaptativo e design minimalista. Ideal para audiófilos exigentes.",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&q=80"
    ],
    category: "Audio",
    seller: "SoundMaster",
    sellerId: "soundmaster",
    sellerRating: 4.7,
    sellerReviews: 445,
    location: "Belo Horizonte, MG",
    postedAt: "2024-01-06",
    views: 987,
    likes: 45,
    specifications: {
      "Driver": "42mm dinâmico",
      "Cancelamento": "Adaptativo",
      "Bateria": "60 horas",
      "Conectividade": "Bluetooth 5.2",
      "Codecs": "aptX Adaptive, AAC",
      "Peso": "293g"
    },
    condition: "Novo",
    warranty: "24 meses Sennheiser",
    featured: false
  },
  {
    id: "12",
    code: "SND004",
    name: "JBL Live 660NC",
    price: 799.99,
    description: "Cancelamento de ruído ativo com JBL Signature Sound",
    fullDescription: "O JBL Live 660NC oferece o icônico JBL Signature Sound com cancelamento de ruído ativo. Design dobrável para portabilidade, controles inteligentes e integração com assistentes de voz. Excelente custo-benefício para áudio premium.",
    images: [
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=600&fit=crop&q=80"
    ],
    category: "Audio",
    seller: "SoundMaster",
    sellerId: "soundmaster",
    sellerRating: 4.7,
    sellerReviews: 445,
    location: "Belo Horizonte, MG",
    postedAt: "2024-01-05",
    views: 756,
    likes: 34,
    specifications: {
      "Driver": "40mm",
      "Cancelamento": "Ativo híbrido",
      "Bateria": "50 horas",
      "Conectividade": "Bluetooth 5.0",
      "Recursos": "TalkThru, Ambient Aware",
      "Peso": "220g"
    },
    condition: "Novo",
    warranty: "12 meses JBL",
    featured: false
  },

  // PhotoPro (4 produtos)
  {
    id: "13",
    code: "PHT001",
    name: "Canon EOS R6 Mark II",
    price: 15999.99,
    description: "Mirrorless full-frame com sensor de 24.2MP e gravação 4K",
    fullDescription: "A Canon EOS R6 Mark II oferece performance profissional em um corpo compacto. Sensor full-frame de 24.2MP, gravação 4K até 60fps, estabilização in-body de 8 stops e sistema autofoco Dual Pixel CMOS AF II. Ideal para fotografia e vídeo profissional.",
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop&q=80"
    ],
    category: "Photography",
    seller: "PhotoPro",
    sellerId: "photopro",
    sellerRating: 4.9,
    sellerReviews: 567,
    location: "Curitiba, PR",
    postedAt: "2024-01-11",
    views: 1876,
    likes: 112,
    specifications: {
      "Sensor": "24.2MP Full-Frame CMOS",
      "Processador": "DIGIC X",
      "Vídeo": "4K 60p sem crop",
      "ISO": "100-102400",
      "Estabilização": "In-Body 8 stops",
      "Montagem": "Canon RF"
    },
    condition: "Novo",
    warranty: "12 meses Canon",
    featured: true
  },
  {
    id: "14",
    code: "PHT002",
    name: "Sony A7 IV",
    price: 13999.99,
    description: "Câmera híbrida de 33MP com gravação 4K e EVF de alta resolução",
    fullDescription: "A Sony A7 IV é a câmera híbrida definitiva. Sensor de 33MP, gravação 4K 60p, EVF de 3.69M pontos e tela LCD articulada. Sistema autofoco com IA em tempo real e estabilização in-body de 5.5 stops. Perfeita para criadores de conteúdo.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop&q=80"
    ],
    category: "Photography",
    seller: "PhotoPro",
    sellerId: "photopro",
    sellerRating: 4.9,
    sellerReviews: 567,
    location: "Curitiba, PR",
    postedAt: "2024-01-10",
    views: 1654,
    likes: 89,
    specifications: {
      "Sensor": "33MP Full-Frame Exmor R",
      "Processador": "BIONZ XR",
      "Vídeo": "4K 60p 10-bit",
      "ISO": "100-51200",
      "EVF": "3.69M pontos OLED",
      "Montagem": "Sony E"
    },
    condition: "Novo",
    warranty: "12 meses Sony",
    featured: false
  },
  {
    id: "15",
    code: "PHT003",
    name: "Fujifilm X-T5",
    price: 9999.99,
    description: "Sensor X-Trans de 40MP com design clássico e controles físicos",
    fullDescription: "A Fujifilm X-T5 combina tecnologia moderna com design clássico. Sensor X-Trans CMOS 5 HR de 40MP, processador X-Processor 5, estabilização in-body de 7 stops e simulações de filme icônicas da Fujifilm. Controles físicos dedicados para operação intuitiva.",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop&q=80"
    ],
    category: "Photography",
    seller: "PhotoPro",
    sellerId: "photopro",
    sellerRating: 4.9,
    sellerReviews: 567,
    location: "Curitiba, PR",
    postedAt: "2024-01-09",
    views: 1432,
    likes: 78,
    specifications: {
      "Sensor": "40MP X-Trans CMOS 5 HR",
      "Processador": "X-Processor 5",
      "Vídeo": "6.2K 30p / 4K 60p",
      "ISO": "125-51200",
      "Estabilização": "In-Body 7 stops",
      "Montagem": "Fujifilm X"
    },
    condition: "Novo",
    warranty: "12 meses Fujifilm",
    featured: false
  },
  {
    id: "16",
    code: "PHT004",
    name: "Nikon Z9",
    price: 28999.99,
    description: "Flagship mirrorless com sensor de 45.7MP e gravação 8K",
    fullDescription: "A Nikon Z9 é a câmera flagship mirrorless da Nikon. Sensor stacked de 45.7MP, gravação 8K interna, sistema autofoco com 493 pontos, disparo contínuo de 20fps e sem blackout. Construção profissional à prova de intempéries.",
    images: [
      "https://images.unsplash.com/photo-1495212500983-2463f2a30bb4?w=800&h=600&fit=crop&q=80"
    ],
    category: "Photography",
    seller: "PhotoPro",
    sellerId: "photopro",
    sellerRating: 4.9,
    sellerReviews: 567,
    location: "Curitiba, PR",
    postedAt: "2024-01-08",
    views: 2341,
    likes: 156,
    specifications: {
      "Sensor": "45.7MP Stacked CMOS",
      "Processador": "EXPEED 7",
      "Vídeo": "8K 30p / 4K 120p",
      "ISO": "64-25600",
      "Autofoco": "493 pontos",
      "Montagem": "Nikon Z"
    },
    condition: "Novo",
    warranty: "12 meses Nikon",
    featured: false
  },

  // Tesla Store (4 produtos)
  {
    id: "17",
    code: "TSL001",
    name: "Tesla Model Y",
    price: 289999.99,
    description: "SUV elétrico com autonomia de 540km e Autopilot avançado",
    fullDescription: "O Tesla Model Y é o SUV elétrico mais avançado do mundo. Com autonomia de até 540km, acelera de 0-100km/h em 3.7s, possui Autopilot avançado e capacidade de autopilotagem total. Interior minimalista com tela de 15 polegadas e atualizações over-the-air.",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&q=80"
    ],
    category: "Automotive",
    seller: "Tesla Store",
    sellerId: "tesla-store",
    sellerRating: 4.8,
    sellerReviews: 234,
    location: "São Paulo, SP",
    postedAt: "2024-01-15",
    views: 5432,
    likes: 289,
    specifications: {
      "Motor": "Dual Motor AWD",
      "Potência": "534 cv",
      "Autonomia": "540 km (WLTP)",
      "Aceleração": "0-100 km/h em 3.7s",
      "Carregamento": "Supercharger V3",
      "Tela": "15\" touchscreen"
    },
    condition: "Zero km",
    warranty: "48 meses Tesla",
    featured: true
  },
  {
    id: "18",
    code: "TSL002",
    name: "Tesla Model 3",
    price: 239999.99,
    description: "Sedan elétrico premium com tecnologia de autopilotagem",
    fullDescription: "O Tesla Model 3 redefiniu o conceito de sedan premium. Com design aerodinâmico, interior minimalista e tecnologia de ponta. Autopilot incluído, atualizações over-the-air e rede de Superchargers. O carro elétrico mais vendido do mundo.",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
    ],
    category: "Automotive",
    seller: "Tesla Store",
    sellerId: "tesla-store",
    sellerRating: 4.8,
    sellerReviews: 234,
    location: "São Paulo, SP",
    postedAt: "2024-01-14",
    views: 4321,
    likes: 234,
    specifications: {
      "Motor": "Rear-Wheel Drive",
      "Potência": "283 cv",
      "Autonomia": "491 km (WLTP)",
      "Aceleração": "0-100 km/h em 6.1s",
      "Carregamento": "11 kW AC / 170 kW DC",
      "Sistema": "Autopilot incluído"
    },
    condition: "Zero km",
    warranty: "48 meses Tesla",
    featured: false
  },
  {
    id: "19",
    code: "TSL003",
    name: "Tesla Powerwall 3",
    price: 45999.99,
    description: "Sistema de armazenamento de energia residencial de 13.5kWh",
    fullDescription: "O Tesla Powerwall 3 é a solução completa para armazenamento de energia residencial. Com 13.5kWh de capacidade, inversor integrado e app Tesla para monitoramento. Funciona com painéis solares ou de forma independente para backup de energia.",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&q=80"
    ],
    category: "Energy",
    seller: "Tesla Store",
    sellerId: "tesla-store",
    sellerRating: 4.8,
    sellerReviews: 234,
    location: "São Paulo, SP",
    postedAt: "2024-01-13",
    views: 1876,
    likes: 98,
    specifications: {
      "Capacidade": "13.5 kWh",
      "Potência": "11.5 kW contínua",
      "Eficiência": "97.5% round-trip",
      "Integração": "Solar + Grid",
      "Monitoramento": "Tesla App",
      "Instalação": "Indoor/Outdoor"
    },
    condition: "Novo",
    warranty: "120 meses Tesla",
    featured: false
  },
  {
    id: "20",
    code: "TSL004",
    name: "Tesla Solar Roof",
    price: 89999.99,
    description: "Telhas solares integradas com design elegante e durabilidade",
    fullDescription: "O Tesla Solar Roof transforma seu telhado em uma usina de energia solar. Telhas de vidro temperado com células fotovoltaicas integradas, design indistinguível de um telhado tradicional e garantia de 25 anos. Inclui Powerwall para armazenamento.",
    images: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop&q=80"
    ],
    category: "Energy",
    seller: "Tesla Store",
    sellerId: "tesla-store",
    sellerRating: 4.8,
    sellerReviews: 234,
    location: "São Paulo, SP",
    postedAt: "2024-01-12",
    views: 2654,
    likes: 187,
    specifications: {
      "Material": "Vidro temperado",
      "Potência": "71.67 W por telha",
      "Garantia": "25 anos",
      "Resistência": "Classe 4 granizo",
      "Estética": "Indistinguível",
      "Inclui": "Powerwall 3"
    },
    condition: "Novo",
    warranty: "300 meses Tesla",
    featured: false
  },
  
  // Imóveis Prime (3 produtos)
  {
    id: "21",
    code: "IPR001",
    name: "Apartamento Luxo 3 Quartos - Vila Olímpia",
    price: 750000.00,
    description: "Apartamento moderno de 120m² com vista panorâmica e acabamento premium",
    fullDescription: "Magnífico apartamento de 3 quartos sendo 1 suíte master com closet, localizado no coração da Vila Olímpia. Possui 120m² de área útil, varanda gourmet com churrasqueira, 2 vagas de garagem e depósito. Condomínio completo com piscina, academia, salão de festas e segurança 24h.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Imóveis Prime",
    sellerId: "imoveis-prime",
    sellerRating: 4.8,
    sellerReviews: 156,
    location: "Vila Olímpia, São Paulo - SP",
    postedAt: "2024-01-20",
    views: 1234,
    likes: 89,
    specifications: {
      "Área útil": "120m²",
      "Quartos": "3 (1 suíte)",
      "Banheiros": "2",
      "Vagas": "2",
      "Andar": "15º",
      "Condomínio": "R$ 850/mês"
    },
    condition: "Pronto para morar",
    warranty: "Garantia construtora 5 anos",
    featured: true
  },
  {
    id: "22", 
    code: "IPR002",
    name: "Casa Sobrado 4 Quartos - Alphaville",
    price: 1200000.00,
    description: "Casa em condomínio fechado com 280m² e área de lazer completa",
    fullDescription: "Belíssima casa sobrado em condomínio de alto padrão em Alphaville. 4 quartos sendo 2 suítes, sala de estar e jantar integradas, cozinha gourmet, área de lazer com piscina e churrasqueira. Garagem para 4 carros. Condomínio com segurança 24h, clube e área verde.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Imóveis Prime", 
    sellerId: "imoveis-prime",
    sellerRating: 4.8,
    sellerReviews: 156,
    location: "Alphaville, Barueri - SP",
    postedAt: "2024-01-18",
    views: 987,
    likes: 67,
    specifications: {
      "Área construída": "280m²",
      "Quartos": "4 (2 suítes)",
      "Banheiros": "3",
      "Vagas": "4",
      "Terreno": "400m²",
      "Condomínio": "R$ 650/mês"
    },
    condition: "Pronto para morar",
    warranty: "Garantia construtora 5 anos",
    featured: false
  },
  {
    id: "23",
    code: "IPR003", 
    name: "Apartamento 2 Quartos para Locação - Moema",
    price: 4500.00,
    description: "Apartamento mobiliado para locação em localização privilegiada",
    fullDescription: "Apartamento completamente mobiliado e decorado, ideal para executivos. 2 quartos com ar condicionado, sala ampla, cozinha equipada com eletrodomésticos. Próximo ao metrô e shopping centers. Incluso: móveis, eletrodomésticos e internet.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Imóveis Prime",
    sellerId: "imoveis-prime", 
    sellerRating: 4.8,
    sellerReviews: 156,
    location: "Moema, São Paulo - SP",
    postedAt: "2024-01-22",
    views: 654,
    likes: 45,
    specifications: {
      "Área útil": "75m²",
      "Quartos": "2",
      "Banheiros": "1", 
      "Vagas": "1",
      "Andar": "8º",
      "Mobiliado": "Completo"
    },
    condition: "Mobiliado", 
    warranty: "Contrato de locação",
    featured: false
  },
  
  // Construtora Elite (3 produtos)
  {
    id: "24",
    code: "CEL001",
    name: "Lançamento Residencial Jardins Premium",
    price: 650000.00,
    description: "Apartamentos de 2 e 3 quartos em torre única no Jardins",
    fullDescription: "Lançamento exclusivo no bairro mais nobre de São Paulo. Apartamentos de alto padrão com 2 e 3 quartos, varanda gourmet, acabamento premium e localização privilegiada. Entrega prevista para dezembro de 2025. Financiamento direto com a construtora disponível.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Construtora Elite",
    sellerId: "construtora-elite",
    sellerRating: 4.9,
    sellerReviews: 203,
    location: "Jardins, São Paulo - SP", 
    postedAt: "2024-01-15",
    views: 1876,
    likes: 134,
    specifications: {
      "Área útil": "85m² a 125m²",
      "Quartos": "2 ou 3",
      "Banheiros": "2",
      "Vagas": "1 ou 2", 
      "Entrega": "Dez/2025",
      "Financiamento": "Direto"
    },
    condition: "Na planta",
    warranty: "Garantia PBQP-H 5 anos",
    featured: true
  },
  {
    id: "25",
    code: "CEL002",
    name: "Cobertura Duplex 4 Quartos - Perdizes", 
    price: 1800000.00,
    description: "Cobertura duplex com terraço privativo e vista 360° da cidade",
    fullDescription: "Espetacular cobertura duplex de 220m² com terraço privativo de 100m². 4 quartos sendo 2 suítes, 3 banheiros, sala de estar e jantar integradas, cozinha gourmet e área de lazer no terraço. Vista panorâmica da cidade e acabamento de luxo.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Construtora Elite",
    sellerId: "construtora-elite",
    sellerRating: 4.9, 
    sellerReviews: 203,
    location: "Perdizes, São Paulo - SP",
    postedAt: "2024-01-12",
    views: 2341,
    likes: 187,
    specifications: {
      "Área útil": "220m²",
      "Terraço": "100m²", 
      "Quartos": "4 (2 suítes)",
      "Banheiros": "3",
      "Vagas": "3",
      "Andar": "Cobertura"
    },
    condition: "Pronto para morar",
    warranty: "Garantia construtora 5 anos",
    featured: false
  },
  {
    id: "26",
    code: "CEL003",
    name: "Studio para Investimento - Vila Madalena",
    price: 320000.00,
    description: "Studio moderno ideal para investimento ou primeiro imóvel",
    fullDescription: "Studio de 38m² perfeitamente planejado na Vila Madalena. Ambiente integrado com cozinha americana, banheiro completo e varanda. Prédio novo com área de lazer e localização estratégica próxima a bares, restaurantes e metrô.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Construtora Elite",
    sellerId: "construtora-elite",
    sellerRating: 4.9,
    sellerReviews: 203,
    location: "Vila Madalena, São Paulo - SP",
    postedAt: "2024-01-25",
    views: 789,
    likes: 56,
    specifications: {
      "Área útil": "38m²",
      "Ambiente": "Integrado",
      "Banheiros": "1",
      "Vagas": "1",
      "Andar": "6º",
      "Condomínio": "R$ 420/mês"
    },
    condition: "Pronto para morar",
    warranty: "Garantia construtora 5 anos", 
    featured: false
  },
  
  // Residencial Santos (3 produtos)
  {
    id: "27",
    code: "RST001",
    name: "Casa Térrea 3 Quartos - Zona Sul",
    price: 580000.00,
    description: "Casa térrea com quintal amplo em bairro residencial tranquilo",
    fullDescription: "Casa térrea de 150m² em terreno de 300m². 3 quartos sendo 1 suíte, sala ampla, cozinha, área de serviço e quintal com churrasqueira. Garagem coberta para 2 carros. Bairro residencial com toda infraestrutura e transporte público.",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Residencial Santos",
    sellerId: "residencial-santos",
    sellerRating: 4.6,
    sellerReviews: 89,
    location: "Campo Grande, São Paulo - SP",
    postedAt: "2024-01-19",
    views: 567,
    likes: 34,
    specifications: {
      "Área construída": "150m²",
      "Terreno": "300m²",
      "Quartos": "3 (1 suíte)",
      "Banheiros": "2",
      "Vagas": "2",
      "Quintal": "Amplo"
    },
    condition: "Boa conservação",
    warranty: "Vistoria inclusa",
    featured: false
  },
  {
    id: "28",
    code: "RST002", 
    name: "Apartamento 1 Quarto para Locação - Centro",
    price: 1800.00,
    description: "Apartamento compacto e funcional no centro da cidade",
    fullDescription: "Apartamento de 45m² no centro, próximo a estações de metrô e comércio. 1 quarto, sala, cozinha americana e banheiro. Prédio com portaria 24h. Ideal para profissionais que trabalham no centro ou estudantes. Sem mobília.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Residencial Santos",
    sellerId: "residencial-santos",
    sellerRating: 4.6,
    sellerReviews: 89,
    location: "Centro, São Paulo - SP",
    postedAt: "2024-01-21",
    views: 432,
    likes: 23,
    specifications: {
      "Área útil": "45m²",
      "Quartos": "1",
      "Banheiros": "1",
      "Vagas": "0",
      "Andar": "12º",
      "Mobiliado": "Não"
    },
    condition: "Bom estado",
    warranty: "Contrato de locação",
    featured: false
  },
  {
    id: "29",
    code: "RST003",
    name: "Sobrado Geminado 2 Quartos - Zona Leste",
    price: 380000.00,
    description: "Sobrado geminado em condomínio fechado com área verde",
    fullDescription: "Sobrado geminado de 110m² em condomínio residencial. 2 quartos, sala, cozinha, banheiro, área de serviço e pequeno quintal. Garagem coberta. Condomínio com portaria, área verde e playground. Financiamento aceito.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Residencial Santos",
    sellerId: "residencial-santos",
    sellerRating: 4.6,
    sellerReviews: 89,
    location: "Itaquera, São Paulo - SP",
    postedAt: "2024-01-17",
    views: 678,
    likes: 41,
    specifications: {
      "Área construída": "110m²",
      "Quartos": "2",
      "Banheiros": "1",
      "Vagas": "1",
      "Condomínio": "R$ 280/mês",
      "Financiamento": "Aceito"
    },
    condition: "Ótimo estado",
    warranty: "Documentação em ordem",
    featured: false
  },
  
  // Luxury Homes (3 produtos)
  {
    id: "30",
    code: "LUX001",
    name: "Mansão de Luxo 6 Quartos - Alto de Pinheiros",
    price: 4500000.00,
    description: "Mansão exclusiva com piscina, spa e acabamento importado",
    fullDescription: "Magnífica mansão de 800m² em terreno de 1200m². 6 quartos sendo 4 suítes, sala de cinema, escritório, spa completo, piscina aquecida, quadra de tênis e garagem para 8 carros. Acabamento com materiais importados e sistema de automação completo.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Luxury Homes",
    sellerId: "luxury-homes",
    sellerRating: 4.9,
    sellerReviews: 67,
    location: "Alto de Pinheiros, São Paulo - SP",
    postedAt: "2024-01-10",
    views: 3421,
    likes: 289,
    specifications: {
      "Área construída": "800m²",
      "Terreno": "1200m²",
      "Quartos": "6 (4 suítes)",
      "Banheiros": "8",
      "Vagas": "8",
      "Extras": "Piscina, spa, quadra"
    },
    condition: "Estado impecável",
    warranty: "Documentação premium",
    featured: true
  },
  {
    id: "31",
    code: "LUX002",
    name: "Penthouse 5 Quartos - Brooklin Novo",
    price: 2800000.00,
    description: "Penthouse com 300m² e terraço panorâmico exclusivo",
    fullDescription: "Excepcional penthouse de 300m² com terraço privativo de 200m². 5 quartos sendo 3 suítes master, sala de estar e jantar integradas, cozinha gourmet, adega climatizada e área gourmet no terraço. Vista panorâmica da cidade e acabamento de alto luxo.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Luxury Homes",
    sellerId: "luxury-homes",
    sellerRating: 4.9,
    sellerReviews: 67,
    location: "Brooklin Novo, São Paulo - SP",
    postedAt: "2024-01-08",
    views: 2876,
    likes: 234,
    specifications: {
      "Área útil": "300m²",
      "Terraço": "200m²",
      "Quartos": "5 (3 suítes)",
      "Banheiros": "5",
      "Vagas": "4",
      "Andar": "Cobertura"
    },
    condition: "Luxury finish",
    warranty: "Garantia premium",
    featured: true
  },
  {
    id: "32",
    code: "LUX003",
    name: "Apartamento High-End 4 Quartos - Itaim Bibi",
    price: 1650000.00,
    description: "Apartamento de alto padrão com automação e vista privilegiada",
    fullDescription: "Sofisticado apartamento de 180m² com automação completa. 4 quartos sendo 2 suítes master, home office, sala de estar e jantar, cozinha gourmet integrada e varanda gourmet. Prédio com concierge, spa, academia e heliponto.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80"
    ],
    category: "Imóveis",
    seller: "Luxury Homes",
    sellerId: "luxury-homes", 
    sellerRating: 4.9,
    sellerReviews: 67,
    location: "Itaim Bibi, São Paulo - SP",
    postedAt: "2024-01-14",
    views: 1987,
    likes: 156,
    specifications: {
      "Área útil": "180m²",
      "Quartos": "4 (2 suítes)",
      "Banheiros": "3",
      "Vagas": "3",
      "Automação": "Completa",
      "Prédio": "Alto luxo"
    },
    condition: "Pronto luxury",
    warranty: "Garantia executiva",
    featured: false
  }
];

// Dados dos vendedores
export const mockSellers = {
  "apple-premium": {
    id: "apple-premium",
    name: "Apple Premium",
    description: "Revenda autorizada Apple com produtos originais e garantia oficial",
    fullDescription: "A Apple Premium é uma revenda autorizada Apple com mais de 10 anos de experiência no mercado brasileiro. Oferecemos todos os produtos Apple com garantia oficial, suporte técnico especializado e os melhores preços do mercado. Nossa equipe é certificada pela Apple e está sempre pronta para ajudar você a escolher o produto ideal.",
    rating: 4.9,
    totalReviews: 1250,
    location: "São Paulo, SP",
    joinedDate: "2014-03-15",
    totalProducts: 4,
    totalSales: 15234,
    logo: "https://images.unsplash.com/photo-1611532736492-de9b5ba72985?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&q=80",
    categories: ["Technology", "Mobile", "Audio", "Wearables"],
    verified: true,
    responseTime: "2 horas",
    policies: {
      shipping: "Frete grátis para todo Brasil",
      returns: "30 dias para troca e devolução",
      warranty: "Garantia oficial Apple de 12 meses"
    }
  },
  "techlux": {
    id: "techlux",
    name: "TechLux",
    description: "Especialista em smartphones premium e tecnologia de ponta",
    fullDescription: "A TechLux é especializada em smartphones premium e dispositivos de tecnologia de última geração. Com foco na experiência do cliente, oferecemos os lançamentos mais recentes do mercado mobile, sempre com garantia e suporte técnico especializado. Somos parceiros oficiais das principais marcas do setor.",
    rating: 4.8,
    totalReviews: 890,
    location: "Rio de Janeiro, RJ",
    joinedDate: "2016-07-22",
    totalProducts: 4,
    totalSales: 8976,
    logo: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=400&fit=crop&q=80",
    categories: ["Mobile", "Technology"],
    verified: true,
    responseTime: "1 hora",
    policies: {
      shipping: "Entrega expressa em 24h",
      returns: "15 dias para troca",
      warranty: "Garantia oficial dos fabricantes"
    }
  },
  "soundmaster": {
    id: "soundmaster",
    name: "SoundMaster",
    description: "Equipamentos de áudio premium para audiófilos exigentes",
    fullDescription: "A SoundMaster é referência em equipamentos de áudio de alta qualidade. Atendemos desde audiófilos exigentes até profissionais da música, oferecendo fones de ouvido, amplificadores e sistemas de som das melhores marcas mundiais. Nossa equipe é especializada em acústica e pode ajudar você a montar o setup perfeito.",
    rating: 4.7,
    totalReviews: 445,
    location: "Belo Horizonte, MG",
    joinedDate: "2015-11-08",
    totalProducts: 4,
    totalSales: 3421,
    logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=400&fit=crop&q=80",
    categories: ["Audio"],
    verified: true,
    responseTime: "3 horas",
    policies: {
      shipping: "Entrega com cuidado especial",
      returns: "7 dias para teste em casa",
      warranty: "Garantia estendida disponível"
    }
  },
  "photopro": {
    id: "photopro",
    name: "PhotoPro",
    description: "Equipamentos fotográficos profissionais e acessórios",
    fullDescription: "A PhotoPro é a loja de confiança dos fotógrafos profissionais brasileiros. Oferecemos câmeras, lentes, iluminação e todos os acessórios necessários para fotografia e vídeo profissional. Nossa equipe é formada por fotógrafos experientes que podem orientar você na escolha do equipamento ideal para seu estilo e necessidades.",
    rating: 4.9,
    totalReviews: 567,
    location: "Curitiba, PR",
    joinedDate: "2013-05-12",
    totalProducts: 4,
    totalSales: 2876,
    logo: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=1200&h=400&fit=crop&q=80",
    categories: ["Photography"],
    verified: true,
    responseTime: "4 horas",
    policies: {
      shipping: "Embalagem profissional",
      returns: "30 dias para devolução",
      warranty: "Garantia oficial + suporte técnico"
    }
  },
  "tesla-store": {
    id: "tesla-store",
    name: "Tesla Store",
    description: "Veículos elétricos e soluções de energia sustentável",
    fullDescription: "A Tesla Store oficial no Brasil oferece a linha completa de veículos elétricos Tesla e soluções de energia sustentável. Com tecnologia de ponta, design revolucionário e compromisso com a sustentabilidade, a Tesla está acelerando a transição mundial para energia sustentável. Nossos especialistas estão prontos para apresentar o futuro da mobilidade.",
    rating: 4.8,
    totalReviews: 234,
    location: "São Paulo, SP",
    joinedDate: "2022-01-10",
    totalProducts: 4,
    totalSales: 456,
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1200&h=400&fit=crop&q=80",
    categories: ["Automotive", "Energy"],
    verified: true,
    responseTime: "6 horas",
    policies: {
      shipping: "Entrega especializada",
      returns: "Política específica por produto", 
      warranty: "Garantia Tesla até 8 anos"
    }
  },
  "imoveis-prime": {
    id: "imoveis-prime",
    name: "Imóveis Prime",
    description: "Corretora especializada em imóveis de alto padrão",
    fullDescription: "A Imóveis Prime é uma corretora boutique especializada em imóveis residenciais de alto padrão. Com mais de 15 anos de experiência no mercado paulistano, oferecemos um portfólio exclusivo de apartamentos, casas e coberturas nos melhores bairros de São Paulo. Nossa equipe de corretores especializados oferece atendimento personalizado e consultoria completa.",
    rating: 4.8,
    totalReviews: 156,
    location: "Vila Olímpia, São Paulo - SP",
    joinedDate: "2009-04-20",
    totalProducts: 3,
    totalSales: 234,
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=400&fit=crop&q=80",
    categories: ["Imóveis"],
    verified: true,
    responseTime: "2 horas",
    policies: {
      shipping: "Visitas agendadas",
      returns: "Garantia documental",
      warranty: "Acompanhamento jurídico"
    }
  },
  "construtora-elite": {
    id: "construtora-elite",
    name: "Construtora Elite",
    description: "Construtora renomada com projetos de alto padrão",
    fullDescription: "A Construtora Elite é referência em empreendimentos residenciais de alto padrão em São Paulo. Com mais de 25 anos de mercado, entregamos projetos que combinam localização privilegiada, arquitetura inovadora e acabamento de luxo. Todos os nossos empreendimentos possuem certificação PBQP-H e financiamento próprio disponível.",
    rating: 4.9,
    totalReviews: 203,
    location: "Jardins, São Paulo - SP",
    joinedDate: "1999-08-15",
    totalProducts: 3,
    totalSales: 89,
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=400&fit=crop&q=80",
    categories: ["Imóveis"],
    verified: true,
    responseTime: "4 horas",
    policies: {
      shipping: "Plantão de vendas",
      returns: "Distrato conforme lei",
      warranty: "Garantia construtora 5 anos"
    }
  },
  "residencial-santos": {
    id: "residencial-santos",
    name: "Residencial Santos",
    description: "Imobiliária tradicional com foco em locação e venda",
    fullDescription: "A Residencial Santos é uma imobiliária tradicional com 20 anos de atuação no mercado paulistano. Especializada em locação e venda de imóveis residenciais para todas as faixas de renda. Oferecemos atendimento personalizado, avaliação gratuita e acompanhamento completo em todo o processo de compra, venda ou locação.",
    rating: 4.6,
    totalReviews: 89,
    location: "Santos, São Paulo - SP",
    joinedDate: "2004-11-10",
    totalProducts: 3,
    totalSales: 456,
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=400&fit=crop&q=80",
    categories: ["Imóveis"],
    verified: true,
    responseTime: "3 horas",
    policies: {
      shipping: "Visitas flexíveis",
      returns: "Sem taxa de corretagem",
      warranty: "Acompanhamento pós-venda"
    }
  },
  "luxury-homes": {
    id: "luxury-homes",
    name: "Luxury Homes",
    description: "Especialista em imóveis de ultra luxo e exclusivos",
    fullDescription: "A Luxury Homes é especializada em imóveis de ultra luxo e propriedades exclusivas em São Paulo. Atendemos clientes VIP que buscam residências únicas, penthouses, mansões e imóveis com características especiais. Nossa equipe é formada por consultores especializados em alto padrão com network internacional.",
    rating: 4.9,
    totalReviews: 67,
    location: "Alto de Pinheiros, São Paulo - SP",
    joinedDate: "2015-02-28",
    totalProducts: 3,
    totalSales: 45,
    logo: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200&h=200&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=400&fit=crop&q=80",
    categories: ["Imóveis"],
    verified: true,
    responseTime: "1 hora",
    policies: {
      shipping: "Atendimento VIP",
      returns: "Consultoria premium",
      warranty: "Serviço executivo completo"
    }
  }
};