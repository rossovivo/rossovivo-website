import type { MenuCategory } from './menu';

export const fallbackMenuCategories: MenuCategory[] = [
  {
    name: 'Pizza',
    items: [
      {
        name: 'Marinara',
        description: 'Tomato oregano garlic and basil',
        features: 'Vegetarian',
        price: 49,
      },
      {
        name: 'Margherita',
        description: 'Tomato mozzarella and basil',
        features: 'Vegetarian Bestseller',
        price: 60,
      },
      {
        name: 'Bufalina',
        description: 'Tomato buffalo mozzarella and basil',
        features: 'Vegetarian',
        price: 75,
      },
      {
        name: 'Napoli',
        description: 'Tomato mozzarella anchovies oregano and basil',
        price: 65,
      },
      {
        name: 'Funghi',
        description: 'Tomato mozzarella mushrooms and basil',
        features: 'Vegetarian',
        price: 65,
      },
      {
        name: 'Capricciosa',
        description: 'Tomato mozzarella mushrooms olives turkey ham beef salami artichokes and basil',
        price: 79,
      },
      {
        name: 'Diavola',
        description: 'Tomato mozzarella beef salami chilli oil and basil',
        price: 69,
      },
      {
        name: 'Vegetariana',
        description: 'Tomato mozzarella zucchini peppers aubergine and basil',
        features: 'Vegetarian',
        price: 65,
      },
      {
        name: 'Tonno e Cipolla',
        description: 'Tomato mozzarella tuna onion and basil',
        price: 69,
      },
      {
        name: 'Burrata',
        description: 'Tomato parmesan burrata cheese and basil',
        features: 'Vegetarian',
        price: 75,
      },
      {
        name: 'Parmigiana',
        description: 'Tomato fried eggplant and parmesan cream',
        features: 'Vegetarian',
        price: 69,
      },
      {
        name: 'Prosciutto e Funghi',
        description: 'Tomato mozzarella veal ham mixed mushrooms and basil',
        price: 75,
      },
      {
        name: 'Margherita con Provola',
        description: 'Tomato smoked mozzarella and basil',
        features: 'Vegetarian',
        price: 60,
      },
      {
        name: 'Burrata al Tartufo',
        description: 'Mozzarella mixed mushrooms truffle burrata cheese and basil',
        features: 'Vegetarian',
        price: 85,
      },
      {
        name: 'Bianca con Provola',
        description: 'Smoked mozzarella and basil',
        features: 'Vegetarian',
        price: 60,
      },
      {
        name: 'Milanese',
        description: 'Mozzarella rocket bresaola parmesan shavings and basil',
        price: 75,
      },
      {
        name: 'Truffle',
        description: 'Mozzarella mushrooms truffle slices and truffle oil',
        features: 'Vegetarian Bestseller',
        price: 89,
      },
      {
        name: 'Wurstel e Patatine',
        description: 'Mozzarella Vienna sausage and french fries',
        price: 65,
      },
      {
        name: 'Pistacchio',
        description: 'Mozzarella cream pistacchio bresaola and basil',
        price: 75,
      },
      {
        name: '4 Formaggi',
        description: 'Mozzarella gorgonzola emmenthal parmesan and basil',
        features: 'Vegetarian',
        price: 69,
      },
      {
        name: 'Genovese',
        description: 'Mozzarella fresh pesto chicken and basil',
        price: 69,
      },
      {
        name: 'Porcini',
        description: 'Mozzarella porcini cream truffle oil porcini mushrooms and basil',
        features: 'Vegetarian',
        price: 79,
      },
      {
        name: 'Calzone',
        description: 'Mozzarella ricotta beef salami veal ham and basil',
        price: 75,
      },
    ],
  },
  {
    name: 'Panini',
    items: [
      {
        name: 'Pollo',
        description: 'Mozzarella fresh pesto and chicken',
        price: 55,
      },
      {
        name: 'Milano',
        description: 'Mozzarella ricotta rocket bresaola and parmesan shavings',
        price: 59,
      },
      {
        name: 'Roma',
        description: 'Mozzarella ricotta beef salami and turkey ham',
        price: 49,
      },
      {
        name: 'Piccante',
        description: 'Mozzarella beef salami peppers onions dried chillies and chilli oil',
        price: 55,
      },
      {
        name: 'Vegetariano',
        description: 'Mozzarella fresh pesto aubergine zucchini peppers and artichokes',
        features: 'Vegetarian',
        price: 49,
      },
      {
        name: 'Marchino',
        description: 'Mozzarella Vienna sausage french fries and cocktail sauce',
        price: 49,
      },
      {
        name: 'Toast',
        description: 'Toast bread veal prosciutto and emmenthal cheese',
        price: 39,
      },
    ],
  },
  {
    name: 'Drinks',
    items: [
      {
        name: 'Water 500ml',
        price: 12,
      },
      {
        name: 'Water 1L',
        price: 25,
      },
      {
        name: 'Sparkling Water 500ml',
        price: 12,
      },
      {
        name: 'Sparkling Water 1L',
        price: 25,
      },
      {
        name: 'Soft Drinks',
        price: 12,
      },
      {
        name: 'EstaThe Peach/Lemon',
        price: 15,
      },
    ],
  },
  {
    name: 'Desserts',
    items: [
      {
        name: 'Tiramisu',
        price: 40,
      },
      {
        name: 'Panna Cotta',
        price: 40,
      },
      {
        name: 'Chocolate Tartufo',
        features: 'Bestseller',
        price: 50,
      },
      {
        name: 'Gelato',
        price: 25,
      },
      {
        name: 'Lemon Sorbetto',
        price: 25,
      },
    ],
  },
  {
    name: 'Pasta',
    items: [
      {
        name: 'Lasagna',
        description: 'Layered pasta sheets with ragu and bechamel',
        features: 'Bestseller',
        price: 68,
      },
    ],
  },
  {
    name: 'Salad',
    items: [
      {
        name: 'Caesar Salad',
        description: 'Half grilled chicken breast romaine lettuce croutons parmesan shavings and caesar dressing',
        price: 59,
      },
      {
        name: 'Insalata Mediterranea',
        description: 'Cucumber cherry tomato feta cheese taggiasche olives oregano and EVO oil',
        features: 'Vegetarian Gluten Free',
        price: 79,
      },
      {
        name: 'Insalata di Tonno',
        description: 'Iceberg lettuce tuna cherry tomato taggiasche olives boiled egg buffalo mozzarella and lemon dressing',
        features: 'Gluten Free',
        price: 69,
      },
    ],
  },
  {
    name: 'Sides',
    items: [
      {
        name: 'Insalata Mista',
        description: 'Iceberg lettuce carrots and cherry tomato',
        features: 'Vegetarian Gluten Free',
        price: 49,
      },
      {
        name: 'Patate al Forno',
        description: 'Oven baked potatoes',
        features: 'Vegetarian Gluten Free',
        price: 29,
      },
      {
        name: 'Patatine Fritte',
        description: 'Fried potatoes',
        features: 'Vegetarian',
        price: 29,
      },
      {
        name: 'Verdure Grigliate',
        description: 'Grilled eggplant zucchini and bell peppers',
        features: 'Vegetarian Gluten Free',
        price: 35,
      },
    ],
  },
  {
    name: 'Mains',
    items: [
      {
        name: 'Petto di Pollo',
        description: 'Grilled chicken breast',
        features: 'Gluten Free',
        price: 69,
      },
      {
        name: 'Cotoletta alla Milanese',
        description: 'Breaded crispy chicken breast with fresh cherry tomato',
        price: 75,
      },
      {
        name: 'Bresaola',
        description: 'Bresaola rocket salad and parmesan shavings',
        features: 'Gluten Free',
        price: 79,
      },
    ],
  },
  {
    name: 'Bites',
    items: [
      {
        name: 'Caprese',
        description: 'Buffalo mozzarella cherry tomato and basil',
        features: 'Vegetarian Gluten Free',
        price: 49,
      },
      {
        name: 'Burrata Sbagliata',
        description: 'Stracciatella cherry tomato and baby spinach',
        features: 'Vegetarian Gluten Free',
        price: 59,
      },
      {
        name: 'Burrata',
        description: 'Locally produced fresh burrata rocket leaves and cherry tomato',
        features: 'Vegetarian Gluten Free',
        price: 55,
      },
      {
        name: 'Polpette al Sugo',
        description: 'Beef meatballs tomato sauce and parmesan',
        price: 45,
      },
      {
        name: 'Parmigiana',
        description: 'Grilled eggplant smoked mozzarella parmesan and tomato sauce',
        features: 'Vegetarian',
        price: 50,
      },
      {
        name: 'Cuoppo Napoletano',
        description: 'Fried selection of pizza dough frittatina and mozzarella balls',
        price: 38,
      },
      {
        name: 'Frittatina 30s',
        description: 'Fried homemade pasta with ragu and peas',
        price: 18,
      },
    ],
  },
  {
    name: 'Coffee',
    items: [
      {
        name: 'Espresso',
        price: 15,
      },
    ],
  },
];

