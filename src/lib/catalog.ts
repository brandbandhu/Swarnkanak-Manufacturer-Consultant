import rotavator from "@/assets/p-rotavator.jpg";
import harrow from "@/assets/p-harrow.jpg";
import plough from "@/assets/p-plough.jpg";
import harvester from "@/assets/p-harvester.jpg";
import cultivator from "@/assets/p-cultivator.jpg";
import baler from "@/assets/p-baler.jpg";
import trailer from "@/assets/p-trailer.jpg";
import mulcher from "@/assets/p-mulcher.jpg";
import seeddrill from "@/assets/p-seeddrill.jpg";
import sprayer from "@/assets/p-sprayer.jpg";

export const IMAGES = {
  rotavator,
  harrow,
  plough,
  harvester,
  cultivator,
  baler,
  trailer,
  mulcher,
  seeddrill,
  sprayer,
};

export type PurchaseMode = "direct" | "quotation";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  subcategory: string;
  image: string;
  shortDesc: string;
  description: string;
  price: number;
  offerPrice: number;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  bestseller: boolean;
  purchaseMode: PurchaseMode;
  status: "published" | "draft";
  hp: string;
  workingWidth: string;
  weight: string;
  blades: string;
  warranty: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  blurb: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "c1",
    name: "Tillage Equipment",
    slug: "tillage-equipment",
    image: rotavator,
    blurb: "Rotavators, harrows, cultivators and ploughs for perfect seedbed preparation.",
    subcategories: [
      "Rotavator",
      "Disc Harrow",
      "Power Harrow",
      "Cultivator",
      "Disc Plough",
      "Reversible Plough",
    ],
  },
  {
    id: "c2",
    name: "Seeding and Planting",
    slug: "seeding-and-planting",
    image: seeddrill,
    blurb: "Precision drills and planters for uniform sowing and higher germination.",
    subcategories: [
      "Seed Drill",
      "Zero Till Drill",
      "Potato Planter",
      "Multi-Crop Planter",
      "Raised Bed Planter",
    ],
  },
  {
    id: "c3",
    name: "Crop Protection",
    slug: "crop-protection",
    image: sprayer,
    blurb: "Sprayers and blowers engineered for even coverage and low chemical waste.",
    subcategories: ["Boom Sprayer", "Mist Blower", "Tractor-Mounted Sprayer"],
  },
  {
    id: "c4",
    name: "Harvesting",
    slug: "harvesting",
    image: harvester,
    blurb: "Reapers, diggers and harvesters that reduce field losses and labour cost.",
    subcategories: ["Reaper", "Combine Harvester", "Potato Digger", "Forage Harvester"],
  },
  {
    id: "c5",
    name: "Post-Harvest Equipment",
    slug: "post-harvest-equipment",
    image: baler,
    blurb: "Balers, threshers and straw reapers for profitable residue management.",
    subcategories: ["Square Baler", "Round Baler", "Thresher", "Straw Reaper"],
  },
  {
    id: "c6",
    name: "Landscaping & Residue",
    slug: "landscaping-and-residue",
    image: mulcher,
    blurb: "Mulchers, mowers and shredders for clean fields and orchard management.",
    subcategories: ["Rotary Mulcher", "Flail Mower", "Shredder"],
  },
  {
    id: "c7",
    name: "Transportation",
    slug: "transportation",
    image: trailer,
    blurb: "Heavy duty hydraulic trailers and trolleys built for Indian farm roads.",
    subcategories: ["Hydraulic Trailer", "Tipping Trailer", "Agricultural Trolley"],
  },
  {
    id: "c8",
    name: "Tractor Attachments",
    slug: "tractor-attachments",
    image: plough,
    blurb: "Linkage, hitches and utility attachments compatible with all major tractors.",
    subcategories: ["Front Blade", "Post Hole Digger", "Land Leveller"],
  },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

interface Seed {
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  image: string;
  price: number;
  offerPrice: number;
  stock: number;
  hp: string;
  width: string;
  weight: string;
  blades: string;
  mode?: PurchaseMode;
  featured?: boolean;
  bestseller?: boolean;
  short: string;
}

