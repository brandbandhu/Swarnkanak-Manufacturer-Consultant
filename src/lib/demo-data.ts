import { PRODUCTS } from "./catalog";

export interface DemoUser {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  customerType: "Farmer" | "Dealer" | "Distributor" | "Business" | "Institution";
  village: string;
  taluka: string;
  district: string;
  state: string;
  pincode: string;
  address: string;
  businessName: string;
  gst: string;
  role: "admin" | "customer";
  status: "Active" | "Suspended" | "Blocked";
  createdAt: string;
  lastLogin: string;
  totalLogins: number;
}

const DISTRICTS = [
  ["Nashik", "Maharashtra"],
  ["Kolhapur", "Maharashtra"],
  ["Ludhiana", "Punjab"],
  ["Karnal", "Haryana"],
  ["Rajkot", "Gujarat"],
  ["Indore", "Madhya Pradesh"],
  ["Meerut", "Uttar Pradesh"],
  ["Belagavi", "Karnataka"],
  ["Guntur", "Andhra Pradesh"],
  ["Jaipur", "Rajasthan"],
];
const NAMES = [
  "Ramesh Patil", "Sunil Deshmukh", "Harpreet Singh", "Mahesh Chaudhary", "Vikram Yadav",
  "Anil Kumbhar", "Balwinder Sandhu", "Rajesh Sharma", "Kiran Jadhav", "Suresh Reddy",
  "Ganesh Shinde", "Ajay Verma", "Devendra Rathod", "Prakash Gowda", "Nitin Pawar",
  "Sandeep Dhillon", "Manoj Thakur", "Vijay Patel", "Ashok More", "Rahul Bhosale",
  "Sachin Gaikwad", "Amit Chauhan", "Naresh Meena", "Rakesh Nair", "Dinesh Solanki",
];
const TYPES: DemoUser["customerType"][] = ["Farmer", "Dealer", "Distributor", "Business", "Institution"];

const iso = (daysAgo: number) => new Date(Date.now() - daysAgo * 86400000).toISOString();

export const ADMIN_USER: DemoUser = {
  id: "u-admin", fullName: "Portal Super Admin", username: "admin", phone: "9999999999",
  email: "admin@swarnkanak.in", password: "Admin@123", customerType: "Business",
  village: "MIDC", taluka: "Sinnar", district: "Nashik", state: "Maharashtra", pincode: "422103",
  address: "Plot 42, MIDC Industrial Area", businessName: "Swarnkanak Manufacturer & Consultant",
  gst: "27AABCS1429B1ZX", role: "admin", status: "Active", createdAt: iso(900),
  lastLogin: iso(0), totalLogins: 486,
};

export const DEMO_CUSTOMER: DemoUser = {
  id: "u-1", fullName: "Farmer Demo User", username: "farmerdemo", phone: "9876543210",
  email: "farmerdemo@example.com", password: "Farmer@123", customerType: "Farmer",
  village: "Wadgaon", taluka: "Sinnar", district: "Nashik", state: "Maharashtra", pincode: "422103",
  address: "Survey No. 118, Wadgaon Road", businessName: "Shree Krupa Farms", gst: "",
  role: "customer", status: "Active", createdAt: iso(210), lastLogin: iso(0), totalLogins: 74,
};

export const DEMO_USERS: DemoUser[] = [
  ADMIN_USER,
  DEMO_CUSTOMER,
  ...NAMES.map((name, i) => {
    const [district, state] = DISTRICTS[i % DISTRICTS.length];
    return {
      id: `u-${i + 2}`,
      fullName: name,
      username: name.split(" ")[0].toLowerCase() + (i + 10),
      phone: "9" + String(100000000 + i * 3717271).slice(0, 9),
      email: name.split(" ")[0].toLowerCase() + i + "@example.com",
      password: "Demo@1234",
      customerType: TYPES[i % TYPES.length],
      village: "Village " + (i + 1),
      taluka: "Taluka " + ((i % 6) + 1),
      district,
      state,
      pincode: String(400001 + i * 137),
      address: `House No. ${12 + i}, Main Road`,
      businessName: i % 3 === 0 ? name.split(" ")[0] + " Agro Traders" : "",
      gst: i % 4 === 0 ? "27AAECS" + (1000 + i) + "B1ZQ" : "",
      role: "customer" as const,
      status: (i % 11 === 0 ? "Suspended" : i % 17 === 0 ? "Blocked" : "Active") as DemoUser["status"],
      createdAt: iso(300 - i * 9),
      lastLogin: iso(i % 30),
      totalLogins: 3 + ((i * 17) % 120),
    };
  }),
];

