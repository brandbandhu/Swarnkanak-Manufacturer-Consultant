import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List, X } from "lucide-react";
import { SiteLayout, Breadcrumbs, PageHeading } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES, formatINR } from "@/lib/catalog";
import { useStore } from "@/lib/store";

interface ProductSearch {
  q?: string;
  category?: string;
  sub?: string;
  sort?: string;
  page?: number;
}

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): ProductSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    sub: typeof s.sub === "string" ? s.sub : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
    page: typeof s.page === "number" ? s.page : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Agricultural Machinery Shop | Swarnkanak Implements" },
      { name: "description", content: "Browse rotavators, harrows, ploughs, seed drills, sprayers, balers, mulchers and trailers with prices, specifications and instant online ordering." },
      { property: "og:title", content: "Agricultural Machinery Shop | Swarnkanak" },
      { property: "og:description", content: "30+ agricultural implements with filters for category, price, tractor HP and availability." },
    ],
  }),
  component: ProductsPage,
});

const SORTS = [
  ["featured", "Featured"],
  ["newest", "Newest"],
  ["low", "Price: Low to High"],
  ["high", "Price: High to Low"],
  ["popular", "Most Popular"],
];
const PER_PAGE = 9;

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products } = useStore();
  const [price, setPrice] = useState<number[]>([0, 2500000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const setSearch = (p: Partial<ProductSearch>) =>
    navigate({ search: (prev: ProductSearch) => ({ ...prev, ...p, page: p.page ?? 1 }) });

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.status === "published");
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter((p) => (p.name + p.sku + p.category + p.subcategory).toLowerCase().includes(q));
    }
    if (search.category) list = list.filter((p) => p.category === search.category);
    if (search.sub) list = list.filter((p) => p.subcategory === search.sub);
    list = list.filter((p) => p.offerPrice >= price[0] && p.offerPrice <= price[1]);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    if (offersOnly) list = list.filter((p) => p.offerPrice < p.price);
    switch (search.sort) {
      case "low": list = [...list].sort((a, b) => a.offerPrice - b.offerPrice); break;
      case "high": list = [...list].sort((a, b) => b.offerPrice - a.offerPrice); break;
      case "popular": list = [...list].sort((a, b) => b.reviews - a.reviews); break;
      case "newest": list = [...list].reverse(); break;
      default: list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [products, search, price, inStockOnly, offersOnly]);

  const page = search.page ?? 1;
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const activeCat = CATEGORIES.find((c) => c.name === search.category);

  const chips = [
    search.q && { label: `Search: ${search.q}`, clear: () => setSearch({ q: undefined }) },
    search.category && { label: search.category, clear: () => setSearch({ category: undefined, sub: undefined }) },
    search.sub && { label: search.sub, clear: () => setSearch({ sub: undefined }) },
    inStockOnly && { label: "In stock", clear: () => setInStockOnly(false) },
    offersOnly && { label: "On offer", clear: () => setOffersOnly(false) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <SiteLayout>
      <PageHeading title={search.category ?? "All Agricultural Machinery"} subtitle={activeCat?.blurb ?? "Explore our complete range of tractor implements with transparent pricing, specifications and online ordering."} />
      <Breadcrumbs items={[{ label: "Products", to: "/products" }, ...(search.category ? [{ label: search.category }] : [])]} />

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="mb-2 text-sm font-semibold">Search</p>
                <Input defaultValue={search.q ?? ""} placeholder="Search products" onChange={(e) => setSearch({ q: e.target.value || undefined })} aria-label="Search products" />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">Category</p>
                <ul className="space-y-1.5 text-sm">
                  <li><button className={!search.category ? "font-semibold text-primary" : "text-muted-foreground hover:text-primary"} onClick={() => setSearch({ category: undefined, sub: undefined })}>All Categories</button></li>
                  {CATEGORIES.map((c) => (
                    <li key={c.id}>
                      <button className={search.category === c.name ? "font-semibold text-primary" : "text-muted-foreground hover:text-primary"} onClick={() => setSearch({ category: c.name, sub: undefined })}>{c.name}</button>
                      {search.category === c.name && (
                        <ul className="mt-1.5 ml-3 space-y-1 border-l pl-3">
                          {c.subcategories.map((s) => (
                            <li key={s}>
                              <button className={search.sub === s ? "font-semibold text-primary" : "text-muted-foreground hover:text-primary"} onClick={() => setSearch({ sub: s })}>{s}</button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold">Price range</p>
                <Slider min={0} max={2500000} step={10000} value={price} onValueChange={setPrice} />
                <p className="mt-2 text-xs text-muted-foreground">{formatINR(price[0])} – {formatINR(price[1])}</p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(!!v)} /> In stock only
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={offersOnly} onCheckedChange={(v) => setOffersOnly(!!v)} /> Discounted products
              </label>
              <Button variant="outline" className="w-full" onClick={() => { setPrice([0, 2500000]); setInStockOnly(false); setOffersOnly(false); setSearch({ q: undefined, category: undefined, sub: undefined }); }}>
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        </aside>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
            <div className="flex items-center gap-2">
              <select
                aria-label="Sort products"
                className="h-9 rounded-md border bg-card px-3 text-sm"
                value={search.sort ?? "featured"}
                onChange={(e) => setSearch({ sort: e.target.value })}
              >
                {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <Button variant={view === "grid" ? "default" : "outline"} size="icon" aria-label="Grid view" onClick={() => setView("grid")}><LayoutGrid className="size-4" /></Button>
              <Button variant={view === "list" ? "default" : "outline"} size="icon" aria-label="List view" onClick={() => setView("list")}><List className="size-4" /></Button>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <Badge key={c.label} variant="secondary" className="gap-1">
                  {c.label}
                  <button onClick={c.clear} aria-label={`Remove ${c.label} filter`}><X className="size-3" /></button>
                </Badge>
              ))}
            </div>
          )}

          {shown.length === 0 ? (
            <Card className="mt-8">
              <CardContent className="p-12 text-center">
                <p className="font-display text-lg font-semibold">No products match your filters</p>
                <p className="mt-2 text-sm text-muted-foreground">Try widening the price range or clearing a filter.</p>
                <Button className="mt-5" asChild><Link to="/products">Reset</Link></Button>
              </CardContent>
            </Card>
          ) : (
            <div className={view === "grid" ? "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "mt-6 grid gap-5"}>
              {shown.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => (
                <Button key={i} size="sm" variant={page === i + 1 ? "default" : "outline"} onClick={() => navigate({ search: (prev: ProductSearch) => ({ ...prev, page: i + 1 }) })}>
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </section>
      </div>
    </SiteLayout>
  );
}