const SEEDS: Seed[] = [
  { name: "SKM Pro Rotavator 6 FT", sku: "SKM-RT-600", category: "Tillage Equipment", subcategory: "Rotavator", image: rotavator, price: 145000, offerPrice: 132500, stock: 14, hp: "45-55 HP", width: "6 FT", weight: "510 KG", blades: "42 Blades", featured: true, bestseller: true, short: "Multi-speed gear drive rotavator for fine seedbed preparation." },
  { name: "SKM Pro Rotavator 7 FT", sku: "SKM-RT-700", category: "Tillage Equipment", subcategory: "Rotavator", image: rotavator, price: 168000, offerPrice: 156000, stock: 9, hp: "50-65 HP", width: "7 FT", weight: "585 KG", blades: "48 Blades", featured: true, short: "Wider working span for large land holdings and contract farming." },
  { name: "SKM Shakti Rotavator 5 FT", sku: "SKM-RT-500", category: "Tillage Equipment", subcategory: "Rotavator", image: rotavator, price: 118000, offerPrice: 109000, stock: 22, hp: "35-45 HP", width: "5 FT", weight: "420 KG", blades: "36 Blades", bestseller: true, short: "Compact rotavator ideal for small and mid-size tractors." },
  { name: "SKM Heavy Duty Disc Harrow 16 Disc", sku: "SKM-DH-160", category: "Tillage Equipment", subcategory: "Disc Harrow", image: harrow, price: 96000, offerPrice: 88500, stock: 18, hp: "40-55 HP", width: "5.2 FT", weight: "390 KG", blades: "16 Discs", featured: true, short: "Mounted offset harrow with boron steel discs for tough soil." },
  { name: "SKM Power Harrow 2.5 M", sku: "SKM-PH-250", category: "Tillage Equipment", subcategory: "Power Harrow", image: harrow, price: 212000, offerPrice: 198000, stock: 5, hp: "60-75 HP", width: "8.2 FT", weight: "740 KG", blades: "20 Tines", short: "Vertical tine harrow delivering a level, stone-free seedbed." },
  { name: "SKM Spring Tine Cultivator 11 Tine", sku: "SKM-CU-110", category: "Tillage Equipment", subcategory: "Cultivator", image: cultivator, price: 64000, offerPrice: 58500, stock: 27, hp: "35-50 HP", width: "7 FT", weight: "285 KG", blades: "11 Tines", bestseller: true, short: "Rigid frame cultivator with heat-treated spring tines." },
  { name: "SKM Reversible Plough 2 Bottom", sku: "SKM-RP-200", category: "Tillage Equipment", subcategory: "Reversible Plough", image: plough, price: 158000, offerPrice: 146000, stock: 7, hp: "50-65 HP", width: "2 x 14 IN", weight: "620 KG", blades: "2 Bottoms", featured: true, short: "Hydraulic reversible plough for deep, uniform primary tillage." },
  { name: "SKM Disc Plough 3 Disc", sku: "SKM-DP-300", category: "Tillage Equipment", subcategory: "Disc Plough", image: plough, price: 89000, offerPrice: 81500, stock: 12, hp: "45-55 HP", width: "3 x 26 IN", weight: "410 KG", blades: "3 Discs", short: "Ideal for hard, dry and root-infested land conditions." },
  { name: "SKM Seed Drill 11 Tyne", sku: "SKM-SD-110", category: "Seeding and Planting", subcategory: "Seed Drill", image: seeddrill, price: 78000, offerPrice: 71500, stock: 16, hp: "35-45 HP", width: "6.5 FT", weight: "320 KG", blades: "11 Tynes", featured: true, short: "Fluted roller metering for accurate seed and fertiliser placement." },
  { name: "SKM Zero Till Drill 13 Tyne", sku: "SKM-ZT-130", category: "Seeding and Planting", subcategory: "Zero Till Drill", image: seeddrill, price: 94000, offerPrice: 86500, stock: 10, hp: "45-55 HP", width: "7.5 FT", weight: "395 KG", blades: "13 Tynes", short: "Sow directly into stubble, save water, diesel and turnaround time." },
  { name: "SKM Potato Planter 2 Row", sku: "SKM-PP-200", category: "Seeding and Planting", subcategory: "Potato Planter", image: seeddrill, price: 132000, offerPrice: 124000, stock: 6, hp: "45-55 HP", width: "2 Rows", weight: "450 KG", blades: "2 Cups Belt", short: "Automatic cup-belt planter with fertiliser attachment." },
  { name: "SKM Multi-Crop Planter 4 Row", sku: "SKM-MP-400", category: "Seeding and Planting", subcategory: "Multi-Crop Planter", image: seeddrill, price: 186000, offerPrice: 172000, stock: 4, hp: "50-60 HP", width: "4 Rows", weight: "520 KG", blades: "4 Units", mode: "quotation", short: "Interchangeable plates for maize, cotton, groundnut and soybean." },
  { name: "SKM Boom Sprayer 400 L", sku: "SKM-BS-400", category: "Crop Protection", subcategory: "Boom Sprayer", image: sprayer, price: 68000, offerPrice: 62000, stock: 21, hp: "35-45 HP", width: "12 M Boom", weight: "230 KG", blades: "24 Nozzles", bestseller: true, short: "Tractor-mounted sprayer with triple-diaphragm pump and folding boom." },
  { name: "SKM Mist Blower 600 L", sku: "SKM-MB-600", category: "Crop Protection", subcategory: "Mist Blower", image: sprayer, price: 112000, offerPrice: 104000, stock: 8, hp: "45-55 HP", width: "16 M Throw", weight: "310 KG", blades: "16 Nozzles", short: "High-velocity air assist for orchards and tall crop coverage." },
  { name: "SKM Self-Propelled Reaper 4 FT", sku: "SKM-RE-400", category: "Harvesting", subcategory: "Reaper", image: harvester, price: 152000, offerPrice: 141000, stock: 11, hp: "Self Powered", width: "4 FT", weight: "265 KG", blades: "Cutter Bar", featured: true, short: "Low-loss crop reaper for wheat, paddy and pulses." },
  { name: "SKM Tractor Mounted Reaper 5 FT", sku: "SKM-RE-500", category: "Harvesting", subcategory: "Reaper", image: harvester, price: 178000, offerPrice: 165000, stock: 6, hp: "40-55 HP", width: "5 FT", weight: "340 KG", blades: "Cutter Bar", short: "Front-mounted reaper binder with adjustable cutting height." },
  { name: "SKM Potato Digger 2 Row", sku: "SKM-PD-200", category: "Harvesting", subcategory: "Potato Digger", image: harvester, price: 98000, offerPrice: 91000, stock: 9, hp: "45-55 HP", width: "2 Rows", weight: "380 KG", blades: "Chain Conveyor", short: "Gentle lifting with minimum tuber damage and clean separation." },
  { name: "SKM Combine Harvester Track Series", sku: "SKM-CH-900", category: "Harvesting", subcategory: "Combine Harvester", image: harvester, price: 2450000, offerPrice: 2450000, stock: 2, hp: "101 HP Engine", width: "14 FT", weight: "8500 KG", blades: "Track Type", mode: "quotation", short: "Track combine for paddy and wheat with large grain tank." },
  { name: "SKM Square Baler Compact", sku: "SKM-SB-100", category: "Post-Harvest Equipment", subcategory: "Square Baler", image: baler, price: 585000, offerPrice: 549000, stock: 3, hp: "50-60 HP", width: "1.6 M Pickup", weight: "1450 KG", blades: "Twine Knotter", featured: true, bestseller: true, short: "Reliable square baler producing dense, transport-ready bales." },
  { name: "SKM Round Baler 70x90", sku: "SKM-RB-790", category: "Post-Harvest Equipment", subcategory: "Round Baler", image: baler, price: 645000, offerPrice: 612000, stock: 3, hp: "55-70 HP", width: "1.8 M Pickup", weight: "1620 KG", blades: "Roller Chamber", mode: "quotation", short: "Fixed chamber round baler for straw, hay and silage." },
  { name: "SKM Multi-Crop Thresher", sku: "SKM-TH-500", category: "Post-Harvest Equipment", subcategory: "Thresher", image: baler, price: 165000, offerPrice: 152000, stock: 7, hp: "35-45 HP", width: "1.2 M", weight: "760 KG", blades: "Beater Type", short: "Clean grain output with adjustable sieve and blower settings." },
  { name: "SKM Straw Reaper 6 FT", sku: "SKM-SR-600", category: "Post-Harvest Equipment", subcategory: "Straw Reaper", image: baler, price: 385000, offerPrice: 362000, stock: 4, hp: "50-60 HP", width: "6 FT", weight: "1180 KG", blades: "Reel Type", short: "Collects and chops leftover straw in a single pass." },
  { name: "SKM Rotary Mulcher 6 FT", sku: "SKM-RM-600", category: "Landscaping & Residue", subcategory: "Rotary Mulcher", image: mulcher, price: 138000, offerPrice: 127500, stock: 13, hp: "45-55 HP", width: "6 FT", weight: "520 KG", blades: "Y Type Flails", featured: true, bestseller: true, short: "Shreds crop residue into fine mulch to enrich the soil." },
  { name: "SKM Flail Mower 5 FT", sku: "SKM-FM-500", category: "Landscaping & Residue", subcategory: "Flail Mower", image: mulcher, price: 96000, offerPrice: 89000, stock: 15, hp: "35-45 HP", width: "5 FT", weight: "395 KG", blades: "Hammer Flails", short: "Orchard and roadside mowing with side-shift facility." },
  { name: "SKM Shredder 7 FT", sku: "SKM-SH-700", category: "Landscaping & Residue", subcategory: "Shredder", image: mulcher, price: 152000, offerPrice: 142000, stock: 6, hp: "55-65 HP", width: "7 FT", weight: "610 KG", blades: "Straight Blades", short: "Heavy duty shredder for sugarcane trash and cotton stalks." },
  { name: "SKM Hydraulic Tipping Trailer 5 Ton", sku: "SKM-HT-500", category: "Transportation", subcategory: "Tipping Trailer", image: trailer, price: 235000, offerPrice: 219000, stock: 8, hp: "40-55 HP", width: "12 x 6 FT", weight: "1250 KG", blades: "3-Way Tipping", featured: true, short: "Three-way hydraulic tipping with heavy duty leaf spring axle." },
  { name: "SKM Hydraulic Trailer 8 Ton", sku: "SKM-HT-800", category: "Transportation", subcategory: "Hydraulic Trailer", image: trailer, price: 342000, offerPrice: 325000, stock: 4, hp: "50-65 HP", width: "14 x 7 FT", weight: "1980 KG", blades: "Rear Tipping", mode: "quotation", short: "Tandem axle trailer for sugarcane and heavy produce haulage." },
  { name: "SKM Agricultural Trolley 3 Ton", sku: "SKM-AT-300", category: "Transportation", subcategory: "Agricultural Trolley", image: trailer, price: 148000, offerPrice: 138000, stock: 12, hp: "30-45 HP", width: "10 x 5 FT", weight: "820 KG", blades: "Manual Tipping", bestseller: true, short: "Everyday farm trolley with reinforced steel deck." },
  { name: "SKM Land Leveller 8 FT", sku: "SKM-LL-800", category: "Tractor Attachments", subcategory: "Land Leveller", image: plough, price: 72000, offerPrice: 66500, stock: 14, hp: "45-55 HP", width: "8 FT", weight: "440 KG", blades: "Single Blade", short: "Precision levelling to improve irrigation efficiency." },
  { name: "SKM Post Hole Digger 12 IN", sku: "SKM-PH-012", category: "Tractor Attachments", subcategory: "Post Hole Digger", image: cultivator, price: 54000, offerPrice: 49500, stock: 19, hp: "35-45 HP", width: "12 IN Auger", weight: "180 KG", blades: "Auger Type", short: "Fast, straight holes for fencing, orchards and solar posts." },
];

