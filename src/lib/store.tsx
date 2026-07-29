import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./catalog";
import {
  DEMO_BANNERS, DEMO_BLOGS, DEMO_ENQUIRIES, DEMO_EVENTS, DEMO_NOTIFICATIONS, DEMO_OFFERS,
  DEMO_ORDERS, DEMO_QUOTATIONS, DEMO_TICKETS, DEMO_USERS,
  type Banner, type Blog, type DemoUser, type Enquiry, type EventItem, type Notification,
  type Offer, type Order, type OrderStatus, type Quotation, type Ticket,
} from "./demo-data";

const KEY = "skm-portal-v1";

export interface CartLine { productId: string; qty: number }

interface State {
  users: DemoUser[];
  currentUserId: string | null;
  products: Product[];
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  quotations: Quotation[];
  enquiries: Enquiry[];
  tickets: Ticket[];
  notifications: Notification[];
  offers: Offer[];
  events: EventItem[];
  blogs: Blog[];
  banners: Banner[];
  loginLog: { id: string; userId: string; name: string; at: string; device: string; browser: string; ip: string; success: boolean }[];
}

const initialState = (): State => ({
  users: DEMO_USERS,
  currentUserId: null,
  products: PRODUCTS,
  cart: [],
  wishlist: [PRODUCTS[3].id, PRODUCTS[18].id],
  orders: DEMO_ORDERS,
  quotations: DEMO_QUOTATIONS,
  enquiries: DEMO_ENQUIRIES,
  tickets: DEMO_TICKETS,
  notifications: DEMO_NOTIFICATIONS,
  offers: DEMO_OFFERS,
  events: DEMO_EVENTS,
  blogs: DEMO_BLOGS,
  banners: DEMO_BANNERS,
  loginLog: DEMO_USERS.slice(1, 13).map((u, i) => ({
    id: "l" + i,
    userId: u.id,
    name: u.fullName,
    at: new Date(Date.now() - i * 5400000).toISOString(),
    device: i % 3 === 0 ? "Android Mobile" : i % 3 === 1 ? "Windows Desktop" : "iPhone",
    browser: i % 2 === 0 ? "Chrome 126" : "Safari 17",
    ip: `49.36.${100 + i}.${20 + i}`,
    success: i % 7 !== 0,
  })),
});

