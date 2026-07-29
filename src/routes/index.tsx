import { createFileRoute, Link } from "@/lib/router-compat";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Wrench,
  Truck,
  Headphones,
  Factory,
  Award,
  MapPinned,
  Sprout,
  Star,
  CalendarDays,
  Tag,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES, formatINR } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { PARTNERS, STATS, TESTIMONIALS } from "@/lib/demo-data";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import factory from "@/assets/factory.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swarnkanak Agricultural Machinery | Rotavators, Balers & Implements" },
      {
        name: "description",
        content:
          "Buy rotavators, harrows, ploughs, balers, sprayers and trailers online from Swarnkanak Manufacturer & Consultant. Expert consultation, pan-India service and dealer support.",
      },
      { property: "og:title", content: "Swarnkanak Agricultural Machinery" },
      {
        property: "og:description",
        content:
          "Reliable agricultural machinery, online ordering, quotations and a complete customer portal.",
      },
    ],
  }),
  component: Home,
});

const HERO_IMAGES = [hero1, hero2, hero3];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="font-display text-3xl font-bold text-primary md:text-4xl">
      {n.toLocaleString("en-IN")}
      {suffix}
    </div>
  );
}

const WHY = [
  {
    icon: ShieldCheck,
    title: "Heavy-Duty Construction",
    text: "High tensile steel frames and precision welding tested for Indian field conditions.",
  },
  {
    icon: Sprout,
    title: "High Field Performance",
    text: "Implements tuned for lower fuel burn and higher acres covered per day.",
  },
  {
    icon: Headphones,
    title: "Reliable After-Sales Support",
    text: "Dedicated service helpline with 24-hour first response commitment.",
  },
  {
    icon: Wrench,
    title: "Easy Spare-Part Availability",
    text: "Standardised parts stocked across our dealer and distributor network.",
  },
  {
    icon: Sprout,
    title: "Farmer-Friendly Design",
    text: "Simple adjustments, safe operation and low maintenance for daily use.",
  },
  {
    icon: Award,
    title: "Tested Quality",
    text: "Every unit passes a documented load, alignment and finish inspection.",
  },
  {
    icon: MapPinned,
    title: "Pan-India Service Network",
    text: "Support partners across Maharashtra, Punjab, Haryana, Gujarat and the South.",
  },
  {
    icon: Factory,
    title: "Expert Consultation",
    text: "Free advice on implement selection, tractor matching and farm mechanisation.",
  },
];

