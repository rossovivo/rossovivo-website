export const homeSchemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      name: "Rossovivo Pizzeria",
      url: "https://www.rossovivo.com/",
      logo: "https://cdn.sanity.io/images/qcsslhtr/production/71c1a44d8d295560ecf6cce07a20fd91877f03ce-3174x1440.png",
      description:
        "Authentic Italian wood-fired pizzeria in Dubai serving artisan pizzas, handcrafted pastas and Italian classics since 2009.",
      foundingDate: "2009",
      servesCuisine: ["Italian", "Pizza", "Pasta"],
      priceRange: "$$",
      telephone: "+97143805833",
      email: "ciao@rossovivo.ae",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Ground Floor, Millennium Tower, Sheikh Zayed Road",
        addressLocality: "Business Bay, Dubai",
        addressCountry: "AE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "11:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "11:00",
          closes: "23:30",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Rossovivo Menu",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "FoodEstablishment",
              name: "Wood-Fired Pizza",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "FoodEstablishment",
              name: "Handcrafted Pasta",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      name: "Rossovivo",
      url: "https://www.rossovivo.com/",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://www.rossovivo.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const homeFaqs = [
  {
    question: "What type of cuisine does Rossovivo serve?",
    answer:
      "Rossovivo serves authentic Italian cuisine including wood-fired artisan pizzas, handcrafted pastas, and Italian classics. All food is prepared fresh using premium, authentic Italian ingredients.",
  },
  {
    question: "Where is Rossovivo located in Dubai?",
    answer:
      "Rossovivo has two locations in Dubai: Business Bay (Ground Floor, Millennium Tower, Sheikh Zayed Road) and Media City (Ground Floor, Office Park Building, Al Bourooj Street).",
  },
  {
    question: "Can I order Rossovivo pizza online?",
    answer:
      "Yes! You can order online directly from Rossovivo's website. Simply visit the Locations page and click 'Order Now' for your nearest branch.",
  },
  {
    question: "What are Rossovivo's opening hours?",
    answer:
      "Rossovivo is open Sunday to Thursday from 11 AM to 11 PM, and Friday to Saturday from 11 AM to 11:30 PM at both locations.",
  },
  {
    question: "Does Rossovivo offer dine-in?",
    answer:
      "Yes, Rossovivo offers a friendly dine-in experience at both their Business Bay and Media City restaurants in Dubai.",
  },
];

export const cateringSchemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Italian Pizza & Pasta Catering Dubai",
  provider: {
    "@type": "FoodEstablishment",
    name: "Rossovivo Pizzeria",
    url: "https://www.rossovivo.com/",
  },
  serviceType: "Catering",
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  description:
    "Live Italian catering service in Dubai featuring real wood-fire ovens, electric pizza ovens, tuk-tuk oven trucks and pasta stations. Available for corporate events, weddings and home parties.",
  offers: {
    "@type": "Offer",
    description:
      "Custom catering packages starting from 3-hour live station service. Includes chef, setup and cleanup.",
    areaServed: "Dubai, UAE",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catering Options",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Electric Oven — Indoor Catering",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wood Fire Oven — Outdoor Catering",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tuk-Tuk Oven Truck — Bestseller",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pasta Station — Add-On Service",
        },
      },
    ],
  },
};

export const cateringFaqs = [
  {
    question: "Does Rossovivo offer catering services in Dubai?",
    answer:
      "Yes, Rossovivo provides full Italian catering services across Dubai for corporate events, weddings, home parties, and more. Their chefs cook everything on-site using real pizza ovens and pasta stations.",
  },
  {
    question: "What types of pizza ovens are available for catering?",
    answer:
      "Rossovivo offers three oven options: Electric Ovens (ideal for indoor venues), Wood Fire Ovens (great for outdoor locations), and their bestselling Tuk-Tuk Oven Truck (outdoor events with a built-in wood-fire oven).",
  },
  {
    question: "How many guests can Rossovivo cater for?",
    answer:
      "Rossovivo's catering packages are flexible and scalable, accommodating intimate gatherings to events of 500 or more guests.",
  },
  {
    question: "What is included in Rossovivo's catering package?",
    answer:
      "The standard package includes on-site pizza ovens or pasta stations, a live chef, full pre-event setup and post-event cleanup, authentic ingredients, and 3 hours of live station service. No hidden fees.",
  },
  {
    question: "Can I customise the catering menu?",
    answer:
      "Yes, Rossovivo offers customisable menus tailored to your event and guest preferences. You can also request premium ingredients, extended service time, additional stations, and service staff as add-ons.",
  },
  {
    question: "How do I request a catering quote from Rossovivo?",
    answer:
      "Fill out the catering enquiry form on the Catering page with your event details, guest count, venue type, and date. Rossovivo will respond via WhatsApp within 24 hours with a tailored quote.",
  },
];