interface Ctx extends State {
  user: DemoUser | null;
  cartCount: number;
  cartLines: { product: Product; qty: number }[];
  cartSubtotal: number;
  login: (identifier: string, password: string) => { ok: boolean; error?: string; user?: DemoUser };
  register: (data: Partial<DemoUser> & { password: string }) => { ok: boolean; error?: string };
  logout: () => void;
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (payload: { paymentMethod: string; address: string; total: number }) => Order;
  addQuotation: (q: Omit<Quotation, "id" | "date" | "status" | "userId" | "customerName">) => void;
  updateQuotation: (id: string, patch: Partial<Quotation>) => void;
  addEnquiry: (e: Omit<Enquiry, "id" | "date" | "status" | "userId">) => void;
  addTicket: (t: { subject: string; category: string; message: string }) => void;
  updateOrderStatus: (id: string, status: OrderStatus, tracking?: string) => void;
  saveProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  updateUser: (id: string, patch: Partial<DemoUser>) => void;
  saveOffer: (o: Offer) => void;
  saveEvent: (e: EventItem) => void;
  saveBlog: (b: Blog) => void;
  saveBanner: (b: Banner) => void;
  pushNotification: (n: Omit<Notification, "id" | "date" | "read">) => void;
  markAllRead: () => void;
}

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<State>;
        setState((s) => ({ ...s, ...saved, products: s.products }));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const { products: _p, ...rest } = state;
    void _p;
    try {
      localStorage.setItem(KEY, JSON.stringify(rest));
    } catch {
      /* quota */
    }
  }, [state, hydrated]);

  const patch = useCallback((fn: (s: State) => Partial<State>) => {
    setState((s) => ({ ...s, ...fn(s) }));
  }, []);

  const user = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId],
  );

  const cartLines = useMemo(
    () =>
      state.cart
        .map((l) => {
          const product = state.products.find((p) => p.id === l.productId);
          return product ? { product, qty: l.qty } : null;
        })
        .filter(Boolean) as { product: Product; qty: number }[],
    [state.cart, state.products],
  );

  const cartSubtotal = cartLines.reduce((s, l) => s + l.product.offerPrice * l.qty, 0);

  const value: Ctx = {
    ...state,
    user,
    cartLines,
    cartSubtotal,
    cartCount: state.cart.reduce((s, l) => s + l.qty, 0),

    login: (identifier, password) => {
      const found = state.users.find(
        (u) => u.username.toLowerCase() === identifier.trim().toLowerCase() || u.phone === identifier.trim(),
      );
      if (!found) return { ok: false, error: "No account found with that username or phone number." };
      if (found.password !== password) return { ok: false, error: "Incorrect password. Please try again." };
      if (found.status !== "Active") return { ok: false, error: `Account is ${found.status.toLowerCase()}. Contact support.` };
      patch((s) => ({
        currentUserId: found.id,
        users: s.users.map((u) =>
          u.id === found.id ? { ...u, lastLogin: new Date().toISOString(), totalLogins: u.totalLogins + 1 } : u,
        ),
        loginLog: [
          { id: "l" + Date.now(), userId: found.id, name: found.fullName, at: new Date().toISOString(), device: "This Browser", browser: "Chrome", ip: "49.36.101.10", success: true },
          ...s.loginLog,
        ],
      }));
      return { ok: true, user: found };
    },

    register: (data) => {
      const username = (data.username ?? "").trim().toLowerCase();
      if (state.users.some((u) => u.username.toLowerCase() === username))
        return { ok: false, error: "This username is already registered." };
      if (state.users.some((u) => u.phone === data.phone))
        return { ok: false, error: "This mobile number is already registered." };
      const newUser: DemoUser = {
        id: "u-" + Date.now(),
        fullName: data.fullName ?? "New Customer",
        username,
        phone: data.phone ?? "",
        email: data.email ?? "",
        password: data.password,
        customerType: (data.customerType as DemoUser["customerType"]) ?? "Farmer",
        village: data.village ?? "",
        taluka: data.taluka ?? "",
        district: data.district ?? "",
        state: data.state ?? "",
        pincode: data.pincode ?? "",
        address: data.address ?? "",
        businessName: data.businessName ?? "",
        gst: data.gst ?? "",
        role: "customer",
        status: "Active",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        totalLogins: 1,
      };
      patch((s) => ({
        users: [...s.users, newUser],
        currentUserId: newUser.id,
        notifications: [
          { id: "n" + Date.now(), title: "Welcome to Swarnkanak", message: "Your customer account is ready. Explore products and offers.", type: "Account", date: new Date().toISOString(), read: false, audience: "You" },
          ...s.notifications,
        ],
      }));
      return { ok: true };
    },

    logout: () => patch(() => ({ currentUserId: null })),

    addToCart: (productId, qty = 1) =>
      patch((s) => ({
        cart: s.cart.some((l) => l.productId === productId)
          ? s.cart.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
          : [...s.cart, { productId, qty }],
      })),

    setQty: (productId, qty) =>
      patch((s) => ({ cart: s.cart.map((l) => (l.productId === productId ? { ...l, qty: Math.max(1, qty) } : l)) })),

    removeFromCart: (productId) => patch((s) => ({ cart: s.cart.filter((l) => l.productId !== productId) })),
    clearCart: () => patch(() => ({ cart: [] })),

    toggleWishlist: (productId) =>
      patch((s) => ({
        wishlist: s.wishlist.includes(productId)
          ? s.wishlist.filter((id) => id !== productId)
          : [...s.wishlist, productId],
      })),

    placeOrder: ({ paymentMethod, address, total }) => {
      const order: Order = {
        id: "SKM-ORD-" + Math.floor(20000 + Math.random() * 9000),
        userId: state.currentUserId ?? "guest",
        customerName: user?.fullName ?? "Guest Customer",
        date: new Date().toISOString(),
        items: cartLines.map((l) => ({ productId: l.product.id, name: l.product.name, qty: l.qty, price: l.product.offerPrice })),
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
        status: "Order Placed",
        address,
      };
      patch((s) => ({
        orders: [order, ...s.orders],
        cart: [],
        notifications: [
          { id: "n" + Date.now(), title: `Order ${order.id} placed`, message: "We have received your order and will confirm it shortly.", type: "Order update", date: new Date().toISOString(), read: false, audience: "You" },
          ...s.notifications,
        ],
      }));
      return order;
    },

    addQuotation: (q) =>
      patch((s) => ({
        quotations: [
          {
            ...q,
            id: "SKM-QT-" + Math.floor(6000 + Math.random() * 900),
            userId: s.currentUserId ?? "guest",
            customerName: user?.fullName ?? "Guest Customer",
            status: "Submitted",
            date: new Date().toISOString(),
          },
          ...s.quotations,
        ],
      })),

    updateQuotation: (id, p) =>
      patch((s) => ({ quotations: s.quotations.map((q) => (q.id === id ? { ...q, ...p } : q)) })),

    addEnquiry: (e) =>
      patch((s) => ({
        enquiries: [
          { ...e, id: "SKM-ENQ-" + Math.floor(4000 + Math.random() * 900), userId: s.currentUserId ?? "guest", status: "New", date: new Date().toISOString() },
          ...s.enquiries,
        ],
      })),

    addTicket: ({ subject, category, message }) =>
      patch((s) => ({
        tickets: [
          {
            id: "SKM-TKT-" + Math.floor(1000 + Math.random() * 900),
            userId: s.currentUserId ?? "guest",
            customerName: user?.fullName ?? "Guest Customer",
            subject, category, status: "Open", priority: "Medium",
            date: new Date().toISOString(),
            messages: [{ from: "Customer", text: message, at: new Date().toISOString() }],
          },
          ...s.tickets,
        ],
      })),

    updateOrderStatus: (id, status, tracking) =>
      patch((s) => ({
        orders: s.orders.map((o) => (o.id === id ? { ...o, status, tracking: tracking ?? o.tracking } : o)),
        notifications: [
          { id: "n" + Date.now(), title: `Order ${id} is now ${status}`, message: "Track the latest status from My Orders.", type: "Order update", date: new Date().toISOString(), read: false, audience: "Customer" },
          ...s.notifications,
        ],
      })),

    saveProduct: (p) =>
      patch((s) => ({
        products: s.products.some((x) => x.id === p.id)
          ? s.products.map((x) => (x.id === p.id ? p : x))
          : [p, ...s.products],
      })),

    deleteProduct: (id) => patch((s) => ({ products: s.products.filter((p) => p.id !== id) })),

    updateUser: (id, p) => patch((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, ...p } : u)) })),

    saveOffer: (o) =>
      patch((s) => ({ offers: s.offers.some((x) => x.id === o.id) ? s.offers.map((x) => (x.id === o.id ? o : x)) : [o, ...s.offers] })),
    saveEvent: (e) =>
      patch((s) => ({ events: s.events.some((x) => x.id === e.id) ? s.events.map((x) => (x.id === e.id ? e : x)) : [e, ...s.events] })),
    saveBlog: (b) =>
      patch((s) => ({ blogs: s.blogs.some((x) => x.id === b.id) ? s.blogs.map((x) => (x.id === b.id ? b : x)) : [b, ...s.blogs] })),
    saveBanner: (b) =>
      patch((s) => ({ banners: s.banners.some((x) => x.id === b.id) ? s.banners.map((x) => (x.id === b.id ? b : x)) : [...s.banners, b] })),

    pushNotification: (n) =>
      patch((s) => ({
        notifications: [{ ...n, id: "n" + Date.now(), date: new Date().toISOString(), read: false }, ...s.notifications],
      })),

    markAllRead: () => patch((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
