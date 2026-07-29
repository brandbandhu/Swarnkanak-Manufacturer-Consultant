import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Copy,
  FileText,
  Heart,
  IndianRupee,
  LayoutDashboard,
  MessageSquare,
  Package,
  PackagePlus,
  Pencil,
  Phone,
  RotateCcw,
  Save,
  Search,
  ShoppingBag,
  Ticket,
  Trash2,
  Truck,
  Users,
} from "lucide-react";
import { SiteLayout, PageHeading, Breadcrumbs } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, IMAGES, formatINR, type Product } from "@/lib/catalog";
import { TOTAL_REGISTERED, type OrderStatus, type QuotationStatus } from "@/lib/demo-data";
import { useStore } from "@/lib/store";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Package;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold">{value}</p>
        </div>
        <span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  );
}

export function AboutPage() {
  return (
    <SiteLayout>
      <PageHeading
        title="About Swarnkanak"
        subtitle="Indian agricultural machinery, consulting and service support built around practical field needs."
      />
      <Breadcrumbs items={[{ label: "About" }]} />
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-muted-foreground">
          <p>
            Swarnkanak Manufacturer & Consultant designs, manufactures and supports tractor
            implements for tillage, seeding, crop protection, harvesting and post-harvest
            operations.
          </p>
          <p>
            The portal brings product discovery, quotations, online orders, offers, service tickets
            and customer communication into one working demo system.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {["In-house manufacturing", "Pan-India dealer support", "Field-tested machinery"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-md border bg-card p-4 font-medium text-foreground"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="font-display text-xl font-semibold">Company Focus</h2>
            {[
              "Transparent product information",
              "Tractor and implement matching",
              "Reliable spares and service",
              "Dealer and farmer enablement",
            ].map((item) => (
              <p key={item} className="flex gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 text-primary" /> {item}
              </p>
            ))}
          </CardContent>
        </Card>
      </section>
    </SiteLayout>
  );
}

export function OffersPage() {
  const { offers } = useStore();
  return (
    <SiteLayout>
      <PageHeading
        title="Offers"
        subtitle="Current machinery schemes, seasonal discounts and dealer purchase benefits."
      />
      <Breadcrumbs items={[{ label: "Offers" }]} />
      <div className="container-x grid gap-5 py-12 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <Card key={offer.id} className="overflow-hidden">
            <img src={offer.image} alt="" className="h-44 w-full object-cover" />
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-2">
                <Badge>{offer.discount}</Badge>
                <Badge variant={offer.active ? "secondary" : "outline"}>
                  {offer.active ? "Active" : "Expired"}
                </Badge>
              </div>
              <h2 className="font-display text-lg font-semibold">{offer.title}</h2>
              <p className="text-sm text-muted-foreground">{offer.description}</p>
              <p className="text-sm font-semibold">Code: {offer.code}</p>
              <Button asChild className="w-full">
                <Link to="/products">Shop Eligible Products</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteLayout>
  );
}

export function EventsPage() {
  const { events } = useStore();
  return (
    <SiteLayout>
      <PageHeading
        title="Events"
        subtitle="Field demos, expos, farmer meets and dealer programs."
      />
      <Breadcrumbs items={[{ label: "Events" }]} />
      <div className="container-x grid gap-5 py-12 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="grid sm:grid-cols-[180px_1fr]">
              <img src={event.image} alt="" className="h-full min-h-44 w-full object-cover" />
              <CardContent className="space-y-2 p-5">
                <Badge variant="secondary">
                  <CalendarDays className="mr-1 size-3" />{" "}
                  {new Date(event.date).toLocaleDateString("en-IN")}
                </Badge>
                <h2 className="font-display text-lg font-semibold">{event.title}</h2>
                <p className="text-sm font-medium">{event.venue}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </SiteLayout>
  );
}

export function GalleryPage() {
  const { products } = useStore();
  const items = products.slice(0, 12);
  return (
    <SiteLayout>
      <PageHeading
        title="Gallery"
        subtitle="A quick visual tour of featured farm machinery and implement categories."
      />
      <Breadcrumbs items={[{ label: "Gallery" }]} />
      <div className="container-x grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <Link
            key={product.id}
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="group overflow-hidden rounded-md border bg-card"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-4">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </SiteLayout>
  );
}

export function BlogPage() {
  const { blogs } = useStore();
  return (
    <SiteLayout>
      <PageHeading
        title="Blog"
        subtitle="Buying guides, maintenance tips and mechanisation advice from the Swarnkanak team."
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <div className="container-x grid gap-5 py-12 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            <img src={blog.image} alt="" className="h-44 w-full object-cover" />
            <CardContent className="space-y-2 p-5">
              <Badge variant="outline">{blog.category}</Badge>
              <h2 className="font-display text-lg font-semibold">{blog.title}</h2>
              <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
              <p className="text-xs text-muted-foreground">
                {blog.author} · {new Date(blog.date).toLocaleDateString("en-IN")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteLayout>
  );
}

export function ContactPage() {
  const { products, addEnquiry } = useStore();
  return (
    <SiteLayout>
      <PageHeading
        title="Contact"
        subtitle="Send an enquiry, request a call or connect with the nearest machinery specialist."
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <div className="container-x grid gap-6 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="font-display text-xl font-semibold">Sales & Support</h2>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +91 99999 00000
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare className="size-4 text-primary" /> care@swarnkanak.in
            </p>
            <p className="text-sm text-muted-foreground">
              Plot 42, MIDC Industrial Area, Sinnar, Nashik, Maharashtra - 422103
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                addEnquiry({
                  name: String(data.get("name")),
                  phone: String(data.get("phone")),
                  productName: String(data.get("product")),
                  type: "Request a Call",
                  message: String(data.get("message")),
                });
                e.currentTarget.reset();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input name="name" required />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input name="phone" required />
                </div>
              </div>
              <div>
                <Label>Product</Label>
                <select
                  name="product"
                  className="h-10 w-full rounded-md border bg-card px-3 text-sm"
                >
                  {products.slice(0, 10).map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea name="message" required />
              </div>
              <Button type="submit">Submit Enquiry</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}

export function DealerEnquiryPage() {
  return (
    <SiteLayout>
      <PageHeading
        title="Become a Dealer"
        subtitle="Apply for dealership, distribution or service partnership opportunities."
      />
      <Breadcrumbs items={[{ label: "Become a Dealer" }]} />
      <div className="container-x max-w-3xl py-12">
        <Card>
          <CardContent className="grid gap-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Business name</Label>
                <Input />
              </div>
              <div>
                <Label>Contact person</Label>
                <Input />
              </div>
              <div>
                <Label>Phone</Label>
                <Input />
              </div>
              <div>
                <Label>District</Label>
                <Input />
              </div>
            </div>
            <div>
              <Label>Current business profile</Label>
              <Textarea />
            </div>
            <Button>Submit Dealer Application</Button>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}

export function TrackOrderPage() {
  const { orders } = useStore();
  return (
    <SiteLayout>
      <PageHeading
        title="Track Order"
        subtitle="Check the latest demo order movement and shipment status."
      />
      <Breadcrumbs items={[{ label: "Track Order" }]} />
      <div className="container-x grid gap-5 py-12">
        {orders.slice(0, 6).map((order) => (
          <Card key={order.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="font-display text-lg font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.customerName} · {new Date(order.date).toLocaleDateString("en-IN")}
                </p>
              </div>
              <Badge>{order.status}</Badge>
              <p className="text-sm">
                Tracking: {order.tracking ?? "Will be assigned after dispatch"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteLayout>
  );
}

export function DashboardPage() {
  const store = useStore();
  const userId = store.user?.id ?? "u-1";
  const orders = store.orders.filter((o) => o.userId === userId);
  const quotes = store.quotations.filter((q) => q.userId === userId);
  return (
    <SiteLayout>
      <PageHeading
        title="My Dashboard"
        subtitle={`Welcome ${store.user?.fullName ?? "Farmer Demo User"}. Review orders, quotations, wishlist and support updates.`}
      />
      <Breadcrumbs items={[{ label: "Dashboard" }]} />
      <div className="container-x space-y-6 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Orders" value={String(orders.length)} icon={Package} />
          <StatCard label="Quotations" value={String(quotes.length)} icon={FileText} />
          <StatCard label="Wishlist" value={String(store.wishlist.length)} icon={Heart} />
          <StatCard
            label="Unread Alerts"
            value={String(store.notifications.filter((n) => !n.read).length)}
            icon={Bell}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {orders.slice(0, 4).map((o) => (
                <Row key={o.id} title={o.id} meta={o.status} value={formatINR(o.total)} />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Quotations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quotes.slice(0, 4).map((q) => (
                <Row
                  key={q.id}
                  title={q.productName}
                  meta={q.status}
                  value={q.quotedAmount ? formatINR(q.quotedAmount) : "Pending"}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}

function Row({ title, meta, value }: { title: string; meta: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{meta}</p>
      </div>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

export function DashboardOrdersPage() {
  const { orders, user } = useStore();
  const list = orders.filter((o) => o.userId === (user?.id ?? "u-1"));
  return (
    <PortalList
      title="My Orders"
      icon={Package}
      rows={list.map((o) => ({
        id: o.id,
        title: o.items.map((i) => i.name).join(", "),
        meta: o.status,
        value: formatINR(o.total),
      }))}
    />
  );
}

export function DashboardWishlistPage() {
  const { products, wishlist } = useStore();
  return (
    <SiteLayout>
      <PageHeading
        title="My Wishlist"
        subtitle="Products saved for future purchase or quotation."
      />
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Wishlist" }]} />
      <div className="container-x grid gap-5 py-12 sm:grid-cols-2 xl:grid-cols-4">
        {products
          .filter((p) => wishlist.includes(p.id))
          .map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
      </div>
    </SiteLayout>
  );
}

export function DashboardQuotationsPage() {
  const { quotations, user } = useStore();
  const list = quotations.filter((q) => q.userId === (user?.id ?? "u-1"));
  return (
    <PortalList
      title="My Quotations"
      icon={FileText}
      rows={list.map((q) => ({
        id: q.id,
        title: q.productName,
        meta: q.status,
        value: q.quotedAmount ? formatINR(q.quotedAmount) : "Pending",
      }))}
    />
  );
}

export function DashboardTicketsPage() {
  const { tickets, user } = useStore();
  const list = tickets.filter((t) => t.userId === (user?.id ?? "u-1"));
  return (
    <PortalList
      title="Support Tickets"
      icon={Ticket}
      rows={list.map((t) => ({ id: t.id, title: t.subject, meta: t.status, value: t.priority }))}
    />
  );
}

function PortalList({
  title,
  icon: Icon,
  rows,
}: {
  title: string;
  icon: typeof Package;
  rows: { id: string; title: string; meta: string; value: string }[];
}) {
  return (
    <SiteLayout>
      <PageHeading
        title={title}
        subtitle="Demo customer portal data loaded from the local store."
      />
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: title }]} />
      <div className="container-x space-y-3 py-12">
        {rows.map((row) => (
          <Card key={row.id}>
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div className="flex gap-3">
                <Icon className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">{row.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {row.id} · {row.meta}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">{row.value}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteLayout>
  );
}

const ADMIN_SELECT = "h-10 w-full rounded-md border bg-card px-3 text-sm";
const ADMIN_SECTION_BUTTON =
  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors";

const slugifyAdmin = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const newProductDraft = (base?: Product): Product => {
  const category = CATEGORIES[0];
  return {
    id: "p-" + Date.now(),
    name: "",
    slug: "",
    sku: "",
    category: category.name,
    subcategory: category.subcategories[0],
    image: Object.values(IMAGES)[0],
    shortDesc: "",
    description: "",
    price: 0,
    offerPrice: 0,
    stock: 0,
    rating: 4.5,
    reviews: 0,
    featured: false,
    bestseller: false,
    purchaseMode: "direct",
    status: "draft",
    hp: "",
    workingWidth: "",
    weight: "",
    blades: "",
    warranty: "12 Months",
    features: [
      "Heavy-duty high tensile steel frame",
      "Compatible with all leading tractor brands",
      "Low maintenance and easy spare availability",
    ],
    ...base,
  };
};

export function AdminPage() {
  const {
    users,
    products,
    orders,
    quotations,
    enquiries,
    tickets,
    loginLog,
    saveProduct,
    deleteProduct,
    updateOrderStatus,
    updateQuotation,
    updateUser,
  } = useStore();
  const [draft, setDraft] = useState<Product>(() => newProductDraft());
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [quoteAmounts, setQuoteAmounts] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState("overview");

  const selectedCategory = CATEGORIES.find((c) => c.name === draft.category) ?? CATEGORIES[0];
  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const q = productSearch.trim().toLowerCase();
        const matchesSearch =
          !q ||
          [product.name, product.sku, product.category, product.subcategory].some((v) =>
            v.toLowerCase().includes(q),
          );
        const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
      }),
    [categoryFilter, productSearch, products],
  );

  const setDraftField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const resetProductForm = () => setDraft(newProductDraft());

  const submitProduct = () => {
    const name = draft.name.trim() || "New Farm Implement";
    const product: Product = {
      ...draft,
      name,
      slug: draft.slug.trim() || slugifyAdmin(name),
      sku: draft.sku.trim() || "SKM-" + Math.floor(1000 + Math.random() * 9000),
      shortDesc: draft.shortDesc.trim() || "Farm machinery product managed from the admin portal.",
      description:
        draft.description.trim() ||
        draft.shortDesc.trim() ||
        "Detailed product information will be updated by the admin team.",
      offerPrice: draft.offerPrice > 0 ? draft.offerPrice : draft.price,
      features: draft.features.map((item) => item.trim()).filter(Boolean),
    };
    saveProduct(product);
    setDraft(product);
  };

  const duplicateProduct = (product: Product) => {
    setDraft({
      ...product,
      id: "p-" + Date.now(),
      name: product.name + " Copy",
      slug: slugifyAdmin(product.name + " Copy"),
      sku: product.sku + "-COPY",
      status: "draft",
      featured: false,
      bestseller: false,
    });
  };

  const adminSections = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "orders", label: "Orders", icon: Truck },
    { id: "quotations", label: "Quotations", icon: IndianRupee },
    { id: "customers", label: "Customers", icon: Users },
    { id: "activity", label: "Login Activity", icon: Bell },
  ];

  return (
    <SiteLayout>
      <PageHeading
        title="Admin Dashboard"
        subtitle="Manage customers, orders, quotations, enquiries, tickets and portal content."
      />
      <Breadcrumbs items={[{ label: "Admin" }]} />
      <div className="container-x grid gap-6 py-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="p-3">
              <nav
                className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
                aria-label="Admin sections"
              >
                {adminSections.map((section) => {
                  const Icon = section.icon;
                  const selected = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`${ADMIN_SECTION_BUTTON} min-w-max lg:min-w-0 ${selected ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
                      aria-current={selected ? "page" : undefined}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className="min-w-0 space-y-6">
          {activeSection === "overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Registered Users"
                  value={TOTAL_REGISTERED.toLocaleString("en-IN")}
                  icon={Users}
                />
                <StatCard label="Products" value={String(products.length)} icon={ShoppingBag} />
                <StatCard label="Orders" value={String(orders.length)} icon={Truck} />
                <StatCard
                  label="Open Tickets"
                  value={String(
                    tickets.filter((t) => !["Resolved", "Closed"].includes(t.status)).length,
                  )}
                  icon={Ticket}
                />
              </div>
              <div className="grid gap-6 xl:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {orders.slice(0, 5).map((o) => (
                      <Row key={o.id} title={o.id} meta={o.customerName} value={o.status} />
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Quotation Queue</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quotations.slice(0, 5).map((q) => (
                      <Row
                        key={q.id}
                        title={q.productName}
                        meta={q.customerName}
                        value={q.status}
                      />
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Enquiries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {enquiries.slice(0, 5).map((e) => (
                      <Row key={e.id} title={e.productName} meta={e.name} value={e.status} />
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          {activeSection === "products" && (
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PackagePlus className="size-5" /> Product Studio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitProduct();
                    }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Product name</Label>
                        <Input
                          value={draft.name}
                          onChange={(e) => setDraftField("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label>SKU</Label>
                        <Input
                          value={draft.sku}
                          onChange={(e) => setDraftField("sku", e.target.value)}
                          placeholder="SKM-RT-600"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <select
                          className={ADMIN_SELECT}
                          value={draft.category}
                          onChange={(e) => {
                            const next =
                              CATEGORIES.find((c) => c.name === e.target.value) ?? CATEGORIES[0];
                            setDraft((current) => ({
                              ...current,
                              category: next.name,
                              subcategory: next.subcategories[0],
                            }));
                          }}
                        >
                          {CATEGORIES.map((category) => (
                            <option key={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Subcategory</Label>
                        <select
                          className={ADMIN_SELECT}
                          value={draft.subcategory}
                          onChange={(e) => setDraftField("subcategory", e.target.value)}
                        >
                          {selectedCategory.subcategories.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>MRP</Label>
                        <Input
                          type="number"
                          min="0"
                          value={draft.price}
                          onChange={(e) => setDraftField("price", Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Offer price</Label>
                        <Input
                          type="number"
                          min="0"
                          value={draft.offerPrice}
                          onChange={(e) => setDraftField("offerPrice", Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Stock</Label>
                        <Input
                          type="number"
                          min="0"
                          value={draft.stock}
                          onChange={(e) => setDraftField("stock", Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Warranty</Label>
                        <Input
                          value={draft.warranty}
                          onChange={(e) => setDraftField("warranty", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Tractor HP</Label>
                        <Input
                          value={draft.hp}
                          onChange={(e) => setDraftField("hp", e.target.value)}
                          placeholder="45-55 HP"
                        />
                      </div>
                      <div>
                        <Label>Working width</Label>
                        <Input
                          value={draft.workingWidth}
                          onChange={(e) => setDraftField("workingWidth", e.target.value)}
                          placeholder="6 FT"
                        />
                      </div>
                      <div>
                        <Label>Weight</Label>
                        <Input
                          value={draft.weight}
                          onChange={(e) => setDraftField("weight", e.target.value)}
                          placeholder="510 KG"
                        />
                      </div>
                      <div>
                        <Label>Blades / discs</Label>
                        <Input
                          value={draft.blades}
                          onChange={(e) => setDraftField("blades", e.target.value)}
                          placeholder="42 Blades"
                        />
                      </div>
                      <div>
                        <Label>Product image</Label>
                        <select
                          className={ADMIN_SELECT}
                          value={draft.image}
                          onChange={(e) => setDraftField("image", e.target.value)}
                        >
                          {Object.entries(IMAGES).map(([key, image]) => (
                            <option key={key} value={image}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Purchase mode</Label>
                        <select
                          className={ADMIN_SELECT}
                          value={draft.purchaseMode}
                          onChange={(e) =>
                            setDraftField("purchaseMode", e.target.value as Product["purchaseMode"])
                          }
                        >
                          <option value="direct">Direct order</option>
                          <option value="quotation">Quotation only</option>
                        </select>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <select
                          className={ADMIN_SELECT}
                          value={draft.status}
                          onChange={(e) =>
                            setDraftField("status", e.target.value as Product["status"])
                          }
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label>Short description</Label>
                      <Textarea
                        value={draft.shortDesc}
                        onChange={(e) => setDraftField("shortDesc", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Full description</Label>
                      <Textarea
                        value={draft.description}
                        onChange={(e) => setDraftField("description", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Features, one per line</Label>
                      <Textarea
                        value={draft.features.join("\n")}
                        onChange={(e) => setDraftField("features", e.target.value.split("\n"))}
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="flex items-center gap-2 rounded-md border p-3 text-sm font-medium">
                        <input
                          type="checkbox"
                          checked={draft.featured}
                          onChange={(e) => setDraftField("featured", e.target.checked)}
                        />{" "}
                        Featured product
                      </label>
                      <label className="flex items-center gap-2 rounded-md border p-3 text-sm font-medium">
                        <input
                          type="checkbox"
                          checked={draft.bestseller}
                          onChange={(e) => setDraftField("bestseller", e.target.checked)}
                        />{" "}
                        Bestseller
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button type="submit">
                        <Save className="mr-2 size-4" /> Save Product
                      </Button>
                      <Button type="button" variant="outline" onClick={resetProductForm}>
                        <RotateCcw className="mr-2 size-4" /> New Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="size-5" /> Product Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Search name, SKU or category"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                      />
                    </div>
                    <select
                      className={ADMIN_SELECT}
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option>All</option>
                      {CATEGORIES.map((category) => (
                        <option key={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="max-h-[720px] space-y-3 overflow-auto pr-1">
                    {visibleProducts.map((product) => (
                      <div
                        key={product.id}
                        className="grid gap-3 rounded-md border p-3 sm:grid-cols-[92px_1fr]"
                      >
                        <img
                          src={product.image}
                          alt=""
                          className="h-24 w-full rounded-md object-cover sm:w-24"
                        />
                        <div className="min-w-0 space-y-3">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {product.sku} · {product.category} · Stock {product.stock}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                variant={product.status === "published" ? "secondary" : "outline"}
                              >
                                {product.status}
                              </Badge>
                              {product.purchaseMode === "quotation" && (
                                <Badge variant="outline">Quote only</Badge>
                              )}
                              {product.featured && <Badge>Featured</Badge>}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="font-semibold">
                              {formatINR(product.offerPrice)}{" "}
                              <span className="text-sm font-normal text-muted-foreground">
                                MRP {formatINR(product.price)}
                              </span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => setDraft(product)}
                              >
                                <Pencil className="mr-2 size-4" /> Edit
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => duplicateProduct(product)}
                              >
                                <Copy className="mr-2 size-4" /> Copy
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  saveProduct({
                                    ...product,
                                    status: product.status === "published" ? "draft" : "published",
                                  })
                                }
                              >
                                {product.status === "published" ? "Unpublish" : "Publish"}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="mr-2 size-4" /> Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="size-5" /> Order Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orders.slice(0, 6).map((order) => (
                  <div
                    key={order.id}
                    className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_210px_150px]"
                  >
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} · {formatINR(order.total)}
                      </p>
                    </div>
                    <select
                      className={ADMIN_SELECT}
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    >
                      {[
                        "Order Placed",
                        "Payment Pending",
                        "Payment Confirmed",
                        "Processing",
                        "Packed",
                        "Dispatched",
                        "Out for Delivery",
                        "Delivered",
                        "Cancelled",
                        "Return Requested",
                        "Returned",
                        "Refunded",
                      ].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <Badge
                      variant={order.paymentStatus === "Paid" ? "secondary" : "outline"}
                      className="justify-center"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "quotations" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="size-5" /> Quotation Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quotations.slice(0, 6).map((quote) => (
                  <div
                    key={quote.id}
                    className="grid gap-3 rounded-md border p-3 lg:grid-cols-[1fr_190px_160px_110px]"
                  >
                    <div>
                      <p className="font-semibold">{quote.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {quote.id} · {quote.customerName}
                      </p>
                    </div>
                    <select
                      className={ADMIN_SELECT}
                      value={quote.status}
                      onChange={(e) =>
                        updateQuotation(quote.id, { status: e.target.value as QuotationStatus })
                      }
                    >
                      {[
                        "Submitted",
                        "Under Review",
                        "Quotation Generated",
                        "Revision Requested",
                        "Accepted",
                        "Rejected",
                        "Converted to Order",
                      ].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={quoteAmounts[quote.id] ?? quote.quotedAmount ?? ""}
                      onChange={(e) =>
                        setQuoteAmounts((current) => ({ ...current, [quote.id]: e.target.value }))
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateQuotation(quote.id, {
                          quotedAmount: Number(quoteAmounts[quote.id] || quote.quotedAmount || 0),
                          status: "Quotation Generated",
                        })
                      }
                    >
                      Save
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "customers" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" /> Customer Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {users.slice(1, 7).map((customer) => (
                  <div key={customer.id} className="rounded-md border p-3">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{customer.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.customerType} · {customer.district}
                        </p>
                      </div>
                      <Badge variant={customer.status === "Active" ? "secondary" : "outline"}>
                        {customer.status}
                      </Badge>
                    </div>
                    <select
                      className={ADMIN_SELECT}
                      value={customer.status}
                      onChange={(e) =>
                        updateUser(customer.id, {
                          status: e.target.value as typeof customer.status,
                        })
                      }
                    >
                      <option>Active</option>
                      <option>Suspended</option>
                      <option>Blocked</option>
                    </select>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "activity" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard className="size-5" /> Login Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {loginLog.slice(0, 6).map((log) => (
                  <Row
                    key={log.id}
                    title={log.name}
                    meta={`${log.device} · ${log.browser}`}
                    value={log.success ? "Success" : "Failed"}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
