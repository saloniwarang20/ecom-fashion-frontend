export const SIZES = [
    "FREE_SIZE",

    // Clothing
    "XXS",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",

    // Numeric Clothing
    "SIZE_26",
    "SIZE_28",
    "SIZE_30",
    "SIZE_32",
    "SIZE_34",
    "SIZE_36",
    "SIZE_38",
    "SIZE_40",
    "SIZE_42",
    "SIZE_44",
    "SIZE_46",

    // Footwear (UK)
    "UK_3",
    "UK_4",
    "UK_5",
    "UK_6",
    "UK_7",
    "UK_8",
    "UK_9",
    "UK_10",
    "UK_11",
]

export const COLORS = [
  { name: "BLACK", hex: "#000000" },
  { name: "WHITE", hex: "#FFFFFF" },
  { name: "GREY", hex: "#808080" },
  { name: "SILVER", hex: "#C0C0C0" },

  { name: "RED", hex: "#EF4444" },
  { name: "MAROON", hex: "#800000" },
  { name: "BURGUNDY", hex: "#800020" },

  { name: "PINK", hex: "#ff8da1" },
  { name: "HOT_PINK", hex: "#FF69B4" },

  { name: "ORANGE", hex: "#E86100" },
  { name: "PEACH", hex: "#FFDAB9" },
  { name: "CORAL", hex: "#FF7F50" },

  { name: "YELLOW", hex: "#FFEE8C" },
  { name: "MUSTARD", hex: "#D4A017" },

  { name: "GREEN", hex: "#008000" },
  { name: "OLIVE", hex: "#808000" },
  { name: "MINT", hex: "#98FF98" },
  { name: "EMERALD", hex: "#10B981" },

  { name: "BLUE", hex: "#3B82F6" },
  { name: "NAVY", hex: "#1E3A8A" },
  { name: "SKY_BLUE", hex: "#87CEEB" },
  { name: "TEAL", hex: "#0F766E" },
  { name: "TURQUOISE", hex: "#40E0D0" },

  { name: "PURPLE", hex: "#9333EA" },
  { name: "LAVENDER", hex: "#C084FC" },
  { name: "VIOLET", hex: "#8B5CF6" },

  { name: "BROWN", hex: "#341C02" },
  { name: "BEIGE", hex: "#F5F5DC" },
  { name: "KHAKI", hex: "#C3B091" },
  { name: "TAN", hex: "#D2B48C" },
  { name: "CREAM", hex: "#FFFDD0" },

  { name: "GOLD", hex: "#FFD700" },
  { name: "ROSE_GOLD", hex: "#B76E79" },

  { name: "MULTICOLOR", hex: "linear-gradient(45deg, red, orange, yellow, green, blue, purple)" }
];

export const PRICE_RANGES = [
    {
        label: "Under ₹1000",
        min: 0,
        max: 1000,
    },
    {
        label: "₹1000 - ₹2000",
        min: 1000,
        max: 2000,
    },
    {
        label: "₹2000 - ₹3000",
        min: 2000,
        max: 3000,
    },
    {
        label: "Above ₹3000",
        min: 3000,
        max: null,
    },
];