export const TOTAL_REGISTERED = 842;

export type OrderStatus =
  | "Order Placed" | "Payment Pending" | "Payment Confirmed" | "Processing" | "Packed"
  | "Dispatched" | "Out for Delivery" | "Delivered" | "Cancelled" | "Return Requested"
  | "Returned" | "Refunded";

export interface OrderItem { productId: string; name: string; qty: number; price: number }
export interface Order {
  id: string;
  userId: string;
  customerName: string;
  date: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  status: OrderStatus;
  tracking?: string;
  address: string;
}

const orderStatuses: OrderStatus[] = [
  "Order Placed", "Payment Confirmed", "Processing", "Packed", "Dispatched",
  "Out for Delivery", "Delivered", "Delivered", "Cancelled", "Delivered",
];

export const DEMO_ORDERS: Order[] = orderStatuses.map((status, i) => {
  const p = PRODUCTS[(i * 3) % PRODUCTS.length];
  const p2 = PRODUCTS[(i * 5 + 1) % PRODUCTS.length];
  const qty = 1 + (i % 2);
  const user = i % 3 === 0 ? DEMO_CUSTOMER : DEMO_USERS[i + 2];
  const items: OrderItem[] = [
    { productId: p.id, name: p.name, qty, price: p.offerPrice },
    ...(i % 2 === 0 ? [{ productId: p2.id, name: p2.name, qty: 1, price: p2.offerPrice }] : []),
  ];
  return {
    id: "SKM-ORD-" + (10241 + i),
    userId: user.id,
    customerName: user.fullName,
    date: iso(60 - i * 5),
    items,
    total: items.reduce((s, it) => s + it.price * it.qty, 0),
    paymentMethod: ["Cash on Delivery", "UPI", "Bank Transfer", "Credit/Debit Card", "Pay at Dealership"][i % 5],
    paymentStatus: (status === "Cancelled" ? "Refunded" : i % 3 === 0 ? "Pending" : "Paid") as Order["paymentStatus"],
    status,
    tracking: i % 2 === 0 ? "SKMTRK" + (778100 + i) : undefined,
    address: `${user.village}, ${user.taluka}, ${user.district}, ${user.state} - ${user.pincode}`,
  };
});

export type QuotationStatus =
  | "Submitted" | "Under Review" | "Quotation Generated" | "Revision Requested"
  | "Accepted" | "Rejected" | "Converted to Order";

export interface Quotation {
  id: string;
  userId: string;
  customerName: string;
  productId: string;
  productName: string;
  qty: number;
  requirement: string;
  status: QuotationStatus;
  date: string;
  quotedAmount?: number;
  validity?: string;
}

const qStatuses: QuotationStatus[] = [
  "Submitted", "Under Review", "Quotation Generated", "Revision Requested",
  "Accepted", "Rejected", "Converted to Order", "Quotation Generated",
];

export const DEMO_QUOTATIONS: Quotation[] = qStatuses.map((status, i) => {
  const p = PRODUCTS[(i * 4 + 2) % PRODUCTS.length];
  const user = i % 2 === 0 ? DEMO_CUSTOMER : DEMO_USERS[i + 3];
  return {
    id: "SKM-QT-" + (5021 + i),
    userId: user.id,
    customerName: user.fullName,
    productId: p.id,
    productName: p.name,
    qty: 1 + (i % 4),
    requirement: "Require delivery and on-site installation with operator training.",
    status,
    date: iso(45 - i * 4),
    quotedAmount: status === "Submitted" ? undefined : Math.round(p.offerPrice * (1 + (i % 4) * 0.92)),
    validity: "15 days from issue date",
  };
});