export const aboutSchemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "About Rossovivo",
      url: "https://www.rossovivo.com/about",
      description:
        "Learn about Rossovivo — Dubai's authentic Italian trattoria serving wood-fired pizzas, handcrafted pasta and Italian classics since 2009.",
    },
    {
      "@type": "Organization",
      name: "Rossovivo Pizzeria",
      url: "https://www.rossovivo.com/",
      foundingDate: "2009",
      description:
        "Italian trattoria specialising in wood-fired pizzas, handcrafted pastas and comfort Italian classics. Operating in Dubai since 2009.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+97143805833",
          contactType: "Customer Service",
          areaServed: "AE",
          availableLanguage: "English",
        },
      ],
      sameAs: ["https://www.instagram.com/rossovivopizza/"],
    },
  ],
};

export const aboutFaqs = [
  {
    question: "When was Rossovivo founded?",
    answer:
      "Rossovivo was established in 2009 and has been serving authentic Italian wood-fired pizzas and pastas in Dubai ever since.",
  },
  {
    question:
      "What makes Rossovivo different from other pizza restaurants in Dubai?",
    answer:
      "Rossovivo stays true to authentic Italian craftsmanship — dough is prepped with care, sauces are slow-cooked, and cheeses are made in-house. They use only premium, authentic Italian ingredients with no shortcuts.",
  },
  {
    question: "Does Rossovivo make everything in-house?",
    answer:
      "Yes, Rossovivo makes their sauces, dough, and cheeses in-house to ensure the highest quality and authenticity in every dish.",
  },
  {
    question: "Does Rossovivo offer food delivery across Dubai?",
    answer:
      "Yes, Rossovivo delivers food across Dubai from both their Media City and Business Bay locations.",
  },
];

export const locationsSchemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Restaurant", "LocalBusiness"],
      name: "Rossovivo — Business Bay",
      url: "https://www.rossovivo.com/locations",
      telephone: "+97143805833",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Ground Floor, Millennium Tower, Sheikh Zayed Road",
        addressLocality: "Business Bay",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.1948124,
        longitude: 55.2662633,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "11:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "11:00",
          closes: "23:30",
        },
      ],
      servesCuisine: "Italian",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.3",
        reviewCount: "402",
      },
    },
    {
      "@type": ["Restaurant", "LocalBusiness"],
      name: "Rossovivo — Media City",
      url: "https://www.rossovivo.com/locations",
      telephone: "+97144272477",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Ground Floor, Office Park Building, Al Bourooj Street",
        addressLocality: "Media City, Al Sufouh",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.1045781,
        longitude: 55.1687334,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "11:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "11:00",
          closes: "23:30",
        },
      ],
      servesCuisine: "Italian",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.3",
        reviewCount: "299",
      },
    },
  ],
};

export const locationsFaqs = [
  {
    question:
      "How many Rossovivo restaurant locations are there in Dubai?",
    answer:
      "Rossovivo currently has two restaurant locations in Dubai — one in Business Bay (Millennium Tower) and one in Media City (Office Park Building).",
  },
  {
    question: "What is the address of Rossovivo Business Bay?",
    answer:
      "Rossovivo Business Bay is located at Ground Floor, Millennium Tower, Sheikh Zayed Road, Business Bay, Dubai. Phone: +971 4 380 5833.",
  },
  {
    question: "What is the address of Rossovivo Media City?",
    answer:
      "Rossovivo Media City is located at Ground Floor, Office Park Building, Al Bourooj Street, Dubai. Phone: +971 4 427 2477.",
  },
  {
    question: "What are the Google ratings for Rossovivo restaurants?",
    answer:
      "Both Rossovivo locations hold a 4.3-star rating on Google — Business Bay with 402 reviews and Media City with 299 reviews.",
  },
  {
    question: "Is there parking near Rossovivo Business Bay?",
    answer:
      "Rossovivo Business Bay is located in the Millennium Tower on Sheikh Zayed Road, which has parking facilities in the building and nearby areas. We recommend checking Google Maps for current parking options.",
  },
];

