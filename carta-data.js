/* =========================================================
   LAS CARTAS DE ALFREDO
   Es el único archivo que hay que tocar para cambiar precios o
   productos. La página carta.html y el QR de las mesas leen de
   aquí, así que el QR impreso nunca cambia.

   Hay dos cartas, como en el local: "carta" y "heladeria".
   La heladería se abre directamente con carta.html#heladeria.

   Cómo se rellena:
   - Producto:  { nombre: "Bombón", desc: "café y leche condensada", precio: "2,30" }
     "desc" y "precio" son opcionales. Si un producto tiene dos
     precios, usa  precios: ["7,00", "7,50"]  y en su categoría
     o grupo  columnas: ["Sin alcohol", "Con alcohol"].
   - Una categoría puede tener "productos" o "grupos" (subapartados
     con su propio título), "extras" (listas sin precio, como salsas)
     y "nota" (texto pequeño debajo).
   - "aviso": texto que sale arriba de la carta. Vacío si no hace falta.

   Precios pasados de las cartas del local el 16-oct-2026.
   ========================================================= */
(function () {
  "use strict";

  var toppings = [
    { titulo: "Toppings a 0,80 €", items: ["virutas de chocolate", "virutas de chocolate blanco", "crocanti de almendras", "Filipinos troceados", "bolitas crujientes de 3 chocolates", "mini nubes", "gominolas"] },
    { titulo: "Toppings a 0,90 €", items: ["uvas pasas al PX", "mini Oreo", "mini Chips Ahoy", "Lacasitos", "Conguitos", "cacahuetes garrapiñados", "brownie troceado"] },
    { titulo: "Toppings a 1,00 €", items: ["plátano natural", "melón natural", "piña natural", "fresa natural", "frutas en almíbar", "Kit Kat Pops", "nueces"] }
  ];

  window.__CARTA__ = {
    actualizada: "octubre de 2026",
    pdf: "",
    aviso: "",
    cartas: [
      /* ===================== CARTA ===================== */
      {
        id: "carta",
        nombre: "Carta",
        categorias: [
          {
            id: "cafes",
            nombre: "Cafés",
            grupos: [
              {
                titulo: "Los de siempre",
                nota: "Pregunta el precio al camarero.",
                productos: [
                  { nombre: "Café solo" },
                  { nombre: "Cortado" },
                  { nombre: "Café con leche" },
                  { nombre: "Manchado" },
                  { nombre: "Americano" },
                  { nombre: "Descafeinado" }
                ]
              },
              {
                titulo: "Especiales",
                productos: [
                  { nombre: "Capuccino clásico", desc: "café, espuma de leche o nata montada", precio: "2,30" },
                  { nombre: "Capuccino de sabores", desc: "vainilla, caramelo, chocolate, Lotus o avellanas", precio: "2,50" },
                  { nombre: "Bombón", desc: "café y leche condensada", precio: "2,30" },
                  { nombre: "Dulcinea", desc: "café, dulce de leche y nata montada", precio: "2,50" },
                  { nombre: "Latte macchiato galleta Lotus", desc: "café, leche emulsionada y crema Lotus", precio: "3,80" },
                  { nombre: "Latte macchiato chocolate-vainilla", desc: "café, leche emulsionada, chocolate y vainilla", precio: "3,80" }
                ]
              },
              {
                titulo: "Con alcohol",
                productos: [
                  { nombre: "Café especial Alfredo", desc: "café, leche condensada, licor 43 y brandy", precio: "3,20" },
                  { nombre: "Carajillos", desc: "café con Baileys, brandy, whisky, ron o licor 43", precio: "2,80" },
                  { nombre: "Jerezano", desc: "café, licor de cacao, brandy y nata", precio: "5,80" },
                  { nombre: "Irlandés", desc: "café, whisky irlandés y nata", precio: "5,80" },
                  { nombre: "Cubanito", desc: "café, chocolate, ron añejo y nata", precio: "5,80" }
                ]
              },
              {
                titulo: "Fríos",
                productos: [
                  { nombre: "Frappuccino", desc: "café, leche, chocolate, caramelo toffee y hielo frappé", precio: "4,00" },
                  { nombre: "Blanco y negro", desc: "café, helado de vainilla y nata montada", precio: "5,50" },
                  { nombre: "Frappuccino moka Baileys", desc: "café, leche, chocolate, caramelo, Baileys y hielo frappé", precio: "5,80" },
                  { nombre: "Tequila expreso martini", desc: "café, tequila y Kahlúa", precio: "5,80" }
                ]
              }
            ]
          },
          {
            id: "chocolates",
            nombre: "Chocolates",
            productos: [
              { nombre: "Chocolate hecho en casa", precio: "2,50" },
              { nombre: "Chocolate suizo con nata", precio: "2,80" },
              { nombre: "Chocolate blanco", precio: "2,50" },
              { nombre: "Chocolate a la naranja", precio: "2,70" },
              { nombre: "Chocolate a la menta", precio: "2,70" },
              { nombre: "Chocolate tentación", desc: "chocolate, licor de avellanas y nata", precio: "3,30" }
            ]
          },
          {
            id: "tes",
            nombre: "Tés e infusiones",
            grupos: [
              {
                titulo: "Nuestra especialidad",
                productos: [
                  { nombre: "Chai latte", desc: "té negro Ceylan, canela, anís estrellado, jengibre, pimienta rosa, clavo y cardamomo, infusionado en agua con leche semidesnatada y un toque de miel", precio: "3,00" }
                ]
              },
              {
                titulo: "Té verde",
                productos: [
                  { nombre: "Moruno", desc: "té verde China Sencha, menta y hierbabuena fresca", precio: "2,50" },
                  { nombre: "Galleta, chocolate y nuez", desc: "té verde Hojicha, cacao, manzana, nuez y vainilla", precio: "2,50" },
                  { nombre: "Al Andalus", desc: "té verde, piel y trozos de naranja, membrillo, azahar y jazmín", precio: "2,50" },
                  { nombre: "Mango y fruta de la pasión", desc: "té verde, papaya, cúrcuma, mango y maracuyá", precio: "2,50" }
                ]
              },
              {
                titulo: "Té negro",
                productos: [
                  { nombre: "Caramelo inglés", desc: "té negro, pétalos de cártamo, trozos y aroma de caramelo", precio: "2,50" },
                  { nombre: "Pan de especias", desc: "té negro Ceylan, canela, anís estrellado, naranja, cacao y especias", precio: "2,50" },
                  { nombre: "Sueño de primavera", desc: "té negro Assam, citronela, manzana, papaya, mango, jengibre, guinda y piña", precio: "2,50" },
                  { nombre: "Paquistaní premium", desc: "té negro, canela, clavo, cardamomo y jengibre", precio: "2,50" }
                ]
              },
              {
                titulo: "Té blanco",
                productos: [
                  { nombre: "Té del dragón", desc: "té blanco Pai Mu Tan, piña, mango, papaya, fresa, grosella, aronia y cereza", precio: "2,50" }
                ]
              },
              {
                titulo: "Té rojo Pu-Erh",
                productos: [
                  { nombre: "Taj Mahal", desc: "Pu-Erh, té negro, jengibre, canela, naranja, limón, clavo, pétalos de rosa, cardamomo y coco", precio: "2,50" },
                  { nombre: "Pasión turca", desc: "Pu-Erh, canela, cacao, anís estrellado, almendra, clavo, pimienta rosa, manzana, naranja y plátano", precio: "2,50" }
                ]
              },
              {
                titulo: "Té azul Oolong",
                productos: [
                  { nombre: "Melocotón azul", desc: "té Oolong, té verde, piña, pétalos de rosa y melocotón", precio: "2,50" }
                ]
              },
              {
                titulo: "Rooibos sin cafeína",
                productos: [
                  { nombre: "Manzana, almendra y canela", desc: "rooibos, manzana, almendra, astillas de canela y cártamo", precio: "2,50" },
                  { nombre: "Noche mágica", desc: "rooibos natural, dátil y vainilla", precio: "2,50" },
                  { nombre: "Oasis de los sentidos", desc: "rooibos, chocolate, piel de naranja, cáscara y pasta de cacao", precio: "2,50" },
                  { nombre: "Leyenda de África", desc: "rooibos, trozos de vainilla, canela, almendra y nuez", precio: "2,50" }
                ]
              },
              {
                titulo: "Infusiones de frutas",
                productos: [
                  { nombre: "Sandía, melón y kiwi", desc: "melón, mango, manzana, sandía, piña, membrillo, aciano, higo, kiwi y cereza", precio: "2,50" },
                  { nombre: "Exótico", desc: "papaya, piña, hibisco, manzana, escaramujo, caléndula y naranja", precio: "2,50" },
                  { nombre: "Frutas silvestres", desc: "frambuesa, grosella roja y negra, fresa, manzana, baya de saúco e hibisco", precio: "2,50" }
                ]
              },
              {
                titulo: "Infusiones y tisanas",
                productos: [
                  { nombre: "Relajante", desc: "melisa, tila, hojas de mora, ortiga y manzanilla", precio: "2,50" },
                  { nombre: "Ayurveda", desc: "canela, jengibre, pimienta rosa, clavo y cardamomo", precio: "2,50" },
                  { nombre: "Amor de la Provenza", desc: "citronela, hojas de olivo, romero, canela, verbena, tomillo, lavanda y flores de tilo", precio: "2,50" },
                  { nombre: "Hierbas de la tarde", desc: "manzana, verbena, melisa, naranja, tulsi, caléndula, flor de lúpulo, alquimila, valeriana y ajedrea", precio: "2,50" },
                  { nombre: "Poleo y menta natural", precio: "2,50" },
                  { nombre: "Manzanilla natural", precio: "2,50" }
                ]
              }
            ]
          },
          {
            id: "tartas",
            nombre: "Tartas",
            texto: "Todas a 5,00 €. Pregunta al camarero cuáles quedan hoy.",
            productos: [
              { nombre: "Piñones y nueces", precio: "5,00" },
              { nombre: "Tarta de la abuela Pepa", precio: "5,00" },
              { nombre: "San Marcos", desc: "con nata, trufa y Nutella", precio: "5,00" },
              { nombre: "Mousse de chocolate blanco y pistachos", precio: "5,00" },
              { nombre: "Milhojas de crema, yema y almendras", precio: "5,00" },
              { nombre: "Red velvet", precio: "5,00" },
              { nombre: "Carrot cake", precio: "5,00" },
              { nombre: "Kinder Bueno", precio: "5,00" },
              { nombre: "Muerte por chocolate", precio: "5,00" },
              { nombre: "Crema de dulce de leche y coco", precio: "5,00" },
              { nombre: "Tocino de cielo con crema al PX", precio: "5,00" },
              { nombre: "Suflé de limón", precio: "5,00" },
              { nombre: "Chocolate blanco con crema de limón", precio: "5,00" },
              { nombre: "Tarta de manzana", precio: "5,00" },
              { nombre: "Tres chocolates", precio: "5,00" },
              { nombre: "Queso al horno", precio: "5,00" }
            ]
          },
          {
            id: "caprichos",
            nombre: "Caprichos",
            texto: "Con la salsa y los toppings que quieras.",
            productos: [
              { nombre: "Brioche con helado caliente", precio: "4,50" },
              { nombre: "Tocino de cielo de Jerez", precio: "4,00" },
              { nombre: "Brownie de chocolate", precio: "4,00" },
              { nombre: "Crepes rellenos", precio: "5,50" },
              { nombre: "Gofre artesano", precio: "6,00" },
              { nombre: "Extra de helado", precio: "1,80" }
            ],
            extras: [
              { titulo: "Salsas", items: ["Nutella", "chocolate blanco", "dulce de leche", "crema Lotus", "Kinder Bueno", "crema de pistacho", "sirope de fresa", "sirope de chocolate"] }
            ].concat(toppings)
          },
          {
            id: "bolleria",
            nombre: "Bollería",
            productos: [
              { nombre: "Brioche relleno de bombón", precio: "3,50" },
              { nombre: "Napolitana de chocolate", precio: "2,80" },
              { nombre: "Tarta de hojaldre de manzana", precio: "3,50" },
              { nombre: "Caña gigante de chocolate", precio: "3,50" },
              { nombre: "Donuts", desc: "blanco o de chocolate", precio: "1,50" }
            ]
          },
          {
            id: "salados",
            nombre: "Salados",
            productos: [
              { nombre: "Brioche de pulled pork", precio: "4,00" },
              { nombre: "Sándwich mixto", precio: "4,00" },
              { nombre: "Sándwich de ensalada de pollo", precio: "4,50" }
            ]
          },
          {
            id: "mojitos",
            nombre: "Mojitos",
            columnas: ["Sin alcohol", "Con alcohol"],
            productos: [
              { nombre: "Mojito tradicional", precios: ["7,00", "7,50"] },
              { nombre: "Mojito de melón", precios: ["7,00", "7,50"] },
              { nombre: "Mojito de fresa", precios: ["7,00", "7,50"] },
              { nombre: "Mojito de mango", precios: ["7,00", "7,50"] },
              { nombre: "Mojito de coco", precios: ["7,00", "7,50"] },
              { nombre: "Mojito volcán", precios: ["7,00", "7,50"] }
            ]
          },
          {
            id: "cocteles",
            nombre: "Cócteles",
            grupos: [
              {
                titulo: "Con alcohol",
                productos: [
                  { nombre: "Apple brandy", desc: "manzana Appletiser, brandy de Jerez y triple seco", precio: "7,50" },
                  { nombre: "Spritz sherry", desc: "palo cortado, Petroni aperitivo, Cointreau y Bliss Berry", precio: "7,50" },
                  { nombre: "Spritz", desc: "Aperol, espumoso blanco y soda", precio: "7,50" },
                  { nombre: "Negroni de Jerez", desc: "vermut rojo de amontillado, oloroso, vodka y Petroni aperitivo", precio: "7,50" },
                  { nombre: "Melodía", desc: "tequila, vermut de fino, lima y pomelo rosa Bliss", precio: "7,50" },
                  { nombre: "Drácula", desc: "vodka negro, Coca-Cola, fresa y vainilla", precio: "7,50" },
                  { nombre: "Daiquiri de limón o fresa", desc: "ron, limón o fresa y sirope de azúcar", precio: "7,50" },
                  { nombre: "Moscow melón", desc: "vodka, licor de melón, lima y ginger", precio: "7,50" },
                  { nombre: "Brandy Collins o Ron Collins", desc: "brandy o ron, naranja natural, azúcar de caña y hierbabuena", precio: "7,50" },
                  { nombre: "Juanito", desc: "vodka, licor 43, Cointreau, melocotón, naranja y Blue Tropic", precio: "7,50" },
                  { nombre: "Piña colada", desc: "ron, crema de coco y piña", precio: "7,50" },
                  { nombre: "Hawaiano", desc: "ron, curaçao azul, crema de coco y piña", precio: "7,50" },
                  { nombre: "Margarita", desc: "tequila, Cointreau, limón y sirope de azúcar", precio: "7,50" },
                  { nombre: "Banana Mamma", desc: "ron, plátano, batida de coco, piña y naranja", precio: "7,50" },
                  { nombre: "Costa Marfil", desc: "ron, amaretto, plátano, granadina, coco y piña", precio: "7,50" },
                  { nombre: "Alta tensión", desc: "whisky, Jägermeister y bebida energética", precio: "7,50" }
                ]
              },
              {
                titulo: "Sin alcohol",
                productos: [
                  { nombre: "Refrescante", desc: "naranja, melocotón, granizado de limón y Blue Tropic", precio: "7,00" },
                  { nombre: "Mango peach", desc: "mango, melocotón y piña", precio: "7,00" },
                  { nombre: "Piña colada sin", desc: "piña y crema de coco", precio: "7,00" },
                  { nombre: "San Francisco", desc: "zumos variados y granadina", precio: "7,00" },
                  { nombre: "Acapulco dorado", desc: "piña, naranja y crema de coco", precio: "7,00" },
                  { nombre: "Piruleta", desc: "lima, granadina y amaretto sin alcohol", precio: "7,00" },
                  { nombre: "Tropical", desc: "lima, kiwi, manzana verde, piña y naranja", precio: "7,00" }
                ]
              }
            ]
          },
          {
            id: "copas",
            nombre: "Copas largas",
            texto: "Gin tonics y copas con ron, whisky, ginebra, vodka y casi cualquier licor que se te ocurra. Pregunta al camarero por marcas y precios.",
            productos: []
          }
        ]
      },

      /* ===================== HELADERÍA ===================== */
      {
        id: "heladeria",
        nombre: "Heladería",
        categorias: [
          {
            id: "copas-helado",
            nombre: "Copas de helado",
            grupos: [
              {
                titulo: "Las de la casa",
                productos: [
                  { nombre: "Copa Antiu Xixona", desc: "helado de turrón Antiu Xixona, helado de galleta Lotus, vainilla y nata", precio: "7,40" },
                  { nombre: "Copa Kit Kat", desc: "helado de Kit Kat, chocolate y Chips Ahoy, 2 barritas de Kit Kat y nata montada", precio: "7,40" },
                  { nombre: "Copa Superrefrescante", desc: "sorbetes de manzana verde, limón, mandarina y melón, con nata montada", precio: "8,80" },
                  { nombre: "Pijama", desc: "helado de chocolate y tutti frutti, tocino de cielo, fruta en almíbar y nata montada", precio: "8,20" },
                  { nombre: "Copa After Eight", desc: "doble bola de menta chocoflakes, otra de chocolate, 2 chocolatinas After Eight y nata", precio: "7,40" },
                  { nombre: "Copa Chips Ahoy", desc: "helado de Chips Ahoy, vainilla y chocolate, galletitas Chips Ahoy y nata montada", precio: "7,40" },
                  { nombre: "Copa Oreo", desc: "helado de Oreo, chocobiscuit Oreo y choco-bombón, con galletas Oreo y nata", precio: "7,40" },
                  { nombre: "Copa Filipinos", desc: "helado de Filipinos, chocolate y nata-bombón, con nata y Filipinos troceados", precio: "7,40" },
                  { nombre: "Copa Tropical", desc: "helado de coco, mango y mora, piña y melón natural con nata montada", precio: "7,80" },
                  { nombre: "Copa Nata con nueces", desc: "helado de nata-nueces, pistacho y vainilla cookies, nueces naturales y nata", precio: "7,80" },
                  { nombre: "Copa Brownie", desc: "helado de brownie, vainilla y dulce de leche, trozos de brownie, nata y Nutella", precio: "7,40" },
                  { nombre: "Copa Kinder", desc: "helado de Kinder, chocolate y crunch choco con nata, sirope y barrita Kinder Bueno", precio: "7,50" },
                  { nombre: "Copa Ferrero", desc: "helado de Ferrero, avellana y vainilla, 2 Ferreros y nata montada", precio: "7,80" },
                  { nombre: "Copa Borracha", desc: "helado de Málaga con pasas, vainilla y chocolate, bizcocho, pasas al PX y nata montada", precio: "7,80" },
                  { nombre: "Copa Griega con piñones y nueces", desc: "helado de yogur con frutas del bosque, nata-nueces y nata-piñones, con nata y miel", precio: "8,00" },
                  { nombre: "Copa Baileys", desc: "helado de capuccino, vainilla y tres chocolates, bañado en Baileys con nata montada", precio: "7,80" },
                  { nombre: "Copa Crunch", desc: "helado de Crunch, dulce de leche y vainilla cookies, barrita Crunch y nata montada", precio: "7,40" },
                  { nombre: "Copa Unicornio", desc: "helado de unicornio y arcoíris, y mucho colorido", precio: "5,30" }
                ]
              },
              {
                titulo: "A tu gusto",
                productos: [
                  { nombre: "Copa Golosa", desc: "3 sabores a elegir, nata montada y la salsa que quieras", precio: "7,00" },
                  { nombre: "Copa Alfredo", desc: "4 sabores a elegir, nata montada y la salsa que quieras", precio: "8,00" },
                  { nombre: "Copa Gansa", desc: "5 sabores a elegir, nata montada y la salsa que quieras", precio: "10,40" }
                ]
              }
            ],
            extras: toppings
          },
          {
            id: "batidos",
            nombre: "Batidos",
            grupos: [
              {
                titulo: "Especiales",
                productos: [
                  { nombre: "Batido Kit Kat", precio: "5,00" },
                  { nombre: "Batido After Eight", precio: "5,00" },
                  { nombre: "Batido Oreo", precio: "5,00" },
                  { nombre: "Batido Ferrero", precio: "5,00" },
                  { nombre: "Batido Filipinos", precio: "5,00" },
                  { nombre: "Batido Chips Ahoy", precio: "5,00" }
                ]
              },
              {
                titulo: "Batidos de helado",
                columnas: ["Sin nata", "Con nata"],
                productos: [
                  { nombre: "Batido de helado", desc: "del sabor que más te guste", precios: ["4,20", "4,70"] }
                ]
              },
              {
                titulo: "Batidos de helado con alcohol",
                columnas: ["Sin nata", "Con nata"],
                productos: [
                  { nombre: "Lugumba", desc: "helado de chocolate y brandy de Jerez", precios: ["5,20", "5,50"] },
                  { nombre: "Irlandés", desc: "helado de capuccino y Baileys", precios: ["5,20", "5,50"] },
                  { nombre: "Tequimango", desc: "helado de mango y tequila", precios: ["5,20", "5,50"] }
                ]
              }
            ]
          },
          {
            id: "smoothies",
            nombre: "Smoothies, granizados y horchata",
            productos: [
              { nombre: "Smoothie con helados naturales", desc: "plátano, mango, mora, mandarina, fresa ácida, frambuesa, coco, melón, manzana verde o limón", precio: "4,50" },
              { nombre: "Granizado natural", desc: "melón, mango, naranja, limón, café solo, té tropical, té moruno o rooibos Kalahari", precio: "4,00" },
              { nombre: "Horchata", precio: "3,70" }
            ]
          },
          {
            id: "caprichos-helado",
            nombre: "Caprichos",
            texto: "Con helado, 1,80 € más.",
            productos: [
              { nombre: "Crepes artesanos", precio: "5,50" },
              { nombre: "Tocino de cielo", precio: "4,00" },
              { nombre: "Brownie", precio: "4,00" },
              { nombre: "Gofre artesano", precio: "6,00" },
              { nombre: "Brioche caliente con helado", precio: "4,50" }
            ],
            extras: [
              { titulo: "Salsas", items: ["Nutella", "Kinder", "dulce de leche", "chocolate blanco", "pistacho", "Lotus"] },
              { titulo: "Siropes", items: ["caramelo", "menta", "limón", "café", "fresa", "vainilla", "chocolate", "naranja"] }
            ]
          },
          {
            id: "sabores",
            nombre: "Sabores de helado",
            texto: "Pregunta al camarero cuáles quedan hoy.",
            nota: "Las fotos son orientativas.",
            galerias: [
              {
                titulo: "Sabores",
                sabores: [
                  { nombre: "mandarina", foto: "mandarina" },
                  { nombre: "avellana", foto: "avellana" },
                  { nombre: "nata", foto: "nata" },
                  { nombre: "Oreo cheesecake", foto: "oreo-cheesecake" },
                  { nombre: "chocolate negro", foto: "chocolate-negro" },
                  { nombre: "Chips Ahoy", foto: "chips-ahoy" },
                  { nombre: "vainilla praliné y nueces", foto: "vainilla-praline-nueces" },
                  { nombre: "coco", foto: "coco" },
                  { nombre: "cheesecake galleta Lotus", foto: "cheesecake-lotus" },
                  { nombre: "Philadelphia con arándanos", foto: "philadelphia-arandanos" },
                  { nombre: "arcoíris", foto: "arcoiris" },
                  { nombre: "fresa ácida", foto: "fresa-acida" },
                  { nombre: "capuccino (moka)", foto: "capuccino-moka" },
                  { nombre: "pistacho", foto: "pistacho" },
                  { nombre: "mora", foto: "mora" },
                  { nombre: "vainilla", foto: "vainilla" },
                  { nombre: "crunch choco-avellanas", foto: "crunch-choco-avellanas" },
                  { nombre: "crema catalana", foto: "crema-catalana" },
                  { nombre: "tres chocolates", foto: "tres-chocolates" },
                  { nombre: "yogur con frutas del bosque", foto: "yogur-frutas-bosque" },
                  { nombre: "chocobiscuit con Oreo", foto: "chocobiscuit-oreo" },
                  { nombre: "nata nueces", foto: "nata-nueces" },
                  { nombre: "fresa", foto: "fresa" },
                  { nombre: "menta chocoflakes", foto: "menta-chocoflakes" },
                  { nombre: "mango", foto: "mango" },
                  { nombre: "plátano", foto: "platano" },
                  { nombre: "manzana verde", foto: "manzana-verde" },
                  { nombre: "chocolate blanco con Filipinos", foto: "chocolate-blanco-filipinos" },
                  { nombre: "mascarpone con tocino de cielo", foto: "mascarpone-tocino" },
                  { nombre: "melón", foto: "melon" },
                  { nombre: "Ferrero", foto: "ferrero" },
                  { nombre: "dulce de leche", foto: "dulce-de-leche" },
                  { nombre: "unicornio", foto: "unicornio" },
                  { nombre: "leche merengada", foto: "leche-merengada" },
                  { nombre: "frambuesa", foto: "frambuesa" },
                  { nombre: "nata piñones", foto: "nata-pinones" },
                  { nombre: "tutti frutti", foto: "tutti-frutti" },
                  { nombre: "Happy Hippo", foto: "happy-hippo" },
                  { nombre: "queso de cabra con Pedro Ximénez", foto: "queso-cabra-px" },
                  { nombre: "huevo Kinder", foto: "huevo-kinder" },
                  { nombre: "Málaga con pasas", foto: "malaga-pasas" },
                  { nombre: "brownie", foto: "brownie" },
                  { nombre: "vainilla negra con frambuesa", foto: "vainilla-negra-frambuesa" },
                  { nombre: "limón", foto: "limon" },
                  { nombre: "turrón Antiu Xixona", foto: "turron" },
                  { nombre: "Kit Kat", foto: "kit-kat" },
                  { nombre: "nata bombón", foto: "nata-bombon" }
                ]
              },
              {
                titulo: "Sin azúcares añadidos",
                sabores: [
                  { nombre: "vainilla", foto: "vainilla-0" },
                  { nombre: "turrón suprema", foto: "turron-0" },
                  { nombre: "chocolate con leche", foto: "chocolate-0" }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
})();
