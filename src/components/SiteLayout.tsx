import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, MessageCircle, Phone, ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b bg-muted/60">
      <ol className="container-x flex flex-wrap items-center gap-1 py-3 text-xs text-muted-foreground">
        <li><Link to="/" className="hover:text-primary">Home</Link></li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight className="size-3" />
            {it.to ? (
              <Link to={it.to} className="hover:text-primary">{it.label}</Link>
            ) : (
              <span className="font-medium text-foreground">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-charcoal text-charcoal-foreground">
      <div className="container-x py-10 md:py-14">
        <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-charcoal-foreground/80 md:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2 sm:bottom-6">
        <a
          href="https://wa.me/919999900000"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-lift transition-transform hover:scale-105"
        >
          <MessageCircle className="size-5" />
        </a>
        {show && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="grid size-12 place-items-center rounded-full bg-charcoal text-charcoal-foreground shadow-lift transition-transform hover:scale-105"
          >
            <ArrowUp className="size-5" />
          </button>
        )}
      </div>
      <a
        href="tel:+919999900000"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground sm:hidden"
      >
        <Phone className="size-4" /> Call Now: +91 99999 00000
      </a>
    </>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-12 sm:pb-0">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