export const PRODUCTS: Product[] = SEEDS.map((s, i) => ({
  id: `p${i + 1}`,
  name: s.name,
  slug: slugify(s.name),
  sku: s.sku,
  category: s.category,
  subcategory: s.subcategory,
  image: s.image,
  shortDesc: s.short,
  description: `The ${s.name} is engineered and manufactured in-house by Swarnkanak Manufacturer & Consultant using high-tensile steel, precision welding and a seven-stage paint process. Every unit is field tested before dispatch and is backed by our pan-India service network, easy spare part availability and free expert consultation on implement selection and tractor matching.`,
  price: s.price,
  offerPrice: s.offerPrice,
  stock: s.stock,
  rating: Math.round((4 + ((i * 7) % 10) / 10) * 10) / 10,
  reviews: 12 + ((i * 13) % 90),
  featured: !!s.featured,
  bestseller: !!s.bestseller,
  purchaseMode: s.mode ?? "direct",
  status: "published",
  hp: s.hp,
  workingWidth: s.width,
  weight: s.weight,
  blades: s.blades,
  warranty: "12 Months",
  features: [
    "Heavy-duty high tensile steel frame",
    "Precision CNC machined gear housing",
    "Seven-stage anti-corrosion paint finish",
    "Compatible with all leading tractor brands",
    "Low maintenance and easy spare availability",
  ],
}));

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const discountPct = (p: Product) =>
  p.price > p.offerPrice ? Math.round(((p.price - p.offerPrice) / p.price) * 100) : 0;