export interface Enquiry {
  id: string; userId: string; name: string; phone: string; productName: string;
  type: string; message: string; status: "New" | "In Progress" | "Responded" | "Closed"; date: string;
  response?: string;
}

export const DEMO_ENQUIRIES: Enquiry[] = Array.from({ length: 10 }, (_, i) => {
  const p = PRODUCTS[(i * 6) % PRODUCTS.length];
  const user = i % 3 === 0 ? DEMO_CUSTOMER : DEMO_USERS[i + 4];
  return {
    id: "SKM-ENQ-" + (3011 + i),
    userId: user.id,
    name: user.fullName,
    phone: user.phone,
    productName: p.name,
    type: ["Product Question", "Request a Call", "Product Demo", "Dealer Contact"][i % 4],
    message: "Please share detailed specification, delivery timeline and nearest dealer contact.",
    status: (["New", "In Progress", "Responded", "Closed"] as const)[i % 4],
    date: iso(30 - i * 2),
    response: i % 4 >= 2 ? "Our product specialist has shared the brochure and dealer contact on WhatsApp." : undefined,
  };
});

export interface Ticket {
  id: string; userId: string; customerName: string; subject: string; category: string;
  status: "Open" | "Assigned" | "In Progress" | "Waiting for Customer" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High"; date: string; messages: { from: string; text: string; at: string }[];
}

export const DEMO_TICKETS: Ticket[] = Array.from({ length: 6 }, (_, i) => {
  const user = i % 2 === 0 ? DEMO_CUSTOMER : DEMO_USERS[i + 5];
  return {
    id: "SKM-TKT-" + (901 + i),
    userId: user.id,
    customerName: user.fullName,
    subject: ["Rotavator blade replacement", "Installation support required", "Warranty claim", "Spare part availability", "Delivery delay", "Payment receipt not received"][i],
    category: ["Spare Parts", "Installation", "Warranty", "Spare Parts", "Delivery", "Payment"][i],
    status: (["Open", "Assigned", "In Progress", "Waiting for Customer", "Resolved", "Closed"] as const)[i],
    priority: (["High", "Medium", "Low"] as const)[i % 3],
    date: iso(20 - i * 3),
    messages: [
      { from: "Customer", text: "Requesting support on the above issue at the earliest.", at: iso(20 - i * 3) },
      { from: "Support", text: "Ticket registered. Our service engineer will contact you within 24 hours.", at: iso(19 - i * 3) },
    ],
  };
});

export interface Offer {
  id: string; title: string; description: string; discount: string; code: string;
  validTill: string; image: string; active: boolean; scope: string;
}

export const DEMO_OFFERS: Offer[] = [
  { id: "o1", title: "Monsoon Farming Offer", description: "Up to 15% off on selected tillage implements including rotavators and harrows.", discount: "15%", code: "MONSOON15", validTill: "2026-09-30", image: PRODUCTS[0].image, active: true, scope: "Tillage Equipment" },
  { id: "o2", title: "Baler Season Deal", description: "Flat ₹25,000 off on square and round balers with free installation.", discount: "₹25,000", code: "BALE25K", validTill: "2026-10-15", image: PRODUCTS[18].image, active: true, scope: "Post-Harvest Equipment" },
  { id: "o3", title: "First Order Advantage", description: "New customers get 7% off on their first online order above ₹50,000.", discount: "7%", code: "FIRST7", validTill: "2026-12-31", image: PRODUCTS[12].image, active: true, scope: "All Products" },
  { id: "o4", title: "Dealer Bulk Purchase", description: "Special slab pricing for dealers ordering 5 units or more.", discount: "Up to 18%", code: "DEALER18", validTill: "2026-11-30", image: PRODUCTS[25].image, active: true, scope: "Dealers Only" },
  { id: "o5", title: "Residue Management Combo", description: "Buy a mulcher with a shredder and save 12% on the combo.", discount: "12%", code: "MULCH12", validTill: "2026-08-31", image: PRODUCTS[22].image, active: false, scope: "Landscaping & Residue" },
];