function Home() {
  const { products, offers, events, blogs, banners } = useStore();
  const [slide, setSlide] = useState(0);
  const activeBanners = banners.filter((b) => b.active);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % activeBanners.length), 6000);
    return () => clearInterval(t);
  }, [activeBanners.length]);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const bestsellers = products.filter((p) => p.bestseller);
  const banner = activeBanners[slide] ?? activeBanners[0];

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Agricultural machinery working in the field"
            width={1920}
            height={1080}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-x relative flex min-h-[520px] flex-col justify-center py-16 text-charcoal-foreground md:min-h-[620px]">
          <Badge className="w-fit bg-primary text-primary-foreground">
            Monsoon Offer · Up to 15% Off
          </Badge>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
            Powering Modern Agriculture with Reliable Machinery
          </h1>
          <p className="mt-4 max-w-2xl text-base text-charcoal-foreground/85 md:text-lg">
            High-performance agricultural equipment engineered to improve productivity, reduce
            labour and support better farming.
          </p>
          <p className="mt-6 font-display text-lg font-semibold text-primary md:text-xl">
            {banner?.heading}
          </p>
          <p className="text-sm text-charcoal-foreground/80">{banner?.subheading}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/products">
                Explore Products <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Request a Quotation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-card/10 text-charcoal-foreground hover:bg-card hover:text-foreground"
            >
              <Link to="/dealer-enquiry">Enquire Now</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button
              aria-label="Previous slide"
              onClick={() => setSlide((s) => (s - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
              className="grid size-9 place-items-center rounded-full border border-charcoal-foreground/30 hover:bg-primary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-primary" : "w-4 bg-charcoal-foreground/40"}`}
                />
              ))}
            </div>
            <button
              aria-label="Next slide"
              onClick={() => setSlide((s) => (s + 1) % HERO_IMAGES.length)}
              className="grid size-9 place-items-center rounded-full border border-charcoal-foreground/30 hover:bg-primary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b bg-card">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground md:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Product Portfolio" title="Machinery for Every Stage of Farming" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <article
                key={c.id}
                className="group overflow-hidden rounded-xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold">{c.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{c.blurb}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" asChild>
                      <Link to="/products" search={{ category: c.name }}>
                        View Products
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/contact">Enquire</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section-y bg-muted/50">
        <div className="container-x">
          <SectionHead
            eyebrow="Featured Products"
            title="Most Requested Implements This Season"
            action={{ label: "View all products", to: "/products" }}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Why Choose Swarnkanak" title="Built Strong. Backed Better." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <Card
                key={w.title}
                className="border-l-4 border-l-primary transition-shadow hover:shadow-card"
              >
                <CardContent className="p-5">
                  <w.icon className="size-6 text-secondary" />
                  <h3 className="mt-3 font-display text-sm font-semibold">{w.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{w.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-y bg-card">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <img
            src={factory}
            alt="Swarnkanak manufacturing plant assembly line"
            loading="lazy"
            width={1200}
            height={700}
            className="rounded-xl object-cover shadow-card"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              About Swarnkanak
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
              New Era of Agricultural Machinery
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              For over fifteen years we have manufactured agricultural implements that stand up to
              real Indian field conditions. From soil preparation to residue management, our
              machines are designed with farmers, tested on farms and supported by an agricultural
              consultancy team that helps every buyer choose the right implement for their tractor,
              soil and crop cycle.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "Mission: make dependable mechanisation affordable for every farm size.",
                "Quality: documented inspection at raw material, weld, paint and dispatch stages.",
                "Capability: 40+ machinery models produced from an integrated manufacturing plant.",
                "Consultation: free advisory on implement selection and farm mechanisation planning.",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                  {t}
                </li>
              ))}
            </ul>
            <Button className="mt-6" asChild>
              <Link to="/about">
                Read More <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead
            eyebrow="Manufacturing Infrastructure"
            title="Inside Our Plant"
            action={{ label: "Open gallery", to: "/gallery" }}
          />
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "Factory Floor",
              "Welding Unit",
              "Assembly Line",
              "Paint Section",
              "Quality Testing",
              "Dispatch Area",
              "Machinery Installation",
              "Team at Work",
            ].map((label, i) => (
              <figure key={label} className="group relative overflow-hidden rounded-lg">
                <img
                  src={[factory, hero3, hero1, hero2][i % 4]}
                  alt={label}
                  loading="lazy"
                  width={1200}
                  height={700}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-charcoal/80 px-3 py-2 text-xs font-medium text-charcoal-foreground">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section-y bg-muted/50">
        <div className="container-x">
          <SectionHead eyebrow="Best-Selling Machinery" title="Farmer Favourites" />
          <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} className="w-[280px] shrink-0 snap-start" />
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead
            eyebrow="Special Offers"
            title="Save More This Season"
            action={{ label: "All offers", to: "/offers" }}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {offers
              .filter((o) => o.active)
              .slice(0, 3)
              .map((o) => (
                <Card key={o.id} className="overflow-hidden pt-0">
                  <img
                    src={o.image}
                    alt={o.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <CardContent className="space-y-2 p-5">
                    <Badge className="bg-primary text-primary-foreground">{o.discount} OFF</Badge>
                    <h3 className="font-display text-base font-semibold">{o.title}</h3>
                    <p className="text-sm text-muted-foreground">{o.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Valid till {new Date(o.validTill).toLocaleDateString("en-IN")}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <code className="rounded-md border border-dashed border-primary px-2 py-1 text-xs font-semibold text-primary">
                        {o.code}
                      </code>
                      <Button size="sm" asChild>
                        <Link to="/products">Shop Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="section-y bg-card">
        <div className="container-x">
          <SectionHead
            eyebrow="Events & Exhibitions"
            title="Meet Us in the Field"
            action={{ label: "All events", to: "/events" }}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {events.slice(0, 3).map((e) => (
              <Card key={e.id} className="overflow-hidden pt-0">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="aspect-[16/9] w-full object-cover"
                />
                <CardContent className="space-y-2 p-5">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />{" "}
                    {new Date(e.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="font-display text-base font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.venue}</p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
                  <Button size="sm" variant="outline" asChild className="mt-1">
                    <Link to="/events">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Testimonials" title="What Farmers Say" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex gap-0.5 text-warning">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">“{t.text}”</p>
                  <div className="flex items-center gap-3 border-t pt-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-sm font-bold text-secondary-foreground">
                      {t.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{t.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.place}</p>
                      <p className="truncate text-xs text-primary">{t.product}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-y bg-muted/50 py-10">
        <div className="container-x">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Dealers, Finance &amp; Agriculture Partners
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="grid h-16 place-items-center rounded-lg border bg-card px-2 text-center text-xs font-semibold text-muted-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead
            eyebrow="Agricultural Knowledge"
            title="From Our Consultants"
            action={{ label: "Read the blog", to: "/blog" }}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((b) => (
              <Card key={b.id} className="overflow-hidden pt-0">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="aspect-[16/9] w-full object-cover"
                />
                <CardContent className="space-y-2 p-5">
                  <Badge variant="secondary">{b.category}</Badge>
                  <h3 className="font-display text-base font-semibold leading-snug">{b.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    Read article <ArrowRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14 text-secondary-foreground">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <Tag className="size-8" />
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Need Help Selecting the Right Agricultural Machine?
          </h2>
          <p className="max-w-2xl text-sm text-secondary-foreground/85">
            Our consultants match implements to your tractor horsepower, soil type and crop cycle —
            free of cost. Typical response time is under 2 working hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/contact">Talk to an Expert</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-card text-foreground">
              <Link to="/contact">
                <Phone className="size-4" /> Request a Call Back
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-card text-foreground">
              <a href="https://wa.me/919999900000" target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> WhatsApp Us
              </a>
            </Button>
          </div>
          <p className="text-xs text-secondary-foreground/70">
            Demo logins — Admin: admin / Admin@123 · Customer: farmerdemo / Farmer@123 · Cart total
            example {formatINR(132500)}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h2 className="mt-1.5 font-display text-2xl font-bold md:text-3xl">{title}</h2>
      </div>
      {action && (
        <Link
          to={action.to}
          className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary"
        >
          {action.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
