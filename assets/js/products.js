/* ============================================================
   PRODUCT DATA
   Central catalog used by index.html, product.html, admin.html
   In a real store this would come from a backend/database.
   Images are placeholder URLs — swap with your real product photos.
   ============================================================ */

const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Premium Smartwatch Series X",
    category: "Electronics",
    price: 199.99,
    originalPrice: 299.99,
    rating: 5,
    reviews: 1243,
    stock: 42,
    sku: "OCS-EL-1001",
    image: "https://picsum.photos/seed/smartwatch/700/700",
    gallery: [
      "https://picsum.photos/seed/smartwatch/700/700",
      "https://picsum.photos/seed/smartwatch2/700/700",
      "https://picsum.photos/seed/smartwatch3/700/700"
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Track your fitness, heart rate, and notifications on a bright always-on display. 10-day battery life, waterproof up to 50m, and 100+ workout modes.",
    specs: { "Display": "1.4\" AMOLED", "Battery": "10 days", "Water Resistance": "5 ATM", "Connectivity": "Bluetooth 5.2", "Compatibility": "iOS & Android" },
    options: ["Midnight Black", "Silver", "Rose Gold"],
    badge: "Best Seller"
  },
  {
    id: "p2",
    name: "Portable Power Bank 30000mAh",
    category: "Electronics",
    price: 34.99,
    originalPrice: 54.99,
    rating: 4,
    reviews: 2145,
    stock: 130,
    sku: "OCS-EL-1002",
    image: "https://picsum.photos/seed/powerbank/700/700",
    gallery: ["https://picsum.photos/seed/powerbank/700/700", "https://picsum.photos/seed/powerbank2/700/700"],
    description: "High-capacity fast charging power bank with dual USB-C ports. Charges two devices simultaneously with pass-through charging support.",
    specs: { "Capacity": "30000mAh", "Ports": "2x USB-C, 1x USB-A", "Fast Charge": "22.5W", "Weight": "520g" },
    options: []
  },
  {
    id: "p3",
    name: "Waterproof Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    originalPrice: 129.99,
    rating: 5,
    reviews: 3892,
    stock: 76,
    sku: "OCS-EL-1003",
    image: "https://picsum.photos/seed/speaker/700/700",
    gallery: ["https://picsum.photos/seed/speaker/700/700", "https://picsum.photos/seed/speaker2/700/700"],
    description: "360-degree immersive sound with deep bass. IPX7 waterproof rating means it's ready for the pool, beach, or shower.",
    specs: { "Battery": "24 hours", "Waterproof": "IPX7", "Bluetooth": "5.3", "Output": "30W" },
    options: ["Black", "Blue", "Red"],
    badge: "Trending"
  },
  {
    id: "p4",
    name: "Laptop Backpack 17-inch",
    category: "Fashion",
    price: 44.99,
    originalPrice: 69.99,
    rating: 5,
    reviews: 1567,
    stock: 58,
    sku: "OCS-FA-1004",
    image: "https://picsum.photos/seed/backpack/700/700",
    gallery: ["https://picsum.photos/seed/backpack/700/700", "https://picsum.photos/seed/backpack2/700/700"],
    description: "Anti-theft design with USB charging port. Padded compartment fits laptops up to 17 inches, plus organized pockets for daily essentials.",
    specs: { "Capacity": "35L", "Material": "Water-resistant nylon", "Laptop Size": "Up to 17\"" },
    options: ["Black", "Grey"]
  },
  {
    id: "p5",
    name: "USB-C Hub Multiport Adapter",
    category: "Electronics",
    price: 39.99,
    originalPrice: 74.99,
    rating: 5,
    reviews: 2234,
    stock: 95,
    sku: "OCS-EL-1005",
    image: "https://picsum.photos/seed/usbhub/700/700",
    gallery: ["https://picsum.photos/seed/usbhub/700/700"],
    description: "7-in-1 hub with HDMI 4K, USB 3.0, SD card reader, and 100W power delivery pass-through.",
    specs: { "Ports": "7-in-1", "HDMI": "4K@60Hz", "Power Delivery": "100W" },
    options: []
  },
  {
    id: "p6",
    name: "Wireless Mouse Silent Click",
    category: "Electronics",
    price: 24.99,
    originalPrice: 44.99,
    rating: 4,
    reviews: 1845,
    stock: 210,
    sku: "OCS-EL-1006",
    image: "https://picsum.photos/seed/mouse/700/700",
    gallery: ["https://picsum.photos/seed/mouse/700/700"],
    description: "Ergonomic silent-click mouse with adjustable DPI up to 2400. Works on any surface with a 2.4GHz USB receiver.",
    specs: { "DPI": "800-2400", "Battery": "AA x1, 12 months", "Connection": "2.4GHz Wireless" },
    options: ["Black", "White"]
  },
  {
    id: "p7",
    name: "Monitor Arm Stand Dual",
    category: "Home & Garden",
    price: 89.99,
    originalPrice: 149.99,
    rating: 5,
    reviews: 987,
    stock: 34,
    sku: "OCS-HM-1007",
    image: "https://picsum.photos/seed/monitorarm/700/700",
    gallery: ["https://picsum.photos/seed/monitorarm/700/700"],
    description: "Full-motion dual monitor mount with gas-spring arms. Fits screens 13-32 inches, tool-free height adjustment.",
    specs: { "Screen Size": "13-32\"", "Weight Capacity": "9kg per arm", "Mount": "Desk clamp / grommet" },
    options: []
  },
  {
    id: "p8",
    name: "Webcam HD 1080p",
    category: "Electronics",
    price: 49.99,
    originalPrice: 89.99,
    rating: 5,
    reviews: 2654,
    stock: 88,
    sku: "OCS-EL-1008",
    image: "https://picsum.photos/seed/webcam/700/700",
    gallery: ["https://picsum.photos/seed/webcam/700/700"],
    description: "Crisp 1080p video with auto light correction and built-in noise-reducing microphone. Plug-and-play, no drivers needed.",
    specs: { "Resolution": "1080p @30fps", "Field of View": "90°", "Microphone": "Dual, noise-reducing" },
    options: []
  },
  {
    id: "p9",
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 59.99,
    originalPrice: 142.99,
    rating: 5,
    reviews: 3120,
    stock: 64,
    sku: "OCS-EL-1009",
    image: "https://picsum.photos/seed/keyboard/700/700",
    gallery: ["https://picsum.photos/seed/keyboard/700/700", "https://picsum.photos/seed/keyboard2/700/700"],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "RGB backlit mechanical keyboard with hot-swappable switches. Full anti-ghosting and durable double-shot keycaps.",
    specs: { "Switches": "Hot-swappable, blue/red/brown", "Backlight": "16.8M RGB", "Layout": "Full-size 104-key" },
    options: ["Blue Switch", "Red Switch", "Brown Switch"],
    badge: "Hot Deal"
  },
  {
    id: "p10",
    name: "4K Smart TV 55-inch",
    category: "Electronics",
    price: 349.99,
    originalPrice: 515.99,
    rating: 4,
    reviews: 1892,
    stock: 19,
    sku: "OCS-EL-1010",
    image: "https://picsum.photos/seed/smarttv/700/700",
    gallery: ["https://picsum.photos/seed/smarttv/700/700"],
    description: "Crystal-clear 4K UHD display with built-in streaming apps, voice remote, and HDR10 support.",
    specs: { "Screen Size": "55\"", "Resolution": "4K UHD (3840x2160)", "HDR": "HDR10", "Smart OS": "Built-in" },
    options: []
  },
  {
    id: "p11",
    name: "Professional Camera DSLR",
    category: "Electronics",
    price: 799.99,
    originalPrice: 1329.99,
    rating: 5,
    reviews: 956,
    stock: 12,
    sku: "OCS-EL-1011",
    image: "https://picsum.photos/seed/camera/700/700",
    gallery: ["https://picsum.photos/seed/camera/700/700", "https://picsum.photos/seed/camera2/700/700"],
    description: "24.2MP APS-C sensor with 4K video recording. Includes an 18-55mm kit lens, perfect for beginners and hobbyists.",
    specs: { "Sensor": "24.2MP APS-C", "Video": "4K @30fps", "ISO Range": "100-25600", "Lens": "18-55mm kit" },
    options: []
  },
  {
    id: "p12",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 119.99,
    originalPrice: 249.99,
    rating: 5,
    reviews: 7456,
    stock: 150,
    sku: "OCS-EL-1012",
    image: "https://picsum.photos/seed/earbuds/700/700",
    gallery: ["https://picsum.photos/seed/earbuds/700/700"],
    description: "Active noise cancellation with 32-hour total battery life via charging case. Sweat-resistant, perfect for workouts.",
    specs: { "Battery": "8h + 24h case", "ANC": "Yes, adaptive", "Water Resistance": "IPX5" },
    options: ["Black", "White"],
    badge: "#1 Best Seller"
  },
  {
    id: "p13",
    name: "Yoga Mat Premium Non-Slip",
    category: "Sports & Outdoors",
    price: 28.99,
    originalPrice: 45.00,
    rating: 5,
    reviews: 621,
    stock: 200,
    sku: "OCS-SP-1013",
    image: "https://picsum.photos/seed/yogamat/700/700",
    gallery: ["https://picsum.photos/seed/yogamat/700/700"],
    description: "Extra-thick 6mm cushioning with a non-slip textured surface. Includes carrying strap.",
    specs: { "Thickness": "6mm", "Material": "TPE, eco-friendly", "Size": "183 x 61cm" },
    options: ["Purple", "Teal", "Charcoal"]
  },
  {
    id: "p14",
    name: "Classic Leather Wallet",
    category: "Fashion",
    price: 22.99,
    originalPrice: 39.99,
    rating: 4,
    reviews: 845,
    stock: 300,
    sku: "OCS-FA-1014",
    image: "https://picsum.photos/seed/wallet/700/700",
    gallery: ["https://picsum.photos/seed/wallet/700/700"],
    description: "Genuine leather bifold wallet with RFID-blocking technology and 8 card slots.",
    specs: { "Material": "Genuine leather", "RFID Blocking": "Yes", "Card Slots": "8" },
    options: ["Brown", "Black"]
  },
  {
    id: "p15",
    name: "Non-Stick Cookware Set 10pc",
    category: "Home & Garden",
    price: 129.99,
    originalPrice: 219.99,
    rating: 5,
    reviews: 1120,
    stock: 40,
    sku: "OCS-HM-1015",
    image: "https://picsum.photos/seed/cookware/700/700",
    gallery: ["https://picsum.photos/seed/cookware/700/700"],
    description: "10-piece non-stick cookware set including pots, pans, and lids. Dishwasher safe and induction compatible.",
    specs: { "Pieces": "10", "Coating": "Non-stick ceramic", "Induction Compatible": "Yes" },
    options: []
  },
  {
    id: "p16",
    name: "Bestselling Novel Box Set",
    category: "Books & Media",
    price: 34.99,
    originalPrice: 59.99,
    rating: 5,
    reviews: 432,
    stock: 85,
    sku: "OCS-BK-1016",
    image: "https://picsum.photos/seed/books/700/700",
    gallery: ["https://picsum.photos/seed/books/700/700"],
    description: "A collector's box set of three bestselling novels, perfect for gifting or your personal library.",
    specs: { "Format": "Hardcover", "Volumes": "3" },
    options: []
  }
];

// Load from localStorage if the admin has made edits, else fall back to defaults
function getProducts() {
  try {
    const saved = localStorage.getItem('ocs_products');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem('ocs_products', JSON.stringify(products));
}

function getProductById(id) {
  return getProducts().find(p => p.id === id);
}