export interface EventItem {
  id: string; title: string; venue: string; date: string; description: string; image: string; published: boolean; interested: number;
}

export const DEMO_EVENTS: EventItem[] = [
  { id: "e1", title: "Agri Machinery Expo 2026", venue: "Pune Exhibition Centre, Maharashtra", date: "2026-09-12", description: "Live demonstrations of our full tillage and residue management range.", image: PRODUCTS[0].image, published: true, interested: 128 },
  { id: "e2", title: "Farmer Meet - Nashik Belt", venue: "Sinnar Krishi Kendra, Nashik", date: "2026-08-22", description: "Free consultation on tractor and implement matching for grape and onion belts.", image: PRODUCTS[5].image, published: true, interested: 76 },
  { id: "e3", title: "Baler Field Demonstration", venue: "Karnal District Farm, Haryana", date: "2026-10-04", description: "Watch our square baler run live on wheat stubble fields.", image: PRODUCTS[18].image, published: true, interested: 54 },
  { id: "e4", title: "Dealer Conference 2026", venue: "Hotel Grand Regency, Ludhiana", date: "2026-11-18", description: "Annual dealer meet covering new launches, margins and service standards.", image: PRODUCTS[25].image, published: true, interested: 41 },
  { id: "e5", title: "Product Launch: Power Harrow Series", venue: "Swarnkanak Plant, Sinnar MIDC", date: "2026-12-06", description: "Unveiling the new vertical tine power harrow range with live testing.", image: PRODUCTS[4].image, published: true, interested: 33 },
];

export interface Blog {
  id: string; title: string; slug: string; excerpt: string; body: string; author: string;
  category: string; date: string; image: string; published: boolean;
}

const blogSeed = [
  ["How to Select the Right Rotavator for Your Tractor", "Tillage", 0],
  ["Benefits of Modern Farm Mechanisation for Small Holdings", "Mechanisation", 5],
  ["Rotavator Maintenance Checklist Before Every Season", "Maintenance", 2],
  ["Choosing the Correct Tractor Implement by Horsepower", "Buying Guide", 7],
  ["How Balers Reduce Crop-Waste Problems and Add Income", "Residue", 18],
  ["Zero Till Drilling: Saving Water, Diesel and Time", "Seeding", 9],
  ["Spray Efficiency: Nozzle Selection and Boom Height", "Crop Protection", 12],
  ["Trailer Load Safety Practices for Farm Transport", "Transport", 25],
];