export const contactSchemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Contact Rossovivo Dubai",
      url: "https://www.rossovivo.com/contact",
      description:
        "Contact Rossovivo for catering enquiries, event bookings, or general restaurant questions in Dubai.",
    },
    {
      "@type": "LocalBusiness",
      name: "Rossovivo Pizzeria",
      url: "https://www.rossovivo.com/",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+97143805833",
          contactType: "Customer Support",
          name: "Business Bay",
        },
        {
          "@type": "ContactPoint",
          telephone: "+97144272477",
          contactType: "Customer Support",
          name: "Media City",
        },
        {
          "@type": "ContactPoint",
          email: "catering@rossovivo.ae",
          contactType: "Catering Enquiries",
        },
        {
          "@type": "ContactPoint",
          email: "ciao@rossovivo.ae",
          contactType: "General Enquiries",
        },
      ],
    },
  ],
};

export const contactFaqs = [
  {
    question: "How can I contact Rossovivo for a catering enquiry?",
    answer:
      "You can reach Rossovivo's catering team via email at catering@rossovivo.ae, via WhatsApp, or by filling out the event enquiry form on the Contact page. They respond within 24 hours.",
  },
  {
    question: "What is the general email address for Rossovivo?",
    answer:
      "For general enquiries, you can contact Rossovivo at ciao@rossovivo.ae. For catering specifically, use catering@rossovivo.ae.",
  },
  {
    question: "Can I book a private event through the Contact page?",
    answer:
      "Yes, the Contact page features an event planning form where you can submit your event details including date, guest count, venue type, and catering preferences to receive a tailored quote.",
  },
  {
    question: "Does Rossovivo have a WhatsApp contact?",
    answer:
      "Yes, Rossovivo can be contacted via WhatsApp for quick catering enquiries and event planning. A WhatsApp button is available directly on their website.",
  },
];

export const privacyPolicySchemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — Rossovivo Pizzeria",
  url: "https://www.rossovivo.com/privacy-policy",
  description:
    "Rossovivo's privacy policy covering data collection, usage, cookies and your rights as a user.",
  dateModified: "2026-02-14",
  publisher: {
    "@type": "Organization",
    name: "Rossovivo Pizzeria",
    url: "https://www.rossovivo.com/",
  },
};

export const privacyPolicyFaqs = [
  {
    question: "What personal data does Rossovivo collect?",
    answer:
      "Rossovivo collects information you provide directly such as name, phone number, email, and event details submitted through forms. They also collect technical data like IP addresses and browser information through cookies.",
  },
  {
    question: "Does Rossovivo sell personal data to third parties?",
    answer:
      "No, Rossovivo does not sell personal information. They may share data only with service providers that help operate the website and services, or when required by law.",
  },
  {
    question: "How long does Rossovivo retain personal data?",
    answer:
      "Rossovivo retains personal data only as long as necessary for the stated purposes or to meet legal, accounting, and reporting obligations.",
  },
];

export const termsOfServiceSchemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service — Rossovivo Pizzeria",
  url: "https://www.rossovivo.com/terms-of-service",
  description:
    "Terms governing the use of Rossovivo's website, online ordering services and catering bookings in Dubai, UAE.",
  dateModified: "2026-02-14",
  publisher: {
    "@type": "Organization",
    name: "Rossovivo Pizzeria",
    url: "https://www.rossovivo.com/",
  },
};

export const termsOfServiceFaqs = [
  {
    question: "What law governs Rossovivo's Terms of Service?",
    answer:
      "Rossovivo's Terms of Service are governed by the applicable laws of the United Arab Emirates, with disputes subject to the competent courts in Dubai.",
  },
  {
    question: "Can Rossovivo cancel or decline my order?",
    answer:
      "Yes, Rossovivo may decline or cancel orders in cases of unavailability, pricing errors, or suspected misuse, as stated in their Terms of Service.",
  },
  {
    question: "Are there cancellation terms for catering bookings?",
    answer:
      "Yes, catering engagements may require deposits, scheduling confirmation, and cancellation notice windows. Final terms for each event are defined in the applicable quote or written agreement.",
  },
];
