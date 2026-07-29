import { createFileRoute, Link, notFound } from "@/lib/router-compat";
import { useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Download,
  Share2,
  MessageCircle,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, Breadcrumbs } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { discountPct, findProduct, formatINR } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/products_/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} | Swarnkanak Machinery` },
      {
        name: "description",
        content: loaderData?.product.shortDesc ?? "Agricultural implement by Swarnkanak.",
      },
      { property: "og:title", content: loaderData?.product.name ?? "Swarnkanak product" },
      { property: "og:description", content: loaderData?.product.shortDesc ?? "" },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, addQuotation, addEnquiry, products } = useStore();
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [quoteReq, setQuoteReq] = useState("");
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const pct = discountPct(product);
  const saved = wishlist.includes(product.id);

  return (
    <SiteLayout>
      <Breadcrumbs
        items={[
          { label: "Products", to: "/products" },
          { label: product.category },
          { label: product.name },
        ]}
      />

      <div className="container-x grid gap-10 py-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl border bg-card">
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src={product.image}
                alt={`${product.name} view ${i + 1}`}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full cursor-pointer rounded-md border object-cover hover:border-primary"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {product.category} · {product.subcategory}
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold md:text-3xl">{product.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>SKU: {product.sku}</span>
            <span className="flex items-center gap-1 text-warning">
              <Star className="size-4 fill-current" /> {product.rating} ({product.reviews} reviews)
            </span>
            <span
              className={
                product.stock > 0 ? "font-medium text-success" : "font-medium text-destructive"
              }
            >
              {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            {product.purchaseMode === "quotation" ? (
              <span className="font-display text-2xl font-bold text-secondary">
                Price on Request
              </span>
            ) : (
              <>
                <span className="font-display text-3xl font-bold">
                  {formatINR(product.offerPrice)}
                </span>
                {pct > 0 && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatINR(product.price)}
                  </span>
                )}
                {pct > 0 && (
                  <Badge className="bg-primary text-primary-foreground">{pct}% OFF</Badge>
                )}
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Inclusive of GST. Transport and installation charges quoted separately.
          </p>

          <p className="mt-5 text-sm text-muted-foreground">{product.shortDesc}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>
            {product.purchaseMode === "direct" && (
              <>
                <Button
                  onClick={() => {
                    addToCart(product.id, qty);
                    toast.success("Added to cart");
                  }}
                >
                  <ShoppingCart className="size-4" /> Add to Cart
                </Button>
                <Button variant="secondary" asChild onClick={() => addToCart(product.id, qty)}>
                  <Link to="/checkout">Buy Now</Link>
                </Button>
              </>
            )}
            <Button
              variant="outline"
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
              }}
            >
              <Heart className={saved ? "size-4 fill-current text-primary" : "size-4"} /> Wishlist
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Request Quotation</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request a quotation</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  {product.name} · Quantity {qty}
                </p>
                <Textarea
                  placeholder="Describe your requirement, delivery location and timeline"
                  value={quoteReq}
                  onChange={(e) => setQuoteReq(e.target.value)}
                />
                <Input type="file" aria-label="Upload supporting document" />
                <DialogFooter>
                  <Button
                    onClick={() => {
                      addQuotation({
                        productId: product.id,
                        productName: product.name,
                        qty,
                        requirement: quoteReq || "Standard requirement",
                      });
                      setQuoteReq("");
                      toast.success("Quotation request submitted", {
                        description: "Track it under My Quotations.",
                      });
                    }}
                  >
                    Submit request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" asChild>
              <a
                href={`https://wa.me/919999900000?text=${encodeURIComponent("Enquiry about " + product.name)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" /> WhatsApp Enquiry
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                void navigator.clipboard?.writeText(window.location.href);
                toast.success("Product link copied");
              }}
            >
              <Share2 className="size-4" /> Share
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success("Brochure download started (demo PDF)")}
            >
              <Download className="size-4" /> Brochure
            </Button>
          </div>

          <Card className="mt-6">
            <CardContent className="space-y-3 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Truck className="size-4 text-secondary" /> Delivery location checker
              </p>
              <div className="flex gap-2">
                <Input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 6-digit PIN code"
                  maxLength={6}
                  aria-label="PIN code"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    setPinMsg(
                      /^\d{6}$/.test(pin)
                        ? `Deliverable to ${pin} in 5-8 working days with unloading support.`
                        : "Please enter a valid 6-digit PIN code.",
                    )
                  }
                >
                  Check
                </Button>
              </div>
              {pinMsg && <p className="text-sm text-muted-foreground">{pinMsg}</p>}
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="size-4 text-success" /> {product.warranty} warranty · Free
                installation guidance · Genuine spares
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container-x pb-10">
        <Tabs defaultValue="desc">
          <TabsList className="flex-wrap">
            <TabsTrigger value="desc">Description</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="enquiry">Ask a question</TabsTrigger>
          </TabsList>

          <TabsContent value="desc" className="pt-6">
            <p className="max-w-4xl text-sm text-muted-foreground">{product.description}</p>
            <h3 className="mt-6 font-display text-base font-semibold">Key features</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {product.features.map((f: string) => (
                <li key={f} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="specs" className="pt-6">
            <div className="max-w-2xl overflow-hidden rounded-lg border">
              {[
                ["Tractor Power", product.hp],
                ["Working Width", product.workingWidth],
                ["Blades / Configuration", product.blades],
                ["Weight", product.weight],
                ["Warranty", product.warranty],
                ["Installation", "Supported by dealer / service engineer"],
                ["Delivery", "5-8 working days, pan-India"],
                ["SKU", product.sku],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-2 gap-4 px-4 py-3 text-sm ${i % 2 ? "bg-muted/50" : "bg-card"}`}
                >
                  <span className="font-medium">{k}</span>
                  <span className="text-muted-foreground">{v}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 pt-6">
            {[
              {
                n: "Ramesh Patil",
                r: 5,
                t: "Excellent build. Handled black cotton soil without any blade bending.",
              },
              {
                n: "Harpreet Singh",
                r: 4,
                t: "Good performance, dealer support was quick during installation.",
              },
              {
                n: "Suresh Reddy",
                r: 5,
                t: "Fuel consumption dropped compared to my earlier implement.",
              },
            ].map((r) => (
              <Card key={r.n}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{r.n}</span>
                    <span className="flex text-warning">
                      {Array.from({ length: r.r }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.t}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="faq" className="pt-6">
            <Accordion type="single" collapsible className="max-w-3xl">
              {[
                [
                  "Which tractors is this implement compatible with?",
                  `It is designed for ${product.hp} tractors and fits standard category II three-point linkage used by all leading Indian tractor brands.`,
                ],
                [
                  "Is installation support provided?",
                  "Yes. Our dealer or service engineer assists with first fitment, calibration and operator training.",
                ],
                [
                  "What does the warranty cover?",
                  `${product.warranty} warranty against manufacturing defects in the frame, gearbox and drive components. Wear parts are excluded.`,
                ],
                [
                  "How are spare parts supplied?",
                  "Through the dealer network, with critical fast-moving parts stocked regionally for quick dispatch.",
                ],
              ].map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger className="text-left text-sm">{q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="enquiry" className="pt-6">
            <form
              className="grid max-w-2xl gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                addEnquiry({
                  name: String(f.get("name")),
                  phone: String(f.get("phone")),
                  productName: product.name,
                  type: String(f.get("type")),
                  message: String(f.get("message")),
                });
                (e.currentTarget as HTMLFormElement).reset();
                toast.success("Enquiry submitted. Our team will respond shortly.");
              }}
            >
              <Input name="name" required placeholder="Your name" aria-label="Your name" />
              <Input
                name="phone"
                required
                pattern="[6-9][0-9]{9}"
                placeholder="Mobile number"
                aria-label="Mobile number"
              />
              <select
                name="type"
                className="h-10 rounded-md border bg-card px-3 text-sm"
                aria-label="Enquiry type"
              >
                <option>Product Question</option>
                <option>Request a Call</option>
                <option>Product Demo</option>
                <option>Dealer Contact</option>
              </select>
              <Textarea name="message" required placeholder="Your question" />
              <Button type="submit" className="w-fit">
                Send enquiry
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      {related.length > 0 && (
        <section className="section-y bg-muted/50">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold">Related Products</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