export const DEMO_BLOGS: Blog[] = blogSeed.map(([title, category, pi], i) => ({
  id: "b" + (i + 1),
  title: title as string,
  slug: (title as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  excerpt: "A practical, field-tested guide written by our agricultural consultants to help you get more output from every hour spent in the field.",
  body: "Selecting and maintaining farm machinery correctly is the single biggest lever a farmer has on operating cost. In this article our consultants explain the specification numbers that actually matter, how to match an implement to your tractor's PTO horsepower and lift capacity, the seasonal checks that prevent expensive breakdowns, and the small operating habits that extend equipment life by several years. Every recommendation here comes from service data collected across our dealer and support network.",
  author: ["Ing. S. Kulkarni", "R. Deshpande", "A. Sharma"][i % 3],
  category: category as string,
  date: iso(90 - i * 9),
  image: PRODUCTS[pi as number].image,
  published: true,
}));

export interface Notification {
  id: string; title: string; message: string; type: string; date: string; read: boolean; audience: string;
}

export const DEMO_NOTIFICATIONS: Notification[] = [
  ["New offer", "Monsoon Farming Offer is live", "Get up to 15% off on selected tillage implements till 30 September."],
  ["Order update", "Order SKM-ORD-10245 dispatched", "Your order has been dispatched and will reach you in 4-6 working days."],
  ["Quotation ready", "Quotation SKM-QT-5023 generated", "Your quotation is ready. Review, accept or request a revision."],
  ["Product launch", "New Power Harrow series launched", "Vertical tine power harrow 2.5 M is now available for booking."],
  ["Event announcement", "Agri Machinery Expo 2026", "Meet us at Pune Exhibition Centre on 12 September 2026."],
  ["Payment reminder", "Payment pending for SKM-ORD-10249", "Complete your payment to move the order into processing."],
  ["Order update", "Order SKM-ORD-10241 delivered", "Thanks for your purchase. Please rate the product."],
  ["New offer", "First order advantage", "7% off on your first online order above ₹50,000. Code FIRST7."],
  ["Maintenance notice", "Portal maintenance window", "Scheduled maintenance on Sunday 02:00 - 04:00 IST."],
  ["Order update", "Tracking added to SKM-ORD-10243", "Track your consignment with ID SKMTRK778103."],
  ["Quotation ready", "Revised quotation issued", "A revised quotation has been issued against your request."],
  ["Event announcement", "Baler field demonstration", "Live baler demo at Karnal on 4 October 2026."],
].map(([type, title, message], i) => ({
  id: "n" + (i + 1),
  title: title as string,
  message: message as string,
  type: type as string,
  date: iso(i * 2),
  read: i > 4,
  audience: "All Users",
}));

export interface Banner {
  id: string; heading: string; subheading: string; cta: string; link: string; order: number; active: boolean;
}

export const DEMO_BANNERS: Banner[] = [
  { id: "bn1", heading: "Advanced Rotavators for Efficient Soil Preparation", subheading: "Multi-speed gear drive, boron steel blades, field proven across India.", cta: "Explore Products", link: "/products", order: 1, active: true },
  { id: "bn2", heading: "High-Performance Balers for Better Residue Management", subheading: "Turn crop waste into an additional source of farm income.", cta: "View Balers", link: "/products", order: 2, active: true },
  { id: "bn3", heading: "Reliable Tractor Attachments for Every Requirement", subheading: "40+ machinery models compatible with all leading tractor brands.", cta: "Request a Quotation", link: "/contact", order: 3, active: true },
];

export const TESTIMONIALS = [
  { name: "Ramesh Patil", place: "Nashik, Maharashtra", product: "SKM Pro Rotavator 6 FT", rating: 5, text: "Soil preparation time dropped by nearly half. The blades are still sharp after two full seasons." },
  { name: "Harpreet Singh", place: "Ludhiana, Punjab", product: "SKM Square Baler Compact", rating: 5, text: "The baler paid for itself in one paddy season. Service team responded within a day." },
  { name: "Suresh Reddy", place: "Guntur, Andhra Pradesh", product: "SKM Boom Sprayer 400 L", rating: 4, text: "Even coverage and much less chemical wastage. Build quality is genuinely heavy duty." },
  { name: "Kiran Jadhav", place: "Kolhapur, Maharashtra", product: "SKM Hydraulic Tipping Trailer", rating: 5, text: "Handles sugarcane loads without any complaint. Tipping mechanism is smooth." },
];

export const STATS = [
  { label: "Years of Experience", value: 15, suffix: "+" },
  { label: "Machinery Models", value: 40, suffix: "+" },
  { label: "Dealers and Partners", value: 100, suffix: "+" },
  { label: "Satisfied Customers", value: 1600, suffix: "+" },
];

export const PARTNERS = [
  "AgriFin Bank", "Kisan Credit Co-op", "BharatAgro Dealers", "GreenField Motors",
  "Sahyadri Farms Group", "NabhaAgri Finance", "Deccan Tractors", "AgroLease India",
];
